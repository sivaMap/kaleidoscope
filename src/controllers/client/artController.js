const asyncHandler = require("express-async-handler");
const path = require('path');
const fs = require('fs');
const { artVideoUrl, vlcIp, vlcPort, vlcPassword, vlcUsername, defaultVideo } = require("../../config");
const VLC = require("vlc-client");
const net = require('net');
const WebSocket = require('ws');
const { exec } = require("child_process");
const { getVideoInfo } = require("./vlcFunctions");
const { applicationPath: applicationPathConfig } = require("../../config");
const { randomBytes } = require('crypto');
const { playPlayListTcpPlayer, forceStopPlayPal, isAppOpen } = require("./PlayPalFunctions");
const { getFilenameWithoutExtension } = require("./calcFunctions");


// let client = null;

function sendTcpCommand({ PlayPalCommand }) {
    return new Promise((resolve, reject) => {
        const client = new net.Socket();
        client.connect(vlcPort);

        // Write the data to the TCP server
        client.write(PlayPalCommand);

        client.on('data', (data) => {
            resolve(data.toString());
            client.end();
        });

        // Handle errors
        client.on('error', (err) => {
            console.log(err.message)
        });

    });
}

const wss = new WebSocket.Server({ port: 8082 });

// Give vlc live updates to client or frontend
// wss.on('connection', async (ws) => {
//     console.log('New client connected');
//     // Send initial status when a client connects
//     const clientWS = new net.Socket();
//     clientWS.connect(vlcPort);
//     // Write the data to the TCP server
//     clientWS.on('data', (data) => {
//         ws.send(data.toString());        
//     });     

//     // Periodically send status updates
//     const interval = setInterval(() => {
//         clientWS.write(JSON.stringify({
//             CMD: "get_playback_info",
//         }));        
//     }, 1000); // Update every second

//     ws.on('close', () => {
//         console.log('Client disconnected');
//         clearInterval(interval); 
//         clientWS.end();
//     });
// });


const activeWebSocketClients = new Set();
wss.on('connection', (ws) => {
    activeWebSocketClients.add(ws);

    // Clean up when a WebSocket client disconnects
    ws.on('close', () => {
        activeWebSocketClients.delete(ws);
    });
});


//@desc Get All Art videos in a Art folder
//@route GET /art/videos
//access public
const getClientVideos = asyncHandler(async (req, res) => {
    const videoDir = path.join(artVideoUrl, 'v1');

    if (!fs.existsSync(videoDir)) {
        res.status(400);
        throw new Error("Path not exits");
    }
    const files = fs.readdirSync(videoDir);
    const videoFiles = files.filter(file => {
        return file.endsWith('.mp4') || file.endsWith('.mkv') || file.endsWith('.avi'); // Add more extensions if needed
    });

    const videoMetadataPromises = videoFiles.map(file => {
        const videoPath = path.join(videoDir, file);
        return getVideoInfo(videoPath, file);
    });

    const videoMetadata = await Promise.all(videoMetadataPromises);

    res.json(
        videoMetadata
    )
});
let intervalId;
//@desc Start Multiple video via creating playlist
//@route POST /art/start
//access public
const startArtShow = asyncHandler(async (req, res) => {
    const { selectedArtificats } = req.body;


    // const palyingArtifacts = [...selectedArtificats, ...selectedArtificats, ...selectedArtificats];
    const palyingArtifacts = [...selectedArtificats];

    const clientPL = net.createConnection({ port: 17568 }, async () => {
        try {
            const randomValue = randomBytes(1)[0] / 256;


            let round = 1;

            clientPL.on('data', (data) => {
                try {
                    const response = data.toString();
                    const parsedResponse = JSON.parse(response)
    
                    const runnningFilename = getFilenameWithoutExtension(parsedResponse?.CurrentMediaFile)
                    // To detect unexpected playList exit
                    const isArtExit = selectedArtificats.some(selectedArtificat => selectedArtificat?.displayName === runnningFilename)
    console.log("clientData")
                    // Stop the interval
                    if (parsedResponse?.PlaybackState === "Stopped" || parsedResponse?.PlaybackTime > (parsedResponse?.MediaDuration - 1)) {
                        // clearInterval(intervalId);
                        // clearImmediate(intervalId)
                        // resolve("completed");
                    }
                    if (!isArtExit) {
                        // clearInterval(intervalId);
                        // clearImmediate(intervalId);
                        console.log("exiting", runnningFilename,selectedArtificats)
                        // resolve("exit");
                    }
    
                    // activeWebSocketClients.forEach(ws => {
                    //     ws.send(response);
                    // });
                } catch (error) {

                    console.log("error",error?.message)
                 }
            });

            for (const selectedArtificat of palyingArtifacts) {
                console.log({ round: round++ })
                if (!intervalId) {
                    intervalId = setInterval(() => {
                        console.log("intervaling")
                        clientPL.write(JSON.stringify({
                            CMD: "get_playback_info",
                        }));
                    }, 1000)
                }
                const selectedFileName = selectedArtificat?.filename
                const updatedFileName = selectedFileName.replace('\\v1\\', '\\v2\\');
                const fileToPlay = randomValue > 0.5 ? selectedFileName : updatedFileName;

                const exitStatus = await playPlayListTcpPlayer(clientPL, fileToPlay, palyingArtifacts, activeWebSocketClients, intervalId);
                console.log(exitStatus, intervalId)
                // if (exitStatus === "exit") {
                //     break;
                // }
                // clearInterval(intervalId)
            }
            clientPL.end();
        } catch (error) {
            console.error('Error playing files:', error);
        } finally {
            console.log("finallyEnd")
            const command = JSON.stringify({ CMD: 'open_url', StringParameter: defaultVideo });
            sendTcpCommand({ PlayPalCommand: command });
            // clientPL.write(command, (err) => {
            //     if (err);
            // })
            // clientPL.end();
        }
    });
    
    res.status(200).send({ "message": "Success" });


});

//@desc Control Vlc
//@route POST /art/control
//access public
const controlApplication = asyncHandler(async (req, res) => {
    const { control } = req.body;
    // const isRunning = await isAppOpen("OpezeePlayer.exe");
    // if (!isRunning) {
    //     res.status(200).json({ "Message": "Control Success" });
    //     return
    // }

    switch (control) {
        case "pause":
            const tcpdata = await sendTcpCommand({
                PlayPalCommand: JSON.stringify({
                    CMD: "get_playback_info",
                })
            });
            const parsedTcpData = JSON.parse(tcpdata)?.PlaybackState

            const command = parsedTcpData === 'Playing' ? "pause" : "play";
            const PlayPalCommand2 = JSON.stringify({
                CMD: command
            });
            sendTcpCommand({ PlayPalCommand: PlayPalCommand2 });
            break;
        case "volume":
            const { volume } = req.body;
            const PlayPalVolCommand = JSON.stringify({
                CMD: "set_volume",
                IntParameter: volume
            });
            sendTcpCommand({ PlayPalCommand: PlayPalVolCommand });
            break;
        case "stop":
            clearImmediate(intervalId);
            intervalId = null;
            const commandStop = "open_url";
            const PlayPalStopCommand = JSON.stringify({
                CMD: commandStop,
                StringParameter: defaultVideo.replace(/\\/g, '/'),
            });
            sendTcpCommand({ PlayPalCommand: PlayPalStopCommand });
            break;
        case "exit":
            forceStopPlayPal();
            break;
        default:
            break;
    }

    res.status(200).json({ "Message": "Control Success" });
});


module.exports = {
    startArtShow,
    getClientVideos,
    controlApplication
};
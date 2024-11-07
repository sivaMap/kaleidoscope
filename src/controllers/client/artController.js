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


// let client = null;

function sendTcpCommand({ PlayPalCommand }) {
    return new Promise((resolve, reject) => {
        const client = new net.Socket();
        client.connect(vlcPort);

        // Write the data to the TCP server
        client.write(PlayPalCommand);

        client.on('data', (data) => {
            resolve(data.toString());
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

//@desc Start Multiple video via creating playlist
//@route POST /art/start
//access public
const startArtShow = asyncHandler(async (req, res) => {
    const { selectedArtificats } = req.body;
    const isRunning = await isAppOpen("OpezeePlayer.exe");
    if (!isRunning) {
        return
    }

    // console.log(selectedArtificats)

    // if (!isRunning) {
    //     const applicationPath = path.resolve(applicationPathConfig);
    //     // const command = `"${applicationPath}" --fullscreen`;
    //     const command = `"${applicationPath}" --no-video-title-show --qt-minimal-view --loop --qt-continue=0 --fullscreen --no-qt-fs-controller`;
    //     exec(command);

    //     const pollInterval = 500;
    //     const maxAttempts = 10;
    //     let attempt = 0;

    //     const checkVLCReady = setInterval(async () => {
    //         try {

    //             // const playList = await vlc.getPlaylist();
    //             const isRunning = await isAppOpen();
    //             if (isRunning) {
    //                 vlc.emptyPlaylist();
    //                 const randomValue = randomBytes(1)[0] / 256;

    //                 selectedArtificats.forEach(selectedArtificat => {
    //                     const selectedFileName = selectedArtificat?.filename
    //                     const updatedFileName = selectedFileName.replace('\\v1\\', '\\v2\\');
    //                     const fileToPlay = randomValue > 0.5 ? selectedFileName : updatedFileName;
    //                     vlc.addToPlaylist(fileToPlay);
    //                 })

    //                 const playList = await vlc.getPlaylist();
    //                 vlc.playFromPlaylist(playList[0].id);
    //                 clearInterval(checkVLCReady);
    //             }
    //         } catch (error) {
    //             // console.log("catch", attempt)
    //             attempt++;
    //             if (attempt >= maxAttempts) {
    //                 clearInterval(checkVLCReady);
    //             }
    //         }
    //     }, pollInterval);

    //     // setTimeout(async () => {
    //     //     try {
    //     //         vlc.emptyPlaylist()
    //     //         selectedArtificats.forEach(selectedArtificat => {
    //     //             vlc.addToPlaylist(selectedArtificat?.filename
    //     //             );
    //     //         })

    //     //         const playList = await vlc.getPlaylist();
    //     //         vlc.playFromPlaylist(playList[0].id);

    //     //     } catch (error) {
    //     //         return false;
    //     //     }
    //     // }, 100);

    //     res.status(200).json({ "message": "Success" })
    //     return
    // }

    // vlc.emptyPlaylist()

    const clientPL = net.createConnection({ port: 17568 }, async () => {
        try {
            const randomValue = randomBytes(1)[0] / 256;

            for (const selectedArtificat of selectedArtificats) {
                const selectedFileName = selectedArtificat?.filename
                const updatedFileName = selectedFileName.replace('\\v1\\', '\\v2\\');
                const fileToPlay = randomValue > 0.5 ? selectedFileName : updatedFileName;

                const exitStatus = await playPlayListTcpPlayer(clientPL, fileToPlay, selectedArtificats, activeWebSocketClients);
                if (exitStatus === "exit") {
                    break;
                }
            }
        } catch (error) {
            // console.error('Error playing files:', error);            
        } finally {
            const command = JSON.stringify({ CMD: 'open_url', StringParameter: defaultVideo });
            clientPL.write(command, (err) => {
                if (err);
            })
            clientPL.end();
        }
    });



    res.status(200).send({ "message": "Success" });
});

//@desc Control Vlc
//@route POST /art/control
//access public
const controlApplication = asyncHandler(async (req, res) => {
    const { control } = req.body;
    const isRunning = await isAppOpen("OpezeePlayer.exe");
    if (!isRunning) {
        return
    }

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
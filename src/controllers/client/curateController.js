const asyncHandler = require("express-async-handler");
const path = require('path');
const fs = require('fs');
const { curateVideoUrl, vlcPort, defaultVideo } = require("../../config");
const net = require('net');
const WebSocket = require('ws');
const { startPlayerIfNeeded, isAppOpen, getVideoInfo, forceStopPlayPal } = require("./PlayPalFunctions");

// const wss = new WebSocket.Server({ port: 8081 });

function sendTcpCommand({ PlayPalCommand }) {
    return new Promise((resolve, reject) => {
        const client = new net.Socket(); // Create a new client if it doesn't exist
        client.connect(vlcPort);

        // Write the data to the TCP server
        client.write(PlayPalCommand);

        // Handle data from the server (response)
        client.on('data', (data) => {
            resolve(data.toString());
        });

        // Handle errors
        client.on('error', (err) => {
            // console.log(err.message)
        });
    });
}

// Give vlc live updates to client or frontend
// wss.on('connection', async (ws) => {
//     console.log('New client connected');

//     // Send initial status when a client connects
//     vlc.status().then((status) => {
//         ws.send(JSON.stringify(status));
//     }).catch((error) => {
//         console.error('Error fetching VLC status:', error.message);
//     });


//     // Periodically send status updates
//     const interval = setInterval(() => {
//         vlc.status().then((status) => {
//             ws.send(JSON.stringify(status));
//         }).catch((error) => {
//             console.error('Error fetching VLC status:', error.message);
//             clearInterval(interval);
//         });
//     }, 1000); // Update every second

//     ws.on('close', () => {
//         console.log('Client disconnected');
//         clearInterval(interval); // Stop sending updates when the client disconnects
//     });
// });


//@desc Get All curated videos in a curated folder
//@route GET /curate/videos
//access public
const getClientVideos = asyncHandler(async (req, res) => {
    const videoDir = path.join(curateVideoUrl);

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

//@desc Start one video
//@route POST /curate/start
//access public
const startCurate = asyncHandler(async (req, res) => {
    const { filename } = req.body;
    const isRunning = await isAppOpen("OpezeePlayer.exe");

    const command = "open_url";
    const PlayPalCommand = JSON.stringify({
        CMD: command,
        StringParameter: filename.replace(/\\/g, '/'),
    });
    if (!isRunning) {
        startPlayerIfNeeded({ PlayPalCommand });
        res.status(200).json({ "message": "Success" })
        return
    }
    sendTcpCommand({ PlayPalCommand })

    res.status(200).send({ "message": "Success" });
});

//@desc Control PlayPal
//@route POST /curate/control
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
    startCurate,
    getClientVideos,
    controlApplication
};
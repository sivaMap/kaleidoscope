const asyncHandler = require("express-async-handler");
const path = require('path');
const fs = require('fs');
const { curateVideoUrl } = require("../../config");
const VLC = require("vlc-client");
const WebSocket = require('ws');
const { exec } = require("child_process");
const { startVlcIfNeeded, isAppOpen, getVideoInfo } = require("./vlcFunctions");

const wss = new WebSocket.Server({ port: 8081 });
// vlc client
let vlc;
try {
    vlc = new VLC.Client({
        ip: "127.0.0.1",
        port: 8080,
        username: "",
        password: "123456789"
    });


    console.log("CURATE VLC instance created");
} catch (error) {
    console.log("Failed to create VLC instance:", error.message);
}

// Give vlc live updates to client or frontend
wss.on('connection', async (ws) => {
    console.log('New client connected');

    // Send initial status when a client connects
    vlc.status().then((status) => {
        ws.send(JSON.stringify(status));
    }).catch((error) => {
        console.error('Error fetching VLC status:', error.message);
    });


    // Periodically send status updates
    const interval = setInterval(() => {
        vlc.status().then((status) => {
            ws.send(JSON.stringify(status));
        }).catch((error) => {
            console.error('Error fetching VLC status:', error.message);
            clearInterval(interval);
        });
    }, 1000); // Update every second

    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(interval); // Stop sending updates when the client disconnects
    });
});


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
    const isRunning = await isAppOpen();

    if (!isRunning) {
        startVlcIfNeeded({ vlc, filename })

        res.status(200).json({ "message": "Success" })
        return
    }
    
    const videoPath = filename;
    vlc.playFile(videoPath)
    vlc.setFullscreen(true)

    res.status(200).send({ "message": "Success" });
});

//@desc Control Vlc
//@route POST /curate/control
//access public
const controlApplication = asyncHandler(async (req, res) => {
    const { control } = req.body;
    if (!vlc) {
        res.status(400);
        throw new Error("vlc not available")
    }
    
    switch (control) {
        case "pause":
            const checkIsPlaying = await vlc.isPlaying();
            checkIsPlaying
                ? vlc.pause()
                : vlc.play();
            break;
        case "next":
            vlc.next();
            break;
        case "prev":
            vlc.previous();
            break;
        case "stop":
            exec('taskkill /F /IM vlc.exe');
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
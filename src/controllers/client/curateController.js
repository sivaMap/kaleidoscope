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


    console.log("VLC instance created");
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


//@desc Get All videos from the given URL
//@route GET /curate/videos
//access public
const getClientVideos = asyncHandler(async (req, res) => {
    const videoDir = path.join(curateVideoUrl, 'videos');

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

//@desc Get All videos from the given URL
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

    // const videoPath = "D:\\Workspace\\SampleData\\videos\\first.mp4";
    const videoPath = filename;
    vlc.playFile(videoPath)
    vlc.setFullscreen(true)

    res.status(200).send({ "message": "Success" });
});

// ----------------
//@desc Launch Application
//@route POST /curate/launch
//access public
const launchApplication = asyncHandler(async (req, res) => {
    const { applicationPath, parameter } = req.body;
    // console.log(parameter, applicationPath.includes("chrome"))

    // const command = `"${applicationPath}" "${parameter}"`;
    const apath = path.resolve("C:/Program Files/VideoLAN/VLC/vlc.exe");
    const videoPath = "D:\\Workspace\\SampleData\\videos\\first.mp4";
    const command = `"${apath}" "${videoPath}"`;



    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.status(200).json({ error, stderr })
        }
        res.status(200).send('Application launched successfully');
    });
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
    // console.log(control, req.body, vlc.isPlaying())
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
            vlc.stop();
            break;
        default:
            break;
    }

    res.status(200).json({ "Message": "Control Success" });
});


module.exports = {
    launchApplication,
    startCurate,
    getClientVideos,
    controlApplication
};
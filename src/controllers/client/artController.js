const asyncHandler = require("express-async-handler");
const path = require('path');
const fs = require('fs');
const { artVideoUrl } = require("../../config");
const VLC = require("vlc-client");
const WebSocket = require('ws');
const { exec } = require("child_process");
const { isAppOpen, getVideoInfo } = require("./vlcFunctions");
const { applicationPath: applicationPathConfig } = require("../../config");

const wss = new WebSocket.Server({ port: 8082 });
// vlc client
let vlc;
try {
    vlc = new VLC.Client({
        ip: "127.0.0.1",
        port: 8080,
        username: "",
        password: "123456789"
    });

    console.log("ART VLC instance created");
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


//@desc Get All Art videos in a Art folder
//@route GET /art/videos
//access public
const getClientVideos = asyncHandler(async (req, res) => {
    const videoDir = path.join(artVideoUrl, 'videos');

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

    const { filenames } = req.body;
    const isRunning = await isAppOpen();

    if (!isRunning) {
        const applicationPath = path.resolve(applicationPathConfig);
        const command = `"${applicationPath}" --fullscreen`;
        exec(command);

        setTimeout(async () => {
            try {
                vlc.emptyPlaylist()
                filenames.forEach(artFileName => {
                    vlc.addToPlaylist(artFileName);
                })

                const playList = await vlc.getPlaylist();
                vlc.playFromPlaylist(playList[0].id);

            } catch (error) {
                return false;
            }
        }, 100);

        res.status(200).json({ "message": "Success" })
        return
    }

    vlc.emptyPlaylist()
    filenames.forEach(artFileName => {
        vlc.addToPlaylist(artFileName);
    })
    const playList = await vlc.getPlaylist();
    vlc.playFromPlaylist(playList[0].id);

    res.status(200).send({ "message": "Success" });
});

//@desc Control Vlc
//@route POST /art/control
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
    startArtShow,
    getClientVideos,
    controlApplication
};
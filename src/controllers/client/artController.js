const asyncHandler = require("express-async-handler");
const path = require('path');
const fs = require('fs');
const { artVideoUrl, vlcIp, vlcPort, vlcPassword, vlcUsername, defaultVideo } = require("../../config");
const VLC = require("vlc-client");
const WebSocket = require('ws');
const { exec } = require("child_process");
const { isAppOpen, getVideoInfo } = require("./vlcFunctions");
const { applicationPath: applicationPathConfig } = require("../../config");
const { randomBytes } = require('crypto');


// const wss = new WebSocket.Server({ port: 8082 });
// vlc client
let vlc;
try {
    vlc = new VLC.Client({
        ip: vlcIp,
        port: Number(vlcPort),
        username: vlcUsername,
        password: vlcPassword
    });

    console.log("ART VLC instance created");
} catch (error) {
    console.log("Failed to create VLC instance:", error.message);
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
    const isRunning = await isAppOpen();

    if (!isRunning) {
        const applicationPath = path.resolve(applicationPathConfig);
        // const command = `"${applicationPath}" --fullscreen`;
        const command = `"${applicationPath}" --fullscreen --no-video-title-show --qt-minimal-view --loop --qt-continue=0`;
        exec(command);

        const pollInterval = 500;
        const maxAttempts = 10;
        let attempt = 0;

        const checkVLCReady = setInterval(async () => {
            try {

                // const playList = await vlc.getPlaylist();
                const isRunning = await isAppOpen();
                if (isRunning) {
                    vlc.emptyPlaylist();
                    const randomValue = randomBytes(1)[0] / 256;

                    selectedArtificats.forEach(selectedArtificat => {
                        const selectedFileName = selectedArtificat?.filename
                        const updatedFileName = selectedFileName.replace('\\v1\\', '\\v2\\');
                        const fileToPlay = randomValue > 0.5 ? selectedFileName : updatedFileName;
                        vlc.addToPlaylist(fileToPlay);
                    })

                    const playList = await vlc.getPlaylist();
                    vlc.playFromPlaylist(playList[0].id);
                    clearInterval(checkVLCReady);
                }
            } catch (error) {
                // console.log("catch", attempt)
                attempt++;
                if (attempt >= maxAttempts) {
                    clearInterval(checkVLCReady);
                }
            }
        }, pollInterval);

        // setTimeout(async () => {
        //     try {
        //         vlc.emptyPlaylist()
        //         selectedArtificats.forEach(selectedArtificat => {
        //             vlc.addToPlaylist(selectedArtificat?.filename
        //             );
        //         })

        //         const playList = await vlc.getPlaylist();
        //         vlc.playFromPlaylist(playList[0].id);

        //     } catch (error) {
        //         return false;
        //     }
        // }, 100);

        res.status(200).json({ "message": "Success" })
        return
    }

    vlc.emptyPlaylist()
    const randomValue = randomBytes(1)[0] / 256;
    selectedArtificats.forEach(selectedArtificat => {
        const selectedFileName = selectedArtificat?.filename
        const updatedFileName = selectedFileName.replace('\\v1\\', '\\v2\\');
        const fileToPlay = randomValue > 0.5 ? selectedFileName : updatedFileName;
        vlc.addToPlaylist(fileToPlay);
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
    const isVlcOpen = await isAppOpen();
    if (isVlcOpen)
        switch (control) {
            case "pause":
                const checkIsPlaying = await vlc.isPlaying();
                checkIsPlaying
                    ? vlc.pause()
                    : vlc.play();
                break;
            case "volume":
                const isVlclOpen = await isAppOpen();
                if (isVlclOpen) {
                    const { volume } = req.body;
                    vlc.setVolume(volume ?? 45);
                }
                break;
            case "next":
                vlc.next();
                break;
            case "prev":
                vlc.previous();
                break;
            case "stop":
                vlc.emptyPlaylist();
                vlc.playFile(defaultVideo);
                vlc.setFullscreen(true);
                vlc.setLooping(true);
                // exec('taskkill /F /IM vlc.exe');
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
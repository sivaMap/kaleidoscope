const { exec } = require("child_process");
const path = require("path");
const { applicationPath: applicationPathConfig, defaultVideo, vlcPort } = require("../../config");
const ffmpeg = require('fluent-ffmpeg');
const ffprobeStatic = require('ffprobe-static');
const net = require('net');

const isAppOpen = (appName = "OpezeePlayer.exe") => {
    return new Promise((resolve, reject) => {
        exec('tasklist', (error, stdout, stderr) => {
            if (error) {
                return reject(`Error executing tasklist: ${error.message}`);
            }
            if (stderr) {
                return reject(`Error: ${stderr}`);
            }
            // console.log(stdout)
            // Check if the application name appears in the output
            const isOpen = stdout.toLowerCase().includes(appName.toLowerCase());
            resolve(isOpen);
        });
    });
}


let client = null;
function sendTcpCommand({ PlayPalCommand }) {
    return new Promise((resolve, reject) => {
        if (!client) {
            client = new net.Socket(); // Create a new client if it doesn't exist
            client.connect(vlcPort, () => {
                console.log(`Connected to TCP server at ${vlcPort}`);
            });
        }

        // Write the data to the TCP server
        client.write(PlayPalCommand);
    });
}

const startPlayerIfNeeded = async ({ PlayPalCommand }) => {
    const applicationPath = path.resolve(applicationPathConfig);
    const command = `"${applicationPath}"`;
    exec(command);

    const interval = setInterval(async () => {
        const result = await isAppOpen();
        if (result) {
            sendTcpCommand({ PlayPalCommand })
            clearInterval(interval);
        }
    }, 1000);
}

const startVlcInitial = () => {
    const applicationPath = path.resolve(applicationPathConfig);
    // const command = `"${applicationPath}" "${defaultVideo}" --no-video-title-show --qt-minimal-view --loop --qt-continue=0 --fullscreen`;
    const command = `"${applicationPath}" "${defaultVideo}" --no-video-title-show --qt-minimal-view --loop --qt-continue=0 --fullscreen --no-qt-fs-controller`;
    // const command = `"${applicationPath}" "${defaultVideo}" --no-video-title-show --loop --qt-continue=0 --fullscreen `;

    exec(command);
    const PlayPalCommand = JSON.stringify({
        CMD: command,
        StringParameter: filename.replace(/\\/g, '/'),
    });
    sendTcpCommand(PlayPalCommand)
}

const forceStopVlc = async (callback) => {
    console.log("stoping vlc")
    // await exec('taskkill /F /IM vlc.exe');
    exec('taskkill /F /IM vlc.exe', (error, stdout, stderr) => {
        console.log("first")
        callback();
    });
    console.log("stoped vlc")
}

// setting ffprobe path to ffmpeg
ffmpeg.setFfmpegPath(ffprobeStatic.path);
const getVideoInfo = (videoPath, file) => {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(videoPath, (err, metadata) => {
            if (err) {
                return reject(err);
            }

            const { filename, start_time, duration } = metadata.format;
            resolve({ filename, start_time, duration, displayName: path.basename(file, path.extname(file)) });
        });
    });
};


module.exports = {
    isAppOpen, getVideoInfo,
    startVlcInitial, forceStopVlc,
    startPlayerIfNeeded
}
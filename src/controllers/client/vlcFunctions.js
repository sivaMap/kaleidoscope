const { exec } = require("child_process");
const path = require("path");
const { applicationPath: applicationPathConfig, defaultVideo } = require("../../config");
const ffmpeg = require('fluent-ffmpeg');
const ffprobeStatic = require('ffprobe-static');

const isAppOpen = (appName = "vlc.exe") => {
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

const startVlcIfNeeded = ({ vlc, filename }) => {
    const applicationPath = path.resolve(applicationPathConfig);
    // const command = `"${applicationPath}" --fullscreen`;
    const command = `"${applicationPath}" "${filename}" --fullscreen --no-video-title-show --qt-minimal-view`;
    exec(command);

    setTimeout(async () => {
        // const videoPath = "D:\\Workspace\\SampleData\\videos\\first.mp4";
        const videoPath = filename;
        try {
            vlc
                .playFile(videoPath)
        } catch (error) {
            return false;
        }
    }, 100);
}

const startVlcInitial = () => {
    const applicationPath = path.resolve(applicationPathConfig);
    const command = `"${applicationPath}" "${defaultVideo}" --fullscreen --no-video-title-show --qt-minimal-view --loop --qt-continue=0`;

    exec(command);
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
    isAppOpen, startVlcIfNeeded, getVideoInfo,
    startVlcInitial, forceStopVlc
}
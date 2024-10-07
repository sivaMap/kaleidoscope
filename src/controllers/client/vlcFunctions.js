const { exec } = require("child_process");
const path = require("path");
const { applicationPath: applicationPathConfig } = require("../../config");
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
    const command = `"${applicationPath}" --fullscreen`;
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

// setting ffprobe path to ffmpeg
ffmpeg.setFfmpegPath(ffprobeStatic.path);
const getVideoInfo = (videoPath, file) => {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(videoPath, (err, metadata) => {
            if (err) {
                return reject(err);
            }

            const { filename, start_time, duration } = metadata.format;
            resolve({ filename, start_time, duration, displayName:  path.basename(file, path.extname(file)) });
        });
    });
};


module.exports = { isAppOpen, startVlcIfNeeded, getVideoInfo }
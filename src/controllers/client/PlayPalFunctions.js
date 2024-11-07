const { exec } = require("child_process");
const path = require("path");
const { applicationPath: applicationPathConfig, defaultVideo, vlcPort } = require("../../config");
const ffmpeg = require('fluent-ffmpeg');
const ffprobeStatic = require('ffprobe-static');
const net = require('net');
const { getFilenameWithoutExtension } = require("./calcFunctions");

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
            client = new net.Socket();
            client.connect(vlcPort);
        }
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

// Function to play a file on the TCP-connected player
function playPlayListTcpPlayer(client, filePath, selectedArtificats, activeWebSocketClients) {
    return new Promise((resolve, reject) => {
        // Format the command to play the file
        const command = JSON.stringify({ CMD: 'open_url', StringParameter: filePath });

        // Send command to play the file
        client.write(command, (err) => {
            if (err) {}
        });
        client.write(JSON.stringify({ CMD: "set_looping", IntParameter: "0" }));

        const intervalId = setInterval(() => {
            client.write(JSON.stringify({
                CMD: "get_playback_info",
            }));
        }, 1000)

        // Listen for completion or any other response that indicates the file has finished
        client.on('data', (data) => {
            try {
                const response = data.toString();
                const parsedResponse = JSON.parse(response)               

                const runnningFilename = getFilenameWithoutExtension(parsedResponse?.CurrentMediaFile)
                // To detect unexpected playList exit
                const isArtExit = selectedArtificats.some(selectedArtificat => selectedArtificat?.displayName === runnningFilename)

                // Stop the interval
                if (parsedResponse?.PlaybackState === "Stopped" || parsedResponse?.PlaybackTime > (parsedResponse?.MediaDuration - 1)) {
                    clearInterval(intervalId);
                    resolve("completed");
                }
                if (!isArtExit) {
                    clearInterval(intervalId);
                    console.log("exiting",runnningFilename)
                    resolve("exit");
                }

                activeWebSocketClients.forEach(ws => {
                    ws.send(response);
                });
            } catch (error) { }
        });

        client.on('end', () => {
            activeWebSocketClients.forEach((ws) => {
                ws.close(1000, 'Playlist End');
            });
            console.log("ending")
        })

        client.on('error', (err) => console.log(err));
    });
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

const forceStopPlayPal = async () => {    
    // await exec('taskkill /F /IM vlc.exe');
    // exec('taskkill /F /IM OpezeePlayer.exe');
    exec('taskkill /IM  OpezeePlayer.exe');    
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
    startVlcInitial,
    startPlayerIfNeeded, playPlayListTcpPlayer,
    forceStopPlayPal
}
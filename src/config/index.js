const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
    const envFile = `./.env.${process.env.NODE_ENV}`;
    dotEnv.config({ path: envFile });
} else {
    dotEnv.config()
}

module.exports = {
    PORT: process.env.PORT,
    curateVideoUrl: process.env.CURATEVIDEOURL,
    artVideoUrl: process.env.ARTVIDEOURL,
    applicationPath: process.env.APPLICATION,
    defaultVideo: process.env.DEFAULTVIDEO,
    vlcPort: process.env.PLAYERPORT,
    vlcIp: "127.0.0.1",
    vlcUsername: "",
    vlcPassword: "123456789"
};
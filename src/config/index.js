const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
    const envFile = `./.env.${process.env.NODE_ENV}`;
    dotEnv.config({ path: envFile });
} else {
    dotEnv.config()
}

module.exports = {
    PORT: process.env.PORT,
    videoUrl: process.env.VIDEOURL,
    curateVideoUrl: process.env.CURATEVIDEOURL,
    artVideoUrl: process.env.ARTVIDEOURL,
    applicationPath: process.env.APPLICATION
};
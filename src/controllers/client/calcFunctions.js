const path = require('path');

function getFilenameWithoutExtension(filePath) {
    return path.basename(filePath, path.extname(filePath));
}

module.exports = { getFilenameWithoutExtension };
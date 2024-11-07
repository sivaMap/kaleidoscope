exports.getBasename = (filename) => {
    if (!filename) return '';
    const ext = filename.slice(filename.lastIndexOf('.'));
    return filename.slice(0, -ext.length);
};

exports.getFilenameWithoutExtension = (filePath) => {
    // return path.basename(filePath, path.extname(filePath));
    const filenameWithExtension = filePath.split(/[/\\]/).pop();  // Handles both "/" and "\"
    return filenameWithExtension.replace(/\.[^/.]+$/, "");
}
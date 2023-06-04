const fs = require('fs');
const path = require('path');
const util = require('util');
const config = require('../config.json');

const readdir = util.promisify(fs.readdir);

async function scanDirectory(dir) {
    let results = [];
    const files = await readdir(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            const subDirResults = await scanDirectory(fullPath);
            results = results.concat(subDirResults);   
    
    } else {
        const ext = path.extname(fullPath);
        if (ext === '.mp3' || ext === '.wav' || ext === '.m4b') {
            results.push(fullPath);
        }
        }
    }
    return results;
}

module.exports = async function getAudioFiles() {
    const audioFilesDir = config.audioDirectory;  // Use the directory from config
    return await scanDirectory(audioFilesDir);
};
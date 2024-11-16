const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function hashFile(filePath) {
    const fileContent = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(fileContent).digest('hex');
}

function hashDirectory(directory) {
    const files = fs.readdirSync(directory);
    let hashList = {};

    files.forEach((file) => {
        const filePath = path.join(directory, file);
        if (fs.statSync(filePath).isDirectory()) {
            hashList = { ...hashList, ...hashDirectory(filePath) };
        } else {
            hashList[file] = hashFile(filePath);
        }
    });

    return hashList;
}

const hashes = hashDirectory('./.next'); // Hash all files in your 'pages' folder
fs.writeFileSync('hashes.json', JSON.stringify(hashes, null, 2));
console.log('Hashes generated:', hashes);

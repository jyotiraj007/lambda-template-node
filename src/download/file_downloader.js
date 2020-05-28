const axios = require('axios');
const fs = require('fs');
const path = require('path');
/**
 * Class FileDownloader to download a file using url.
 */
class FileDownloader {
    /**
     * Download the font form the specified url.
     *
     * @param {String} fileUrl url of the file to be downloaded
     * @param {String} outPath path downloaded file should be saved
     *
     * @returns {null} null
     */
    static async download(fileUrl, outPath) {
        try {
            if (!fileUrl) {
                throw new Error('Invalid file url. Unable to download.');
            }
            // axios image download with response type "stream"
            const response = await axios({
                method: 'GET',
                url: fileUrl,
                responseType: 'stream',
            });
            // pipe the result stream into a file on disc
            let writableStream = null;
            if (fs.existsSync(path.dirname(outPath))) {
                writableStream = fs.createWriteStream(outPath);
            } else {
                throw new Error(`${outPath} doesn't exist.`);
            }
            response.data.pipe(writableStream);
            return new Promise((resolve, reject) => {
                response.data.on('end', () => {
                    resolve(null);
                });
                response.data.on('error', (err) => {
                    console.log('error in file_downloader:', err)     
                    reject(err);
                });
            });
        } catch (error) {
            console.log('error in file_downloader:', error)
            throw error;
        }
    }
}

module.exports = FileDownloader;

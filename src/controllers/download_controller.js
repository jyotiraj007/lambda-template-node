const path = require('path');
const HttpStatusCode = require('http-status-codes');
const FileDownload = require('../download/file_downloader');
const Utils = require('../utils');
const config = require('config')
/**
 * This controller controls how to call the the download module
 *
 * @class DownloadController
 */
class DownloadController {
    /**
     * Calls download module to download all the
     * font files for a given array of mdFives
     *
     * @static
     * @param {Array} mdFives - array of mdFive strings
     * @param {String} uniqueFolderName - Unique Folder name
     * @param {Integer} version - API version
     * @returns {Array} - array of objects of the structure
     *                      [{
     *                          "mdFive":<string>,
     *                          "version":<integer>,
     *                          "fontFilePath": <string>
     *                      }]
     * @memberof DownloadController
     */
    static async downloadAllFontFiles(mdFives, uniqueFolderName, version) {
        if (mdFives.length === 0) {
            return {
                success: {},
                error: [],
            };
        }
        const fontBinaryDetails = Promise.all(mdFives.map(async (mdFive) => {
            const object = {
                mdFive,
                version,
            };
            try {
                // Uncomment if required to download the font
                // using ads signed url for font url
                // const fontUrls = await Ads.download(mdFive);
                // const fontFilePath = path.join(process.env.ROOTDIR,
                // `data/ads/${mdFive}.ttf`);
                // await FileDownload.download(fontUrls[mdFive], fontFilePath);

                const fontUrl = `${config.get('ads.assetDownloadBaseUriWithPath')}/${mdFive}/download`;
                await Utils.mkdirSync(process.env.ROOTDIR, 'data');
                await Utils.mkdirSync(process.env.ROOTDIR, 'data/ads');
                await Utils.mkdirSync(path.join(process.env.ROOTDIR, 'data/ads'), uniqueFolderName);
                const fontFilePath = path.join(process.env.ROOTDIR, `data/ads/${uniqueFolderName}/${mdFive}.ttf`);
                await FileDownload.download(fontUrl, fontFilePath);

                object.fontFilePath = fontFilePath;
                object.error_code = 0;
                object.status_code = HttpStatusCode.OK;
            } catch (error) {
                console.log('Error in download_controller:', error)
                object.error_message = 'Download error';
                object.error_code = 3;
            }
            return object;
        }));
        const success = {};
        const error = [];
        (await fontBinaryDetails).forEach((object) => {
            if (object.error_code) {
                error.push(object);
            } else {
                success[object.mdFive] = object.fontFilePath;
            }
        });
        return {
            success,
            error,
        };
    }
}

module.exports = DownloadController;

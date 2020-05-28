const commonErrors = require('common-errors');
const errors = require('../../lib/core/errors');
const adsDownloader = require('./ads');
/**
 * DownloadHandler handler handles all the download related operations
 */
class DownloadHandler {
    /**
     * Downloads the font file from ADS using md5
     * @param {String} mdFive font file path
     * @param {String} outPath path including file name at
     *                          which downloaded font should be saved
     * @returns {null} null
     * @throws {Error} throws error if download fails
     *
     */
    static async downloadFontFileFromAds(mdFive, outPath) {
        try {
            await adsDownloader
                .download(mdFive, outPath);
        } catch (error) {
            throw new commonErrors.Error(
                errors.ERROR_TYPES.ERR_DOWNLOAD_FROM_ADS,
                error.inner_error
            );
        }
    }
}
module.exports = DownloadHandler;

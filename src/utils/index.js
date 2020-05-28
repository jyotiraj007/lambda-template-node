const fs = require('fs-extra');
const path = require('path');
const readdir = require('fs-readdir-promise');
/**
 * This class contains helper functions
 */
class Utils {
    /**
     * To remove a directory
     * @static
     * @param {directory} directory Directory to be removed
     * @returns {null} null
     */
    static removeDirectory(directory) {
        if (fs.existsSync(directory)) {
            fs.removeSync(directory);
        }
        return null;
    }

    /**
     * Read a file and returns the content
     * of file as string, returns null if file doesn't
     * exists.
     * @static
     * @param {filepath} filepath path of file
     * @returns {String} Content of file as string,
     * null if file doesn't exists.
     */
    static readFile(filepath) {
        let filecontent = null;
        if (fs.existsSync(filepath)) {
            filecontent = fs.readFileSync(filepath);
        }
        return filecontent;
    }

    /**
     * Removes all the files from directory
     * withour removing the directory
     *
     * @static
     * @param {String} dirPath directory path
     * @returns {undefined} undefined
     * @throws {Error} if file not deleted or dir not valid
     * @memberof Utils
     */
    static async removeDirFiles(dirPath) {
        try {
            const files = await readdir(dirPath);
            files.forEach((file) => {
                if (file !== 'info.txt') {
                    const validFilePath = path.join(dirPath, file);
                    if (fs.existsSync(validFilePath)) {
                        fs.unlink(validFilePath, (error) => {
                            if (error) {
                                Log.error({
                                    removeDirFilesInput: file,
                                }, error.message, error.stack);
                            }
                        });
                    }
                }
            });
        } catch (error) {
           console.log('Error in utils:', error)
        }
    }

    /**
     * make a directory if not exists
     * @static
     * @param {filepath} filepath path of file
     * @param {dir} dir path to add
     * @returns {undefined} Undefined,
     * null if file doesn't exists.
     */
    static mkdirSync(filepath, dir) {
        try {
            const dirPath = path.join(filepath, dir);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath);
            }
        } catch (err) {
            console.log('Error in Utils:', err)
        }
    }
}

module.exports = Utils;

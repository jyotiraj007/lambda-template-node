const HttpStatusCode = require('http-status-codes');
const FeatureVector = require('../featurevector');
/**
 * This controls how the feature vector is called
 *
 * @class FeatureVectorController
 */
class FeatureVectorController {
    /**
     * Calls the feature vector module to calculate feature
     * vector of all the given mdFives
     *
     * @static
     * @param {Array} mdFiveObjects - Object having mdFive mapped with
     *                                fontFilePath
     * @param {Integer} version - API version
     * @returns {Object} - Object of the structure
     *           {
     *              success:{
     *                          "mdFive":<fv-array>
     *                      }
     *              error: [{
     *                          "mdFive":<string>,
     *                          "version":<integer>,
     *                          "error_message": <string>,
     *                          "error_code": <integer>,
     *                          "status_code": <integer>
     *                      }]
     *            }
     * @memberof FeatureVectorController
     */
    static async getFeatureVectors(mdFiveObjects, version) {
        const mdFiveObjectsKeys = Object.keys(mdFiveObjects);
        if (mdFiveObjectsKeys.length === 0) {
            return {
                success: {},
                error: [],
            };
        }
        const fontInfo = {};
        const entries = Object.entries(mdFiveObjects);
        entries.forEach((entry) => {
            const [mdFive, fontFilePath,
            ] = entry;
            fontInfo[mdFive] = {
                path: fontFilePath,
                format: 'ttf',
                action: 'ADD',
                style_index: 0,
            };
        });
        const featureVectorInstance = new FeatureVector(fontInfo);
        const featureVectorObj = await featureVectorInstance
            .calculateFeatureVector();
        const fventries = Object.entries(featureVectorObj);
        const featureVectorObjects = Promise.all(
            fventries.map(async (entry) => {
                const [mdFive, fv,
                ] = entry;
                const object = {};
                object.mdFive = mdFive;
                object.version = version;
                if (!Array.isArray(fv)) {
                    object.error_message = 'could not calculate feature vector';
                    object.error_code = 4;
                    object.status_code = HttpStatusCode.UNPROCESSABLE_ENTITY;
                } else {
                    object.fv = fv;
                }
                return object;
            })
        );
        const success = {};
        const error = [];
        (await featureVectorObjects).forEach((object) => {
            if (object.error_code) {
                error.push(object);
            } else {
                success[object.mdFive] = object.fv;
            }
        });
        return {
            success,
            error,
        };
    }
}
module.exports = FeatureVectorController;

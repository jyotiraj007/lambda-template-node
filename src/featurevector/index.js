const {
    featureVectorCalculator,
} = require('@monotype/feature-vector-calculator');
const path = require('path');
const uuid = require('uuid');
const Utils = require('../utils');

/**
 * This class contains functions used for feature
 * vector calculation of a font
 */
class FeatureVector {
    /**
     * Constructor
     * @param {fontInfo} fontInfo An object containing font info
     * corresponding to the key MD5, the font info object contains
     * font path, font format.
     * example:
     * "<md5>":{
     *   path: "examples/featureVectorExample/Fonts/f_171772.ttf",
     *   format: "TTF",
     *   action: 'ADD',
     *   style_index: 0,
     *   }
     */
    constructor(fontInfo) {
        const fvOutpath = '/tmp'
        this.fontInfo = fontInfo;
        const uniqueFolderName = uuid.v4();
        this.options = {
            mode: 0,
            outPath: path.join(fvOutpath, uniqueFolderName, 'featurevector'),
            threadCount: 2,
        };
        this.outputLocationDetails = {
            outPath: path.join(fvOutpath, uniqueFolderName),
        };
    }

    /**
     * Calculate feature vector for the fonts provided and returns
     * a json containing FVs for the fonts and error if an error is
     * returned for a font.
     * @returns {Object} Output of feature vector output json file
     * If FVs are created then output will be { "md5" : [FVs] } else
     * output will be { "md5": <Error code> }.
     */
    async calculateFeatureVector() {
        try {
            console.log('Calculation started...')
            console.log('this.fontInfo', JSON.stringify(this.fontInfo))
            console.log('Object.keys(this.fontInfo)', Object.keys(this.fontInfo))
            console.log('this.options', JSON.stringify(this.options))
            await featureVectorCalculator
                .calculateFeatureVectors(
                    this.fontInfo,
                    Object.keys(this.fontInfo),
                    this.options
                );
            console.log('Calculation done...')
            console.log('Creating output ...')
            const output = this.getOutput();
            console.log('output', JSON.stringify(output))
            Utils.removeDirectory(this.outputLocationDetails.outPath);
            console.log('removed fv directory')
            return output;
        } catch (error) {
            console.log('error:', error)
            throw error;
        }
    }

    /**
     * Reads the output json files of feature vector calculator
     * module and returns the content as json.
     *
     * @returns {Object} Json file content as JSON object
     */
    getOutput() {
        const filecontent = JSON.parse(Utils.readFile(path.join(this.options.outPath, 'featureVector.json')));
        const errorfilecontent = JSON.parse(Utils.readFile(path.join(this.options.outPath, 'featureVectorError.json')));
        if (Object.keys(errorfilecontent).length !== 0) {
            Object.assign(filecontent, errorfilecontent);
        }
        return filecontent;
    }
}

module.exports = FeatureVector;

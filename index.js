const DownloadController = require('./src/controllers/download_controller');
const FeaturVectorController = require('./src/controllers/featurevector_controller');
const Utils = require('./src/utils');
const uuid = require('uuid');
const path = require('path')
let url = "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html"
process.env.ROOTDIR = '/tmp';
exports.handler = async (event) => {
    let uniqueFolderName = null;
    try {
        // uniqueFolderName = 'ad996c64-284a-4d41-a3bd-fa8b4d66c57e' //uuid.v4();
        // let mdFives = event.params.mdFives.toLowerCase();
        // mdFives = mdFives.split(',');
        // const downloadResult = await DownloadController
        //     .downloadAllFontFiles(mdFives, uniqueFolderName, 1);
        // if(downloadResult.error.length > 0){
        //     throw new Error(downloadResult.error)
        // }
        const input = {
            "7df1a058e9e2d97a23d4013c03fa0a94" : path.join(__dirname, 'data/ads/ad996c64-284a-4d41-a3bd-fa8b4d66c57e/7df1a058e9e2d97a23d4013c03fa0a94.ttf'),
            "9f476bf4063224a4f17508b984cedf0d" : path.join(__dirname, 'data/ads/ad996c64-284a-4d41-a3bd-fa8b4d66c57e/9f476bf4063224a4f17508b984cedf0d.ttf')
        }
        const featureVectorResult = await FeaturVectorController
            .getFeatureVectors(input, 1);
        return JSON.stringify({
            status: 200,
            featureVectorResult
        })
    } catch (error) {
        console.log(error)
        return JSON.stringify({
            status: 500,
            error
        })
    } finally {
        // const fontFilePaths = path.join(process.env.ROOTDIR, `data/ads/${uniqueFolderName}`);
        // await Utils.removeDirectory(fontFilePaths);
    }
}
const defer = require('config/defer').deferConfig;
const path = require('path');
const p = require('./../package.json');

module.exports = {
    app: {
        name: p.name,
        description: p.description,
    },
    api: {
        ROOT_URI: '/api',
        BASE_URI: defer(cfg => `${cfg.api.ROOT_URI}/`),
    },
    env: {
        mode: process.env.NODE_ENV,
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3000,
    },
    logger: {
        bunyan: {
            name: p.name,
            type: 'rotating-file',
            level: 'error',
            path: `${(process.env.LOG_DIR) ? process.env.LOG_DIR : '.'}/logs.log`, // log to a file
            period: '1d', // daily rotation
            count: 10,
        },
    },
    enableSwagger: true,
    outDir: path.join(__dirname, '../out'),
    ads: {
        baseUri: 'https://ads-preprod.monotype.com',
        path: '/v2/assets/signed-urls',
        assetDownloadBaseUriWithPath: 'https://ads-preprod.monotype.com/v2/assets',
    },
    transformTypes: {
        dbObjectToResBodyObject: 'one',
        newDataToDbObjects: 'two',
    },
    classificationThreadCount: 1,
    featureVectorThreadCount: 2,
    features: [
        'MONOSPACE',
        'FREEHAND',
        'ALLCAPS',
    ],
    allowedDiscoveryTypes: ['classification', 'fv', 'features',
    ],
    allowedQueryParams: ['mdFives', 'fields',
    ],
};

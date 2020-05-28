const defer = require('config/defer').deferConfig;

module.exports = {
    ads: {
        baseUri: 'https://ads-preprod.monotype.com',
        path: '/v2/assets/signed-urls',
        assetDownloadBaseUriWithPath: 'https://ads-preprod.monotype.com/v2/assets',
    },
    swagger: {
        serverURL: defer(cfg => `${cfg.env.host}:${cfg.env.port}`),
        schemes: ['https', 'http',
        ],
        defaultScheme: 'http',
    },
    mongodbDetails: {
        url: 'mongodb://localhost:27017',
        database: 'superfdms',
        collection: 'discovery',
    },
};

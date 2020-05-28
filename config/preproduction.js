module.exports = {
    ads: {
        baseUri: 'https://ads-preprod.monotype.com',
        path: '/v2/assets/signed-urls',
        assetDownloadBaseUriWithPath: 'https://ads-preprod.monotype.com/v2/assets',
    },
    swagger: {
        serverURL: `${process.env.HOST}`,
        schemes: ['https',
        ],
        defaultScheme: 'https',
    },
    mongodbDetails: {
        url: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@super-fdms-preprod.rxgnq.mongodb.net`,
        database: 'superfdms',
        collection: 'discovery',
    },
};

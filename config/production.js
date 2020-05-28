
module.exports = {
    enableSwagger: false,
    ads: {
        baseUri: 'https://ads.monotype.com',
        path: '/v2/assets/signed-urls',
        assetDownloadBaseUriWithPath: 'https://ads.monotype.com/v2/assets',
    },
    swagger: {
        serverURL: `${process.env.HOST}`,
        schemes: ['https',
        ],
        defaultScheme: 'https',
    },
    mongodbDetails: {
        url: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@super-fdms-prod.rxgnq.mongodb.net`,
        database: 'superfdms',
        collection: 'discovery',
    },
};

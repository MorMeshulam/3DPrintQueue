const storage = require('node-persist');

var localStorage = (async function () {
    var options = {
        dir: `${__dirname}/persist`,
        stringify: JSON.stringify,
        parse: JSON.parse,
        encoding: 'utf8',
        logging: false,  // can also be custom logging function
        //ttl: false, // ttl* [NEW], can be true for 24h default or a number in MILLISECONDS or a valid Javascript Date object
        //expiredInterval: 2 * 60 * 1000, // every 2 minutes the process will clean-up the expired cache
        forgiveParseErrors: false
    }
    await storage.init(options);
    // await storage.clear();
    return storage;
});

module.exports = localStorage;
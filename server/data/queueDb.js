var queueService = require('../services/queue.service');
var localStorage = require('./storage');
var Queue = require('../model/queue');

/*
this object is in communicating between 
the queue object model and services
*/
var QueueData = (function () {
    //init the queue data object
    var queue = new Queue();
    // client.set('string key', 'string val', redis.print);

    //bind queue ctrl to socket client
    function bind(socket) {
        console.log('QueueData bind');
        queueService.init(socket);
        queue.connectServices(queueService);
        queue.load();
    }

    async function bindWithStorage(socket) {
        var storageClient = await localStorage();
        console.log('QueueData bindWithStorage');
        queueService.init(socket, storageClient);
        queue.connectServices(queueService);
        queue.loadPersist(storageClient);
    }

    return { queue, bind, bindWithStorage }
});

var queueDb = QueueData();
module.exports = queueDb;
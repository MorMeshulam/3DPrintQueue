'use strict';
// /etc/init.d/redis-server stop
// /etc/init.d/redis-server start

var redis = require('redis');
var client = redis.createClient();

client.on('connect', function () {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('error event - ' + client.host + ':' + client.port + ' - ' + err);
});

// clear db queue
// client.set('queue', '', client.print);

// client.get('queue', function (error, result) {
//     if (error) {
//         console.log(error);
//         throw error;
//     }
//     console.log('REDIS GET result ->' + result);
//     if (result != null) {
//         queue = Object.assign(new Queue, result);
//         queue.connectServices(queueService);
//         queue.update();
//     }

// });


module.exports = client;
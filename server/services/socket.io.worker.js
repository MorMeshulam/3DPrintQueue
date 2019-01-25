const io = require('socket.io');
const authController = require('../controllers/auth')
const req = require('../config/requests');
var queueDb = require('../data/queueDb');
var instance = null;

/*
this object create  the socket for
communicate with the client
*/
function init(server) {

    const sioService = io.listen(server);

    sioService.on('connection', function (socket) {
        console.log('user connected');

        socket.on('disconnect', function () {
            console.log('user disconnected');
            instance = false;
        });

        socket.on('auth', function (token) {
            authController.auth(token);
        });

        //custom events
        socket.on(req.QUEUE_UPDATE, function (queue) {
            console.log(req.QUEUE_UPDATE, queue);
        });

        socket.on(req.QUEUE_WORKING_ITEM_UPDATE, function (item) {
            console.log(req.QUEUE_WORKING_ITEM_UPDATE, item);
        });

        //craete instance of queue that clears every server restart
        queueDb.bind(socket);
        //stored queue datas on nodejs-persist
        //queueDb.bindWithStorage(socket);
    });
}

module.exports = {
    init, instance
};
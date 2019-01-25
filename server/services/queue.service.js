var status = require("../config/status");
const req = require('../config/requests');

var _socket = null;
var _storage = null;
var _running = false;

/*
this object is the queue service
that handle the operation on the queue
*/
var QueueService = (function () {

    const delay = async ms => await new Promise(res => setTimeout(res, ms));

    const proccess = async (queue, sendFeedback) => {

        if (_running) return;
        _running = true;

        const WorkItem = async () => new Promise((resolve) => {

            let currentCountdownTime = queue.working_item.duration + 1;
            let progress = 0;

            timerInterval = setInterval(async () => {

                try {

                    //sleep while queue is being reorderd
                    // console.log(`this.status = ${queue.status} == ${status.QUEUE.LOCK}`);
                    while (queue.status == status.QUEUE.LOCK) {
                        await new Promise(res => setTimeout(res, 500));
                    }

                    //abort operation after cancel
                    if (queue.working_item && queue.working_item.progress == -1) {
                        clearInterval(timerInterval);
                        //onCancel operation
                        queue.onWorkItemComplete(status.QUEUE_ITEM.CANCELED);
                        resolve(false);
                    }
                    queue.working_item.progress = ++progress;
                    sendFeedback(queue.working_item);
                    currentCountdownTime--;

                    if (currentCountdownTime == 0) {
                        setTimeout(() => {
                            clearInterval(timerInterval);
                            //OnWorkItemComplete
                            queue.onWorkItemComplete(status.QUEUE_ITEM.COMPLETED);
                            resolve(true);

                        }, 100);
                    }


                } catch (error) {
                    clearInterval(timerInterval);
                    console.log('error in worker interval',error);
                    resolve(false);
                }

            }, 1000);

        });

        const res = await WorkItem();
        _running = false;
        return res;
    }

    const emit = (id, data, persist) => {
        if (_socket) {
            switch (id) {
                case req.QUEUE_UPDATE:
                    _socket.emit(req.QUEUE_UPDATE, data);

                    if (persist && _storage)
                        _storage.setItem('QUEUE_DATA', data);
                    break;
                case req.QUEUE_WORKING_ITEM_UPDATE:
                    _socket.emit(req.QUEUE_WORKING_ITEM_UPDATE, data);
                    break;
                default:
                    break;
            }
        }
    }

    const init = (socket, storage) => {
        _socket = socket;
        _storage = storage;
    }

    return {
        proccess, emit, init
    }
});

var service = QueueService();
module.exports = service;
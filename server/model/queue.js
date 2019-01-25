var keygen = require("keygenerator");
var status = require("../config/status");
var req = require('../config/requests');
var _ = require('lodash');
var _service = null;

/*
this object is the queue data model
*/
var Queue = function () {
    _service = null;

    this.pending = [];
    this.completed = [];

    this.total = 0;
    this.pending_size = 0;
    this.completed_size = 0;
    this.empty = true;
    this.working_item = null;
    this.status = status.QUEUE.ACTIVE;

    console.log('Queue Object Created.');
};

var Item = function (name, duration, i) {
    this.name = name;
    this.duration = duration;
    this.id = keygen._();
    this.index = i;
    this.isRunning = false;
    this.status = status.QUEUE_ITEM.PENDING;
    this.progress = 0;
};

Queue.prototype.connectServices = function (service) {
    _service = service;
};

Queue.prototype.runQueueWorker = async function (restored) {
    console.log('Queue Job Worker Started...');

    while (!this.empty) {

        //if item didnt come from persist load
        if (!restored) {
            const [working_item] = this.pending.splice(0, 1);
            this.working_item = working_item;
        }

        if (!this.working_item) return;


        this.status = status.QUEUE.WORKING;

        if (!this.working_item) {
            //Queue is empty
            this.empty = true;
            this.working_item = null;
            this.status = status.QUEUE.SLEEP;

            _service.emit(req.QUEUE_WORKING_ITEM_UPDATE, this.working_item);
            _service.emit(req.QUEUE_UPDATE, this);
            return;
        }

        this.working_item.isRunning = true;
        this.working_item.status = status.QUEUE_ITEM.PRINTING;

        //Run queue item job
        _service.emit(req.QUEUE_WORKING_ITEM_UPDATE, this.working_item);
        _service.emit(req.QUEUE_UPDATE, this);

        await _service.proccess(this, working_item => {
            _service.emit(req.QUEUE_WORKING_ITEM_UPDATE, working_item);
        });
    }
};

Queue.prototype.onWorkItemComplete = function (status) {

    this.working_item.isRunning = false;
    this.working_item.status = status;

    //add workink item to completed list
    if (!this.completed.find(c => c.id == this.working_item.id))
        this.completed.push(this.working_item);

    this.pending_size--;
    this.completed_size++;
    _service.emit(req.QUEUE_WORKING_ITEM_UPDATE, this.working_item, true);
    _service.emit(req.QUEUE_UPDATE, this, true);
}

Queue.prototype.add = function ({ name, duration, test }) {
    this.pending_size++;
    var item = new Item(name, duration, this.total++);

    this.pending.splice(this.pending_size - 1, 0, item);

    //Check if queue job is running
    if (this.empty) {
        this.empty = false;
        this.runQueueWorker();
    }
    if (!test)
        _service.emit(req.QUEUE_UPDATE, this, true);
};

Queue.prototype.remove = function (data) {
    var evens = _.remove(this.pending, function (item) {
        return item.index === data.index;
    });
    this.pending_size--;
    _service.emit(req.QUEUE_UPDATE, this, true);
};

Queue.prototype.cancel = function (index) {
    this.status == status.QUEUE.LOCK;
    if (this.working_item.index == index) {
        this.working_item.progress = -1;
    }
    this.status == status.QUEUE.WORKING;
};

Queue.prototype.toggleWorker = function () {

    if (this.status == status.QUEUE.LOCK)
        this.status = status.QUEUE.WORKING;
    else
        this.status = status.QUEUE.LOCK;
};

Queue.prototype.reorder = function ({ startIndex, endIndex }) {
    console.log(`reorder index ${startIndex} to index ${endIndex}`);
    this.status = status.LOCK;

    const result = Array.from(this.pending);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);


    _.forEach(result, (item, index) => {
        result[index].index = index;
    })

    this.pending = result;
    _service.emit(req.QUEUE_UPDATE, this);
};

Queue.prototype.loadPersist = async function (storage) {
    var result = await storage.getItem('QUEUE_DATA');
    Object.assign(this, result);

    this.runQueueWorker();
    _service.emit(req.QUEUE_UPDATE, this);
}

Queue.prototype.load = async function () {
    _service.emit(req.QUEUE_UPDATE, this);
}

Queue.prototype.test = function ({ amount, fuzzyJumpInterval }) {

    for (let index = 0; index < amount; index++) {
        this.add({
            name: `Test Job ${index + 1}`,
            duration: (index + 1) * fuzzyJumpInterval,
            test: true
        });
    }
    _service.emit(req.QUEUE_UPDATE, this, true);
    console.log('Unit Load Testing');
}

module.exports = Queue;
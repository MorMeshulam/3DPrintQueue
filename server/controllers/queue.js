var express = require('express');
var router = express.Router();
var QueueController = require('../data/queueDb');

/* GET queue api actions. */
router.get('/', function (req, res) {
    res.send(QueueController.queue);
});

router.post('/add', function (req, res) {
    var name = req.body.name;
    var duration = req.body.duration;
    QueueController.queue.add({ name, duration });
    res.send('add item to queue');
});

router.post('/test', function (req, res) {
    var amount = req.body.amount;
    var fuzzyJumpInterval = req.body.fuzzyJumpInterval;
    QueueController.queue.test({ amount, fuzzyJumpInterval });
    res.send('load test items to queue');
});

router.post('/remove', function (req, res) {
    var index = req.body.index;
    QueueController.queue.remove({ index });
    res.send('remove item from queue');
});

router.post('/cancel', function (req, res) {
    var index = req.body.index;
    QueueController.queue.cancel(index);
    res.send('cancel working item from queue');
});

router.post('/reorder', function (req, res) {
    var data = req.body.data;
    QueueController.queue.reorder(data);
    res.send('reorder item in queue');
});

module.exports = router;
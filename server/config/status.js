const ACTIVE = 'active';
const WORKING = 'active:working';
const SLEEP = 'active:sleep';
const LOCK = 'active:lock';

const QUEUE = {
    ACTIVE, WORKING, SLEEP, LOCK
}

const PENDING = 'pending';
const PRINTING = 'printing';
const COMPLETED = 'completed';
const CANCELED = 'canceled';

const QUEUE_ITEM = {
    PENDING, PRINTING, COMPLETED,CANCELED
}

module.exports = {
    QUEUE,QUEUE_ITEM
}
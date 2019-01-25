import { QueueTypes } from "./types";

export function init() {
  return {
    type: QueueTypes.INIT
  };
}

export function setQueue(data) {
  return {
    type: QueueTypes.QUEUE_SET,
    data
  };
}

export function setWorkItem(data){
  return{
    type:QueueTypes.QUEUE_SET_WORK_ITEM,
    data
  }
}

export function add(data) {
  return {
    type: QueueTypes.QUEUE_ADD,
    data
  };
}

export function test(data) {
  return {
    type: QueueTypes.QUEUE_LOAD_TEST,
    data
  };
}

export function remove(index) {
  return {
    type: QueueTypes.QUEUE_REMOVE,
    index
  };
}

export function cancel(index) {
  return {
    type: QueueTypes.QUEUE_CANCEL,
    index
  };
}

export function reorder(data) {
  return {
    type: QueueTypes.QUEUE_REORDER,
    data
  };
}

export function get(index) {
  return {
    type: QueueTypes.QUEUE_GET,
    index
  };
}


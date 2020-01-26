// Queue.js : Defines the implimentation for a queue.
// Imports:
const Err = require('../misc/Errors');

/**
 * Defines the Queue class.
 */
class Queue {
    /**
     * Initializes a new queue.
     * @param {any} data - The optional data for the first item in the queue.
     */
    constructor(data) {
        this.count = 0;
        this.frontOfLine = 0;
        this.storage = {};

        if(data !== undefined) {
            this.Enqueue(data);
        }
    }
}
/**
 * Add data to end of queue.
 * @param {any} data - The data to add to the end of the queue.
 */
Queue.prototype.Enqueue = function(data) {
    // Check to see if data is undefined.
    if(data === undefined) {
        throw new Err.DSException(Err.ErrMsg.InvalidData, 100);
    }

    this.storage[this.count] = data;
    this.count++;
}
/**
 * Returns & Removes the data from the beginning of the queue.
 */
Queue.prototype.Dequeue = function() {
    // Check if queue is empty.
    if(this.count - this.frontOfLine === 0) {
        throw new Err.DSException(Err.ErrMsg.EmptyList, 101);
    }

    let result = this.storage[this.frontOfLine];
    delete this.storage[this.frontOfLine];
    this.frontOfLine++;

    return result;
}
/**
 * Returns the length of the queue.
 */
Queue.prototype.Size = function() {
    return this.count - this.frontOfLine;
}
/**
 * Returns the value at the front of the queue.
 */
Queue.prototype.Peek = function() {
    // Check if the queue is empty.
    if(this.count - this.frontOfLine === 0) {
        throw new Err.DSException(Err.ErrMsg.EmptyList, 102);
    }

    return this.storage[this.frontOfLine];
}
/**
 * Returns true if the queue is empty.
 */
Queue.prototype.IsEmpty = function() {
    return (this.count - this.frontOfLine) === 0 ? true : false;
}
/**
 * Exports the Queue data structure.
 */
module.exports = Queue;
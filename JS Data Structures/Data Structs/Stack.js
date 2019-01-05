// Stack.js : Defines the implimentation for a stack.
// Imports:
const Err = require('../misc/Errors');

/**
 * The stack data structure.
 */
class Stack {
    /**
     * The stack constructor which takes an optional data parameter for the first item.
     * @param {any} data - The data for the first item in the stack.
     */
    constructor(data) {
        this.count = 0;
        this.storage = {};

        if(data !== undefined) {
            this.Push(data);
        }
    }
}
/**
 * Pushes the data to the top of the stack.
 * @param {any} data - The data to push.
 */
Stack.prototype.Push = function(data) {
    if(data === undefined) {
        throw new Err.DSException(Err.ErrMsg.InvalidData, 100);
    }

    this.storage[this.count] = data;
    this.count++;
}
/**
 * Pops the data from the top of the stack.
 */
Stack.prototype.Pop = function() {
    if(this.count <= 0) {
        return undefined;
    }

    this.count--;
    let topData = this.storage[this.count];
    delete this.storage[this.count];
    return topData;
}
/**
 * Returns the number of items in the stack.
 */
Stack.prototype.Size = function() {
    return this.count;
}
/**
 * Returns the top item to view (does not remove from the list).
 */
Stack.prototype.Peek = function() {
    if(this.count <= 0) {
        throw new Err.DSException(Err.ErrMsg.EmptyList, 101);
    }

    return this.storage[this.count - 1];
}
/**
 * Swaps the top and second from top items.
 */
Stack.prototype.Swap = function() {
    if(this.count <= 0) {
        throw new Err.DSException(Err.ErrMsg.EmptyList, 103);
    }

    let temp, lastIndex = this.count - 1,
        secondToLastIndex = lastIndex - 1;
    temp = this.storage[secondToLastIndex];
    this.storage[secondToLastIndex] = this.storage[lastIndex];
    this.storage[lastIndex] = temp;
}
/**
 * Empties the entire stack.
 */
Stack.prototype.Empty = function() {
    while(this.count > 0) {
        this.Pop();
    }
}
/**
 * Exports the stack data structure.
 */
module.exports = Stack;
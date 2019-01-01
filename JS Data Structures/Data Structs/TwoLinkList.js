const err = require('../misc/Errors');

class TwoLinkList {
    /**
     * TwoLinkList constructor.
     * @param {any} data - The data for the first item in the list to hold.
     */
    constructor(data) {
        // List propterties.
        this.count = 0;
        this.first = null;
        this.last = null;

        // Check if first item data was passed.
        if(data !== undefined) {
            this.AddToEnd(data);
        }
    }
}

/**
 * The item container for a linked list.
 */
class Item {
    /**
     * Constructor to create a new list item.
     * @param {any} data - The data the new item should hold.
     */
    constructor(data = null) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

/**
 * Method to add a new item to the end of the list.
 * @param {any} data - The data the new item holds.
 */
TwoLinkList.prototype.AddToEnd = function(data) {
    // Check if valid data was passed as an argument.
    if(data === undefined) {
        throw new Err.DSException(Err.ListErr.InvalidData(), 301);
    }

    let newItem = new Item(data)

    if(this.count === 0) {
        this.first = newItem;
        this.last = this.first;
    } else if(this.count === 1) {
        newItem.prev = this.first;
        this.first.next = newItem;
        this.last = newItem;
    } else {
        newItem.prev = this.last;
        this.last.next = newItem;
        this.last = newItem;
    }

    this.count++;
}

/**
 * Returns the item at the desired position in the list.
 * @param {Number} position - The position in the list where the item should be located.
 */
TwoLinkList.prototype.FindAt = function(position) {
    // Show error when trying to access position outside of list.
    if(this.count === 0 || position > this.count || position < 1) {
        throw new Err.DSException(Err.ListErr.NonExistant(OneLinkList.name), 101);
    } else if(position % 1 != 0 || typeof position != Number.name.toLowerCase()) {
        throw new Err.DSException(Err.ListErr.InvalidPosition(), 102);
    }

    // Sequentially search for item (1 -> last).
    let currItem = this.first;
    for(let currCount = 1; currCount < position; currCount++) {
        currItem = currItem.next;
    }

    return currItem;
}

/**
 * Removes the item at the desired position in the list.
 * @param {Number} position - The position in the list where the item should be located.
 */
TwoLinkList.prototype.RemoveAt = function(position) {
    // Show error when trying to access position outside of list.
    if(this.count === 0 || position > this.count || position < 1) {
        throw new Err.DSException(Err.ListErr.NonExistant(OneLinkList.name), 201);
    }
    // Show error when the position is invalid.
    else if(position % 1 != 0 || typeof position != Number.name.toLowerCase()) {
        throw new Err.DSException(Err.ListErr.InvalidPosition(), 202);
    }

    // Linearly search for item before desired item (1 -> last).
    let currItem = this.first,
        beforeItemToRemove, itemToRemove, currCount;
    for(currCount = 1; currCount < position; currCount++) {
        beforeItemToRemove = currItem;
        itemToRemove = currItem.next;
        currItem = currItem.next;
    }

    // if(currCount)
    beforeItemToRemove.next = itemToRemove.next;
    delete itemToRemove;
    this.count--;
}

/**
 * Print all items of the list to the console.
 */
TwoLinkList.prototype.PrintAll = function() {
    // Check if list is empty.
    if(this.count === 0 || !(this.first instanceof Item)) {
        console.log('Empty list.');
        return;
    }

    // Print each item to the console sequentially.
    let curr = this.first;
    while(curr) {
        console.log(curr);
        curr = curr.next;
    }
}

module.exports = TwoLinkList;
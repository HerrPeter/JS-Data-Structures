// TwoLinkList.js : Defines the implementation for a doubly linked list.

// Imports:
const Err = require('../misc/Errors');

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
        throw new Err.DSException(Err.ErrMsg.InvalidData, 301);
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
    // Show error when trying to access an invalid position.
    if(this.count === 0) {
        throw new Err.DSException(Err.ErrMsg.EmptyList, 100);
    } else if(position % 1 != 0 || typeof position != Number.name.toLowerCase()) {
        throw new Err.DSException(Err.ErrMsg.InvalidPosition, 101);
    } else if(position > this.count || position < 1) {
        throw new Err.DSException(Err.ErrMsg.NonExistant(TwoLinkList.name), 102);
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
        throw new Err.DSException(Err.ErrMsg.NonExistant(TwoLinkList.name), 201);
    }
    // Show error when the position is invalid.
    else if(position % 1 != 0 || typeof position != Number.name.toLowerCase()) {
        throw new Err.DSException(Err.ErrMsg.InvalidPosition, 202);
    }

    // Handle list with one item.
    if(this.count === 1) {
        this.first = null;
        this.last = null;
    }
    // Linearly search for item before desired item (1 -> last).
    else {
        let currItem = this.first,
            itemToRemove = currItem;
        for(let currCount = 1; currCount < position; currCount++) {
            itemToRemove = currItem.next;
            currItem = currItem.next;
        }

        // Special Case: position == 1
        if(position === 1) {
            itemToRemove.next.prev = null;
            this.first = itemToRemove.next;
        }
        // Special Case: position == last
        else if(position === this.count) {
            itemToRemove.prev.next = null;
            this.last = itemToRemove.prev;
        }
        // All other positions
        else {
            itemToRemove.prev.next = itemToRemove.next;
            itemToRemove.next.prev = itemToRemove.prev;
        }

        itemToRemove = null;
    }
    this.count--;
}
/**
 * Removes the first item matching the data passed.
 * @param {any} data - The data to search and destroy.
 */
TwoLinkList.prototype.RemoveThis = function(data) {
    // Check if the list is empty.
    if(this.count === 0) {
        throw new Err.DSException(Err.ErrMsg.NonExistant(TwoLinkList.name), 401);
    }
    // Check if valid data was passed as an argument.
    else if(data === undefined) {
        throw new Err.DSException(Err.ErrMsg.InvalidData, 402);
    }

    // Item to remove.
    let itemToRemove;

    // Handle list with one item.
    if(this.count === 1) {
        if(JSON.stringify(this.first.data) === JSON.stringify(data)) {
            itemToRemove = this.first;
            this.first = null;
            this.last = null;
            this.count--;
        }
    }
    // Handle list with more than one item.
    else {
        itemToRemove = FindThisHelper(this, data);
    }

    itemToRemove = null;
}
/**
 * Helper method for the FindThis method.
 * @param {TwoLinkList} list - The list used to search through.
 * @param {Any} data - The data to search for.
 */
function FindThisHelper(list, data) {
    // Variables needed to search 
    let currItem = list.first,
        nextItem = list.first.next,
        itemToRemove;

    // Check the first item.
    if(JSON.stringify(list.first.data) === JSON.stringify(data)) {
        itemToRemove = list.first;
        list.first = list.first.next;
        list.first.prev = null;
        list.count--;
        return itemToRemove;
    }

    // Check the last item.
    if(JSON.stringify(list.last.data) === JSON.stringify(data)) {
        itemToRemove = list.last;
        list.last.prev.next = null; // Set the second to last item's next to null.
        list.last = list.last.prev; // Set last to second to last item.
        list.count--;
        return itemToRemove;
    }

    // Search through the items in between the first and last sequentially.
    currItem = currItem.next;
    for(let currPos = 2; currPos < list.count; currPos++) {
        if(JSON.stringify(currItem.data) === JSON.stringify(data)) {
            itemToRemove = currItem;
            currItem.prev.next = currItem.next; // Set prev item's next to this item's next.
            currItem.next.prev = currItem.prev; // Set next item's prev to this item's prev.
            list.count--;
            return itemToRemove;
        }

        currItem = currItem.next;
    }

    return itemToRemove;
}
/**
 * Checks if the list has an item with the passed data.
 * @param {any} data - The data to check for.
 */
TwoLinkList.prototype.Contains = function(data) {
    // Check if valid data was passed as an argument.
    if(data === undefined) {
        throw new Err.DSException(Err.ErrMsg.InvalidData, 301);
    }

    // Search through list sequentially for the data.
    let currItem = this.first,
        containsData = false;

    // If data param is an object.
    while(currItem instanceof Item) {
        if(JSON.stringify(currItem.data) === JSON.stringify(data)) {
            containsData = true;
            break;
        }

        currItem = currItem.next;
    }

    return containsData;
}
/**
 * Print all items of the list to the console.
 */
TwoLinkList.prototype.PrintAll = function() {
    // Check if the list is empty.
    if(this.count === 0 || !(this.first instanceof Item)) {
        console.log('Empty list.');
        return;
    }

    // Print each item to the console.
    let currItem = this.first;
    while(currItem instanceof Item) {
        console.log(currItem);
        currItem = currItem.next;
    }
}
/**
 * All doubly linked list exports.
 */
module.exports = TwoLinkList;
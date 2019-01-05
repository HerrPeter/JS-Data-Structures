// Linked List.js : Defines the implementation for a singly linked list.
//'use strict'; // This breaks deleting list items.

// Imports:
const Err = require('../misc/Errors');

/**
 * A singly linked list class.
 */
class OneLinkList {
    /**
     * OneLinkList constructor.
     * @param {any} data - The data for the first item in the list to hold.
     */
    constructor(data) {
        // List properties.
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
     * @param {Item} next - The data for the next node (list item).
     */
    constructor(data = null) {
        this.data = data;
        this.next = null;
    }
}
/**
 * Method to add a new item to the end of the list.
 * @param {any} data - The data the new item holds.
 */
OneLinkList.prototype.AddToEnd = function(data) {
    // Check if valid data was passed as an argument.
    if(data === undefined) {
        throw new Err.DSException(Err.ErrMsg.InvalidData, 301);
    }

    let newItem = new Item(data);

    if(this.count === 0) {
        this.first = newItem;
        this.last = this.first;
    } else {
        this.last.next = newItem;
        this.last = newItem;
    }

    this.count++;
}
/**
 * Returns the item at the desired position in the list.
 * @param {Number} position - The position in the list where the item should be located.
 */
OneLinkList.prototype.FindAt = function(position) {
    // Show error when trying to access an invalid position.
    if(this.count === 0) {
        throw new Err.DSException(Err.ErrMsg.EmptyList, 100);
    } else if(position % 1 != 0 || typeof position != Number.name.toLowerCase()) {
        throw new Err.DSException(Err.ErrMsg.InvalidPosition, 102);
    } else if(position > this.count || position < 1) {
        throw new Err.DSException(Err.ErrMsg.NonExistant(OneLinkList.name), 101);
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
OneLinkList.prototype.RemoveAt = function(position) {
    // Show error when trying to access position outside of list.
    if(this.count === 0 || position > this.count || position < 1) {
        throw new Err.DSException(Err.ErrMsg.NonExistant(OneLinkList.name), 201);
    }
    // Show error when the position is invalid.
    else if(position % 1 != 0 || typeof position != Number.name.toLowerCase()) {
        throw new Err.DSException(Err.ErrMsg.InvalidPosition, 202);
    }

    // Linearly search for item before desired item (1 -> last).
    let currItem = this.first,
        beforeItemToRemove = this.first.next, // Set it equal to first.next to make case w/1 item work.
        itemToRemove = currItem;
    for(let currCount = 1; currCount < position; currCount++) {
        beforeItemToRemove = currItem;
        itemToRemove = currItem.next;
        currItem = currItem.next;
    }

    // Special Case: position == 1
    if(position === 1) {
        this.first = itemToRemove.next;
    }
    // Special Case: position == last
    if(position === this.count) {
        this.last = beforeItemToRemove; // Case w/2 items: need to set beforeItemToRemove.next = null (Done).
    }
    // All other positions
    if(this.count > 1 && position > 1) {
        beforeItemToRemove.next = itemToRemove.next;
    }

    itemToRemove = null;
    this.count--;
}
/**
 * Removes the first item matching the data passed.
 * @param {any} data - The data to search and destroy.
 */
OneLinkList.prototype.RemoveThis = function(data) {
    // Check if the list is empty.
    if(this.count === 0) {
        throw new Err.DSException(Err.ErrMsg.NonExistant(OneLinkList.name), 401);
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
 * @param {OneLinkList} list - The list used to search through.
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
        list.count--;
        return itemToRemove;
    }

    // Search through the items in between the first and last sequentially.
    for(let currPos = 1; currPos < list.count - 1; currPos++) {
        if(JSON.stringify(nextItem.data) === JSON.stringify(data)) {
            itemToRemove = nextItem;
            currItem.next = nextItem.next;
            list.count--;
            return itemToRemove;
        }

        currItem = nextItem;
        nextItem = nextItem.next;
    }

    // Check the last item.
    if(JSON.stringify(list.last.data) === JSON.stringify(data)) {
        // Note: currItem == one before the end (from the for statement).
        itemToRemove = list.last;
        currItem.next = null;
        list.last = currItem;
        list.count--;
    }

    return itemToRemove;
}
/**
 * Checks if the list has an item with the passed data.
 * @param {any} data - The data to check for.
 */
OneLinkList.prototype.Contains = function(data) {
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
OneLinkList.prototype.PrintAll = function() {
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
 * All single linked list exports.
 */
module.exports = OneLinkList;
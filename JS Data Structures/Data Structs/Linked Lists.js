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
     */
    constructor(data) {
        // List properties.
        this.count = 0;
        this.first = new Item();
        this.last = new Item();

        // Check if first item was passed as data.
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

// exports.TwoLinkList = class TwoLinkList {
//     constructor() {
//         console.log('In the TwoLinkList default ctor.\n')
//     }
// }

/**
 * Method to add a new item to the end of the list.
 * @param {any} data - The data the new item holds.
 */
OneLinkList.prototype.AddToEnd = function(data) {
    let newNode = new Item(data),
        currNode = this.first;

    if(this.count == 0) {
        this.first = newNode;
        this.last = this.first;
    } else {
        while(currNode.next != null) {
            currNode = currNode.next;
        }

        currNode.next = newNode;
        this.last = newNode;
    }

    this.count++;
}

/**
 * Returns the item at the desired position in the list.
 * @param {Number} position - The position in the list where the item should be located.
 */
OneLinkList.prototype.FindAt = function(position) {
    // Show error when trying to access position outside of list.
    if(this.count === 0 || position > this.count || position < 1) {
        throw new Err.DSException(Err.ListErr.NonExistant(OneLinkList.name), 101);
    } else if(position % 1 != 0 || typeof(position) != Number.name.toLowerCase()) {
        throw new Err.DSException(Err.ListErr.InvalidPosition(), 102);
    }

    // Linearly search for item (1 -> last).
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
        throw new Err.DSException(Err.ListErr.NonExistant(OneLinkList.name), 201);
    } else if(position % 1 != 0 || typeof(position) != Number.name.toLowerCase()) {
        throw new Err.DSException(Err.ListErr.InvalidPosition(), 202);
    }

    // Linearly search for item before desired item (1 -> last).
    let currItem = this.first,
        beforeItemToRemove, itemToRemove;
    for(let currCount = 1; currCount < position; currCount++) {
        beforeItemToRemove = currItem;
        itemToRemove = currItem.next;
        currItem = currItem.next;
    }

    beforeItemToRemove.next = itemToRemove.next;
    delete itemToRemove;
    this.count--;
}

OneLinkList.prototype.Contains = function(data) {
    // Check if valid data was passed as an argument.
    if(!data) {
        throw new Err.DSException(Err.ListErr.InvalidData(), 301);
    }

    // Search through list sequentially for the data.
    let currItem = this.first,
        containsData = false;

    // If data param is an object.
    if(typeof(data) == 'object') {
        while(currItem) {
            if(JSON.stringify(currItem.data) === JSON.stringify(data)) {
                containsData = true;
                break;
            }

            currItem = currItem.next;
        }
        // Else data param is a non-reference data type.
    } else {
        while(currItem) {
            if(currItem.data === data) {
                containsData = true;
                break;
            }

            currItem = currItem.next;
        }
    }

    return containsData;
}

/**
 * Print all items of the list to the console.
 */
OneLinkList.prototype.PrintAll = function() {
    let curr = this.first;
    while(curr.next) {
        console.log(curr);
        curr = curr.next;
    }
    console.log(curr);
}

/**
 * All linked list exports.
 */
module.exports = {
    OneLinkList: OneLinkList,
}
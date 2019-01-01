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
        throw new Err.DSException(Err.ListErr.InvalidData(), 301);
    }

    let newItem = new Item(data),
        currItem = this.first;

    if(this.count === 0) {
        this.first = newItem;
        this.last = this.first;
    } else {
        while(currItem.next !== null) {
            currItem = currItem.next;
        }

        currItem.next = newItem;
        this.last = newItem;
    }

    this.count++;
}

/**
 * Returns the item at the desired position in the list.
 * @param {Number} position - The position in the list where the item should be located.
 */
OneLinkList.prototype.FindAt = function(position) {
    // Show error when trying to access position outside of list.
    if(this.count === 0) {
        throw new Err.DSException(Err.ListErr.EmptyList, 100);
    } else if(position % 1 != 0 || typeof position != Number.name.toLowerCase()) {
        throw new Err.DSException(Err.ListErr.InvalidPosition(), 102);
    } else if(position > this.count || position < 1) {
        throw new Err.DSException(Err.ListErr.NonExistant(OneLinkList.name), 101);
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
        throw new Err.DSException(Err.ListErr.NonExistant(OneLinkList.name), 201);
    }
    // Show error when the position is invalid.
    else if(position % 1 != 0 || typeof position != Number.name.toLowerCase()) {
        throw new Err.DSException(Err.ListErr.InvalidPosition(), 202);
    }

    // Handle list with one item.
    if(this.count === 1) {
        this.first = null;
        this.last = null;
    }
    // Linearly search for item before desired item (1 -> last).
    else {
        let currItem = this.first,
            beforeItemToRemove,
            itemToRemove;
        for(let currCount = 1; currCount < position; currCount++) {
            beforeItemToRemove = currItem;
            itemToRemove = currItem.next;
            currItem = currItem.next;
        }

        beforeItemToRemove.next = itemToRemove.next;
        itemToRemove = null;
    }
    this.count--;
}

/**
 * Removes the first item matching the data passed.
 * @param {any} data - The data to search and destroy.
 */
OneLinkList.prototype.RemoveThis = function(data) {
    // Check if the list is empty.
    if(this.count === 0) {
        throw new Err.DSException(Err.ListErr.NonExistant(OneLinkList.name), 401);
    }
    // Check if valid data was passed as an argument.
    else if(data === undefined) {
        throw new Err.DSException(Err.ListErr.InvalidData(), 402);
    }

    // Search through list sequentially for the data.
    let currItem = this.first,
        itemToRemove;

    // Handle list with one item.
    if(this.count === 1) {
        if(typeof(data) == 'object') {
            if(JSON.stringify(currItem.data) === JSON.stringify(data)) {
                this.first = null;
                this.last = null;
                this.count--;
                return;
            }
        } else {
            if(currItem.data === data) {
                this.first = null;
                this.last = null;
                this.count--;
                return;
            }
        }
    }
    // Handle list with more than one item.
    else {
        // If data param is an object.
        if(typeof(data) == 'object') {
            while(currItem.next) {
                if(JSON.stringify(currItem.next.data) === JSON.stringify(data)) {
                    itemToRemove = currItem.next;
                    currItem.next = currItem.next.next;

                    // Check if removing last item.
                    if(itemToRemove === this.last) {
                        this.last = currItem;
                    }
                    this.count--;
                    break;
                }

                currItem = currItem.next;
            }
        }
        // Else data param is a non-reference data type.
        else {
            while(currItem.next) {
                if(currItem.next.data === data) {
                    itemToRemove = currItem.next;
                    currItem.next = currItem.next.next;

                    // Check if removing last item.
                    if(itemToRemove === this.last) {
                        this.last = currItem;
                    }
                    this.count--;
                    break;
                }

                currItem = currItem.next;
            }
        }
    }

    itemToRemove = null;
}

/**
 * Checks if the list has an item with the passed data.
 * @param {any} data - The data to check for.
 */
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
    // Check if the list is empty.
    if(this.count === 0 || !(this.first instanceof Item)) {
        console.log('Empty list.');
        return;
    }

    // Print each item to the console.
    let curr = this.first;
    while(curr) {
        console.log(curr);
        curr = curr.next;
    }
}

/**
 * All single linked list exports.
 */
module.exports = OneLinkList;
// Linked List.js : Defines the implementation for a singly linked list.
'use strict';

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
        this.first = null;
        this.last = null;

        // Check if first item was passed as data.
        if(data !== undefined) {
            this.AddToEnd(data);
            // this.first = new _Node(data);
            // this.last = this.first;
            // this.count++;
        }

        // NOTE: Can delete variables that are removed from the list.
        //delete this.last;
    }
}

class Item {
    /**
     * Constructor to create a new list item.
     * @param {any} data - The data the new item should hold.
     * @param {Item} next - The data for the next node (list item).
     */
    constructor(data) {
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
OneLinkList.prototype.FindItemAt = function(position) {
    // Show error when trying to access position outside of list.
    if(this.count === 0 || position > this.count || position < 1) {
        throw Error(Err.ListErr.NonExistant(OneLinkList.name));
    } else if(position % 1 != 0 || typeof(position) != Number.name.toLowerCase()) {
        throw Error(Err.ListErr.InvalidPosition());
    }

    // Linearly search for item (1 -> last).
    let currItem = this.first;
    for(let currCount = 1; currCount < position; currCount++) {
        currItem = currItem.next;
    }

    return currItem;
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
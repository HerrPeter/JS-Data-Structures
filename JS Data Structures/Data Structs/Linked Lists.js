// Linked List.js : Defines the implementation for a singly linked list.
'use strict';

/**
 * A singly linked list class.
 */
class _OneLinkList {
    /**
     * OneLinkList constructor.
     */
    constructor(data) {
        // List properties.
        this.count = 0;
        this.first = null;
        this.last = null;
        
        // Check if first item was passed as data.
        if (data !== undefined) {
            this.AddToEnd(data);
            // this.first = new _Node(data);
            // this.last = this.first;
            // this.count++;
        }
        
        // NOTE: Can delete variables that are removed from the list.
        //delete this.last;
    }
}

class _Node {
    /**
     * Method to create a new node (list item).
     * @param {object} data - The data the node (list item) holds.
     * @param {Node} next - Reference to the next node (list item).
     */
    constructor(data){
        this.data = data;
        this.next = null;
    }
}
        
// exports.TwoLinkList = class TwoLinkList {
//     constructor() {
//         console.log('In the TwoLinkList default ctor.\n')
//     }
// }

_OneLinkList.prototype.AddToEnd = function(data) {
    let newNode = new _Node(data), currNode = this.first;

    if (this.count == 0){
        this.first = newNode;
        this.last = this.first;
    }else{
        while(currNode.next != null){
            currNode = currNode.next;
        }

        currNode.next = newNode;
        this.last = newNode;
    }

    this.count++;
}

_OneLinkList.prototype.PrintAll = function() {
    let curr = this.first;
    while(curr.next){
        console.log(curr);
        curr = curr.next;
    }
    console.log(curr);
}

/**
 * All linked list exports.
 */
module.exports = {
    OneLinkList: _OneLinkList,
}

class TreeNode {
    // // The tree node value.
    // public value: any;
    // public leftChild: TreeNode;
    // public rightChild: TreeNode;

    /**
     * Constructor used to create a new binary search tree item.
     * @param value The value to be stored.
     */
    constructor(value) {
        this.value = value;
        this.leftChild = null;
        this.rightChild = null;
    }
}

/**
 * Not yet balanced binary search tree.
 */
class BinaryTree {
    // private root: any;
    /**
     * Constructor used to initialize a new Binary Search Tree.
     * @param {any} data First value to be added to the tree. 
     */
    constructor(data) {
        this.root = null;
    }
}

BinaryTree.prototype.PrintTree = function() {
    this.inorder_PrintTree(this.root);
}

/**
 * In-Order Tree Printer.
 */
BinaryTree.prototype.inorder_PrintTree = function(currNode) {
    // Base Check
    if (!currNode) return;

    // Recursive Left
    this.inorder_PrintTree(currNode.leftChild);

    // Pop: Print current node
    console.log(currNode.value);

    // Recursive Right
    this.inorder_PrintTree(currNode.rightChild);

    // Glue: None
}

/**
 * Pre-Order Tree Printer.
 */
BinaryTree.prototype.preorder_PrintTree = function(currNode) {
    // Base Check
    if (!currNode) return;

    // Pop: Print current node
    console.log(currNode.value);

    // Recursive Left
    this.preorder_PrintTree(currNode.leftChild);

    // Recursive Right
    this.preorder_PrintTree(currNode.rightChild);

    // Glue: None
}

/**
 * !! THIS NEED TO BE IMPLIMENTED FOR YOUR USE CASE !!
 * (Simple numbers in this example)
 */
BinaryTree.prototype.helper_AddItem = function(currNode, value) {
    // If value should go left
    if (value < currNode.value) {
        if (!currNode.leftChild) {
            currNode.leftChild = new TreeNode(value);
            return;
        } else {
            this.helper_AddItem(currNode.leftChild, value);
            return;
        }
    }
    // Else value should go right
    else {
        if (!currNode.rightChild) {
            currNode.rightChild = new TreeNode(value);
            return;
        } else {
            this.helper_AddItem(currNode.rightChild, value);
            return;
        }
    }
}

BinaryTree.prototype.AddItem = function(value) {
    // If no value param is present
    if (!value) return;

    // If tree is empty, add value to root
    if (this.root === null) {
        this.root = new TreeNode(value);
        return;
    }

    // If tree is not empty
    this.helper_AddItem(this.root, value);
}



module.exports = BinaryTree;
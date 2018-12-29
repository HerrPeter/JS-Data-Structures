// Errors.js - Contains all error messages the js data structures will use.

/**
 * Errors that may occur in lists.
 */
const ListErr = {
    NonExistant: function(list) {
        if(!list) {
            list = 'this';
        }
        return `The desired item does not exist in ${list} instance.`;
    },
    InvalidPosition: function() {
        return `The position provided was not a valid integer.`;
    },
    InvalidData: function() {
        return `No valid data was passed as an argument.`;
    }
}

/**
 * Data Structure error class.
 */
class DSException {
    /**
     * Creates a new data structure exception.
     * @param {String} message - Details why the error occured.
     * @param {Number} errCode - Numeric code to represent this error.
     */
    constructor(message, errCode) {
        this.message = message;
        this.errCode = errCode;
    }
}

module.exports = {
    ListErr: ListErr,
    DSException: DSException,
}
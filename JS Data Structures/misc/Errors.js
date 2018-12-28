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
    }
}

module.exports.ListErr = ListErr;
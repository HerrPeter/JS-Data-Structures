// Errors.js : Contains all error messages the js data structures will use.
// Note: Consider adding a default error code.

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
        this.code = errCode;
    }
}
/**
 * Errors that may occur in lists.
 */
const ErrMsg = {
    NonExistant: function(list) {
        if(!list) {
            list = 'this';
        }
        return `The desired item does not exist in ${list} instance.`;
    },
    InvalidPosition: `The position provided was not a valid integer.`,
    InvalidData: `No valid data was passed as an argument.`,
    EmptyList: `The data structure container appears to be empty.`,
}

module.exports = {
    ErrMsg: ErrMsg,
    DSException: DSException,
}
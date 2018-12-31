const OneLinkList = require('../JS Data Structures/Data Structs/OneLinkList');

/**
 * Test the list with all methods with no passed parameters.
 * @param {OneLinkList} list - The list to test.
 * @param {function} finalCheck - The final test parameters for the list.
 */
function EmptyParamTest(list, finalCheck) {
    let pass = true;

    // Check empty list.
    try {
        list.AddToEnd();
    } catch (err) {
        //console.log(err);
    }
    try {
        list.Contains();
    } catch (err) {
        //console.log(err);
    }
    try {
        list.FindAt();
    } catch (err) {
        //console.log(err);
    }
    try {
        list.RemoveAt();
    } catch (err) {
        //console.log(err);
    }
    try {
        list.RemoveThis();
    } catch (err) {
        //console.log(err);
    }
    try {
        list.PrintAll();
    } catch (err) {
        //console.log(err);
    } finally {
        pass = finalCheck(list);
    }

    return pass;
}
/**
 * Check if the Contains method is working properly.
 * @param {OneLinkList} list - The list to test.
 */
function ContainsTest(list) {
    let pass = true;

    // Empty list.
    if (list.Contains(2)) {
        pass = false;
    }

    if (list.Contains('2')) {
        pass = false;
    }

    if (list.Contains(new String(2))) {
        pass = false;
    }

    // List with only one item (2) as a number.
    list.AddToEnd(2);
    if (!list.Contains(2)) {
        pass = false;
    }

    if (list.Contains('2')) {
        pass = false;
    }

    if (list.Contains(new String(2))) {
        pass = false;
    }

    // List with only one item ('2') as a string (non-object).
    list.RemoveThis(2);
    list.AddToEnd('2');
    if (list.Contains(2)) {
        pass = false;
    }

    if (!list.Contains('2')) {
        pass = false;
    }

    if (!list.Contains(new String(2))) {
        pass = false;
    }

    // List with only one item ('2') as a string (object).
    list.RemoveThis('2');
    list.AddToEnd(new String(2));
    if (list.Contains(2)) {
        pass = false;
    }

    if (list.Contains('2')) {
        pass = false;
    }

    let two = new String(2);
    if (!list.Contains(two)) {
        pass = false;
    }

    return pass;
}

/**
 * The final method that checks the one link list for empty params.
 * @param {OneLinkList} list - The linked list used to test.
 */
function EmptyFinal(list) {
    if (list.count !== 0 || list.first !== list.last) {
        return false;
    }
    return true;
}

module.exports = {
    EmptyParamTest: EmptyParamTest,
    EmptyFinal: EmptyFinal,
    ContainsTest: ContainsTest,
}
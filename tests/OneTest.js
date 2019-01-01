const OneLinkList = require('../JS Data Structures/Data Structs/OneLinkList');
const DSErr = require('../JS Data Structures/misc/Errors');

/**
 * Test the list with all methods with no passed parameters.
 * @param {OneLinkList} list - The list to test.
 * @param {function} finalCheck - The final test parameters for the list.
 */
function EmptyParamTest() {
    let list = new OneLinkList();
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
        pass = EmptyFinal(list);
    }

    return pass;
}
/**
 * Check if the Contains method is working properly.
 * @param {OneLinkList} list - The list to test.
 */
function ContainsTest() {
    let list = new OneLinkList();
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
 * Check if the Add and Remove methods work properly.
 */
function AddRemoveTest() {
    let pass = true;
    let users = new OneLinkList();

    // Wrong param test. []
    try {
        users.RemoveAt('one');
    } catch (err) {
        if (!(err instanceof DSErr.DSException)) {
            pass = false;
        }
    } finally {
        if (users.first === undefined || users.last === undefined || users.count !== 0) {
            pass = false;
        }
    }
    // Zero items test. []
    try {
        users.RemoveAt(1);
    } catch (err) {
        if (!(err instanceof DSErr.DSException)) {
            pass = false;
        }
    } finally {
        if (users.first === undefined || users.last === undefined || users.count !== 0) {
            pass = false;
        }
    }
    // One item test. ['one'] -> []
    users.AddToEnd('one');
    users.RemoveAt(1);
    if (users.first === undefined || users.last === undefined || users.Contains('one') || users.count !== 0) {
        pass = false;
    }
    // Two items test. ['one', 'two'] -> ['one']
    users.AddToEnd('one');
    users.AddToEnd('two');
    users.RemoveAt(2);
    if (users.first === undefined || users.last === undefined || users.Contains('two') || users.count !== 1) {
        pass = false;
    }
    // More than two items. ['one', 'two', 'three'] -> ['one', 'three']
    users.AddToEnd('two');
    users.AddToEnd('three');
    users.RemoveAt(2);
    if (users.first === undefined || users.last === undefined || users.Contains('two') || users.count !== 2) {
        pass = false;
    }
    // Trying to remove at a decimal number (i.e. 2.7). ['one', 'two', 'three']
    users.RemoveAt(2);
    users.AddToEnd('two');
    users.AddToEnd('three');
    try {
        users.RemoveAt(2.7);
    } catch (err) {
        if (!(err instanceof DSErr.DSException)) {
            pass = false;
        }
    } finally {
        if (users.first === undefined || users.last === undefined || !users.Contains('two') || !users.Contains('three') || users.count !== 3) {
            pass = false;
        }
    }

    // -- RemoveThis Method --
    users = new OneLinkList();

    // Zero items test. []
    try {
        users.RemoveThis(1);
    } catch (err) {
        if (!(err instanceof DSErr.DSException)) {
            pass = false;
        }
    } finally {
        if (users.first === undefined || users.last === undefined || users.count !== 0) {
            pass = false;
        }
    }
    // One item test. ['one'] -> []
    users.AddToEnd('one');
    users.RemoveThis('one');
    if (users.first === undefined || users.last === undefined || users.Contains('one') || users.count !== 0) {
        pass = false;
    }
    // Two items test. ['one', 'two'] -> ['one']
    users.AddToEnd('one');
    users.AddToEnd('two');
    users.RemoveThis(new String('two'));
    if (users.first === undefined || users.last === undefined || users.Contains('two') || users.count !== 1) {
        pass = false;
    }
    // More than two items. ['one', 'two', 'three'] -> ['one', 'three']
    users.AddToEnd('two');
    users.AddToEnd('three');
    users.RemoveThis('two');
    if (users.first === undefined || users.last === undefined || users.Contains('two') || users.count !== 2) {
        pass = false;
    }
    // Trying to remove an item that does not exist. (i.e. 'Wrong Param'). ['one', 'two', 'three']
    users.RemoveAt(2);
    users.AddToEnd('two');
    users.AddToEnd('three');
    users.RemoveThis('Wrong Param');
    if (users.first === undefined || users.last === undefined || !users.Contains('one') || !users.Contains('two') || !users.Contains('three') || users.count !== 3) {
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
    ContainsTest: ContainsTest,
    AddRemoveTest: AddRemoveTest,
}
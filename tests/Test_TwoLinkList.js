// Test_OneLinkList.js : The testing environment for OneLinkList data structure.
// Note 2 Self : Can improve tests by allowing constructor to add list of items
//      (make sure it works) and reset list before every test. This would make
//      the tests more fail-proof.
const OneLinkList = require('../Data Structs/OneLinkList');
const DSErr = require('../misc/Errors');

/**
 * Test the OneLinkList completely.
 */
function OverallOneLinkTest(printToConsole = false) {
    let pass = true;
    let noParamOk = true,
        containsOk = true,
        addRemoveOk = true,
        findAtOk = true;

    // Check each test separately.
    if(!EmptyParamTest()) {
        pass = noParamOk = false;
    } else if(!ContainsTest()) {
        pass = containsOk = false;
    } else if(!AddRemoveTest()) {
        pass = addRemoveOk = false;
    } else if(!FindAtTest()) {
        pass = findAtOk = false;
    }

    // Print the results to the console (if true param).
    if(printToConsole) {
        PrintResults(noParamOk, containsOk, addRemoveOk, findAtOk);
        if(pass) {
            console.log('OneLinkList Overall Test ** PASSED **')
        } else {
            console.log('OneLinkList Overall Test ** FAILED **')
        }
    }

    return pass;
}
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
        pass = false;
    } catch (err) {
        if(!(err instanceof DSErr.DSException)) {
            pass = false;
        }
    }
    try {
        list.Contains();
        pass = false;
    } catch (err) {
        if(!(err instanceof DSErr.DSException)) {
            pass = false;
        }
    }
    try {
        list.FindAt();
        pass = false;
    } catch (err) {
        if(!(err instanceof DSErr.DSException)) {
            pass = false;
        }
    }
    try {
        list.RemoveAt();
        pass = false;
    } catch (err) {
        if(!(err instanceof DSErr.DSException)) {
            pass = false;
        }
    }
    try {
        list.RemoveThis();
        pass = false;
    } catch (err) {
        if(!(err instanceof DSErr.DSException)) {
            pass = false;
        }
    }
    try {
        list.PrintAll();
    } catch (err) {
        if(!(err instanceof DSErr.DSException)) {
            pass = false;
        }
    } finally {
        pass = InstancePropsOk(list, 0);
    }

    return pass;
}
/**
 * Check if the Contains method is working properly.
 * @param {OneLinkList} list - The list to test.
 */
function ContainsTest() {
    let list = new OneLinkList(),
        pass = true;

    // Empty list.
    if(list.Contains(2)) {
        pass = false;
    }

    if(list.Contains('2')) {
        pass = false;
    }

    if(list.Contains(new String(2))) {
        pass = false;
    }

    // List with only one item (2) as a number.
    list.AddToEnd(2);
    if(!list.Contains(2)) {
        pass = false;
    }

    if(list.Contains('2')) {
        pass = false;
    }

    if(list.Contains(new String(2))) {
        pass = false;
    }

    // List with only one item ('2') as a string (non-object).
    list.RemoveThis(2);
    list.AddToEnd('2');
    if(list.Contains(2)) {
        pass = false;
    }

    if(!list.Contains('2')) {
        pass = false;
    }

    if(!list.Contains(new String(2))) {
        pass = false;
    }

    // List with only one item ('2') as a string (object).
    list.RemoveThis('2');
    list.AddToEnd(new String(2));
    if(list.Contains(2)) {
        pass = false;
    }

    if(list.Contains('2')) {
        pass = false;
    }

    let two = new String(2);
    if(!list.Contains(two)) {
        pass = false;
    }

    return pass;
}
/**
 * Check if the Add and Remove methods work properly.
 */
function AddRemoveTest() {
    let list = new OneLinkList(),
        pass = true;

    // -- Wrong param test [] --
    try {
        list.RemoveAt('one');
    } catch (err) {
        if(!(err instanceof DSErr.DSException)) {
            pass = false;
        }
    } finally {
        if(list.first === undefined || list.last === undefined || list.count !== 0) {
            pass = false;
        }
    }
    // -- Zero items test [] --
    try {
        list.RemoveAt(1);
    } catch (err) {
        if(!(err instanceof DSErr.DSException)) {
            pass = false;
        }
    } finally {
        if(list.first === undefined || list.last === undefined || list.count !== 0) {
            pass = false;
        }
    }
    // -- One item test ['one'] -> [] --
    list.AddToEnd('one');
    list.RemoveAt(1);
    if(list.first === undefined || list.last === undefined || list.Contains('one') || list.count !== 0) {
        pass = false;
    }
    // -- Two items test ['one', 'two'] -> ['one'] --
    list.AddToEnd('one');
    list.AddToEnd('two');
    list.RemoveAt(2);
    if(list.first === undefined || list.last === undefined || list.Contains('two') || list.count !== 1) {
        pass = false;
    }
    // -- More than two items ['one', 'two', 'three'] -> ['one', 'three'] --
    list.AddToEnd('two');
    list.AddToEnd('three');
    list.RemoveAt(2);
    if(list.first === undefined || list.last === undefined || list.Contains('two') || list.count !== 2) {
        pass = false;
    }
    // -- Trying to remove at a decimal number (i.e. 2.7) ['one', 'two', 'three'] --
    list.RemoveAt(2);
    list.AddToEnd('two');
    list.AddToEnd('three');
    try {
        list.RemoveAt(2.7);
    } catch (err) {
        if(!(err instanceof DSErr.DSException)) {
            pass = false;
        }
    } finally {
        if(list.first === undefined || list.last === undefined || !list.Contains('two') || !list.Contains('three') || list.count !== 3) {
            pass = false;
        }
    }

    // -- RemoveThis Method --
    list = new OneLinkList();

    // -- Zero items test [] --
    try {
        list.RemoveThis(1);
    } catch (err) {
        if(!(err instanceof DSErr.DSException)) {
            pass = false;
        }
    } finally {
        if(list.first === undefined || list.last === undefined || list.count !== 0) {
            pass = false;
        }
    }
    // -- One item test ['one'] -> [] --
    list.AddToEnd('one');
    list.RemoveThis('one');
    if(list.first === undefined || list.last === undefined || list.Contains('one') || list.count !== 0) {
        pass = false;
    }
    // -- Two items test ['one', 'two'] -> ['one'] --
    list.AddToEnd('one');
    list.AddToEnd('two');
    list.RemoveThis(new String('two'));
    if(list.first === undefined || list.last === undefined || list.Contains('two') || list.count !== 1) {
        pass = false;
    }
    // -- More than two items ['one', 'two', 'three'] -> ['one', 'three'] --
    list.AddToEnd('two');
    list.AddToEnd('three');
    list.RemoveThis('two');
    if(list.first === undefined || list.last === undefined || list.Contains('two') || list.count !== 2) {
        pass = false;
    }
    // -- Trying to remove an item that does not exist (i.e. 'Wrong Param'). ['one', 'two', 'three'] --
    list.RemoveAt(2);
    list.AddToEnd('two');
    list.AddToEnd('three');
    list.RemoveThis('Wrong Param');
    if(list.first === undefined || list.last === undefined || !list.Contains('one') || !list.Contains('two') || !list.Contains('three') || list.count !== 3) {
        pass = false;
    }

    return pass;
}
/**
 * Check if the FindAt method works properly.
 */
function FindAtTest() {
    let list = new OneLinkList(),
        pass = true;

    // -- Zero param test --    
    // 1. Case (1 item): ['one']
    list.AddToEnd('one');
    try {
        list.FindAt();
    } catch (err) {
        if(!(err instanceof DSErr.DSException)) {
            pass = false;
        }
    } finally {
        if(!InstancePropsOk(list, 1)) {
            pass = false;
        }
    }

    // -- Correct param test --
    // 1. Case (0 items): []
    list = new OneLinkList();
    try {
        item = list.FindAt(1);
        pass = false;
    } catch (err) {
        if(!(err instanceof DSErr.DSException)) {
            pass = false;
        }
    } finally {
        if(!InstancePropsOk(list, 0)) {
            pass = false;
        }
    }

    // 2. Case (1 item): ['one']
    list.AddToEnd('one');
    let item = list.FindAt(1);
    if(item.data !== 'one' || !InstancePropsOk(list, 1)) {
        pass = false;
    }

    // 3. Case (2 items): ['one', 'two']
    list.AddToEnd('two');
    item = list.FindAt(2);
    if(item.data !== 'two' || !InstancePropsOk(list, 2)) {
        pass = false;
    }

    // 4. Case (3 items): ['one', 'two', 'three']
    list.AddToEnd('three');
    item = list.FindAt(2);
    if(item.data !== 'two' || !InstancePropsOk(list, 3)) {
        pass = false;
    }

    // -- Wrong param test --
    // 1. Case (0 items): []
    list = new OneLinkList();
    try {
        item = list.FindAt('1');
        pass = false;
    } catch (err) {
        if(!(err instanceof DSErr.DSException)) {
            pass = false;
        }
    } finally {
        if(!InstancePropsOk(list, 0)) {
            pass = false;
        }
    }

    // 2. Case (1 item): ['one']
    list = new OneLinkList();
    list.AddToEnd('one');
    try {
        list.FindAt('1');
        pass = false;
    } catch (err) {
        if(!(err instanceof DSErr.DSException)) {
            pass = false;
        }
    } finally {
        if(!InstancePropsOk(list, 1)) {
            pass = false;
        }
    }

    // 3. Case (2 items): ['one', 'two']
    list = new OneLinkList();
    list.AddToEnd('one');
    list.AddToEnd('two');
    try {
        list.FindAt(1.2);
        pass = false;
    } catch (err) {
        if(!(err instanceof DSErr.DSException)) {
            pass = false;
        }
    } finally {
        if(!InstancePropsOk(list, 2)) {
            pass = false;
        }
    }

    return pass;
}
/**
 * Returns true if the list passes the general test (i.e. first and last properties still exist).
 * @param {OneLinkList} list - The linked list used to test.
 * @param {Number} count - The number of items there should be in the list.
 */
function InstancePropsOk(list, count) {
    if(list.first === undefined || list.last === undefined || list.count !== count) {
        return false; // Fail.
    } else {
        return true; // Pass.
    }
}
/**
 * Prints which tests passed and which one's failed to the console.
 * @param {boolean} noParamOk - Flag : Did the no param test pass?
 * @param {boolean} containsOk - Flag : Did the contains method test pass?
 * @param {boolean} addRemoveOk - Flag : Did the Add Remove methods test pass?
 * @param {boolean} findAtOk - Flag : Did the FindAt method test pass?
 */
function PrintResults(noParamOk, containsOk, addRemoveOk, findAtOk) {
    // OneLinkList Empty Param test.
    if(noParamOk) {
        console.log('OneLinkList Empty Param test PASS.');
    } else {
        console.log('OneLinkList Empty Param test FAIL.');
    }
    // OneLinkList Contains test.
    if(containsOk) {
        console.log('OneLinkList Contains test PASS.');
    } else {
        console.log('OneLinkList Contains test PASS.');
    }
    // OneLinkList AddRemove test.
    if(addRemoveOk) {
        console.log('OneLinkList AddRemove test PASS.');
    } else {
        console.log('OneLinkList AddRemove test FAIL.');
    }
    // OneLinkList FindAt test.
    if(findAtOk) {
        console.log('OneLinkList FindAt test PASS.');
    } else {
        console.log('OneLinkList FindAt test FAIL.');
    }
}

module.exports = {
    OverallOneLinkTest: OverallOneLinkTest,
    EmptyParamTest: EmptyParamTest,
    ContainsTest: ContainsTest,
    AddRemoveTest: AddRemoveTest,
    FindAtTest: FindAtTest,
}
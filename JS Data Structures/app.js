// app.js : Main entry point for the app.
const OneLinkList = require('./Data Structs/OneLinkList');
const OneListTest = require('../tests/OneTest');
const TwoLinkList = require('./Data Structs/TwoLinkList');

// OneLinkList empty param test.
if(OneListTest.EmptyParamTest(OneListTest.EmptyFinal)) {
    console.log('OneLinkList Empty Param test PASS.');
} else {
    console.log('OneLinkList Empty Param test FAIL.');
}
// OneLinkList contains test.
if(OneListTest.ContainsTest()) {
    console.log('OneLinkList Contains test PASS.');
} else {
    console.log('OneLinkList Contains test PASS.');
}
// OneLinkList AddRemove test.
if(OneListTest.AddRemoveTest()) {
    console.log('OneLinkList AddRemove test PASS.');
} else {
    console.log('OneLinkList AddRemove test FAIL.');
}


// TwoLinkList
// var users2 = new TwoLinkList('one');
// users2.AddToEnd('two');
// users2.AddToEnd('three');
// let two = users2.FindAt(2);
// console.log(two);
// users2.PrintAll();
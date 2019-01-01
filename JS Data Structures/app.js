// app.js : Main entry point for the app.
const OneLinkList = require('./Data Structs/OneLinkList');
const TwoLinkList = require('./Data Structs/TwoLinkList');
const test_OneList = require('./tests/Test_OneLinkList');

// -- Test the OneLinkList --
test_OneList.OverallOneLinkTest(true);


// -- TwoLinkList --
// var users2 = new TwoLinkList('one');
// users2.AddToEnd('two');
// users2.AddToEnd('three');
// let two = users2.FindAt(2);
// console.log(two);
// users2.PrintAll();
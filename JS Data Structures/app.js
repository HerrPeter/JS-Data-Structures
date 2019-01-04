// app.js : Main entry point for the app.
const OneLinkList = require('./Data Structs/OneLinkList');
const TwoLinkList = require('./Data Structs/TwoLinkList');
const test_OneList = require('./tests/Test_OneLinkList');

// -- Test the OneLinkList --
//test_OneList.OverallOneLinkTest(true);
// Need to check RemoveAt with only 2 items.
// Also need to check RemoveAt with many items, but removing the first item.

// -- TwoLinkList --
var list = new TwoLinkList('one');
list.AddToEnd('two');
list.AddToEnd('three');

list.RemoveThis('three');
console.log(list);
//list.PrintAll();
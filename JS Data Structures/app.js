// app.js : Main entry point for the app.
const OneLinkList = require('./Data Structs/OneLinkList');
const TwoLinkList = require('./Data Structs/TwoLinkList');
const test_OneList = require('./tests/Test_OneLinkList');

// -- TwoLinkList --
list = new TwoLinkList('one');
list.AddToEnd('two');
list.AddToEnd('three');
list.AddToEnd('four');
list.RemoveThis(new String('three'));
console.log(list);
//list.PrintAll();

// -- Test --

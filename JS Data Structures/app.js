// app.js : Main entry point for the app.
const OneLinkList = require('./Data Structs/OneLinkList');
const TwoLinkList = require('./Data Structs/TwoLinkList');
const Stack = require('./Data Structs/Stack');
const test_OneList = require('./tests/Test_OneLinkList');

// -- Stack --
let stak = new Stack('before one');
stak.Push('one');
stak.Push('two');
stak.Pop();
stak.Push('two');
stak.Push('three');
stak.Swap();
let top = stak.Peek();
top = null;
stak.Empty();

// -- Test --
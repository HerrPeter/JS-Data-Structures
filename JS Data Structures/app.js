// app.js : Main entry point for the app.
const OneLinkList = require('./Data Structs/OneLinkList');
const TwoLinkList = require('./Data Structs/TwoLinkList');
const Stack = require('./Data Structs/Stack');
const Queue = require('./Data Structs/Queue');
const test_OneList = require('./tests/Test_OneLinkList');

// -- Queue --
let q = new Queue('before one');
q.Enqueue('one');
q.Enqueue('two');
q.Enqueue('two');
q.Enqueue('three');

let top = q.Peek();
console.log(top);

q.Dequeue();
q.Dequeue();
q.Dequeue();
q.Dequeue();
let empty = q.IsEmpty();
console.log(empty);
// top = null;
// stak.Empty();

// -- Test --
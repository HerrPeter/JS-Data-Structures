// app.js : Main entry point for the app.
const LinkedLists = require('./Data Structs/Linked Lists.js');

var Users = new LinkedLists.OneLinkList();
Users.AddToEnd(null);
Users.AddToEnd(null);
// Users.AddToEnd('Third');
// Users.AddToEnd({
//     one: '1',
//     two: '2',
// });
// Users.AddToEnd(new String('20'));

Users.PrintAll();

try {
    Users.RemoveAt(1.2);
} catch (err) {
    console.log(err);
}
console.log('\n');
let three = {
    one: '1',
    two: '2',
};
let twenty = three;
console.log(Users.Contains(twenty));
console.log('\n');
Users.PrintAll();
//console.log(Users);

//console.log(Users.__proto__);
//console.log(Users);

// class Product{
//     //static num = 2;
//     constructor(name, price){
//         this.name = name;
//         this.price = 10;
//         console.log('In Product ctor.');
//     }        
// }

// class Food extends Product {
//     constructor(name, price) {
//         //Product.call(this, name);
//         super();
//         this.category = this.price;
//     }
// }

//console.log(new Food('cheese', 5).name);
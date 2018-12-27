// app.js : Main entry point for the app.
const LinkedLists = require('./Data Structs/Linked Lists.js');

var Users = new LinkedLists.OneLinkList('First');
Users.AddToEnd('Second');
Users.AddToEnd('Third');
Users.AddToEnd('Fourth');

//console.log(Users);
Users.PrintAll();
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
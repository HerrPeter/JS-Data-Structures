
//'use strict';

class Foo {
    constructor() {
        this.bar = 'bar';
    }
}

Foo.prototype.getBar = function() {
    return this.bar;
}

module.exports = Foo;
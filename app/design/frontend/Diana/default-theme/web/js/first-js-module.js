define([], function() {
    'use strict';
    return {
        name: 'John',
        surname: 'Snow',
        age: 25,
        displayName: function() {
            console.log(this.name + ' ' + this.surname + '!');
        }
    }
});

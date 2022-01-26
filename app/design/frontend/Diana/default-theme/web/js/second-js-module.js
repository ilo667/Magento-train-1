define([
    'js/first-js-module'
], function(firstJsModule) {
    'use strict';
    return function() {
        console.log(firstJsModule);
        firstJsModule.city = 'Kyiv';
        firstJsModule.displayName();
        firstJsModule.name = 'Curt';
        firstJsModule.displayName();
        console.log(firstJsModule);
    }
});

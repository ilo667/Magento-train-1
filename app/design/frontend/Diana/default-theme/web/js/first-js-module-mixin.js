define([
    'mage/utils/wrapper'
    ], function(wrapper) {
    'use strict';

    return function(firstJsModule) {
        firstJsModule.propertyFromMixin = 'valueFromMixin';
        firstJsModule.displayName = wrapper.wrapSuper(firstJsModule.displayName, function(hash) {
            this._super(hash);
            console.log('First-js-module-mixin works!');
        });

        return firstJsModule;
    };
});

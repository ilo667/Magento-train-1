define(function () {
    'use strict';

    var mixin = {
        newExtendedProperty: function () {
            console.log('newExtendedProperty from first-js-ui-component-mixin');
        }
    };

    return function (Component) {
        return Component.extend(mixin);
    };
});

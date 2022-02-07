define([
    'uiComponent',
    'ko'
], function(Component, ko) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Magento_Checkout/summary/edit-cart-button'
        },
        cartUrl: window.checkoutConfig.cartUrl,

        initialize: function () {
            this._super();
        }
    });
});

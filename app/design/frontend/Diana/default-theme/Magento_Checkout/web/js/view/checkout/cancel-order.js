define([
    'uiComponent',
    'ko',
    'jquery',
    'mage/url',
    'Magento_Ui/js/modal/confirm',
    'mage/translate'
], function(Component, ko, $, url, confirmation, $t) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Magento_Checkout/checkout/cancel-order'
        },
        initialize: function () {
            this._super();
        },
        cancelOrder: function () {
            confirmation({
                title: $.mage.__('Cancel Order'),
                content: $.mage.__('Do you really want to cancel your order?'),
                buttons: [{
                    text: $t('No'),
                    class: 'action-secondary action-dismiss',
                    click: function (event) {
                        this.closeModal(event);
                    }
                }, {
                    text: $t('Yes'),
                    class: 'action-primary action-accept',
                    click: function (event) {
                        this.closeModal(event, true);
                    }
                }],
                actions: {
                    confirm: function() {
                        window.location.href = url.build('firstmodule/items/remove');
                    },
                    cancel: function() {
                        console.log('cancel')
                    },
                    always: function() {
                        console.log('always')
                    }
                }
            })
        }
    });
});

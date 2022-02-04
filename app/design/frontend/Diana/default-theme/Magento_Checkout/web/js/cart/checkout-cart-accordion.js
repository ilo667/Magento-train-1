define([
    'jquery',
    'matchMedia',
    'underscore',
    'accordion',
    'domReady!'
], function ($, mediaCheck, _) {
    'use strict';

        mediaCheck({
            media: '(min-width: 768px)',

            /**
             * Switch to Desktop Version.
             */
            entry: function() {
                var checkoutCartAccordion = $('#checkout-cart-accordion');
                if (!_.isUndefined(checkoutCartAccordion.data().mageAccordion)) {
                    checkoutCartAccordion.accordion('destroy');
                }
            },

            /**
             * Switch to Mobile Version.
             */
            exit: function () {
                $('#checkout-cart-accordion').accordion({
                    "collapsible": true
                });
            }
        });
});

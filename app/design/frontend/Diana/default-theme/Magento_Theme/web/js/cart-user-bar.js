define(['jquery'], function($) {
    'use strict';

    return function() {
        $('.cart-user-bar').on('click', function() {
            $('.content-cart-user-bar').slideToggle(300, "linear");
            $('.action.showcart').trigger('click').hide();
        });
    }
});

define(['jquery'], function($) {
    'use strict';

    return function(config, element) {
        $(config.cartUserBar).on('click', function() {
            $(config.contentCartUserBar).slideToggle(300, "linear");
            $(config.actionShowcart).trigger('click').hide();
        });
        $(config.searchUserBar).on('click', function() {
            $(config.contentSearchUserBar).slideToggle(300, "linear");
        });
    }
});

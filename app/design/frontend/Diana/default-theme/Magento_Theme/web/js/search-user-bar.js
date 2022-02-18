define(['jquery'], function($) {
    'use strict';

    return function() {
        $('.search-user-bar').on('click', function() {
            $('.content-search-user-bar').slideToggle(300, "linear");
        });
    }
});

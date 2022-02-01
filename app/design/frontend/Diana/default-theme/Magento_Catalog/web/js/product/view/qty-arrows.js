define(['jquery'], function($) {
    'use strict';

    return function() {
        $('.left-arrow').on('click', function() {
            let qty = Number($('#qty').val());
            if (qty > 1) {
                qty -= 1;
                $('#qty').val(qty);
            }
        });
        $('.right-arrow').on('click', function() {
            let qty = Number($('#qty').val());
                qty += 1;
                $('#qty').val(qty);
        });
    }
});

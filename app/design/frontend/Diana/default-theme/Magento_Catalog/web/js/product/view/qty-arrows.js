define(['jquery'], function($) {
    'use strict';

    return function() {
        $('.left-arrow').click(function() {
            let qty = Number($('#qty').val());
            if( qty > 1 ) {
                qty -= 1;
                $('#qty').val(qty);
            }
        });
        $('.right-arrow').click(function() {
            let qty = Number($('#qty').val());
            if( qty < 10_000) {
                qty += 1;
                $('#qty').val(qty);
            }
        });
    }
});

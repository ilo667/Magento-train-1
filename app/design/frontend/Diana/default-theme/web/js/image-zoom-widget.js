define(['jquery', 'jquery/ui'], function($) {
    'use strict';

    $.widget('mage.imagezoom', {

        _create: function () {
            console.log('image-zoom-widget created');
            this.element
                .delegate("img", "click", function(element) {
                    if(element.currentTarget.style.zoom == '150%') {
                        $(element.currentTarget).css('zoom', 100 + '%');
                        $(element.currentTarget).siblings().css('zoom', 100 + '%')
                    } else {
                        $(element.currentTarget).css('zoom', 150 + '%');
                        $(element.currentTarget).siblings().css('zoom', 75 + '%');
                    }
                });
        },
    });

    return $.mage.imagezoom;
});

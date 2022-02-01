define(['jquery', 'jquery/ui'], function($) {
    'use strict';

    $.widget('mage.imagezoom', {
        _create: function () {
            console.log('image-zoom-widget created');
            $(this.element)
                .on('click', 'img', function(element) {
                    if ($(element.currentTarget).hasClass('img-with-zoom-150')) {
                        $(element.currentTarget).removeClass('img-with-zoom-150');
                        $(element.currentTarget).siblings().removeClass('img-with-zoom-75');
                    } else {
                        if ($(element.currentTarget).hasClass('img-with-zoom-75')) {
                            $(element.currentTarget).removeClass('img-with-zoom-75');
                        }
                        if ($(element.currentTarget).siblings().hasClass('img-with-zoom-150')) {
                            $(element.currentTarget).siblings().removeClass('img-with-zoom-150');
                        }
                        $(element.currentTarget).addClass('img-with-zoom-150')
                        $(element.currentTarget).siblings().addClass('img-with-zoom-75');
                    }
                });
        },
    });

    return $.mage.imagezoom;
});

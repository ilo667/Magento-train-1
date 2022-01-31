define(['jquery','js/image-zoom-widget'], function($) {
    'use strict';

    $.widget('mage.imagezoomExtended', $.mage.imagezoom, {
        _create: function() {
            console.log('extended zoom');
            this.element
                .delegate("img", "mouseover", function(element) {
                    $(element.currentTarget).siblings().css('filter', 'grayscale(100%)');
                });
            this.element
                .delegate("img", "mouseout", function(element) {
                    $(element.currentTarget).siblings().css('filter', 'grayscale(0%)');
                });
            this._super();
        }
    });
    return $.mage.imagezoomExtended;
});

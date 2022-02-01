define(['jquery', 'jquery/ui', 'js/image-zoom-widget'], function($) {
    'use strict';

    $.widget('mage.imagezoomExtended', $.mage.imagezoom, {
        _create: function() {
            console.log('extended zoom');
            $(this.element)
                .on('mouseover', 'img', function(element) {
                    $(element.currentTarget).siblings().addClass('img-grey-scale');
                });
            $(this.element)
                .on('mouseout', 'img', function(element) {
                    $(element.currentTarget).siblings().removeClass('img-grey-scale');
                });
            this._super();
        }
    });
    
    return $.mage.imagezoomExtended;
});

define(['jquery'], function($) {
    'use strict';

    var imageZoomWidgetMixin = {
        _create: function () {
            this.element
                .delegate("img", "click", function(element) {
                    if(element.currentTarget.style.zoom == '150%') {
                        $(element.currentTarget).siblings().animate({opacity: '1'}, "slow");
                    } else {
                        $(element.currentTarget).siblings().animate({opacity: '0.4'}, "slow");
                        $(element.currentTarget).animate({opacity: '1'}, "slow");
                    }
                });

            return this._super();
        }
    };

    return function(targetWidget) {
        $.widget('mage.imagezoom', targetWidget, imageZoomWidgetMixin);

        return $.mage.imagezoom;
    };
});

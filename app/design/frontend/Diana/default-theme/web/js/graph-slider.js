define([
    'uiComponent',
    'jquery',
    'ko',
    'mage/url',
    'jquery/ui',
    'slick',
    'domReady!'
], function(Component, $, ko, url) {
    'use strict';

    return Component.extend({
        defaults: {
            products: ko.observableArray([]),
            inputProductName: ko.observable(),
            inputQuantitySlides: ko.observable(),
            qtyOfItemsQuery: ko.observable()
        },
        initialize: function () {
            this._super();
            this.renderInitSlider();
        },
        slickInit: function () {
            $(".product-slider").slick({
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 3,
                slidesToScroll: 3,
                arrows: true
            });
        },
        renderCustomProductSlider: function() {
            var name = this.inputProductName();
            var qty = this.inputQuantitySlides();
            var self = this;
            self.products([]);
            var query = '{\n' +
                '  products(search: "'+ name +'") {\n' +
                '    total_count\n' +
                '    items {\n' +
                '      name\n' +
                '      sku\n' +
                '      price_range {\n' +
                '        minimum_price {\n' +
                '          regular_price {\n' +
                '            value\n' +
                '          }\n' +
                '      \t}\n' +
                '      }\n' +
                '      image {\n' +
                '        url\n' +
                '      }\n' +
                '    }\n' +
                '  }\n' +
                '}';
            $.ajax({
                method: "POST",
                url: url.build('graphql'),
                data: JSON.stringify({"query": query}),
                contentType: 'application/json',
                success: function (result) {
                    for (var item of result.data.products.items ) {
                        if (self.products().length == qty) {
                            break;
                        }
                        self.products.push(item);
                    }
                    $(".product-slider").slick('refresh');
                    var previousQtyOfItemsQuery = self.qtyOfItemsQuery();
                    self.removeRedundantSlides(qty, previousQtyOfItemsQuery);
                    self.qtyOfItemsQuery(qty);
                }
            });
        },
        removeRedundantSlides: function(qtyMustKeep, previousQtyOfItemsQuery) {
            var maxI = +previousQtyOfItemsQuery + +qtyMustKeep;
            for (var i = maxI - 1; i >= qtyMustKeep; i--) {
                $('.product-slider').slick('slickRemove', i);
            }
        },
        renderInitSlider: function() {
            this.products.removeAll();
            var self = this;
            this.qtyOfItemsQuery(6);
            var query = '{\n' +
                '  products(filter: { price: { to: "50" }}) {\n' +
                '    total_count\n' +
                '    items {\n' +
                '      name\n' +
                '      sku\n' +
                '      price_range {\n' +
                '        minimum_price {\n' +
                '          regular_price {\n' +
                '            value\n' +
                '          }\n' +
                '      \t}\n' +
                '      }\n' +
                '      image {\n' +
                '        url\n' +
                '      }\n' +
                '    }\n' +
                '  }\n' +
                '}';
            $.ajax({
                method: "POST",
                url: url.build('graphql'),
                data: JSON.stringify({"query": query}),
                contentType: 'application/json',
                success: function (result) {
                    for (var item of result.data.products.items) {
                        if (self.products().length == 6) {
                            break;
                        }
                        self.products.push(item);
                    }
                    self.slickInit();
                }
            });
        }
    });
});

define([
    'uiComponent',
    'jquery',
    'ko',
    'underscore',
    'js/selector-store',
    'js/selector-city'
], function(Component, $, ko, _){
    'use strict';

    return Component.extend({
        defaults: {
            selectedCity: ko.observable(),
            headerCity: ko.observable(),
            imports: {
                selectedCity: 'selectorCity:selectedCity',
                availableStores: 'selectorStore:availableStores'
            }
        },
        initObservable: function () {
            this._super().observe(['selectedCity', 'availableStores']);

            return this;
        },
        initialize: function() {
            var self = this;
            this._super();
            self.selectedCity.subscribe(function(value) {
                if (!_.isUndefined(value)) {
                    self.headerCity(value.label);
                }
            });
        }
    });
});

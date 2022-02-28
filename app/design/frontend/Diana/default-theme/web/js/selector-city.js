define([
    'uiComponent',
    'jquery',
    'ko',
    'underscore'
], function(Component, $, ko, _) {
    'use strict';

    return Component.extend({
        defaults: {
            availableCities: ko.observableArray([
                {
                    "id": "83664",
                    "label": "Київ",
                    "is_strong": true
                },
                {
                    "id": "83659",
                    "label": "Вінниця",
                },
                {
                    "id": "83660",
                    "label": "Дніпро"
                },
                {
                    "id": "83661",
                    "label": "Житомир",
                },
                {
                    "id": "83662",
                    "label": "Запоріжжя"
                },
                {
                    "id": "83663",
                    "label": "Івано-Франківськ"
                },
                {
                    "id": "83665",
                    "label": "Кременчук"
                },
                {
                    "id": "83666",
                    "label": "Кривий Ріг"
                },
                {
                    "id": "83667",
                    "label": "Кропивницький"
                },
                {
                    "id": "83668",
                    "label": "Луцьк"
                },
                {
                    "id": "83669",
                    "label": "Львів"
                },
                {
                    "id": "83670",
                    "label": "Маріуполь"
                },
                {
                    "id": "83671",
                    "label": "Миколаїв"
                },
                {
                    "id": "83672",
                    "label": "Одеса"
                },
                {
                    "id": "83673",
                    "label": "Полтава"
                },
                {
                    "id": "83674",
                    "label": "Рівне"
                },
                {
                    "id": "83675",
                    "label": "Суми"
                },
                {
                    "id": "83676",
                    "label": "Тернопіль"
                },
                {
                    "id": "83677",
                    "label": "Ужгород"
                },
                {
                    "id": "83678",
                    "label": "Харків"
                },
                {
                    "id": "83679",
                    "label": "Херсон"
                },
                {
                    "id": "83680",
                    "label": "Хмельницький"
                },
                {
                    "id": "83681",
                    "label": "Черкаси"
                },
                {
                    "id": "83683",
                    "label": "Чернівці"
                },
                {
                    "id": "83682",
                    "label": "Чернігів"
                }]),
            selectedCity: ko.observable(),
            paramCity: ko.observable()
        },
        initObservable: function () {
            this._super().observe(['selectedCity', 'availableCities']);

            return this;
        },
        initialize: function () {
            this._super();
            this.setInitialCity();
        },
        setInitialCity: function() {
            var self = this;
            var url = new URL(window.location.href);
            if (!_.isNull(url.href.match(/city=./))) {
                for (var param of url.search.split('&')) {
                    if (!_.isNull(param.match(/city=./))) {
                        self.paramCity(decodeURI(param.split('=')[1]));
                    }
                }
                self.selectedCity(self.paramCity());
            } else {
                self.selectedCity('Київ') ;
            }
        }
    });
});

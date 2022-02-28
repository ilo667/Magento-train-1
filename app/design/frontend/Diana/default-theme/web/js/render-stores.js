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
            currentPageNumber: ko.observable(0),
            elementsPerPage: 6,
            quantityOfPages: ko.observable(),
            quantityOfPagesRenderer: ko.observableArray([]),
            paginatedElements: ko.observableArray(),
            selectedCity: ko.observable(),
            paramPage: ko.observable(),
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
            self.setInitialCurrentPageFromURLParameters();
            self.computeQuantityOfPages(self.availableStores());
            self.renderPaginatedElements(self.availableStores());
            self.availableStores.subscribe(function(value) {
                if (!_.isUndefined(value)) {
                    self.computeQuantityOfPages(self.availableStores());
                    self.renderPaginatedElements(self.availableStores());
                }
            });
        },
        setInitialCurrentPageFromURLParameters: function () {
            var self = this;
            var url = new URL(window.location.href);
            if (!_.isNull(url.href.match(/page=\d/))) {
                self.paramPage(url.href.match(/page=\d/)[0].match(/\d/)[0]);
                self.currentPageNumber(self.paramPage() - 1);
            } else {
                self.paramPage(null);
                self.currentPageNumber(0);
            }
        },
        computeQuantityOfPages: function (data) {
            var self = this;
            self.quantityOfPagesRenderer([]);
            self.quantityOfPages = ko.computed(function() {
                var quantityOfPages = Math.ceil(data.length / self.elementsPerPage);
                return quantityOfPages;
            });
            for (var i = 1; i <= self.quantityOfPages(); i++) {
                var isCurrent = (+self.currentPageNumber() + 1 == i);
                self.quantityOfPagesRenderer.push({
                    numberOfPage: i,
                    isCurrent: ko.observable(isCurrent)
                });
            }
        },
        renderPaginatedElements: function(data) {
            var self = this;
            var firstPaginatedElement = self.currentPageNumber() * self.elementsPerPage;
            self.paginatedElements([]);
            if (self.quantityOfPages() === 1) {
                for (var item of self.availableStores()) {
                    self.paginatedElements.push(item)
                }
            } else {
                var paginatedElements = data.slice(firstPaginatedElement, firstPaginatedElement + self.elementsPerPage);
                for (var item of paginatedElements) {
                    self.paginatedElements.push(item);
                }
            }
        },
        nextPage: function (element, event) {
            var self = this;
            var currentPageNumber = self.currentPageNumber();
            if (currentPageNumber < self.quantityOfPages() - 1) {
                self.currentPageNumber(currentPageNumber + 1);
                self.renderPaginatedElements(self.availableStores());
                self.quantityOfPagesRenderer()[currentPageNumber].isCurrent(false);
                self.quantityOfPagesRenderer()[self.currentPageNumber()].isCurrent(true);
                var url = new URL(window.location.href);
                url.searchParams.set('page', `${currentPageNumber + 2}`);
                window.history.replaceState(null, null, url);
            }
        },
        previousPage: function() {
            var self = this;
            var currentPageNumber = self.currentPageNumber();
            if (currentPageNumber > 0) {
                self.currentPageNumber(currentPageNumber - 1);
                self.renderPaginatedElements(self.availableStores());
                self.quantityOfPagesRenderer()[currentPageNumber].isCurrent(false);
                self.quantityOfPagesRenderer()[self.currentPageNumber()].isCurrent(true);
                var url = new URL(window.location.href);
                url.searchParams.set('page', `${currentPageNumber}`);
                window.history.replaceState(null, null, url);
            }
        },
        linkToPageNumber: function(element, event) {
            var self = this;
            var targetPageNumber = element.numberOfPage;
            var url = new URL(window.location.href);
            url.searchParams.set('page', `${targetPageNumber}`);
            window.history.replaceState(null, null, url);
            var currentPageNumber = self.currentPageNumber();
            self.currentPageNumber(targetPageNumber - 1);
            self.renderPaginatedElements(self.availableStores());
            self.quantityOfPagesRenderer()[currentPageNumber].isCurrent(false);
            self.quantityOfPagesRenderer()[self.currentPageNumber()].isCurrent(true);
        }
    });
});

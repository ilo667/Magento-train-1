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
            currentPageNumber: ko.observable(1),
            elementsPerPage: 6,
            quantityOfPages: ko.observable(),
            quantityOfPagesRenderer: ko.observableArray([]),
            paginatedElements: ko.observableArray([]),
            selectedCity: ko.observable(),
            paramPage: ko.observable(),
            imports: {
                // Observable variable of selected city by user
                selectedCity: 'selectorCity:selectedCity',
                // Observable array with all available stores filtered with selected city and brand
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
            this.setCurrentPageFromURLParam();
            this.computeQuantityOfPages(this.availableStores());
            this.renderPaginatedElements(this.availableStores());
            this.availableStores.subscribe(function(value) {
                if (!_.isUndefined(value)) {
                    self.computeQuantityOfPages(self.availableStores());
                    self.renderPaginatedElements(self.availableStores());
                }
            });
        },
        setCurrentPageFromURLParam: function () {
            var url = new URL(window.location.href);

            if (!_.isNull(url.href.match(/page=\d/))) {
                this.paramPage(url.href.match(/page=\d/)[0].match(/\d/)[0]);
                this.currentPageNumber(this.paramPage());
            } else {
                this.paramPage(null);
                this.currentPageNumber(1);
            }
        },
        computeQuantityOfPages: function (data) {
            var self = this;

            this.quantityOfPagesRenderer([]);
            this.quantityOfPages = ko.computed(function() {
                return Math.ceil(data.length / self.elementsPerPage);
            });
            for (var i = 1; i <= this.quantityOfPages(); i++) {
                var isCurrent = (+this.currentPageNumber() == i);
                this.quantityOfPagesRenderer.push({
                    numberOfPage: i,
                    isCurrent: ko.observable(isCurrent)
                });
            }
        },
        renderPaginatedElements: function(data) {
            var firstPaginatedElement = (this.currentPageNumber() - 1) * this.elementsPerPage;

            this.paginatedElements([]);
            if (this.quantityOfPages() === 1) {
                for (var item of this.availableStores()) {
                    this.paginatedElements.push(item);
                }
            } else {
                var paginatedElements = data.slice(firstPaginatedElement, firstPaginatedElement + this.elementsPerPage);
                for (var item of paginatedElements) {
                    this.paginatedElements.push(item);
                }
            }
        },

        setPage: function (targetPageNumber) {
            var url = new URL(window.location.href);
            var currentPageNumber = this.currentPageNumber();

            url.searchParams.set('page', targetPageNumber);
            window.history.replaceState(null, null, url);
            this.currentPageNumber(targetPageNumber);
            this.renderPaginatedElements(this.availableStores());
            this.quantityOfPagesRenderer()[currentPageNumber - 1].isCurrent(false);
            this.quantityOfPagesRenderer()[this.currentPageNumber() - 1].isCurrent(true);
        },

        nextPage: function (element, event) {
            if (this.currentPageNumber() < this.quantityOfPages()) {
                this.setPage(this.currentPageNumber() + 1);
            }
        },
        previousPage: function() {
            if (this.currentPageNumber() > 1) {
                this.setPage(this.currentPageNumber() - 1);
            }
        },
        linkToPageNumber: function(element, event) {
            this.setPage(element.numberOfPage);
        }
    });
});

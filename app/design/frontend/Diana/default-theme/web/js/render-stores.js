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
            imports: {
                selectedCity: 'selectorCity:selectedCity',
                availableStores: 'selectorStore:availableStores'
            }
        },

        /**
         * Init observable variables
         * @return {Object}
         */
        initObservable: function () {
            this._super().observe(['selectedCity', 'availableStores']);

            return this;
        },

        initialize: function() {
            var self = this;

            this._super();

            this.setInitialPage();
            this.computeQuantityOfPages(this.availableStores());
            this.renderPaginatedData(this.availableStores());
            this.availableStores.subscribe(function(value) {
                if (!_.isUndefined(value)) {
                    self.computeQuantityOfPages(self.availableStores());
                    self.renderPaginatedData(self.availableStores());
                }
            });
        },

        /**
         * Set current page from URL parameters as the previous checked page before reloading page
         * Set default current page if URL parameters are absent
         */
        setInitialPage: function () {
            var url = new URL(window.location.href);

            if (!_.isNull(url.href.match(/page=\d/))) {
                var paramPage = url.href.match(/page=\d/)[0].match(/\d/)[0];
                this.currentPageNumber(paramPage);
            } else {
                this.currentPageNumber(1);
            }
        },

        /**
         * Compute quantity of pages of data which is to be paginated
         * @param data
         */
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

        /**
         * Render paginated data which are shown on the current page
         * @param data
         */
        renderPaginatedData: function(data) {
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

        /**
         * Set a current page number as a target page number
         * @param targetPage
         */
        setPage: function (targetPage) {
            var currentPageNumber = this.currentPageNumber();
            var url = new URL(window.location.href);

            url.searchParams.set('page', targetPage);
            window.history.replaceState(null, null, url);

            this.currentPageNumber(targetPage);
            this.renderPaginatedData(this.availableStores());
            this.quantityOfPagesRenderer()[currentPageNumber - 1].isCurrent(false);
            this.quantityOfPagesRenderer()[this.currentPageNumber() - 1].isCurrent(true);
        },

        /**
         * Set a current page number as a next page number
         */
        nextPage: function () {
            if (this.currentPageNumber() < this.quantityOfPages()) {
                this.setPage(this.currentPageNumber() + 1);
            }
        },

        /**
         * Set a current page number as a next previous number
         */
        previousPage: function() {
            if (this.currentPageNumber() > 1) {
                this.setPage(this.currentPageNumber() - 1);
            }
        },

        /**
         * Set a current page number as a clicked page number
         */
        linkToPageNumber: function(element, event) {
            this.setPage(element.numberOfPage);
        }
    });
});

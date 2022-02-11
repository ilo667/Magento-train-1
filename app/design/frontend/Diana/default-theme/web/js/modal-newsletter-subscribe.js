define([
    'jquery',
    'ko',
    'Magento_Ui/js/modal/modal',
    'underscore',
    'jquery/ui',
    'mage/cookies',
    'jquery/jquery.cookie'
], function($, ko, modal, _) {
    'use strict';

    return function() {
        var newsletterPopup = $('#newsletter-popup');
        var options = {
            type: 'popup',
            responsive: true,
            title: 'Subscribe',
            buttons: [{
                text: $.mage.__('Cancel'),
                type: "submit",
                class: 'action subscribe primary',
                click: function () {
                    this.closeModal();
                    sessionStorage.setItem('modal-newsletter-cancel', 'cancel');
                }
            }]
        };
        $('#button-subscribe-newsletter').on('click', function() {
            $.cookie('modal-newsletter-subscribe', 'subscribe', { expires: 14 });
        });
        var popup = modal(options, newsletterPopup);
        if (_.isNull($.cookie('modal-newsletter-subscribe')) && (_.isNull(sessionStorage.getItem('modal-newsletter-cancel')))) {
            newsletterPopup.show();
            newsletterPopup.modal('openModal');
        } else {
            newsletterPopup.hide();
        }
    }
});

define([
    'uiComponent',
    'ko',
    'jquery',
    'mage/url',
    'mage/translate'
], function(Component, ko, $, url, $t) {
    'use strict';

    return Component.extend({
        defaults: {
            isPasswordVisible: ko.observable(false),
            isCheckEmailVisible: ko.observable(true),
            isCreateAccountVisible: ko.observable(false),
            userEmail: ko.observable(),
            checkMessage: ko.observable()
        },
        initialize: function() {
            this._super();
        },
        checkEmail: function() {
            var self = this,
            userEmail = this.userEmail(),
            query = '{isEmailAvailable(email: "' + userEmail +
                '" ) {is_email_available}}';

            if ($('.login-container .form-login').validation() && $('.login-container .form-login').validation('isValid')) {
                $.ajax({
                    method: "POST",
                    url: url.build("graphql"),
                    data: JSON.stringify({"query": query}),
                    contentType: 'application/json',
                    success: function (result) {
                        if (!result.data.isEmailAvailable.is_email_available) {
                            self.checkMessage($t("This email exists. Please, enter the password."));
                            self.isPasswordVisible(true);
                            self.isCheckEmailVisible(false);
                            self.isCreateAccountVisible(false);
                        } else {
                            self.checkMessage($t("You can create an account."));
                            self.isCreateAccountVisible(true);
                        }
                    }
                });
            }
        }
    });
});

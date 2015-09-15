var braintreeFactory = require('./braintree-factory');
var braingular = window.angular.module('braintree-angular', []);

braingular.factory('$braintree', braintreeFactory.fullBraintreeFactory);

braingular.directive('braintreeDropin', function() {
  return {
    scope: {
      options: '='
    },
    template: '<div id="bt-dropin"></div>',
    controller: ['$scope', '$braintree', function($scope, $braintree) {
      var options = $scope.options || {};
      options.container = 'bt-dropin';

      $braintree.setupDropin(options);
    }]
  }
});

braingular.directive('braintreePaypal', function() {
  return {
    scope: {
      options: '='
    },
    template: '<div id="bt-paypal"></div>',
    controller: function($scope, $braintree) {
      var options = $scope.options || {};
      options.paypal = {
        container: 'bt-paypal'
      };


      // Teardown any existing BT integration

      // Delete callback_json keys off of window
      for (var key in window) {
        if (key.indexOf('callback_json') >= 0) {
          delete window[key];
        }
      }

      var addedListeners = [];
      var braintreeSetupFinished = false;

      if (!window.monkeyPatchedAddEventListener) {

        window.monkeyPatchedAddEventListener = true;

        var oldEventListener = window.addEventListener;

        window.addEventListener = function (type, callback) {
          console.log('ye', addedListeners);
          oldEventListener(type, callback);
        };
      }

      $braintree.setupPayPal(options);

      braintreeSetupFinished = true;
    }
  }
});

module.exports = braingular;

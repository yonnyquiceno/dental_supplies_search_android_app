angular.module('starter.controllers', [])

  .controller('AboutCtrl', function($scope) {})

  .controller('ChatsCtrl', function($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('SearchCtrl', function($scope, $http) {
    $scope.cat = "";
    $scope.sendRequest = function(query, cat) {
      $scope.products = [];
      $http.get("http://dz-suggestions-api.herokuapp.com/suggestions?q=".concat(query) + "&cat=".concat(cat))
        .success(function(products) {
          $scope.products.push(products.suggestions);
          $scope.set_number_of_articles($scope.products[0].length);
          $scope.articles_finded(true);
          cordova.plugins.Keyboard.close();
          Keyboard.close();
          console.log("request sent");
        }).error(function(products, status){
          cordova.plugins.Keyboard.close();
          $scope.articles_finded(false);
        });
    }

    $scope.articles_finded = function(bool) {
      $scope.message_switch=bool;
    }
    $scope.set_number_of_articles = function(noa) {
      $scope.number_of_articles = noa
    }
  });

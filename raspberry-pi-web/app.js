"use strict"

var app = angular
  .module("raspberry", []);

app.factory('socket', ['$rootScope', function($rootScope) {
  var socket = io.connect("http://localhost:8081");

  return {
    on: function(eventName, callback){
      socket.on(eventName, callback);
    },
    emit: function(eventName, data) {
      socket.emit(eventName, data);
    }
  };
}]);

app.controller("indexController", indexController);

indexController.$inject = [ "$scope", "socket" ];

function indexController($scope, socket) {
  var vm = this;

  vm.prender = prender;
  vm.leds = [{
    "id": 0,
    "color": "green",
    "isChecked": false
  }, {
    "id": 1,
    "color": "red",
    "isChecked": false
  }, {
    "id": 2,
    "color": "green",
    "isChecked": false
  }];

  function prender(led) {
    if (led.isChecked)
      socket.emit("turnOn", led);
  }
}
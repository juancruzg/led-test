"use strict"

var app = angular
  .module("raspberry", []);

app.factory('socket', ['$rootScope', function($rootScope) {
  var socket = io.connect("http://54.233.85.103:8080/");

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

  vm.send = send;
  vm.prender = prender;
  vm.messages = [];

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

  function send() {
    vm.message = vm.username + ": " + vm.message;
    vm.messages.push(vm.message);
    socket.emit("broadcast", { "eventName": "sendMessage", "data": vm.message });
    vm.message = "";
  }

  function prender(led) {
    socket.emit("broadcast", { "eventName": "turnOn", "data": led });
  }

  socket.on("turnOn", function(led) {
    vm.leds[led.id].isChecked = !vm.leds[led.id].isChecked;
    $scope.$apply();
  });

  socket.on("sendMessage", function(message) {
    vm.messages.push(message);
    $scope.$apply();
  });
}

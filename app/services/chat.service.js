"use strict";
var Observable_1 = require('rxjs/Observable');
var io = require('socket.io-client');
var ChatService = (function () {
    function ChatService() {
        this.url = 'http://localhost:3000';
    }
    ChatService.prototype.sendMessage = function (message, image) {
        this.socket.emit('sendchat', message, image);
    };
    ChatService.prototype.JoinChat = function (username, room) {
        if (username) {
            this.socket.emit('adduser', username, room);
        }
    };
    ChatService.prototype.getMessages = function () {
        var _this = this;
        var observable = new Observable_1.Observable(function (observer) {
            _this.socket = io(_this.url);
            _this.socket.on('messages', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    ChatService.prototype.getuserList = function () {
        var _this = this;
        var observable = new Observable_1.Observable(function (observer) {
            _this.socket = io(_this.url);
            _this.socket.on('getusers', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    return ChatService;
}());
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map
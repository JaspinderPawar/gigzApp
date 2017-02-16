"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var authentication_service_1 = require("../services/authentication.service");
var user_service_1 = require("../services/user.service");
var User_1 = require("../models/User");
var Dictionary_1 = require("../helper/Dictionary");
var ChatComponent = (function () {
    function ChatComponent(authService, userService, renderer) {
        this.authService = authService;
        this.userService = userService;
        this.renderer = renderer;
        this.messages = [];
        this.curret_messages = [];
        this.onlineUsers = [];
        this.messagelist = new Dictionary_1.Dictionary();
        this.typing = false;
        this.timeout = undefined;
        this.newtimeout = undefined;
        this.isUserTyping = false;
    }
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.chatuser = new User_1.User();
        if (this.authService.socket != undefined) {
            this.socket = this.authService.socket;
            this.socket.on('messages', function (message) {
                if (message.text) {
                    for (var i = 0; i < _this.onlineUsers.length; i++) {
                        if (_this.onlineUsers[i].username == message.touser || _this.onlineUsers[i].username == message.sender) {
                            if (!_this.messagelist.ContainsKey(_this.onlineUsers[i].username)) {
                                _this.messagelist.Add(_this.onlineUsers[i].username, [message]);
                            }
                            else {
                                _this.messagelist.Item(_this.onlineUsers[i].username).push(message);
                            }
                        }
                    }
                    for (var i = 0; i < _this.onlineUsers.length; i++) {
                        if (_this.onlineUsers[i].username == message.sender) {
                            _this.onlineUsers[i].lastMessage = message.text.length > 15 ? message.text.substring(0, 14) + '...' : message.text + '...';
                            _this.onlineUsers[i].msgDate = Date.now();
                            if (_this.chatuser.username != message.sender) {
                                _this.onlineUsers[i].unreadMsgCount += 1;
                            }
                        }
                    }
                    _this.setMessage();
                }
            });
            this.socket.on('getusers', function (data) {
                _this.getOnlineUsers();
            });
            this.socket.on('isTyping', function (data) {
                if (data.istyping && _this.chatuser.username == data.username) {
                    _this.isUserTyping = true;
                }
                else {
                    _this.isUserTyping = false;
                }
            });
            this.socket.on('disconnected', function (username) {
                var index = _this.onlineUsers.findIndex(function (x) { return x.username == username; });
                if (index)
                    _this.onlineUsers.splice(index, 1);
                if (_this.chatuser.username == username && _this.onlineUsers.length > 0)
                    _this.startChat(_this.onlineUsers[0]);
                else
                    _this.chatuser = new User_1.User();
            });
            this.socket.on('getlist', function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].username != _this.authService.userName)
                        if (_this.onlineUsers.find(function (x) { return x.username == data[i].username; }) == undefined)
                            _this.onlineUsers.push(data[i]);
                }
                if (_this.chatuser.username == undefined && _this.onlineUsers.length > 0)
                    _this.startChat(_this.onlineUsers[0]);
            });
            this.socket.emit('pulllist');
        }
    };
    ChatComponent.prototype.sendMessage = function () {
        this.socket.emit("typing", this.chatuser.socketid, this.authService.userName, false);
        this.socket.emit('sendchat', this.message, this.authService.image, this.chatuser.socketid, this.authService.userName, this.chatuser.username, 'text');
        this.message = '';
    };
    ChatComponent.prototype.startChat = function (user) {
        for (var i = 0; i < this.onlineUsers.length; i++) {
            if (this.onlineUsers[i].username == user.username) {
                this.onlineUsers[i].selected = true;
                this.onlineUsers[i].unreadMsgCount = 0;
            }
            else {
                this.onlineUsers[i].selected = false;
            }
        }
        this.curret_messages = this.messages.find(function (x) { return x.username == user.username; });
        this.chatuser = user;
        this.setMessage();
    };
    ChatComponent.prototype.setMessage = function () {
        this.messages = [];
        if (this.chatuser) {
            if (this.messagelist.ContainsKey(this.chatuser.username))
                this.messages = this.messagelist.Item(this.chatuser.username);
        }
    };
    ChatComponent.prototype.getOnlineUsers = function () {
        var _this = this;
        this.userService.getOnlineUsers()
            .subscribe(function (users) {
            _this.onlineUsers = users;
        });
    };
    ChatComponent.prototype.timeoutFunction = function () {
        var _this = this;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
            _this.typing = false;
            _this.socket.emit("typing", _this.chatuser.socketid, _this.authService.userName, false);
        }, 2000);
    };
    ChatComponent.prototype.keypressHandler = function (event) {
        if (event.keyCode !== 13) {
            if (this.typing === false) {
                this.typing = true;
                this.socket.emit('typing', this.chatuser.socketid, this.authService.userName, true);
                this.timeoutFunction();
            }
            else {
                this.timeoutFunction();
            }
        }
        else {
            this.sendMessage();
        }
    };
    ChatComponent.prototype.onAttchmentClick = function (eventargs) {
        var event = new MouseEvent('click', { bubbles: true });
        this.renderer.invokeElementMethod(this.fileInput.nativeElement, 'dispatchEvent', [event]);
    };
    ChatComponent.prototype.onChange = function (event) {
        var _this = this;
        var files = event.target.files;
        var file = event.target.files[0];
        var myReader = new FileReader();
        myReader.onloadend = function (e) {
            _this.socket.emit('sendchat', myReader.result, _this.authService.image, _this.chatuser.socketid, _this.authService.userName, _this.chatuser.username, 'image');
        };
        myReader.readAsDataURL(file);
        // this.uploadService.makeFileRequest(this.authService.baseUrl+ 'api/upload', [], files).subscribe(() => {
        //   console.log('sent');
        // });
    };
    ChatComponent.prototype.ngOnDestroy = function () {
    };
    return ChatComponent;
}());
__decorate([
    core_1.ViewChild('fileInput'),
    __metadata("design:type", core_1.ElementRef)
], ChatComponent.prototype, "fileInput", void 0);
ChatComponent = __decorate([
    core_1.Component({
        selector: 'default',
        templateUrl: '/chat/chat.component.html'
    }),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService,
        user_service_1.UserService,
        core_1.Renderer])
], ChatComponent);
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map
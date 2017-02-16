import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { ChatResponse } from '../models/chatresponse';
import { User } from '../models/User';
import { Dictionary } from '../helper/Dictionary';
//import { UploadService } from '../services/upload.service';
import * as io from 'socket.io-client';

@Component({
    selector: 'default',
    templateUrl: '/chat/chat.component.html'
})



export class ChatComponent implements OnInit, OnDestroy {
    @ViewChild('fileInput') fileInput: ElementRef;   
    private socket;


    private m
    messages = [];
    private curret_messages = [];
    private message;
    private onlineUsers = [];
    private chatuser: User;
    messagelist = new Dictionary<ChatResponse[]>();

    typing = false;
    timeout = undefined;
    newtimeout = undefined;
    isUserTyping = false;
    constructor(
        private authService: AuthenticationService,
        private userService: UserService,
        private renderer: Renderer) {

    }

    ngOnInit() {
        this.chatuser = new User();
        if (this.authService.socket != undefined) {

            this.socket = this.authService.socket;
            this.socket.on('messages', (message) => {
                if ((<ChatResponse>message).text) {
                    for (var i = 0; i < this.onlineUsers.length; i++) {
                        if (this.onlineUsers[i].username == message.touser || this.onlineUsers[i].username == message.sender) {

                            if (!this.messagelist.ContainsKey(this.onlineUsers[i].username)) {
                                this.messagelist.Add(this.onlineUsers[i].username, [<ChatResponse>message]);
                            }
                            else {
                                this.messagelist.Item(this.onlineUsers[i].username).push(message);
                            }
                        }
                    }

                    for (var i = 0; i < this.onlineUsers.length; i++) {
                        if (this.onlineUsers[i].username == message.sender) {
                            this.onlineUsers[i].lastMessage = message.text.length > 15 ? message.text.substring(0, 14) + '...' : message.text + '...';
                            this.onlineUsers[i].msgDate = Date.now();
                            if (this.chatuser.username != message.sender) {
                                this.onlineUsers[i].unreadMsgCount += 1;
                            }
                        }
                    }
                    this.setMessage();
                }
            });

            this.socket.on('getusers', (data) => {
                this.getOnlineUsers();
            });

            this.socket.on('isTyping', (data) => {
                if (data.istyping && this.chatuser.username == data.username) {
                    this.isUserTyping = true;
                }
                else {
                    this.isUserTyping = false;
                }
            });


            this.socket.on('disconnected', (username) => {
                var index = this.onlineUsers.findIndex(x => x.username == username);
                if (index)
                    this.onlineUsers.splice(index, 1);

                if (this.chatuser.username == username && this.onlineUsers.length > 0)
                    this.startChat(this.onlineUsers[0]);
                else
                    this.chatuser = new User();
            });

            this.socket.on('getlist', (data) => {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].username != this.authService.userName)
                        if (this.onlineUsers.find(x => x.username == data[i].username) == undefined)
                            this.onlineUsers.push(data[i]);
                }

                if (this.chatuser.username == undefined && this.onlineUsers.length > 0)
                    this.startChat(this.onlineUsers[0]);
            });
            this.socket.emit('pulllist');
        }
    }


    sendMessage() {
        this.socket.emit("typing", this.chatuser.socketid, this.authService.userName, false);
        this.socket.emit('sendchat', this.message, this.authService.image, this.chatuser.socketid, this.authService.userName, this.chatuser.username, 'text');
        this.message = '';
    }

    startChat(user: User) {
        for (var i = 0; i < this.onlineUsers.length; i++) {
            if (this.onlineUsers[i].username == user.username) {
                this.onlineUsers[i].selected = true;
                this.onlineUsers[i].unreadMsgCount = 0;
            }
            else { this.onlineUsers[i].selected = false; }
        }

        this.curret_messages = this.messages.find(x => x.username == user.username);
        this.chatuser = user;
        this.setMessage();
    }

    setMessage() {
        this.messages = []
        if (this.chatuser) {
            if (this.messagelist.ContainsKey(this.chatuser.username))
                this.messages = this.messagelist.Item(this.chatuser.username);
        }
    }


    getOnlineUsers() {
        this.userService.getOnlineUsers()
            .subscribe((users) => {
                this.onlineUsers = users;
            });
    }

    timeoutFunction() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.typing = false;
            this.socket.emit("typing", this.chatuser.socketid, this.authService.userName, false);
        }, 2000);

    }

    keypressHandler(event) {
        if (event.keyCode !== 13) {
            if (this.typing === false) {
                this.typing = true;
                this.socket.emit('typing', this.chatuser.socketid, this.authService.userName, true);
                this.timeoutFunction();
            } else {
                this.timeoutFunction();
            }
        }
        else {
            this.sendMessage();
        }
    }
    onAttchmentClick(eventargs) {
        let event = new MouseEvent('click', { bubbles: true });
        this.renderer.invokeElementMethod(
            this.fileInput.nativeElement, 'dispatchEvent', [event]);
    }

    onChange(event) {
        var files = event.target.files;
        var file: File = event.target.files[0];
        var myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.socket.emit('sendchat', myReader.result, this.authService.image, this.chatuser.socketid, this.authService.userName, this.chatuser.username, 'image');
        }
        myReader.readAsDataURL(file);
        // this.uploadService.makeFileRequest(this.authService.baseUrl+ 'api/upload', [], files).subscribe(() => {
        //   console.log('sent');
        // });
    }

    ngOnDestroy() {
    }
}
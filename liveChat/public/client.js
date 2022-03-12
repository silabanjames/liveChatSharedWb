let userName = prompt('Nama');
let room = prompt('Nama room');
let ID = '';
var socket = io();
var roomname = document.getElementById('room');
var userlist = document.getElementById('user');
var roomlist = document.getElementById('roomlist');
roomname.textContent += room;
socket.emit('join room', {username: userName, roomName: room});
var messages = document.getElementById('container');
var form = document.getElementById('form');
var input = document.getElementById('input');

socket.on('send data', (data) => {
    ID = data.id;
})

socket.on('all rooms', (data) => {
    while (roomlist.firstChild){
        roomlist.removeChild(roomlist.lastChild);
    }
    for(let i = 0; i < data.length; i++) {
        var item = document.createElement('li');
        item.textContent = data[i];
        roomlist.appendChild(item);
    }
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('in room', (data) => {
    while(userlist.firstChild){
        userlist.removeChild(userlist.lastChild);
    }
    for (let i = 0; i < data.length; i++){
        var item = document.createElement('li');
        item.textContent = data[i].username;
        userlist.appendChild(item);
    }
    window.scrollTo(0, document.body.scrollHeight);
});


form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', {
        value: input.value,
        user: userName,
        room: room,
      });
      input.value = '';
    }
  });
  
  socket.on('chat message', function (msg) {
    var item = document.createElement('li');
    item.innerHTML =
      '<strong>' + msg.msg.user + '</strong>' + ' : ' + msg.msg.value;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });

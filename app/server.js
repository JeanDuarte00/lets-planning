const express = require("express")
const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const maxNameLength = 30;

const port = process.env.PORT || 3000;
let users = [];
let names = [];
let cards = ['1','2','3','5','?'];

const populateTeam = (list) => {
    console.log("populate")
    console.log(list)
    io.emit('team', list);
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/index.html');
});

app.get('/planning', (req, res) => {
    var params = req.query;
    console.log(params.user)


    // deve pegar o nome do usuario, associar com um ID(hash base64 do nome) no server e salvar num dicionario com o voto
    let user = {
        'name': params.user.toUpperCase(),
        'vote': '',
    }

    console.log("YOU")
    
    
    let data = names.indexOf(user.name);
    console.log(data)
    if (data === -1){
        let length = (user.name.length > maxNameLength) ? maxNameLength : user.name.length;
        user.name = user.name.substring(0, length);

        users.push(user);
        names.push(user.name);
    }
    io.emit('you', user);

    res.sendFile(__dirname + '/pages/planning/planning.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    populateTeam(users);
    //populateCards(cards);
    //console.log(socket.handshake)

    socket.on('chat message', (msg) => {
        //console.log('message: ' + msg);
        io.emit('chat message', msg);
    });


    socket.on('card-options', (arg, callback) => {
        //console.log('message: ' + msg);
        callback(cards);
    });

   
    socket.on('disconnect', (data) => {
        console.log(data)
        console.log('user disconnected');
    });

});  

server.listen(port, ()=>{
    console.log("Running on localhost:" + port)
})

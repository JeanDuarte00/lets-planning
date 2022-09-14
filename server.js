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

const populateTeam = (teamList) => {
    console.log("populate")
    console.log(teamList)
    io.emit('team', teamList);
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
        'vote': ''
    }
    
    let data = names.indexOf(user.name);
    console.log(data)
    if (data === -1){
        let length = (user.name.length > maxNameLength) ? maxNameLength : user.name.length;
        user.name = user.name.substring(0, length);

        users.push(user);
        names.push(user.name);
    }

    populateTeam(users)
    
    
    res.sendFile(__dirname + '/pages/planning/planning.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    populateTeam(users)
    //console.log(socket.handshake)

    socket.on('chat message', (msg) => {
        //console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

   
    socket.on('disconnect', (data) => {
        console.log(data)
        console.log('user disconnected');
    });

});  

server.listen(port, ()=>{
    console.log("Running on localhost:" + port)
})

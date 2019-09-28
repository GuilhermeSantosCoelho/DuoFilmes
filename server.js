//Binding PeerServer With NODE using express
var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;
var cookie = require('cookie');
var bodyParser=require('body-parser');
var authenticateController=require('./peer/funcoes/login');
var fs = require('fs');
var files = fs.readdirSync('./peer/filmes');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post('/login',authenticateController.authenticate);

//Pass index.html file from relative path where server is runnig
app.get('/', function(req, res, next) {
    var cookies = cookie.parse(req.headers.cookie || '');
    var usuario = cookies.usuario;
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    if(usuario){
        res.sendFile(__dirname + '/peer/index.html');
    }else{
        console.log('Nova solicitação!');
        res.sendFile(__dirname + '/peer/login.html');
    }
});

app.get('/obter_videos', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.send(files);
});

//Server listen to the port : 4200
var server = app.listen(4200, () => {
    console.log('Servidor ligado em localhost:4200!')
});

//To get a logs
options = {
	debug : true
	/*allow_discovery: true*/
};

//PeerServer will use above server and edit app to use 'peer' library and PeerServer
peerServer = ExpressPeerServer(server, options);
app.use(express.static('peer'), peerServer);

//===================================================================================

peerServer.on('connection', function(id) {
    console.log('Peer está conectado, id: ' + id)
  	//peerServer._clients
});

server.on('disconnect', function(id) {
    console.log('Peer desconectado, id: ' + id)
});
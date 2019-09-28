var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'Projeto'
});
connection.connect(function(err){
    if(!err) {
        console.log("Conectado com o banco de dados!");
    } else {
        console.log("Erro ao conectar com o banco de dados!");
    }
});
module.exports = connection;
var connection = require('../conexao/conexao');
var cookie = require('cookie');
module.exports.authenticate = function (req, res) {

    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

    var usuario = req.body.usuario;
    var password = req.body.senha;

    connection.query('SELECT * FROM usuarios WHERE username = ?', [usuario], function (error, results, fields) {
        
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            if (results.length > 0) {
                if (password == results[0].senha) {
                    res.json({
                        status: false,
                        cookie:usuario,
                        usuario:usuario
                    });
                    res.end();
                    
                } else {
                    res.json({
                        status: false,
                        message: "Credenciais incorretas!"
                    });
                }
            } else {
                res.json({
                    status: false,
                    message: "Usuário não existe!"
                });
            }
        }
    });
}
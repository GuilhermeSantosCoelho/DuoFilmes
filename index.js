var UserName;             //Nome de usuário do peer
var DestPeerID;           //Id do peer para conexão com outro peer
var dataConn;             //Dados da conexão para transferencia de dados
var vidConn;              //Video conexão objeto para transferência de stream de video
var video = "";                //Video objeto, HTML VIDEO ELEMENT
var message, a_message;   //Variaveis para armazenar mensagens enviadas e recebidas
const usuario = getCookie("usuario");

var peer = new Peer(usuario, {
  //key : 'peerjs',
  host: '201.80.58.44',
  port: 4200
});

//Retorno do id se o peer for conectado
peer.on('open', function (id) {
  console.log('My peer ID is: ' + id);
  $('#id').text(id);
});

// Retorno do erro para o peer
peer.on('error', function (err) {
  alert(err);
  console.error(err);
});

$(document).ready(function () {
  /*
  $.get("http://201.80.16.128:4200/obter_videos", function (data) {
    for (var i = 0; i < data.length; i++) {
      var dado = data[i].split('.');
      $('#lista_videos').append('<h6 class="video_nome">' + dado[0] + '</h6><br>');
    }
  }); */

  $('#sair').click(function () {
    peer.disconnect();
    peer.destroy();
    $('video').get(0).pause();
    document.cookie = "usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location = '/';
  });

  $('#connect').click(function () {
    UserName = $('#id').text();
    DestPeerID = $('#destpeerID').val();

    if (DestPeerID) {
      //Initiate data connection between other peer with it's id
      dataConn = peer.connect(DestPeerID, {
        metadata: {
          'username': UserName,
          'msg': 'init',
        }
      });

      $('#mensagens').show();
      $("#mensagens").text('Aguardando ' + $('#destpeerID').val() + ' aceitar...');

      if (dataConn) {
        //Send request
        $('.InPeer_request').show();
        //messages = document.getElementById("msgtextarea");
      }
      //Call to the data management function
      initConnection();
    } else {
      $('#mensagens').show();
      $("#mensagens").text('O usuário não pode ficar em branco!');
    }
  });

});

function initConnection() {
  /*
    Initiator Peer who initiate or open Peer Connection
  */
  dataConn.on('open', function () {

    var recebido = 0;
    var first = 0;

    // Receive messages
    dataConn.on('data', function (data) {

      if (data.msg == 'init') {
        $('#lista_videos').hide();
        $('#div_convite').hide();
        $('.InPeer_request').hide();
        $('#InPeer_connected_name').text(data.username)
        $('.msg').show();
        $('video').css('pointer-events', 'all');
        $('video').get(0).play();
      } else if (data.msg == 'pause') {
        recebido = 1;
        $('video').get(0).pause();
        $('video').currentTime = data.current;
        $('video').css('pointer-events', 'none');
        $("#status").text($('#InPeer_connected_name').text() + ' pausou o vídeo! Aguarde ele retomar!');
      } else if (data.msg == 'play') {
        recebido = 1;
        $('video').css('pointer-events', 'all');
        if (first != 0) {
          $("#status").text($('#InPeer_connected_name').text() + ' retomou o vídeo!');
        }
        $('video').get(0).play();
        first = 1;
      }
    });

    $("#video").on('play', function () { //InPeer
      if (recebido != 1) {
        dataConn.send({
          msg: 'play',
        });
      } else {
        recebido = 0;
      }
    });

    $("#video").on('pause', function () { //InPeer
      if (recebido != 1) {
        dataConn.send({
          msg: 'pause',
          current: $("video").currentTime
        });
      } else {
        recebido = 0;
      }
    });

  });
}

//Connection callback receives dataConn Object
//Will called if connection successfully established
peer.on('connection', function (conn) {
  $('.AnPeer_receive').show();
  $('#AnPeer_id').text(": " + conn.peer);
  $('#AnPeer_connected_name').text(conn.metadata.username);
  var recebido = 0;

  conn.on('open', function () {

    //Permission for another peer to start chat
    $('#btn_accept_invite').click(function () {
      $('.login').hide();
      $('.AnPeer_connected').show();
      $('.a_msg').show();
      $('#div_convite').hide();
      $('.AnPeer_receive').hide();
      $('video').css('pointer-events', 'auto');
      $('video').get(0).play();
      $('#lista_videos').hide();
      conn.send({
        msg: 'init',
        username: $('#id').text()
      });
    });

    $("#video").on('play', function () { //AnPeer
      if (recebido != 1) {
        conn.send({
          msg: 'play',
        });
      } else {
        recebido = 0;
      }
    });

    $("#video").on('pause', function () { //AnPeer
      if (recebido != 1) {
        conn.send({
          msg: 'pause',
          current: $('video').currentTime
        });
      } else {
        recebido = 0;
      }
    });

    conn.on('data', function (data) {
      if (data.msg == 'pause') {
        recebido = 1;
        $('video').get(0).pause();
        $('video').currentTime = data.current;
        $('video').css('pointer-events', 'none');
        $("#a_status").text($('#AnPeer_connected_name').text() + ' pausou o vídeo! Aguarde ele retomar!');
      } else if (data.msg == 'play') {
        recebido = 1;
        $('video').get(0).play();
        $('video').css('pointer-events', 'all');
        $("#a_status").text($('#AnPeer_connected_name').text() + ' retomou o vídeo!');
      }
    });
  });
});

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
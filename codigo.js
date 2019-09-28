var UserName;             //Nome de usuário do peer
var DestPeerID;           //Id do peer para conexão com outro peer
var dataConn;             //Dados da conexão para transferencia de dados
var vidConn;              //Video conexão objeto para transferência de stream de video
var video;                //Video objeto, HTML VIDEO ELEMENT
var message, a_message;   //Variaveis para armazenar mensagens enviadas e recebidas

var peer = new Peer(Math.floor(Math.random * (10000000)), {
  //key : 'peerjs',
  host: 'localhost',
  port: 4200
});

//Retorno do id se o peer for conectado
peer.on('open', function (id) {
  //console.log('My peer ID is: ' + id);
  $('#id').text(id);
});

//Assign one of three object refrence
//navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

/*Pedindo permissão para audio e video
function getVideo(callback) {
  navigator.getUserMedia({ audio: true, video: true }, callback, function (error) {
    //Verificando erro
    console.log(error);
    //alert('Um erro ocorreu. Por favor, tente novamente!');
  });
} */

/*Get successful stream and assign to the 'Window Object'
//Pass this stream to the 'onReceiveStream' funtion with 'HTML VIDEO ID'
getVideo(function (stream) {
  window.localStream = stream;
  //onReceiveStream(stream, 'my-camera');
}); */

/* Create Video source for html element and give received stream to that element
function onReceiveStream(stream, element_id) {
  video = $('#' + element_id + ' video')[0];
  video.src = window.URL.createObjectURL(stream);
  //window.peer_stream = stream;
} */

//Error callback for peer
peer.on('error', function (err) {
  alert("Um erro ocorreu com o peer: " + err);
  console.error(err);
});

$(document).ready(function () {

  $('#connect').click(function () {

    UserName = $('#destpeerID').val();
    DestPeerID = $('#destpeerID').val();
    $('.msg_wait').show();
    $(".msg_wait").text('Aguardando '+$('#destpeerID').val()+' aceitar...');

    if (DestPeerID) {
      //Initiate data connection between other peer with it's id
      dataConn = peer.connect(DestPeerID, {
        metadata: {
          'username': UserName,
          'msg':'init'
        }
      });

      if (dataConn) {
        //Send request
        $('.InPeer_request').show();
        //messages = document.getElementById("msgtextarea");
      }

      //Call to the data management function
      initConnection();
    }
  });

  //Permission for another peer to start chat
  $('#btn_accept_invite').click(function () {
    $('.login').hide();
    $('.AnPeer_connected').show();
    $('.a_msg').show();
    $('.AnPeer_receive').hide();
    //$('.AnPeer_call').show();
    $('.AnPeer_disconnect').show();
    $('video').css('pointer-events', 'auto');
    $('video').get(0).play();
  });

  /* If initiator peer want to disconnect
  $('#Idisconnect').click(function () {
    peer.disconnect();
    peer.destroy();
    video.pause();
    video.src = null;
    window.localStream.getTracks().forEach(function (track) { track.stop(); });
  }); */

  /* If another peer want to disconnect
  $('#Adisconnect').click(function () {
    peer.disconnect();
    peer.destroy();
    video.pause();
    video.src = null;
    window.localStream.getTracks().forEach(function (track) { track.stop(); });
  }); */

  /* If initiator peer want to video call
  $('#InPeer_startcall').click(function () {

    //Media connection between peer with 'OUR LOCAL STREAM'
    vidConn = peer.call(DestPeerID, window.localStream);

    if (vidConn) {
      //Call to the video management function
      initVideo();
    }
    $('#my-camera').css('left', '370px');
    $('#peer-camera').css('left', '790px');
  }); */
  
});

/*
function initVideo() {
  //If stream received from other peer, store it to the WINDOW object and pass it to the html element (='peer-camera')  
  vidConn.on('stream', function (stream) {
    window.peer_stream = stream;
    onReceiveStream(stream, 'peer-camera');
  });
}
*/

function initConnection() {
  /*
    Initiator Peer who initiate or open Peer Connection
  */
  dataConn.on('open', function () {

    // Receive messages
    dataConn.on('data', function (data) {
      if (data.msg == 'init') {
        $(".msg_wait").text(data.username+' aceitou seu convite!');
        $('.login').hide();
        $('.InPeer_request').hide();
        $('.InPeer_request_accepted').hide();
        $('#InPeer_connected_name').text(data.username)
        $('.msg').show();
        $('.InPeer_connected').show();
        $('.InPeer_call').show();
        $('.InPeer_disconnect').show();
        $('video').css('pointer-events', 'all');
        $('video').get(0).play();
      }else if(data.msg == 'funcao'){
        if(data.funcao == 'pause'){
          $('video').get(0).pause();
        }else if(data.funcao == 'play'){
          $('video').get(0).play();
        }
      }else{
        console.log('Received Data : ', data);
        $('#msgtextarea').val($('#msgtextarea').val() + "\n                      > " + data);
        $('#msgtextarea').scrollTop($('#msgtextarea')[0].scrollHeight);
      }
    });

    $("#video").on('play', function () {
      //Actions when video play selected
      dataConn.send({
        msg: 'funcao',
        funcao:'play',
      });
    });
  
    $("#video").on('pause', function () {
      //Actions when video play selected
      $("#aux").text("Duração:" + this.duration + " Parou em:" + this.currentTime)
      dataConn.send({
        msg: 'funcao',
        funcao:'pause',
      });
    });

    // Send messages
    $('#message').keypress(function (id) {
      if (id.keyCode == 13) {
        message = $('#message').val();
        $('#msgtextarea').val($('#msgtextarea').val() + "\n" + $('#InPeer_connected_name').text() + ":" + message);
        $('#msgtextarea').scrollTop($('#msgtextarea')[0].scrollHeight);

        dataConn.send(message);
        $('#message').val("");
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

  conn.on('open', function () {

    $('#btn_accept_invite').click(function () {
      conn.send({
        msg: 'init',
        username: $('#id').text(),
        data:'asdfasdf'
      });
    });

    $("#video").on('play', function () {
      //Actions when video play selected
      conn.send({
        msg: 'funcao',
        funcao:'play',
      });
    });
  
    $("#video").on('pause', function () {
      //Actions when video play selected
      $("#aux").text("Duração:" + this.duration + " Parou em:" + this.currentTime)
      conn.send({
        msg: 'funcao',
        funcao:'pause',
      });
    });

    conn.on('data', function (data) {
      if(data.msg == 'funcao'){
        if(data.funcao == 'pause'){
          $('video').get(0).pause();
        }else if(data.funcao == 'play'){
          $('video').get(0).play();
        }
      }
    });

    /* Receive messages
    conn.on('data', function (data) {
      console.log('Received Data : ', data);
      $('#a_msgtextarea').val($('#a_msgtextarea').val() + "\n                      > " + data);
      $('#a_msgtextarea').scrollTop($('#a_msgtextarea')[0].scrollHeight);
    }); */

    /* Send messages
    $('#a_message').keypress(function (id) {
      if (id.keyCode == 13) {
        a_message = $('#a_message').val();
        $('#a_msgtextarea').val($('#a_msgtextarea').val() + "\n> " + a_message);
        $('#a_msgtextarea').scrollTop($('#a_msgtextarea')[0].scrollHeight);
        console.log(" " + $('#a_msgtextarea')[0].scrollWidth);
        conn.send(a_message);
        $('#a_message').val("");
      }
    }); */

  });
});


/* When peer receives a call
peer.on('call', function (call) {
  onReceiveCall(call);
}); */

/* When call received, peer will answer with it's localstream and assign received stram to the 'peer-camera' (=html element)
function onReceiveCall(call) {
  $('#my-camera').css('left', '370px');
  $('#peer-camera').css('left', '790px');
  call.answer(window.localStream);
  call.on('stream', function (stream) {
    window.peer_stream = stream;
    onReceiveStream(stream, 'peer-camera');
  });
} */
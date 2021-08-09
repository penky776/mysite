const chatSocket = new WebSocket("ws://" + window.location.host + "/ws/hello/");
const nickname_value = document.getElementById("nickname").innerHTML;

if (nickname_value == "balgish") {
    var nickname = nickname_value.fontcolor("blue")
} else {
    var nickname = nickname_value.fontcolor("red")
}

chatSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);    //change
    document.getElementById('chat-log').innerHTML += (data.message + '<br>');
};

chatSocket.onclose = function (e) {
    console.error('Chat socket closed unexpectedly');
};

document.querySelector('#chat-message-input').focus();
document.querySelector('#chat-message-input').onkeyup = function (e) {
    if (e.keyCode === 13) {
        document.querySelector('#chat-message-submit').click();
    }
};

document.querySelector('#chat-message-submit').onclick = function (e) {
    const messageInputDom = document.querySelector('#chat-message-input');
    const message = messageInputDom.value;
    const message_combination = nickname + ": " + message;
    chatSocket.send(JSON.stringify({
        'message': message_combination
    }));
    messageInputDom.value = "";
};

const chatSocket = new WebSocket("ws://" + window.location.host + "/ws/hello/");

const nicknames = [];
const nickname_value = document.getElementById("nickname").innerHTML;
if (nickname_value == "balgish") {
    var initial_nick = nickname_value.fontcolor("blue");
} else {
    var initial_nick = nickname_value.fontcolor("red");
}
nicknames[0] = initial_nick;

var hidden, visibiltyChange;
if (typeof document.hidden !== "undefined") {
    hidden = "hidden";
    visibiltyChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}

chatSocket.onopen = function (e) {
    const message = "<br><b>" + initial_nick + "<i> has logged in!</i></b><br><br>";
    console.log(nickname_value + " has logged in!");
    chatSocket.send(JSON.stringify({
        'message': message
    }));
};

chatSocket.onclose = function (e) {
    console.error('Chat socket closed unexpectedly');
};

chatSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    const message = data.message
    const stripped_message = message.replace(/(<([^>]+)>)/gi, "");
    document.getElementById('chat-log').innerHTML += (message);
    window.scrollTo(0, document.body.scrollHeight);
    if (document[hidden]) {
        const notif = new Notification('New message!', {
            body: stripped_message
        });
        setTimeout(() => notif.close(), 10 * 1000);
    }
};

document.querySelector('#chat-message-input').focus();
document.querySelector('#chat-message-input').onkeyup = function (e) {
    if (e.keyCode === 13) {
        document.querySelector('#chat-message-submit').click();
    }
};

document.querySelector('#chat-message-submit').onclick = function (e) {
    Notification.requestPermission();
    const messageInputDom = document.querySelector('#chat-message-input');
    const message = messageInputDom.value;

    if (message) {
        if (message.startsWith("/nickname change")) {
            const nickname_value = message.slice(17);
            if (nickname_value == "balgish") {
                var new_nick = nickname_value.fontcolor("blue");
            } else {
                var new_nick = nickname_value.fontcolor("red");
            }
            nicknames.push(new_nick);
        }
        const nicknames_length = nicknames.length;
        const nickname = nicknames[nicknames_length - 1];
        const message_combination = nickname + ": " + message + "<br>";
        chatSocket.send(JSON.stringify({
            'message': message_combination
        }));
        messageInputDom.value = "";
    }

};

document.querySelector('#dark_mode').onclick = function (e) {
    if (document.getElementById("dark_mode").innerHTML == "Dark") {
        document.body.style.background = "black";
        document.body.style.color = "white";
        document.getElementById("dark_mode").innerHTML = "Light";
    } else {
        document.body.style.background = "white";
        document.body.style.color = "black";
        document.getElementById("dark_mode").innerHTML = "Dark"
    }

}
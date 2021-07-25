// --------- getting messages
updateMessages();
function updateMessages() {
  let xhrGetMessages = new XMLHttpRequest();
  xhrGetMessages.open('GET', 'https://studentschat.herokuapp.com/messages', true);
  xhrGetMessages.send();
  
  xhrGetMessages.onload = function () {
    if (xhrGetMessages.status != 200) {
      alert(`oops, its a mistake here ${xhrGetMessages.status}: ${xhrGetMessages.statusText}`);
    } else {
      let result = JSON.parse(xhrGetMessages.responseText)
      showMessages(result);
    }
  }
  let messageBox =  document.querySelector('.message-box')
  
  function showMessages(data) {
    for (let i = 0; i < data.length ; i++) {
      let messageofUser = document.createElement('div');
      messageofUser.className = 'user-message'
  
      let spanUsername = document.createElement('span');
      spanUsername.className= 'message-username';
      spanUsername.innerHTML = `${data[i].username} `;
      messageofUser.append(spanUsername);
  
      let divMessage = document.createElement('div');
      divMessage.className = 'message-text';
      divMessage.innerHTML = `${data[i].message}`;
      messageofUser.append( divMessage);
  
      let divTime = document.createElement('div');
      divTime.className = 'message-time';
      divTime.innerHTML = `${data[i].datetime}`;
      messageofUser.append( divTime);
  
      messageBox.append(messageofUser);
    }
  
    if (data.length >= 5) {
      addScrollOfMessages();
    }
  }
 
  function addScrollOfMessages() {
    messageBox.classList.add('add-scroll');
    // messageBox.lastChild.scrollIntoView();
  }
}


// ------- writing message

let textOfMessage = document.querySelector('.text-of-message');

function validationOfMessage() {
  if (textOfMessage.value.length == 0 || textOfMessage.value == ' ') {
    alert('You are trying to send an empty message. Write something');
    return false;
  }
  else {
    return true;
  }
}

document.querySelector('.send-btn').onclick = function () {
  let message = `${textOfMessage.value}`;
  let now = new Date().toISOString();

  let data = {
    'username': localStorage.userName,
    'message': message,
    'datetime': now,
  }
  
  function sendMessage(method, url) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    xhr.onload = function () {
      if (this.readyState == 4 && this.status == 200) {
        return JSON.parse(this.response);
      }
      else if (this.status == 403) {
        alert ('This user is not logged in. Better go to login page.')
      }
      else if (this.status != 200) {
        alert ('something went wrong' );
      }
    }
    xhr.send(JSON.stringify(data));
  }

  if (validationOfMessage()) {
    sendMessage('POST', 'https://studentschat.herokuapp.com/messages');
  }
}

// ------editing message


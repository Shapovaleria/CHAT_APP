//  getting messages
updateMessages();
function updateMessages() {
  let xhrGetMessages = new XMLHttpRequest();
  xhrGetMessages.open('GET', `${SERVER_NAME}/messages`, true);
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
    messageBox.lastChild.scrollIntoView();
  }
}


//  writing message + counting characters

let textOfMessage = document.querySelector('.text-of-message');

let characters = document.querySelector('#characters');
characters.value = 0;
let letters = document.querySelector('#letters');
letters.value = 0;
let whitespaces = document.querySelector('#whitespace');
whitespaces.value = 0;
let punctuation = document.querySelector('#punctuation-marks');
punctuation.value = 0;

textOfMessage.addEventListener('keyup', function (e) {
  let lettersEng = '[a-zA-Z]';
  let punctuationSymbols = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/;

  if (e.key != 'Backspace') {
    characters.value++;
    characters.innerText = `${characters.value}`;
   
    if (e.key.match(lettersEng)) {
      letters.value++;
      letters.innerText = `${letters.value}`
    }
    else if (e.key == ' ') {
      whitespaces.value++;
      whitespaces.innerText = `${whitespaces.value}`
    }
    else if (e.key.match(punctuationSymbols)) {
      punctuation.value++;
      punctuation.innerText = `${punctuation.value}`
    }
  }
  else {
    if (characters.value < 1 || textOfMessage.textContent.length == 0) {
      characters.innerText = `${characters.value = 0}`;
      letters.innerText = `${letters.value = 0}`;
      whitespaces.innerText = `${whitespaces.value = 0}`;
      punctuation.innerText = `${punctuation.value = 0}`;
    }
    else {
      characters.value--;
      characters.innerText = `${characters.value}`;
    }
  }
});

// sending message

function validationOfMessage() {
  if (textOfMessage.textContent.length == 0 || textOfMessage.textContent == ' ') {
    alert('You are trying to send an empty message. Write something');
    return false;
  }
  else {
    return true;
  }
}

document.querySelector('.send-btn').onclick = function () {
  let message = `${textOfMessage.innerHTML}`;

  let data = {
    'username': localStorage.userName,
    'message': message,
    'datetime': new Date().toISOString(),
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
    sendMessage('POST', `${SERVER_NAME}/messages`)
    textOfMessage.innerHTML = '';
    characters.innerText = `${characters.value = 0}`;
    letters.innerText = `${letters.value = 0}`;
    whitespaces.innerText = `${whitespaces.value = 0}`;
    punctuation.innerText = `${punctuation.value = 0}`;
  }
}

// editing message

let bold = document.querySelector('#bold-btn');
let italic = document.querySelector('#italic-btn');
let underline = document.querySelector('#underline-btn');
let noEffects = document.querySelector('#no-effects')

bold.addEventListener('click', makeBold);
italic.addEventListener('click', makeItalic);
underline.addEventListener('click', makeUnderlined);
noEffects.addEventListener('click', cancelEffects)

textOfMessage.addEventListener('mouseup', selectText)

function selectText() {
  if(window.getSelection().toString().length){
    let exactText = window.getSelection().toString();
    return exactText 
 }
}

function makeBold() {
  if (selectText()) {
    textOfMessage.innerHTML = ` ${textOfMessage.innerHTML.replace(selectText(), ` <b> ${selectText()} </b> `)}`;
  }
  else {
    textOfMessage.innerHTML = `<b> ${textOfMessage.innerText} </b> `
  }
}

function makeItalic() {
  if (selectText()) {
    textOfMessage.innerHTML = ` ${textOfMessage.innerHTML.replace(selectText(), ` <i> ${selectText()} </i> `)}`;
  }
  else {
    textOfMessage.innerHTML = `<i> ${textOfMessage.innerText} </i> `
  }
}

function makeUnderlined() {
  if (selectText()) {
    textOfMessage.innerHTML = ` ${textOfMessage.innerHTML.replace(selectText(), ` <u> ${selectText()} </u> `)}`;
  }
  else {
    textOfMessage.innerHTML = `<u> ${textOfMessage.innerText} </u> `
  }
}

function cancelEffects() {
    textOfMessage.innerHTML = `${textOfMessage.textContent}`;
}



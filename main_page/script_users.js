const SERVER_NAME = 'https://studentschat.herokuapp.com';
const AVATARS = ['1', '01', '2', '02', '3', '03', '4', '04', '5', '05', '6', '06', '07', '08', '09', '10', '11', '12', 'w1', 'w2', 'w3', 'w4', 'w5', 'w6'];

document.querySelector('.user-nickname').innerText = localStorage.userName;
let userAvatar = document.querySelector('.user-default-img');
userAvatarNum = getRandomAvatar();
userAvatar.src = `../assets/${userAvatarNum}.svg`;

updateUsers();

function updateUsers() {
  // get users
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `${SERVER_NAME}/users/`, true);
  xhr.send();

  xhr.onload = function () {
    if (xhr.status != 200) {
      alert(`oops, its a mistake here ${xhr.status}: ${xhr.statusText}`);
    } else {
      let result = JSON.parse(xhr.responseText)
      showUsers(result);
    }
  }
}

 // display users

 let listOnline = document.querySelector('#online-list');
let listOffline = document.querySelector('#offline-list')

let amountOfOnline = document.querySelector('#amount-of-online');
amountOfOnline.value = 0;
let amountOfOffline = document.querySelector('#amount-of-offline');
amountOfOffline.value = 0;

function getRandomAvatar() {
  let num = Math.floor(Math.random() * AVATARS.length);
  return AVATARS[num];
}

 function showUsers(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].username == localStorage.userName) {
      let currentUser = data[i];
      currentUser.avatarId = `${userAvatarNum}`
      currentUser.status = 'active';
    }
    if (data[i].status == 'active') {
      let li = document.createElement('li');
      li.innerHTML = `${data[i].username}`;
      li.className = 'user-name';
      let avatar = document.createElement('img');
      if (data[i].avatarId) {
        avatar.src = `../assets/${data[i].avatarId}.svg`;
        avatar.className = 'avatar';
        li.prepend(avatar)
      }
      else {
        avatar.src = `../assets/${getRandomAvatar()}.svg`
        avatar.className = 'avatar';
        li.prepend(avatar)
      }
      listOnline.append(li);
      amountOfOnline.value++;
    }
    else if (data[i].status == 'inactive') {
      let li = document.createElement('li');
      li.innerHTML = `${data[i].username}`;
      li.className = 'user-name';
      let avatar = document.createElement('img');
      if (data[i].avatarId) {
        avatar.src = `../assets/${data[i].avatarId}.svg`;
        avatar.className = 'avatar';
        li.prepend(avatar)
      }
      else {
        avatar.src = `../assets/${getRandomAvatar()}.svg`
        avatar.className = 'avatar';
        li.prepend(avatar)
      }
      listOffline.append(li);
      amountOfOffline.value++;
    }
  }

  amountOfOnline.innerText = `${amountOfOnline.value}`
  amountOfOffline.innerText = `${amountOfOffline.value}`

  function addScrollOfUsers() {
    if (amountOfOnline.value >= 7) {
      listOnline.classList.add('add-scroll');
    }
    if (amountOfOffline.value > 6) {
      listOffline.classList.add('add-scroll-small');
    }
  }
  addScrollOfUsers();
}

//  log out

let logOutBtn = document.querySelector('.log-out');

let data = {
  'username': localStorage['userName'],
};

logOutBtn.onclick = function () {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', `${SERVER_NAME}/users/logout`, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
      window.location.href = '../autorisation/login.html';
      return JSON.parse(this.response);
    }
    else if (this.status != 200) {
      alert('something went wrong');
    }
  }
  xhr.send(JSON.stringify(data));
  localStorage.clear();
}

// local time and online-timer

window.onload = function () {
  window.setInterval(function () {
    let localTimeElem = document.querySelector('.time-local');
    let localTime = new Date;
    localTimeElem.innerText = localTime.toLocaleTimeString().slice(0, -3);
  }, 1000);
};


let counterOnline = document.querySelector('.time-online');

let newDate;
let intervalId;
if (localStorage['timer']) {
  newDate = new Date(localStorage['timer']);
  timer();
  intervalId = setInterval(timer, 1000)
}
function onStart() {
  newDate = Date.now();
  timer();
  if (!intervalId) {
    intervalId = setInterval(timer, 1000)
  }
  localStorage.setItem('timer', new Date(newDate).toISOString());
}

function timer() {
  let now = Date.now();
  let diff = Math.round((now - newDate) / 1000)

  let h = Math.floor(diff / (60 * 60));
  diff = diff - (h * 60 * 60);
  let m = Math.floor(diff / 60);
  diff = diff - (m * 60);
  let s = diff;

  counterOnline.innerText = `${h} hours, ${m} minutes, ${s} seconds`;
}










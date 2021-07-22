document.querySelector('.user-nickname').innerText = localStorage.userName;

let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://studentschat.herokuapp.com/users/', true);
xhr.send();

xhr.onload = function () {
  if (xhr.status != 200) {
    alert(`oops, its a mistake here ${xhr.status}: ${xhr.statusText}`);
  } else {
    let result = JSON.parse(xhr.responseText)
    getUsers(result);
  }
}

let listOnline = document.querySelector('#online-list');
let listOffline = document.querySelector('#offline-list')

let amountOfOnline = document.querySelector('#amount-of-online');
amountOfOnline.value = 0;
let amountOfOffline = document.querySelector('#amount-of-offline');
amountOfOffline.value = 0;

function getUsers(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].status == 'active') {
      let li = document.createElement('li');
      li.innerHTML = `${data[i].username}`;
      li.className = 'user-name';
      listOnline.append(li);
      amountOfOnline.value++;
    }
    else if (data[i].status == 'inactive') {
      let li = document.createElement('li');
      li.innerHTML = `${data[i].username}`;
      li.className = 'user-name';
      listOffline.append(li);
      amountOfOffline.value++;
    }
  }
  amountOfOnline.innerText = `${amountOfOnline.value}`
  amountOfOffline.innerText = `${amountOfOffline.value}`

  let onOfflineDiv = document.querySelector('.on-offline-users');
  function addScroll() {
    if(amountOfOnline.value >= 8 || amountOfOffline.value >= 5) {
      onOfflineDiv.classList.add('add-scroll');
    } 
  }
  addScroll();
}

let logOutBtn = document.querySelector('.log-out');
logOutBtn.onclick = function () {
  // ... add changing status later
  window.location.href = '../autorisation/login.html';
}

let localTimeElem = document.querySelector('.time-local');
let localTime = new Date;
localTimeElem.innerText = `${localTime.getHours()} : ${localTime.getMinutes()}`;
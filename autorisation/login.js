document.querySelector('.authorize-submit').onclick = function (event) {
  event.preventDefault();

  function loginOfUser(method, url) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.send();

    xhr.onload = function () {
      if (xhr.status != 200) {
        alert(`oops, its a mistake here ${xhr.status}: ${xhr.statusText}`);
      } else {
        let result = JSON.parse(xhr.responseText)
        checkUser(result);
      }
    }
  }

  let username = document.querySelector('#login').value;
  let password = document.querySelector('#password').value;

  function checkUser(data) {
    for (elem of data) {
      if (elem.username == username && elem.password == password) {
        localStorage.setItem('userName', username);
        window.location.href = '../main_page/index.html';
        onStart();
        console.log(elem)
        return true;
      }
    }
    document.querySelector('.authorize-error').style.display = 'inherit';
  }
   
  loginOfUser('GET', 'https://studentschat.herokuapp.com/users/');
}

// getting time of login for counting time-online
let newDate;
let intervalId;
if(localStorage['timer']) {
  newDate = new Date(localStorage['timer']);
  timer();
  intervalId = setInterval(timer, 1000)
}
function onStart() {
  newDate = Date.now();
  timer();
  if(!intervalId) {
    intervalId = setInterval(timer, 1000)
  }
  localStorage.setItem('timer', new Date(newDate).toISOString());
}

function timer() {
  let now = Date.now();
  // let diff = Math.round((now - newDate)/1000)

  // let h = Math.floor(diff/(60*60));
  // diff = diff - (h*60*60);
  // let m = Math.floor(diff/60);
  // diff = diff - (m*60);
  // let s = diff;

  // counterOnline.innerText = `${h} hours, ${m} minutes, ${s} seconds`;
}











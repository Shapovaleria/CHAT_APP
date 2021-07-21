document.querySelector('.authorize-submit').onclick = function (event, data) {
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
        getData(result);
      }
    }
  }

  let username = document.querySelector('#login').value;
  let password = document.querySelector('#password').value;
  function getData(data) {
    for (elem of data) {
      if (elem.username == username && elem.password == password) {
        window.location.href = '../main_page/index.html';
        localStorage.setItem('userName', username)
      }
      else {
        document.querySelector('.authorize-error').style.display = 'inherit';
      }
    }
  }

  loginOfUser('GET', 'https://studentschat.herokuapp.com/users/');
}










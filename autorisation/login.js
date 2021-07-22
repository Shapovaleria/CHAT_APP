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
        elem.status = 'active';
        window.location.href = '../main_page/index.html';
        return true;
      }
      else {
        document.querySelector('.authorize-error').style.display = 'inherit';
      }
    }
  }
   

  loginOfUser('GET', 'https://studentschat.herokuapp.com/users/');
}











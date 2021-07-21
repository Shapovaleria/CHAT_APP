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

let listOnline = document.querySelector('#online');



function getUsers(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].status == 'active') {
    let li = document.createElement('li');
     li.innerHTML = `${data[i].username}`;
     listOnline.append(li);
    }
  }
}
function validation(nickname, password, repeatPassword) {
  if (nickname.length < 4) {
   alert('The name should be not less than 4 symbols');
   return false;
  }
  else if (password.length < 4 ) {
    alert('The password should be not less than 4 symbols')
    return false
  }
  else if (repeatPassword != password) {
   alert('passwords are different')
   return false
  }
  else return true;
}

document.querySelector('#register').onclick = function (event) {
  event.preventDefault();

  let nickname = document.querySelector('#login-reg').value;
  let password = document.querySelector('#login-pass').value;
  let repeatPassword = document.querySelector('#password-repeat').value;

  let data = {
    'username': nickname,
    'password': password,
  };

  function registrationOfUser(url, method) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    xhr.onload = function () {
      if (this.readyState == 4 && this.status == 200) {
        window.location.href = '../main_page/index.html';
        return JSON.parse(this.response);
      }
      else if (this.status == 403) {
        alert ('This user is already registered. Better go to login page.')
      }
      else if (this.status != 200) {
        alert ('something went wrong' );
      }
    }
    xhr.send(JSON.stringify(data));
  }
  
  if(validation(nickname, password, repeatPassword)) {
    registrationOfUser( "https://studentschat.herokuapp.com/users/register", 'POST', true)
    data.status = 'active';
    localStorage.setItem('userName', data.username);
    console.log(data)
  }
};

  

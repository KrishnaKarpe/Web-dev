const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username && password) {
    const url = `second.html?username=${username}&password=${password}`;
    window.location.href = url;
  } else {
    alert('Please enter a valid username and password.');
  }
});
// Get the form and input elements
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

loginForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  if (emailInput.value === ""  || passwordInput.value === "") {
    alert('Please enter all the fields');
  } else if (passwordInput.value.length < 8) {
    alert('Password must be at least 8 characters long');
  } else {
    let obj = {};
    obj.email = loginForm.email.value;
    obj.password = loginForm.password.value;
    console.log(obj)
  }
  loginForm.email.value = "";
  loginForm.password.value = "";
  
});

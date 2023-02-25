const form = document.getElementById('signup-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

form.addEventListener('submit', (e) => {

    e.preventDefault()
  let hasError = false;
    let ree = ""
    
  if (nameInput.value.trim() === '') {
        ree +='Please enter your name  |';
  } 
 
  if (emailInput.value.trim() === '') {
    ree += ' Please enter your email |';
    hasError = true;
  } 

  if (passwordInput.value.trim() === '') {
    ree += ' Please enter your password |';
    hasError = true;
  } 
  if (confirmPasswordInput.value.trim() === '') {
    ree += ' Please confirm your password |'
    hasError = true;
  } else if(passwordInput.value.length <8){
    ree += ' Password must be at least 8 characters long |'
    hasError = true;
  }
  else if (confirmPasswordInput.value.trim() !== passwordInput.value.trim()) {
    ree += ' Passwords do not matchd |';
    hasError = true;
  }

  if(hasError){
    alert(ree)
  }else{
    let obj = {};
    obj.name = form.name.value;
    obj.email = form.email.value;
    obj.password = form.password.value;
    console.log(obj)
  }


});


const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const url = "http://localhost:4040/"; // Here is the URL you can change with the ndeployed link afterwards 

window.addEventListener("load",(e)=>{
  let loginstatus = JSON.parse(localStorage.getItem("token")) || null ;
  let logout = document.getElementById('logout');
  let logoutBtn = document.getElementById('btn-logout');
  
  logout.style.display = "none"

  if(loginstatus.status){
    loginForm.style.display = "none"
    logout.style.display = "block";

    logoutBtn.addEventListener("click",()=>{
      let obj = {token:null,status:false};
      localStorage.setItem("token",JSON.stringify(obj));
      alert("User has been logged out");
      window.location.reload();
    })
  }
})

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
    fetch(`${url}users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      // console.log(data);
      let msg = data.msg;
      let token = data.token;
      localStorage.setItem("token",JSON.stringify({token:token,status:true}));
      alert(msg)
      window.location.reload();
    })
    .catch(error => {
      console.error(error);
    });
  }
  loginForm.email.value = "";
  loginForm.password.value = "";
});

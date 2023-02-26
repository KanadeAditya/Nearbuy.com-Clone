let form = document.getElementById('add-business-form');
const url = "http://localhost:4040/"; // Here is the URL you can change with the ndeployed link afterwards 


form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  let name = document.getElementById('name').value;
  let location = document.getElementById('location').value;
  let type = document.getElementById('type').value;
  let price = document.getElementById('price').value;

  if (!name || !location || !type || !price) {
    alert('Please fill out all fields.');
  }else{
    let loginstatus = JSON.parse(localStorage.getItem("token")) ;
    let newBusiness = { name, location, type, price };
    fetch(`${url}business/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${loginstatus.token}`
        },
        body: JSON.stringify(newBusiness)
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data.msg)
        alert(data.msg)
      })
      .catch(error => {
        console.error({'msg': error});
      });
  }

  let newBusiness = { name, location, type, price };

  console.log(newBusiness)
});

let form = document.getElementById('add-business-form');
const url = "http://localhost:4040/"; // Here is the URL you can change with the ndeployed link afterwards 


form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  let name = document.getElementById('name').value.trim();
  let location = document.getElementById('location').value.trim();
  let type = document.getElementById('type').value.trim();
  let price = document.getElementById('price').value.trim();

  if (name || location || type || price) {
    let loginstatus = JSON.parse(localStorage.getItem("token")) ;
    let newBusiness = {};
    let ID = localStorage.getItem("update");
    if(name !== ""){
        newBusiness.name = name ; 
    }
    if(price !== ""){
       newBusiness.price = price ;
    }
    if(type !== ""){
       newBusiness.type = type ; 
    }
    if(location !== ""){
       newBusiness.location = location ;
    }

    console.log(newBusiness)
    fetch(`${url}business/update/${ID}`, {
        method: 'PATCH',
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

  }else{
    alert('Please fill out updation fields.');
  }


});

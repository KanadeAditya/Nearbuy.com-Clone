const summary = document.getElementById("summary");
const cont = document.getElementById("container");
const appendhere = document.getElementById("appendhere");
const checkout = document.getElementById("checkout-button");
const url = "http://localhost:4040/"; // Here is the URL you can change with the ndeployed link afterwards 

window.addEventListener("load",()=>{
    let loginstatus = JSON.parse(localStorage.getItem("token")) || null ;
    if(loginstatus && loginstatus.status){
        let str = 'myservices'
        fetchFiltered(str,loginstatus.token);

    }else{
        cont.style.display = "none"
        summary.innerText = "Please Login First"
    }
})

checkout.addEventListener("click",()=>{
    let loginstatus = JSON.parse(localStorage.getItem("token"));
    fetch(`${url}business/removeall`, {
    method: 'PATCH',
    headers: {
        'Authorization': `${loginstatus.token}`,
        'Content-Type': 'application/json'
    }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        let subtotal = document.getElementById("subtotal").innerText;
        let taxable = document.getElementById("taxable").innerText;
        let totalamt = document.getElementById("total-amt").innerText;
        str =  `Thanks a lot For shopping with us Today \n Your Order summary is as follows \n Subtotal :- ₹ ${subtotal} \n GST :- ₹ ${taxable} \n Total Payable :- ₹${totalamt} \n Your order summary will be mailed to your email id :- ${data.email} with the following services coupons shortly \n And Your availed services will be cleared \n Have a great day !!!!`
        alert(str);
        window.location.reload();
    })
    .catch(error => {
        console.error(error);
    });
})

function fetchFiltered(query,token){
    console.log(query)
    fetch(`${url}business/${query}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      })
    .then(response => {
        return response.json();
    })
    .then((bdata) => {
      createDOM(bdata)
    })
    .catch(error => {
      console.error(error);
    });
}

function createDOM(data){
    
    if(data.length == 0){
        summary.innerText = "You have not availed any services"
        cont.style.display = "none"
    }else{
        let subtotal = document.getElementById("subtotal");
        let taxable = document.getElementById("taxable");
        let totalamt = document.getElementById("total-amt");
        let subt = 0;
        let newarr = data.map((el,ind)=>{
            
            subt+=Number(el.price);

            return createCards(el);
        })

        let tx = subt*0.18;
        let tt = subt + tx; 
        subtotal.innerText = subt ; 
        taxable.innerText = tx ; 
        totalamt.innerText = tt ; 

        appendhere.innerHTML = `${newarr.join("")}`

        let deletebtns = document.querySelectorAll(".delete-buttons");
        deletebtns.forEach((ele,ind)=>{
            ele.addEventListener("click",(e)=>{
                let ID = e.target.dataset.id;
                let loginstatus = JSON.parse(localStorage.getItem("token"));
                fetch(`${url}business/remove/${ID}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `${loginstatus.token}`,
                    'Content-Type': 'application/json'
                }
                })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    alert(data.msg);
                    window.location.reload();
                })
                .catch(error => {
                    console.error(error);
                });
                
            })
        })
    }
}

function createCards(item){
    let name = item.name 
    let type = item.type
    let price = item.price
    let loc = item.location
    let ID  = item._id

    return `<tr class="summary-cards" data-cards="cards${ID}">
                <td>${name}</td>
                <td>${type.toUpperCase()}</td>
                <td> ₹ ${price}</td>
                <td>${loc}</td>
                <td><button class="delete-buttons" data-id="${ID}" data-name="${name}" data-type="${type}" data-loc="${loc}" data-price="${price}">Delete</button></td>
            </tr>`
}

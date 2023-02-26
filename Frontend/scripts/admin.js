const url = "http://localhost:4040/";

const businesscont = document.getElementById("render-business");
const filterLoc = document.getElementById("location-filter");
const sortprice = document.getElementById("price-sort")

window.addEventListener("load",()=>{
    fetchFiltered("");
})

filterLoc.addEventListener("change",()=>{
    let loc = filterLoc.value;
    let sort = sortprice.value;
    // alert(`${loc} and ${sort}`)
    if(loc==="" && sort===""){
        fetchFiltered("");
    }else if(loc==="" && sort!==""){
        let str = `filtered/?sort=${sort}`
        fetchFiltered(str);
    }else if(sort !== ""){
        let str = `filtered/?location=${loc}&sort=${sort}`
        fetchFiltered(str);
    }else{
        let str = `filtered/?location=${loc}`
        fetchFiltered(str);
    }
})

sortprice.addEventListener("change",()=>{
    let loc = filterLoc.value;
    let sort = sortprice.value;
    if(sort==="" && loc===""){
        fetchFiltered("");
    }else if(sort==="" && loc!==""){
        let str = `filtered/?location=${loc}`
        fetchFiltered(str);
    }else if(loc !== ""){
        let str = `filtered/?location=${loc}&sort=${sort}`
        fetchFiltered(str);
    }else{
        let str = `filtered/?sort=${sort}`
        fetchFiltered(str);
    }
})

function fetchFiltered(query){
    console.log(query)
    fetch(`${url}business/${query}`)
    .then(response => {
        return response.json();
    })
    .then((bdata) => {
      createDOM(bdata)
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
}


function createDOM(data){
    let newarr = data.map((el,ind)=>{
        return createCards(el);
    })

    businesscont.innerHTML = `${newarr.join("")}`

    let delbtns = document.querySelectorAll(".delete-buttons");
    delbtns.forEach((ele,ind)=>{
        ele.addEventListener("click",(e)=>{
            let ID = e.target.dataset.id;
            let loginstatus = JSON.parse(localStorage.getItem("token")) || null ;
            
            if(loginstatus && loginstatus.status){
                fetch(`${url}business/delete/${ID}`, {
                    method: 'DELETE',
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
                        window.location.reload()
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }else{
                alert("Please login First")
            }
        })
    })

    let updatebtn = document.querySelectorAll(".update-buttons");
    updatebtn.forEach((ele,ind)=>{
        ele.addEventListener("click",(e)=>{
            let ID = e.target.dataset.id;
            let loginstatus = JSON.parse(localStorage.getItem("token")) || null ;
            
            if(loginstatus && loginstatus.status){
                localStorage.setItem("update",ID);
                window.location.href = "/Frontend/updateservice.html"
            }else{
                alert("Please login First")
            }
        })
    })
}

function createCards(item){
    let name = item.name 
    let type = item.type
    let price = item.price
    let loc = item.location
    let ID  = item._id

    return `<div class="cards" data-cards="card${ID}">
                <div class="card-details">
                    <h3>${name}</h3>
                    <h3>Type - ${type.toUpperCase()}</h3>
                    <h4>Price - ₹ ${price}</h4>
                    <h4>Location - ${loc}</h4>
                </div>
                <div class="card-btn">
                    <button class="delete-buttons" data-id="${ID}" data-name="${name}" data-type="${type}" data-loc="${loc}" data-price="${price}">Delete</button>
                    <button class="update-buttons" data-id="${ID}" data-name="${name}" data-type="${type}" data-loc="${loc}" data-price="${price}">Update</button>
                </div>
            </div>`
}
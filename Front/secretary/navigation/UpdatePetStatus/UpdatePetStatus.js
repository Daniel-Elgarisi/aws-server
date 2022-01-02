let ownerId
async function updateStatus() {
    let phone = document.getElementById("Phone").value;
    let pname = document.getElementById("Pname").value;

    //fetch
    //call for POST to the url:
    let response = await fetch(`http://localhost:5000/pets/updateStatus/${phone}/${pname}`, {
        //post
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    //get data from backend response as json!
    let body = await response.json()

    alert(body.message)
}

async function findOwner() {
    let phone = document.getElementById("Phone").value;

    //fetch
    //call for POST to the url:
    let response = await fetch('http://localhost:5000/user/getUserByPhone', {
        //post
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //this is the stuff we refer to as: req.body in the backend!!!!!
        body: JSON.stringify({
            phone: phone
        })
    })
    //get data from backend response as json!
    ownerId = await response.json()
    console.log(ownerId);
}
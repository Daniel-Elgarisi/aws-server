async function update() {
    let currentUser = sessionStorage.getItem("user")
    let name = document.getElementById("Name").value;
    let lname = document.getElementById("Lname").value;
    let email = document.getElementById("Email").value;
    let phone = document.getElementById("Phone").value;

    //fetch
    //call for POST to the url:
    let response = await fetch('http://localhost:5000/user/update', {
        //post
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        //this is the stuff we refer to as: req.body in the backend!!!!!
        body: JSON.stringify({
            currentUser: currentUser, 
            name: name,
            lname: lname,
            email: email,
            phone: phone
        })
    })
    //get data from backend response as json!
    let body = await response.json()

    alert(body.message)
}
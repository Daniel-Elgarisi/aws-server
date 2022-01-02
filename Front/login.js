sessionStorage.setItem("ip", "18.192.25.230")
async function login() {
    let user = document.getElementById("Uname").value;
    let pass = document.getElementById("Pass").value;
    let ip = sessionStorage.getItem("ip")
    //fetch
    //call for POST to the url:
    let response = await fetch(`http://${ip}:5000/user/login`, {
        //post
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //this is the stuff we refer to as: req.body in the backend!!!!!
        body: JSON.stringify({
            username: user,
            password: pass
        })
    })
    //get data from backend response as json!
    let body = await response.json()

    //if I dont get a variable called data from the back, something is wrong!

    if (!body.data) {
        alert(body.message);
        return;
    }
    //if im here i have the data so lets save it!!!
    sessionStorage.setItem("user", body.data.username);
    sessionStorage.setItem("role", body.data.role);
    sessionStorage.setItem("phone_number", body.data.phone_number)
    //data.data keeps username and role, lets use the role to see to where to navigate
    switch (body.data.role) {
        case 1:
            window.location.href = "owner/OwnerMenu.html";
            break;
        case 2:
            window.location.href = "doctor/DoctorMenu.html";
            break;
        case 3:
            window.location.href = "secretary/SecretaryMenu.html";
            break;
    }

}
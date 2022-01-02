
async function register() {
  let user = document.getElementById("User").value;
  let name = document.getElementById("Name").value;
  let pass = document.getElementById("Pass").value;
  let email = document.getElementById("Email").value;
  let lname = document.getElementById("Lname").value;
  let phone = document.getElementById("Phone").value;
  let role = document.getElementById("Role").value;
  let ip = sessionStorage.getItem("ip")


  //fetch
  //call for POST to the url:
  let response = await fetch(`http://${ip}:5000/user/register`, {
    //post
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    //this is the stuff we refer to as: req.body in the backend!!!!!
    body: JSON.stringify({
      user_name: user,
      password: pass,
      first_name: name,
      last_name: lname,
      email: email,
      phone_number: phone,
      role: role
    })
  })
  //get data from backend response as json!
  let body = await response.json()

  alert(body.message)
}
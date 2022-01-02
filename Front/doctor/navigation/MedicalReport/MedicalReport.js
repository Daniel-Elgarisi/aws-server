let phone = document.getElementById("Phone").value;
let pname = document.getElementById("Pname").value;


async function uploadReport() {
    let phone = document.getElementById("Phone").value;
    let pname = document.getElementById("Pname").value;
    let appointmentType = document.getElementById("AppType").value;
    let report = document.getElementById("Report").value;
    let ip = sessionStorage.getItem("ip")
    //fetch
    //call for POST to the url:
    let response = await fetch(`http://${ip}:5000/reports/uploadReport`,{
      //post
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    //   this is the stuff we refer to as: req.body in the backend!!!!!
      body: JSON.stringify({
        phone_number: phone, 
        name: pname,
        appointment_type: appointmentType,
        report: report
      })
    })
    //get data from backend response as jsson!
    let body = await response.json()
    
    alert(body.message)
    console.log(body.message);
  }

async function findPetIdByName() {
  let ip = sessionStorage.getItem("ip")

    //fetch
    //call for POST to the url:
    let response = await fetch(`http://${ip}:5000/pets/findPetIdByName`, {
        //post
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //this is the stuff we refer to as: req.body in the backend!!!!!
        body: JSON.stringify({
            pname: pname,
            ownerId: ownerId.data
        })
    })
    //get data from backend response as json!
    petId = await response.json()
}


async function findOwner() {
  let ip = sessionStorage.getItem("ip")

    //fetch
    //call for POST to the url:
    let response = await fetch(`http://${ip}:5000/user/getUserByPhone`, {
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
}
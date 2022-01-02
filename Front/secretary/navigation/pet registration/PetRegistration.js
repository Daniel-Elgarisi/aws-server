async function petRegister() {

  let phone = document.getElementById("Phone").value;
  let pname = document.getElementById("PetName").value;
  let breed = document.getElementById("Breed").value;
  let chip = document.getElementById("ChipNumber").value;
  let pbirthday = document.getElementById("PetBirthday").value;
  let gender = document.getElementById("Gender").value;
  let type = document.getElementById("Type").value;

  //fetch
  //call for POST to the url:
  let response = await fetch('http://localhost:5000/pets/petRegister', {
    //post
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    //this is the stuff we refer to as: req.body in the backend!!!!! ------ לבדוק עם דניאל מה לעשות
    body: JSON.stringify({
      phone_number: phone,
      name: pname,
      breed: breed,
      chip_number: chip,
      birthday: pbirthday,
      gender: gender,
      type: type
    })
  })
  //get data from backend response as json!
  let body = await response.json()

  alert(body.message)
}


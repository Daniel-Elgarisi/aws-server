var startDate = new Date();
startDate.setDate(startDate.getDate());
var endDate = new Date(startDate.getFullYear(), startDate.getMonth()+2 , startDate.getDay())
console.log(startDate.getDay());
let hours = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
   "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
   "16:00", "16:30", "17:00", "17:30", "18:00"]

$('#date').datepicker({
   startDate: startDate,
   endDate: endDate,
   dateFormat: "dd-mm-yy",
   daysOfWeekDisabled: [,6]
});

function updateHours() {
   let time = document.getElementById("time")
   time.innerHTML = ""
   let len = 11
   let date = document.getElementById("date");
   let chosenDate = new Date(date.value);
   if (chosenDate.getDay() != 5) {
      len = hours.length
   }
   for (let index = 0; index <len; index++) {
      let opt = document.createElement("option")
      opt.setAttribute("value", hours[index])
      opt.innerText = hours[index];
      time.appendChild(opt)
   }
}


async function requestAppointment() {

   let phone = document.getElementById("Phone").value;
   let pname = document.getElementById("PetName").value;
   let apptype = document.getElementById("AppType").value;
   let date = new Date(document.getElementById("date").value);
   let ip = sessionStorage.getItem("ip")

   // let time = new Date(document.getElementById("time").value).toISOString();
   let time = document.getElementById("time").value;
   // console.log(+time[0]*10 + +time[1],time[3]*10);
   date.setHours(+time[0]*10 + +time[1],time[3]*10)
   console.log(date);

   //fetch
   //call for POST to the url:
   let response = await fetch(`http://${ip}:5000/appointments/make`, {
     //post
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     //this is the stuff we refer to as: req.body in the backend!!!!! ------ לבדוק עם דניאל מה לעשות
     body: JSON.stringify({
      phone_number: phone,
      name: pname,
      appointment_type: apptype,
      time: date
     })
   })
   //get data from backend response as json!
   let body = await response.json()
 
   alert(body.message)
 }
 
 
async function watchAppointment() {
    let ip = sessionStorage.getItem("ip")
    //fetch
    //call for POST to the url:
    let response = await fetch(`http://${ip}:5000/appointments/month`)
    //get data from backend response as json!
    // let body = await response.json()
    let body = await response.json()
    console.log(body);
    let table = document.getElementById("tbe")
    table.innerHTML = ""
    try {
        let colNames = ["שם לקוח","מספר טלפון", "שם בע''ח", "סוג פגישה", "זמן"]
        let len = Object.keys(body[0]).length - 1
        console.log(Object.values(body[0])[0]);
        let table = document.getElementById("tbe")
        let tr = document.createElement("tr")
        table.appendChild(tr)
        for (let index = 0; index < len; index++) {
            let th = document.createElement("th")
            th.innerText = colNames[index]
            tr.appendChild(th)
        }
        console.log(body);
        for (let i = 0; i < body.length; i++) {
            let tr = document.createElement("tr")
            table.appendChild(tr)
            for (let j = 0; j < len; j++) {
                let td = document.createElement("td")
                td.innerText = Object.values(body[i])[j], Object.values(body[i])[j + 1]
                tr.appendChild(td)
            }
        }
    }
    catch {
        alert(body.message);
    }

} 

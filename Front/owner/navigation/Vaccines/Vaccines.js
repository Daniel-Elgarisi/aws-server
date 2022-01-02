async function watchVaccines() {
    let pname = document.getElementById("Pname").value;
    let phone_number = sessionStorage.getItem('phone_number');
    let ip = sessionStorage.getItem("ip")

    console.log(phone_number);
    //fetch
    //call for POST to the url:
    let response = await fetch(`http://${ip}:5000/vaccines/watchVacc/${phone_number}/${pname}`, {
        //post
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    //get data from backend response as json!
    let body = await response.json()

    if (!body.message) {
        let len = Object.keys(body[0]).length
        if (len != 0) {
            let table = document.getElementById("tbe")
            table.innerHTML = ""
            let tr = document.createElement("tr")
            table.appendChild(tr)
            let th1 = document.createElement("th")
            th1.innerText = "שם חיסון"
            tr.appendChild(th1)
            let th2 = document.createElement("th")
            th2.innerText = "תאריך"
            tr.appendChild(th2)
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
    }
    else
        alert(body.message);
} 
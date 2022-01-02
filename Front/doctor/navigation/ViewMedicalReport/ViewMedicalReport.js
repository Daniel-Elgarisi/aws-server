async function watchMedicalReport() {

    let phone = document.getElementById("Phone").value;
    let pname = document.getElementById("Pname").value;

    //fetch
    //call for POST to the url:
    let response = await fetch(`http://localhost:5000/reports/viewMedical/${phone}/${pname}`, {
        //post
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    //get data from backend response as json!
    let body = await response.json()

    try {
        let len = Object.keys(body[0]).length
        if (len != 0) {
            let table = document.getElementById("tbe")
            table.innerHTML = ""
            let tr = document.createElement("tr")
            table.appendChild(tr)
            let th1 = document.createElement("th")
            th1.innerText = "סוג הביקור"
            tr.appendChild(th1)
            let th2 = document.createElement("th")
            th2.innerText = "סיכום רפואי"
            tr.appendChild(th2)
            let th3 = document.createElement("th")
            th3.innerText = "תאריך ביקור"
            tr.appendChild(th3)
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
    catch{
        alert(body.message);

    }
} 

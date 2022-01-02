async function watchPatients() {
    let ip = sessionStorage.getItem("ip")
    //fetch
    //call for POST to the url:
    let response = await fetch(`http://${ip}:5000/pets/watchPatients`, {
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
            th1.innerText = "שם בע''ח"
            tr.appendChild(th1)
            let th2 = document.createElement("th")
            th2.innerText = "גזע"
            tr.appendChild(th2)
            let th3 = document.createElement("th")
            th3.innerText = "מין"
            tr.appendChild(th3)
            let th4 = document.createElement("th")
            th4.innerText = "סוג"
            tr.appendChild(th4)
            let th5 = document.createElement("th")
            th5.innerText = "תאריך לידה"
            tr.appendChild(th5)
            let th6 = document.createElement("th")
            th6.innerText = "סטטוס"
            tr.appendChild(th6)
            console.log(body);
            for (let i = 0; i < body.length; i++) {
                let tr = document.createElement("tr")
                table.appendChild(tr)
                for (let j = 0; j < len; j++) {
                    if (j == len - 1) {
                        if (body[i].status)
                            body[i].status = "בחיים"
                        else
                            body[i].status = "נפטר"
                    }
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

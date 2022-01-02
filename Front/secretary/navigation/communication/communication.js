const communication = [
    ["Hospital director", "daniel elgarisi", "daniel@gmail.com", "0528287761"],
    ["Doctor", "becky uzdensky", "becky@gmail.com", "0544727937"],
    ["Doctor", "yovel efraim", "yovel@gmail.com", "0531234567"],
    ["Secretary", "efrat kadosh", "efrat@gmail.com", "0521234567"],
    ["Doctor", "lahad ron", "lahad@gmail.com", "0541234567"]
]

var table = document.getElementById("tbe")
for (let i = 0; i < communication.length; i++) {
    let tr = document.createElement("tr")
    table.appendChild(tr)
    for (let j = 0; j < communication[i].length; j++) {
        let td = document.createElement("td")
        td.innerText = communication[i][j]
        tr.appendChild(td)

    }

}
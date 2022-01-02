async function watchAlbum() {
    let pname = document.getElementById("Pname").value;
    let phone_number = sessionStorage.getItem('phone_number');
    let ip = sessionStorage.getItem("ip")
    console.log(phone_number);
    //fetch
    //call for POST to the url:
    let response = await fetch(`http://${ip}:5000/photo_album/watchAlbum/${phone_number}/${pname}`, {
        //post
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    //get data from backend response as json!
    let body = await response.json()
    console.log(Object.values(body[0])[0]);
    // let res = Object.values(body[0])[0]
    
    if (!body.message) {
        window.location.href = Object.values(body[0])[0]

    }
    else{
        alert(body.message)
    }
}

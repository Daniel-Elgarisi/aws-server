function nav(choice) {
    let res;
    switch (choice) {
        case 1:
            res = "navigation/HomePage/home.html"

            break;
        case 2:
            res = "../EditProfile/EditProfile.html"

            break;
        case 3:
            res = "navigation/Registration/Registration.html"

            break;
        case 4:
            res = "navigation/pet registration/PetRegistration.html"

            break;
        case 5:
            res = "navigation/UpdatePetStatus/UpdatePetStatus.html"
            break;
        case 6:
            res = "navigation/Vaccines/Vaccines.html"

            break;
        case 7:
            res = "navigation/communication/communication.html"

            break;
        case 8:
            res = "navigation/GetAppointmentMonth/GetAppointmentMonth.html"

            break;
        case 9:
            res = "navigation/Patients/Patients.html"
            break;
        case 10:
            sessionStorage.setItem("user", null)
            sessionStorage.setItem("role", null)
            window.location.href = '../login.html';
            break;

    }
    let frame = document.getElementById("frame")
    frame.setAttribute("src", res)

}
function submitToAPI(event) {
    console.log("submitToAPI: ");
    event.preventDefault();

    URL = "https://13i8hx2gga.execute-api.us-east-1.amazonaws.com/prod/contact";

    const namere = /[A-Za-z]{1}[A-Za-z]/;
    let fname = document.getElementById('first-name-input').value;
    console.log("fname: " + fname);
    if (!namere.test(fname)) {
                alert ("Name can not be less than 2 characters");
        return;
    }

    let lname = document.getElementById('last-name-input').value;
    console.log("lname: " + lname);
    if (!namere.test(lname)) {
                alert ("Name can not be less than 2 characters");
        return;
    }
    
    const emailre = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
    let email = document.getElementById('email-input').value;
    console.log("email: " + email);
    if (email == "") {
        alert ("Please enter your email address");
        return;
    }
    if (!emailre.test(email)) {
        alert ("Please enter valid email address");
        return;
    }

    let message = document.getElementById('message-input').value;
    console.log("message: " + message);
    if (message == "") {
        alert ("Please enter a message");
        return;
    }

    var data = {
        fname : fname,
        lname: lname,
        email : email,
        message : message
        };

    $.ajax(
        {
        type: "POST",
        url : URL,
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function () {
            // clear form and show a success message
            alert("Successful");
            document.getElementById("contact-form").reset();
            location.reload();
        },
        error: function () {
            // show an error message
            alert("UnSuccessfull");
        }
    });
}
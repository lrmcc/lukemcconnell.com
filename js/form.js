function submitToAPI(event) {
   
    event.preventDefault();

    URL = "https://13i8hx2gga.execute-api.us-east-1.amazonaws.com/prod/contact";

    const namere = /[A-Za-z]{1}[A-Za-z]/;
    const emailre = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;

    let fname = document.getElementById('first-name-input').value;
    let lname = document.getElementById('last-name-input').value;
    let email = document.getElementById('email-input').value;
    let message = document.getElementById('message-input').value;

    console.log(`first name: ${fname}, last name: ${lname}, email: ${email}\nmessage: ${message}`);

    if (!namere.test(fname) || !namere.test(lname)) {
        alert ("Name can not be less than 2 characters");
        return;
    }
    
    if (email == "" || !emailre.test(email)) {
        alert ("Please enter valid email address");
        return;
    }

    if (message == "") {
        alert ("Please enter a message");
        return;
    }

    let data = {
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
            alert("Successful");
            document.getElementById("contact-form").reset();
            location.reload();
        },
        error: function () {
            alert("Unsuccessful");
        }
    });
}
let mode = 1;

function modeSelect(){
    console.log("current mode: " + mode);
    let bodyElement = document.body;
    bodyElement.classList.toggle("body-light-mode");
    let headerElement = document.getElementById("header");
    let moonElement = document.getElementById("moon");
    let sunElement = document.getElementById("sun");
    let firstNameElement = document.getElementById("logo-first-name");
    let lastNameElement = document.getElementById("logo-last-name");
    let footerInfoElement = document.getElementById("footer-info")


    if (mode){
        mode = 0;
        moonElement.style.transform = "scale(0.5)";
        sunElement.style.transform = "scale(1)";
        headerElement.style.backgroundColor = "white";
        firstNameElement.style.color= "#434242";
        lastNameElement.style.color= "#434242";
        footerInfoElement.style.color = "#434242";
    }
    else {
        mode = 1;
        moonElement.style.transform = "scale(1)";
        sunElement.style.transform = "scale(0.5)";
        headerElement.style.backgroundColor = "#434242";
        firstNameElement.style.color = "white";
        lastNameElement.style.color = "white";
        footerInfoElement.style.color = "white";
    }
}
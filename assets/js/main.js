let mode = 1;

function modeSelect(){
    console.log("current mode: " + mode);
    let bodyElement = document.body;
    bodyElement.classList.toggle("body-light-mode");
    let headerElement = document.getElementById("header");
    let moonElement = document.getElementById("moon");
    let sunElement = document.getElementById("sun");
    if (mode){
        mode = 0;
        moonElement.style.transform = "scale(0.5)";
        sunElement.style.transform = "scale(1)";
        headerElement.style.backgroundColor = "white";
    }
    else {
        mode = 1;
        moonElement.style.transform = "scale(1)";
        sunElement.style.transform = "scale(0.5)";
        headerElement.style.backgroundColor = "#121212";
    }
}
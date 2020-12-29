let mode = 1;

function modeSelect(){
    console.log("current mode: " + mode);
    let bodyElement = document.body;
    bodyElement.classList.toggle("body-light-mode");
    let headerElement = document.getElementById("header");
    let moonElement = document.getElementById("moon");
    let sunElement = document.getElementById("sun");
    let gridElement = document.getElementById("grid-container");
    if (mode){
        mode = 0;
        moonElement.style.transform = "scale(0.5)";
        sunElement.style.transform = "scale(1)";
        headerElement.style.backgroundColor = "#d2dbf1";
        gridElement.style.backgroundColor = "#c6cdf8";
    }
    else {
        mode = 1;
        moonElement.style.transform = "scale(1)";
        sunElement.style.transform = "scale(0.5)";
        headerElement.style.backgroundColor = "#1F1B24";
        gridElement.style.backgroundColor = "#606dbc";
    }
}
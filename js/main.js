let mode = 1;

function modeSelect(){
    console.log("current mode: " + mode);
    let i;
    let bodyElement = document.body;
    bodyElement.classList.toggle("body-light-mode");
    let moonElement = document.getElementById("moon");
    let sunElement = document.getElementById("sun");
    let firstNameElement = document.getElementById("logo-first-name");
    let lastNameElement = document.getElementById("logo-last-name");
    let footerInfoElement = document.getElementById("footer-info")
    let mainSectionNames = document.getElementsByClassName("main-section-name")
    let sideSectionNames = document.getElementsByClassName("side-section-name")


    if (mode){
        mode = 0;
        moonElement.style.transform = "scale(0.5)";
        sunElement.style.transform = "scale(1)";
        firstNameElement.style.color= "#434242";
        lastNameElement.style.color= "#434242";
        footerInfoElement.style.color = "#434242";
        for (i = 0; i < mainSectionNames.length; i++) {
            mainSectionNames[i].style.color = "#434242";
            mainSectionNames[i].style.backgroundColor = "#d6d6d6";
            sideSectionNames[i].style.color = "#434242";
            sideSectionNames[i].style.backgroundColor = "#d6d6d6";
        }
    }
    else {
        mode = 1;
        moonElement.style.transform = "scale(1)";
        sunElement.style.transform = "scale(0.5)";
        firstNameElement.style.color = "white";
        lastNameElement.style.color = "white";
        footerInfoElement.style.color = "white";
        for (i = 0; i < mainSectionNames.length; i++) {
            mainSectionNames[i].style.color = "white";
            mainSectionNames[i].style.backgroundColor = "#5e5e5e";
            sideSectionNames[i].style.color = "white";
            sideSectionNames[i].style.backgroundColor = "#5e5e5e";
        }
    }
}
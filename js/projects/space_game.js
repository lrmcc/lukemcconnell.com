let keyPress = '';
let gameInProgress = 0;
let time = 60;
let score = 0;
let transformRegex = /(-*[0-9]+)/g;

let shipX = 200;
let shipY = 220;
let shipMinX = -160;
let shipMaxX = 560;
let shipMinY = -60;
let shipMaxY = 270;

let numStarsCreate = 16;
let numStarsActive = 0;
let starYValue = [-100,50,200,350,500];

let numUFOsCreate = 0;
let UFOX = -180;
let UFOMinX = -180;
let UFOMaxX = 530;
let UFOY = -60;
let UFODirection = 1;

let UFOResetX = [-179, -38, 104, 246, 388, 529]
let UFOElementID = '';
let UFOHit = 0;

let numberLasersCreate = 5;
let laserX = 246;
let laserY = 160;
let laserMinY = -100;
let laserMaxY = 270;
let laserIDsActive = [];
let laserIsMoving = 0;

let shipComponentents = ['ship-nose', 'ship-body','ship-wing-left','ship-wing-right', 'ship-tail','ship-tail-fire','ship-tail-fire'];
let UFOComponents = ['ufo-glass', 'ufo-alien','ufo-alien-eye-left','ufo-alien-eye-right', 'ufo-alien-body','ufo-top','ufo-body-upper', 'ufo-body-lower','ufo-antenna-pole','ufo-antenna-base','ufo-antenna-bead'];

function startBackgroundAnimation() {
    for(let i = 0; i < numStarsCreate; i++){
        addStar(`star${i}`);
    }
}

function startGame(){
    if (!gameInProgress){
        console.log("Starting game");
        document.getElementById('startButton').style.zIndex = 0;
        score = 0;
        setScore();
        setShipCSSRootVariables();
        addShip();
        for(let i = 0; i < numberLasersCreate; i++){
            addLaser(`laser${i}`);
        }
        addUFO(1);
        document.onkeydown = checkKey;
        startTimer();
    }
    gameInProgress = 1;
}

function quitGame(){
    console.log("quitting game");
    let graphicsContainer = document.querySelector('.graphics');
    while (graphicsContainer.lastElementChild) {
        graphicsContainer.removeChild(graphicsContainer.lastElementChild);
    }
    document.onkeydown = null;
    numStarsActive = 0;
    gameInProgress = 0;
    startBackgroundAnimation();
    time = 0;
    document.getElementById('game-time-value').innerText = time;
    document.getElementById('startButton').style.zIndex = 1;
}

function pauseGame(){

}

async function startTimer(){
    time = 60;
    let timeElement = document.getElementById('game-time-value');
    while (time > -1){
        timeElement.innerText = time;
        if(time == 0){
            quitGame();
        }
        await sleep(1000);
        time--;
    }
}


function addStar(starID){
    appendChildToGraphics('star', '',starID, 'graphics');
    let star = document.getElementById(starID);
    let starTime = getStarTime();
    setStarStyles(star, starTime, getStarXValue());
    setTimeout(() => {resetStarStyles(star)}, Math.floor(starTime * 1000));
    numStarsActive++;
}

function setStarStyles(star, starTime, starXValue){
    star.style.setProperty('--star-time', starTime +'s');
    star.style.setProperty("--star-translateX", starXValue + "px");
}

function resetStarStyles(star){
    let starTime = getStarTime();
    setStarStyles(star, starTime, getStarXValue());
    setTimeout(() => {resetStarStyles(star)}, Math.floor(starTime * 1000));
}

let getStarTime = () => {return 10 * Math.random() + 3; }

let getStarXValue = () => { return Math.random() * (880 - (-80)) + -80;}

function addShip(){
    console.log("Adding Ship");
    appendChildToGraphics('', '', 'ship-container', 'graphics');
    appendChildToGraphics('', '', 'ship-wrapper', 'ship-container');
    appendChildToGraphics('', '', 'ship', 'ship-wrapper');
    for(let i = 0; i < shipComponentents.length; i++){
        appendChildToGraphics('', ' ship-component', shipComponentents[i], 'ship');
    }
}

function shipMove(){
    let shipContainer = document.getElementById('ship-container');
    shipContainer.style.transform = `translate(${shipX}px, ${shipY}px)`;
    console.log("shipContainer.style.transform: " + shipContainer.style.transform);
    let shipTailFire = document.getElementById('ship-tail-fire');
    shipFireOn(shipTailFire);
    setTimeout(shipFireOff(shipTailFire), 100);
}

let shipFireOn = (shipTailFire) => {shipTailFire.style.visibility = "visible";}

let shipFireOff = (shipTailFire) => {shipTailFire.style.visibility = "hidden";}

function addUFO(numUFOs){
    for (let i = 0; i < numUFOs; i++){
        appendChildToGraphics('ufo-container', '',`ufo-container${i}`, 'graphics');
        appendChildToGraphics('ufo', '', `ufo${i}`, `ufo-container${i}`);
        for(let j = 0; j < UFOComponents.length; j++){
            appendChildToGraphics(UFOComponents[j], ' ufo-component', `${UFOComponents[j]}${i}`, `ufo${i}`);
        }
        UFOElementID = `ufo-container${i}`;
        let UFOContainer = document.getElementById(UFOElementID);
        setUFOTransform(UFOContainer);
        activateUFOAnimation(UFOContainer);
    }
}

 function activateUFOAnimation(UFOContainer){
    let id = setInterval(frame, 10);
    async function frame() {
        if (UFOX == UFOMaxX) {
            UFODirection = -1;
        } else if (UFOX == UFOMinX){
            UFODirection = 1;
        } else if (UFOHit){
            UFOHit = 0;
            UFOContainer.style.opacity = '0';
            score++;
            setScore();
            clearInterval(id);
            await sleep(Math.floor(Math.random() * 6000));
            UFOX = UFOResetX[Math.floor(Math.random() * 6)];
            setUFOTransform(UFOContainer);
            UFOContainer.style.opacity = '1';
            activateUFOAnimation(UFOContainer);
        }
        UFOX += UFODirection;
        setUFOTransform(UFOContainer);
    }
}

let addLaser = (laserID) => { appendChildToGraphics('laser', '',laserID, 'graphics');}
 
function appendChildToGraphics(childClassName, childAddClassName, childId, parentElement){
    let graphicsContainer = document.getElementById(parentElement);
    let childElement = document.createElement("div");
    childElement.className = childClassName;
    if (childAddClassName != '') childElement.className += childAddClassName;
    if (childId != 999) childElement.id = childId;
    graphicsContainer.appendChild(childElement);
}

function checkKey(e) {
    e = e || window.event;
    keyPress = e.keyCode;
    console.log(keyPress);
    if ( keyPress == '38' || keyPress == '40' || keyPress == '37' || keyPress == '39' ){

        if ((keyPress == '38') && (shipY > shipMinY)) {
            shipY = shipY - 40;
        }
        else if ((keyPress == '40') && (shipY < shipMaxY)) {
            shipY = shipY + 40;
        }
        else if ((keyPress == '37') && (shipX > shipMinX)) {
            shipX = shipX - 40;
        }
        else if ((keyPress == '39') && (shipX < shipMaxX)) {
            shipX = shipX + 40;
        }
        shipMove();
    } else if (keyPress = '32'){
        console.log("pressed spacebar");
        if (laserIDsActive.length < 5) fireLaser();
        else console.log("Max lasers deployed");
    }
}

async function fireLaser(){
    let laserIDNumber = laserIDsActive.length;
    let laserID = `laser${laserIDNumber}`
    let laser = document.getElementById(laserID);
    activateFireLaserAnimation(laser);
    checkLaserHit(laser);
    laserIDsActive.push(laserIDNumber);
    await sleep(2000);
    laserIDsActive.shift();
 }

 function activateFireLaserAnimation(laser){
    laserX = shipX + 48;
    laserY = shipY;
    laserIsMoving = 1;
    laser.style.opacity = '1';
    let id = setInterval(frame, 5);
    function frame() {
        if (laserY == laserMinY) {
            laserIsMoving = 0;
            laser.style.opacity = '0';
            clearInterval(id);
        } else {
            laserY--;
            laser.style.transform = `translate(${laserX}px, ${laserY}px)`;
        }
    }
}

async function checkLaserHit(laser){
    while(laserIsMoving){
        await sleep(10);
        if(laserX > (UFOX) && laserX < (UFOX+100)){
            console.log("x-HIT")
            if(laserY < (UFOY+20) && laserY > (UFOY-50)){
                //console.log("laserX: " + laserX);
                //console.log("UFOX: " + UFOX);
                //console.log("laserY: " + laserY);
                //console.log("UFOY: " + UFOY);
                console.log("y-HIT!");
                laserIsMoving = 0;
                UFOHit = 1;
            }
        }
    }
};

function setScore(){
    document.getElementById('game-score-value').innerText = score;
}

function setUFOTransform(UFOContainer){
    UFOContainer.style.transform = `translate(${UFOX}px, ${UFOY}px)`;
}
function setShipCSSRootVariables(){
    setCSSRootVariable('--ship-translateX', shipX, 'px');
    setCSSRootVariable('--ship-translateY', shipY, 'px');
}

let setCSSRootVariable = (varName, value, valueString)  => { document.documentElement.style.setProperty(`${varName}`, value + valueString);}  

let sleep = (ms) => { return new Promise(resolve => setTimeout(resolve, ms));}
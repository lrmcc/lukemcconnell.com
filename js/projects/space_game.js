const shipInitX = 200;
const shipMinX = -160;
const shipMaxX = 560;
const shipInitY = 220;
const shipMinY = -60;
const shipMaxY = 270;
const shipComponents = ['ship-nose', 'ship-body', 'ship-star', 'ship-circle', 'ship-chevron', 'ship-wing-left','ship-wing-right', 'ship-tail','ship-tail-fire','ship-tail-fire'];

const ufoMinX = -180;
const ufoMaxX = 530;
const ufoComponents = ['ufo-glass', 'ufo-alien','ufo-alien-eye-left','ufo-alien-eye-right', 'ufo-alien-body','ufo-top','ufo-body-upper', 'ufo-body-lower','ufo-antenna-pole','ufo-antenna-base','ufo-antenna-bead'];

const laserMinY = -100;
const laserMaxY = 270;
const numLasersCreate = 5;

const numStarsCreate = 16;

let gameInProgress = false;
let time = 60;
let score = 0;
let keyPress = '';

let shipX = 200;
let shipY = 220;
let shipContainer;
let shipTailFire;

let ufoX = -180;
let ufoY = -60;
let ufoDirection = 1;
let ufoHit = false;
let ufoContainer = "";
let ufoCreated = false;
let ufoExists = false;
let ufoOpac;
let ufoIntervalId;

let numLasersActive = 0;
let laserIsMoving = false;

let numStars = 0;

/**
 * Starts the background animation by adding stars.
 */
const startBackgroundAnimation = () => {
    for(let i = 0; i < numStarsCreate; i++){
        addStar(`star${i}`);
    }
}

/**
 * Starts the game by initializing Ship, Lasers, Ufos, clearing the score and starting the timer. 
 */
const startGame = () => {
    if (!gameInProgress){
        console.log("startGame()");
        score = 0;
        setScore();
        removeStartButton();
        resetGraphics();
        createShip();
        createUfo();
        startTimer();
        document.onkeydown = checkKey;
    }
    gameInProgress = true;
}

/**
 * Starts timer.
 */
const startTimer = async () => {
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

/**
 * Adds star to graphics container.
 * @param {*} starID 
 */
const addStar = (starID) => {
    appendChildToParent(createElement('div', starID, ['star']), 'graphics');
    let star = document.getElementById(starID);
    let starTime = getStarTime();
    setStarStyles(star, starTime, getStarXValue());
    setTimeout(() => {resetStarStyles(star)}, Math.floor(starTime * 1000));
    numStars++;
}

/**
 * Sets star CSS values.
 * @param {*} star 
 * @param {*} starTime 
 * @param {*} starXValue 
 */
const setStarStyles = (star, starTime, starXValue) => {
    star.style.setProperty('--star-time', starTime +'s');
    star.style.setProperty("--star-translateX", starXValue + "px");
}

/**
 * Resets star CSS values.
 * @param {*} star 
 */
const resetStarStyles = (star) => {
    let starTime = getStarTime();
    setStarStyles(star, starTime, getStarXValue());
    setTimeout(() => {resetStarStyles(star)}, Math.floor(starTime * 1000));
}

/**
 * Initializes Ship by appending elements to graphics container.
 */
const createShip = () => {
    console.log("createShip()");
    shipX = shipInitX;
    shipY = shipInitY;
    appendChildToParent(createElement('div', 'ship-container', []), 'graphics');
    appendChildToParent(createElement('div', 'ship-wrapper', []), 'ship-container');
    appendChildToParent(createElement('div', 'ship', []), 'ship-wrapper');
    for(let i = 0; i < shipComponents.length; i++){
        appendChildToParent(createElement('div', shipComponents[i], ['ship-component']), 'ship');
    }
    shipContainer = document.getElementById('ship-container');
    shipTailFire = document.getElementById('ship-tail-fire');
}

/**
 * Allows the ship to move.
 */
const shipMove = async () => {
    shipTailFire.style.visibility = "visible";
    shipContainer.style.transform = `translate(${shipX}px, ${shipY}px)`;
    await sleep(100);
    shipTailFire.style.visibility = "hidden";
}

/**
 * Create Ufo by add needed elements to graphics container.
 */
const createUfo = () => {
    console.log("createUfo()");
    if (!ufoCreated) {
        ufoContainer = appendChildToParent(createElement('div', 'ufo-container', ['ufo-container']), 'graphics');
        appendChildToParent(createElement('div', 'ufo', ['ufo']), 'ufo-container');
        for(let j = 0; j < ufoComponents.length; j++) {
            appendChildToParent(createElement('div', `${ufoComponents[j]}`, [ufoComponents[j], 'ufo-component']), 'ufo');
        }
        ufoX = randomIntFromInterval(-170, 520);
        ufoContainer.style.transform = `translate(${ufoX}px, ${ufoY}px)`;
        ufoCreated = true;
        activateUfo();
    }
}

/**
 * Activates the Ufo animation.
 */
const activateUfo = () => {
    console.log("activateUfo()");
  
    let ufoIntervalId = setInterval(frame, 10);
    function frame() {
        if (!gameInProgress) clearInterval(ufoIntervalId);
        if (ufoHit) {
            ufoHit = false;
            score++;
            setScore();
            removeAllChildElems(ufoContainer);
            ufoContainer.remove();
            ufoExists = false;
            ufoCreated = false;
            clearInterval(ufoIntervalId);
            let time = Math.floor(Math.random() * 5000);
            setTimeout(createUfo, time);
        }
        if (ufoCreated) {
            ufoX += ufoDirection;
            if (ufoX == ufoMaxX) {
                ufoDirection = -1;
            } 
            if (ufoX == ufoMinX) {
                ufoDirection = 1;
            }
            ufoContainer.style.transform = `translate(${ufoX}px, ${ufoY}px)`;
            if (!ufoExists) {
                ufoOpac = window.getComputedStyle(ufoContainer).getPropertyValue("opacity");
                if (ufoOpac == 1) {ufoExists = true;};
            } 
        }    
    }
}

/**
 * Activates the laser to fire.
 */
const fireLaser = async (shipX) => {
    console.log("fireLaser()");
    let laserX = shipX + 48;
    let laserY = shipY - 12;
    let laser = appendChildToParent(createElement('div', `laser${numLasersActive++}`, ['laser']), 'graphics');
    laser.style.transform = `translate(${laserX}px, ${laserY}px)`;
    
    let laserIntervalId = setInterval(frame, 10);
    function frame() {
        if (!gameInProgress) clearInterval(laserIntervalId);
        laserY--;
        if (laserY == laserMinY) {
            laser.remove();
            clearInterval(laserIntervalId);
            numLasersActive--;
        } else {
            laser.style.transform = `translate(${laserX}px, ${laserY}px)`;
            if (ufoExists && laserY < (ufoY+20) && laserY > (ufoY-50) && laserX > (ufoX) && laserX < (ufoX+100)) {
                    ufoHit = true;
                    ufoExists = false;
                }
        }
    }
 }

/**
 * Creates an HTML element based on parameters.
 * @param {} elemType tag type (i.e. div, span, ect.) to create
 * @param {*} elemId id of element created
 * @param {*} elemClassList list of classes to add to element
 * @returns 
 */
const createElement = (elemType, elemId, elemClassList) => {
    let elem = document.createElement(elemType);
    elem.id = elemId;
    if (elemClassList.length > 0) {
        elemClassList.forEach(className => {
            elem.classList.add(className);
        });   
    }
    return elem;
}

/**
 * Appends desired element to the graphics container.
 * @param {*} childElem Element type to be create (i.e. "div" or "button")
 * @param {*} childId Id of child element to create
 * @param {*} childClassList List of strings of class names
 * @param {*} parentId Id of element to append child to
 */
const appendChildToParent = (childElem, parentId) => {
    let parentElem = document.getElementById(parentId);
    parentElem.appendChild(childElem);
    return childElem;
}

/**
 * Removes all child Elements from given parent element
 * @param {*} parentElem 
 */
 const removeAllChildElems = (parentElem) => {
    while (parentElem.firstChild) {
        parentElem.removeChild(parentElem.lastChild);
    }
}

 /**
  * Tool for logging an element's actual position. Used for development/troubleshooting.
  * @param {*} elem 
  */
  const logElemPosition = (elem) =>{
    const reX = /\d+(?=,\s\d+\))/;
    const reY = /\d+(?=\))/;
    elemTransformVal = window.getComputedStyle(elem).getPropertyValue("transform");
    console.log(`Elem ${elem.id}'s position: " x=${elemTransformVal.match(reX)}, y=${elemTransformVal.match(reY)}`);
}

/**
 * Checks the value of the key pressed.
 * @param {*} e 
 */
const checkKey = (e) => {
    e = e || window.event;
    keyPress = e.keyCode;
    switch(keyPress) {
        case 37:
            if (shipX > shipMinX) {shipX -= 40;}
            break;
        case 38:
            if (shipY > shipMinY) {shipY -= 40;}
            break;
        case 39:
            if (shipX < shipMaxX) {shipX += 40;}
            break;
        case 40:
            if (shipY < shipMaxY) {shipY += 40;}
            break;
        default:
            if (keyPress == 32){
                fireLaser(shipX);
            }
    }
    if (keyPress >= 37 && keyPress <= 40) {shipMove();}
}

/**
 * Ends the game by removing 
 */
const quitGame = () => {
    console.log("quitGame()");
    time = 0;
    document.getElementById('game-time-value').innerText = time;
    document.onkeydown = null;
    numStars = 0;
    gameInProgress = false;
    ufoExists = false;
    ufoCreated = false;
    
    resetGraphics();
    addStartButton();
}

/**
 * Removes all child elements of the graphics element and starts background animation
 */
const resetGraphics = () => {
    let graphicsContainer = document.querySelector('.graphics');
    while (graphicsContainer.lastElementChild) {
        graphicsContainer.removeChild(graphicsContainer.lastElementChild);
    }
    startBackgroundAnimation();
}

/**
 * Adds Start button
 */
const addStartButton = () => {
    let startButton = createElement("button", "startButton", ["start-button", "game-text"]);
    startButton.setAttribute("type", "button");
    startButton.setAttribute("onClick", "startGame()");
    startButton.innerText="Start";
    appendChildToParent(startButton, "start-button-container");
}

/**
 * Removes start button and any possible duplicates
 */
const removeStartButton = () => {
    while (document.getElementById('startButton')) {
        document.getElementById('startButton').remove();
    }
}

/**
 * Sets the value of the score.
 */

const setScore = () => {document.getElementById('game-score-value').innerText = score;}

/**
 * Tool for seting a root CSS variable's value.
 * @param {*} varName 
 * @param {*} value 
 * @param {*} valueString 
 */
const setCssRootValue = (varName, value, valueString)  => {document.documentElement.style.setProperty(`${varName}`, value + valueString);}  

/**
 * Sleeps for a given amount of milliseconds.
 * @param {*} ms 
 * @returns 
 */
const sleep = (ms) => { return new Promise(resolve => setTimeout(resolve, ms));}

/**
 * Determines the star speed.
 * @returns number used to set star speed.
 */
const getStarTime = () => {return 10 * Math.random() + 3; }

 /**
  * Determines the star X-coordinate value.
  * @returns number used to set star X position.
  */
const getStarXValue = () => { return Math.random() * (880 - (-80)) + -80;}

const randomIntFromInterval = (min, max) => {return Math.floor(Math.random() * (max - min + 1) + min);}

 /**
  * TODO: Pauses game.
  */
const pauseGame = () => {
 }
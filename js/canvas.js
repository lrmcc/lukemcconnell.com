const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d'); 

let mouse = {
    x: undefined,
    y: undefined
}


window.addEventListener('resize', function() {
    ctx.clearRect(0,0, innerWidth, innerHeight); // need to clear canvas 
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
)

window.addEventListener('click',
    function(event) {
        console.log(`click at x: ${event.x}, y: ${event.y}`);
    }
)

let objArray = [];
let maxRadius = 40;
let minRadius = 2;
let circleArray = [];
let colorArray = [
    '#C0ADC2', '#C1CACA', '#8CA9B2', '#F5BFB8', '#D47670'
];

function Text(text, x, y, fontSize) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;

    this.draw = function() {
        ctx.beginPath();
        ctx.font = `${this.fontSize}px Arial`;
        ctx.fillText(this.text, this.x,this.y);
    }

    this.update = function() {
        this.draw();
    }
}

function FillCircle(x, y, rad) {
    this.x = x;
    this.y = y;
    this.rad = rad;

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, true);
        ctx.fill();
    }

    this.update = function() {
        this.draw();
    }
}

function StrokeCircle(x, y, rad, lineWidth) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.lineWidth = lineWidth;

    this.draw = function() {
        ctx.beginPath();
        ctx.lineWidth = this.lineWidth;
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, true);
        ctx.stroke();
    }

    this.update = function() {
        this.draw();
    }
}

function RoundRect(x, y, w, h, r, lineWidth) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r;
    this.lineWidth = lineWidth;

    this.draw = function() {
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.roundRect(this.x, this.y, this.w, this.h, [r[0], r[1]]);
        ctx.stroke();
    }

    this.update = function() {
        this.draw();
    }
}

function Line(moveToX, moveToY, lineToX, lineToY, lineCap, lineWidth, strokeStyle) {
    this.moveToX = moveToX;
    this.moveToY = moveToY;
    this.lineToX = lineToX;
    this.lineToY = lineToY;
    this.lineCap = lineCap;
    this.lineWidth = lineWidth;
    this.strokeStyle = strokeStyle;

    this.draw = function() {
        ctx.beginPath();
        ctx.lineCap = this.lineCap;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
        ctx.moveTo(this.moveToX, this.moveToY);
        ctx.lineTo(this.lineToX, this.lineToY);
        ctx.stroke();
    }

    this.update = function() {
        this.draw();
    }
}

function Triangle(moveToX, moveToY, lineToX1, lineToY1, lineToX2, lineToY2, fillStyle) {
    this.moveToX = moveToX;
    this.moveToY = moveToY;
    this.lineToX1 = lineToX1;
    this.lineToY1 = lineToY1;
    this.lineToX2 = lineToX2;
    this.lineToY2 = lineToY2;
    this.fillStyle = fillStyle;

    this.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = this.fillStyle;
        ctx.moveTo(this.moveToX, this.moveToY);
        ctx.lineTo(this.lineToX1, this.lineToY1);
        ctx.lineTo(this.lineToX2, this.lineToY2);
        ctx.fill();
    }

    this.update = function() {
        this.draw();
    }
}

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        // Interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > - 50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1; 
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        this.draw();
    }
}


const init = () => {

    objArray = [];
    // Positioning, Sizing, and Alignment Setup 
    let factor = 1;
    if ((innerHeight * 0.35) + (innerWidth * 0.32) + 20 > innerHeight) {
        factor = 0.75;
    }
    let xAxis = innerWidth * 0.21;
    let yAxis = innerHeight * factor * 0.35;
    
    let width = innerWidth * 0.16;
    let height = [innerWidth * 0.15, innerWidth * 0.145, innerWidth * 0.17, innerWidth * 0.03];

    let linesRatio = 0.01;
    let lineWidth = innerWidth * linesRatio;

    let fontSize = innerWidth * 0.04;
    let devFontSize = innerWidth * 0.08;
    let aboutFontSize = innerWidth * 0.04;
    if (innerWidth > 1562.5) {
        xAxis = 400;
        width = 250;
        height = [234.375, 226.5625, 265.625, 46.875];
        lineWidth = 15.625;
        fontSize = 72;
        devFontSize = 125;
        aboutFontSize = 62.5;
    }

    let xPos = [xAxis, xAxis * 2, xAxis * 3, xAxis * 2 + (width * 0.5)];
    let yPos = [yAxis, yAxis, yAxis, yAxis + (height[1] * 1.8)];
    
    ctx.lineWidth = lineWidth;
    
    // Style Init
    let fillStyle = '#31334a';
    ctx.fillStyle = fillStyle;
    let strokeStyle = '#31334a';
    ctx.strokeStyle = strokeStyle;
    
    // Main Text
    objArray.push(new Text("Hi! I'm Luke, A Software Developer.", xAxis , innerHeight * 0.19, fontSize));

    // Dev Icon
    // Order of objects: Container, Text, Left Stand Line, Right Stand Line, Bottom Stand Line
    objArray.push(new RoundRect(xPos[0], yPos[0], width, height[0], [(width * 0.16), (width * 0.16)], lineWidth));
    objArray.push(new Text("</>", xPos[0] + (width * 0.1358), yPos[0] + (height[0] * 0.7), devFontSize));
    objArray.push(new Line(xPos[0] + (width * 0.35), yPos[0] + (height[0] * 1.0),xPos[0] + (width * 0.25), yPos[0] + (height[0] * 1.15), "round", lineWidth, strokeStyle));
    objArray.push(new Line(xPos[0] + (width * 0.65), yPos[0] + (height[0] * 1.0), xPos[0] + (width * 0.75), yPos[0] + (height[0] * 1.15), "round", lineWidth, strokeStyle));
    objArray.push(new Line(xPos[0] + (width * 0.25), yPos[0] + (height[0] * 1.15), xPos[0] + (width * 0.75), yPos[0] + (height[0] * 1.15), "round", lineWidth, strokeStyle));

    // Blog Icon
    // Order of objects: Container, First - Eighth Lines, Pencil Parts (Left, Right, Inner, Left Tip, Right Tip, Top Eraser, Btm Eraser), Speech Outline, Speech Fill
    objArray.push(new RoundRect(xPos[1], yPos[1], width, height[1], [(width * 0.04), (width * 0.16)], lineWidth));
    objArray.push(new Line(xPos[1] + (width * 0.1), yPos[1] + (height[1] * 0.15), xPos[1] + (width * 0.6), yPos[1] + (height[1] * 0.15), "round", lineWidth * 0.55, strokeStyle));
    objArray.push(new Line(xPos[1] + (width * 0.1), yPos[1] + (height[1] * 0.25), xPos[1] + (width * 0.6), yPos[1] + (height[1] * 0.25), "round", lineWidth * 0.55, strokeStyle));
    objArray.push(new Line(xPos[1] + (width * 0.1), yPos[1] + (height[1] * 0.35), xPos[1] + (width * 0.6), yPos[1] + (height[1] * 0.35), "round", lineWidth * 0.55, strokeStyle));
    objArray.push(new Line(xPos[1] + (width * 0.1), yPos[1] + (height[1] * 0.45), xPos[1] + (width * 0.6), yPos[1] + (height[1] * 0.45), "round", lineWidth * 0.55, strokeStyle));
    objArray.push(new Line(xPos[1] + (width * 0.1), yPos[1] + (height[1] * 0.55), xPos[1] + (width * 0.6), yPos[1] + (height[1] * 0.55), "round", lineWidth * 0.55, strokeStyle));
    objArray.push(new Line(xPos[1] + (width * 0.1), yPos[1] + (height[1] * 0.65), xPos[1] + (width * 0.6), yPos[1] + (height[1] * 0.65), "round", lineWidth * 0.55, strokeStyle));
    objArray.push(new Line(xPos[1] + (width * 0.1), yPos[1] + (height[1] * 0.75), xPos[1] + (width * 0.6), yPos[1] + (height[1] * 0.75), "round", lineWidth * 0.55, strokeStyle));
    objArray.push(new Line(xPos[1] + (width * 0.1), yPos[1] + (height[1] * 0.85), xPos[1] + (width * 0.45), yPos[1] + (height[1] * 0.85), "round", lineWidth * 0.55, strokeStyle));
    objArray.push(new Line(xPos[1] + (width * 0.79), yPos[1] + (height[1] * 0.14), xPos[1] + (width * 0.74), yPos[1] + (height[1] * 0.69), "butt", lineWidth * 0.55, strokeStyle));
    objArray.push(new Line(xPos[1] + (width * 0.87), yPos[1] + (height[1] * 0.15), xPos[1] + (width * 0.82), yPos[1] + (height[1] * 0.7), "butt", lineWidth * 0.55, strokeStyle));
    objArray.push(new Line(xPos[1] + (width * 0.825), yPos[1] + (height[1] * 0.22), xPos[1] + (width * 0.785), yPos[1] + (height[1] * 0.65), "butt", lineWidth * 0.1666666, strokeStyle));
    objArray.push(new Line(xPos[1] + (width * 0.74), yPos[1] + (height[1] * 0.69), xPos[1] + (width * 0.775), yPos[1] + (height[1] * 0.72), 'round', lineWidth * 0.5, strokeStyle));
    objArray.push(new Line(xPos[1] + (width * 0.82), yPos[1] + (height[1] * 0.7), xPos[1] + (width * 0.775), yPos[1] + (height[1] * 0.72), 'round', lineWidth * 0.5, strokeStyle));
    objArray.push(new Line(xPos[1] + (width * 0.79), yPos[1] + (height[1] * 0.14), xPos[1] + (width * 0.87), yPos[1] + (height[1] * 0.148), 'round', lineWidth * 0.5, strokeStyle));
    objArray.push(new Line(xPos[1] + (width * 0.785), yPos[1] + (height[1] * 0.18), xPos[1] + (width * 0.86), yPos[1] + (height[1] * 0.188), 'round', lineWidth * 0.5, strokeStyle));
    objArray.push(new Triangle(xPos[1] + (width * 0.2), yPos[1] + (height[1] * 1.2), xPos[1] + (width * 0.2), yPos[1] + (height[1] * 1.0), xPos[1] + (width * 0.5), yPos[1] + (height[1] * 1.0), fillStyle));
    fillStyle = '#d0d0d0';
    objArray.push(new Triangle(xPos[1] + (width * 0.25), yPos[1] + (height[1] * 1.1), xPos[1] + (width * 0.25), yPos[1] + (height[1] * 0.9), xPos[1] + (width * 0.55), yPos[1] + (height[1] * 0.9), fillStyle));

    // Media Icon
    // Order of objects: Container, Left Mountain, Right Mountain, Sun
    fillStyle = '#31334a';
    objArray.push(new RoundRect(xPos[2], yPos[2], width, height[2], [(width * 0.04), (width * 0.04)], lineWidth));
    objArray.push(new Triangle(xPos[2], yPos[2] + height[2], xPos[2] + (width * 0.3), yPos[2] + (height[2] * 0.35), xPos[2] + (width * 0.6), yPos[2] + height[2], fillStyle));
    objArray.push(new Triangle(xPos[2] + (width * 0.35), yPos[2] + height[2], xPos[2] + (width * 0.65), yPos[2] + (height[2] * 0.6), xPos[2] + (width * 0.95), yPos[2] + height[2], fillStyle));
    objArray.push(new FillCircle(xPos[2] + (width * 0.75), yPos[0] + (height[2] * 0.25) , (width * 0.1)));

    // About Icon
    // Order of objects: Container, Text
    objArray.push(new StrokeCircle(xPos[3], yPos[3], height[3], lineWidth * 0.6));
    objArray.push(new Text("?", xPos[3] - (height[3] * 0.35 ), yPos[3] + (height[2] * 0.085), aboutFontSize));

    for (let i = 0; i < 800; i++) {
        let radius = Math.random() * 6 + 1;
        let x = Math.random() * (innerWidth - (radius * 2)) + radius;
        let dx = (Math.random() - 0.5) * 1.1; // velocity
        let y = Math.random() * (innerHeight - (radius * 2)) + radius;
        let dy = (Math.random() - 0.5) * 1.1; // velocity
        objArray.push(new Circle(x, y, dx, dy, radius));
    }
}

// could determine number of circles based on window area
// this would keep the density of circles in relation to the available canvas size
// could set on initial and on resize.
// ex. # of circles = innerWidth * innerHeight / 100

const animate = () =>{
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight); // need to clear canvas 
    for (const element of objArray) {
        element.update();
    }
    
    //check mouse position for 
    // ctx.fillText  ('Development', x - 10, y + 160);
    // ctx.fillText("Blog", x * 2 + 50, y + 160);
    // ctx.fillText("Media", x * 3 + 30, y + 160);
    // ctx.fillText  ('About', x * 2 + 40, y * 2 + 50);
    
}


init();
animate();
// animate();
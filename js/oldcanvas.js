const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d'); 

let mouse = {
    x: undefined,
    y: undefined
}

function Icon(x, y, size, str, strX, strY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.endX = x + size;
    this.endY = y + size;
    this.str = str;
    this.strX = strX;
    this.strY = strY;
    this.toggle = false;

    this.update = function() {
        if (mouse.x > this.x && mouse.x < this.endX && mouse.y > this.y && mouse.y < this.endY) {
            if (!this.toggle) {
                this.toggle = true;
                ctx.fillText(this.str, this.strX, this.strY);
            }
            console.log(`${this.str}`);
        } else if (this.toggle) {
            this.toggle = false;
            // c.clearRect(this.x, this.y, this.endX, this.endY);
            ctx.clearRect(0,0, innerWidth, innerHeight);
            init();
        }
    }
    
}

let iconObjs = []

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
        console.log(`x: ${event.x}, y: ${event.y}`);
    }
)

const init = () => {
    let x = innerWidth * 0.22;
    let y = innerHeight * 0.35;

    ctx.fillStyle = '#31334a';

    ctx.font = "50px Arial";
    ctx.fillText("Hi! I'm Luke, A Software Developer.", x , y * 0.4);

    ctx.font = "30px Arial";

    // about  = 68 x 69 icons = 250 x 250 
    // div ratio is / 1.6 or mult is .625
    let iconsSrc = ['dev.png', 'blog.png', 'media.png', 'about.png'];
    let str = ['Development', 'Blog', 'Media', 'About'];
    let strX = [x - 10, x * 2 + 50, x * 3 + 30, x * 2 + 40];
    let strY = [y + 160, y + 160, y + 160, y * 2 + 50];
    let iconsSize = [250, 250, 250, 69];
    let iconsX = [x, x * 2, x * 3, x * 2 + 60];
    let iconsY = [y, y, y, y * 2];
    let ratio = 0.625
    iconObjs = []

    for(let i = 0; i < iconsSrc.length; i++) {
        let icon = new Image();
        iconObjs.push(new Icon(iconsX[i], iconsY[i], iconsSize[i] * ratio, str[i], strX[i], strY[i]));
        icon.onload = function() {
            ctx.drawImage(this, iconObjs[i].x, iconObjs[i].y, iconObjs[i].size, iconObjs[i].size);
            ctx.textBaseline = 'top';
        };
        icon.src = `images/icons_31334a/${iconsSrc[i]}`;
        console.log(iconObjs[i]);
    }
    

    // c.fillText  ('Development', x - 10, y + 160);
    
    // c.fillText("Blog", x * 2 + 50, y + 160);
    

    // c.fillText("Media", x * 3 + 30, y + 160);
   

    // c.fillText  ('About', x * 2 + 40, y * 2 + 50);



}

function animate() {
    iconObjs.forEach(iconObj => {
        iconObj.update();
    });
    ctx.clearRect(0,0, innerWidth, innerHeight); // need to clear canvas 
    init();
    // for (const element of circleArray) {
    //     element.update();
    // }
    //check mouse position
    requestAnimationFrame(animate);
}


init();
animate();

// Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300,100);
// c.lineTo(400,300);
// c.strokeStyle = '#fa34a3';
// c.stroke();



// let arcR = 30;
// let startAngle = 0.0; // radians
// let endAngle = Math.PI * 2;
// let drawCounterClockwise = false;
// Arc / Circle
// for (let i = 0; i < 20; i++) {
//     let arcX = Math.random() * window.innerWidth;
//     let arcY = Math.random() * window.innerHeight;
//     let val1 = Math.floor(Math.random() * 255);
//     let val2 = Math.floor(Math.random() * 255);
//     let val3 = Math.floor(Math.random() * 255);
//     let val4 = Math.random();
//     c.beginPath(); // prevents connecting to previous
//     c.arc(arcX, arcY, arcR, startAngle, endAngle, drawCounterClockwise);
//     c.strokeStyle = `rgba(${val1}, ${val2},${val3}, ${val4})`;
//     c.stroke();
// }

// let maxRadius = 40;
// let minRadius = 2;
// let circleArray = [];
// let colorArray = [
//     '#C0ADC2', '#C1CACA', '#8CA9B2', '#F5BFB8', '#31334A'
// ];

// window.addEventListener('mousemove',
//     function(event) {
//         mouse.x = event.x;
//         mouse.y = event.y;
//     }
// )
// window.addEventListener('resize', function() {
//     c.clearRect(0,0, innerWidth, innerHeight); // need to clear canvas 
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     init();
// })

// could determine number of circles based on window area
// this would keep the density of circles in relation to the available canvas size
// could set on initial and on resize.
// ex. # of circles = innerWidth * innerHeight / 100

// function Circle(x, y, dx, dy, radius) {
//     this.x = x;
//     this.y = y;
//     this.dx = dx;
//     this.dy = dy;
//     this.radius = radius;
//     this.minRadius = radius;
//     this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

//     this.draw = function() {
//         c.beginPath(); // prevents connecting to previous
//         c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//         //c.strokeStyle = `blue`;
//         //c.stroke();
//         c.fillStyle = this.color;
//         c.fill();
//     }

//     this.update = function() {
//         if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
//             this.dx = -this.dx;
//         }
//         if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
//             this.dy = -this.dy;
//         }
    
//         this.x += this.dx;
//         this.y += this.dy;

//         //interactivity
//         if (mouse.x - this.x < 50 && mouse.x - this.x > - 50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
//             if (this.radius < maxRadius) {
//                 this.radius += 1; 
//             }
//         } else if (this.radius > this.minRadius) {
//             this.radius -= 1;
//         }
//         this.draw();
//     }
// }

// function init() {
//     circleArray = [];

//     for (let i = 0; i < 800; i++) {
//         let radius = Math.random() * 6 + 1;
//         let x = Math.random() * (innerWidth - (radius * 2)) + radius;
//         let dx = (Math.random() - 0.5) * 1.1; // velocity
//         let y = Math.random() * (innerHeight - (radius * 2)) + radius;
//         let dy = (Math.random() - 0.5) * 1.1; // velocity
//         circleArray.push(new Circle(x, y, dx, dy, radius));
//     }
// }


// function animate() {
//     requestAnimationFrame(animate);
//     c.clearRect(0,0, innerWidth, innerHeight); // need to clear canvas 
//     for (const element of circleArray) {
//         element.update();
//     }
// }

// init();
// animate();

// Setup 
ctx.fillStyle = 'rgba(49, 51, 74, 0.8)';
ctx.strokeStyle = 'rgba(49, 51, 74, 0.9)';

ctx.lineWidth = 5;

// Icon containers
ctx.beginPath();
ctx.roundRect(50, 50, 250, 250, [10, 40]);
ctx.stroke();

ctx.beginPath();
ctx.roundRect(350, 50, 250, 250, [10, 40]);
ctx.stroke();

ctx.beginPath();
ctx.roundRect(650, 50, 250, 250, [10, 40]);
ctx.stroke();

// Media
ctx.beginPath();
ctx.moveTo(70, 298);
ctx.lineTo(120, 150);
ctx.lineTo(210, 298);
ctx.fill();

ctx.beginPath();
ctx.moveTo(120, 298);
ctx.lineTo(200, 190);
ctx.lineTo(280, 298);
ctx.fill();


ctx.beginPath();
ctx.fillStyle = 'rgba(49, 51, 74, 1)';
ctx.arc(240, 110, 20, 0, Math.PI * 2, true); // Outer circle
ctx.moveTo(110, 75);
ctx.fill();

// Dev
ctx.font = '128px arial';
ctx.fillText('</>', 380, 220);

// Blog
ctx.beginPath();
ctx.lineCap = 'round';
ctx.lineWidth = 8;
ctx.moveTo(680, 100);
ctx.lineTo(780, 100);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(680, 120);
ctx.lineTo(780, 120);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(680, 140);
ctx.lineTo(780, 140);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(680, 160);
ctx.lineTo(780, 160);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(680, 180);
ctx.lineTo(780, 180);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(680, 200);
ctx.lineTo(780, 200);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(680, 220);
ctx.lineTo(750, 220);
ctx.stroke();

//Pencil setup

// left side pencil
ctx.beginPath();
ctx.strokeStyle = 'rgba(49, 51, 74, 1)';
ctx.lineWidth = 7;
ctx.lineCap = 'butt';
ctx.moveTo(820, 98);
ctx.lineTo(800, 218);
ctx.stroke();

// right side pencil
ctx.beginPath();
ctx.lineWidth = 7;
ctx.moveTo(840, 100);
ctx.lineTo(820, 220);
ctx.stroke();

//Inner line left
ctx.beginPath();
ctx.lineWidth = 2;
ctx.moveTo(824, 118);
ctx.lineTo(808, 210);
ctx.stroke();

//Inner line right
ctx.beginPath();
ctx.lineWidth = 2;
ctx.moveTo(830, 119);
ctx.lineTo(814, 211);
ctx.stroke();


//left side tip
ctx.beginPath();
ctx.moveTo(800, 219);
ctx.lineTo(808, 228);
ctx.lineWidth = 6;
ctx.lineCap = 'round';
ctx.stroke();

//left side tip
ctx.beginPath();
ctx.moveTo(820, 220);
ctx.lineTo(810, 230);
ctx.stroke();

//actual tip
ctx.beginPath();
ctx.moveTo(810, 226);
ctx.lineTo(810, 230);
ctx.stroke();

//top erase
ctx.beginPath();
ctx.moveTo(820, 98);
ctx.lineTo(839, 101);
ctx.stroke();

//bottom erase
ctx.beginPath();
ctx.moveTo(820, 110);
ctx.lineTo(836, 112);
ctx.stroke();
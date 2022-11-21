// Canvas Objects include:
// 1. Rectangles
// 2. Lines
// 3. Arcs / Circles
// 4. Bezier Curves
// 5. Images
// 6. Text

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d'); 
c.font = "30px Arial";
function init() {
    let x = innerWidth * 0.22;
    let y = innerHeight * 0.4;

    c.fillStyle = '#31334a';

    c.font = "50px Arial";
    c.fillText("Hi! I'm Luke A Software Developer.", x , y * 0.5);

    c.font = "30px Arial";
    let devIcon = new Image();
    devIcon.src = 'https://lukemcconnell.net/images/icons_31334a/dev.png';
    devIcon.onload = function(){
        c.drawImage(this, x, y, this.width / 1.6, this.height / 1.6);
        c.textBaseline = 'top';
        c.fillText  ('Development', x, y + 150);
    };

    let blogIcon = new Image();
    blogIcon.src = 'https://lukemcconnell.net/images/icons_31334a/blog.png';
    blogIcon.onload = function(){
        c.drawImage(this, x * 2, y, this.width / 1.6, this.height / 1.6);
        c.textBaseline = 'top';
        c.fillText("Blog", x * 2, y + 150);
    };

    let mediaIcon = new Image();
    mediaIcon.src = 'https://lukemcconnell.net/images/icons_31334a/media.png';
    mediaIcon.onload = function(){
        c.drawImage(this, x * 3, y, this.width / 1.6, this.height / 1.6);
        c.textBaseline = 'top';
        c.fillText("Media", x * 3 , y + 150);
    };

    let aboutIcon = new Image();
    aboutIcon.src = 'https://lukemcconnell.net/images/icons_31334a/about.png';
    aboutIcon.onload = function(){
        c.drawImage(this, x * 2, y * 2, this.width / 1.6, this.height / 1.6);
        c.textBaseline = 'top';
        c.fillText  ('About', x * 2, y * 2 +100);
    };

}



init();



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

let mouse = {
    x: undefined,
    y: undefined
}

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
window.addEventListener('resize', function() {
    c.clearRect(0,0, innerWidth, innerHeight); // need to clear canvas 
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

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
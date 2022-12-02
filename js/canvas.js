window.mobileAndTabletCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};
let mobileOrTablet = window.mobileAndTabletCheck();



const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d'); 

// let sigFont = new FontFace(
//     "Comforter Brush",
//     "url('https://fonts.googleapis.com/css2?family=Cabin&family=Comforter+Brush&display=swap')"
//   );
  
//   sigFont.load().then((font) => {
//     document.fonts.add(font);
//     console.log("Font loaded");
//     ctx.font = "30px Comforter Brush";
//     ctx.fillText("Luke", 0, 30);
// });

// var f = new FontFace('Comforter Brush', "url('https://fonts.googleapis.com/css2?family=Comforter+Brush&display=swap')");

// f.load().then(function(font) {

//   // Ready to use the font in a canvas context
//   console.log('font ready');

//   // Add font on the html page
//   document.fonts.add(font);

//   ctx.font = '48px Font name';
//   ctx.strokeText('Hello world', 100, 100);

// });

let objArray = [];
let xAxis;
let yAxis;
let xPos = [];
let yPos = [];
let iconWidth;
let iconHeight = [];
let fontSize;
let devFontSize;
let lineWidth;
let maxRadius = 40;
let maxSize = 40;
let minRadius = 2;
let circleArray = [];
let fillStyle;
let strokeStyle;
let colorArray = [
    '#C0ADC2', '#93c7c7', '#9691c2', '#97b1dd', '#ce9490'
];
let brightColorArray = [
    '#f7f752', '#fbbf19', '#f75252', '#dbbd25', '#fff708', '#ff9c08', '#f7ff08'
];

let sunColorArray = [
    'rgb(247, 82, 82)', 'rgb(247, 82, 82)', '#f7d352', '#f7bd52', '#f79c52', '#f77b52', '#f75252'
];

// let sunColorArray = [
//   '#f75252', '#f77b52', '#f79c52', '#f7bd52', '#f7d352', '#f7e152', '#f7f252'
// ];

let gradient = ctx.createLinearGradient(0, 0, 170, 0);
gradient.addColorStop("0", "magenta");
gradient.addColorStop("0.5" ,"blue");
gradient.addColorStop("1.0", "red");

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
        console.log("time: " + Date.now());
    }
)

function Text(text, x, y, fontSize, fillStyle, font='Arial') {
    this.text = text;
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.fillStyle = fillStyle;
    this.font = font;

    this.draw = function() {
        ctx.beginPath();
        ctx.font = `${this.fontSize}px ${this.font}`;
        ctx.fillStyle = this.fillStyle;
        ctx.fillText(this.text, this.x,this.y);
    }

    this.update = function() {
        this.draw();
    }
}

function FillCircle(x, y, rad, fillStyle) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.fillStyle = fillStyle;

    this.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = this.fillStyle;
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

function Fuji(moveToX, moveToY, lineToX, lineToY, lineCap, lineWidth, strokeStyle) {
    this.moveToX = moveToX;
    this.moveToY = moveToY;
    this.lineToX = lineToX;
    this.lineToY = lineToY;
    this.lineCap = lineCap;
    this.lineWidth = lineWidth;
    this.strokeStyle = strokeStyle;
  
    this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.lineToX - iconWidth*0.022, this.lineToY - iconHeight[2]*0.01, iconWidth*0.27, iconHeight[2]*0.3);
        ctx.fillStyle = "#d0d0d0";
        ctx.fill();
        ctx.beginPath();
        ctx.lineCap = this.lineCap;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
        ctx.moveTo(this.moveToX, this.moveToY);
        ctx.quadraticCurveTo(this.moveToX + (iconWidth * 0.25), this.moveToY - (iconHeight[2] * 0.15), this.lineToX, this.lineToY);
        ctx.lineTo(this.lineToX + (iconWidth * 0.25), this.lineToY);
        ctx.quadraticCurveTo(this.moveToX + (iconWidth * 0.6), this.moveToY - (iconHeight[2] * 0.15), this.lineToX + (iconWidth * 0.6), this.moveToY);
        ctx.moveTo(this.lineToX, this.lineToY + (iconHeight[2] * 0.1));
        ctx.lineTo(this.lineToX + (iconHeight[2] * 0.05), this.lineToY + (iconHeight[2] * 0.15));
        ctx.lineTo(this.lineToX + (iconHeight[2] * 0.1), this.lineToY + (iconHeight[2] * 0.1));
        ctx.lineTo(this.lineToX + (iconHeight[2] * 0.15), this.lineToY + (iconHeight[2] * 0.15));
        ctx.lineTo(this.lineToX + (iconHeight[2] * 0.2), this.lineToY + (iconHeight[2] * 0.1));
        ctx.lineTo(this.lineToX + (iconHeight[2] * 0.25), this.lineToY + (iconHeight[2] * 0.15));
        ctx.stroke();
    }
  
    this.update = function() {
        this.draw();
    }
 }

 function Sun(x, y, offset, radius, minRadius) {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.endX = x + offset;
    this.endY = y - offset;
    this.dx = 0.025;
    this.dy = -0.025;
    this.radius = radius;
    this.maxRadius = radius;
    this.minRadius = minRadius;
    //this.dr = ((this.radius + this.minRadius) / 2110);
    this.dr = ((this.radius + this.minRadius) / 4220);
    this.dcolor = 1;
    this.fillStyle = 'rgb(247, 82, 82)';
    this.green = 82;
    this.minGreen = 82;
    this.maxGreen = 247;
    this.timer = Date.now();

    this.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = this.fillStyle;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
    }

    this.update = function() {
        this.draw();

        if (Date.now() - this.timer > 112) {
            if (this.dx > 0 && this.green < this.maxGreen) {
                this.fillStyle = `rgb(247, ${++this.green}, 82)`;
            } 
            if (this.dx < 0 && this.green > this.minGreen) {
                this.fillStyle = `rgb(247, ${--this.green}, 82)`;
            } 
            this.timer = Date.now();
        }

        if (this.x < this.startX || this.x  > this.endX) {
            this.dx = - this.dx;
            this.dy = - this.dy;
            
        }
        if (this.radius < this.minRadius || this.radius > this.maxRadius) {
            this.dr = - this.dr;
            
        }
    
        this.x += this.dx;
        this.y += this.dy;
        this.radius -= this.dr;

            // if (Date.now() - this.timer > 1000) { // change color
            // if (this.x < this.maxX)
            // this.fillStyle = brightColorArray[Math.floor(Math.random() * brightColorArray.length)];
            // this.timer = Date.now();
        
    }
}

 function Star(x, y, size, lineWidth) {
    this.x = x;
    this.y = y;
    this.size = size;
    // this.lineWidth = lineWidth
    this.timer = Date.now();
    this.fillStyle = brightColorArray[Math.floor(Math.random() * brightColorArray.length)];
    this.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = this.fillStyle;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + (this.size * 0.375), this.y);
        ctx.lineTo(this.x + (this.size * 0.5), this.y - (this.size * 0.3125));
        ctx.lineTo(this.x + (this.size * 0.625), this.y);
        ctx.lineTo(this.x + (this.size * 1.0), this.y);
        ctx.lineTo(this.x + (this.size * 0.7), this.y + (this.size * 0.25));
        ctx.lineTo(this.x + (this.size * 0.9), this.y + (this.size * 0.625));
        ctx.lineTo(this.x + (this.size * 0.5), this.y + (this.size * 0.375));
        ctx.lineTo(this.x + (this.size * 0.125), this.y + (this.size * 0.625));
        ctx.lineTo(this.x + (this.size * 0.3), this.y + (this.size * 0.25));
        ctx.lineTo(this.x, this.y);
        ctx.fill();
    }
  
    this.update = function() {
        this.draw();
        if (Date.now() - this.timer > 100) {
            this.fillStyle = brightColorArray[Math.floor(Math.random() * brightColorArray.length)];
            this.timer = Date.now();
        }
    }
 }
 

 function BlogLines(moveToX, moveToY, lineCap, lineWidth, strokeStyle) {
    this.moveToX = moveToX;
    this.moveToY = moveToY;
    this.lineCap = lineCap;
    this.lineWidth = lineWidth;
    this.strokeStyle = strokeStyle;

    this.draw = function() {
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineCap = this.lineCap; 
        ctx.lineWidth = this.lineWidth;
        let moveXFactor = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];
        let moveYFactor = [0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85];
        let lineXFactor = [0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.45];
        let lineYFactor = [0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85];
        ctx.beginPath();
        for (let i = 0; i < moveXFactor.length; i++) {
            ctx.moveTo(xPos[1] + (iconWidth * moveXFactor[i]), yPos[1] + (iconHeight[1] * moveYFactor[i]));
            ctx.lineTo(xPos[1] + (iconWidth * lineXFactor[i]), yPos[1] + (iconHeight[1] * lineYFactor[i]));    
        }
        ctx.stroke();
    }

    this.update = function() {
        this.draw();
    }
}

function Pencil(moveToX, moveToY, lineWidth, strokeStyle) {
    this.moveToX = moveToX;
    this.moveToY = moveToY;
    this.lineWidth = lineWidth;
    this.strokeStyle = strokeStyle;
    let moveXFactor = [0.79, 0.87, 0.74, 0.82, 0.79, 0.785];
    let moveYFactor = [0.14, 0.15, 0.69, 0.7, 0.14, 0.18];
    let lineXFactor = [0.74, 0.82, 0.775, 0.775, 0.87, 0.86];
    let lineYFactor = [0.69, 0.7, 0.72, 0.72, 0.148, 0.188];
    let lineCaps = ["butt", "butt", "round", "round", "round", "round"];
    let lineWidthFactor = [0.55, 0.55, 0.5, 0.5, 0.5, 0.5];

    this.draw = function() {

        // Inner Wide Yellow Line
        ctx.beginPath();
        ctx.strokeStyle = brightColorArray[1];
        ctx.lineCap = "butt";
        ctx.lineWidth = lineWidth * 0.8;
        ctx.moveTo(xPos[1] + (iconWidth * 0.825), yPos[1] + (iconHeight[1] * 0.18));
        ctx.lineTo(xPos[1] + (iconWidth * 0.785), yPos[1] + (iconHeight[1] * 0.68));
        ctx.stroke();

        // Structure
        ctx.strokeStyle = this.strokeStyle;
        ctx.beginPath();
        for (let i = 0; i < moveXFactor.length; i++) {
            ctx.lineCap = lineCaps[i];
            ctx.lineWidth = lineWidth * lineWidthFactor[i];
            ctx.moveTo(xPos[1] + (iconWidth * moveXFactor[i]), yPos[1] + (iconHeight[1] * moveYFactor[i]));
            ctx.lineTo(xPos[1] + (iconWidth * lineXFactor[i]), yPos[1] + (iconHeight[1] * lineYFactor[i]));
        }
        ctx.stroke();

        // Inner Thin Middle Line
        ctx.beginPath();
        ctx.lineCap = "butt";
        ctx.lineWidth = lineWidth * 0.1666666;
        ctx.moveTo(xPos[1] + (iconWidth * 0.825), yPos[1] + (iconHeight[1] * 0.22));
        ctx.lineTo(xPos[1] + (iconWidth * 0.785), yPos[1] + (iconHeight[1] * 0.65));
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

function Bit(x, y, dx, dy, bit, size) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.bit = bit; 
    this.size = size;
    this.minSize = size;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        ctx.beginPath();
        ctx.font = `${this.size}px Arial`;
        ctx.fillStyle = this.color;
        ctx.fillText(this.bit, this.x,this.y);
    }

    this.update = function() {
        if (this.x + this.size > innerWidth || this.x - this.size < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.size > innerHeight || this.y - this.size < 0) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 50 && mouse.x - this.x > - 50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.size < maxSize) {
                this.sizes += 1; 
            }
        } else if (this.size > this.minSize) {
            this.size -= 1;
        }
        this.draw();
    }
}




const init = () => {

    objArray = [];
    // for (let i = 0; i < 100; i++) {
    //     let size = Math.random() * 20 + 1;
    //     let x = Math.random() * (innerWidth - (size * 2)) + size;
    //     let dx = (Math.random() - 0.5) * 1.1; // velocity
    //     let y = Math.random() * (innerHeight - (size * 2)) + size;
    //     let dy = (Math.random() - 0.5) * 1.1; // velocity
    //     let alpha = ["01100001", "01100010", "01100011", "01100100", "01100101", "01100110", "01100111", "01101000", "01101001", "01101010",
    //                     "01101011", "01101100", "01101101", "01101110", "01101111", "01110000", "01110001", "01110010", "01110011", "01110100",
    //                     "01110101", "01110110", "01110111", "01111000", "01111001", "01111010"]
    //     let texts = ["Java", "C#", "Python", "OOP", "C++", "JavaScript", "HTML", "CSS", "API", "Frameworks", // 10
    //                     "Libraries", "Modules", "Design Patterns", "Spring", ".NET", "Anaconda", "Static", "Dynamic", "Multi-Threaded", "Containers", // 20
    //                     "Jenkins", "Docker", "TDD", "TCP/IP", "Agile", "Scrum", "Open Source", "Build Pipeline", "DevOps", "DevSecOps", // 30
    //                     "RegEx", "Algorithms", "Data Structures", "PowerShell", "Command Line", "Terminal", "Gradle", "Linux", "MacOS", "Windows", // 40
    //                     "Jira", "Backlog", "Azure", "AWS", "Virtual Machines", "Database Servers", "SQL", "Git", "Build Tools", "Source Control", // 50
    //                     "NoSQL", "iOS", "Android", "Unit Testing", "Stand-up Meeting", "Dev Environment", "ASCII", "01001000", "01001111", "01001110", "01010010"]; // 59
    //     let choice = texts[Math.floor(Math.random() * 61)];
    //     objArray.push(new Bit(x, y, dx, dy, choice, size));
    // }

    // Style Init
    ctx.lineWidth = lineWidth;
    fillStyle = "#31334a";
    ctx.fillStyle = fillStyle;
    strokeStyle = "#31334a";
    ctx.strokeStyle = strokeStyle;

    // Positioning, Sizing, and Alignment Setup 
    xAxis = innerWidth * 0.21; // This always adjust
    yAxis = innerHeight * 0.35; //adjust to a limit
    
    // Sizing
    iconWidth = innerWidth * 0.16;
    iconHeight = [innerWidth * 0.15, innerWidth * 0.145, innerWidth * 0.17, innerWidth * 0.02];
    lineWidth = innerWidth * 0.01;
    xPos = [xAxis, xAxis * 2, xAxis * 3, xAxis * 2 + (iconWidth * 0.5)];
    yPos = [yAxis, yAxis, yAxis, yAxis + (iconHeight[1] * 2)];

    fontSize = innerWidth * 0.04;
    devFontSize = fontSize * 2;

    contentSizing();

    // Main Text
    if (!mobileOrTablet) {
        drawIntroText();
    }

    drawDevIcon();

    drawBlogIcon();

    drawMediaIcon();

    drawAboutIcon();
}

const contentSizing = () => {
    if (mobileOrTablet) {
        iconWidth = 125;
        iconHeight = [117.1875, 113.28125, 132.8125, 15.625];
        lineWidth = 7.8125;
        fontSize = 32;
        devFontSize = 62.5;
        xPos = [xAxis * 2, xAxis * 2, xAxis * 2, xAxis * 2 + (iconWidth * 0.5)];
        yPos = [yAxis * 0.3, yAxis * 1.0, yAxis * 1.7, yAxis * 2.6];
        if (innerWidth < 420) {
            iconWidth = 112.5;
            iconHeight = [105.46875, 101.953125, 119.53125, 14.0625];
            lineWidth = 7.03125;
            fontSize = 28.8;
            devFontSize = 56.25;
            xPos = [xAxis * 1.7, xAxis * 1.7, xAxis * 1.7, xAxis * 1.7 + (iconWidth * 0.5)];
            yPos = [yAxis * 0.3, yAxis * 1.05, yAxis * 1.8, yAxis * 2.6];
        }
        drawMobileText();
    }

    if (innerWidth < 1562 && innerWidth > 765 && innerHeight < 800 ) {
        xPos = [xAxis, xAxis * 2, xAxis * 3, xAxis * 4 + (iconWidth * 0.5)];
        yPos = [yAxis, yAxis, yAxis, yAxis + (iconHeight[1] * 0.6)];
    }
    if (innerWidth > 1562) {
        iconWidth = 250;
        iconHeight = [234.375, 226.5625, 265.625, 31.25];
        lineWidth = 15.625;
        fontSize = 64;
        devFontSize = 125;
        xPos = [xAxis, xAxis * 2, xAxis * 3, xAxis * 2 + (iconWidth * 0.5)];
        yPos = [yAxis, yAxis, yAxis, yAxis + (iconHeight[1] * 1.85)];
        if (innerHeight < 800) {
            yPos = [yAxis, yAxis, yAxis, yAxis + (iconHeight[1] * 1.7)];
        }
        if (innerHeight < 700) {
            xPos = [xAxis, xAxis * 2, xAxis * 3, xAxis * 4 + (iconWidth * 0.5)];
            yPos = [yAxis, yAxis, yAxis, yAxis + (iconHeight[1] * 0.6)];
        }
    }
    if (innerWidth > 1100 && innerHeight < 540) {
        iconWidth = 187.5;
        iconHeight = [175.78, 169.92, 199.22, 23.4375];
        lineWidth = 11.71875;
        fontSize = 48;
        devFontSize = 93.75;
        xPos = [xAxis, xAxis * 2, xAxis * 3, xAxis * 4 + (iconWidth * 0.5)];
        yPos = [yAxis, yAxis, yAxis, yAxis + (iconHeight[1] * 0.6)];
    }
}

const drawIntroText = () => {
    objArray.push(new Text("Hello, I'm Luke, a ", xPos[0]  - (iconWidth * 0.7), yAxis * 0.2, fontSize * 0.7, fillStyle,"Cabin Sketch"));
    objArray.push(new Text("Software Engineer", xPos[1] - (iconWidth * 1.2), yAxis * 0.55, fontSize*1.6, fillStyle, "Cabin Sketch"))
    objArray.push(new Text("living in Japan.", xPos[2]  + (iconWidth * 0.2), yAxis * 0.8, fontSize * 0.7, fillStyle,"Cabin Sketch"));
    objArray.push(new Text("© 2022 Luke McConnell", innerWidth - (fontSize * 3.8), innerHeight - (fontSize * 0.1), fontSize * 0.3, "#bcc2d1"));
}

const drawMobileText = () => {
        objArray.push(new Text("Luke McConnell: ", xPos[1] - (fontSize * 4.1), yAxis * 0.08, fontSize * 0.6, fillStyle, "Cabin Sketch"));
        objArray.push(new Text("Software Engineer", xPos[1] - (fontSize * 2.1), yAxis * 0.2, fontSize * 1.2, fillStyle, "Cabin Sketch"));
        objArray.push(new Text("Dev", xPos[0] + (iconWidth * 0.25), yPos[0] + (iconHeight[0] * 1.45), fontSize, fillStyle, "Cabin Sketch"));
        objArray.push(new Text("Blog", xPos[1] + (iconWidth * 0.25), yPos[1] + (iconHeight[1] * 1.4), fontSize, fillStyle, "Cabin Sketch"));
        objArray.push(new Text("Media", xPos[2] + (iconWidth * 0.2), yPos[2] + (iconHeight[2] * 1.3), fontSize, fillStyle, "Cabin Sketch"));
        objArray.push(new Text("About", xPos[3] - (iconWidth * 0.27), yPos[3] + (iconHeight[3] * 2.6), fontSize * 0.8, fillStyle, "Cabin Sketch"));
}

const drawDevIcon = () => {
    // Order of objects: Container, Text, Left Stand Line, Right Stand Line, Bottom Stand Line, stars
    objArray.push(new RoundRect(xPos[0], yPos[0], iconWidth, iconHeight[0], [(iconWidth * 0.16), (iconWidth * 0.16)], lineWidth));
    objArray.push(new Text("</>", xPos[0] + (iconWidth * 0.1358), yPos[0] + (iconHeight[0] * 0.7), devFontSize, fillStyle));
    objArray.push(new Line(xPos[0] + (iconWidth * 0.35), yPos[0] + (iconHeight[0] * 1.0),xPos[0] + (iconWidth * 0.25), yPos[0] + (iconHeight[0] * 1.15), "round", lineWidth, strokeStyle));
    objArray.push(new Line(xPos[0] + (iconWidth * 0.65), yPos[0] + (iconHeight[0] * 1.0), xPos[0] + (iconWidth * 0.75), yPos[0] + (iconHeight[0] * 1.15), "round", lineWidth, strokeStyle));
    objArray.push(new Line(xPos[0] + (iconWidth * 0.25), yPos[0] + (iconHeight[0] * 1.15), xPos[0] + (iconWidth * 0.75), yPos[0] + (iconHeight[0] * 1.15), "round", lineWidth, strokeStyle));
    starXFactor = [0.1, 0.3333, 0.5666, 0.8, 0.1, 0.3333, 0.5666, 0.8, 0.1, 0.1, 0.8, 0.8];
    starYFactor = [0.12, 0.12, 0.12, 0.12, 0.85, 0.85, 0.85, 0.85, 0.32, 0.64, 0.32, 0.64];
    for (let i = 0; i < starXFactor.length; i++) {
        objArray.push(new Star(xPos[0] + (iconWidth * starXFactor[i]), yPos[0] + (iconHeight[0] * starYFactor[i]), iconWidth * 0.1));
    }
}

const drawBlogIcon = () => {
    // Order of objects: Container, First - Eighth Lines, Pencil, Speech Outline, Speech Fill
    objArray.push(new RoundRect(xPos[1], yPos[1], iconWidth, iconHeight[1], [(iconWidth * 0.04), (iconWidth * 0.16)], lineWidth));
    objArray.push(new BlogLines(xPos[1], yPos[1], "round", lineWidth * 0.55, strokeStyle));
    objArray.push(new Pencil(xPos[1], yPos[1], lineWidth, strokeStyle));
    objArray.push(new Triangle(xPos[1] + (iconWidth * 0.2), yPos[1] + (iconHeight[1] * 1.2), xPos[1] + (iconWidth * 0.2), yPos[1] + (iconHeight[1] * 1.0), xPos[1] + (iconWidth * 0.5), yPos[1] + (iconHeight[1] * 1.0), fillStyle));
    objArray.push(new Triangle(xPos[1] + (iconWidth * 0.25), yPos[1] + (iconHeight[1] * 1.1), xPos[1] + (iconWidth * 0.25), yPos[1] + (iconHeight[1] * 0.9), xPos[1] + (iconWidth * 0.55), yPos[1] + (iconHeight[1] * 0.9), "#d0d0d0"));
}

const drawMediaIcon = () => {
    // Order of objects: Container, Fuji, Sun
    objArray.push(new Sun(xPos[2] + (iconWidth * 0.425), yPos[2] + (iconHeight[2] * 0.5), (iconWidth * 0.4), (iconWidth * 0.2), (iconWidth * 0.06)));
    //objArray.push(new Sun(xPos[2] + (iconWidth * 0.425), yPos[2] + (iconHeight[2] * 0.5), (iconWidth * 0.2)));
    objArray.push(new RoundRect(xPos[2], yPos[2], iconWidth, iconHeight[2], [(iconWidth * 0.04), (iconWidth * 0.04)], lineWidth));
    objArray.push(new Fuji(xPos[2], yPos[2] + iconHeight[2], xPos[2] + (iconWidth * 0.3), yPos[2] + (iconHeight[2] * 0.5), "round", lineWidth * 0.7, strokeStyle));
}
const drawAboutIcon = () => {
    // Order of objects: Container, Text
    objArray.push(new StrokeCircle(xPos[3], yPos[3], iconHeight[3], lineWidth * 0.5));
    objArray.push(new Text("?", xPos[3] - (iconHeight[3] * 0.54 ), yPos[3] + (iconHeight[3] * 0.7), fontSize, fillStyle));
}

const mouseOverIcon = () => {
    let text = ""; 
    let lineAdj = lineWidth * 0.5;
    for (let i = 0; i < 4; i ++) {
        let iconXStart = xPos[i] - lineAdj;
        let iconXEnd = xPos[i] + iconWidth + lineAdj;
        let iconYStart = yPos[i] - lineAdj;
        let iconYEnd = yPos[i] + iconHeight[i] + lineAdj;
        let textX = xPos[i] + (iconWidth * 0.3);
        let textY = yPos[1] + (iconHeight[0] * 1.45);
        let fSize = fontSize;
        switch (i) {
            case 0:
                text = 'Dev'; // animate </> or >: or 🖥️ or 💻 or 🌐 or 🧑‍💻 or ⚙️ or 💾 related
                break;
            case 1:
                text = 'Blog';
                textX = xPos[i] + (iconWidth * 0.28); // animate ... or 🗏 or 📝 or 📃 or 🖊️related
                break;
            case 2:
                text = 'Media';
                textX = xPos[i] + (iconWidth * 0.2); // animate [ ◉¯] or 🎥 related
                break;
            case 3:
                text = 'About';
                iconXStart = xPos[i] - iconHeight[i] - (lineAdj * 0.5);
                iconXEnd = xPos[i] + iconHeight[i] + (lineAdj * 0.5);
                iconYStart = yPos[i] - iconHeight[i]- (lineAdj * 0.5);
                iconYEnd = yPos[i] + iconHeight[i] + (lineAdj * 0.5);
                textX = xPos[i] - (iconHeight[i] * 1.4);
                textY = yPos[i] + (iconHeight[i] * 2);
                fSize = fontSize * 0.5;
                break;
            default:
                break;
        }
            if (mouse.x > iconXStart && mouse.x < iconXEnd && mouse.y > iconYStart && mouse.y < iconYEnd) {
            console.log(text);
            ctx.beginPath();
            ctx.font = `${fSize}px Cabin Sketch`;
            ctx.fillText(text, textX, textY);
        }
    }
}

const animate = () =>{
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight); 
    for (const element of objArray) {
        element.update();
    }
    if (!mobileOrTablet) {
        mouseOverIcon();
    }
}

init();
animate();
window.mobileAndTabletCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

// REFACTOR so each item created needs only to be passed
// any x and y coordinate and sizing, 
// and doesn't need references to any global structures or entities.
// Consider using browser local storage to hold global locations vs in js

// Uncle Bob: "Fewer parameters is better!" ==> refactor to remove parameters when possible.

// remove indentation when possible. instead of nesting things in huge if statements, 
// start with if (condition != something) return;
// that way the code that follows can be unindented.

// Consider creating an object that holds canvas size and needed reference points.
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth; // actual html element adjust
canvas.height = window.innerHeight;// actual html element adjust

const ctx = canvas.getContext('2d');

const isMobile = window.mobileAndTabletCheck(); 

const page = {
    objects: [], // This will be an array of all objects and icons. In animate(), foreach e, e.update() called.
    xPos: undefined,
    yPos: undefined,
    xFactor: 0.21,
    yFactor: 0.35,
    fontSize: undefined,
    // devFontSize: undefined,
    minRadius: 2,
    maxRadius: 40,
    maxSize: 40,
    iconWidth: undefined,
    iconHeight: undefined,
    lineWidth: undefined,
    style: undefined // page default styles.
}

let grid = {
    xAxis: undefined, // reference x-axis
    yAxis: undefined  // reference y-axis
}

let object = {
    components: undefined, // all objects that make up a particular icon. Setup .update() so .update() called for all components.
    xPos: undefined,
    yPos: undefined,
    width: undefined,
    height: undefined,
    factor: undefined,
    style: undefined
}

let component = {
    xPos: undefined,
    yPos: undefined,
    width: undefined,
    height: undefined,
    factor: undefined,
}

let style = {
    fontSize: undefined,
    // devFontSize: undefined,
    lineWidth: undefined,
    fillStyle: undefined,
    fillText: undefined,
    strokeStyle: undefined
}

let mouse = {
    x: undefined,
    y: undefined
}

let brightColorArray = [
    '#f7f752', '#fbbf19', '#f75252', '#dbbd25', '#fff708', '#ff9c08', '#f7ff08'
];

window.addEventListener('resize', function() {
    ctx.clearRect(0,0, innerWidth, innerHeight); // need to clear canvas 
    canvas.width = window.innerWidth; // actual html element adjust
    canvas.height = window.innerHeight; // actual html element adjust
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

function init() {
    page.objects.length = 0;
    initGrid();
    initStyle();
    initSizing();
    if (!isMobile) {drawIntroText();}
    drawDevIcon();
    drawBlogIcon();
    drawMediaIcon();
    drawAboutIcon();
}

function initGrid() {
    grid.xAxis = innerWidth * 0.21; // This always adjust
    grid.yAxis = innerHeight * 0.35; //adjust to a limit
}

function initStyle() {
    style.strokeStyle = "#31334a";
    style.fillStyle = "#31334a";
}

function initSizing() {
    page.iconWidth = innerWidth * 0.16;
    page.iconHeight = [innerWidth * 0.15, innerWidth * 0.145, innerWidth * 0.17, innerWidth * 0.02];
    page.lineWidth = innerWidth * 0.01;
    page.xPos = [grid.xAxis, grid.xAxis * 2, grid.xAxis * 3, grid.xAxis * 2 + (page.iconWidth * 0.5)];
    page.yPos = [grid.yAxis, grid.yAxis, grid.yAxis, grid.yAxis + (page.iconHeight[1] * 2)];
    page.fontSize = innerWidth * 0.04;
    //page.devFontSize = page.fontSize * 2;
    adjustSizingByWindow();
}

const adjustSizingByWindow = () => {
    if (isMobile) mobileContentSizing();

    if (innerWidth < 1562 && innerWidth > 765 && innerHeight < 800 ) {
        page.xPos = [grid.xAxis, grid.xAxis * 2, grid.xAxis * 3, grid.xAxis * 4 + (page.iconWidth * 0.5)];
        page.yPos = [grid.yAxis, grid.yAxis, grid.yAxis, grid.yAxis + (page.iconHeight[1] * 0.6)];
    }

    if (innerWidth > 1562) {
        page.iconWidth = 250;
        page.iconHeight = [234.375, 226.5625, 265.625, 31.25];
        page.lineWidth = 15.625;
        page.fontSize = 64;
        // page.devFontSize = 125;
        page.xPos = [grid.xAxis, grid.xAxis * 2, grid.xAxis * 3, grid.xAxis * 2 + (page.iconWidth * 0.5)];
        page.yPos = [grid.yAxis, grid.yAxis, grid.yAxis, grid.yAxis + (page.iconHeight[1] * 1.85)];
        if (innerHeight < 800) {
            page.yPos = [grid.yAxis, grid.yAxis, grid.yAxis, grid.yAxis + (page.iconHeight[1] * 1.7)];
        }
        if (innerHeight < 700) {
            page.xPos = [grid.xAxis, grid.xAxis * 2, grid.xAxis * 3, grid.xAxis * 4 + (page.iconWidth * 0.5)];
            page.yPos = [grid.yAxis, grid.yAxis, grid.yAxis, grid.yAxis + (page.iconHeight[1] * 0.6)];
        }
    }

    if (innerWidth > 1100 && innerHeight < 540) {
        page.iconWidth = 187.5;
        page.iconHeight = [175.78, 169.92, 199.22, 23.4375];
        page.lineWidth = 11.71875;
        page.fontSize = 48;
        // page.devFontSize = 93.75;
        page.xPos = [grid.xAxis, grid.xAxis * 2, grid.xAxis * 3, grid.xAxis * 4 + (page.iconWidth * 0.5)];
        page.yPos = [grid.yAxis, grid.yAxis, grid.yAxis, grid.yAxis + (page.iconHeight[1] * 0.6)];
    }
}

const mobileContentSizing = () => {
    page.iconWidth = 125;
    page.iconHeight = [117.1875, 113.28125, 132.8125, 15.625];
    page.lineWidth = 7.8125;
    page.fontSize = 32;
    // page.devFontSize = 62.5;
    page.xPos = [grid.xAxis * 2, grid.xAxis * 2, grid.xAxis * 2, grid.xAxis * 2 + (page.iconWidth * 0.5)];
    page.yPos = [grid.yAxis * 0.3, grid.yAxis * 1.0, grid.yAxis * 1.7, grid.yAxis * 2.6];
    if (innerWidth < 420) {
        page.iconWidth = 112.5;
        page.iconHeight = [105.46875, 101.953125, 119.53125, 14.0625];
        page.lineWidth = 7.03125;
        page.fontSize = 28.8;
        // page.devFontSize = 56.25;
        page.xPos = [grid.xAxis * 1.7, grid.xAxis * 1.7, grid.xAxis * 1.7, grid.xAxis * 1.7 + (page.iconWidth * 0.5)];
        page.yPos = [grid.yAxis * 0.3, grid.yAxis * 1.05, grid.yAxis * 1.8, grid.yAxis * 2.6];
    }
    drawMobileText();
}

const drawIntroText = () => {
    page.objects.push(new Text("Hello, I'm Luke, a ", page.xPos[0]  - (page.iconWidth * 0.7), grid.yAxis * 0.2, 0.7));
    page.objects.push(new Text("Software Engineer", page.xPos[1] - (page.iconWidth * 1.2), grid.yAxis * 0.55, 1.6))
    page.objects.push(new Text("living in Japan.", page.xPos[2]  + (page.iconWidth * 0.2), grid.yAxis * 0.8, 0.7));
    page.objects.push(new Text("© 2022 Luke McConnell", innerWidth - (page.fontSize * 3.8), innerHeight - (page.fontSize * 0.1), 0.3));
}

const drawMobileText = () => {
    page.objects.push(new Text("Luke McConnell: ", page.xPos[1] - (page.fontSize * 4.1), grid.yAxis * 0.08, 0.6));
    page.objects.push(new Text("Software Engineer", page.xPos[1] - (page.fontSize * 2.1), grid.yAxis * 0.2, 1.2));
    page.objects.push(new Text("Dev", page.xPos[0] + (page.iconWidth * 0.25), page.yPos[0] + (page.iconHeight[0] * 1.45), 1));
    page.objects.push(new Text("Blog", page.xPos[1] + (page.iconWidth * 0.25), page.yPos[1] + (page.iconHeight[1] * 1.4), 1));
    page.objects.push(new Text("Media", page.xPos[2] + (page.iconWidth * 0.2), page.yPos[2] + (page.iconHeight[2] * 1.3), 1));
    page.objects.push(new Text("About", page.xPos[3] - (page.iconWidth * 0.27), page.yPos[3] + (page.iconHeight[3] * 2.6), 0.8));
}

const drawDevIcon = () => {
    // Order of objects: Container, Text, Left Stand Line, Right Stand Line, Bottom Stand Line, stars
    page.objects.push(new RoundRect(page.xPos[0], page.yPos[0], page.iconWidth, page.iconHeight[0], [(page.iconWidth * 0.16), (page.iconWidth * 0.16)]));
    page.objects.push(new Text("</>", page.xPos[0] + (page.iconWidth * 0.1358), page.yPos[0] + (page.iconHeight[0] * 0.7), 2, "Arial"));
    page.objects.push(new Line(page.xPos[0] + (page.iconWidth * 0.35), page.yPos[0] + (page.iconHeight[0] * 1.0), page.xPos[0] + (page.iconWidth * 0.25), page.yPos[0] + (page.iconHeight[0] * 1.15), "round", page.lineWidth, page.strokeStyle));
    page.objects.push(new Line(page.xPos[0] + (page.iconWidth * 0.65), page.yPos[0] + (page.iconHeight[0] * 1.0), page.xPos[0] + (page.iconWidth * 0.75), page.yPos[0] + (page.iconHeight[0] * 1.15), "round", page.lineWidth, page.strokeStyle));
    page.objects.push(new Line(page.xPos[0] + (page.iconWidth * 0.25), page.yPos[0] + (page.iconHeight[0] * 1.15), page.xPos[0] + (page.iconWidth * 0.75), page.yPos[0] + (page.iconHeight[0] * 1.15), "round", page.lineWidth, page.strokeStyle));
    starXFactor = [0.1, 0.3333, 0.5666, 0.8, 0.1, 0.3333, 0.5666, 0.8, 0.1, 0.1, 0.8, 0.8];
    starYFactor = [0.12, 0.12, 0.12, 0.12, 0.85, 0.85, 0.85, 0.85, 0.32, 0.64, 0.32, 0.64];
    for (let i = 0; i < starXFactor.length; i++) {
        page.objects.push(new Star(page.xPos[0] + (page.iconWidth * starXFactor[i]), page.yPos[0] + (page.iconHeight[0] * starYFactor[i]), page.iconWidth * 0.1));
    }
}

const drawBlogIcon = () => {
    // Order of objects: Container, First - Eighth Lines, Pencil, Speech Outline, Speech Fill
    page.objects.push(new SpeechBubble(page.xPos[1], page.yPos[1] + (0.1 * page.iconHeight[1]), page.iconWidth, page.iconHeight[1]));
    //page.objects.push(new RoundRect(page.xPos[1], page.yPos[1], page.iconWidth, page.iconHeight[1], [(page.iconWidth * 0.04), (page.iconWidth * 0.16)]));
    page.objects.push(new BlogLines(page.xPos[1], page.yPos[1], page.lineWidth * 0.55));
    page.objects.push(new Pencil(page.xPos[1], page.yPos[1], page.lineWidth, page.strokeStyle));
    //page.objects.push(new Triangle(page.xPos[1] + (page.iconWidth * 0.2), page.yPos[1] + (page.iconHeight[1] * 1.2), page.xPos[1] + (page.iconWidth * 0.2), page.yPos[1] + (page.iconHeight[1] * 1.0), page.xPos[1] + (page.iconWidth * 0.5), page.yPos[1] + (page.iconHeight[1] * 1.0), style.fillStyle));
    //page.objects.push(new Triangle(page.xPos[1] + (page.iconWidth * 0.25), page.yPos[1] + (page.iconHeight[1] * 1.1), page.xPos[1] + (page.iconWidth * 0.25), page.yPos[1] + (page.iconHeight[1] * 0.9), page.xPos[1] + (page.iconWidth * 0.55), page.yPos[1] + (page.iconHeight[1] * 0.9), "#d0d0d0"));
}

const drawMediaIcon = () => {
    // Order of objects: Container, Fuji, Sun
    page.objects.push(new Sun(page.xPos[2] + (page.iconWidth * 0.425), page.yPos[2] + (page.iconHeight[2] * 0.5), (page.iconWidth * 0.4), (page.iconWidth * 0.2), (page.iconWidth * 0.06)));
    page.objects.push(new RoundRect(page.xPos[2], page.yPos[2], page.iconWidth, page.iconHeight[2], [(page.iconWidth * 0.04), (page.iconWidth * 0.04)]));
    page.objects.push(new Fuji(page.xPos[2], page.yPos[2] + page.iconHeight[2], page.xPos[2] + (page.iconWidth * 0.3), page.yPos[2] + (page.iconHeight[2] * 0.5)));
}
const drawAboutIcon = () => {
    // Order of objects: Container, Text
    page.objects.push(new StrokeCircle(page.xPos[3], page.yPos[3], page.iconHeight[3], page.lineWidth * 0.5));
    page.objects.push(new Text("?", page.xPos[3] - (page.iconHeight[3] * 0.54 ), page.yPos[3] + (page.iconHeight[3] * 0.7), 1, "Arial"));
}

const mouseOverIcon = () => {
    let text = ""; 
    let lineAdj = page.lineWidth * 0.5;
    for (let i = 0; i < 4; i ++) {
        let iconXStart = page.xPos[i] - lineAdj;
        let iconXEnd = page.xPos[i] + page.iconWidth + lineAdj;
        let iconYStart = page.yPos[i] - lineAdj;
        let iconYEnd = page.yPos[i] + page.iconHeight[i] + lineAdj;
        let textX = page.xPos[i] + (page.iconWidth * 0.3);
        let textY = page.yPos[1] + (page.iconHeight[0] * 1.45);
        let fSize = page.fontSize;
        switch (i) {
            case 0:
                text = 'Dev'; // animate </> or >: or 🖥️ or 💻 or 🌐 or 🧑‍💻 or ⚙️ or 💾 related
                break;
            case 1:
                text = 'Blog';
                textX = page.xPos[i] + (page.iconWidth * 0.28); // animate ... or 🗏 or 📝 or 📃 or 🖊️related
                break;
            case 2:
                text = 'Media';
                textX = page.xPos[i] + (page.iconWidth * 0.2); // animate [ ◉¯] or 🎥 related
                break;
            case 3:
                text = 'About';
                iconXStart = page.xPos[i] - page.iconHeight[i] - (lineAdj * 0.5);
                iconXEnd = page.xPos[i] + page.iconHeight[i] + (lineAdj * 0.5);
                iconYStart = page.yPos[i] - page.iconHeight[i]- (lineAdj * 0.5);
                iconYEnd = page.yPos[i] + page.iconHeight[i] + (lineAdj * 0.5);
                textX = page.xPos[i] - (page.iconHeight[i] * 1.4);
                textY = page.yPos[i] + (page.iconHeight[i] * 2);
                fSize = page.fontSize * 0.5;
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
    for (const element of page.objects) {
        element.update();
    }
    if (!isMobile) {
        mouseOverIcon();
    }
}

init();
animate();

function Text(text, x, y, fontFactor, font="Cabin Sketch") {
    this.text = text;
    this.x = x;
    this.y = y;
    this.fontSize = page.fontSize * fontFactor;
    this.font = font;
    
    this.draw = function() {
        ctx.beginPath();
        ctx.font = `${this.fontSize}px ${this.font}`;
        ctx.fillStyle = style.fillStyle;
        ctx.fillText(this.text, this.x,this.y);
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

function RoundRect(x, y, w, h, r) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r;

    this.draw = function() {
        ctx.beginPath();
        ctx.strokeStyle = '#31334a';
        ctx.lineWidth = page.lineWidth;
        ctx.roundRect(this.x, this.y, this.w, this.h, [r[0], r[1]]);
        ctx.stroke();
    }

    this.update = function() {
        this.draw();
    }
}

function SpeechBubble(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  
    this.draw = function() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x, this.y - (0.1 * page.iconWidth),          // top left corner
            this.x + (0.1 * page.iconWidth), 
            this.y - (0.1 * page.iconWidth), 
            this.x + (0.1 * page.iconWidth), 
            this.y - (0.1 * page.iconWidth));                              
        ctx.lineTo(this.x + (0.8 * this.w), this.y - (0.115 * this.h));     // top line
        ctx.bezierCurveTo(this.x + (0.8 * this.w),                          // top right corner
            this.y - (0.115 * this.h), this.x + (1.0 * this.w), 
            this.y - (0.115 * this.h), this.x + (1.0 * this.w), 
            this.y + (0.115 * this.h));                                     
        ctx.lineTo(this.x + (1.0 * this.w), this.y + (0.70 * this.h));      // right line
        ctx.bezierCurveTo(this.x + (1.0 * this.w),                          // bottom right corner
            this.y + (0.85 * this.h), this.x + (0.9 * this.w), 
            this.y + (0.85 * this.h), this.x + (0.9 * this.w), 
            this.y + (0.85 * this.h));                                      
        ctx.lineTo(this.x + (0.5 * this.w), this.y + (0.85 * this.h));      // bottom line -> right side
        ctx.lineTo(this.x + (0.3 * this.w), this.y + (1.025 * this.h));     // right side speech line
        ctx.lineTo(this.x + (0.2 * this.w), this.y + (0.85 * this.h));      // right side speech line
        ctx.lineTo(this.x + (0.1 * this.w), this.y + (0.85 * this.h));      // bottom line -> left side
        ctx.bezierCurveTo(this.x + (0.1 * this.w),                          // bottom left corner
            this.y + (0.85 * this.h), this.x, 
            this.y + (0.85 * this.h), this.x, 
            this.y + (0.75 * this.h));                                      
        ctx.lineTo(this.x, this.y);                                         // left side line
        ctx.stroke();
    }

    this.update = function() {
        this.draw();
    }
}

function Fuji(moveToX, moveToY, lineToX, lineToY) {
    this.moveToX = moveToX;
    this.moveToY = moveToY;
    this.lineToX = lineToX;
    this.lineToY = lineToY;
    
    this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.lineToX - page.iconWidth*0.022, this.lineToY - page.iconHeight[2]*0.01, page.iconWidth*0.29, page.iconHeight[2]*0.19);
        ctx.fillStyle = "#d0d0d0";
        ctx.fill();
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineWidth = page.lineWidth * 0.7;
        ctx.strokeStyle = page.strokeStyle;
        ctx.moveTo(this.moveToX, this.moveToY);
        ctx.quadraticCurveTo(this.moveToX + (page.iconWidth * 0.25), this.moveToY - (page.iconHeight[2] * 0.15), this.lineToX, this.lineToY);
        ctx.lineTo(this.lineToX + (page.iconWidth * 0.25), this.lineToY);
        ctx.quadraticCurveTo(this.moveToX + (page.iconWidth * 0.6), this.moveToY - (page.iconHeight[2] * 0.15), this.lineToX + (page.iconWidth * 0.6), this.moveToY);
        ctx.moveTo(this.lineToX - (page.iconHeight[2] * 0.02), this.lineToY + (page.iconHeight[2] * 0.16));
        ctx.lineTo(this.lineToX + (page.iconHeight[2] * 0.04), this.lineToY + (page.iconHeight[2] * 0.2));
        ctx.lineTo(this.lineToX + (page.iconHeight[2] * 0.09), this.lineToY + (page.iconHeight[2] * 0.16));
        ctx.lineTo(this.lineToX + (page.iconHeight[2] * 0.15), this.lineToY + (page.iconHeight[2] * 0.2));
        ctx.lineTo(this.lineToX + (page.iconHeight[2] * 0.20), this.lineToY + (page.iconHeight[2] * 0.16));
        ctx.lineTo(this.lineToX + (page.iconHeight[2] * 0.27), this.lineToY + (page.iconHeight[2] * 0.2));
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
    this.dr = -((this.radius + this.minRadius) / (page.iconWidth * 29.75));
    this.dcolor = 1;
    this.fillStyle = 'rgb(247, 82, 82)';
    this.green = 82;
    this.minGreen = 82;
    this.maxGreen = 247;
    this.total = Date.now();
    this.timer = Date.now();

    this.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = this.fillStyle;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
    }

    this.update = function() {
        this.draw();

        if (Date.now() - this.timer > (page.iconWidth * 0.5)) {
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
            console.log("Direction change at : " + (Date.now() - this.total));
            console.log("this.green : " + (this.green));
        }
        if (this.radius < this.minRadius || this.radius > this.maxRadius) {
            this.dr = - this.dr;
            console.log("Radius change at : " + (Date.now() - this.total));
            console.log("this.green : " + (this.green));
        }
    
        this.x += this.dx;
        this.y += this.dy;
        this.radius += this.dr;
    }
}

function Star(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
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

function BlogLines(moveToX, moveToY, lineWidth) {
    this.moveToX = moveToX;
    this.moveToY = moveToY;
    this.lineWidth = lineWidth;

    let moveXFactor = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];
    let moveYFactor = [0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85];
    let lineXFactor = [0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.45];
    let lineYFactor = [0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85];
    
    this.draw = function() {
        ctx.strokeStyle = page.strokeStyle;
        ctx.strokeStyle = '#31334a';
        ctx.lineCap = "round"; 
        ctx.lineWidth = this.lineWidth;
        
        ctx.beginPath();
        for (let i = 0; i < moveXFactor.length; i++) {
            ctx.moveTo(page.xPos[1] + (page.iconWidth * moveXFactor[i]), page.yPos[1] + (page.iconHeight[1] * moveYFactor[i]));
            ctx.lineTo(page.xPos[1] + (page.iconWidth * lineXFactor[i]), page.yPos[1] + (page.iconHeight[1] * lineYFactor[i]));    
        }
        ctx.stroke();
    }

    this.update = function() {
        this.draw();
    }
}

function Pencil(moveToX, moveToY) {
    this.moveToX = moveToX;
    this.moveToY = moveToY;
    //this.lineWidth = page.lineWidth;
    this.strokeStyle = page.strokeStyle;
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
        // ctx.strokeStyle = '#324339';
        // ctx.strokeStyle = '#557361';
        // ctx.strokeStyle = '#60806d';
        // ctx.strokeStyle = '#678a75';
        ctx.lineCap = "butt";
        ctx.lineWidth = page.lineWidth * 0.9;
        ctx.moveTo(page.xPos[1] + (page.iconWidth * 0.825), page.yPos[1] + (page.iconHeight[1] * 0.18));
        ctx.lineTo(page.xPos[1] + (page.iconWidth * 0.78), page.yPos[1] + (page.iconHeight[1] * 0.68));
        ctx.stroke();

        // Structure
        ctx.strokeStyle = page.strokeStyle;
        ctx.beginPath();
        for (let i = 0; i < moveXFactor.length; i++) {
            ctx.lineCap = lineCaps[i];
            ctx.lineWidth = page.lineWidth * 0.9 * lineWidthFactor[i];
            ctx.moveTo(page.xPos[1] + (page.iconWidth * moveXFactor[i]), page.yPos[1] + (page.iconHeight[1] * moveYFactor[i]));
            ctx.lineTo(page.xPos[1] + (page.iconWidth * lineXFactor[i]), page.yPos[1] + (page.iconHeight[1] * lineYFactor[i]));
        }
        ctx.stroke();

        // Inner Thin Middle Line
        ctx.beginPath();
        ctx.lineCap = "butt";
        ctx.lineWidth = page.lineWidth * 0.1666666;
        ctx.moveTo(page.xPos[1] + (page.iconWidth * 0.825), page.yPos[1] + (page.iconHeight[1] * 0.22));
        ctx.lineTo(page.xPos[1] + (page.iconWidth * 0.785), page.yPos[1] + (page.iconHeight[1] * 0.65));
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
    
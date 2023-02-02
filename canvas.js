var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d');
// //rects
// context.fillStyle = 'rgba(255,0,0,0.5)';
// context.fillRect(100,100,100,100);
// context.fillStyle = 'rgba(0,0,255,0.5)';
// context.fillRect(400,100,100,100);
// context.fillStyle = 'rgba(0,255,255,0.5)';
// context.fillRect(100,400,100,100);

// //line
// context.beginPath();
// context.moveTo(50, 300);
// context.lineTo(300, 100);
// context.lineTo(500, 200);
// context.strokeStyle = "#fa34a3"
// context.stroke();

//arc / circle
// context.beginPath();
// context.arc(300,300,30,0,Math.PI*2);
// context.strokeStyle = "blue";
// context.stroke();

// for (var i = 0; i < 30; i++){
//     var r = Math.random() * 255;
//     var g = Math.random() * 255;
//     var b = Math.random() * 255;
//     //console.log(`rgba(${r},${g},${b},1)`);
//     context.strokeStyle = `rgba(${r},${g},${b},1)`

//     var x = Math.random() * canvas.width;
//     var y = Math.random() * canvas.height;
//     context.beginPath();
//     context.arc(x, y,30,0,Math.PI*2);

//     context.stroke();
// }

var colors = [
    '#4C2C69',
    '#3A5743',
    '#7BAE7F',
    '#DCEDFF',
    '#DB324D'
]
var colorIndex = 0;

var maxRadius = 50;

var mouseX = 0;
var mouseY = 0;

window.addEventListener('mousemove', function(event){
    mouseX = event.x
    mouseY = event.y
})

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //init();
})

function Circle(x,y, xVel, yVel, radius){
    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.yVel = yVel;
    this.radius = radius;
    this.minRadius = radius;

    // var r = Math.random() * 255;
    // var g = Math.random() * 255;
    // var b = Math.random() * 255;

    var color = colors[colorIndex];

    this.draw = function(){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        //context.strokeStyle = `rgba(${r},${g},${b},1)`;
        //context.stroke();
        //context.fillStyle = `rgba(${r},${g},${b},1)`;
        context.fillStyle = color;
        context.fill();
        
    }

    this.update = function(){
        if(this.x - this.radius <= 0 || this.x + this.radius >= canvas.width ) this.xVel *= -1;
        if(this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) this.yVel *= -1;
        this.x+=this.xVel;
        this.y+=this.yVel;

        //interactivity
        if(Math.abs(this.x - mouseX) < 80 && Math.abs(this.y - mouseY) < 80){
            if(this.radius < maxRadius) this.radius++;
        } 
        else{
            if(this.radius > this.minRadius) this.radius--;
        }
    }
}

var circles = [];
var numCircles = 600

function init(){
    circles = []
    for(var i = 0; i < numCircles; i++){
        var radius = Math.random() * 5 + 5;
        var x = Math.random() * (innerWidth - (2 * radius)) + radius;
        var y = Math.random() * (innerHeight - (2 * radius)) + radius;
        var xVel = Math.random() * 4 - 2;
        var yVel = Math.random() * 4 - 2;
        circles.push(new Circle(x, y, xVel, yVel, radius));
        colorIndex += 1;
        colorIndex %= 5;
    }

}

function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0,0,canvas.width, canvas.height);

    for (var i = 0; i < circles.length; i++){     
        circles[i].draw();
        circles[i].update();
    }
    
}

init();
animate();
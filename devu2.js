var c = document.getElementById("canvas");
var ctx = c.getContext("2d");


var c1 = document.getElementById("canvas1");
var ctx1 = c1.getContext("2d");





var d = 200;
var ob = [];
for(var i=0;i<3;i++){
  ob[i] = new obstacle(100 + d)
}
var v = 0;
var x = 150;
var y = 100;
var dy = 0;
var dx = 0;
var x2 = -770 + x;
var omega = 0;
const ANGULAR_VELOCITY = 0.07;
var aVelocity = 0;



function obstacle(x) {
  this.x = x;
  this.y = canvas.height;
  this.width = 50;
  this.height = 300*Math.random();
}





function drawObstacle(a) {
  ctx.beginPath();
  ctx.moveTo(a.x,a.y);
  ctx.lineTo(a.x+a.width,a.y);
  ctx.lineTo(a.x+a.width,a.y-a.height);
  ctx.lineTo(a.x,a.y-a.height);
  ctx.closePath();
  ctx.stroke();
}




function circle(radius,x,y) {
  this.radius = radius;
  this.x=x;
  this.y=y;
  this.dx=0;
  this.dy=0;
  this.color = "white";
  this.gravity = function (){
    this.dy = this.dy + 0.5*0.98*2*2 ;
    if(canvas.height-(this.y + this.radius)<0.00000003){
      this.dy = 0;
    }
  }
}






var ball = new circle(100,x,y);
var ball1 = new circle(100,x2,y);
var balls = [25];
for(var i=0;i<25;i++){
  balls[i]= new circle(50*Math.random(),canvas.width*Math.random(),canvas.height*Math.random());
}
var rotcircle = new circle ( 10 ,ball.x,ball.y - 50 );
rotcircle.color = "black";




function drawBall(){
  ctx.beginPath();
  ctx.arc(x,y,Math.random()*100,0,2*Math.PI);
  ctx.stroke();
  ctx.closePath();
}





function drawBallObj(a){
  ctx.beginPath();
  ctx.arc(a.x,a.y,a.radius,0,2*Math.PI);
  ctx.stroke();
  ctx.fillStyle = a.color ;
  ctx.fill();
  ctx.closePath();
}





function drawBallObj1(a){
  ctx1.beginPath();
  ctx1.arc(a.x,a.y,a.radius,0,2*Math.PI);
  ctx1.stroke();
  ctx1.fillStyle = "red";
  ctx1.fill();
  ctx1.closePath();
}





function gravity(){
  dy = dy + 0.5*0.98*2*2 ;
 if(canvas.height-(y+100)<0.00003){
    dy = 0;
  }
}





function draw(){
      ctx.clearRect(0,0,756,698);
    /*  for(var i=0;i<100;i++){
        drawBall();
      }
    */

      for(var i=0;i<25;i++){
              drawBallObj(balls[i]);
              balls[i].dx = v;
          //  balls[i].gravity();
              balls[i].x += balls[i].dx;
              balls[i].y += balls[i].dy;

              if(balls[i].y + balls[i].dy + balls[i].radius > (canvas.height) || balls[i].y + balls[i].dy < balls[i].radius){
                  balls[i].dy = -balls[i].dy;
              }

              if(balls[i].x + balls[i].radius < 0){
                  balls[i].x = canvas.width + balls[i].radius;
                  balls[i].y = Math.random()*canvas.height;
              }

              if(balls[i].x - balls[i].radius > canvas.width){
                  balls[i].x = - balls[i].radius;
                  balls[i].y = Math.random()*canvas.height;
              }

  }

  drawBallObj(ball);
  drawBallObj(rotcircle);
}





function draw1(){
  ctx1.clearRect(0,0,756,698);
/*  for(var i=0;i<100;i++){
    drawBall();
  }*/
  drawBallObj1(ball1);
}





function update() {
  draw();
  draw1();
  if(ball.y+dy+100 > canvas.height || ball.y+dy<100 || ball1.y+dy+100>(canvas1.height) || ball1.y+dy<100 ){
    dy = -dy;
  }

  if(ball.x+dx<100 || ball1.x + dx + 100 > canvas1.width){
    dx = -dx;
  }

  gravity();
  ball.x += dx;
  ball.y += dy;
  ball1.x += dx;
  ball1.y += dy;
  x = ball.x;
  y = ball.y;
  omega += aVelocity;
  rotcircle.x = ball.x + 50*Math.sin(omega);
  rotcircle.y = ball.y - 50*Math.cos(omega);
  x2 = -770 + x;
  console.log(canvas.height-100-ball.y);
}



setInterval(update,15);




function handleKeyDown(e){
  console.log(e);
  switch (e.code) {
    case "ArrowDown":
            dx = 0  ;
            v = 0  ;
            aVelocity = 0  ;
      break;
    case "ArrowUp":
            dx = 0  ;
            dy = -20  ;
            v = 0  ;
            aVelocity = 0  ;
      break;
    case "ArrowRight":
            //dx = 5  ;
            aVelocity = ANGULAR_VELOCITY;
            v = -2  ;
            // omega += ANGULAR_VELOCITY  ;
      break;
    case "ArrowLeft":
            //dx = -5  ;
            v = 2  ;
            aVelocity = -ANGULAR_VELOCITY;
            // omega += -ANGULAR_VELOCITY  ;
      break;
    case "Space":
            v = -20;
            aVelocity = 0.1;

      break;
    default:
        console.log("wrong key");

  }
}

function handleKeyUp(a) {
  console.log(a);
  switch (a.code) {
    case "ArrowDown":
            dx = 0  ;
            v = 0  ;
            aVelocity = 0  ;
      break;
    case "ArrowUp":
            dx = 0  ;
            dy = 0  ;
            v = 0  ;
            aVelocity = 0  ;
      break;
    case "ArrowRight":
            //dx = 5  ;
            aVelocity = 0;
            v = 0 ;
            // omega += ANGULAR_VELOCITY  ;
      break;
    case "ArrowLeft":
            //dx = -5  ;
            v = 0  ;
            aVelocity = 0;
            // omega += -ANGULAR_VELOCITY  ;
      break;
    case "Space":
            v = 0;
            aVelocity = 0;

      break;
    default:
        //console.log("wrong key");

  }
}


window.addEventListener('keydown',handleKeyDown);
window.addEventListener('keyup',handleKeyUp);

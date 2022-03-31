const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine,world;
var bg,bgImg;
var player, shooterImg, shooter_shooting,zombieImg,zombie,bulletimg,bullet;
var bomb,bombimg,explosionimg,exp_sd;
var gamestate=0,score=0;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");

  bgImg = loadImage("assets/bg.jpeg");

  zombieImg=loadImage("assets/zombie.png");
  bulletimg=loadImage("assets/bullet-bg.png");
  bombimg=loadImage("assets/bomb-bg.png");
  explosionimg=loadImage("assets/exp-bg.png");
  exp_sd=loadSound("assets/explosion.mp3");
} 

function setup() {


  engine = Engine.create();
  world = engine.world;
  createCanvas(windowWidth,windowHeight);
  gamestate=0;


  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg);
   player.scale = 0.3;
   player.debug = true;
   player.setCollider("rectangle",0,0,300,500);



  zombieGroup= new Group();

  bulletGroup= new Group();







}

function draw() {


  background(255);
  
  Engine.update(engine);
  image(bgImg, 0, 0, width, height);
  
  if(gamestate==0){
    fill('red');
    textSize(100);
    text("Zombie Apocalypse",200,200);
    textSize(50);
    text("Press Space to begin",200,250);
 
  }

  if(gamestate==1){
    
    
  }


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  if(player.y> 0 ){
    player.y = player.y-30
  }
        
}
if(keyDown("DOWN_ARROW")||touches.length>0){
  if(player.y< height){
 player.y = player.y+30;
  }
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting);
  gamestate=1;

 
}


//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg);
}

if(keyWentDown('space')){
  bullet=createSprite(player.x+60,player.y-20);
  bullet.addImage(bulletimg);
  bullet.scale=0.1;
  bullet.debug=true;
  bullet.velocityX=10;

  bulletGroup.add(bullet);
}

if(keyWentDown('b')){
  bomb=createSprite(player.x+60,player.y-20);
  bomb.addImage(bombimg);
  bomb.scale=0.1;
  bomb.debug=true;
  bomb.velocityX=10;

  bomb.setCollider("circle",0,0,800);
}

if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){     
      
   if(zombie.isTouching(bullet)){
        zombie.destroy();
        //bullet.destroy();
        exp_sd.play();
 
        score = score+2
        } 
  
  }
}

if (bomb.isTouching(zombieGroup)){
  for(var i=0;i<zombieGroup.length;i++){     

    if(zombie.isTouching(bomb)){
         zombie.destroy();
         bomb.destroy();
         //exp_sd.play();
  
         //score = score+2
         } 
   
   }

}

    



 spawnZombie();
drawSprites();
 
}

textSize(20)
  fill("white")
//text("Bullets = " + bullets,displayWidth-210,displayHeight/2-250)
text("Score = " + score,displayWidth-200,displayHeight/2-220)


function spawnZombie(){

  if(gamestate==1 && frameCount% 150===0 ){

  zombie=createSprite(windowWidth,windowHeight-300,50,50);
  zombie.addImage(zombieImg);
  zombie.scale=0.15;
  zombie.debug= true;
  zombie.setCollider("rectangle",0,0,300,800);


  zombie.y= Math.round(random(25,height-15));

  zombie.velocityX-= 2;

  zombie.lifetime= 400;

  zombieGroup.add(zombie);
  }

}






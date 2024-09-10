var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bus,busImg;
var llama,llamaImg,llamasGroup;
var backgroundImg;
var invisibleGround;
var score=0;
var ground,groundImg

function preload(){
busImg =loadImage("Bus.png");
llamaImg = loadImage("Llama.png");
backgroundImg =loadImage("ground.jpg");

}

function setup() {
    createCanvas(700,700);
   //corredor
    bus = createSprite(50,370,20,50);
    bus.addImage("volar", busImg)
    bus.scale = 0.3

    llamasGroup = new Group();

    invisibleGround = createSprite(300,700,800,100);  
    invisibleGround.shapeColor = "#f4cbaa";

    ground = createSprite(300,700,800,100);
    ground.x = width/2
    ground.velocityX = -(6 + 3*score/100);
}  

function draw() {
   background(backgroundImg)
   textSize(20);
   fill("black")
   text("Puntuación: "+ score,400,50);
    if (gameState == PLAY){
      //aumenta la puntuacion
      score = score + Math.round(getFrameRate()/60);

      ground.velocityX = -(6 + 3*score/100);
      bus.velocityY = bus.velocityY + 0.8;
      
      spawnObstacles();

      if(( keyDown("SPACE")) && bus.y  >= 120) {
        bus.velocityY = -10;
  
      }

      bus.collide(invisibleGround);

      if(llamasGroup.isTouching(bus)){
        gameState = END
      }
}
if (gameState == END){
    bus.y = 370;
   llamasGroup.setVelocityXEach(0);
   llamasGroup.setLifetimeEach(-1);

}

drawSprites();
}
function spawnObstacles() {
    if(frameCount % 60 == 0) {
  
    llama = createSprite(600,height-95,20,30);
    llama.setCollider('circle',0,0,45)
    llama.addImage("obstsculo",llamaImg)
    llama.velocityX = -(6 + 3*score/100);
    llama.scale = 0.3;
    llama.lifetime = 300;
    
    llama.depth +=1;
    llamasGroup.add(llama);
    }
}
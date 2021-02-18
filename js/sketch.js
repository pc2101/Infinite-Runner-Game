var runner , background , obstacle , invisibleGround , runnerOver , gameover , backgroundOverImage , points
var runnerImage , backgroundImage , obstacleImage , runnerOverImage , gameoverImage , pointsImage
var PLAY = 1;
var END = 0;
var gameState = PLAY
var score = 0



function preload(){
  runnerImage = loadImage ("player.gif")
  runnerOverImage = loadImage ("nithish.png")
  backgroundImage = loadImage ("background.gif")
  obstacleImage = loadImage ("ShadowSonic.png")
  gameoverImage = loadImage ("images.png")
  backgroundOverImage = loadImage("GameoverImage.jpg")
  pointsImage = loadImage("CloudyDeliciousHagfish-size_restricted.gif")
  scoreImage = loadImage("jump.gif")
 
}

function setup() {
createCanvas (800,400)
  
  obstacleGroup = new Group();
  pointsGroup = new Group();
  
  background = createSprite (370,100,100,100)
  background.addImage(backgroundImage)
  background.scale = 1.5
 
  runner = createSprite (50,280,20,50)
  runner.addImage (runnerImage)
  runner.scale = 0.2
  
  invisibleGround = createSprite (100,330,350,20)
  invisibleGround.visible = false
      
     gameover = createSprite (400,200,20,20)
     gameover.addImage(gameoverImage)
     gameover.scale = 0.5
}

function draw() {
//background ("blue")
  
  if (gameState ===PLAY ){
    
    score = score + Math.round(getFrameRate()/60);
   gameover.visible = false;
    
    if (runner.isTouching(pointsGroup)){
    points = points + 1
    pointsGroup.destroyEach();
  }
  
    if (keyDown("space") && runner.y >= 100){
  runner.velocityY = -20
    }
      runner.velocityY = runner.velocityY +1
    spawnobstacles();
  spawnpoints();
  }
 runner.collide(invisibleGround)  
  

  

if (runner.isTouching(obstacleGroup)){
  gameState = END   
  
  //pointsGroup.destroyEach();

      obstacleGroup.setVelocityXEach(0);
    pointsGroup.setVelocityXEach(0);
  
  obstacleGroup.setLifetimeEach(-1)
  pointsGroup.setLifetimeEach(-1)
  
  //runner.velocityY = runner.velocityY +15
  gameover.visible=true;
  
  runner.velocityY = 19;
  
     runner.addImage(runnerOverImage)
     background.addImage(backgroundOverImage)
     background.scale = 4
  

  
  
}  

  reset();
  

  

  
  drawSprites();
  
  fill("white")
  text("X"+mouseX+","+"Y"+mouseY,mouseX,mouseY);
  textSize(30)
  textFont("Copperplate Gothic Bold")
  text("Score: "+ score, 500,50);
  

  
} 



function spawnobstacles (){
  if (frameCount%170 === 0)  {
  obstacle = createSprite (600,280,20,50)
  obstacle.addImage (obstacleImage)
  obstacle.scale = 0.3
  obstacle.velocityX = -6
   obstacleGroup.add(obstacle)
     obstacleGroup.setLifetimeEach(200)
  }

}

function spawnpoints(){
  if (frameCount%20 === 0){
    points = createSprite (80,280,40,40)
    points.x = Math.round(random(width-20));
    points.addImage(pointsImage)
    points.scale = 0.3
    points.velocityX = -6
   pointsGroup.add(points)
  pointsGroup.setLifetime = 200
  }
      if (runner.isTouching(pointsGroup)){
    points = points + 1
    pointsGroup.destroyEach();
  }
}

function reset (){
  if(mousePressedOver(gameover)){
    gameState = PLAY;
    
    //gameover.visible = false
    obstacleGroup.destroyEach();
    pointsGroup.destroyEach();
    runner.addImage(runnerImage)
    background.addImage(backgroundImage)
    background.scale = 1.5
    score = 0

  }
}
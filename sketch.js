var PLAY=1;
var END=0;
var gameState=1;

var sword,swordImage;
var fruit, fruit1,fruit2,fruit3,fruit4,fruitGroup;
var monster, monsterImage,enemyGroup;
var gameOverImage
var knifeSound, gameOverSound
var position

function preload(){
    
swordImage = loadImage("sword.png");
 
  fruit1 = loadImage("fruit1.png")
  fruit2 = loadImage("fruit2.png")
  fruit3 = loadImage("fruit3.png")
  fruit4 = loadImage("fruit4.png")
  
  monsterImage = loadAnimation("alien1.png","alien2.png")
  
  gameOverImage = loadImage("gameover.png")
  
  knifeSound = loadSound("knifeSwooshSound.mp3")
  
  gameOverSound = loadSound("gameover.mp3")
}
 
function setup(){
  createCanvas(600,600);
  
sword=createSprite(40,200,20,20);
 sword.addImage(swordImage);
 sword.scale = 0.7;
  
  sword.setCollider("rectangle",0,0,40,40)
  
  score=0
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
}
function draw(){
background("lightblue")
  
  if(gameState === PLAY){
  

  fruits();
  Enemy();

  sword.y=World.mouseY;
  sword.x=World.mouseX;
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score = score+2;
      knifeSound.play();
    }
    else
      {
        if(enemyGroup.isTouching(sword)){
          gameState = END
          
          enemyGroup.destroyEach();
          fruitGroup.destroyEach();
          enemyGroup.setVelocityXEach(0);
          fruitGroup.setVelocityXEach(0);
          
          sword.addImage(gameOverImage);
          sword.x = 200;
          sword.y = 200;
          
          gameOverSound.play();
        }
      }
  }
          drawSprites();
          
          text("Score: "+score,300,30)
}
function fruits(){
    if(World.frameCount%80===0){
      fruit = createSprite(400,200,20,20);
      
      if(position==1)
      {
      fruit.x = 400;
      fruit.velocityX = -(7+(score/4));
      }
      else
      {
        if(position==2){
          fruit.x = 0;
          
          fruit.velocityX = (7+(score/4));
        }
      }
      
      fruit.scale = 0.2;
      r=Math.round(random(1,4));
      if (r === 1){
        fruit.addImage(fruit1)
      }else if (r === 2){
        fruit.addImage(fruit2)
      }else if (r === 3){
      fruit.addImage(fruit3)
      }else{
        fruit.addImage(fruit4)
      }
        fruit.y=Math.round(random(50,340));
      
      fruit.velocityX = 7;
      fruit.setLifetime=100;
      
      fruitGroup.add(fruit);
      }
  }

function Enemy(){
  if(World.frameCount%200===0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}


var ghost,ghostImg;
var tower,towerImg;
var climber,climberImg,climberGroup;
var door,doorImg,doorGroup;
var gameState = "play";

function preload(){
    ghostImg = loadImage("ghost-standing.png");
    towerImg = loadImage("tower.png");
    doorImg = loadImage("door.png");
    climberImg = loadImage("climber.png");
}

function setup(){
    createCanvas(600,600);

    tower = createSprite(300,300);
    tower.addImage("tower",towerImg);
    tower.velocityY=1;

    ghost = createSprite(200,200,50,50);
    ghost.addImage("ghost",ghostImg);
    ghost.scale=0.3;
    
    climberGroup = new Group();
    doorGroup = new Group();
    invisibleBlockGroup = new Group();
}

function draw(){

    if(gameState==="play"){
        if(keyDown("space")){
            ghost.velocityY=-10;
        }
        ghost.velocityY+=0.8;
        if(keyDown("left_arrow")){
            ghost.x-=3;
        }
        if(keyDown("right_arrow")){
            ghost.x+=3;
        }
        if(tower.y>400){
            tower.y=300;
        }
        spawnObjects();
        if(climberGroup.isTouching(ghost)){
            ghost.velocityY=0;
        }
        if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
           ghost.destroy();
           doorGroup.destroyEach();
           climberGroup.destroyEach();
           invisibleBlockGroup.destroyEach();
           gameState="end";
        }
        drawSprites();
    } 
    if(gameState==="end"){
        fill("white");
        textSize(50);
        text("GAMEOVER",150,150);
    }
}

function spawnObjects(){
    if(frameCount%240===0){
        door = createSprite(200,50);
        climber = createSprite(200,10);

        door.addImage("door",doorImg);
        climber.addImage("climber",climberImg);

        var invisibleBlock = createSprite(200,15);
        invisibleBlock.width = climber.width;
        invisibleBlock.height=2;
        invisibleBlock.visible=false;

        door.x=Math.round(random(120,400));
        climber.x = door.x;
        invisibleBlock.x=door.x;
        
        door.velocityY=1;
        climber.velocityY=1;
        invisibleBlock.velocityY=1;

        door.lifetime=800;
        climber.lifetime=800;
        invisibleBlock.lifetime=800;

        doorGroup.add(door);
        climberGroup.add(climber);
        invisibleBlockGroup.add(invisibleBlock);

        ghost.depth=door.depth;
        ghost.depth+1;
        }
}
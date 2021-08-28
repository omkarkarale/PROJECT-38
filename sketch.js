var path,mainCyclist;
var player1,player2,player3;
var ob1, ob2, ob3;
var database, distanceRef, dist, maxDist, maxName; 
var pathImg,mainRacerImg1,mainRacerImg2;

var ob1Image,ob2Image,ob3Image;
var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var dw, dh;

var pinkCG, yellowCG,redCG,ob1CG,ob2CG,ob3CG;

var START =0;
var PLAY =1;
var END =2;
var gameState = START;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");

  ob1Image = loadImage("images/obstacle1.png");

  ob2Image = loadImage("images/obstacle2.png");

  ob3Image = loadImage("images/obstacle3.png")

  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadAnimation("images/opponent3.png");

  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadAnimation("images/opponent6.png");

  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadAnimation("images/opponent9.png");

  cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
	form = new Form();
	form.display();
	
	dw = displayWidth;
	dh = displayHeight-160;
//1200, 300
	createCanvas(dw,dh);
	database = firebase.database();
	// Moving background
	path=createSprite(dw/12,dh/2);
	path.addImage( pathImg);
	path.velocityX = -15;

	//creating boy running
	mainCyclist  = createSprite(dw/17,dh/2);
	mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
	mainCyclist.scale=0.13;

  hider = createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
  hider.shapeColor = "white";

	//set collider for mainCyclist
	// mainCyclist.debug = true;
	mainCyclist.setCollider("circle", 0, 0, 700)

	gameOver = createSprite(dw/2+50,dh/2);
	gameOver.addImage(gameOverImg);
	gameOver.scale = 0.8;
	gameOver.visible = false;

	pinkCG = new Group();
	yellowCG = new Group();
	redCG = new Group();
	ob1CG = new Group();
	ob2CG = new Group();
	ob3CG = new Group();

	distanceRef = database.ref('distance');
	distanceRef.on("value", (data) => {
				dist = data.val();
			});
	maxDistRef = database.ref('Max/Dist');
	maxDistRef.on("value", (data) => {
				maxDist = data.val();
			});
  maxNameRef = database.ref('Max/Name');
  maxNameRef.on("value", (data) => {
        maxName = data.val();
      });
}
function draw() {
background(0)
console.log(gameState);
textSize(20);
drawSprites();
fill(255);
text("Maximum: "+maxDist+" - "+maxName,dw-300,30);
text("Distance: "+ distance,dw-300,60);
if(gameState===PLAY){
	print(dist, maxDist);

  hider.visible=false;

   distance = distance + Math.round(getFrameRate()/50);
   database.ref('/').update({
            distance : distance
        })
   path.velocityX = -(6 + 2*distance/150);

  if(keyDown(UP_ARROW)){
    mainCyclist.y -= 15;
  }
  else if(keyDown(DOWN_ARROW)){
    mainCyclist.y += 15;
  }

   edges= createEdgeSprites();
   mainCyclist .collide(edges);

  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }

    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }

  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,6));

  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else if (select_oppPlayer == 3) {
      redCyclists();
    } else if (select_oppPlayer == 4) {
      obstacle1();
    } else if (select_oppPlayer == 5){
      obstacle2();
    } else if (select_oppPlayer == 6){
      obstacle3();
    }
  }

   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }

    else if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }

    else if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }

    else if(ob1CG.isTouching(mainCyclist)){
      gameState = END;
      ob1.velocityY = 0;
    }

    else if(ob2CG.isTouching(mainCyclist)){
      gameState = END;
      ob2.velocityY = 0;
    }

    else if(ob3CG.isTouching(mainCyclist)){
      gameState = END;
      ob3.velocityY = 0;
    } 
}
else if (gameState === END) {
    //Add code to show restart game instrution in text here
    textSize(20);
    fill(255);
    text("Reload the page to restart or press up arrow!",dw-825,dh-250)
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
	
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);

    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);

    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

    ob1CG.setVelocityXEach(0);
    ob1CG.setLifetimeEach(-1);

    ob2CG.setVelocityXEach(0);
    ob2CG.setLifetimeEach(-1);

    ob3CG.setVelocityXEach(0);
    ob3CG.setLifetimeEach(-1);
	gameOver.visible = true;
    //write condition for calling reset( )
    if(keyDown(UP_ARROW)){
      reset()
    }
}

function obstacle1(){
  ob1 =createSprite(dw-100,Math.round(random(50, dh-50)));
  ob1.scale =0.15;
  ob1.setCollider("rectangle",0,0,500,500)
  ob1.velocityX = -(6 + 2*distance/150);
  ob1.addImage(ob1Image);
  ob1.setLifetime=170;
  ob1CG.add(ob1);
}

function obstacle2(){
  ob2 =createSprite(dw-100,Math.round(random(50, dh-50)));
  ob2.scale =0.15;
  ob2.setCollider("rectangle",0,0,600,400)
  ob2.velocityX = -(6 + 2*distance/150);
  ob2.addImage(ob2Image);
  ob2.setLifetime=170;
  ob2CG.add(ob2);
}

function obstacle3(){
  ob3 =createSprite(dw-100,Math.round(random(50, dh-50)));
  ob3.scale =0.15;
  ob3.setCollider("rectangle",0,0,500,500)
  ob3.velocityX = -(6 + 2*distance/150);
  ob3.addImage(ob3Image);
  ob3.setLifetime=170;
  ob3CG.add(ob3);
}

function pinkCyclists(){
        player1 =createSprite(dw-100,Math.round(random(50, dh-50)));
        player1.scale =0.12;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
        if(gameState===END){
          player1.destroy();
        }
}

function yellowCyclists(){
        player2 =createSprite(dw-100,Math.round(random(50, dh-50)));
        player2.scale =0.12;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
        if(gameState===END){
          player2.destroy();
        }
}

function redCyclists(){
        player3 =createSprite(dw-100,Math.round(random(50, dh-50)));
        player3.scale =0.12;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
        if(gameState===END){
          player3.destroy();
        }
}

//create reset function here
function reset(){
	if(dist>=maxDist){
		database.ref('Max/').update({
            Dist : dist
      })
    database.ref('Max/').update({
            Name : form.input.value()
  })
	}
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  ob1CG.destroyEach();
  ob2CG.destroyEach();
  ob3CG.destroyEach();
  distance = 0;
 }

}

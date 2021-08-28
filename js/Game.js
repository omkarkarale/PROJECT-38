class Game {
    constructor(){};

    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value",(data)=>{
            gameState = data.val(); 
        }) 
    } 
    update(state){ 
        database.ref('/').update({
            gameState: state });
    } 

    async start(){ 
        if(gameState === 0){
            player = new Player(); 
            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount(); 
            }
            form = new Form();
            form.display(); 
        } 
        trex1 = createSprite(50, 180);
        trex2 = createSprite(55, 180);
        trex = [trex1, trex2];
    } 

    play(){
        form.hide();
        // textSize(30);
        // text("Game Start", 120, 100);
        Player.getPlayerInfo();
        if(allPlayers !== undefined){
            // var displayPosition = 130;
            var index = 0;
            var x;
            var y = 180;
            for(var plr in allPlayers){
                index += 1;
                x = displayWidth - allPlayers[plr].distance;
                cars[index - 1].x = x;
                cars[index - 1].y = y;
                if(index === player.index){
                    cars[index - 1].shapeColor = "red";
                    camera.position.x = cars[index - 1].x;
                    camera.position.y = displayHeight/2;
                }
                // if(plr === "player" + player.index)
                //     fill("red");
                // else
                //     fill(0);

                // // displayPosition += 20;
                // textSize(15);
                // text(allPlayers[plr].name + "- " + allPlayers[plr].distance, 120, displayPosition);
            }
        }
        // if(keyDown(UP_ARROW) && player.index !== null){
        //     player.distance += 50;
        //     player.update();
        // }
        drawSprites();
    }
}
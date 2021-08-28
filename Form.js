class Form {
    constructor(){
        this.button = createButton('Play');
        this.input = createInput("Name");
        this.greeting = createElement('h3');
        this.title = createElement('h2');

    }
    hide(){
        this.button.hide();
        this.input.hide();
        this.greeting.hide();
        this.title.hide();
    }
    display(){
        this.title.html("Cycle Racing Game");
        this.title.position(displayWidth/2 - 50, 0);

        this.input.position(displayWidth/2 - 40, displayHeight/2 - 80);
        this.button.position(displayWidth/2 + 30, displayHeight/2);

        this.button.mousePressed(()=>{
            this.input.hide();
            this.button.hide();
			this.title.hide();
			gameState = PLAY;
        })
    }
}

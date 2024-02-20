class Background extends Sprite {
    constructor() {
        super('background', 2400, 720, [1], null);
        this.speedX = -2;
    }

    draw() {
        super.draw();
        // const backgroundImageEndX = background.x + background.width;
        // if(backgroundImageEndX < gameModel.game.width){
        //     drawSpriteFrame(ctx, gameModel.images.background, {...background, x: background.x + background.width - 1});
        // }
    }
    
    update() {
        super.update();
        this.x = this.x < -this.width
            ? 0
            : this.x + this.speedX;
    }        
}
class Enemy extends Sprite {
    constructor(gameWidth) {
        super(80, 60, [6]);
        this.speedX = -1;
        this.gameWidth = gameWidth;
    }

    update(gameModel) {
        this.updateSprite(gameModel);
        if (this.x < -this.width) {
            this.x = this.gameWidth;
            this.speedX -= 0.5;
        } else {
            this.x = this.x + this.speedX;
        }
    }
}
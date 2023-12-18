class Enemy extends GameObject {
    constructor(x, y, width, height, speedX, speedY, spriteIndex, state, spriteCounts) {
        super(x, y, width, height, speedX, speedY, spriteIndex, state, spriteCounts);
    }

    update(gameModel) {
        this.updateSprite(gameModel);

        if (this.x < -this.width) {
            this.x = gameModel.game.width;
            this.speedX -= 0.5;
        } else {
            this.x = this.x + this.speedX;
        }
    }
}
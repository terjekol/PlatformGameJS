class Player extends Sprite {
    constructor(gameWidth, gameHeight) {
        super('player', 200, 200, [7, 9], 3);
        this.downForce = 1;
        this.y = gameHeight - this.height;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    update() {
        super.update();
        this.updateHorizontalMovement();
        // this.updateVerticalMovement(gameModel);
        // setSpeed(gameModel, this);
    }

    updateHorizontalMovement() {
        const newX = this.x + this.speedX;
        const maxX = this.gameWidth - this.width;
        this.x = clamp(newX, 0, maxX);
    }

    updateVerticalMovement(gameModel) {
        const newY = this.y + this.speedY;
        const maxY = gameModel.game.height - this.height;
        this.y = clamp(newY, 0, maxY);
        const playerIsOnGround = this.isOnGround(gameModel);
        this.speedY = playerIsOnGround ? 0 : this.speedY + this.downForce;
    }

    isOnGround(gameModel) {
        return this.y >= gameModel.game.height - this.height;
    }

    draw(){
        super.draw();
    }
}
class Player extends Sprite {
    constructor(game) {
        super(200, 200, [7, 9]);
        this.downForce = 1;
        this.y = game.height - this.height;
    }

    update(gameModel) {
        this.updateSprite(gameModel);
        this.updateHorizontalMovement(gameModel);
        this.updateVerticalMovement(gameModel);
        setSpeed(gameModel, this);
    }

    updateHorizontalMovement(gameModel) {
        const newX = this.x + this.speedX;
        const maxX = gameModel.game.width - this.width;
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
}
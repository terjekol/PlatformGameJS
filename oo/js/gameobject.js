class GameObject {
    constructor(x, y, width, height, speedX, speedY, spriteIndex, state, spriteCounts) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speedX = speedX;
        this.speedY = speedY;
        this.spriteIndex = spriteIndex;
        this.state = state;
        this.spriteCounts = spriteCounts;
        this.spriteSkipIndex = 0;
    }

    updateSprite(gameModel) {
        if (!this.spriteSkipIndex) {
            this.spriteSkipIndex = gameModel.game.spriteAnimationSkip;
        } else {
            this.spriteSkipIndex--;
            return;
        }
        const spriteCount = this.spriteCounts[this.state];
        this.spriteIndex = (this.spriteIndex + 1) % spriteCount;
    }
}
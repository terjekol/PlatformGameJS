class Sprite {
    constructor(width, height, spriteCounts) {
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.spriteIndex = 0;
        this.state = 0;
        this.spriteCounts = spriteCounts;
    }

    update(gameModel) {
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
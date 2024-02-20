class Sprite {
    constructor(imageName, width, height, spriteCounts, spriteAnimationSkip) {
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.spriteIndex = 0;
        this.state = 0;
        this.spriteCounts = spriteCounts;
        this.spriteAnimationSkip = spriteAnimationSkip;
        this.x = 0;
        this.y = 0;
        this.image = document.getElementById(imageName + 'Img');
        const canvas = document.getElementById('gameCanvas');
        this.ctx = canvas.getContext('2d');
    }

    update() {
        if (!this.spriteSkipIndex) {
            this.spriteSkipIndex = this.spriteAnimationSkip;
        } else {
            this.spriteSkipIndex--;
            return;
        }
        const spriteCount = this.spriteCounts[this.state];
        this.spriteIndex = (this.spriteIndex + 1) % spriteCount;
    }

    draw() {
        const frameY = this.state * this.height;
        const frameX = this.spriteIndex * this.width;

        this.ctx.drawImage(this.image, frameX, frameY,
            this.width, this.height, this.x, this.y,
            this.width, this.height);
    }
}


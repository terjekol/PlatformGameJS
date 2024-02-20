class Game {
    constructor() {
        this.keys = new Set();
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = 800;
        this.height = 720;
        this.isRunning = true;
        this.player = new Player(this.width, this.height);
        // this.enemy = new Enemy();
        this.background = new Background(this.width);
        this.images = {
            player: this.getImage('player'),
            enemy: this.getImage('enemy'),
            background: this.getImage('background'),
        };
    // gameModel.player.y = gameModel.game.height - gameModel.player.height;
    // gameModel.enemy.y = gameModel.game.height - gameModel.enemy.height;
    // gameModel.enemy.x = gameModel.game.width;
    }

    getImage(name) {
        return document.getElementById(name + 'Img');
    }

    run() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        window.addEventListener('keydown', e => handleKey(true, e.key, gameModel));
        window.addEventListener('keyup', e => handleKey(false, e.key, gameModel));

        const animate = () => {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.background.update();
            this.player.update();
            this.background.draw();
            this.player.draw();
            // this.enemy.update();
            // checkForCollision(gameModel, player, enemy);
            // drawEnemy(ctx, gameModel, enemy);
            // drawPlayer(ctx, gameModel, player);
            // drawScore(ctx, gameModel.game.score);
            // gameModel.game.score += 0.03;
            if (this.isRunning) {
                requestAnimationFrame(animate);
            }
        };
        animate();
    }

    // setSpeed(gameModel, player) {
    //     const keys = gameModel.keys;
    //     if (keys.has('ArrowRight')) player.speedX = 5;
    //     else if (keys.has('ArrowLeft')) player.speedX = -5;
    //     else if (keys.has('ArrowUp') && player.isOnGround(gameModel)) player.speedY = -32;
    //     else {
    //         player.speedX = 0;
    //     }
    // }

    handleKey(isKeyUp, key, gameModel) {
        if (!key.startsWith('Arrow')) return;
        const keys = this.keys;
        if (isKeyUp) keys.add(key);
        else keys.delete(key);
    }
}
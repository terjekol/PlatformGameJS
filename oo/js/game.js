class Game {
    constructor() {
        this.keys = new Set();
        // this.player = new Player(this);
        // this.enemy = new Enemy();
        this.background = new Background();
        this.images = {
            player: this.getImage('player'),
            enemy: this.getImage('enemy'),
            background: this.getImage('background'),
        };
        this.width = 800;
        this.height = 720;
        this.isRunning = true;
    // gameModel.player.y = gameModel.game.height - gameModel.player.height;
    // gameModel.enemy.y = gameModel.game.height - gameModel.enemy.height;
    // gameModel.enemy.x = gameModel.game.width;
    }

    getImage(name) {
        return document.getElementById(name + 'Img');
    }

    run() {
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = this.width;
        canvas.height = this.height;
        window.addEventListener('keydown', e => handleKey(true, e.key, gameModel));
        window.addEventListener('keyup', e => handleKey(false, e.key, gameModel));

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // this.player.update();
            // this.enemy.update();
            this.background.update();
            // checkForCollision(gameModel, player, enemy);
            drawBackground(ctx, gameModel, background);
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
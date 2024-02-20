class Game {
    constructor() {
        this.keys = new Set();
        const canvas = document.getElementById('gameCanvas');
        this.ctx = canvas.getContext('2d');
        this.width = 800;
        this.height = 720;
        this.isRunning = true;
        this.player = new Player(this.width, this.height, this.keys);
        this.enemy = new Enemy(this.width, this.height);
        this.background = new Background(this.width);
        canvas.width = this.width;
        canvas.height = this.height;
        const keyDownHandler = new KeyHandler(false, this.keys);
        const keyUpHandler = new KeyHandler(true, this.keys);
        window.addEventListener('keydown', keyDownHandler.handleKey.bind(keyDownHandler));
        window.addEventListener('keyup', keyUpHandler.handleKey.bind(keyUpHandler));
    }

    getImage(name) {
        return document.getElementById(name + 'Img');
    }

    run() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.background.update();
        this.background.draw();
        this.player.update();
        this.player.draw();
        this.enemy.update();
        this.enemy.draw();

        // checkForCollision(gameModel, player, enemy);
        // drawEnemy(ctx, gameModel, enemy);
        // drawPlayer(ctx, gameModel, player);
        // drawScore(ctx, gameModel.game.score);
        // gameModel.game.score += 0.03;
        if (this.isRunning) {
            requestAnimationFrame(this.run.bind(this));
        }
    }
}
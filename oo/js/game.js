class Game {
    constructor() {
        this.keys = new Set();
        this.player = new Player(0, gameModel.game.height - 200, 200, 200, 0, 0, 0, 0, [7, 9]);
        this.enemy = new Enemy(0, gameModel.game.height - 60, 80, 60, -1, 0, 0, 0, [6]);
        this.background = new Background(0, 0, 2400, 720, -2, 0, 0, 0, [1]);

        this.images = {
            player: this.getImage('player'),
            enemy: this.getImage('enemy'),
            background: this.getImage('background'),
        };
    // gameModel.player.y = gameModel.game.height - gameModel.player.height;
    // gameModel.enemy.y = gameModel.game.height - gameModel.enemy.height;
    // gameModel.enemy.x = gameModel.game.width;
    }

    runGame() {
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = gameModel.game.width;
        canvas.height = gameModel.game.height;
        window.addEventListener('keydown', e => handleKey(true, e.key, gameModel));
        window.addEventListener('keyup', e => handleKey(false, e.key, gameModel));


        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            player.update(gameModel);
            enemy.update(gameModel);
            background.update(gameModel);
            checkForCollision(gameModel, player, enemy);
            drawBackground(ctx, gameModel, background);
            drawEnemy(ctx, gameModel, enemy);
            drawPlayer(ctx, gameModel, player);
            drawScore(ctx, gameModel.game.score);
            gameModel.game.score += 0.03;
            if (gameModel.game.isRunning) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    setSpeed(gameModel, player) {
        const keys = gameModel.keys;
        if (keys.has('ArrowRight')) player.speedX = 5;
        else if (keys.has('ArrowLeft')) player.speedX = -5;
        else if (keys.has('ArrowUp') && player.isOnGround(gameModel)) player.speedY = -32;
        else {
            player.speedX = 0;
        }
    }

    handleKey(isKeyUp, key, gameModel) {
        if (!key.startsWith('Arrow')) return;
        const keys = gameModel.keys;
        if (isKeyUp) keys.add(key);
        else keys.delete(key);
    }
}
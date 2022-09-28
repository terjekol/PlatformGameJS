function runGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const gameModel = initGameModel();
    canvas.width = gameModel.game.width;
    canvas.height = gameModel.game.height;
    window.addEventListener('keydown', e => handleKey(true, e.key, gameModel));
    window.addEventListener('keyup', e => handleKey(false, e.key, gameModel));

    drawPlayer(ctx, gameModel);
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updatePlayer(gameModel);
        drawPlayer(ctx, gameModel);
        requestAnimationFrame(animate);
    };
    animate();
}

function initGameModel() {
    const gameModel = {
        keys: new Set(),
        game: {
            width: 800,
            height: 720,
            spriteAnimationSkip: 3,
        },
        player: {
            x: 0,
            // y: 0,
            width: 200,
            height: 200,
            speedX: 0,
            speedY: 0,
            downForce: 1,
            spriteIndex: 0,
            state: 0,
            spriteCounts: [7, 9],
        },
        images: {
            player: getImage('player'),
            enemy: getImage('enemy'),
            background: getImage('background'),
        },
    };
    gameModel.player.y = gameModel.game.height - gameModel.player.height;
    return gameModel;
}

function getImage(name){
    return document.getElementById(name + 'Img');
}
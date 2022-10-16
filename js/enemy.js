function drawEnemy(ctx, gameModel) {
    drawSpriteFrame(ctx, gameModel.images.enemy, gameModel.enemy);
}

function updateEnemy(gameModel) {
    const enemy = gameModel.enemy;
    updateSprite(gameModel, enemy);
    enemy.x = enemy.x < -enemy.width
        ? gameModel.game.width
        : enemy.x + enemy.speedX;
}


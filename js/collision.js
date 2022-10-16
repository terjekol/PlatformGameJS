function checkForCollision(gameModel) {
    const { player, enemy } = gameModel;
    const playerHitboxMargin = { left: 10, top: 20, right: 10, bottom: 20 };

    const isAboveEnemy = bottom(player) < enemy.y;
    const isBelowEnemy = player.x > bottom(enemy);
    const isToTheRightOfEnemy = player.x > right(enemy);
    const isToTheLeftOfEnemy = right(player) < enemy.x;
    const noCollision = isAboveEnemy || isBelowEnemy || isToTheLeftOfEnemy || isToTheRightOfEnemy;    
    gameModel.game.isRunning = noCollision;
}

function right(obj) {
    return obj.x + obj.width;
}

function bottom(obj) {
    return obj.y + obj.height;
}



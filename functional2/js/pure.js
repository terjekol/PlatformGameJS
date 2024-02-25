const createDrawAction = (image, x, y, mode, spriteIndex, size) => {
    if (mode === undefined) return { image, x, y };
    const frameX = spriteIndex * size;
    const frameY = mode * size;
    return { image, x, y, frameX, frameY };
}
const getDrawActions = params => {
    const background = params.state.background;
    const player = params.state.player;
    const playerSize = params.metadata.playerSpriteSize;
    const enemy = params.state.enemy;
    const enemyWidth = params.metadata.enemySpriteWidth;
    return [
        createDrawAction('background', background.x, 0),
        createDrawAction('background', background.x + params.metadata.backgroundWidth - 1, 0),
        createDrawAction('player', player.x, player.y, player.mode, player.spriteIndex, playerSize),
        createDrawAction('enemy', enemy.x, enemy.y, 0, enemy.spriteIndex, enemyWidth),
    ];
};
const updateBackground = params => {
    const background = params.state.background;
    const value = (background.x + background.speed) % params.metadata.backgroundWidth;
    return R.assocPath(['state', 'background', 'x'], value, params);
}
const updatePlayerHorizontalMovement = params => {
    const player = params.state.player;
    const newXdraft = player.x + player.speedX;
    const maxX = params.metadata.gameWidth - params.metadata.playerSpriteSize;
    const newX = R.clamp(0, maxX, newXdraft);
    return R.assocPath(['state', 'player', 'x'], newX, params);
};
const isPlayerOnGround = params => params.state.player.y >= params.metadata.playerY;
const updatePlayerVerticalMovement = params => {
    const player = params.state.player;
    const newYdraft = player.y + player.speedY;
    const maxY = params.metadata.gameHeight - params.metadata.playerSpriteSize;
    const newY = R.clamp(0, maxY, newYdraft);
    const playerIsOnGround = isPlayerOnGround(params);
    const newSpeedY = playerIsOnGround && player.speedY > 0 ? 0 : player.speedY + player.downForce;
    const tmp = R.assocPath(['state', 'player', 'speedY'], newSpeedY, params);
    return R.assocPath(['state', 'player', 'y'], newY, tmp);
};
const updatePlayerSpeedX = params =>
    R.assocPath(['state', 'player', 'speedX'], params.keys.right ? 5 : params.keys.left ? -5 : 0, params);
const updatePlayerSpeedY = params =>
    !(params.keys.up && isPlayerOnGround(params)) ? params : R.assocPath(['state', 'player', 'speedY'], -32, params);
const updatePlayerSprite = params => {
    const player = params.state.player;
    if (player.spriteSkipIndex == 3) {
        const tmp = R.assocPath(['state', 'player', 'spriteIndex'], (player.spriteIndex + 1) % 7, params);
        return R.assocPath(['state', 'player', 'spriteSkipIndex'], 0, tmp);
    } else {
        return R.assocPath(['state', 'player', 'spriteSkipIndex'], player.spriteSkipIndex + 1, params);
    }
}
const update = R.compose(updateBackground, updatePlayerSpeedX, updatePlayerSpeedY, updatePlayerHorizontalMovement, updatePlayerVerticalMovement, updatePlayerSprite);

const drawAction = (image, obj, deltaX, meta) => {
    const x = obj.x + (deltaX ?? 0);
    const y = obj.y;
    if (meta === undefined) return { image, x, y };
    const width = meta.width;
    const height = meta.height;
    const frameX = obj.spriteIndex * width;
    const frameY = (obj.mode ?? 0) * height;
    return { image, x, y, frameX, frameY, width, height };
}
const getDrawActions = params => {
    const meta = params.metadata;
    const back = params.state.background;
    return [
        drawAction('background', back),
        drawAction('background', back, meta.background.width - 1),
        drawAction('enemy', params.state.enemy, 0, meta.enemy),
        drawAction('player', params.state.player, 0, meta.player),
    ];
};
const updateBackground = params => {
    const background = params.state.background;
    const value = (background.x + background.speedX) % params.metadata.background.width;
    return R.assocPath(['state', 'background', 'x'], value, params);
}
const updatePlayerHorizontalMovement = params => {
    const player = params.state.player;
    const newXdraft = player.x + player.speedX;
    const maxX = params.metadata.gameWidth - params.metadata.player.spriteWidth;
    const newX = R.clamp(0, maxX, newXdraft);
    return R.assocPath(['state', 'player', 'x'], newX, params);
};
const isPlayerOnGround = params => params.state.player.y >= params.metadata.player.y;
const updatePlayerVerticalMovement = params => {
    const player = params.state.player;
    const newYdraft = player.y + player.speedY;
    const meta = params.metadata;
    const maxY = meta.game.height - meta.player.spriteHeight;
    const newY = R.clamp(0, maxY, newYdraft);
    const playerIsOnGround = isPlayerOnGround(params);
    const newSpeedY = playerIsOnGround && player.speedY > 0 ? 0 : player.speedY + meta.game.downForce;
    const tmp = R.assocPath(['state', 'player', 'speedY'], newSpeedY, params);
    return R.assocPath(['state', 'player', 'y'], newY, tmp);
};
const updatePlayerSpeedX = params =>
    R.assocPath(['state', 'player', 'speedX'], params.keys.right ? 5 : params.keys.left ? -5 : 0, params);
const updatePlayerSpeedY = params =>
    !(params.keys.up && isPlayerOnGround(params)) ? params : R.assocPath(['state', 'player', 'speedY'], -32, params);
const updateSprite = R.curry((objName, params) => {
    const state = params.state[objName];
    const meta = params.metadata[objName];
    if (state.spriteSkipIndex == 3) {
        const spriteIndex = (state.spriteIndex + 1) % meta.spriteCounts[state.mode];
        const tmp = R.assocPath(['state', objName, 'spriteIndex'], spriteIndex, params);
        return R.assocPath(['state', objName, 'spriteSkipIndex'], 0, tmp);
    } else {
        return R.assocPath(['state', objName, 'spriteSkipIndex'], state.spriteSkipIndex + 1, params);
    }
});
const update = R.compose(
    updateBackground,
    updatePlayerSpeedX, updatePlayerSpeedY,
    updatePlayerHorizontalMovement, updatePlayerVerticalMovement,
    updateSprite('player'), updateSprite('enemy'),
);

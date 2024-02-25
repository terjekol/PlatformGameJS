// const drawImage = R.curry(ctx.drawImage.bind(ctx));
// const drawSprite = R.curry((image, width, height, x, y, spriteIndex, playerMode) => {
//     const frameY = playerMode * height;
//     const frameX = spriteIndex * width;
//     ctx.drawImage(image, frameX, frameY,
//         width, height, x, y,
//         width, height);
// });
// const drawBackground = drawImage(images.background, R.__, 0);
// const drawPlayer = drawSprite(images.player, playerSpriteSize, playerSpriteSize, R.__, R.__, R.__, R.__);
const getDrawActions = params => {
    const background = params.state.background;
    const player = params.state.player;
    const playerSize = params.metadata.playerSpriteSize;
    const frameX = player.spriteIndex * playerSize;
    const frameY = player.playerMode * playerSize;
    return [
        { image: 'background', x: background.x, y: 0 },
        { image: 'background', x: background.x + params.metadata.backgroundWidth - 1, y: 0 },
        { image: 'player', x: player.x, y: player.y, frameX, frameY },
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
    !(params.keys.up && isPlayerOnGround(params)) ? params : R.assocPath(['state','player', 'speedY'], -32, params);
const updatePlayerSprite = params => {
    const player = params.state.player;
    if (player.spriteSkipIndex == 3) {
        const tmp = R.assocPath(['state', 'player', 'spriteIndex'], (player.spriteIndex + 1) % 7, params);
        return R.assocPath(['state', 'player', 'spriteSkipIndex'], 0, tmp);
    } else {
        return R.assocPath(['state', 'player', 'spriteSkipIndex'], player.spriteSkipIndex + 1, params);
    }
}
const update = R.compose(
    updateBackground,
    updatePlayerSpeedX,
    updatePlayerSpeedY,
    updatePlayerHorizontalMovement,
    updatePlayerVerticalMovement,
    updatePlayerSprite,
);

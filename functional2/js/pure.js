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
    return [
        { image: 'background', x: background.x, y: 0 },
        { image: 'background', x: background.x + params.metadata.backgroundWidth - 1, y: 0 },
    ];
    // drawBackground(state.background.x);
    // drawBackground(state.background.x + images.background.width - 1);
    // drawPlayer(state.player.x, state.player.y, state.player.spriteIndex, 0);
    // return state;
};
const updateBackground = params => {
    const background = params.state.background;
    const value = (background.x + background.speed) % params.metadata.backgroundWidth;
    return R.assocPath(['state', 'background', 'x'], value, params);
}
// const updatePlayerHorizontalMovement = state => {
//     const player = state.player;
//     const newXdraft = player.x + player.speedX;
//     const maxX = canvas.width - playerSpriteSize;
//     const newX = R.clamp(0, maxX, newXdraft);
//     return R.assocPath(['player', 'x'], newX, state);
// };
// const isPlayerOnGround = state => state.y >= playerY;
// const updatePlayerVerticalMovement = state => {
//     const player = state.player;
//     const newYdraft = player.y + player.speedY;
//     const maxY = canvas.height - playerSpriteSize;
//     const newY = R.clamp(0, maxY, newYdraft);
//     const playerIsOnGround = isPlayerOnGround(player);
//     const newSpeedY = playerIsOnGround && player.speedY > 0 ? 0 : player.speedY + player.downForce;
//     const tmpState = R.assocPath(['player', 'speedY'], newSpeedY, state);
//     const tmpState2 = R.assocPath(['player', 'y'], newY, tmpState);
//     return tmpState2;
// };
// const updatePlayerSpeedX = state =>
//     R.assocPath(['player', 'speedX'], mutableKeys.right ? 5 : mutableKeys.left ? -5 : 0, state);
// const updatePlayerSpeedY = state =>
//     mutableKeys.up && isPlayerOnGround(state.player) ? R.assocPath(['player', 'speedY'], -32, state) : state;
// const updatePlayerSprite = state => {
//     const player = state.player;
//     if (player.spriteSkipIndex == 3) {
//         const tmpState = R.assocPath(['player', 'spriteIndex'], (player.spriteIndex + 1) % 7, state);
//         return R.assocPath(['player', 'spriteSkipIndex'], 0, tmpState);
//     } else {
//         return R.assocPath(['player', 'spriteSkipIndex'], player.spriteSkipIndex + 1, state);
//     }
// }
const update = R.compose(
    updateBackground,
    // updatePlayerSpeedX, updatePlayerSpeedY,
    // updatePlayerHorizontalMovement, updatePlayerVerticalMovement,
    // updatePlayerSprite
);
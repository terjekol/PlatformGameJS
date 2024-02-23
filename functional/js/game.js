const init = () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 720;
    const initialState = {
        background: { x: 0, speed: -2 },
        player: { x: 0, speedX: 0, speedY: 0, spriteIndex: 0, spriteSkipIndex: 0, playerMode: 0 },
        enemy: { x: 0, speedX: -1, speedY: 0, spriteIndex: 0 },
    };
    const getImage = name => document.getElementById(name + 'Img');
    const images = ['background', 'player', 'enemy']
        .reduce((obj, name) => R.assoc(name, getImage(name), obj), {});
    const drawImage = R.curry(ctx.drawImage.bind(ctx));
    const drawSprite = R.curry((image, width, height, x, y, spriteIndex, playerMode) => {
        const frameY = playerMode * height;
        const frameX = spriteIndex * width;
        ctx.drawImage(image, frameX, frameY,
            width, height, x, y,
            width, height);
    });
    const drawBackground = drawImage(images.background, R.__, 0);
    const playerSpriteSize = 200;
    const playerY = canvas.height - playerSpriteSize;
    const drawPlayer = drawSprite(images.player, playerSpriteSize, playerSpriteSize, R.__, playerY, R.__, R.__);
    const draw = state => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        drawBackground(state.background.x);
        drawBackground(state.background.x + images.background.width - 1);
        drawPlayer(state.player.x, state.player.spriteIndex, 0);
        return state;
    };
    const updateBackground = R.curry((imageWidth, state) => ({ ...state, x: (state.x + state.speed) % imageWidth }))(images.background.width);

    const updatePlayerHorizontalMovement = state => state;
    const updatePlayerVerticalMovement = state => state;
    const updatePlayerSpeed = state => state;
    const updatePlayerSprite = state => state.spriteSkipIndex == 3
        ? { ...state, spriteIndex: (state.spriteIndex + 1) % 7, spriteSkipIndex: 0 }
        : { ...state, spriteSkipIndex: state.spriteSkipIndex + 1 };
    const updatePlayer = R.compose(
        updatePlayerHorizontalMovement, updatePlayerVerticalMovement, 
        updatePlayerSpeed, updatePlayerSprite);

    const updateEnemy = state => state;
    const update = state => ({
        background: updateBackground(state.background),
        player: updatePlayer(state.player),
        enemy: updateEnemy(state.enemy),
    });
    const updateAndDraw = R.compose(update, draw);
    const gameLoop = state => {
        const newState = updateAndDraw(state);
        requestAnimationFrame(() => gameLoop(newState));
    };
    gameLoop(initialState);
}


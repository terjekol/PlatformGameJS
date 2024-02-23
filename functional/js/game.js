const init = () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 720;
    const playerSpriteSize = 200;
    const backgroundWidth = 2400;
    const playerY = canvas.height - playerSpriteSize;
    const mutableKeys = {
        right: false,
        left: false,
        up: false,
    };
    const handleKey = keyboardEvent => {
        const key = keyboardEvent.key;
        if (!key.startsWith('Arrow')) return;
        const fieldName = key.substring(5).toLowerCase();
        mutableKeys[fieldName] = keyboardEvent.type.endsWith('down');
    };
    window.addEventListener('keydown', handleKey);
    window.addEventListener('keyup', handleKey);

    const initialState = {
        background: { x: 0, speed: -2 },
        player: {
            x: 0, speedX: 0,
            y: playerY, speedY: -1,
            spriteIndex: 0, spriteSkipIndex: 0, playerMode: 0,
            downForce: 1,
        },
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
    const drawPlayer = drawSprite(images.player, playerSpriteSize, playerSpriteSize, R.__, R.__, R.__, R.__);
    const draw = state => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        drawBackground(state.background.x);
        drawBackground(state.background.x + images.background.width - 1);
        drawPlayer(state.player.x, state.player.y, state.player.spriteIndex, 0);
        return state;
    };
    const updateBackground = state => {
        const background = state.background;
        return R.assocPath(['background', 'x'], (background.x + background.speed) % backgroundWidth, state);
    }
    const updatePlayerHorizontalMovement = state => {
        const player = state.player;
        const newXdraft = player.x + player.speedX;
        const maxX = canvas.width - playerSpriteSize;
        const newX = R.clamp(0, maxX, newXdraft);
        return R.assocPath(['player', 'x'], newX, state);
    };
    const isPlayerOnGround = state => state.y >= playerY;
    const updatePlayerVerticalMovement = state => {
        const player = state.player;
        const newYdraft = player.y + player.speedY;
        const maxY = canvas.height - playerSpriteSize;
        const newY = R.clamp(0, maxY, newYdraft);
        const playerIsOnGround = isPlayerOnGround(player);
        const newSpeedY = playerIsOnGround ? 0 : player.speedY + player.downForce;
        const tmpState = R.assocPath(['player', 'speedY'], newSpeedY, state);
        return R.assocPath(['player', 'y'], newY, tmpState);
    };
    const updatePlayerSpeedX = state =>
        R.assocPath(['player', 'speedX'], mutableKeys.right ? 5 : mutableKeys.left ? -5 : 0, state);
    const updatePlayerSpeedY = state =>
        mutableKeys.up && isPlayerOnGround(state.player) ? R.assocPath(['player', 'speedY'], -32, state) : state;
    const updatePlayerSprite = state => {
        const player = state.player;
        if (player.spriteSkipIndex == 3) {
            const tmpState = R.assocPath(['player', 'spriteIndex'], (player.spriteIndex + 1) % 7, state);
            return R.assocPath(['player', 'spriteSkipIndex'], 0, tmpState);
        } else {
            return R.assocPath(['player', 'spriteSkipIndex'], player.spriteSkipIndex + 1, state);
        }
    }
    const update = R.compose(
        updateBackground,
        updatePlayerSpeedX, updatePlayerSpeedY,
        updatePlayerHorizontalMovement, updatePlayerVerticalMovement,
        updatePlayerSprite);
    // const updateEnemy = state => state;    
    const updateAndDraw = R.compose(update, draw);
    const gameLoop = state => {
        const newState = updateAndDraw(state);
        requestAnimationFrame(() => gameLoop(newState));
    };
    gameLoop(initialState);
}


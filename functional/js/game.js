const init = () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 720;
    const initialState = {
        x: 0,
        speed: -2,
    };
    const getImage = name => document.getElementById(name + 'Img');
    const images = ['background', 'player', 'enemy']
        .reduce((obj, name) => R.assoc(name, getImage(name), obj), {});
    const playerY = canvas.height - images.player.height;
    const drawImage = R.curry(ctx.drawImage);
    const drawBackground = drawImage(images.background);
    drawBackground(0, 0);
    return;

    const draw = state => {
        drawBackground(state.x);
        drawBackground(state.x + images.background.width - 1);
    };
    const updateBackground = (state, imageWidth) => ({ ...state, x: (state.x + state.speed) % imageWidth });
    const gameLoop = R.curryN(4, (ctx, images, state) => {
        const newState = updateBackground(state, images.background.width);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        draw(newState);
        requestAnimationFrame(gameLoop(newState));
    })(ctx, images);
    gameLoop(initialState, null);
}


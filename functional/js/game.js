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
    const updateBackground = (state, imageWidth) => ({ ...state, x: (state.x + state.speed) % imageWidth });

    const drawBackground = R.curry((ctx, image, x) => {
        ctx.drawImage(image, x, 0);
        ctx.drawImage(image, x + image.width - 1, 0);
    })(ctx, images.background);



    const gameLoop = R.curryN(4, (ctx, images, state) => {
        const newState = updateBackground(state, images.background.width);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        drawBackground(newState.x);
        requestAnimationFrame(gameLoop(newState));
    })(ctx, images);
    gameLoop(initialState, null);
}


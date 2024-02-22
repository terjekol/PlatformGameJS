const init = () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 720;
    const image = getImage('background');
    const initialState = {
        x: 0,
        speed: -2,
        imageWidth: image.width,
    };
    const gameLoop = R.curry((ctx, image, state, dummy) => {
        const newState = updateBackgroundPosition(state);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        drawBackground(ctx, image, newState.x);
        requestAnimationFrame(gameLoop(newState));
    })(ctx, image);
    gameLoop(initialState, null);
}

// Oppdateringsfunksjon for bakgrunnsposisjonen
const updateBackgroundPosition = state => {
    return { ...state, x: (state.x + state.speed) % state.imageWidth };
}

// Tegnefunksjon for bakgrunnen
const drawBackground = (ctx, image, x) => {
    ctx.drawImage(image, x, 0);
    ctx.drawImage(image, x + image.width - 1, 0);
};

const getImage = name => document.getElementById(name + 'Img');

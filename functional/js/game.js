const init = () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 720;
    const image = getImage('background');
    const initialState = {
        x: 0,
        speed: -2, 
    };
    const gameLoopFunctionFullImpl = (ctx, image, state) => {
        const newState = updateBackgroundPosition(state, image.width);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
        drawBackground(ctx, image, newState.x);
        requestAnimationFrame(() => gameLoopFunction(newState));
    };
    const gameLoopFunctionFull = R.curry(gameLoopFunctionFullImpl);
    const gameLoopFunction = gameLoopFunctionFull(ctx, image);
    gameLoopFunction(initialState);
}

// Oppdateringsfunksjon for bakgrunnsposisjonen
function updateBackgroundPosition({ x, speed }, canvasWidth) {
    return {
        x: (x + speed) % canvasWidth, 
        speed,
    };
}

// Tegnefunksjon for bakgrunnen
const drawBackground = (ctx, image, x) => {
    ctx.drawImage(image, x, 0);
    ctx.drawImage(image, x + image.width - 1, 0); 
};

const getImage = name => document.getElementById(name + 'Img');

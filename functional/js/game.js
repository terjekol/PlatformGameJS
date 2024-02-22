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
    const gameLoopFunction = (ctx, image, state, canvasWidth) => {
        const newState = updateBackgroundPosition(state, image.width);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
        drawBackground(ctx, image, newState.x);
        requestAnimationFrame(() => gameLoopFunction(ctx, image, newState, canvasWidth));
    };
    gameLoopFunction(ctx, image, initialState, canvas.width);
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

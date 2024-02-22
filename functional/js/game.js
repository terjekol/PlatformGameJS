const init = () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 720;
    const image = getImage('background');
    const initialState = {
        x: 0,
        speed: -1, 
    };
    const gameLoopFunction = (ctx, image, state, canvasWidth) => {
        const newState = updateBackgroundPosition(state, canvasWidth);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Fjern tidligere tegning
        drawBackground(ctx, image, newState);
        requestAnimationFrame(() => gameLoopFunction(ctx, image, newState, canvasWidth));
    };
    gameLoopFunction(ctx, image, initialState, canvas.width);
}

// Oppdateringsfunksjon for bakgrunnsposisjonen
function updateBackgroundPosition({ x, speed }, canvasWidth) {
    return {
        x: (x + speed) % canvasWidth, // Loop bakgrunnen
        speed,
    };
}

// Tegnefunksjon for bakgrunnen
const drawBackground = (ctx, backgroundImage, { x }) => {
    ctx.drawImage(backgroundImage, x, 0);
    ctx.drawImage(backgroundImage, x + backgroundImage.width, 0); // Tegn en ekstra for å dekke hele canvas
};

function getImage(name) {
    return document.getElementById(name + 'Img');
}
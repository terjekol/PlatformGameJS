function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
};

function drawSpriteFrame(ctx, image, objectModel) {
    const { x, y, width, height, frameCol, frameRow } = objectModel;
    const frameY = frameRow * height;
    const frameX = frameCol * width;

    ctx.drawImage(image, frameX, frameY,
        width, height, x, y,
        width, height);
}
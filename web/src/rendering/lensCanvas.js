export function clearCanvas(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);
}

export function drawPoint(ctx, x, y, radius = 4) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

export function drawRing(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
}

export function worldToCanvas( x, y, width, height, scale) {
    return {
        x: width / 2 + x * scale,
        y: height / 2 - y * scale
    };
}

export function renderLensSystem(ctx, canvas, system) {
    const { source, images, thetaEinstein, scale, aligned} = system;

    clearCanvas( ctx, canvas.width, canvas.height);

    drawAxes( ctx, canvas.width, canvas.height);

    const center = {
        x: canvas.width / 2,
        y: canvas.height / 2
    };

    const sourceCanvas = 
    worldToCanvas(
            source.x,
            source.y,
            canvas.width,
            canvas.height,
            scale
        );

    drawRing(
        ctx,
        center.x,
        center.y,
        thetaEinstein * scale
    );

    drawPoint(
        ctx,
        sourceCanvas.x,
        sourceCanvas.y,
        5
    );

    if (!aligned && images){
        const plusCanvas =
            worldToCanvas(
                images.plus.x,
                images.plus.y,
                canvas.width,
                canvas.height,
                scale
        );

        const minusCanvas =
            worldToCanvas(
                images.minus.x,
                images.minus.y,
                canvas.width,
                canvas.height,
                scale
        );

        drawPoint(
            ctx,
            plusCanvas.x,
            plusCanvas.y,
            5
        );

        drawPoint(
            ctx,
            minusCanvas.x,
            minusCanvas.y,
            5
        );
    }
}

export function drawAxes(ctx, width, height) {
    ctx.beginPath();

    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);

    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);

    ctx.stroke();
}
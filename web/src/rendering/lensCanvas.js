import { imageProjections } from "../physics/imageProjections";

import { projectSource } from "../simulation/projectSource";

export function clearCanvas(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);
}

export function drawPoint(ctx, x, y, radius = 4, color = '#ffffff', alpha = 1) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

export function drawRing(ctx, x, y, radius, color = '#ffffff') {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
}

export function worldToCanvas( x, y, width, height, scale) {
    return {
        x: width / 2 + x * scale,
        y: height / 2 - y * scale
    };
}

export function canvasToWorld( x, y, width, height, scale) {
    return {
        x: (x - width / 2) / scale,
        y: (height/2 - y) / scale
    };
}

export function drawAxes(ctx, width, height) {
    ctx.beginPath();

    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);

    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);

    ctx.stroke();
}

function drawPointCloud(ctx, points, radius, color, alpha = 1) {
    ctx.save();

    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;

    ctx.beginPath();

    for (const point of points) {

        ctx.moveTo( point.x + radius, point.y);

        ctx.arc( point.x, point.y, radius, 0, Math.PI * 2);
    }

    ctx.fill();

    ctx.restore();
}

function drawExtendedSource( ctx, points, offsetX, offsetY, canvas, scale, colors) {

    for (const point of points) {

        const position =
            worldToCanvas(
                point.x + offsetX,
                point.y + offsetY,
                canvas.width,
                canvas.height,
                scale
            );

        drawPoint(
            ctx,
            position.x,
            position.y,
            1.5,
            colors.source,
            .7
        );
    }
}

function drawProjectedSource( ctx, points, offsetX, offsetY, thetaEinstein, canvas, scale, colors) {

    for (const point of points) {

        const sourceX =
            point.x + offsetX;

        const sourceY =
            point.y + offsetY;

        const b = Math.hypot(sourceX, sourceY);
        
        const tolerance = 1e-10;

        if (b < tolerance) {
            continue;
        }

        const images = imageProjections( sourceX, sourceY, thetaEinstein);

        const plus =
            worldToCanvas(
                images.plus.x,
                images.plus.y,
                canvas.width,
                canvas.height,
                scale
            );

        const minus =
            worldToCanvas(
                images.minus.x,
                images.minus.y,
                canvas.width,
                canvas.height,
                scale
            );
            
        const projected_radius = 2
        const projected_alpha = .7;
        
        drawPoint(
            ctx,
            plus.x,
            plus.y,
            projected_radius,
            colors.projected,
            projected_alpha
        );

        drawPoint(
            ctx,
            minus.x,
            minus.y,
            projected_radius,
            colors.projected,
            projected_alpha
        );
    }
}

function drawBackground(ctx, width, height, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
}

export function renderLensSystem(ctx, canvas, system) {
    const { source, sourcePoints, thetaEinstein, scale, aligned, colors} = system;

    clearCanvas( ctx, canvas.width, canvas.height);

    drawBackground( ctx, canvas.width, canvas.height, colors.background);

    drawAxes( ctx, canvas.width, canvas.height);

    const center = {
        x: canvas.width / 2,
        y: canvas.height / 2
    };

    const {sourceArray, projectedArray} = projectSource(sourcePoints, source.x, source.y, thetaEinstein);

    const sourceCanvasPoints = sourceArray.map(point => worldToCanvas(point.x, point.y, canvas.width, canvas.height, scale));
    const projectedCanvasPoints = projectedArray.map(point => worldToCanvas(point.x, point.y, canvas.width, canvas.height, scale));

    drawPointCloud(ctx, sourceCanvasPoints, 1.5, colors.source, .8);

    drawPointCloud(ctx, projectedCanvasPoints, 2, colors.projected, .7);

    drawRing( ctx, center.x, center.y, 4, colors.lens);
}
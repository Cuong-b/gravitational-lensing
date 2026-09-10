import { imageProjections } from "../physics/imageProjections";
import { drawLensedSourceRaster } from "./lensedSourceRaster";

export function clearCanvas(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);
}

export function drawPoint(ctx, x, y, radius = 4, color = "#ffffff", alpha = 1) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function drawRing(ctx, x, y, radius, color = "#ffffff") {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

export function worldToCanvas(x, y, width, height, scale) {
  return {
    x: width / 2 + x * scale,
    y: height / 2 - y * scale,
  };
}

export function canvasToWorld(x, y, width, height, scale) {
  return {
    x: (x - width / 2) / scale,
    y: (height / 2 - y) / scale,
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
    ctx.moveTo(point.x + radius, point.y);

    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
  }

  ctx.fill();

  ctx.restore();
}

function drawExtendedSource(ctx, points, offsetX, offsetY, canvas, scale, colors) {
  for (const point of points) {
    const position = worldToCanvas(
      point.x + offsetX,
      point.y + offsetY,
      canvas.width,
      canvas.height,
      scale,
    );

    drawPoint(ctx, position.x, position.y, 1.5, colors.source, 0.7);
  }
}

function drawProjectedSource(ctx, points, offsetX, offsetY, thetaEinstein, canvas, scale, colors) {
  for (const point of points) {
    const sourceX = point.x + offsetX;

    const sourceY = point.y + offsetY;

    const b = Math.hypot(sourceX, sourceY);

    const tolerance = 1e-10;

    if (b < tolerance) {
      continue;
    }

    const images = imageProjections(sourceX, sourceY, thetaEinstein);

    const plus = worldToCanvas(images.plus.x, images.plus.y, canvas.width, canvas.height, scale);

    const minus = worldToCanvas(images.minus.x, images.minus.y, canvas.width, canvas.height, scale);

    const projected_radius = 2;
    const projected_alpha = 0.7;

    drawPoint(ctx, plus.x, plus.y, projected_radius, colors.projected, projected_alpha);

    drawPoint(ctx, minus.x, minus.y, projected_radius, colors.projected, projected_alpha);
  }
}

function drawBackground(ctx, width, height, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function traceWorldPolygon(path, points, width, height, scale) {
  if (points.length === 0) {
    return;
  }

  const first = worldToCanvas(points[0].x, points[0].y, width, height, scale);

  path.moveTo(first.x, first.y);

  for (let index = 1; index < points.length; index++) {
    const point = worldToCanvas(points[index].x, points[index].y, width, height, scale);

    path.lineTo(point.x, point.y);
  }

  path.closePath();
}

export const WORLD_EXTENT = 6;

export function getWorldScale(width, height, worldExtentX = 6, worldExtentY = 6) {
  const scaleX = width / (2 * worldExtentX);

  const scaleY = height / (2 * worldExtentY);

  return Math.min(scaleX, scaleY);
}

export function prepareCanvas(canvas, canvasSize) {
  const rect = canvas.getBoundingClientRect();

  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const pixelWidth = Math.round(rect.width * dpr);

  const pixelHeight = Math.round(rect.height * dpr);

  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
  }

  const ctx = canvas.getContext("2d");

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  return { ctx, width: canvasSize.width, height: canvasSize.height };
}

export function drawSource(ctx, x, y, radius, width, height, scale, color) {
  const center = worldToCanvas(x, y, width, height, scale);

  ctx.save();

  ctx.fillStyle = color;

  ctx.shadowColor = color;
  ctx.shadowBlur = 6;

  ctx.beginPath();

  ctx.arc(center.x, center.y, radius * scale, 0, Math.PI * 2);

  ctx.fill();

  ctx.restore();
}

export function drawProjection(ctx, projection, width, height, scale, color) {
  const { plusBoundary, minusBoundary, sourceContainsLens } = projection;

  ctx.save();

  ctx.fillStyle = color;

  ctx.globalAlpha = 0.9;

  ctx.shadowColor = color;
  ctx.shadowBlur = 6;

  if (sourceContainsLens) {
    const path = new Path2D();

    traceWorldPolygon(path, plusBoundary, width, height, scale);
    traceWorldPolygon(path, minusBoundary, width, height, scale);

    ctx.fill(path, "evenodd");

    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.globalAlpha = 0.95;
    ctx.stroke(path);
  } else {
    const plusPath = new Path2D();
    traceWorldPolygon(plusPath, plusBoundary, width, height, scale);
    ctx.fill(plusPath);

    const minusPath = new Path2D();
    traceWorldPolygon(minusPath, minusBoundary, width, height, scale);

    ctx.fill(minusPath);

    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.globalAlpha = 0.95;
    ctx.stroke(plusPath);
    ctx.stroke(minusPath);
  }

  ctx.restore();
}

export function renderLensSystem(ctx, viewport, system) {
  const {
    source,
    sourcePoints,
    thetaEinstein,
    rasterBuffer,
    colors,
    quality,
    worldExtentX = 6,
    worldExtentY = 6,
  } = system;

  const { width, height } = viewport;

  const scale = getWorldScale(width, height, worldExtentX, worldExtentY);

  clearCanvas(ctx, width, height);

  drawBackground(ctx, width, height, colors.background);

  const center = {
    x: width / 2,
    y: height / 2,
  };

  drawSource(ctx, source.x, source.y, source.radius, width, height, scale, colors.source);

  drawLensedSourceRaster({
    ctx,
    buffer: rasterBuffer,
    width: width,
    height: height,
    scale: scale,
    sourceX: source.x,
    sourceY: source.y,
    sourceRadius: source.radius,
    thetaEinstein,
    color: colors.projected,
    quality: quality,
  });

  drawRing(ctx, center.x, center.y, 4, colors.lens);
}

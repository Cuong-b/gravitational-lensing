import { imageProjections } from "../physics/imageProjections";

const TWO_PI = Math.PI * 2;
const ZERO_TOLERANCE = 1e-10;

export function projectCircularSource({sourceX, sourceY, sourceRadius, thetaEinstein, segments = 512}) {
    const plusBoundary = [];
    const minusBoundary = [];

    const centerDistance = Math.hypot(sourceX, sourceY);

    const causticPadding = Math.max(1e-4, (4 * sourceRadius) / segments);

    let projectionX = sourceX;
    let projectionY = sourceY;
    let projectionDistance = centerDistance;

    const touchesCaustic = Math.abs(centerDistance - sourceRadius) < causticPadding;

    if (touchesCaustic && centerDistance > 0) {
        const adjustedDistance = sourceRadius + causticPadding;
        const adjustment = adjustedDistance / centerDistance;

        projectionX *= adjustment;

        projectionY *= adjustment;

        projectionDistance = adjustedDistance;
    }

    for (let index = 0; index < segments; index++) {
        const angle = TWO_PI * index / segments;

        const x = projectionX + sourceRadius * Math.cos(angle);
        const y = projectionY + sourceRadius * Math.sin(angle);

        const beta = Math.hypot(x, y);

        if (beta < ZERO_TOLERANCE) {
            continue;
        }

        const images = imageProjections(x, y, thetaEinstein);

        plusBoundary.push(images.plus);
        minusBoundary.push(images.minus);
    }

    const sourceContainsLens = projectionDistance < sourceRadius;

    return {plusBoundary, minusBoundary, sourceContainsLens}
}
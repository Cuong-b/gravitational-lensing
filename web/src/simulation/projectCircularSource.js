import { imageProjections } from "../physics/imageProjections";

const TWO_PI = Math.PI * 2;
const ZERO_TOLERANCE = 1e-10;

export function projectCircularSource({sourceX, sourceY, sourceRadius, thetaEinstein, segments = 512}) {
    const plusBoundary = [];
    const minusBoundary = [];

    for (let index = 0; index < segments; index++) {
        const angle = TWO_PI * index / segments;
        const x = sourceX + sourceRadius * Math.cos(angle);
        const y = sourceY + sourceRadius * Math.sin(angle);
        const beta = Math.hypot(x, y);

        if (beta < ZERO_TOLERANCE) {
            continue;
        }

        const images = imageProjections(x, y, thetaEinstein);

        plusBoundary.push(images.plus);
        minusBoundary.push(images.minus);
    }

    const sourceContainsLens = Math.hypot(sourceX, sourceY) <= sourceRadius;

    return {plusBoundary, minusBoundary, sourceContainsLens}
}
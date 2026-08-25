import { imageProjections} from "../physics/imageProjections";

export function projectSource(sourcePoints, offsetX, offsetY, thetaEinstein){
    const sourceArray = [];
    const projectedArray = [];

    const ZERO_TOLERANCE = 1e-10;

    for (const point of sourcePoints) {
        const x = point.x + offsetX;
        const y = point.y + offsetY;

        sourceArray.push({x, y});

        const beta = Math.hypot(x, y);

        if(beta < ZERO_TOLERANCE) {
            continue;
        }

        const images = imageProjections(x, y, thetaEinstein);

        projectedArray.push(images.plus, images.minus);
    }

    return {sourceArray, projectedArray};
}
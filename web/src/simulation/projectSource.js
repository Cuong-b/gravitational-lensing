import { imageProjections} from "../physics/imageProjections";

export function projectSource(sourcePoints, offsetX, offsetY, thetaEinstein){
    const source = [];
    const projected = [];

    const ZERO_TOLERANCE = 1e-10;

    for (const point of sourcePoints) {
        const x = point.x + offsetX;
        const y = point.y + offsetY;

        source.push({x, y});

        const beta = Math.hypot(x, y);

        if(beta < ZERO_TOLERANCE) {
            continue;
        }

        const images = imageProjections(x, y, thetaEinstein);

        projected.push(images.plus, images.minus);
    }

    return{source, projected};
}
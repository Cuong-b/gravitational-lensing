import {pointMagnification} from "../physics/magnification.js";


export function createDiskSamples( radius = 0.5, radialSteps = 20, angularSteps = 40) {
    const points = [];

    for (let rIndex = 0; rIndex < radialSteps; rIndex++) {

        const r = radius * Math.sqrt( (rIndex + 0.5) / radialSteps);

        for ( let angleIndex = 0; angleIndex < angularSteps; angleIndex++) {

            const angle = 2 * Math.PI * ( angleIndex + 0.5 ) / angularSteps;

            points.push({
                x: r * Math.cos(angle),

                y: r * Math.sin(angle)
            });
        }
    }

    return points;
}

export function meanExtendedMagnification(sourcePoints, displacement, thetaEinstein) {
    let total = 0;
    let count = 0;

    for (const point of sourcePoints) {

        const x = point.x + displacement;

        const y = point.y;

        // A single exact singular sample
        // has zero measure for an extended source.
        if ( Math.hypot(x, y) < 1e-10 ) {
            continue;
        }

        total += pointMagnification( x, y, thetaEinstein);

        count++;
    }

    return total / count;
}


import { beta } from "./beta.js";

import {thetaPlus, thetaMinus} from "./imageProjections.js";

export function pointMagnification(x, y, thetaEinstein) {

    const b = beta(x, y);

    if (b === 0) {
        throw new Error(
            "Magnification is undefined at beta = 0 for the point-source model."
        );
    }

    const thetaP = thetaPlus(b, thetaEinstein);

    const thetaM = thetaMinus(b, thetaEinstein);

    const discriminant = Math.sqrt( (b ** 2) + (4 * (thetaEinstein ** 2)));

    const alphaPlus = (thetaP / (2 * b)) * (1 + (b / discriminant));

    const alphaMinus = (thetaM / (2 * b)) * (1 - (b / discriminant));

    return Math.abs(alphaPlus) + Math.abs(alphaMinus);
}

export function meanMagnification(points, thetaEinstein) {
    if(points.length === 0) {
        throw new Error(
            "Cannot calculate mean magnification for an empty point set."
        );
    }

    const magnifications = points.map(point =>
        pointMagnification(point.x, point.y, thetaEinstein)
    );

    const sum = magnifications.reduce((total, value) => total + value, 0);

    return sum / magnifications.length;
}
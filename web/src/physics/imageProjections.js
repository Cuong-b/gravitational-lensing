import {beta} from "./beta.js";

export function thetaPlus(beta, thetaEinstein) {
    return (0.5) * (beta + Math.sqrt((beta ** 2) + (4 * (thetaEinstein ** 2))));
}

export function thetaMinus(beta, thetaEinstein) {
    return (0.5) * (beta - Math.sqrt((beta ** 2) + (4 * (thetaEinstein ** 2))));
}

export function imageProjections(x, y, thetaEinstein) {
    const direction = Math.atan2(y, x);

    const b = beta(x, y);

    const thetaP = thetaPlus(b, thetaEinstein);
    const thetaM = thetaMinus(b, thetaEinstein);

    return {
        plus: {
            x: thetaP * Math.cos(direction),
            y: thetaP * Math.sin(direction)
        },
        
        minus: {
            x: thetaM * Math.cos(direction),
            y: thetaM * Math.sin(direction)
        }
    };
}
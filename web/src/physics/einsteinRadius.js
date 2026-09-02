const G = 6.67430e-11;

const C = 299792458;

const SOLAR_MASS = 1.989e30;

const PARSEC = 3.085677581491367e16;

const RADIANS_TO_ARCSECONDS = 206264.80624709633;


export function einsteinRadius( mass, lensDistance, lensSourceDistance) {

    const m = mass * SOLAR_MASS;

    const dL = lensDistance * PARSEC;

    const dLS = lensSourceDistance * PARSEC;

    const dS = dL + dLS; /*assumes euclidean geometry*/

    const radians = Math.sqrt((4 * G * m / C ** 2) * (dLS / (dL * dS)));

    return {radians, arcseconds: radians * RADIANS_TO_ARCSECONDS};
}
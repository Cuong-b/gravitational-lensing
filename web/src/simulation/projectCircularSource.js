import { imageProjections } from "../physics/imageProjections";

const TWO_PI = Math.PI * 2;
const ZERO_TOLERANCE = 1e-8;

const BASE_SEGMENTS = 96;
const MAX_DEPTH = 7;

const MAX_CHORD = 0.08;      // world-space distance
const MAX_DEVIATION = 0.01;  // how far midpoint bends from straight line
const CRITICAL_BETA = 0.08;  // force more refinement near beta ~ 0

function distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}

function midpoint(a, b) {
    return {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2
    };
}

function sampleBoundaryAtAngle(angle, params) {
    const {sourceX, sourceY, sourceRadius, thetaEinstein} = params;

    const x = sourceX + sourceRadius * Math.cos(angle);

    const y = sourceY + sourceRadius * Math.sin(angle);

    const beta = Math.hypot(x, y);

    if (beta < ZERO_TOLERANCE) {
        return {
            singular: true,
            angle
        };
    }

    const images = imageProjections(x, y, thetaEinstein);

    return {
        singular: false,
        angle,
        beta,
        plus: images.plus,
        minus: images.minus
    };
}

function shouldSubdivide(p0, pm, p1, betaMid, depth) {
    if (depth >= MAX_DEPTH) {
        return false;
    }

    const chord = distance(p0, p1);
    const deviation = distance(pm, midpoint(p0, p1));

    return (
        chord > MAX_CHORD ||
        deviation > MAX_DEVIATION ||
        betaMid < CRITICAL_BETA
    );
}

function refineBranch(a0, a1, s0, s1, branch, params, depth = 0) {
    const midAngle = (a0 + a1) / 2;
    const sm = sampleBoundaryAtAngle(midAngle, params);

    // If midpoint hits the singular region,
    // split harder around it instead of drawing
    // one long straight edge.
    if (sm.singular) {
        if (depth >= MAX_DEPTH) {
            return [s1[branch]];
        }

        const quarter = (a1 - a0) / 4;

        const leftMid = sampleBoundaryAtAngle( midAngle - quarter, params);

        const rightMid = sampleBoundaryAtAngle( midAngle + quarter, params);

        let result = [];

        if (!leftMid.singular) {
            result.push(...refineBranch( a0, midAngle - quarter, s0, leftMid, branch, params, depth + 1));
        }

        if (!rightMid.singular && !leftMid.singular) {
            result.push(...refineBranch( midAngle + quarter, a1, rightMid, s1, branch, params, depth + 1));
        } else {
            result.push(s1[branch]);
        }

        return result;
    }

    const p0 = s0[branch];
    const pm = sm[branch];
    const p1 = s1[branch];

    if (!shouldSubdivide(p0, pm, p1, sm.beta, depth)) {
        return [p1];
    }

    return [...refineBranch( a0, midAngle, s0, sm, branch, params, depth + 1),
        ...refineBranch( midAngle, a1, sm, s1, branch, params, depth + 1)
    ];
}

export function projectCircularSource({ sourceX, sourceY, sourceRadius, thetaEinstein, baseSegments = BASE_SEGMENTS}) {
    const params = { sourceX, sourceY, sourceRadius, thetaEinstein};

    const seeds = [];

    // Half-step offset avoids landing exactly on the singular point
    for (let i = 0; i < baseSegments; i++) {
        const angle = TWO_PI * (i + 0.5) / baseSegments;

        seeds.push(sampleBoundaryAtAngle(angle, params));
    }

    const plusBoundary = [];
    const minusBoundary = [];

    for (let i = 0; i < baseSegments; i++) {
        const s0 = seeds[i];
        const s1 = seeds[(i + 1) % baseSegments];

        const a0 =
            TWO_PI * (i + 0.5) / baseSegments;

        const a1 =
            i === baseSegments - 1
                ? TWO_PI + TWO_PI * 0.5 / baseSegments
                : TWO_PI * (i + 1.5) / baseSegments;

        if (s0.singular || s1.singular) {
            continue;
        }

        if (i === 0) {
            plusBoundary.push(s0.plus);
            minusBoundary.push(s0.minus);
        }

        plusBoundary.push(...refineBranch(a0, a1, s0, s1, "plus", params));

        minusBoundary.push(...refineBranch(a0, a1, s0, s1, "minus", params));
    }

    return { plusBoundary, minusBoundary, sourceContainsLens: Math.hypot(sourceX, sourceY) < sourceRadius};
}
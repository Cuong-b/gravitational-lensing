import {pointMagnification} from "../physics/magnification.js";

// Successive points are spaced by the golden angle, the standard choice
// for a Vogel/Fibonacci spiral: it packs points into a disk with uniform
// density and, unlike a grid of concentric rings, never repeats the same
// radius across multiple points (see createDiskSamples).
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

export function createDiskSamples( radius = 0.5, sampleCount = 800) {
    const points = [];

    /*
     * Equal-area patch radius shared by every sample: the length scale
     * used to soften the point-source singularity when a sample lands
     * close to the lens (see meanExtendedMagnification). A grid of
     * concentric rings packs many samples onto the exact same radius, so
     * an entire ring can sweep close to the lens at once and spike the
     * average; a spiral gives every sample its own radius instead, so
     * only ever one or two points are close at a given displacement.
     */
    const patchRadius = radius / Math.sqrt(sampleCount);

    for (let index = 0; index < sampleCount; index++) {

        const r = radius * Math.sqrt( (index + 0.5) / sampleCount);

        const angle = index * GOLDEN_ANGLE;

        points.push({
            x: r * Math.cos(angle),

            y: r * Math.sin(angle),

            patchRadius,
        });
    }

    return points;
}

export function meanExtendedMagnification(sourcePoints, displacement, thetaEinstein) {
    if (sourcePoints.length === 0) {
        throw new Error(
            "Cannot calculate mean magnification for an empty point set."
        );
    }

    let total = 0;

    for (const point of sourcePoints) {

        const x = point.x + displacement;

        const y = point.y;

        const rawBeta = Math.hypot(x, y);

        /*
         * The point-source formula diverges as beta -> 0, so evaluating
         * it exactly at a sample's center is a poor stand-in for that
         * sample's patch's true (finite) average magnification whenever
         * the patch passes near the lens -- the patch only partly
         * overlaps the singularity, but a raw point sample sees
         * all-or-nothing. That mismatch, compounded by many points
         * landing on the same radius in a ring-grid layout, is what
         * produced the spurious dip flanked by two spikes near zero
         * displacement instead of a single smooth peak there.
         *
         * Softening beta by the patch's own radius (in quadrature, so it
         * fades away once beta is larger than the patch) approximates
         * that partial overlap, keeping each sample's contribution close
         * to its true patch-averaged magnification and the curve smooth.
         */
        const softenedBeta = Math.hypot(rawBeta, point.patchRadius);

        const scale = rawBeta === 0 ? 0 : softenedBeta / rawBeta;

        const sx = rawBeta === 0 ? softenedBeta : x * scale;

        const sy = rawBeta === 0 ? 0 : y * scale;

        total += pointMagnification(sx, sy, thetaEinstein);
    }

    return total / sourcePoints.length;
}


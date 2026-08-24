export function generateSourcePoints(count = 1500, radius = 0.5) {

    const points = [];

    while (points.length < count) {

        const x = Math.random() * (2 * radius) - radius;

        const y = Math.random() * (2 * radius) - radius;

        if ( x ** 2 + y ** 2 <= radius ** 2) {
            points.push({x, y});
        }
    }

    return points;
}
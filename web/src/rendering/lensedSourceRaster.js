function clamp01(value) {
    return Math.max(0, Math.min(1, value));
}


function hexToRgb(hex) {
    const value = hex.replace("#", "");

    return {
        r: parseInt(value.slice(0, 2), 16),
        g: parseInt(value.slice(2, 4), 16),
        b: parseInt(value.slice(4, 6), 16)
    };
}


export function drawLensedSourceRaster({ ctx, buffer, width, height, scale, sourceX, sourceY, sourceRadius, thetaEinstein, color, quality = 0.75}) {

    /*
     * Render at a somewhat smaller resolution, then let Canvas smoothly upscale it.
     *
     * This controls performance independently of the displayed Canvas resolution.
     */
    const rasterWidth = Math.max( 1,Math.round( width * quality));

    const rasterHeight = Math.max(1,Math.round(height * quality));


    if (buffer.width !== rasterWidth || buffer.height !== rasterHeight) {
        buffer.width = rasterWidth;
        buffer.height = rasterHeight;
    }


    const bufferCtx = buffer.getContext("2d");

    const image = bufferCtx.createImageData(rasterWidth, rasterHeight);

    const pixels = image.data;


    const {r, g, b} = hexToRgb(color);


    const thetaE2 = thetaEinstein ** 2;

    /*
     * One rendered pixel expressed in source/world units.
     *
     * Used to soften the source boundary.
     */
    const edgeWidth = 1.25 / scale;


    for (let py = 0; py < rasterHeight; py++) {

        const canvasY =(py + 0.5) / quality;

        const thetaY = ( height / 2 - canvasY ) / scale;


        for (let px = 0; px < rasterWidth; px++) {

            const canvasX =( px + 0.5) / quality;

            const thetaX = ( canvasX - width / 2 ) / scale;


            const thetaSquared = thetaX ** 2 + thetaY ** 2;


            /*
             * θ = 0 is singular.
             */
            if ( thetaSquared < 1e-12 ) {
                continue;
            }


            /*
             * Vector lens equation:
             *
             * β = θ - θE² θ / |θ|²
             */

            const factor = 1 - thetaE2 / thetaSquared;


            const betaX = thetaX * factor;

            const betaY = thetaY * factor;


            /*
             * Is that source-plane position inside our circular source?
             */

            const distance = Math.hypot( betaX - sourceX, betaY - sourceY);


            /*
             * Soft transition over ~1 display pixel gives us antialiasing.
             */

            const coverage = clamp01((sourceRadius + edgeWidth / 2 - distance ) / edgeWidth);


            if ( coverage === 0) {
                continue;
            }


            const index = ( py * rasterWidth + px ) * 4;


            pixels[index] = r;

            pixels[index + 1] = g;

            pixels[index + 2] = b;

            pixels[index + 3] = Math.round( 235 * coverage );
        }
    }

    bufferCtx.putImageData( image, 0, 0);

    ctx.save();

    ctx.imageSmoothingEnabled = true;

    ctx.imageSmoothingQuality = "high";

    ctx.drawImage( buffer, 0, 0, width, height);

    ctx.restore();
}
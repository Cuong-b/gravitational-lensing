import { useState } from "react";

import { SourceControls } from "./SourceControls.jsx";

import { LensVisualization } from "./LensVisualization.jsx";


const COLORS = {
    background: "#05070a",
    source: "#f5b942",
    projected: "#9b5de5",
    lens: "#d1d5db",
    ring: "#6b7280",
    axes: "#202733"
};


export function MultipleImagingFigure({thetaEinstein = 2.33}) {

    const [sourceX, setSourceX] = useState(0);

    const [sourceY, setSourceY] = useState(0);

    const sourceRadius = 0.5;

    const beta = Math.hypot(sourceX, sourceY);

    function handleSourceChange({x, y}) {
        setSourceX(x);
        setSourceY(y);
    }

    return (
        <figure
            className="interactive-figure"

            style={{
                "--source-color":
                    COLORS.source,

                "--projected-color":
                    COLORS.projected,

                "--lens-color":
                    COLORS.lens
            }}
        >

            <figcaption
                className="
                    interactive-figure-header
                "
            >

                <div>
                    <h3>
                        Explore the lensing effect
                    </h3>

                    <p>
                        For this visualization, the lens parameters are
                        fixed so that the Einstein radius is
                        2.33 arcseconds. Move the source to see how its
                        projected images change.
                    </p>
                </div>

            </figcaption>


            <SourceControls
                sourceX={sourceX}
                sourceY={sourceY}
                onXChange={setSourceX}
                onYChange={setSourceY}
            />


            <p className="parameter-readout">
                Angular separation β:{" "}

                <strong>
                    {beta.toFixed(2)}
                </strong>

                {" "}arcsec
            </p>


            <LensVisualization
                sourceX={sourceX}
                sourceY={sourceY}
                sourceRadius={sourceRadius}
                thetaEinstein={thetaEinstein}
                colors={COLORS}
                onSourceChange={handleSourceChange}
            />

        </figure>
    );
}
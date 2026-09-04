import { useState, useMemo } from "react";
import { SourceControls } from "./SourceControls.jsx";
import { LensVisualization, VISUALIZATION_COLORS} from "./LensVisualization.jsx";
import {createDiskSamples, meanExtendedMagnification} from "../simulation/magnificationCurve.js";


export function MagnificationFigure() {

    const [displacement, setDisplacement] = useState(-5);

    const sourceRadius = 0.5;

    const thetaEinstein = 2.33;

    const sourceSamples = useMemo(() => createDiskSamples(sourceRadius), [sourceRadius]);

    const curve = useMemo(() => {
        const points = [];

        const steps = 160;

        for (let i = 0; i <= steps; i++) {

            const x = -5 + (10 * i / steps);

            points.push({
                x,
                y: meanExtendedMagnification(sourceSamples, x, thetaEinstein)
            });
        }

        return points;
    }, [sourceSamples, thetaEinstein]);

    return (
        <figure className="interactive-figure magnification-panels"
        style={{
                        "--source-color":
                            VISUALIZATION_COLORS.source,
        
                        "--projected-color":
                            VISUALIZATION_COLORS.projected,
        
                        "--lens-color":
                            VISUALIZATION_COLORS.lens
                    }}
        >

            <div className="source-controls">
                <div className="source-control">
                        <label htmlFor="Displacement">
                            Displacement of Source from Lens Center
                        </label>
                        
                        <div className="source-controls-inputs">
                            <input
                            id="Displacement"
                            type="range"
                            min="-5"
                            max="5"
                            step="0.1"
                            value={displacement}
                            onChange={(event) => setDisplacement(Number(event.target.value))}
                            />
                            <input
                            type="number"
                            min="-5"
                            max="5"
                            step="0.1"
                            value={displacement}
                            onChange={(event) => setDisplacement(Number(event.target.value))}
                            />
                        </div>
                    </div>
            </div>

            <LensVisualization
                sourceX={displacement}
                sourceY={0}
                sourceRadius={sourceRadius}
                thetaEinstein={thetaEinstein}
                onSourceChange={({x}) => setDisplacement(x)}
            />

            {/* <MagnificationPlot
                curve={curve}
                currentX={displacement}
            /> */}

        </figure>
    );
}
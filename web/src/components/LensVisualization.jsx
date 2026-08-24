import { useEffect, useRef } from "react";
import { imageProjections} from "../physics/imageProjections";
import { renderLensSystem } from "../rendering/lensCanvas";

const VISUALIZATION_COLORS = {
    background: "#05070a",
    source: "#f5b942",
    projected: "#b66cff",
    lens: "#ffffff",
    ring: "#6b7280",
    axes: "#64748b"
};

export function LensVisualization({sourceX, sourceY, sourcePoints, thetaEinstein, colors}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
          return;
        }

        const ctx = canvas.getContext("2d");

        const animationFrame = requestAnimationFrame(() => {
                const source = {
                    x: sourceX,
                    y: sourceY
                };

                const epsilon = 0.001;

                const aligned =
                    Math.hypot(
                        source.x,
                        source.y
                    ) < epsilon;

                renderLensSystem(
                    ctx,
                    canvas,
                    {
                        source,
                        sourcePoints,
                        thetaEinstein,
                        scale: 60,
                        aligned,
                        colors: VISUALIZATION_COLORS
                    }
                );
          });

          return () => {
            cancelAnimationFrame(animationFrame);
          };
        
    }, [sourceX, sourceY]);

    return (<div className="visualization"
                 style={{            
                        "--source-color":
                        VISUALIZATION_COLORS.source,

                        "--projected-color":
                            VISUALIZATION_COLORS.projected,

                        "--lens-color":
                            VISUALIZATION_COLORS.lens,

                        "--sky-color":
                            VISUALIZATION_COLORS.background}}
            >

                <canvas
                    ref={canvasRef}
                    className="lens-canvas"
                    width="800"
                    height="600"
                />

                <div className="visualization-legend">

                    <span>
                        <span
                            className="legend-marker source-marker"
                            aria-hidden="true"
                        />
                        Source
                    </span>

                    <span>
                        <span
                            className="legend-marker image-marker"
                            aria-hidden="true"
                        />
                        Projected image
                    </span>

                </div>

            </div>
        );
}
import { useEffect, useRef } from "react";
import { imageProjections} from "../physics/imageProjections";
import { renderLensSystem } from "../rendering/lensCanvas";

export function LensVisualization({sourceX, sourceY}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
          return;
        }

        const ctx = canvas.getContext("2d");

        const thetaEinstein = 1.33;

        const animationFrame = requestAnimationFrame(() => {
                const source = {
                    x: sourceX,
                    y: sourceY
                };

                const epsilon = 0.01;

                const aligned =
                    Math.hypot(
                        source.x,
                        source.y
                    ) < epsilon;

                const images =
                    aligned
                        ? null
                        : imageProjections(
                            source.x,
                            source.y,
                            thetaEinstein
                        );

                renderLensSystem(
                    ctx,
                    canvas,
                    {
                        source,
                        images,
                        thetaEinstein,
                        scale: 60,
                        aligned
                    }
                );
          });

          return () => {
            cancelAnimationFrame(animationFrame);
          };
        
    }, [sourceX, sourceY]);

    return (<canvas
                ref={canvasRef}
                width="800"
                height="600"
            />);
}
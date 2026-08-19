import { useEffect, useRef, useState } from "react";

import { imageProjections} from "./physics/imageProjections.js";

import { renderLensSystem } from "./rendering/lensCanvas.js";


function App() {
    const canvasRef = useRef(null);

    const [sourceX, setSourceX] = useState(0);
    const [sourceY, setSourceY] = useState(0);

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

                const thetaEinstein = 1.33;

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

    return (
        <main>
            <h1>
                Gravitational Lensing Explorer
            </h1>

            <section className="source-controls">

              <div className="source-control">
                <label htmlFor="source-x">
                    Source X
                </label>
                
                <div className="source-controls-inputs">
                  <input
                    id="source-x"
                    type="range"
                    min="-5"
                    max="5"
                    step="0.1"
                    value={sourceX}
                    onChange={(event) =>
                        setSourceX(
                            Number(event.target.value)
                        )
                    }
                  /> 
                  <input
                    type="number"
                    min="-5"
                    max="5"
                    step="0.01"
                    value={sourceX}
                    onChange={(event) =>
                        setSourceX(
                            Number(event.target.value)
                        )
                    }
                  />
                </div>
                
              </div>

              <div className="source-control">
                  <label htmlFor="source-y">
                      Source Y
                  </label>

                  <div className="source-controls-inputs">
                    <input
                        id="source-y"
                        type="range"
                        min="-5"
                        max="5"
                        step="0.1"
                        value={sourceY}
                        onChange={(event) =>
                            setSourceY(
                                Number(event.target.value)
                            )
                        }
                    />
                    <input
                        type="number"
                        min="-5"
                        max="5"
                        step="0.1"
                        value={sourceY}
                        onChange={(event) =>
                            setSourceY(
                                Number(event.target.value)
                            )
                        }
                    />
                  </div>
              </div>
            </section>

            <canvas
                ref={canvasRef}
                width="800"
                height="600"
            />
        </main>
    );
}

export default App;
import { useEffect, useRef, useState } from "react";
import { imageProjections} from "../physics/imageProjections";
import { renderLensSystem, canvasToWorld, worldToCanvas } from "../rendering/lensCanvas";

const VISUALIZATION_COLORS = {
    background: "#05070a",
    source: "#f5b942",
    projected: "#b66cff",
    lens: "#d1d5db",
    ring: "#6b7280",
    axes: "#64748b"
};

export function LensVisualization({sourceX, sourceY, sourcePoints, thetaEinstein, sourceRadius, onSourceChange}) {
    const canvasRef = useRef(null);

    const draggingRef = useRef(false);

    const dragOffsetRef = useRef({x: 0, y: 0});

    const [isDragging, setIsDragging] = useState(false);


    function getPointerPosition(event, canvas) {
        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        return {
            x: (event.clientX - rect.left) * scaleX,
            y: (event.clientY - rect.top) * scaleY
        };
    }

    function handlePointerDown(event) {
        const canvas = canvasRef.current;

        if(!canvas) {
            return;
        }

        const pointerCanvas = getPointerPosition(event, canvas);

        const pointerWorld = canvasToWorld(pointerCanvas.x, pointerCanvas.y, canvas.width, canvas.height, 60);

        const distanceFromSource = Math.hypot(pointerWorld.x - sourceX, pointerWorld.y - sourceY);

        const hitPadding = 0.25;

        if(distanceFromSource > sourceRadius + hitPadding) {
            return;
        }

        draggingRef.current = true;

        setIsDragging(true);

        dragOffsetRef.current = {
            x: pointerWorld.x - sourceX,
            y: pointerWorld.y - sourceY
        };

        event.currentTarget.setPointerCapture(event.pointerId);
    }

    function handlePointerMove(event) {
        if (!draggingRef.current) {
            return;
        }
        
        const canvas = canvasRef.current;

        const pointerCanvas = getPointerPosition(event, canvas);

        const pointerWorld = canvasToWorld(pointerCanvas.x, pointerCanvas.y, canvas.width, canvas.height, 60);

        let x = pointerWorld.x - dragOffsetRef.current.x;
        let y = pointerWorld.y - dragOffsetRef.current.y;

        const CENTER_SNAP = 0.05;

        if (Math.hypot(x, y) < CENTER_SNAP){
            x = 0;
            y = 0;
        }

        onSourceChange({x, y});

    }

    function handlePointerUp(event) {
        draggingRef.current = false;

        setIsDragging(false);

        if(event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    }

    function handlePointerCancel() {
        draggingRef.current = false;
        setIsDragging(false);
    }

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
                    className={isDragging ? "lens-canvas dragging" : "lens-canvas"}
                    width="800"
                    height="600"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerCancel}
                    aria-label="Interactive gravitational lensing visualization. Drag the source or use the source position controls."
                />

                <div className="visualization-legend">

                    <span className="legend-item">
                        <span
                            className="legend-marker legend-source"
                            aria-hidden="true"
                        />
                        Source
                    </span>

                    <span className="legend-item">
                        <span
                            className="legend-marker legend-projected"
                            aria-hidden="true"
                        />
                        Projected image
                    </span>

                    <span className="legend-item">
                        <span
                            className="legend-marker legend-lens"
                            aria-hidden="true"
                        />
                        Lens position
                    </span>

                </div>

            </div>
        );
}
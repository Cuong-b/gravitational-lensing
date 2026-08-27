import { useEffect, useRef, useState } from "react";
import { renderLensSystem, canvasToWorld, prepareCanvas, getWorldScale } from "../rendering/lensCanvas";
import { projectCircularSource } from "../simulation/projectCircularSource";

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

    const [canvasSize, setCanvasSize] = useState({width: 0, height: 0});

    function pointerToWorld(event) {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        const pointerX = event.clientX - rect.left;
        const pointerY = event.clientY - rect.top;

        const scale = getWorldScale(rect.width, rect.height);

        return canvasToWorld(pointerX, pointerY, rect.width, rect.height, scale);
    }

    function getPointerPosition(event, canvas) {
        const rect = canvas.getBoundingClientRect();

        return {
            x: (event.clientX - rect.left),
            y: (event.clientY - rect.top)
        };
    }

    function handlePointerDown(event) {
        const canvas = canvasRef.current;

        if(!canvas) {
            return;
        }

        const pointerWorld = pointerToWorld(event);

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

        const pointerWorld = pointerToWorld(event);

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

        const observer = new ResizeObserver(([entry]) => {
            setCanvasSize({width: entry.contentRect.width, height: entry.contentRect.height});
        });

        observer.observe(canvas);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
          return;
        }

        if (canvasSize.width === 0 || canvasSize.height === 0){
            return;
        }

        const {ctx, width, height} = prepareCanvas(canvas, canvasSize);

        const animationFrame = requestAnimationFrame(() => {
                const source = {
                    x: sourceX,
                    y: sourceY,
                    radius: sourceRadius
                };

                const projection = projectCircularSource({sourceX, sourceY, sourceRadius, thetaEinstein, segments: 2048});

                renderLensSystem(
                    ctx,
                    {
                        width,
                        height
                    },
                    {
                        source,
                        sourcePoints,
                        thetaEinstein,
                        projection,
                        colors: VISUALIZATION_COLORS
                    }
                );
          });

          return () => {
            cancelAnimationFrame(animationFrame);
          };
        
    }, [sourceX, sourceY, sourceRadius, thetaEinstein, canvasSize.width, canvasSize.height]);

    return (<div className="visualization">

                <div className="canvas-container">
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
                </div>

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
import { useEffect, useRef } from "react";

import { imageProjections} from "./physics/imageProjections.js";

import { renderLensSystem } from "./rendering/lensCanvas.js";


function App() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const source = {
            x: 1,
            y: 0.5
        };

        const thetaEinstein = 2.33;

        const images =
            imageProjections(
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
                scale: 60
            }
        );
    }, []);

    return (
        <main>
            <h1>
                Gravitational Lensing Explorer
            </h1>

            <canvas
                ref={canvasRef}
                width="800"
                height="600"
            />
        </main>
    );
}

export default App;
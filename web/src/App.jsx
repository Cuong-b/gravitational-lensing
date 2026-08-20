import { useState } from "react";

import { LensVisualization } from "./components/LensVisualization.jsx";

import { SourceControls } from "./components/SourceControls.jsx";

import "./App.css";


function App() {

    const [sourceX, setSourceX] = useState(0);
    const [sourceY, setSourceY] = useState(0);

    function handleSourceXChange(event){
      setSourceX(
        Number(event.target.value)
      );
    }

    function handleSourceYChange(event){
      setSourceY(
        Number(event.target.value)
      );
    }


    return (
        <main>
            <h1>
                Gravitational Lensing Explorer
            </h1>

            <SourceControls
            sourceX = {sourceX}
            sourceY = {sourceY}
            onXChange = {handleSourceXChange}
            onYChange = {handleSourceYChange}
            />

            <LensVisualization
              sourceX={sourceX}
              sourceY={sourceY}
            />
        </main>
    );
}

export default App;
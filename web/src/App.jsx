import { useState } from "react";
import { MulitpleImagingSection } from "./components/MultipleImagingSection"; 
import {EinsteinRingsSection} from "./components/EinsteinRingsSection";
import { MagnificationSection } from "./components/MagnificationSection";
import { IntroSection } from "./components/IntroSection";

import "./App.css";


function App() {

    return (
            <main className="lesson">

                <header className="lesson-header">

                    <h1>
                        Gravitational Lensing
                    </h1>

                    <p className="lesson-introduction">
                        An interactive exploration of how massive
                        objects distort the paths of light.
                    </p>

                </header>

                <IntroSection />

                <EinsteinRingsSection />

                <MulitpleImagingSection />

                <MagnificationSection />

            </main>
    );
}

export default App;
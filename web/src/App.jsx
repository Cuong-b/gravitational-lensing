import { useState } from "react";

import { MulitpleImagingSection } from "./components/MultipleImagingSection"; 

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

                <MulitpleImagingSection />

            </main>
    );
}

export default App;
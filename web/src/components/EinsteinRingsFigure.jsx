import {useState} from "react";
import {einsteinRadius} from "../physics/einsteinRadius.js";

export function EinsteinRingsFigure() {
    const [logMass, setLogMass] = useState(12);

    const [logDL, setLogDL] = useState(9);

    const [logDLS, setLogDLS] = useState(9.3);

    const mass = 10 ** logMass;
    const dL = 10 ** logDL;
    const dLS = 10 ** logDLS;

    const { arcseconds } = einsteinRadius(mass, dL, dLS);

    return (
        <figure className="interactive-figure">
            <section className="source-controls">

                <div className="source-control">
                    <label htmlFor="Log-Mass">
                        Log(Mass) [Log M☉]
                    </label>

                    <span>
                        Mass = {mass.toExponential(2)} M☉
                    </span>
                    
                    <div className="source-controls-inputs">
                        <input
                        id="Log-Mass"
                        type="range"
                        min="6"
                        max="12.5"
                        step="0.1"
                        value={logMass}
                        onChange={(event) => setLogMass(Number(event.target.value))}
                        />
                        <input
                        type="number"
                        min="6"
                        max="12.5"
                        step="0.01"
                        value={logMass}
                        onChange={(event) => setLogMass(Number(event.target.value))}
                        />
                    </div>
                </div>
                <div className="source-control">
                    <label htmlFor="Log-Dl">
                        Log(D_l) [Log parsecs]
                    </label>

                    <span>
                        D_l = {dL.toExponential(2)} parsecs
                    </span>

                    <div className="source-controls-inputs">
                        <input
                        id="Log-Dl"
                        type="range"
                        min="9"
                        max="10"
                        step="0.05"
                        value={logDL}
                        onChange={(event) => setLogDL(Number(event.target.value))}
                        />
                        <input
                        type="number"
                        min="9"
                        max="10"
                        step="0.05"
                        value={logDL}
                        onChange={(event) => setLogDL(Number(event.target.value))}
                        />
                    </div>
                </div>
                <div className="source-control">
                    <label htmlFor="Log-Dls">
                        Log(D_ls) [Log parsecs]
                    </label>

                    <span>
                        D_ls = {dLS.toExponential(2)} parsecs
                    </span>

                    <div className="source-controls-inputs">
                        <input
                        id="Log-Dls"
                        type="range"
                        min="9"
                        max="10"
                        step="0.05"
                        value={logDLS}
                        onChange={(event) => setLogDLS(Number(event.target.value))}
                        />
                        <input
                        type="number"
                        min="9"
                        max="10"
                        step="0.05"
                        value={logDLS}
                        onChange={(event) => setLogDLS(Number(event.target.value))}
                        />
                    </div>
                    
                </div>
            </section>
        </figure>
    );


}

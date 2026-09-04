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
                    <span>
                        Einstein Radius = {arcseconds.toExponential(2)} arcseconds
                    </span>
                </div>
            </section>

            <div className="figure-panels">

                <EinsteinGeometry
                    dL={dL}
                    dLS={dLS}
                    thetaEinstein={arcseconds}
                />

                <EinsteinRingPreview
                    thetaEinstein={arcseconds}
                />

            </div>


        </figure>
    );
}

function EinsteinGeometry({dL, dLS, thetaEinstein}) {
    const sourceX = 90;
    const observerX = 10;

    const lensFraction = dL / (dL + dLS);

    const lensX = observerX + lensFraction * (sourceX - observerX);

    const projectedY = Math.tan((thetaEinstein / 3600) * Math.PI / 180) *(sourceX - observerX);

    console.log("lensX", lensX, "projectedY", projectedY);

    return ( 
        <svg viewBox="0 0 100 100" className="einstein-preview">
            <rect
                x="0"
                y="0"
                width = "100%" 
                height = "100%" 
                fill = "black" 
            />

            <circle
                cx = {sourceX}
                cy = "50"
                r = ".75"
                fill = "#b3f7fb"
                stroke = "#b3f7fb"
                strokeWidth = ".25"
            />

            <circle
                cx = {sourceX}
                cy = {projectedY}
                r = ".75"
                fill = "#b3f7fb"
                stroke = "#b3f7fb"
                strokeWidth = ".25"
            />

            <circle
                cx = {observerX}
                cy = "50"
                r = ".75"
                fill = "#ec7979"
                stroke = "#ec7979"
                strokeWidth = ".25"
            />

            <circle
                cx = {lensX}
                cy = "50"
                r = ".75"
                fill = "#f4f4f4"
                stroke = "#f4f4f4"
                strokeWidth = ".25"
            />
        </svg>
    );
}

function EinsteinRingPreview({thetaEinstein}) {
    return (
        <svg viewBox="-5 -5 10 10" className="einstein-preview">

            <rect
                x="-5"
                y="-5"
                width = "100%" 
                height = "100%" 
                fill = "black" 
            />

            <circle
                cx="0"
                cy="0"
                r={thetaEinstein}
                fill="none"
                stroke="#b3f7fb"
                strokeWidth="0.06"
            />

            <circle
                cx="0"
                cy="0"
                r="0.04"
                strokeWidth = "0.02"
                stroke = "#fff1a5"
            />
        </svg>
    );
}
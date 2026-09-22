import { useState } from "react";
import { einsteinRadius } from "../physics/einsteinRadius.js";

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
      <figcaption
        className="
                            interactive-figure-header
                        "
      >
        <div>
          <h3>Explore Einstein Rings</h3>

          <p>
            Move the sliders to change the mass of the lens, observer-lens distance, and source-lens
            distance. Observer how changing these parameters affect the angular size of the Einstein
            rings.
          </p>
        </div>
      </figcaption>

      <section className="source-controls einstein-controls-row">
        <div className="source-control">
          <div className="source-control-label-row">
            <label htmlFor="Log-Mass">Log(Mass) [Log M☉]</label>
            <span>Mass = {mass.toExponential(2)} M☉</span>
          </div>

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
          <div className="source-control-label-row">
            <label htmlFor="Log-Dl">Log(D_l) [Log parsecs]</label>
            <span>D_l = {dL.toExponential(2)} parsecs</span>
          </div>

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
          <div className="source-control-label-row">
            <label htmlFor="Log-Dls">Log(D_ls) [Log parsecs]</label>
            <span>D_ls = {dLS.toExponential(2)} parsecs</span>
          </div>

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

      <p className="parameter-readout">
        Einstein Radius = <strong>{arcseconds.toExponential(2)}</strong> arcseconds
      </p>

      <div className="figure-panels">
        <EinsteinGeometry dL={dL} dLS={dLS} thetaEinstein={arcseconds} />

        <EinsteinRingPreview thetaEinstein={arcseconds} />
      </div>
    </figure>
  );
}

function EinsteinGeometry({ dL, dLS, thetaEinstein }) {
  const sourceX = 90;
  const observerX = 10;
  const axisY = 50;

  const lensFraction = dL / (dL + dLS);

  const lensX = observerX + lensFraction * (sourceX - observerX);

  // thetaEinstein is a real angle (fractions of an arcsecond to a few
  // arcseconds), so its true tangent is many orders of magnitude too
  // small to place on the same 0-100 axis as the schematic observer/
  // lens/source layout above. The vertical offset is exaggerated by a
  // fixed visual factor, and clamped, purely so the projected image is
  // legible and visibly responds to the sliders.
  const VISUAL_EXAGGERATION = 6;
  const maxOffset = axisY - 10;

  const projectedOffset = Math.min(thetaEinstein * VISUAL_EXAGGERATION, maxOffset);

  const projectedY = axisY - projectedOffset;

  return (
    <svg viewBox="0 0 100 100" className="einstein-preview">
      <rect x="0" y="0" width="100%" height="100%" fill="black" />

      <circle cx={sourceX} cy={axisY} r=".75" fill="#b3f7fb" stroke="#b3f7fb" strokeWidth=".25" />

      <circle
        cx={sourceX}
        cy={projectedY}
        r=".75"
        fill="#b3f7fb"
        stroke="#b3f7fb"
        strokeWidth=".25"
      />

      <circle cx={observerX} cy={axisY} r=".75" fill="#ec7979" stroke="#ec7979" strokeWidth=".25" />

      <circle cx={lensX} cy={axisY} r=".75" fill="#f4f4f4" stroke="#f4f4f4" strokeWidth=".25" />
    </svg>
  );
}

function EinsteinRingPreview({ thetaEinstein }) {
  return (
    <svg viewBox="-5 -5 10 10" className="einstein-preview">
      <rect x="-5" y="-5" width="100%" height="100%" fill="black" />

      <circle cx="0" cy="0" r={thetaEinstein} fill="none" stroke="#b3f7fb" strokeWidth="0.06" />

      <circle cx="0" cy="0" r="0.04" strokeWidth="0.02" stroke="#fff1a5" />
    </svg>
  );
}

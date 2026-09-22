import { useState } from "react";
import { einsteinRadius } from "../physics/einsteinRadius.js";
import { VISUALIZATION_COLORS } from "./LensVisualization.jsx";

const MASS_RANGE = { min: 6, max: 12.5, step: 0.1 };
const DL_RANGE = { min: 9, max: 10, step: 0.05 };
const DLS_RANGE = { min: 9, max: 10, step: 0.05 };

// Largest Einstein radius reachable by the sliders above (biggest mass,
// closest lens, farthest source). Used to normalize the geometric view's
// projected-image offset so it spans the display regardless of how small
// thetaEinstein is in absolute terms.
const MAX_THETA_ARCSEC = einsteinRadius(
  10 ** MASS_RANGE.max,
  10 ** DL_RANGE.min,
  10 ** DLS_RANGE.max,
).arcseconds;

const EINSTEIN_COLORS = {
  observer: "#f87171",
  source: VISUALIZATION_COLORS.source,
  lens: VISUALIZATION_COLORS.lens,
  projected: VISUALIZATION_COLORS.projected,
  annotation: VISUALIZATION_COLORS.axes,
};

export function EinsteinRingsFigure() {
  const [logMass, setLogMass] = useState(12);

  const [logDL, setLogDL] = useState(9);

  const [logDLS, setLogDLS] = useState(9.3);

  const mass = 10 ** logMass;
  const dL = 10 ** logDL;
  const dLS = 10 ** logDLS;

  const { arcseconds } = einsteinRadius(mass, dL, dLS);

  return (
    <figure
      className="interactive-figure"
      style={{
        "--observer-color": EINSTEIN_COLORS.observer,
        "--source-color": EINSTEIN_COLORS.source,
        "--lens-color": EINSTEIN_COLORS.lens,
        "--projected-color": EINSTEIN_COLORS.projected,
      }}
    >
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
              min={MASS_RANGE.min}
              max={MASS_RANGE.max}
              step={MASS_RANGE.step}
              value={logMass}
              onChange={(event) => setLogMass(Number(event.target.value))}
            />
            <input
              type="number"
              min={MASS_RANGE.min}
              max={MASS_RANGE.max}
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
              min={DL_RANGE.min}
              max={DL_RANGE.max}
              step={DL_RANGE.step}
              value={logDL}
              onChange={(event) => setLogDL(Number(event.target.value))}
            />
            <input
              type="number"
              min={DL_RANGE.min}
              max={DL_RANGE.max}
              step={DL_RANGE.step}
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
              min={DLS_RANGE.min}
              max={DLS_RANGE.max}
              step={DLS_RANGE.step}
              value={logDLS}
              onChange={(event) => setLogDLS(Number(event.target.value))}
            />
            <input
              type="number"
              min={DLS_RANGE.min}
              max={DLS_RANGE.max}
              step={DLS_RANGE.step}
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

      <div className="visualization-legend">
        <span className="legend-item">
          <span className="legend-marker legend-observer" aria-hidden="true" />
          Observer
        </span>

        <span className="legend-item">
          <span className="legend-marker legend-source" aria-hidden="true" />
          Source
        </span>

        <span className="legend-item">
          <span className="legend-marker legend-lens" aria-hidden="true" />
          Lens position
        </span>

        <span className="legend-item">
          <span className="legend-marker legend-projected" aria-hidden="true" />
          Projected image
        </span>
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
  // lens/source layout above. A sqrt scale (rather than linear) maps it
  // onto the offset instead: thetaEinstein spans several orders of
  // magnitude across the sliders' range, so a linear map would leave the
  // projected point pinned near the axis except at the very highest
  // mass values. sqrt spreads mid-range and small values out too, so the
  // point visibly covers most of the panel's height across the sliders'
  // usable range instead of leaving it mostly empty.
  const maxOffset = axisY - 10;

  const normalizedOffset = Math.min(Math.sqrt(thetaEinstein / MAX_THETA_ARCSEC), 1);

  const projectedOffset = normalizedOffset * maxOffset;

  const projectedY = axisY - projectedOffset;

  // The distance brackets sit below the observer/lens/source row, in the
  // space the projected point never occupies (it only ever moves upward
  // from axisY), so they stay clear of it at every slider position.
  const bracketY = axisY + 14;

  return (
    <svg viewBox="0 0 100 100" className="einstein-preview">
      <rect x="0" y="0" width="100%" height="100%" fill="black" />

      <DistanceBracket x1={observerX} x2={lensX} y={bracketY} label="D_l" />
      <DistanceBracket x1={lensX} x2={sourceX} y={bracketY} label="D_ls" />

      {/*
        Apparent line of sight from the observer: solid up to the lens
        (the real, unbent view), then dotted onward to the projected
        image position (the apparent direction, extrapolated straight
        past the lens rather than the light's true bent path).
      */}
      <line
        x1={observerX}
        y1={axisY}
        x2={lensX}
        y2={axisY}
        stroke={EINSTEIN_COLORS.annotation}
        strokeWidth=".3"
      />

      <line
        x1={lensX}
        y1={axisY}
        x2={sourceX}
        y2={projectedY}
        stroke={EINSTEIN_COLORS.annotation}
        strokeWidth=".3"
        strokeDasharray="0.3 1.2"
        strokeLinecap="round"
      />

      <circle
        cx={sourceX}
        cy={axisY}
        r=".75"
        fill={EINSTEIN_COLORS.source}
        stroke={EINSTEIN_COLORS.source}
        strokeWidth=".25"
      />

      <circle
        cx={sourceX}
        cy={projectedY}
        r=".75"
        fill={EINSTEIN_COLORS.projected}
        stroke={EINSTEIN_COLORS.projected}
        strokeWidth=".25"
      />

      <circle
        cx={observerX}
        cy={axisY}
        r=".75"
        fill={EINSTEIN_COLORS.observer}
        stroke={EINSTEIN_COLORS.observer}
        strokeWidth=".25"
      />

      <circle
        cx={lensX}
        cy={axisY}
        r=".75"
        fill={EINSTEIN_COLORS.lens}
        stroke={EINSTEIN_COLORS.lens}
        strokeWidth=".25"
      />
    </svg>
  );
}

function DistanceBracket({ x1, x2, y, label }) {
  const tickHalfHeight = 1.5;
  const midX = (x1 + x2) / 2;
  const color = EINSTEIN_COLORS.annotation;

  return (
    <g stroke={color} strokeWidth=".3">
      <line x1={x1} y1={y - tickHalfHeight} x2={x1} y2={y + tickHalfHeight} />
      <line x1={x2} y1={y - tickHalfHeight} x2={x2} y2={y + tickHalfHeight} />
      <line x1={x1} y1={y} x2={x2} y2={y} />

      <text x={midX} y={y + 6} textAnchor="middle" fill={color} stroke="none" fontSize="4.5">
        {label}
      </text>
    </g>
  );
}

function EinsteinRingPreview({ thetaEinstein }) {
  return (
    <svg viewBox="-5 -5 10 10" className="einstein-preview">
      <rect x="-5" y="-5" width="100%" height="100%" fill="black" />

      <circle
        cx="0"
        cy="0"
        r={thetaEinstein}
        fill="none"
        stroke={EINSTEIN_COLORS.projected}
        strokeWidth="0.06"
      />

      <circle cx="0" cy="0" r="0.04" strokeWidth="0.02" stroke={EINSTEIN_COLORS.lens} />
    </svg>
  );
}

import { useMemo, useState } from "react";

import { LensVisualization, VISUALIZATION_COLORS } from "./LensVisualization.jsx";

import { MagnificationPlot } from "./MagnificationPlot.jsx";

import { createDiskSamples, meanExtendedMagnification } from "../simulation/magnificationCurve.js";

export function MagnificationFigure() {
  const [displacement, setDisplacement] = useState(-5);

  const sourceRadius = 0.5;

  const thetaEinstein = 2.33;

  const sourceSamples = useMemo(() => createDiskSamples(sourceRadius), [sourceRadius]);

  /*
   * Full curve is independent of the
   * current slider position, so calculate
   * it once.
   */
  const curve = useMemo(() => {
    const points = [];

    const steps = 160;

    for (let i = 0; i <= steps; i++) {
      const x = -5 + (10 * i) / steps;

      points.push({
        x,

        y: meanExtendedMagnification(sourceSamples, x, thetaEinstein),
      });
    }

    return points;
  }, [sourceSamples, thetaEinstein]);

  /*
   * Only this one value needs to update
   * while the slider moves.
   */
  const currentMagnification = useMemo(
    () => meanExtendedMagnification(sourceSamples, displacement, thetaEinstein),
    [sourceSamples, displacement, thetaEinstein],
  );

  function updateDisplacement(value) {
    const clamped = Math.max(-5, Math.min(5, value));

    setDisplacement(clamped);
  }

  return (
    <figure
      className="
                interactive-figure
                magnification-figure
            "
      style={{
        "--source-color": VISUALIZATION_COLORS.source,

        "--projected-color": VISUALIZATION_COLORS.projected,

        "--lens-color": VISUALIZATION_COLORS.lens,
      }}
    >
      <figcaption
        className="
                    interactive-figure-header
                    magnification-figure-header
                "
      >
        <div>
          <h3>Explore Magnification</h3>

          <p>
            Move the source horizontally past the lens and compare its lensed image with the
            resulting magnification.
          </p>
        </div>
      </figcaption>

      <div className="magnification-control">
        <label htmlFor="magnification-displacement">Horizontal source displacement</label>

        <div className="magnification-control-row">
          <input
            id="magnification-displacement"
            type="range"
            min="-5"
            max="5"
            step="0.1"
            value={displacement}
            onChange={(event) => updateDisplacement(Number(event.target.value))}
          />

          <input
            type="number"
            min="-5"
            max="5"
            step="0.1"
            value={displacement}
            onChange={(event) => updateDisplacement(Number(event.target.value))}
          />
        </div>
      </div>

      <div className="magnification-stack">
        <section className="magnification-lens-panel">
          <div className="figure-panel-heading">
            <h4>Lensed Image</h4>

            <span>θE = {thetaEinstein.toFixed(2)} arcsec</span>
          </div>

          <LensVisualization
            sourceX={displacement}
            sourceY={0}
            sourceRadius={sourceRadius}
            thetaEinstein={thetaEinstein}
            worldExtentX={6}
            worldExtentY={3}
            showLegend={false}
            onSourceChange={({ x }) => updateDisplacement(x)}
          />

          <div className="magnification-legend">
            <span className="legend-item">
              <span
                className="
                                    legend-marker
                                    legend-source
                                "
              />
              Source
            </span>

            <span className="legend-item">
              <span
                className="
                                    legend-marker
                                    legend-projected
                                "
              />
              Projected image
            </span>

            <span className="legend-item">
              <span
                className="
                                    legend-marker
                                    legend-lens
                                "
              />
              Lens position
            </span>
          </div>
        </section>

        <MagnificationPlot
          curve={curve}
          currentX={displacement}
          currentMagnification={currentMagnification}
        />
      </div>
    </figure>
  );
}

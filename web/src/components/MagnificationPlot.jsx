import { useEffect, useRef, useState } from "react";

function makePath(points, xScale, yScale) {
  if (points.length === 0) {
    return "";
  }

  return points
    .map((point, index) => {
      const command = index === 0 ? "M" : "L";

      return `${command} ` + `${xScale(point.x)} ` + `${yScale(point.y)}`;
    })
    .join(" ");
}

export function MagnificationPlot({ curve, currentX, currentMagnification }) {
  const containerRef = useRef(null);

  const [width, setWidth] = useState(0);

  /*
   * Measure the actual available width.
   *
   * Unlike using one fixed SVG viewBox,
   * this lets text remain readable on both
   * phones and desktop displays.
   */
  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    function updateWidth() {
      setWidth(container.getBoundingClientRect().width);
    }

    updateWidth();

    const observer = new ResizeObserver(updateWidth);

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const safeCurve = curve.filter(
    (point) => Number.isFinite(point.x) && Number.isFinite(point.y),
  );

  const compact = width < 520;

  const height = compact ? 220 : 260;

  const margin = compact
    ? { top: 16, right: 12, bottom: 46, left: 46 }
    : { top: 18, right: 20, bottom: 48, left: 58 };

  const plotWidth = Math.max(1, width - margin.left - margin.right);

  const plotHeight = height - margin.top - margin.bottom;

  const xMin = -5;
  const xMax = 5;

  /*
   * Unlensed magnification tends toward 1,
   * so 1 is a useful visual baseline.
   */
  const yMin = 1;

  const curveMaximum = Math.max(
    currentMagnification,
    ...safeCurve.map((point) => point.y),
  );

  const yMax = Math.max(2, Math.ceil(curveMaximum + 0.5));

  function xScale(x) {
    return margin.left + ((x - xMin) / (xMax - xMin)) * plotWidth;
  }

  function yScale(y) {
    return margin.top + (1 - (y - yMin) / (yMax - yMin)) * plotHeight;
  }

  const fullPath = makePath(safeCurve, xScale, yScale);

  /*
   * Highlight the portion that the user
   * has already traversed from -5 to the
   * current slider position.
   */
  const activeCurve = safeCurve.filter((point) => point.x <= currentX);

  activeCurve.push({
    x: currentX,
    y: currentMagnification,
  });

  const activePath = makePath(activeCurve, xScale, yScale);

  const xTicks = compact ? [-5, 0, 5] : [-5, -2.5, 0, 2.5, 5];

  const yTicks = Array.from(
    { length: 5 },
    (_, index) => yMin + ((yMax - yMin) * index) / 4,
  );

  return (
    <section className="magnification-plot" aria-label="Magnification curve">
      <div className="magnification-plot-header">
        <h4>Mean Magnification</h4>

        <span>X = {currentMagnification.toFixed(2)}×</span>
      </div>

      <div ref={containerRef} className="magnification-plot-canvas">
        {width > 0 && (
          <svg
            width={width}
            height={height}
            role="img"
            aria-label={
              `Mean magnification versus horizontal displacement. ` +
              `Current magnification ${currentMagnification.toFixed(2)}.`
            }
          >
            {/* horizontal grid */}

            {yTicks.map((tick) => (
              <line
                key={`grid-${tick}`}
                x1={margin.left}
                x2={margin.left + plotWidth}
                y1={yScale(tick)}
                y2={yScale(tick)}
                className="magnification-grid-line"
              />
            ))}

            {/* axes */}

            <line
              x1={margin.left}
              x2={margin.left}
              y1={margin.top}
              y2={margin.top + plotHeight}
              className="magnification-axis"
            />

            <line
              x1={margin.left}
              x2={margin.left + plotWidth}
              y1={margin.top + plotHeight}
              y2={margin.top + plotHeight}
              className="magnification-axis"
            />

            {/* full curve */}

            <path d={fullPath} className="magnification-curve-full" />

            {/* traversed portion */}

            <path d={activePath} className="magnification-curve-active" />

            {/* current displacement */}

            <line
              x1={xScale(currentX)}
              x2={xScale(currentX)}
              y1={margin.top}
              y2={margin.top + plotHeight}
              className="magnification-current-line"
            />

            <circle
              cx={xScale(currentX)}
              cy={yScale(currentMagnification)}
              r="5"
              className="magnification-current-point"
            />

            {/* x ticks */}

            {xTicks.map((tick) => (
              <g key={`x-${tick}`}>
                <line
                  x1={xScale(tick)}
                  x2={xScale(tick)}
                  y1={margin.top + plotHeight}
                  y2={margin.top + plotHeight + 5}
                  className="magnification-axis"
                />

                <text
                  x={xScale(tick)}
                  y={margin.top + plotHeight + 20}
                  textAnchor="middle"
                  className="magnification-tick"
                >
                  {tick}
                </text>
              </g>
            ))}

            {/* y ticks */}

            {yTicks.map((tick) => (
              <text
                key={`y-${tick}`}
                x={margin.left - 8}
                y={yScale(tick) + 4}
                textAnchor="end"
                className="magnification-tick"
              >
                {tick.toFixed(1)}
              </text>
            ))}

            <text
              x={margin.left + plotWidth / 2}
              y={height - 7}
              textAnchor="middle"
              className="magnification-axis-label"
            >
              Horizontal displacement (arcsec)
            </text>

            <text
              transform={`translate(14 ${
                margin.top + plotHeight / 2
              }) rotate(-90)`}
              textAnchor="middle"
              className="magnification-axis-label"
            >
              Magnification
            </text>
          </svg>
        )}
      </div>
    </section>
  );
}

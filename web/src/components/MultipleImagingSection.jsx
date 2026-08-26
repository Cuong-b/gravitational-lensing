import { useState, useMemo } from "react";

import { SourceControls } from "./SourceControls";

import { LensVisualization } from "./LensVisualization";

import { generateSourcePoints } from "../simulation/generateSource";

import { Equation } from "./Equation";

export function MulitpleImagingSection() {
    
    const [sourceX, setSourceX] = useState(0);
    const [sourceY, setSourceY] = useState(0);

    const thetatEinstein = 2.33;

    const sourcePoints = useMemo(() => generateSourcePoints(6000, 0.5), []);

    const beta = Math.hypot(sourceX, sourceY);

    const SOURCE_LIMIT = 5;

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    function handleSourceChange({x, y}) {
        const clampedX = clamp(x, -SOURCE_LIMIT, SOURCE_LIMIT);
        const clampedY = clamp(y, -SOURCE_LIMIT, SOURCE_LIMIT);

        setSourceX(clampedX);
        setSourceY(clampedY);
    }

    function handleSourceXChange(value){
      setSourceX(value);
    }

    function handleSourceYChange(value){
      setSourceY(value);
    }

    return(<section className="lesson-section">

                    <h2>
                        Multiple Imaging
                    </h2>

                    <p>
                        In cases where the source, lens, and observer are not aligned
                         with one another, multiple images can be projected by the lens.
                    </p>

                    <p>
                        Given an angular separation <Equation inline>{String.raw`\beta`}</Equation> between the the lens and the
                         source with respects to the observer, we can solve for the 
                         angles, <Equation inline>{String.raw`\theta_+`}</Equation> and <Equation inline>{String.raw`\theta_-`}</Equation>, where the projections of the source would appear.
                    </p>

                    <h3>Deriving the lens equation</h3>

                    <p>
                        To solve for  <Equation inline>{String.raw`\theta_{\pm}`}</Equation> , we first notice in the figure above the following relation:
                    </p>

                    <Equation>
                        {String.raw`\overline{AB} + \overline{BC} = \overline{AC}`}
                    </Equation>

                    <p>
                        Assuming small angles, the above equation can be written as:
                    </p>

                    <Equation>
                        {String.raw`D_s\beta + D_{ls}\alpha = D_s\theta`}
                    </Equation>

                    <aside className="lesson-note">
                        Note: Here we wrote <Equation inline>{String.raw`\theta`}</Equation> instead of <Equation inline>{String.raw`\theta_+`}</Equation>
                         as the end result will give us both <Equation inline>{String.raw`\theta_+`}</Equation> and <Equation inline>{String.raw`\theta_-`}</Equation>
                    </aside>

                    <p>
                        Recalling the light-deflection relation <Equation inline>{String.raw`\alpha = \frac{4GM}{c^2b} = (\frac{4GM}{c^2})\frac{1}{\theta_ED_l}`}</Equation>,
                        we can solve for <Equation inline>{String.raw`\beta`}</Equation> and substitute <Equation inline>{String.raw`\alpha`}</Equation>,
                    </p>

                    <Equation>
                        {String.raw`\beta = \theta - \frac{D_{ls}}{D_s}\alpha = \theta - \frac{D_{ls}}{D_s}\Bigg(\frac{4GM}{c^2}\Bigg)\frac{1}{\theta_ED_l}`}
                    </Equation>

                    <p>
                        Simplying the equation and multiplying both sides by <Equation inline>{String.raw`\theta`}</Equation>,
                         we gain a quadratic relationship known as the lens equation:
                    </p>

                    <Equation>
                        {String.raw`\beta \theta = \theta^2-\theta_E^2`}
                    </Equation>

                    <p>
                        Finally, we can apply the quadratic formula to solve for <Equation inline>{String.raw`\theta`}</Equation>:
                    </p>

                    <Equation>
                        {String.raw`\theta_\pm = \frac{1}{2}\Big(\beta \pm  \big(\beta^2+4\theta_E^2 \big)^{1/2}\Big)`}
                    </Equation>

                    <p>
                        Here <Equation inline>{String.raw`\beta`}</Equation> denotes the angular separation between the lens and source from the observer's point of view.
                    </p>

                    <p>
                        From the above equation, we can see that if <Equation inline>{String.raw`\beta = 0`}</Equation>,
                         we get the expected <Equation inline>{String.raw`\theta_\pm = \theta_E`}</Equation>.
                    </p>

                    <div className="interactive-design">

                        <div className="interactive-figure-header">

                            <div>
                                <h3>
                                    Explore the lensing effect
                                </h3>

                                <p>
                                    For this visualization, the lens parameters are
                                    fixed so that the Einstein radius is
                                    2.33 arcseconds. Move the source to see how its
                                    projected images change.
                                </p>
                            </div>

                        </div>

                        <SourceControls
                            sourceX={sourceX}
                            sourceY={sourceY}
                            onXChange={handleSourceXChange}
                            onYChange={handleSourceYChange}
                        />

                        <p className="parameter-readout">
                            Angular separation β:
                            {" "}
                            {beta.toFixed(2)}
                            {" "}
                            arcsec
                        </p>

                        <LensVisualization
                            sourceX={sourceX}
                            sourceY={sourceY}
                            sourcePoints={sourcePoints}
                            thetaEinstein={thetatEinstein}
                            sourceRadius={0.5}
                            onSourceChange={handleSourceChange}
                        />

                    </div>

                </section>);

}
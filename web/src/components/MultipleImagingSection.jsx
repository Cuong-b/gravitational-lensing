import { useState, useMemo } from "react";

import { SourceControls } from "./SourceControls";

import { LensVisualization } from "./LensVisualization";

import { generateSourcePoints } from "../simulation/generateSource";

import { Equation } from "./Equation";

export function MulitpleImagingSection() {
    
    const [sourceX, setSourceX] = useState(0);
    const [sourceY, setSourceY] = useState(0);

    const thetatEinstein = 2.33;

    const sourcePoints = useMemo(() => generateSourcePoints(75000, 0.5), []);

    const beta = Math.hypot(sourceX, sourceY);

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

    return(<section className="lesson-section">

                    <h2>
                        Multiple Imaging
                    </h2>

                    <p>
                        In cases where the source, lens, and observer are not aligned
                         with one another, multiple images can be projected by the lens.
                    </p>

                    <p>
                        Given an angular separation  𝛽  between the the lens and the
                         source with respects to the observer, we can solve for the 
                         angles,  𝜃+  and  𝜃− , where the projections of the source would appear.
                    </p>

                    <h3>Deriving the lens equation</h3>

                    <p>
                        To solve for  𝜃± , we first notice in the figure above the following relation:
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
                        Note: Here we wrote 𝜃 instead of 𝜃+ as the end result will give us both 𝜃+ and  𝜃
                    </aside>

                    <p>
                        Recalling the light-deflection relation for α,
                        we can solve for β and substitute the deflection
                        term:
                    </p>

                    <Equation>
                        {String.raw`\beta = \theta - \frac{D_{ls}}{D_s}\alpha = \theta - \frac{D_{ls}}{D_s}\Bigg(\frac{4GM}{c^2}\Bigg)\frac{1}{\theta_ED_l}`}
                    </Equation>

                    <p>
                        Simplying the equation and multiplying both sides by  𝜃 ,
                         we gain a quadratic relationship known as the lens equation:
                    </p>

                    <Equation>
                        {String.raw`\beta \theta = \theta^2-\theta_E^2`}
                    </Equation>

                    <p>
                        Finally, we can apply the quadratic formula to solve for 𝜃:
                    </p>

                    <Equation>
                        {String.raw`\theta_\pm = \frac{1}{2}\Big(\beta \pm  \big(\beta^2+4\theta_E^2 \big)^{1/2}\Big)`}
                    </Equation>

                    <p>
                        Here 𝛽 denotes the angular separation between the lens and source from the observer's point of view.
                    </p>

                    <p>
                        From the above equation, we can see that if  𝛽=0 , we get the expected  𝜃±=𝜃𝐸.
                    </p>

                    <h3>
                        Explore the lensing effect
                    </h3>

                    <p>
                        For this visualization, the lens parameters are
                        fixed so that the Einstein radius is
                        2.33 arcseconds. Move the source to see how its
                        projected images change.
                    </p>

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
                    />

                </section>);

}
import { useState } from "react";

import { SourceControls } from "./SourceControls";

import { LensVisualization } from "./LensVisualization";

export function MulitpleImagingSection() {
    
    const [sourceX, setSourceX] = useState(0);
    const [sourceY, setSourceY] = useState(0);

    const thetatEinstein = 3.33;

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

                    <div className="equation">
                        AB+BC=AC
                    </div>

                    <p>
                        Assuming small angles, the above equation can be written as:
                    </p>

                    <div className="equation">
                        Dₛβ + Dₗₛα = Dₛθ
                    </div>

                    <aside className="lesson-note">
                        Note: Here we wrote 𝜃 instead of 𝜃+ as the end result will give us both 𝜃+ and  𝜃
                    </aside>

                    <p>
                        Recalling the light-deflection relation for α,
                        we can solve for β and substitute the deflection
                        term:
                    </p>

                    <div className="equation equation-long">
                        β = θ − (Dₗₛ / Dₛ) α
                    </div>

                    <p>
                        Simplying the equation and multiplying both sides by  𝜃 ,
                         we gain a quadratic relationship known as the lens equation:
                    </p>

                    <div className="equation equation-important">
                        βθ = θ² − θₑ²
                    </div>

                    <p>
                        Finally, we can apply the quadratic formula to solve for 𝜃:
                    </p>

                    <div className="equation equation-important">
                        θ± = ½(β ± √(β² + 4θₑ²))
                    </div>

                    <p>
                        Here 𝛽 denotes the angular separation between the lens and source from the observer's point of view.
                    </p>

                    <p>
                        From the above equation, we can see that if  𝛽=0 , we get the expected  𝜃±=𝜃𝐸 .
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

                    <LensVisualization
                        sourceX={sourceX}
                        sourceY={sourceY}
                        thetaEinstein={thetatEinstein}
                    />

                </section>);

}
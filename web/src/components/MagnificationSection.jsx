import { Equation } from "./Equation.jsx";
import { MagnificationFigure } from "./MagnificationFigure.jsx";

export function MagnificationSection() {
  return (
    <section className="lesson-section">
      <h2>Magnification</h2>

      <p>
        An interesting manifestation of gravitational lensing is the magnification of the background
        source object. Since surface brightness is conserved during lensing, an increase in the
        apparent size of the image produces a magnification effect.
      </p>

      <p>
        For circularly symmetric systems, the magnifcation{" "}
        <Equation inline>{String.raw`X`}</Equation> is described as:
      </p>

      <Equation>{String.raw`X = \frac{\theta}{\beta} \frac{d\theta}{d\beta}`}</Equation>

      <p>
        Using the solution{" "}
        <Equation
          inline
        >{String.raw`\theta_\pm = \frac{1}{2}(\beta \pm (\beta^2+4\theta_E^2)^{1/2})`}</Equation>
        , we calculate <Equation inline>{String.raw`\frac{d\theta}{d\beta}`}</Equation> to be:
      </p>

      <Equation>
        {String.raw`\frac{d\theta}{d\beta} = \frac{1}{2} \Bigg[1 \pm \frac{\beta}{\sqrt{\beta^2+4\theta_E^2}}\Bigg]`}
      </Equation>

      <p>
        Plugging in the above relation, we can solve for <Equation inline>{String.raw`X`}</Equation>{" "}
        to get:
      </p>

      <Equation>
        {String.raw`X = \frac{\theta_\pm}{2\beta} \Bigg[1 \pm \frac{\beta}{\sqrt{\beta^2+4\theta_E^2}}\Bigg]`}
      </Equation>

      <p>
        We see here that <Equation inline>{String.raw`X`}</Equation> is a unitless measure that
        describes how much larger the projected image is compared to the source image (i.e. image
        area/source area).
      </p>

      <p>
        The interactive figure below shows how magnification changes as the source moves
        horizontally relative to the lens. The gold disc represents the source, the purple region
        shows its projected lensed image, and the open marker indicates the lens position. The graph
        tracks the mean magnification of the extended source as its relative displacement changes.
      </p>

      <MagnificationFigure />
    </section>
  );
}

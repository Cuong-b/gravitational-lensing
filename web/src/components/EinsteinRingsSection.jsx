import { Equation } from "./Equation.jsx";
import { LessonFigure } from "./LessonFigure.jsx";
import { EinsteinRingsFigure } from "./EinsteinRingsFigure.jsx";

export function EinsteinRingsSection() {
  const imagePath = `${import.meta.env.BASE_URL}images/lensing/`;

  return (
    <section className="lesson-section">
      <h2>Einstein Rings</h2>

      <p>
        Einstein Rings are a special case of gravitational lensing where the
        lensing object is aligned along the path between the background source
        and the observer. Due to its symmetric geometry, the projection of the
        background source emerges in the shape of a ring.
      </p>

      <LessonFigure
        src={`${imagePath}A_Horseshoe_Einstein_Ring_from_Hubble.jpeg`}
        alt="Hubble image of a horseshoe-shaped Einstein ring."
        caption="An observed Einstein ring."
        source="ESA/Hubble & NASA"
      />

      <h3>Angle of Deflection</h3>

      <p>
        The projection of the ring is characterized by its Einstein Radius, the
        angular size of the ring's radius. To solve for a general description of
        this Einstein Radius, we will first need to find the small angle
        deflection of light due to a lens.
      </p>

      <LessonFigure
        src={`${imagePath}Angle-of-Deflection.jpg`}
        alt="Geometric Diagram of the gravitational deflection angle."
        caption="Diagram illustrating the small-angle light-deflection."
      />

      <p>
        Assuming that the angle of deflection is small, we can describe a small
        change in the light's deflection angle{" "}
        <Equation inline>{String.raw`d\alpha`}</Equation> as:
      </p>

      <Equation>
        {String.raw`d\alpha = \frac{v_l(x+dx)dt-v_l(x)dt}{dx} = \bigg[\frac{\partial v_l}{\partial x}\bigg]dt,`}
      </Equation>

      <p>
        where <Equation inline>{String.raw`v_l`}</Equation> is the velocity of
        light. <br />
      </p>

      <p>
        Under the additional assumption that the impact parameter{" "}
        <Equation inline>{String.raw`b`}</Equation> (closest approach distance
        to lensing mass) is much smaller that the Schwarzchild radius(the event
        horizon of a massive compact object i.e. black hole)
        <Equation
          inline
        >{String.raw`r_s = \frac{2GM}{c^2},`}</Equation> (where{" "}
        <Equation inline>{String.raw`G`}</Equation> is the gravitational
        constant,
        <Equation inline>{String.raw`M`}</Equation> is the mass of the lens, and{" "}
        <Equation inline>{String.raw`c`}</Equation> is the speed of light)
      </p>

      <p>
        We can approximate the distance between the lens and the beam of light
        to <Equation inline>{String.raw`r = \sqrt{x^2+z^2}`}</Equation>
      </p>

      <p>
        To obtain the total angle of deflection, we can integrate{" "}
        <Equation inline>{String.raw`d\alpha`}</Equation>:
      </p>

      <Equation>
        {String.raw`\alpha = \int d\alpha=\int \bigg[\frac{\partial v_l}{\partial x} \bigg]dt`}
      </Equation>

      <p>
        As a result of the Schwarchild metric, we can describe the speed of
        light <Equation inline>{String.raw`v_l`}</Equation> as:
      </p>

      <Equation>
        {String.raw`v_l = c \Big(1-\frac{r_s}{r}\Big) = c \Big(1-\frac{r_s}{\sqrt{x^2+z^2}}\Big)`}
      </Equation>

      <p>and consequently,</p>

      <Equation>
        {String.raw`\frac{dv_l}{dx} = \frac{cr_sx}{\big[x^2+z^2\big]^{3/2}}`}
      </Equation>

      <p>
        Re-expressing <Equation inline>{String.raw`\alpha`}</Equation>, we get:
      </p>

      <Equation>
        {String.raw`\alpha = \int \frac{cr_sx}{\big[x^2+z^2\big]^{3/2}}dt`}
      </Equation>

      <p>
        Since the angle of deflection is small, we can make the approximation
        that
        <Equation inline>{String.raw`x = b = constant`}</Equation> and
        <Equation inline>{String.raw`cdt = dz`}</Equation>. As a result, we
        find:
      </p>

      <Equation>
        {String.raw`\alpha = \int_{-\infty}^{\infty}\frac{r_sb}{\big[b^2+z^2\big]^{3/2}}dz = \frac{2r_s}{b}=\frac{4GM}{c^2b},`}
      </Equation>

      <p>
        assuming <Equation inline>{String.raw`\alpha << 1`}</Equation> and{" "}
        <Equation inline>{String.raw`b >> r_s`}</Equation>.
      </p>

      <h3>Einstein Radius for a Point Mass</h3>

      <LessonFigure
        src={`${imagePath}Einstein-Radius-Geometry.jpg`}
        alt="Point-mass gravitational lens geometry defining the Einstein radius."
        caption="Geometry used to derive the Einstein radius."
      />

      <p>
        Now that we have a relation for{" "}
        <Equation inline>{String.raw`\alpha`}</Equation>, we can find a
        description for the Einstein Radius{" "}
        <Equation inline>{String.raw`\theta_E`}</Equation>.
      </p>

      <aside className="lesson-note">
        Note: A key assumption made in this approximation is that the lens is a
        point mass.
      </aside>

      <p>
        Refering to the diagram and assuming small angles, we can make the
        following approximations:
      </p>

      <Equation>
        {String.raw`\theta_E = \frac{b}{D_l}=\frac{a}{D_s},\ \  \alpha = \frac{a}{D_{ls}} = \frac{\theta_ED_s}{D_{ls}}, \ \ and\ \ b = \theta_ED_l`}
      </Equation>

      <p>
        Plugging in our previous relationship for{" "}
        <Equation inline>{String.raw`\alpha`}</Equation>, we obtain:
      </p>

      <Equation>
        {String.raw`\frac{\theta_ED_s}{D_{ls}}=\frac{4GM}{c^2b}= \bigg(\frac{4GM}{c^2}\bigg)\frac{1}{\theta_ED_l}`}
      </Equation>

      <p>
        Re-arranging the following relation provides us with an equation for the
        Einstein Radius:
      </p>

      <Equation>
        {String.raw`\theta_E = \sqrt{\frac{4GM}{c^2}\frac{D_{ls}}{D_lD_s}},`}
      </Equation>

      <p>
        where <Equation inline>{String.raw`D_{ls}`}</Equation> is the lens to
        source distance,
        <Equation inline>{String.raw`D_l`}</Equation> is the lens to observer
        distance,
        <Equation inline>{String.raw`D_s`}</Equation> is the source to observer
        distance, and <Equation inline>{String.raw`\theta_E`}</Equation> in
        radians.
      </p>

      <p>
        From the resulting Einstein Radius, we can see that the angular size of
        the Einstein Ring is only dependent on the mass of the lens and the
        geometry between the observer, lens and source.
      </p>

      <p>
        Below is an interactive display of Einstein Rings along with its source
        code. By interacting with the sliders for the lens mass,{" "}
        <Equation inline>{String.raw`D_{ls}`}</Equation>, and{" "}
        <Equation inline>{String.raw`D_l`}</Equation>, (values have been logged
        for readability) the display will update a geometric visual of the
        system as well as a depiction of the Einstein rings angular size.
      </p>

      <aside className="lesson-note">
        Note: In the following display, we assumed a flat euclidean geometry
        (i.e. <Equation inline>{String.raw`D_s = D_l+D_{ls}`}</Equation>).
        However, in a general cosmological context,{" "}
        <Equation inline>{String.raw`D_s \neq D_l+D_{ls}`}</Equation>.
      </aside>

      <EinsteinRingsFigure />
    </section>
  );
}

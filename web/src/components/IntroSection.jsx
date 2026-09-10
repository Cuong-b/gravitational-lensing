import { LessonFigure } from "./LessonFigure.jsx";

export function IntroSection() {
  const imagePath = `${import.meta.env.BASE_URL}images/lensing/`;

  return (
    <section className="lesson-section">
      <h2>Einstein Rings</h2>

      <p>
        When a massive object (e.g. galaxy clusters, exoplanets, blackholes,
        etc.) intercepts the light between us (the observer) and a source of
        light (e.g. galaxy, stars, etc.), the intercepting body, which we call
        the lens, can cause significant curvature in spacetime and bend the path
        of light coming towards us. As a result, the observer does not see a
        clear image of the source object but a warped projection caused by the
        lens. A prediction of Einstein's General Theory of Relativity, this
        phenomenon is called Gravitational Lensing.
      </p>

      <p>
        According to Fermat's principle, light rays will travel along a path
        between two points that requires the least amount of time. This path for
        massless particles, such as photons, is called the null geodesic. In
        flat spacetime, the null geodesic is essentially a straight line.
        However, the null geodesic is not necessarily straight when spacetime
        becomes curved. General Relativity predicts that spacetime becomes
        curved by the presence of massive bodies, for example, a lens.
        Consequently, the lens changes in the null geodesic of the surrounding
        spacetime and causes the light to bend. Analogous to refraction, where
        light waves bend due to changes in medium, light gets bent in
        gravitational lensing due to changes in local spacetime curvature.
      </p>

      <p>
        Gravitational lensing is classified in three main classes: microlensing,
        weak lensing, and strong lensing. In microlensing, the observer notice
        changes in the brightness of the source object due to lensing with no
        distortion in the projection. This type of lensing occurs when the lens
        is not massive enough to cause a significant spacetime curvature. Weak
        Lensing, as the name describes, produces small distortions in the
        background source. This type of lensing is detectable when surveying
        distortions in a large number of background sources. Finally, strong
        lensing produces the most visible distortions in the projection of
        background galaxies. This type of lensing produces projections of arc,
        multiple images, and Einstein Rings that can be on the order of a few
        acrseconds. In the following discussion of gravitational lensing, we
        will focus on strong lensing as the subject of interest.
      </p>

      <p>
        Below are some example images of gravitational lensing from{" "}
        <a href="https://esahubble.org/images/viewall/?search=gravitational+lens">
          {" "}
          the Hubble telescope
        </a>
        .
      </p>

      <div className="lesson-image-grid">
        <LessonFigure
          src={`${imagePath}rings-of-relativity.jpg`}
          alt="Hubble image titled Rings of Relativity."
          caption="Rings of Relativity"
          source="ESA/Hubble & NASA"
        />

        <LessonFigure
          src={`${imagePath}major-merger.jpg`}
          alt="Hubble image titled Major Merger."
          caption="Major Merger"
          source="ESA/Hubble & NASA"
        />

        <LessonFigure
          src={`${imagePath}einstein-ring-1.jpg`}
          alt="Hubble image titled Einstein Ring Gravitational Lens: SDSS J162746.44-005357.5."
          caption="Einstein Ring Gravitational Lens: SDSS J162746.44-005357.5"
          source="ESA/Hubble & NASA"
        />

        <LessonFigure
          src={`${imagePath}einstein-ring-2.jpg`}
          alt="Hubble image titled Einstein Ring Gravitational Lens: SDSS J120540.43+491029.3."
          caption="Einstein Ring Gravitational Lens: SDSS J120540.43+491029.3"
          source="ESA/Hubble & NASA"
        />
      </div>
    </section>
  );
}

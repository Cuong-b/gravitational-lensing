# Gravitational Lensing

An interactive lesson on gravitational lensing — Einstein rings, multiple imaging, and
magnification — built as a React web app with live, slider-driven figures alongside the physics
derivations.

The project started as a Jupyter notebook (`python/notebook/`) with Matplotlib widgets; the web
app in `web/` is a from-scratch reimplementation of the same physics and interactive figures for
the browser.

## What's here

- **`web/`** — the lesson itself: a Vite + React app. Each topic (Intro, Einstein Rings, Multiple
  Imaging, Magnification) is a section that combines prose/derivations (rendered with KaTeX) with
  an interactive canvas or SVG figure driven by sliders.
- **`python/`** — the original point-mass lensing model (Einstein radius, image projections,
  magnification) and the Jupyter notebook it was first built in. This is kept as a reference
  implementation: the web app's JS physics is checked against it in tests, but new lesson features
  are built in `web/`, not here.
- **`tests/`** — pytest suite for the Python physics model.

## Running the web app

```
cd web
npm install
npm run dev
```

This starts a Vite dev server (prints the local URL to open). Other useful commands, also run from
`web/`:

```
npm run build     # production build
npm run lint      # eslint
npm test          # vitest suite
```

## Running the Python reference implementation

From the repo root, with `python/` on `PYTHONPATH`:

```
PYTHONPATH=python python3 -m pytest tests/
```

The original notebook is at `python/notebook/Gravitational Lensing - Cuong Bui.ipynb`, and
`python/MODEL.md` summarizes the physics it implements (Einstein radius, image projections,
magnification).

## Physics covered

- **Einstein rings** — the angular size of the ring a point-mass lens produces when perfectly
  aligned between observer and source.
- **Multiple imaging** — the two images (θ₊, θ₋) produced when the source, lens, and observer are
  *not* perfectly aligned, as a function of their angular separation β.
- **Magnification** — how much larger the lensed images appear than the source itself, as the
  source moves across the lens.

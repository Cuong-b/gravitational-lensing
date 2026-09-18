# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

An interactive, educational site explaining gravitational lensing (Einstein rings, multiple imaging,
magnification). The site is a React/Vite app in `web/`, built around lesson "sections" that mix
derivation text (LaTeX via KaTeX) with interactive canvas figures driven by sliders.

`python/` holds the original point-mass lensing physics model (Einstein radius, image projections,
magnification) as a notebook-first reference implementation. It is legacy/reference-only — new
feature work happens in `web/`. The Python formulas exist so the JS physics can be checked against
known-good values (see `web/src/physics/physics.test.js`, which asserts a magnification result
against `python/lensing/physics.py`'s output). Don't add new lesson/UI features to the Python side;
only touch it if the reference formulas themselves need correcting, and if you do, update the JS
implementation and its parity test to match.

## Commands

All web commands are run from `web/`:

```
npm run dev       # start Vite dev server
npm run build     # production build
npm run lint      # eslint
npm test          # run vitest suite (or: npx vitest run)
npx vitest run src/physics/physics.test.js   # single test file
```

Python tests are run from the repo root and require `python/` on `PYTHONPATH` (there is no
pytest.ini/pyproject.toml setting this, and `tests/test_physics.py` imports `lensing.physics`
directly, not `python.lensing.physics`):

```
PYTHONPATH=python python3 -m pytest tests/
PYTHONPATH=python python3 -m pytest tests/test_physics.py::test_angular_unit_conversions   # single test
```

Note: `python/lensing/simulation.py` imports via `from python.lensing.physics import ...` (repo-root
relative), which is inconsistent with the tests' `from lensing.physics import ...` (python/-relative).
There is no test coverage for `simulation.py`, so this inconsistency doesn't surface as a failure —
be aware of it if you touch that file.

## Architecture (web/)

Each lesson topic (Einstein Rings, Multiple Imaging, Magnification, Intro) is a `*Section.jsx`
component assembled in `App.jsx`. A section combines prose/derivation (`Equation.jsx`, KaTeX) with
one interactive `*Figure.jsx` component and slider controls (`SourceControls.jsx`).

The physics/rendering pipeline is layered and each layer only talks to the one below it:

- `src/physics/` — pure, dependency-free math: `beta.js`, `einsteinRadius.js`, `imageProjections.js`,
  `magnification.js`. These are the ground truth and are unit-tested directly (`physics.test.js`),
  including against the Python reference values.
- `src/simulation/` — builds on `physics/` to generate point sets and derived series for a figure to
  render: `generateSource.js` (sample points on/in the source), `projectSource.js` /
  `projectCircularSource.js` (map source points through the lens equation), `magnificationCurve.js`
  (magnification as a function of source position, used for live slider feedback).
- `src/rendering/` — turns simulation output into canvas draw calls: `lensCanvas.js` (coordinate
  transforms between world space and canvas pixels, drawing points/rings/sources/projections) and
  `lensedSourceRaster.js` (raster-based rendering of the lensed source shape).
- `*Figure.jsx` components own the `<canvas>` element and slider state, and wire physics →
  simulation → rendering together per animation frame.

When changing a physics formula, the sequence that matters is: `physics/` → whatever in
`simulation/`/`rendering/` consumes it → the corresponding `*Figure.jsx`. Sliders in
`SourceControls.jsx` are shared across figures, so check other sections' figures aren't broken by a
formula or units change.

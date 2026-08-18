# Gravitational Lensing Model

## Einstein Radius

Inputs:

- M: lens mass in solar masses
- D_l: observer-lens distance in parsecs
- D_ls: lens-source distance in parsecs

Assumption:

D_s: observer-source distance in parsecs
D_s = D_l + D_ls

Output:

Einstein radius in radians, degrees,
arcminutes, and arcseconds.

---

## Image Projection

Given:

- beta
- theta_E

The lens equation is:

beta * theta = theta^2 - theta_E^2

Therefore:

theta_± =
1/2 ( beta ± sqrt(beta^2 + 4 theta_E^2) )

Input:
- x
- y
- theta_einstein

Assumption:

Source, lens, and observer are aligned on one axis

Output:
Cooridinates of projected image (from both positive and negative angles).

---

## Magnification

Input:
- x
- y
- theta_einstein

Assumption:
- Lens, observer, and source are aligned on one axis
- System is circularly symmetric

Output:
Average magnification of source due to change in apparent size

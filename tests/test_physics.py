import numpy as np

from lensing.physics import einstein_ring, image_projections


def test_einstein_ring_is_positive():
    radians, degrees, arcmin, arcsec = einstein_ring(
        1e12,
        1e9,
        2e9
    )

    assert radians > 0
    assert degrees > 0
    assert arcmin > 0
    assert arcsec > 0

def test_angular_unit_conversions():
    radians, degrees, arcmin, arcsec = einstein_ring(
        1e12,
        1e9,
        2e9
    )

    assert np.isclose(arcmin, degrees * 60)
    assert np.isclose(arcsec, arcmin * 60)

def test_aligned_source_produces_einstein_radius():
    theta_e = 2.33

    x_plus, y_plus, x_minus, y_minus = image_projections(
        0,
        0,
        theta_e
    )

    assert np.isclose(abs(x_plus), theta_e)
    assert np.isclose(abs(x_minus), theta_e)
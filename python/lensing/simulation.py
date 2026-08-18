import numpy as np
from python.lensing.physics import magnification

'''
Generates a set of x,y coordinates that fall within radius r
'''
def generate_point(radius):
    x = np.random.uniform(low = -radius, high = radius)
    y = np.random.uniform(low = -radius, high = radius)
    
    if x == 0 or y == 0:
        return generate_point(radius)
    elif np.abs((x**2)+(y**2)) <= radius**2:
        return x, y
    else:
        return generate_point(radius)

'''
Creates a list of magnificatons across the traversed beta
Provides a live feedback of magnification that changes when slider value is changed
'''
def magnification_curve(x, dx, y, theta_einstein):
    mags = []
    for i in dx:
        loc = x-i
        mags.append(magnification(loc, y, theta_einstein))
    return mags
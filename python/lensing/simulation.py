import numpy as np
from lensing.physics import magnification

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

'''Calculates the coordinates of the lensing projections 
given an x,y coordinate and Einstein radius in arcseconds
'''
def image_projections(x,y, theta_einstein): 
    direction = np.arctan2(y,x) #solve for the direction of the projection
            
    beta = np.sqrt((x**2)+(y**2)) #calculates beta

    theta_plus = (1/2)*(beta+np.sqrt((beta**2)+(4*(theta_einstein**2))))
    theta_minus = (1/2)*(beta-np.sqrt((beta**2)+(4*(theta_einstein**2))))
    
    x_plus = theta_plus*np.cos(direction) #theta results are split into corresponding x and y coords using direction
    y_plus = theta_plus*np.sin(direction)
    
    x_minus = theta_minus*np.cos(direction)
    y_minus = theta_minus*np.sin(direction)
    
    return x_plus, y_plus, x_minus, y_minus

'''
Creates a list of magnificatons across the traversed beta
Provides a live feedback of magnification that changes when slider value is changed
'''
def plot_magnification(x, dx, y, theta_einstein):
    mags = []
    for i in dx:
        loc = x-i
        mags.append(magnification(loc, y, theta_einstein))
    return mags
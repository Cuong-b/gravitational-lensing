import numpy as np
from scipy import constants


#List of Constants Frequently Used
G = constants.G #N*jk^2/m^2
c = constants.c #m/s
m_sun = 1.989e30 #kg
parsec = constants.parsec #m
degree = constants.degree #degrees in radians

'''Calculates the Einstein Radius given mass in solar masses and distance in parsecs. 
Returns Einstein Radius in radians, degrees, arcminutes, and arcseconds'''
def einstein_ring(mass, d_l, d_ls):
    M = mass*m_sun #Making sure units are consistent
    D_l = d_l*parsec
    D_ls = d_ls*parsec
    D_s = D_l+D_ls #assumes euclidean geometry holds
    
    frac1 = (4*G*M)/(c**2)
    frac2 = D_ls/(D_s*D_l)
    
    radians = np.sqrt(frac1*frac2) 
    degrees = radians/degree
    arcmin = degrees*60
    arcsec = arcmin*60
    return radians, degrees, arcmin, arcsec

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
Calculates the average magnification of the background source over all n points
'''
def magnification(x,y, theta_einstein): #einstein radius in arcsec
    beta = np.sqrt((x**2)+(y**2))

    theta_plus = (1/2)*(beta+np.sqrt((beta*2)+(4*(theta_einstein**2))))
    theta_minus = (1/2)*(beta-np.sqrt((beta*2)+(4*(theta_einstein**2))))
    
    alpha_plus = (theta_plus/beta)*(1+(beta/np.sqrt((beta**2)+(4*(theta_einstein**2)))))
    alpha_minus = (theta_minus/beta)*(1-(beta/np.sqrt((beta**2)+(4*(theta_einstein**2)))))
    
    magnification = abs(alpha_plus)+abs(alpha_minus) 
    mean_mag = np.mean(magnification)
    return mean_mag
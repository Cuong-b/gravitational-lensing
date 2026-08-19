import {describe, it, expect} from "vitest";

import { beta } from "./beta.js";

import {thetaPlus, thetaMinus} from "./imageProjections.js";

import {pointMagnification, meanMagnification} from "./magnification.js";


describe("gravitational lensing physics", () => {

    it("calculates beta from x and y", () => {

        expect(beta(3, 4)).toBeCloseTo(5);

    });


    it("theta solutions satisfy the lens equation", () => {

        const b = 1;
        const thetaE = 2.33;

        const plus = thetaPlus(b, thetaE);

        const minus = thetaMinus(b, thetaE);

        expect(plus * minus).toBeCloseTo(-(thetaE ** 2));

    });

    it("calculates magnification from x, y, and einstein angle", () => {
        const x = 1;
        const y = 1;

        const b = beta(x,y);

        const thetaE = 1;



    });

    it("returns a positive magnification", () => {

        const result =
            pointMagnification( 1, 0, 2.33);
            
            expect(result).toBeGreaterThan(0);
        });
    
    it("matches the Python reference value", () => {
        
        const result = pointMagnification( 1, 0, 2.33);
        
        expect(result).toBeCloseTo( 2.48795);
     });

     it("calculates the mean magnification", () => {

    const points = [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: -0.5, y: 0.75 }
    ];

    const thetaEinstein = 2.33;

    const expected =
        (pointMagnification( 1, 0, thetaEinstein)
            +
            pointMagnification( 1, 1, thetaEinstein)
            +
            pointMagnification( -0.5, 0.75, thetaEinstein)
        ) / 3;

    const result = meanMagnification(points, thetaEinstein);

    expect(result).toBeCloseTo(expected);});

    it("throws for beta equal to zero", () => {

        expect(() => 
            pointMagnification( 0, 0, 2.33)).toThrow("Magnification is undefined");
    });

    it("rejects an empty point set", () => {
        expect(() => 
            meanMagnification([], 2.33)).toThrow("empty point set");
    });

});
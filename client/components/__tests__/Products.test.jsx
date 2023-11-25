/**
 * @jest-environment jsdom
 */

import React from 'react';
// import extensions to Jest expect
import "@testing-library/jest-dom";

import {render} from '../../__tests__/utils';

import Products from '../Products';


describe("<Products />" , () => {
    
    it("renders the Products component", ()=>{
        const products = render(
                    <Products />
        );
        expect(products).not.toBe(null);
    })
})
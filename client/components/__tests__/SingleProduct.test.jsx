/**
 * @jest-environment jsdom
 */

import React from 'react';
// import extensions to Jest expect
import "@testing-library/jest-dom";

import {render} from '../../__tests__/utils';

import SingleProduct from '../SingleProduct';


describe("<SingleProduct />" , () => {
    
    it("renders the SingleProduct component", ()=>{
        const singleProduct = render(
                    <SingleProduct />
        );
        expect(singleProduct).not.toBe(null);
    })
})
/**
 * @jest-environment jsdom
 */

import React from 'react';
// import extensions to Jest expect
import "@testing-library/jest-dom";

import {render} from '../../__tests__/utils';

import Cart from '../Cart';


describe("<Cart />" , () => {
    
    it("renders the Cart component", ()=>{
        const cart = render(
                    <Cart />
        );
        expect(cart).not.toBe(null);
    })
})
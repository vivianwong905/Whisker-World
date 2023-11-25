/**
 * @jest-environment jsdom
 */

import React from 'react';
// import extensions to Jest expect
import "@testing-library/jest-dom";

import {render} from '../../__tests__/utils';

import CheckoutCartButton from '../CheckoutCartButton';


describe("<CheckoutCartButton />" , () => {
    
    it("renders the CheckoutCartButton component", ()=>{
        const checkoutCartButton = render(
                    <CheckoutCartButton />
        );
        expect(checkoutCartButton).not.toBe(null);
    })
})
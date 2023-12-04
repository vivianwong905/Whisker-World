/**
 * @jest-environment jsdom
 */

import React from 'react';
// import extensions to Jest expect
import "@testing-library/jest-dom";

import {render} from '../../__tests__/utils';

import GuestCheckoutCartButton from '../GuestCheckoutCartButton';


describe("<GuestCheckoutCartButton />" , () => {
    
    it("renders the GuestCheckoutCartButton component", ()=>{
        const guestcheckoutCartButton = render(
                    <GuestCheckoutCartButton />
        );
        expect(guestcheckoutCartButton).not.toBe(null);
    })
})
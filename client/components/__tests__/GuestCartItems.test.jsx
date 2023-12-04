/**
 * @jest-environment jsdom
 */

import React from 'react';
// import extensions to Jest expect
import "@testing-library/jest-dom";

import {render} from '../../__tests__/utils';

import GuestCartItem from '../GuestCartItem';


describe("<GuestCartItem />" , () => {
    
    it("renders the GuestCartItem component", ()=>{
        const guestCartItem = render(
                    <GuestCartItem />
        );
        expect(guestCartItem).not.toBe(null);
    })
})
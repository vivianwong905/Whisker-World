/**
 * @jest-environment jsdom
 */

import React from 'react';
// import extensions to Jest expect
import "@testing-library/jest-dom";

import {render} from '../../__tests__/utils';

import LoggedInCartItem from '../LoggedInCartItem';


describe("<LoggedInCartItem />" , () => {
    
    it("renders the LoggedInCartItem component", ()=>{
        const loggedInCartItem = render(
                    <LoggedInCartItem />
        );
        expect(loggedInCartItem).not.toBe(null);
    })
})
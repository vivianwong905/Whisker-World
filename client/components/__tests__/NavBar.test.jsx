/**
 * @jest-environment jsdom
 */

import React from 'react';
// import extensions to Jest expect
import "@testing-library/jest-dom";

import {render} from '../../__tests__/utils';

import NavBar from '../Navbar';


describe("<NavBar />" , () => {
    
    it("renders the NavBar component", ()=>{
        const navbar = render(
                    <NavBar />
        );
        expect(navbar).not.toBe(null);
    })
})

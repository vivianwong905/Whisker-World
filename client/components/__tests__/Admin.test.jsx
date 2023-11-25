/**
 * @jest-environment jsdom
 */

import React from 'react';
// import extensions to Jest expect
import "@testing-library/jest-dom";

import {render} from '../../__tests__/utils';

import Admin from '../Admin';


describe("<Admin />" , () => {
    
    it("renders the Admin component", ()=>{
        const admin = render(
                    <Admin />
        );
        expect(admin).not.toBe(null);
    })
})
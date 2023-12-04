/**
 * @jest-environment jsdom
 */

import React from 'react';
// import extensions to Jest expect
import "@testing-library/jest-dom";

import {render} from '../../__tests__/utils';

import Filters from '../Filters';


describe("<Filters />" , () => {
    
    it("renders the Filters component", ()=>{
        const filter = render(
                    <Filters />
        );
        expect(filter).not.toBe(null);
    })
})
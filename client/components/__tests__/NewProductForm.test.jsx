/**
 * @jest-environment jsdom
 */

import React from 'react';
// import extensions to Jest expect
import "@testing-library/jest-dom";

import {render} from '../../__tests__/utils';

import NewProductForm from '../NewProductForm';


describe("<NewProductForm />" , () => {
    
    it("renders the NewProductForm component", ()=>{
        const newProductForm = render(
                    <NewProductForm />
        );
        expect(newProductForm).not.toBe(null);
    })
})
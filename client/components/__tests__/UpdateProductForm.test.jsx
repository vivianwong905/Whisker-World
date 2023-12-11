/**
 * @jest-environment jsdom
 */

import React from 'react';
// import extensions to Jest expect
import "@testing-library/jest-dom";

import {render} from '../../__tests__/utils';

import UpdateProductForm from '../Admin/UpdateProductForm';


describe("<UpdateProductForm />" , () => {
    
    it("renders the UpdateProductForm component", ()=>{
        const updateProductForm = render(
                    <UpdateProductForm />
        );
        expect(updateProductForm).not.toBe(null);
    })
})
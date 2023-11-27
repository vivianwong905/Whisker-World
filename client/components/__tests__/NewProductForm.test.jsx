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
    });

    // it("contains a button with correct text",() => {
    //     // render the NewProductForm component
    //     const createProduct= render(<NewProductForm />);

     
    //     const submitButton = createProduct.findByRole('button', {name:"Submit"});

    //     // assert that the submitButton exists in the Document
    //     expect(submitButton).toBeInTheDocument();
    // });
})
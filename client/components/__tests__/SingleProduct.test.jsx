/**
 * @jest-environment jsdom
 */

import React from 'react';
// import extensions to Jest expect
import "@testing-library/jest-dom";

import { screen, fireEvent } from '@testing-library/react';
import {render} from '../../__tests__/utils';

import SingleProduct from '../SingleProduct';


describe("<SingleProduct />" , () => {
    
    it("renders the SingleProduct component", ()=>{
        const singleProduct = render(
                    <SingleProduct />
        );
        expect(singleProduct).not.toBe(null);
    })

    // it("contains a button with correct text",() => {
    //     // render the singleProduct component
    //      render(<SingleProduct />);

     
    //     const backButton = screen.findByRole('button', {name:"Back"});

    //     // assert that the backButton exists in the Document
    //     expect(backButton).toBeInTheDocument();
    // });
})
/**
 * @jest-environment jsdom
 */

import React from 'react';
// import extensions to Jest expect
import "@testing-library/jest-dom";

import { screen, fireEvent } from '@testing-library/react';
import {render} from '../../__tests__/utils';

import SingleProduct from '../SingleProduct';

import { singleProductHandlers } from '../../../mocks/serverMock';

import { setupServer } from 'msw/node';

const server = setupServer(...singleProductHandlers)
  
// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe("<SingleProduct />" , () => {
    
    it("renders the SingleProduct component", ()=>{
        const singleProduct = render(
                    <SingleProduct />
        );
        expect(singleProduct).not.toBe(null);
    })

    //TODO: mock react router use params to return {id 1 }
//     it("contains a button with correct text",() => {
//         // render the singleProduct component
//         const singleProduct= render(<SingleProduct />);
// console.log(singleProduct.baseElement)
     
//         // const backButton = singleProduct.findByRole('button', {name:"Back"});
//         const backButton = singleProduct.getByText("Back");
//         // assert that the backButton exists in the Document
//         expect(backButton).toBeInTheDocument();
//     });
})
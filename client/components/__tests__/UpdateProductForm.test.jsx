/**
 * @jest-environment jsdom
 */

import React from 'react';
// import extensions to Jest expect
import "@testing-library/jest-dom";

import {render} from '../../__tests__/utils';

import { Router } from "react-router-dom";
// import { createMemoryHistory } from "history";

import UpdateProductForm from '../UpdateProductForm';


describe("<UpdateProductForm />" , () => {
    
    it("renders the UpdateProductForm component", ()=>{
        // const history = createMemoryRouter();
        // const state = { a: 123, b: 456 }
        // history.push("/", state);

        const updateProductForm = render(
                // <Router history={history}>
                    <UpdateProductForm />
                // </Router>
        );
        expect(updateProductForm).not.toBe(null);
    })
})
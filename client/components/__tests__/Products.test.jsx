/**
 * @jest-environment jsdom
 */

import React from 'react';
// import extensions to Jest expect
import "@testing-library/jest-dom";

import {render} from '../../__tests__/utils';

import Products from '../Products';

import { productsHandlers } from '../../../mocks/serverMock';

import { setupServer } from 'msw/node'

const server = setupServer(...productsHandlers)
  
// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe("<Products />" , () => {
    
    it("renders the Products component", ()=>{
        const products = render(
                    <Products />
        );
        expect(products).not.toBe(null);
    })
})
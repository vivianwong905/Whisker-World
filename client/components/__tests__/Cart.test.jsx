/**
 * @jest-environment jsdom
 */

import React from 'react';
// import extensions to Jest expect
import "@testing-library/jest-dom";

import {render} from '../../__tests__/utils';

import Cart from '../Cart/Cart';

import { cartHandlers } from '../../../mocks/serverMock';

import { setupServer } from 'msw/node'

const server = setupServer(...cartHandlers)
  
// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())


describe("<Cart />" , () => {
    
    it("renders the Cart component", ()=>{
        const cart = render(
                    <Cart />
        );
        expect(cart).not.toBe(null);
    })
})
/**
 * @jest-environment jsdom
 */

import React from 'react';
// import extensions to Jest expect
import "@testing-library/jest-dom";

import {render} from './utils'

import { productsHandlers } from '../../mocks/serverMock';

import App from '../App';

import { setupServer } from 'msw/node'

const server = setupServer(...productsHandlers)
  
// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())


describe("<App />" , () => {
    
    it("renders the App component", ()=>{
        const app = render(
                    <App />
        );
        expect(app).not.toBe(null);
    })
})
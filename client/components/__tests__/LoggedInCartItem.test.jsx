/**
 * @jest-environment jsdom
 */

import React from 'react';
// import extensions to Jest expect
import "@testing-library/jest-dom";

import {render} from '../../__tests__/utils';

import LoggedInCartItem from '../Cart/LoggedInCart/LoggedInCartItem';

import { cartHandlers } from '../../../mocks/serverMock';

import { setupServer } from 'msw/node'

const server = setupServer(...cartHandlers)
  
// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe("<LoggedInCartItem />" , () => {
    
    it("renders the LoggedInCartItem component", ()=>{
        const loggedInCartItem = render(
                    <LoggedInCartItem />
        );
        expect(loggedInCartItem).not.toBe(null);
    })
})
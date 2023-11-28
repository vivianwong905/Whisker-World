/**
 * @jest-environment jsdom
 */

import React from 'react';
// import extensions to Jest expect
import "@testing-library/jest-dom";

import {render} from '../../__tests__/utils';

import Admin from '../Admin';

import { usersHandlers } from '../../../mocks/serverMock';

import { setupServer } from 'msw/node'

const server = setupServer(...usersHandlers)
  
// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe("<Admin />" , () => {
  
    it("renders the Admin component", ()=>{
        const admin = render(
                    <Admin />
        );
        expect(admin).not.toBe(null);
    });

    //TODO: test that it doesn't render if you are not an admin
})
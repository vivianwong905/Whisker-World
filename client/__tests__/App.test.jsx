/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// import extensions to Jest expect
import "@testing-library/jest-dom";


import App from '../App';

//import react-redux provider and mock store
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'

describe("<App />" , () => {
    const initalState= 
   const mockStore = configureStore();
   let store
    it("renders the App component", ()=>{
        const app = render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        expect(app).not.toBe(null);
    })
})
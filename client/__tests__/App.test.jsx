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
import store from '../redux/store';
import configureStore from 'redux-mock-store'

import { BrowserRouter } from "react-router-dom"

describe("<App />" , () => {
    
    it("renders the App component", ()=>{
        const app = render(
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        );
        expect(app).not.toBe(null);
    })
})
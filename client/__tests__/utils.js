/**
 * @jest-environment jsdom
 */

import React from "react";

import { render } from '@testing-library/react';

import { BrowserRouter } from "react-router-dom";

//import react-redux provider and mock store
import { Provider } from 'react-redux';
import store from '../redux/store';


const AllProviders = ({ children }) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                {children}
            </Provider>
        </BrowserRouter>
    )
};

const customRender = (ui,options) =>{
    return render(ui,{wrapper: AllProviders, ...options})
};

export {customRender as render}
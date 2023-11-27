/**
 * @jest-environment jsdom
 */

import React from 'react';
// import extensions to Jest expect
import "@testing-library/jest-dom";

import {render, screen, fireEvent} from '../../__tests__/utils';

import Login_register from '../Login_register';


describe("<Login_register />" , () => {4
    
    it("renders the Login_register component", ()=>{
        const login_register = render(
                    <Login_register />
        );
        expect(login_register).not.toBe(null);
    });

     it("contains a page with the button and correct text", () => {
        const loginRegister = render(<Login_register />);
        const button = loginRegister.getByText("Log In");

        expect(screen.getByText('Log In')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });
     it("clicks the login button with an empty form", () => {
        const loginRegister = render(<Login_register />);
        const button = loginRegister.getByText("Log In");

        fireEvent.click(button);
        expect(button).toHaveBeenCalledTimes(1)
    });

})
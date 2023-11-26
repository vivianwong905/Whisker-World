/**
 * @jest-environment jsdom
 */

import React from 'react';
// import extensions to Jest expect
import "@testing-library/jest-dom";

import {render} from '../../__tests__/utils';

import NavBar from '../Navbar';


describe("<NavBar />" , () => {
    
    it("renders the NavBar component", ()=>{
        const navbar = render(
                    <NavBar />
        );
        expect(navbar).not.toBe(null);
    });

    it("contains a login or register button with correct text", () => {
   
        const navBar = render(<NavBar />);

        
        const loginOrRegister = navBar.getByText(/Login or Register/i) ;

        
        expect(loginOrRegister).toBeInTheDocument();
    });

    // it("contains a admin button with correct text", () => {
   
    //     const navBar = render(<NavBar />);

        
    //     const admin = navBar.getByText("Admin") ;

        
    //     expect(admin).toBeInTheDocument();
    // });
})

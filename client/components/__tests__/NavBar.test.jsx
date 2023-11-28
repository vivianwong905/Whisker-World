/**
 * @jest-environment jsdom
 */

import React from 'react';
// import extensions to Jest expect
import "@testing-library/jest-dom";

import {render} from '../../__tests__/utils';

import NavBar from '../Navbar';

import { screen, fireEvent } from '@testing-library/react';

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

    //TODO: test this test in the app file for navbar
    // it("contains a products button with correct text", async () => {
   
    //         const navBar = render(<NavBar />);
    //         const menu = await navBar.findByLabelText("menu")
       
    //         fireEvent(menu, new MouseEvent("click"))
    //         const product = navBar.getByText("Products") ;
    //     console.log(navBar)
            
    //         expect(product).toBeInTheDocument();
    //     });

    //TODO: this is less priorty because we are testing for enduser
    // it("contains an admin button with correct text", async () => {
   
    //     const navBar = render(<NavBar />);
    //     const menu = await navBar.findByLabelText("menu")
    //     console.log(menu)
    //     fireEvent(menu, new MouseEvent("click"))
    //     const admin = navBar.getByText("Admin") ;

        
    //     expect(admin).toBeInTheDocument();
    // });
})

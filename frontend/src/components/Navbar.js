import React from 'react';

import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import {Navbar as NavBar, Nav} from 'react-bootstrap'

export default function Navbar(){
  const { authTokens } = useAuth();
    return(
      <NavBar expand="lg">
            <NavBar.Brand >Roomo</NavBar.Brand>
            <NavBar.Toggle aria-controls="basic-navbar-nav" />
            <NavBar.Collapse id="basic-navbar-nav">
                
                <Nav className="ml-auto">
                { !authTokens ? 
                    <React.Fragment>
                         <Nav.Link href="/login">Login</Nav.Link>
                         <Nav.Link href="/signup">Sign up</Nav.Link>
                    </React.Fragment>
                :
                    <React.Fragment>
                        <Nav.Link href="/">Home</Nav.Link>
                        

                        
                    </React.Fragment>}
                </Nav>
                
            </NavBar.Collapse>
        </NavBar>
)
}
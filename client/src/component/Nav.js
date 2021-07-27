import React from "react";
import {Container, Navbar,Nav} from 'react-bootstrap';

function Nabbar(){
 
    return(
        <div className="nav_main">
            <Navbar bg ="light" expand="lg">
            <Container>
                <Navbar.Brand href ="#home">NFTmarket</Navbar.Brand>
                </Container>
                <Navbar.Toggle  aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className ="me-auto">
                    <Nav.Link>Useraccount</Nav.Link>
                        <Nav.Link href="#">Home</Nav.Link>
                        <Nav.Link href="#explore">Explore</Nav.Link>
                        
                    </Nav>
                </Navbar.Collapse>
           
            </Navbar>

        </div>
    )
}
export default Nabbar;


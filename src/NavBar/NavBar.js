import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import './NavBar.css'
import prime_logo from '../images/prime_logo.png';

class NavBar extends React.Component {
	render() {
		return (
			<Navbar bsStyle="inverse">
				<Navbar.Header>
					<Navbar.Toggle/>
					<Navbar.Brand>
						<a>
							<img className="prime_logo" src={prime_logo} />
						</a>
					</Navbar.Brand>
			    </Navbar.Header>
			    <Navbar.Collapse >
				    <Nav>
				        <NavItem eventKey={1} href="#">Link Right</NavItem>
				        <NavItem eventKey={2} href="#">Link Right</NavItem>
			      	</Nav>
			    </Navbar.Collapse>
			</Navbar>
		)
	}
};

export default NavBar;
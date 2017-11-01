import React from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import './NavBar.css'
import prime_logo from '../images/prime_logo.png';
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
	render() {
		return (
			<Navbar bsStyle="inverse">
				<Navbar.Header>
					<Navbar.Toggle className="pull-left"/>
					<Navbar.Brand>
						<Link to="/HomePage">
							<img className="prime_logo" src={prime_logo} />
						</Link>
					</Navbar.Brand>
			    </Navbar.Header>
			    <Navbar.Collapse >
				    <Nav>
				        <NavItem eventKey={1} href="/Cadastrar">Cadastrar Anúncio</NavItem>
				        <NavItem eventKey={2} href="/Editar">Editar Anúncio</NavItem>
			      	</Nav>
			    </Navbar.Collapse>
			</Navbar>
		)
	}
};

export default NavBar;
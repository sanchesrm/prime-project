import React from 'react';
import { Button, FormGroup, InputGroup, FormControl, Glyphicon, Container } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar'
import './HomePage.css'
import cadastrar_novo from '../images/cadastrar_novo_anuncio.png'
import editar_anuncio from '../images/editar_anuncio.png'

class HomePage extends React.Component {
	render() {
		return (
			<div className="full-size-div homePage">
				<NavBar />
				<div className="container">
					<FormGroup className="search-group">
						<InputGroup>
							<InputGroup.Addon className="addon-rounded search-addon">
								<Glyphicon glyph="search" className="search-glyph"/>
							</InputGroup.Addon>							
							<input type="text" placeholder="" className="search-input input-rounded" />
							<Button className="btn-search">Buscar</Button
>						</InputGroup>
					</FormGroup>
				</div>
				<div className="container">
					<Button className="btn-anuncio cadastrar" block>
						<img src={cadastrar_novo} className="pull-right"/>
						<span>Cadastrar<br/>Novos Anúncios</span>
					</Button>
					<Button className="btn-anuncio editar" block>
						<img src={editar_anuncio} className="pull-left"/>
						<span>Editar Anúncios</span>
					</Button>
				</div>
			</div>
		)
	}
};

export default HomePage;
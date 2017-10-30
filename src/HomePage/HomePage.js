import React from 'react';
import { Button } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar'
import './HomePage.css'
import cadastrar_novo from '../images/cadastrar_novo_anuncio.png'
import editar_anuncio from '../images/editar_anuncio.png'
import Buscar from '../Anuncio/Components/Buscar'

class HomePage extends React.Component {
	constructor(props){
        super(props);
        this.cadastrar_anuncio = this.cadastrar_anuncio.bind(this);
        this.editar_anuncio = this.editar_anuncio.bind(this);
    }

    cadastrar_anuncio(ev) {
    	ev.preventDefault();
    	this.props.history.push('/Cadastrar');
    }

    editar_anuncio(ev) {
    	ev.preventDefault();
    	this.props.history.push('/Editar')
    }

	render() {
		return (
			<div className="homePage">
				<NavBar />
				<div className="container">
					<Buscar />

					<div className="container-buttons">
						<Button className="btn-anuncio cadastrar" onClick={this.cadastrar_anuncio} block>
							<img src={cadastrar_novo} className="pull-right"/>
							<span>Cadastrar<br/>Novos Anúncios</span>
						</Button>
						<Button className="btn-anuncio editar" onClick={this.editar_anuncio} block>
							<img src={editar_anuncio} className="pull-left"/>
							<span>Editar Anúncios</span>
						</Button>
					</div>
				</div>
			</div>
		)
	}
};

export default HomePage;
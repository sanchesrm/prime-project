import React from 'react'
import NavBar from '../../NavBar/NavBar'
import { Image, Row, Col, Grid } from 'react-bootstrap'
import './SubmitAnuncio.css' 
import submitSuccess from '../../images/submit_success.png'
import { Link } from 'react-router-dom'


class SubmitAnuncio extends React.Component {
	render() {
		return (
			<div className="homePage">
				<NavBar />
				<div className="container submitAnuncio">
					<Image src={submitSuccess} className="submit-status-img" />
					<h3 className="center">Anúncios Cadastrados</h3>
					<h3 className="center">com sucesso!</h3>
					<div className="results-container"> 
						<Row className="result facebook-result">
							<span className="pull-left">Facebook</span>
							<span className="pull-right status">OK!</span>
						</Row>
						<Row className="result instagram-result">
							<span className="pull-left">Instagram</span>
							<span className="pull-right status">OK!</span>
						</Row>
						<Row className="result site-result">
							<span className="pull-left">Site</span>
							<span className="pull-right status">OK!</span>
						</Row>
						<Row className="result olx-result">
							<span className="pull-left">OLX</span>
							<span className="pull-right status">OK!</span>
						</Row>
						<Row className="result mercado-livre-result">
							<span className="pull-left">Mercado Livre</span>
							<span className="pull-right status">OK!</span>
						</Row>
					</div>

					<Row className="submit-btns">
						<Col xs={6} className="no-margins">
							<Link className="btn btn-create" to="/Cadastrar">Criar Anúncio</Link> 
						</Col>
						<Col xs={6}>
							<Link className="btn btn-success" to="/HomePage">Finalização</Link> 
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

export default SubmitAnuncio;
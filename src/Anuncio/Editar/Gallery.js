import React from 'react'
import NavBar from '../../NavBar/NavBar'
import Buscar from '../Components/Buscar'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import ReactLoading from 'react-loading'
import '../../HomePage/HomePage.css'
import './Gallery.css'
import cookie from 'react-cookies'

import announcement_car from "../../images/announcement-car.png"

class Editar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: '',
			loading: true,
			error: '',
            token: cookie.load('token')
		}
		if (!this.state.token) {
			this.props.history.push('/');
    	}
	}

	componentDidMount() {
		axios.get('https://api.devalex.me/anuncios', { params: {token: this.state.token} })
			.then(response => {
				console.log(response);
				this.setState({
					data: response.data,
					loading: false
				});
			})
			.catch(error => {
				console.log('Error fetching and parsing data', error);
				this.setState({
					loading: false,
					error: error
				});
			}
		);
	}

	handleEdit(ev, id_anuncio) {
    	ev.preventDefault();

		this.props.history.push({
			pathname: '/Cadastrar',
			state: { id_anuncio: id_anuncio }
		});
	}

	render() {
		let content;

		if (this.state.loading) {
			content = <ReactLoading type="spokes" color="#fff" className="spinner-loading" />;
		} else if (this.state.error) {
			content = <div className="error-message"><h2>Houve um erro ao sincronizar os anúncios!</h2></div>
		} else { 
			content = this.state.data.map((anuncio, index) => {
				return (
					<div className="each-announcement" key={anuncio.id}>
						<Row className="announcement">
							<Col xs={5} className="imgColumn">
								<img src="" />
							</Col>
							<Col xs={7} className="infoColumn">
								<span className="title"></span>

								<Row className="infoDetail">
									<Col xs={6}>
										Ano: { anuncio.ano }
									</Col>
									<Col xs={6}>
										KM: { anuncio.km }
									</Col>
								</Row>
								<Row className="infoDetail">
									<Col xs={6}>
										Câmbio: 
									</Col>
									<Col xs={6}>
										Final Place: { anuncio.finalplaca }
									</Col>
								</Row>
								<Row className="infoDetail">
									<Col xs={6}>
										Cor: { anuncio.cor }
									</Col>
								</Row>
								<div className="btn-div">
									<Button className="btn-excluir">Excluir</Button>
									<Button className="btn-edit" onClick={(e) => this.handleEdit(e, anuncio.id)}>Editar</Button>
								</div>
							</Col>
						</Row>
					</div>
				);
			});


		
			// content = 
			// 	<div>
			// 		<div className="each-announcement">
			// 			<Row className="announcement">
			// 				<Col xs={5} className="imgColumn">
			// 					<img src={announcement_car} />
			// 				</Col>
			// 				<Col xs={7} className="infoColumn">
			// 					<span className="title">VOLKSWAGEN FOX 1.0 MI 8V FLEX 4P MANUAL</span>

			// 					<Row className="infoDetail">
			// 						<Col xs={6}>
			// 							Ano: 2012/2013
			// 						</Col>
			// 						<Col xs={6}>
			// 							KM: 78.000
			// 						</Col>
			// 					</Row>
			// 					<Row className="infoDetail">
			// 						<Col xs={6}>
			// 							Câmbio: Manual
			// 						</Col>
			// 						<Col xs={6}>
			// 							Final Place: 6
			// 						</Col>
			// 					</Row>
			// 					<Row className="infoDetail">
			// 						<Col xs={6}>
			// 							Cor: Cinza
			// 						</Col>
			// 					</Row>
			// 					<div className="btn-div">
			// 						<Button className="btn-excluir">Excluir</Button>
			// 						<Button className="btn-edit">Editar</Button>
			// 					</div>
			// 				</Col>
			// 			</Row>
			// 		</div>
			// 		<div className="each-announcement">
			// 			<Row className="announcement">
			// 				<Col xs={5} className="imgColumn">
			// 					<img src={announcement_car} />
			// 				</Col>
			// 				<Col xs={7} className="infoColumn">
			// 					<span className="title">VOLKSWAGEN FOX 1.0 MI 8V FLEX 4P MANUAL</span>

			// 					<Row className="infoDetail">
			// 						<Col xs={6}>
			// 							Ano: 2012/2013
			// 						</Col>
			// 						<Col xs={6}>
			// 							KM: 78.000
			// 						</Col>
			// 					</Row>
			// 					<Row className="infoDetail">
			// 						<Col xs={6}>
			// 							Câmbio: Manual
			// 						</Col>
			// 						<Col xs={6}>
			// 							Final Place: 6
			// 						</Col>
			// 					</Row>
			// 					<Row className="infoDetail">
			// 						<Col xs={6}>
			// 							Cor: Cinza
			// 						</Col>
			// 					</Row>
			// 					<div className="btn-div">
			// 						<Button className="btn-excluir">Excluir</Button>
			// 						<Button className="btn-edit">Editar</Button>
			// 					</div>
			// 				</Col>
			// 			</Row>
			// 		</div>
			// 		<div className="each-announcement">
			// 			<Row className="announcement">
			// 				<Col xs={5} className="imgColumn">
			// 					<img src={announcement_car} />
			// 				</Col>
			// 				<Col xs={7} className="infoColumn">
			// 					<span className="title">VOLKSWAGEN FOX 1.0 MI 8V FLEX 4P MANUAL</span>

			// 					<Row className="infoDetail">
			// 						<Col xs={6}>
			// 							Ano: 2012/2013
			// 						</Col>
			// 						<Col xs={6}>
			// 							KM: 78.000
			// 						</Col>
			// 					</Row>
			// 					<Row className="infoDetail">
			// 						<Col xs={6}>
			// 							Câmbio: Manual
			// 						</Col>
			// 						<Col xs={6}>
			// 							Final Place: 6
			// 						</Col>
			// 					</Row>
			// 					<Row className="infoDetail">
			// 						<Col xs={6}>
			// 							Cor: Cinza
			// 						</Col>
			// 					</Row>
			// 					<div className="btn-div">
			// 						<Button className="btn-excluir">Excluir</Button>
			// 						<Button className="btn-edit">Editar</Button>
			// 					</div>
			// 				</Col>
			// 			</Row>
			// 		</div>	
			// 	</div>;
		}


		return (
			<div className="homePage editar-gallery">
				<NavBar />
				<div className="container main-content">
					<Buscar />
					<h4>Anúncios Cadastrados</h4>
				</div>
				<Grid>
					{content}
				</Grid>
			</div>
		);
	}
}

export default Editar;
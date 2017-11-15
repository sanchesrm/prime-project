import React from 'react'
import NavBar from '../../NavBar/NavBar'
import Buscar from '../Components/Buscar'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import ReactLoading from 'react-loading'
import '../../HomePage/HomePage.css'
import './Gallery.css'

import announcement_car from "../../images/announcement-car.png"

class Editar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: '',
			loading: true,
			error: ''
		};
	}

	componentDidMount() {
		axios.get('http://app.devalex.me/anuncios')
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

	render() {
		let content;

		if (this.state.loading) {
			content = <ReactLoading type="spokes" color="#fff" className="spinner-loading" />;
		} else if (this.state.error) {
			content = <div className="error-message"><h2>Houve um erro ao sincronizar os anúncios!</h2></div>
		} else { 
			// content = this.state.data.map((user, index) => {
			// 	return (
			// 		<div key={index}>
			// 			<b>Username:</b>&nbsp;{user.username},&nbsp;
			// 			<b>Email:</b>&nbsp;{user.email}&nbsp;
			// 		</div>
			// 	);
			// });
		
			content = 
				<div>
					<div className="each-announcement">
						<Row className="announcement">
							<Col xs={5} className="imgColumn">
								<img src={announcement_car} />
							</Col>
							<Col xs={7} className="infoColumn">
								<span className="title">VOLKSWAGEN FOX 1.0 MI 8V FLEX 4P MANUAL</span>

								<Row className="infoDetail">
									<Col xs={6}>
										Ano: 2012/2013
									</Col>
									<Col xs={6}>
										KM: 78.000
									</Col>
								</Row>
								<Row className="infoDetail">
									<Col xs={6}>
										Câmbio: Manual
									</Col>
									<Col xs={6}>
										Final Place: 6
									</Col>
								</Row>
								<Row className="infoDetail">
									<Col xs={6}>
										Cor: Cinza
									</Col>
								</Row>
								<div className="btn-div">
									<Button className="btn-excluir">Excluir</Button>
									<Button className="btn-edit">Editar</Button>
								</div>
							</Col>
						</Row>
					</div>
					<div className="each-announcement">
						<Row className="announcement">
							<Col xs={5} className="imgColumn">
								<img src={announcement_car} />
							</Col>
							<Col xs={7} className="infoColumn">
								<span className="title">VOLKSWAGEN FOX 1.0 MI 8V FLEX 4P MANUAL</span>

								<Row className="infoDetail">
									<Col xs={6}>
										Ano: 2012/2013
									</Col>
									<Col xs={6}>
										KM: 78.000
									</Col>
								</Row>
								<Row className="infoDetail">
									<Col xs={6}>
										Câmbio: Manual
									</Col>
									<Col xs={6}>
										Final Place: 6
									</Col>
								</Row>
								<Row className="infoDetail">
									<Col xs={6}>
										Cor: Cinza
									</Col>
								</Row>
								<div className="btn-div">
									<Button className="btn-excluir">Excluir</Button>
									<Button className="btn-edit">Editar</Button>
								</div>
							</Col>
						</Row>
					</div>
					<div className="each-announcement">
						<Row className="announcement">
							<Col xs={5} className="imgColumn">
								<img src={announcement_car} />
							</Col>
							<Col xs={7} className="infoColumn">
								<span className="title">VOLKSWAGEN FOX 1.0 MI 8V FLEX 4P MANUAL</span>

								<Row className="infoDetail">
									<Col xs={6}>
										Ano: 2012/2013
									</Col>
									<Col xs={6}>
										KM: 78.000
									</Col>
								</Row>
								<Row className="infoDetail">
									<Col xs={6}>
										Câmbio: Manual
									</Col>
									<Col xs={6}>
										Final Place: 6
									</Col>
								</Row>
								<Row className="infoDetail">
									<Col xs={6}>
										Cor: Cinza
									</Col>
								</Row>
								<div className="btn-div">
									<Button className="btn-excluir">Excluir</Button>
									<Button className="btn-edit">Editar</Button>
								</div>
							</Col>
						</Row>
					</div>	
				</div>;
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
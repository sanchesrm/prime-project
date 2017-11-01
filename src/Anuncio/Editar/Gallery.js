import React from 'react'
import NavBar from '../../NavBar/NavBar'
import Buscar from '../Components/Buscar'
import { Grid, Row } from 'react-bootstrap'
import '../../HomePage/HomePage.css'
import './Gallery.css'

class Editar extends React.Component {
	render() {
		return (
			<div className="homePage">
				<NavBar />
				<div className="container main-content editar-gallery">
					<Buscar />
					<Grid>
						<h4>Anúncios Cadastrados</h4>
						<div className="each-announcement">
							<Row className="announcement">
								
							</Row>
						</div>
					</Grid>
				</div>
			</div>
		);
	}
}

export default Editar;
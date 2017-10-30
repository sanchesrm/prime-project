import React from 'react'
import NavBar from '../../NavBar/NavBar'
import Buscar from '../Components/Buscar'
import '../../HomePage/HomePage.css'

class Editar extends React.Component {
	render() {
		return (
			<div className="homePage">
				<NavBar />
				<div className="container main-content">
					<Buscar />
				</div>
			</div>
		);
	}
}

export default Editar;
import React from 'react'
import { Button, FormGroup, InputGroup, Glyphicon } from 'react-bootstrap';

class Buscar extends React.Component {
	render() {
		return (	
			<FormGroup className="search-group">
				<InputGroup>
					<InputGroup.Addon className="addon-rounded search-addon">
						<Glyphicon glyph="search" className="search-glyph"/>
					</InputGroup.Addon>							
					<input type="text" placeholder="" className="search-input input-rounded" />
					<Button className="btn-search">Buscar</Button>						
				</InputGroup>
			</FormGroup>
		)
	}
}

export default Buscar;
import React from 'react'
import { Col, Thumbnail, Button, InputGroup, Glyphicon } from 'react-bootstrap'
import thumbnail_img from '../../images/thumbnail.png'

class Gallery extends React.Component {
	removeImgFromArray(i, ev) {
		this.props.photos.splice(i, 1);
		this.setState({
			photos: this.props.photos
		})
	}

	render() {
		if (!this.props.photos.length) {
			return <div className="no-photos-selected"><Col xs={12}>Não há fotos selecionadas!</Col></div>
		}

		return (
			<div>
				{this.props.photos.map((list,i) => 
					<Col xs={3} key={i}>
						<InputGroup>
							<Thumbnail href="#" src={list.src_logo} alt={thumbnail_img} />
							<Button className="remove-button" bsSize="xs" onClick={this.removeImgFromArray.bind(this, i)}>
								<Glyphicon glyph="remove"/>
							</Button>
							<Button className="edit-button" bsSize="xs" onClick={this.props.editImgFromArray.bind(this, i)}>
								<Glyphicon glyph="pencil"/>
							</Button>
						</InputGroup>
					</Col>
				)}
			</div>
		)
	}
}

export default Gallery;
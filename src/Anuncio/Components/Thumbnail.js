import React from 'react'
import { Thumbnail, Button, InputGroup, Glyphicon } from 'react-bootstrap'
import thumbnail_img from '../../images/thumbnail.png'

class CustomThumbnail extends React.Component {
	render() {
		return (
			<InputGroup>
				<Thumbnail href="#" src={thumbnail_img} />
				<Button className="remove-button" bsSize="xs">
					<Glyphicon glyph="remove"/>
				</Button>
				<Button className="edit-button" bsSize="xs">
					<Glyphicon glyph="pencil"/>
				</Button>
			</InputGroup>
		)
	}
}

export default CustomThumbnail;
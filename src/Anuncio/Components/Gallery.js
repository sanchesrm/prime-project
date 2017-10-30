import React from 'react'
import { Row, Col } from 'react-bootstrap'
import CustomThumbnail from './Thumbnail'

class Gallery extends React.Component {
	render() {
		return (
			<div>
				<Row>
					<Col xs={3}>
						<CustomThumbnail />
					</Col>
					<Col xs={3}>
						<CustomThumbnail />
					</Col>
					<Col xs={3}>
						<CustomThumbnail />
					</Col>
					<Col xs={3}>
						<CustomThumbnail />
					</Col>
				</Row>
				<Row>
					<Col xs={3}>
						<CustomThumbnail />
					</Col>
					<Col xs={3}>
						<CustomThumbnail />
					</Col>
					<Col xs={3}>
						<CustomThumbnail />
					</Col>
					<Col xs={3}>
						<CustomThumbnail />
					</Col>
				</Row>
			</div>
		)
	}
}

export default Gallery;
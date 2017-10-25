import React from 'react'

class PanelHeader extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<div>
				<input type='checkbox' className='accordion_checkbox' />
				<span> Test </span>
			</div>
		)
	}
}

export default PanelHeader
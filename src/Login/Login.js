import React, { Component } from 'react';
import { Button, FormGroup, InputGroup, FormControl, Glyphicon } from 'react-bootstrap';
import './Login.css';

class Login extends Component {
	constructor(props){
        super(props);
        this.clickToLogin = this.clickToLogin.bind(this);
    }

    clickToLogin(ev) {
    	ev.preventDefault();
    	this.props.history.push('/HomePage');
    }

	render() {
		return (
			<div className="full-screen-div">
				<div className="another-div-for-background-image">
					<div className="prime-logo"> </div>
					<div className="login-container">
						<form>
							<FormGroup>
								<InputGroup>
									<InputGroup.Addon className="addon-rounded addon-style">
										<Glyphicon glyph="user"/>
									</InputGroup.Addon>
									<FormControl type="text" className="login-input input-rounded" placeholder="Usuário"/>
								</InputGroup>
							</FormGroup>

							<FormGroup>
								<InputGroup>
									<InputGroup.Addon className="addon-rounded addon-style">
										<Glyphicon glyph="lock"/>
									</InputGroup.Addon>
									<FormControl type="password" className="login-input input-rounded" placeholder="Senha" />
								</InputGroup>
							</FormGroup>

							<Button className="btn-login rounded-input" onClick={this.clickToLogin} block>Login</Button>
						</form>
					</div>
					</div>
			</div>
		);
	}
}

export default Login;

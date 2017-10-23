import React, { Component } from 'react';
import { Button, FormGroup, InputGroup, FormControl, Glyphicon } from 'react-bootstrap';
import './Login.css';

class Login extends Component {
	render() {
		return (
			<div className="full-screen-div">
				<div className="login-container">
					<form>
						<FormGroup>
							<InputGroup>
								<InputGroup.Addon>
									<Glyphicon glyph="user"/>
								</InputGroup.Addon>
								<FormControl type="text" className="login-input" placeholder="Usuário"/>
							</InputGroup>
						</FormGroup>

						<FormGroup>
							<InputGroup>
								<InputGroup.Addon>
									<Glyphicon glyph="lock"/>
								</InputGroup.Addon>
								<FormControl type="password" className="login-input" placeholder="Senha" />
							</InputGroup>
						</FormGroup>

						<Button className="btn-login rounded-input" block>Login</Button>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;

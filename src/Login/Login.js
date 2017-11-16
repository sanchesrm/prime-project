import React, { Component } from 'react';
import { Button, FormGroup, InputGroup, FormControl, Glyphicon } from 'react-bootstrap';
import axios from 'axios'
import './Login.css';
import NotificationSystem from 'react-notification-system'
import cookie from 'react-cookies'

class Login extends Component {
	constructor(props){
        super(props);
        this.clickToLogin = this.clickToLogin.bind(this);
    }

	componentDidMount() {
		this._notificationSystem = this.refs.notificationSystem;
	}

    clickToLogin(ev) {
    	ev.preventDefault();
		// let data = new FormData();
		var data = new URLSearchParams();
		data.append('username', this.state.username);
		data.append('password', this.state.password);
    	axios.post('https://api.devalex.me/auth', data)
			.then(response => {
				console.log(response);
				cookie.save('token', response.data.token, { path: '/' })
    			this.props.history.push('/HomePage');
			})
			.catch(error => {
				console.log('Error fetching and parsing data', error);
				this.addNotification();
			}
		);
    }

	addNotification = () => {
		this._notificationSystem.addNotification({
			message: 'Não foi possível autenticar. Verifique seu usuário e senha!',
			level: 'error',
			position: 'bc',
			autoDismiss: '3',
			dismissible: false
		});
	}

	handleInputChange(e){
		this.setState({ 
			...this.state, [e.target.name]: e.target.value
		});
	}

	render() {
		var style = {
			NotificationItem: {
				DefaultStyle: {
					margin: '10px 5px 2px 1px',
					height: '80px',
					'font-size': '20px'
				}
			}
		}

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
									<FormControl type="text" className="login-input input-rounded" placeholder="Usuário" name="username" onChange={(e) => this.handleInputChange(e)}/>
								</InputGroup>
							</FormGroup>

							<FormGroup>
								<InputGroup>
									<InputGroup.Addon className="addon-rounded addon-style">
										<Glyphicon glyph="lock"/>
									</InputGroup.Addon>
									<FormControl type="password" className="login-input input-rounded" placeholder="Senha" name="password" onChange={(e) => this.handleInputChange(e)}/>
								</InputGroup>
							</FormGroup>

							<Button className="btn-login rounded-input" onClick={this.clickToLogin} block>Login</Button>
						</form>
					</div>
				</div>

				<NotificationSystem ref="notificationSystem" style={style} />
			</div>
		);
	}
}

export default Login;

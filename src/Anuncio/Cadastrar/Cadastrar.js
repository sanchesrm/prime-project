import React from 'react'
import ReactDOM from 'react-dom'
import Toggle from 'react-toggle'
import { FormControl, Col, Row, Grid, Checkbox, Label, Panel, Accordion, Radio, Button, Glyphicon } from 'react-bootstrap'
import NavBar from '../../NavBar/NavBar'
import Gallery from '../Components/Gallery'
import './Cadastrar.css'
import $ from 'jquery'

class Cadastrar extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.setState({
			olxPanel: ReactDOM.findDOMNode(this.refs.olxPanel).offsetTop,
			mercado_livre: ReactDOM.findDOMNode(this.refs.mercado_livre).offsetTop 
		});
	}

	handleShow(elem) {
		if (elem === "olx") 
			$('html,body').animate({scrollTop: this.state.olxPanel}, 800);
		else 
			$('html,body').animate({scrollTop: this.state.mercado_livre}, 800);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.history.push('/SubmitAnuncio')
	}

	render() {
		return (
			<div className="cadastrarAnuncio">
				<NavBar />
				<form onSubmit={this.handleSubmit.bind(this)} >
					<div className="container main-content">
						<Grid>
							<Row><h3>Cadastrar Anúncio</h3></Row>
							<Row className="selecting-car-usage">
								<Col xs={4} className="no-padding">
									<Radio name="announcement-type">
										<div className="check">
											<span>Novo</span>
										</div>
									</Radio>
								</Col>
								<Col xs={4} className="no-padding">
									<Radio name="announcement-type">
										<div className="check">
											<span>Usado</span>
										</div>
									</Radio>
								</Col>
								<Col xs={4} className="no-padding">
									<Button className="icon-button">
										<Glyphicon glyph="camera"/>
									</Button>
								</Col>
							</Row>
							<Row><FormControl placeholder="Título do Anúncio" /></Row>
							<Row><FormControl placeholder="Marca" /></Row>
							<Row><FormControl placeholder="Modelo" /></Row>
							<Row>
								<Col xs={6} className="no-padding first-child">
									<FormControl placeholder="Ano" />
								</Col>
								<Col xs={6} className="no-padding second-child">
									<FormControl placeholder="Modelo" />
								</Col>
							</Row>
							<Row><FormControl placeholder="Combustível" /></Row>
							<Row><FormControl placeholder="Câmbio" /></Row>
							<Row>
								<Col xs={6} className="no-padding first-child">
									<FormControl placeholder="KM" />
								</Col>
								<Col xs={6} className="no-padding second-child">
									<FormControl placeholder="Cor" />
								</Col>
							</Row>
							<Row>
								<Col xs={6} className="no-padding first-child">
									<FormControl placeholder="Tipo" />
								</Col>
								<Col xs={6} className="no-padding second-child">
									<FormControl placeholder="Portas" />
								</Col>
							</Row>
							<Row>
								<Col xs={6} className="no-padding first-child">
									<FormControl placeholder="Final da Placa" />
								</Col>
								<Col xs={6} className="no-padding second-child">
									<FormControl placeholder="Preço" />
								</Col>
							</Row>
							<div className="checkbox-group">
								<Row>
									<Col xs={12}>
										<span>Principais Opcionais:</span>
									</Col>
									<div className="checkboxes">
										<Col xs={6} className="no-padding">
											<Checkbox>
												<span>Alarme</span>
											</Checkbox>
										</Col>
										<Col xs={6} className="no-padding">
											<Checkbox>
												<span>Ar condicionado</span>
											</Checkbox>
										</Col>
										<Col xs={6} className="no-padding">
											<Checkbox>
												<span>Direção Hidráulica</span>
											</Checkbox>
										</Col>
										<Col xs={6} className="no-padding">
											<Checkbox>
												<span>Travas Elétricas</span>
											</Checkbox>
										</Col>
										<Col xs={6} className="no-padding">
											<Checkbox>
												<span>Vidros Elétricos</span>
											</Checkbox>
										</Col>
									</div>
								</Row>
							</div>
							<Row>
	      						<FormControl componentClass="textarea" placeholder="Observações do Vendedor" />
							</Row>
							<div className="toggle-group">
								<Row>
									<Col xs={6} className="no-padding first-child">
										<Label className="label-checkbox">
											<Toggle icons={false} />
											<span>Facebook</span>
										</Label>
									</Col>
									<Col xs={6} className="no-padding first-child">
										<Label className="label-checkbox">
											<Toggle icons={false} />
											<span>Instagram</span>
										</Label>
									</Col>
								</Row>
								<Row>
									<Col xs={6} className="no-padding first-child">
										<Label className="label-checkbox">
											<Toggle icons={false} />
											<span>Site</span>
										</Label>
									</Col>
									<Col xs={6} className="no-padding first-child">
										<Label className="label-checkbox">
											<Toggle icons={false} />
											<span>OLX</span>
										</Label>
									</Col>
								</Row>
								<Row>
									<Col xs={6} className="no-padding first-child">
										<Label className="label-checkbox">
											<Toggle icons={false} />
											<span>Mercado Livre</span>
										</Label>
									</Col>
								</Row>
							</div>
						</Grid>
					</div>
					<div>
						<Grid>
							<Row><h3>Opções de Publicação</h3></Row>
							<Row>
								<Accordion> 
									<Panel header="OLX" eventKey="1" onClick={this.handleShow.bind(this, 'olx')} ref="olxPanel">
										<Grid>
											<Row><h4>Informações restantes</h4></Row>
											<Row><FormControl placeholder="Categoria" /></Row>
											<Row><FormControl placeholder="CEP" /></Row>
											<Row><FormControl placeholder="Estado" /></Row>
											<Row><FormControl placeholder="Região" /></Row>
											<Row><FormControl placeholder="Município" /></Row>
											<Row><FormControl placeholder="Bairro" /></Row>

											<Row className="toggle-group">
												<Col xs={2} className="eu-sou-label"> 
													<span>Eu sou </span>
												</Col>
												<Col xs={4}>
													<Label className="label-checkbox">
														<Toggle icons={false} />
														<span>Particular</span>
													</Label>
												</Col>
												<Col xs={3} className="third-checkbox">
													<Label className="label-checkbox">
														<Toggle icons={false} />
														<span>Profissional</span>
													</Label>
												</Col>
											</Row>

											<Row><FormControl placeholder="Empresa" /></Row>
											<Row><FormControl placeholder="E-mail" /></Row>
											<Row><FormControl placeholder="Telefone" /></Row>
										</Grid>
									</Panel>
									<Panel header="Mercado Livre" eventKey="2" onClick={this.handleShow.bind(this, 'mercado_livre')} ref="mercado_livre">
										<Grid>
											<Row><h4>Informações restantes</h4></Row>
											<Row><FormControl placeholder="Categoria" /></Row>
											<Row><FormControl placeholder="Link do Youtube" /></Row>
											<Row><FormControl placeholder="Estado" /></Row>
											<Row><FormControl placeholder="Município" /></Row>
											<Row><FormControl placeholder="Bairro" /></Row>
											<Row><FormControl placeholder="Telefone" /></Row>
											<Row><FormControl placeholder="Horário de Contato" /></Row>

											<Row><h4>Escolha Tipo de Anúncio</h4></Row>
											<div className="selecting-announcement-type">
												<Row>
													<Col xs={5} className="no-padding">
														<Radio name="announcement-type">
															<div className="check">
																<span>Diamante</span>
															</div>
														</Radio>
													</Col>
													<Col xs={7} className="no-padding">
														<span>R$ 179 Pague parcelado</span>
													</Col>
												</Row>
												<Row>
													<Col xs={5} className="no-padding">
														<Radio name="announcement-type">
															<div className="check">
																<span>Ouro</span>
															</div>
														</Radio>
													</Col>
													<Col xs={7} className="no-padding">
														<span>R$ 119 Pague parcelado</span>
													</Col>
												</Row>
												<Row>
													<Col xs={5} className="no-padding">
														<Radio name="announcement-type">
															<div className="check">
																<span>Prata</span>
															</div>
														</Radio>
													</Col>
													<Col xs={7} className="no-padding">
														<span>R$ 69 Pague parcelado</span>
													</Col>
												</Row>
												<Row>
													<Col xs={5} className="no-padding">
														<Radio name="announcement-type">
															<div className="check">
																<span>Gratuito</span>
															</div>
														</Radio>
													</Col>
													<Col xs={7} className="no-padding">
														<span>Grátis</span>
													</Col>
												</Row>
											</div>
										</Grid>
									</Panel>
								</Accordion>
							</Row>
						</Grid>
					</div>
					<div>
						<Grid className="announcement-gallery">
							<Row><h3>Fotos do Anúncio</h3></Row>

							<div className="thumbnail-container">
								<Gallery />
							</div>
						</Grid>	
					</div>

					<div className="publish-button">
						<Button type="submit" bsStyle="success" bsSize="large" >Publicar</Button>
					</div>
				</form>
			</div>
		)
	}
};

export default Cadastrar;
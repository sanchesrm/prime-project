import React from 'react'
import Toggle from 'react-toggle'
import { FormControl, Col, Row, Grid, Checkbox, Label, PanelGroup, Panel, Accordion } from 'react-bootstrap'
import NavBar from '../../NavBar/NavBar'
import './Cadastrar.css'

class Cadastrar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="cadastrarAnuncio">
				<NavBar />
				<div className="container main-content">
					<Grid>
						<Row><h3>Cadastrar Anúncio</h3></Row>
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
					<Grid>
						<Row><h3>Opções de Publicação</h3></Row>
						<Row>
							<Accordion> 
								<Panel header="OLX" eventKey="1">Panel 1 content</Panel>
								<Panel header="Mercado Livre" eventKey="2">Panel 2 content</Panel>
								<Panel header="Facebook" eventKey="3">Panel 2 content</Panel>
								<Panel header="Facebook" eventKey="4">Panel 2 content</Panel>
								<Panel header="Instagram" eventKey="5">Panel 2 content</Panel>
								<Panel header="Site" eventKey="6">Panel 2 content</Panel>
							</Accordion>
						</Row>
					</Grid>
			</div>
		)
	}
};

export default Cadastrar;
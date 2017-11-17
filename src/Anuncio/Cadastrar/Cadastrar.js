import React from 'react'
import ReactDOM from 'react-dom'
import Toggle from 'react-toggle'
import { FormControl, Col, Row, Grid, Checkbox, Label, Panel, Accordion, Radio, Button, Glyphicon, Modal } from 'react-bootstrap'
import NavBar from '../../NavBar/NavBar'
import Gallery from '../Components/Gallery'
import './Cadastrar.css'
import $ from 'jquery'
import interact from 'interact.js'
import html2canvas from 'html2canvas'
// import prime_logo_photo from '../../images/prime_logo_photo.png'
import NotificationSystem from 'react-notification-system'
import cookie from 'react-cookies'
import axios from 'axios'

class Cadastrar extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getPhoto = this.getPhoto.bind(this);
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.saveImg = this.saveImg.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.openModalManually = this.openModalManually.bind(this);

		this.state = {
			showModal: false,
            imagePreviewUrl: '',
            photos: [],
            selected_photo: {},
            form_cadastro: {},
            token: cookie.load('token'),
            id_anuncio: this.props.location.state ? this.props.location.state.id_anuncio : null 
		}
		if (!this.state.token) {
			this.props.history.push('/');
    	} else if (this.state.id_anuncio) {
			var self = this;
			axios.get('https://api.devalex.me/anuncios/' + this.state.id_anuncio, { params: {token: this.state.token} })
				.then(response => {
					console.log(response.data);
					self.setState({
						form_cadastro: response.data,
						loading: false
					});
				})
				.catch(error => {
					console.log('Error fetching and parsing data', error);
					self.setState({
						loading: false,
						error: error
					});
				}
			);
    	}
	}

	showModal() {
		this.setState({ showModal: true });
	}

	openModalManually() {
		this.showModal();
	}

	hideModal() {
		this.setState({ showModal: false });
		interact('.resize-drag').unset();
	}

	rotateImg() {
		var img_preview = $('#img-preview');
		var angle = Number(img_preview.attr('class')) + 90;
		img_preview.css('transform','rotate(' + angle + 'deg)');
		img_preview.attr('class', angle);
	}


	addNotification = () => {
		this._notificationSystem.addNotification({
			message: 'Imagem Salva Com Sucesso!',
			level: 'success',
			position: 'bc',
			autoDismiss: '3',
			dismissible: false
		});
	}

	saveImg() {
		var this_local = this;
		html2canvas(document.getElementById('car-image-div'), {
			onrendered: function(canvas) {
				var src = canvas.toDataURL();
				this_local.setState({
					photos: [...this_local.state.photos, { 'src_logo': src, 'src': this_local.state.imagePreviewUrl}]
				});
				this_local.addNotification();
				this_local.hideModal();
			}, fail: function() {
				console.log("aqui");
			}
		});
	}

	editImgFromArray(i) {
		this.setState({
			selected_photo: {
				src: this.state.photos[i].src,
				src_logo: this.state.photos[i].src_logo,
			},
			imagePreviewUrl: this.state.photos[i].src,
            showModal: true
		});
    	// this.setInteract();
	}

	componentDidMount() {
		this.setState({
			olxPanel: ReactDOM.findDOMNode(this.refs.olxPanel).offsetTop,
			mercado_livre: ReactDOM.findDOMNode(this.refs.mercado_livre).offsetTop 
		});

		this._notificationSystem = this.refs.notificationSystem;
	}

	handleShow(elem) {
		if (elem === "olx") 
			$('html,body').animate({scrollTop: this.state.olxPanel}, 800);
		else 
			$('html,body').animate({scrollTop: this.state.mercado_livre}, 800);
	}

	handleInputChange(e){
		this.setState({
			form_cadastro: { 
				...this.state.form_cadastro, [e.target.name]: e.target.value
			}
		});
		// console.log(this.state.form_cadastro);
	}

	handleCheckboxChange(e) {
		this.setState({
			form_cadastro: { 
				...this.state.form_cadastro, [e.target.name]: e.target.checked
			}
		});	
	}

	handleToggleChange(e) {
		this.setState({
			form_cadastro: { 
				...this.state.form_cadastro, [e.target.name]: e.target.value === 'on' ? true : false
			}
		});
	}

	handleRadioChange(e) {
		this.setState({
			form_cadastro: { 
				...this.state.form_cadastro, [e.target.name]: e.target.value
			}
		});	
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({
			form_cadastro: { 
				...this.state.form_cadastro, photos: this.state.photos
			}
		});
		this.props.history.push({
			pathname: '/SubmitAnuncio',
			state: { form_cadastro: this.state.form_cadastro }
		});
	}

    getPhoto(e) {
        e.preventDefault();

        var reader = new FileReader();
        var file = e.target.files[0];

        reader.readAsDataURL(file);
        reader.onloadend = () => {
        	this.showModal();
            this.setState({
                imagePreviewUrl: reader.result
            });

        	// this.setInteract();
        }
    }

    setInteract() {
        interact('.resize-drag')
        .draggable({
            inertia: true,
            restrict: {
                restriction: document.getElementById('img-preview'),
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
                endOnly: true
            }
        })
        .resizable({
            preserveAspectRatio: true,
            edges: { left: true, right: true, bottom: true, top: true }
        })
        .on('resizemove', function (event) {
            var target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0),
                y = (parseFloat(target.getAttribute('data-y')) || 0);

            // update the element's style
            target.style.width  = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';

            // translate when resizing from top or left edges
            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.webkitTransform = target.style.transform =
                'translate(' + x + 'px,' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        })
        .on('dragmove', function (event) {
            const target = event.target
            // keep the dragged position in the data-x/data-y attributes
            const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
            const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

            // translate the element
            target.style.webkitTransform =
            target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)'

            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        })
	}

	createSelectItemsForYear() {
		let items = [];   
		items.push(<option key="" value="">Ano</option>) 
		for (let i = new Date().getFullYear(); i >= 1970; i--) {             
			items.push(<option key={i} value={i}>{i}</option>);
		}
		return items;
	}

	render() {
        var {imagePreviewUrl} = this.state;
        var imagePreview = (<div className="loading-msg"><span>Loading Image...</span></div>);
        var resizeContainer = null;
        if (imagePreviewUrl) {
            imagePreview = (<img src={imagePreviewUrl} id="img-preview" className="" />);
            // resizeContainer = (<img className="resize-drag " src={prime_logo_photo} />);
        }

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
			<div className="cadastrarAnuncio">
				<NavBar />
				<form onSubmit={this.handleSubmit.bind(this)} >
					<div className="container main-content">
						<Grid id="main-grid">
							<Row><h3>Cadastrar Anúncio</h3></Row>
							<Row className="selecting-car-usage">
								<Col xs={4} className="no-padding">
									<Radio name="car-state" value="novo" onChange={(e) => this.handleRadioChange(e)}>
										<div className="check">
											<span>Novo</span>
										</div>
									</Radio>
								</Col>
								<Col xs={4} className="no-padding">
									<Radio defaultChecked name="car-state" value="usado" onChange={(e) => this.handleRadioChange(e)}>
										<div className="check">
											<span>Usado</span>
										</div>
									</Radio>
								</Col>
								<Col xs={4} className="no-padding">
									<Button className="icon-button" id="camera-img" htmlFor="camera-input" onClick={this.openModalManually}>
										<Glyphicon glyph="camera"/>
										<FormControl id="camera-input" type="file" accept="image/*" capture="camera" onChange={this.getPhoto}/> 
									</Button>
								</Col>
							</Row>
							<Row><FormControl placeholder="Título do Anúncio" type="text" name="titulo_anuncio" onChange={(e) => this.handleInputChange(e)} /></Row>
							<Row><FormControl placeholder="Marca" type="text" name="marca" onChange={(e) => this.handleInputChange(e)} /></Row>
							<Row><FormControl placeholder="Modelo" type="text" name="modelo" onChange={(e) => this.handleInputChange(e)} /></Row>
							<Row>
								<Col xs={6} className="no-padding first-child">
									<FormControl placeholder="Ano" componentClass="select" name="ano" onChange={(e) => this.handleInputChange(e)} value={ this.state.form_cadastro.ano }>
										{ this.createSelectItemsForYear() }
									</FormControl>
								</Col>
								<Col xs={6} className="no-padding second-child">
									<FormControl placeholder="Modelo" type="text" name="modelo" onChange={(e) => this.handleInputChange(e)} />
								</Col>
							</Row>
							<Row>
								<FormControl placeholder="Combustível" type="text" componentClass="select" onChange={(e) => this.handleInputChange(e)}>
									<option key="" value="">Combustível</option>
									<option key="Gasolina" value="Gasolina">Gasolina</option>
									<option key="Álcool" value="Álcool">Álcool</option>
									<option key="Diesel" value="Diesel">Diesel</option>
									<option key="GNV" value="GNV">GNV</option>
								</FormControl>
							</Row>
							<Row><FormControl placeholder="Câmbio" type="text" onChange={(e) => this.handleInputChange(e)} /></Row>
							<Row>
								<Col xs={6} className="no-padding first-child">
									<FormControl placeholder="KM" type="text" name="km" onChange={(e) => this.handleInputChange(e)} value={ this.state.form_cadastro.km ? this.state.form_cadastro.km : "" } />
								</Col>
								<Col xs={6} className="no-padding second-child">
									<FormControl placeholder="Cor" type="text" name="cor" onChange={(e) => this.handleInputChange(e)} value={ this.state.form_cadastro.cor ? this.state.form_cadastro.cor : "" }/>
								</Col>
							</Row>
							<Row>
								<Col xs={6} className="no-padding first-child">
									<FormControl placeholder="Tipo" type="text" onChange={(e) => this.handleInputChange(e)} />
								</Col>
								<Col xs={6} className="no-padding second-child">
									<FormControl placeholder="Portas" type="text" name="portas" onChange={(e) => this.handleInputChange(e)} value={ this.state.form_cadastro.portas ? this.state.form_cadastro.portas : "" } />
								</Col>
							</Row>
							<Row>
								<Col xs={6} className="no-padding first-child">
									<FormControl placeholder="Final da Placa" type="text" name="finalplace" onChange={(e) => this.handleInputChange(e)} value={ this.state.form_cadastro.finalplaca ? this.state.form_cadastro.finalplaca : ""  } />
								</Col>
								<Col xs={6} className="no-padding second-child">
									<FormControl placeholder="Preço" type="text" name="preco" onChange={(e) => this.handleInputChange(e)} value={ this.state.form_cadastro.preco ? this.state.form_cadastro.preco : ""  } />
								</Col>
							</Row>
							<div className="checkbox-group">
								<Row>
									<Col xs={12}>
										<span>Principais Opcionais:</span>
									</Col>
									<div className="checkboxes">
										<Col xs={6} className="no-padding">
											<Checkbox name="alarme" name="alarme" onChange={(e) => this.handleCheckboxChange(e)} checked={ this.state.form_cadastro.alarme == 'S' ? true : false } >
												<span>Alarme</span>
											</Checkbox>
										</Col>
										<Col xs={6} className="no-padding">
											<Checkbox name="ar_condicionado" name="ar" onChange={(e) => this.handleCheckboxChange(e)} checked={ this.state.form_cadastro.ar == 'S' ? true : false } >
												<span>Ar condicionado</span>
											</Checkbox>
										</Col>
										<Col xs={6} className="no-padding">
											<Checkbox name="direcao_hidraulica" name="direcao" onChange={(e) => this.handleCheckboxChange(e)} checked={ this.state.form_cadastro.direcao == 'S' ? true : false } >
												<span>Direção Hidráulica</span>
											</Checkbox>
										</Col>
										<Col xs={6} className="no-padding">
											<Checkbox name="travas_eletricas" name="trava" onChange={(e) => this.handleCheckboxChange(e)} checked={ this.state.form_cadastro.trava == 'S' ? true : false } >
												<span>Travas Elétricas</span>
											</Checkbox>
										</Col>
										<Col xs={6} className="no-padding">
											<Checkbox name="vidros_eletricos" name="vidro" onChange={(e) => this.handleCheckboxChange(e)} checked={ this.state.form_cadastro.vidro == 'S' ? true : false } >
												<span>Vidros Elétricos</span>
											</Checkbox>
										</Col>
									</div>
								</Row>
							</div>
							<Row>
	      						<FormControl componentClass="textarea" name="observacao" placeholder="Observações do Vendedor" value={ this.state.form_cadastro.observacao ? this.state.form_cadastro.observacao : ""  } />
							</Row>
							<div className="toggle-group">
								<Row>
									<Col xs={6} className="no-padding first-child">
										<Label className="label-checkbox">
											<Toggle icons={false} name="facebook"  onChange={(e) => this.handleToggleChange(e)} />
											<span>Facebook</span>
										</Label>
									</Col>
									<Col xs={6} className="no-padding first-child">
										<Label className="label-checkbox">
											<Toggle icons={false} name="instagram"  onChange={(e) => this.handleToggleChange(e)} />
											<span>Instagram</span>
										</Label>
									</Col>
								</Row>
								<Row>
									<Col xs={6} className="no-padding first-child">
										<Label className="label-checkbox">
											<Toggle icons={false} name="site"  onChange={(e) => this.handleToggleChange(e)} />
											<span>Site</span>
										</Label>
									</Col>
									<Col xs={6} className="no-padding first-child">
										<Label className="label-checkbox">
											<Toggle icons={false} name="olx"  onChange={(e) => this.handleToggleChange(e)} />
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
											<Row><FormControl placeholder="Categoria" type="text" onChange={(e) => this.handleInputChange(e)} /></Row>
											<Row><FormControl placeholder="CEP" type="text" onChange={(e) => this.handleInputChange(e)} /></Row>
											<Row><FormControl placeholder="Estado" type="text" onChange={(e) => this.handleInputChange(e)} /></Row>
											<Row><FormControl placeholder="Região" type="text" onChange={(e) => this.handleInputChange(e)} /></Row>
											<Row><FormControl placeholder="Município" type="text" onChange={(e) => this.handleInputChange(e)} /></Row>
											<Row><FormControl placeholder="Bairro" type="text" onChange={(e) => this.handleInputChange(e)} /></Row>

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

											<Row><FormControl placeholder="Empresa" type="text" onChange={(e) => this.handleInputChange(e)} /></Row>
											<Row><FormControl placeholder="E-mail" type="text" onChange={(e) => this.handleInputChange(e)} /></Row>
											<Row><FormControl placeholder="Telefone" type="text" onChange={(e) => this.handleInputChange(e)} /></Row>
										</Grid>
									</Panel>
									<Panel header="Mercado Livre" eventKey="2" onClick={this.handleShow.bind(this, 'mercado_livre')} ref="mercado_livre">
										<Grid>
											<Row><h4>Informações restantes</h4></Row>
											<Row><FormControl placeholder="Categoria" type="text" onChange={(e) => this.handleInputChange(e)} /></Row>
											<Row><FormControl placeholder="Link do Youtube" type="text" onChange={(e) => this.handleInputChange(e)} /></Row>
											<Row><FormControl placeholder="Estado" type="text" onChange={(e) => this.handleInputChange(e)} /></Row>
											<Row><FormControl placeholder="Município" type="text" onChange={(e) => this.handleInputChange(e)} /></Row>
											<Row><FormControl placeholder="Bairro" type="text" onChange={(e) => this.handleInputChange(e)} /></Row>
											<Row><FormControl placeholder="Telefone" type="text" onChange={(e) => this.handleInputChange(e)} /></Row>
											<Row><FormControl placeholder="Horário de Contato" type="text" onChange={(e) => this.handleInputChange(e)} /></Row>

											<Row><h4>Escolha Tipo de Anúncio</h4></Row>
											<div className="selecting-announcement-type">
												<Row>
													<Col xs={5} className="no-padding">
														<Radio name="announcement-type" value="diamante" onChange={(e) => this.handleRadioChange(e)}>
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
														<Radio name="announcement-type" value="ouro" onChange={(e) => this.handleRadioChange(e)}>
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
														<Radio name="announcement-type" value="prata" onChange={(e) => this.handleRadioChange(e)}>
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
														<Radio name="announcement-type" value="gratuito" onChange={(e) => this.handleRadioChange(e)} defaultChecked>
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
									<Panel header="Instagram" eventKey="3">
									</Panel>
									<Panel header="Facebook" eventKey="4">
									</Panel>
									<Panel header="Site" eventKey="5">
									</Panel>
								</Accordion>
							</Row>
						</Grid>
					</div>
					<div>
						<Grid className="announcement-gallery">
							<Row><h3>Fotos do Anúncio</h3></Row>

							<div className="thumbnail-container">
								<Gallery photos={this.state.photos} editImgFromArray={this.editImgFromArray.bind(this)} />
							</div>
						</Grid>	
					</div>

					<div className="publish-button">
						<Button type="submit" bsStyle="success" bsSize="large">Publicar</Button>
					</div>

			        <Modal show={this.state.showModal} onHide={this.hideModal} className="modal-container custom-map-modal" >
						<Modal.Header closeButton>
						</Modal.Header>
						<Modal.Body>
							<div className="car-image-div" id="car-image-div">
								<div className="car-image-div" id="car-image-div">
									<div className="car-image" id="car-image">
										{imagePreview}
									</div>
									<div id="watermark-container" className="watermark-container">
										{resizeContainer}
									</div>
								</div>
							</div>
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={this.rotateImg} className="btn-repeat">
								<Glyphicon glyph="repeat" />
							</Button>
							<Button onClick={this.saveImg} className="btn-ok">
								<Glyphicon glyph="ok" />
							</Button>
						</Modal.Footer>
					</Modal>
				</form>
				<NotificationSystem ref="notificationSystem" style={style} />
			</div>
		)
	}
};


	// <div className="car-image-div" id="car-image-div">
		// <div className="car-image" id="car-image">
			// {imagePreview}
		// </div>
		// <div id="watermark-container" className="watermark-container">
			// {resizeContainer}
		// </div>
	// </div>

export default Cadastrar;
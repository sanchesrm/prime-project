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
import prime_logo_photo from '../../images/prime_logo_photo.png'

class Cadastrar extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getPhoto = this.getPhoto.bind(this);
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.saveImg = this.saveImg.bind(this);
		this.openModalManually = this.openModalManually.bind(this);


		this.state = {
			showModal: false,
            imagePreviewUrl: '',
            photos: [],
            selected_photo: {},
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

	saveImg() {
		var this_local = this;
		html2canvas(document.getElementById('car-image-div'), {
			onrendered: function(canvas) {
				var src = canvas.toDataURL();
				this_local.setState({
					photos: [...this_local.state.photos, { 'src_logo': src, 'src': this_local.state.imagePreviewUrl}]
				});
				// console.log(this_local.state.photos.length);
				this_local.hideModal();
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

    getPhoto(e) {
        e.preventDefault();

        var reader = new FileReader();
        var file = e.target.files[0];

        reader.readAsDataURL(file);
        reader.onloadend = () => {
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

	render() {
        var {imagePreviewUrl} = this.state;
        var imagePreview = (<div className="loading-msg"><span>Loading Image...</span></div>);
        var resizeContainer = null;
        if (imagePreviewUrl) {
            imagePreview = (<div><img src={imagePreviewUrl} id="img-preview" className="" /><div className="black-color-div"></div></div>);
            // resizeContainer = (<img className="resize-drag " src={prime_logo_photo} />);
        }

		return (
			<div className="cadastrarAnuncio">
				<NavBar />
				<form onSubmit={this.handleSubmit.bind(this)} >
					<div className="container main-content">
						<Grid>
							<Row><h3>Cadastrar Anúncio</h3></Row>
							<Row className="selecting-car-usage">
								<Col xs={4} className="no-padding">
									<Radio name="car-state">
										<div className="check">
											<span>Novo</span>
										</div>
									</Radio>
								</Col>
								<Col xs={4} className="no-padding">
									<Radio defaultChecked name="car-state">
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
								<Gallery photos={this.state.photos} showModal={this.state.showModal} imagePreviewUrl={this.state.imagePreviewUrl} showModal={this.showModal} editImgFromArray={this.editImgFromArray.bind(this)} />
							</div>
						</Grid>	
					</div>

					<div className="publish-button">
						<Button type="submit" bsStyle="success" bsSize="large" >Publicar</Button>
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
			</div>
		)
	}
};
			        // <Modal {...this.props} show={this.state.showModal} onHide={this.hideModal} dialogClassName="custom-modal" className="modal-container custom-map-modal" >



	// <div className="car-image-div" id="car-image-div">
		// <div className="car-image" id="car-image">
			// {imagePreview}
		// </div>
		// <div id="watermark-container" className="watermark-container">
			// {resizeContainer}
		// </div>
	// </div>

export default Cadastrar;
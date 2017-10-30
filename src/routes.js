import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './Login/Login'
import HomePage from './HomePage/HomePage'
import Cadastrar from './Anuncio/Cadastrar/Cadastrar'
import Editar from './Anuncio/Editar/Gallery'
import SubmitAnuncio from './Anuncio/SubmitAnuncio/SubmitAnuncio'

const Routes = (props) => (
    <BrowserRouter>
    	<div>
    		<Switch>
	        	<Route exact path="/HomePage" component={HomePage} />
	        	<Route exact path="/Cadastrar" component={Cadastrar} />
	        	<Route exact path="/Editar" component={Editar} />
	        	<Route exact path="/SubmitAnuncio" component={SubmitAnuncio} />
	        	<Route component={Login} />
        	</Switch>
    	</div>        
    </BrowserRouter>
);

export default Routes;
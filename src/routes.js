import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './Login/Login'
import HomePage from './HomePage/HomePage'
import Cadastrar from './Anuncio/Cadastrar/Cadastrar'

const Routes = (props) => (
    <BrowserRouter>
    	<div>
    		<Switch>
	        	<Route exact path="/HomePage" component={HomePage} />
	        	<Route exact path="/Cadastrar" component={Cadastrar} />
	        	<Route component={Login} />
        	</Switch>
    	</div>        
    </BrowserRouter>
);

export default Routes;
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './Login/Login';
import HomePage from './HomePage/HomePage'

const Routes = (props) => (
    <BrowserRouter>
    	<div>
    		<Switch>
	        	<Route exact path="/HomePage" component={HomePage} />
	        	<Route component={Login} />
        	</Switch>
    	</div>        
    </BrowserRouter>
);

export default Routes;
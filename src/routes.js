import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Login from './Login/Login';

const Routes = (props) => (
    <BrowserRouter>
        <Login/>
    </BrowserRouter>
);

export default Routes;
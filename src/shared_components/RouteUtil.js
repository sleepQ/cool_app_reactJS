import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { urlTo } from '../utils/helper_functions';
import jwt_decode from 'jwt-decode';

export function isUserLoggedIn() {
    const token = localStorage.usertoken || {};
    let decoded = {};

    try {
        decoded = jwt_decode(token);
    } catch(e) {
        return ({
            id: '',
            isLoggedIn: false
        });
    }

    return ({
        id: decoded.id,
        isLoggedIn: true
    });
}


export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => {
        const { isLoggedIn } = isUserLoggedIn();

        if (isLoggedIn) {
            return <Component {...props} {...rest} />;
        }

        return <Redirect to={urlTo('login')} />;
    }} />
);

export const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => {
        const { isLoggedIn } = isUserLoggedIn();

        if (isLoggedIn) {
            return <Redirect to="/" />;
        }

        return <Component {...props} {...rest} />;
    }} />
);

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
            username: '',
            email: '',
            isLoggedIn: false
        });
    }

    return ({
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
        isLoggedIn: true
    });
}


export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => {
        const user = isUserLoggedIn();

        if (user.isLoggedIn) {
            return <Component user={user} {...props} />;
        }

        return <Redirect to={urlTo('login')} />;
    }} />
);

export const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => {
        const user = isUserLoggedIn();

        if (user.isLoggedIn) {
            return <Redirect to="/" />;
        }

        return <Component {...props} />;
    }} />
);

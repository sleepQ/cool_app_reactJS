import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { urlTo, isUserLoggedIn } from '../utils/helper_functions';


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

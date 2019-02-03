import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { PrivateRoute, AuthRoute } from './shared_components/RouteUtil';

import NotFound from './shared_components/NotFound';
import Navbar from './shared_components/nav_bar_component/Navbar';
// import Footer from './shared_components/footer_component/Footer';
import Home from './components/home_component/Home';

import Login from './components/login_component/Login';
import Register from './components/register_component/Register';
import Profile from './components/profile_component/Profile';
import MoviesTable from './components/movies_table_component/MoviesTable';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <div className="container">
            <Switch>
              <AuthRoute exact path="/register" component={Register} />
              <AuthRoute exact path="/login" component={Login} />

              <Route exact path="/" component={Home} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/movies" component={MoviesTable} />

              <Route component={NotFound} />
            </Switch>
          </div>
          { /* <Footer /> */ }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

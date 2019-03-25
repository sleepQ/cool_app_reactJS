import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { isUserLoggedIn } from './utils/helper_functions';
import { fetchUser } from './app_user_endpoints';

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
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };

    this.getUser = this.getUser.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  componentDidMount() {
    const { isLoggedIn } = isUserLoggedIn();
    if (isLoggedIn) {
      this.getUser();
    }
  }

  setUser(user) {
    this.setState(() => ({ user }));
  }

  getUser() {
    fetchUser().then(res => {
      if (res.ok) {
        this.setUser({ ...res.user, isLoggedIn: !!res.user });
      } else {
        try {
          localStorage.removeItem('usertoken');
        } catch (error) {
          console.log(error);
        }
        console.log("USER FETCH ERROR");
      }
    });
  }

  render() {
    const { user } = this.state;

    return (
      <BrowserRouter>
        <div>
          <Navbar user={user} setUser={this.setUser} />
          <div className="container">
            <Switch>
              <AuthRoute exact path="/register" component={Register} />
              <AuthRoute exact path="/login" user={user} getUser={this.getUser} component={Login} />

              <Route exact path="/" component={Home} />
              <PrivateRoute exact path="/profile" user={user} setUser={this.setUser} component={Profile} />
              <PrivateRoute exact path="/movies" component={MoviesTable} />

              <Route component={NotFound} />
            </Switch>
          </div>
          { /* <Footer /> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

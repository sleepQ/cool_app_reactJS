import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import socketIo from 'socket.io-client';
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
import PrivateMessage from './shared_components/private_message_component/PrivateMessage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      chatBoxes: []
    };

    this.socket = socketIo('http://localhost:5000');

    this.getUser = this.getUser.bind(this);
    this.setUser = this.setUser.bind(this);
    this.openChatBox = this.openChatBox.bind(this);
    this.closeChatBox = this.closeChatBox.bind(this);
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
        this.setUser({ ...res.user });
      } else {
        this.setUser({});
        try {
          localStorage.removeItem('usertoken');
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  openChatBox(e, username) {
    e.stopPropagation();
    const { chatBoxes } = this.state;

    if (chatBoxes.length > 2 || chatBoxes.indexOf(username) !== -1)
      return;

    this.setState(prevState => ({
      chatBoxes: prevState.chatBoxes.concat(username)
    }));
  }

  closeChatBox(e) {
    e.stopPropagation();
    const { value } = e.currentTarget;

    this.setState(prevState => ({
      chatBoxes: prevState.chatBoxes.filter(username => username !== value)
    }));
  }

  render() {
    const { user = {}, chatBoxes } = this.state;

    return (
      <BrowserRouter>
        <div>
          <Navbar user={user} setUser={this.setUser} socket={this.socket} />
          <div>
            <Switch>
              <AuthRoute exact path="/register" component={Register} />
              <AuthRoute exact path="/login" user={user} getUser={this.getUser} component={Login} />

              <Route exact path="/" component={Home} />
              <PrivateRoute exact path="/users/:username" user={user} setUser={this.setUser} component={Profile} openChatBox={this.openChatBox} />
              <PrivateRoute exact path="/movies" component={MoviesTable} />

              <Route component={NotFound} />
            </Switch>
          </div>
          { /* <Footer /> */}

          {user.email && <PrivateMessage socket={this.socket} chatBoxes={chatBoxes} openChatBox={this.openChatBox} closeChatBox={this.closeChatBox} />}

        </div>
      </BrowserRouter>
    );
  }
}

export default App;

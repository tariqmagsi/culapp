import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';
import "tachyons";
import "./style/style.css";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import ResetPassword from './components/Reset Password/ResetPassword';
import CreateEvent from './components/Dashboard/Create Event/Create Event';
import EventList from './components/Dashboard/Event List/Event List';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import Profile from './components/Dashboard/Profile/Profile';
import Settings from './components/Dashboard/Settings/Settings';
import FollowRequests from './components/Dashboard/Follow Requests/FollowRequests';
import Notifications from './components/Dashboard/Notifications/Notifications';
import AdminRequests from './components/Dashboard/Admin Requests/AdminRequests';
import Sidebar from './components/Sidebar/Sidebar';
import Event from './components/Dashboard/Event List/Event';

class App extends Component {
  state = {
    isOpened: true
  }

  changeState = () => {
    this.setState({isOpened: !this.state.isOpened})
  }

  componentDidMount() {
    if(window.innerWidth < 600) {
      this.setState({isOpened: false})
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Login} exact/>
          <Route path="/signup" component={Signup} exact/>
          <Route path="/reset_password" component={ResetPassword}/>
          <PrivateRoute>
            <Route path="/create_event" exact>
              <CreateEvent isOpened={this.state.isOpened} changeState={this.changeState} />
            </Route>
            <Route path="/event_list" exact>
              <EventList isOpened={this.state.isOpened} changeState={this.changeState} />
            </Route>
            {/* <Route path="/event">
              <Event isOpened={this.state.isOpened} changeState={this.changeState} />
            </Route> */}
            <Route path="/profile" exact>
              <Profile isOpened={this.state.isOpened} changeState={this.changeState} />
            </Route>
            <Route path="/notifications" exact>
              <Notifications isOpened={this.state.isOpened} changeState={this.changeState} />
            </Route>
            <Route path="/settings" exact>
              <Settings isOpened={this.state.isOpened} changeState={this.changeState} />
            </Route>
            <Route path="/follow_requests" exact>
              <FollowRequests isOpened={this.state.isOpened} changeState={this.changeState} />
            </Route>
            <Route path="/admin_requests" exact>
              <AdminRequests isOpened={this.state.isOpened} changeState={this.changeState} />
            </Route>
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

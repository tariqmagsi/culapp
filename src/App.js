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
import Profiles from './components/Dashboard/Profile/Profiles';
import Settings from './components/Dashboard/Settings/BothSettings';
import FollowRequests from './components/Dashboard/Follow Requests/FollowRequestMain';
import Notifications from './components/Dashboard/Notifications/Notifications';
import AdminRequests from './components/Dashboard/Admin Requests/AdminRequestMain';
import Home from './components/Dashboard/Home/Home';
import Event from "./components/Dashboard/Event List/Event";
import EditEvent from './components/Dashboard/Event List/Edit Event Main';
import Footer from "./start/components/Footer/Footer";
import HomeStart from "./start/components/Home/Homestart";
import Privacy from "./start/components/Privacy/Privacy";
import Terms from "./start/components/Terms/Terms";
import NotFound from "./start/components/Notfound/Notfound";
import { Helmet } from 'react-helmet';

class App extends Component {
  state = {
    isOpened: true,
  }

  changeIsOk = () => {
    this.setState({isOk: true})
  }

  changeState = () => {
    this.setState({isOpened: !this.state.isOpened})
  }

  checkLocation = () => {
    return window.location.pathname.split("/")[2] === "business" || window.location.pathname.split("/")[2] === "organization" || window.location.pathname.split("/")[2] === "university"
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
          <Route path="/" exact>
            <Helmet bodyAttributes={{style: 'background : white !important'}}/>
            <HomeStart />
            <Footer />
          </Route>
          <Route path="/terms" exact>
            <Helmet bodyAttributes={{style: 'background : white !important'}}/>
            <Terms />
            <Footer />
          </Route>
          <Route path="/privacy" exact>
            <Helmet bodyAttributes={{style: 'background : white !important'}}/>
            <Privacy />
            <Footer />
          </Route>
          <Route path="/login" component={Login} exact/>
          <Route path="/signup" component={Signup} exact/>
          <Route path="/reset_password" component={ResetPassword}/>
          <PrivateRoute>
            <Route path="/home">
              <Home isOpened={this.state.isOpened} changeState={this.changeState} />
            </Route>
            <Route path="/create_event" exact>
              <CreateEvent isOpened={this.state.isOpened} changeState={this.changeState} />
            </Route>
            <Route path="/event_list" exact>
              <EventList isOpened={this.state.isOpened} changeState={this.changeState} />
            </Route>
            <Route path="/event_list/event">
              <Event isOpened={this.state.isOpened} changeState={this.changeState} />
            </Route>
            <Route path="/event_list/edit_event">
              <EditEvent isOpened={this.state.isOpened} changeState={this.changeState} />
            </Route>
            <Route path="/profile"> 
              <Profiles isOpened={this.state.isOpened} changeState={this.changeState}/>
            </Route>
            <Route path="/notifications">
              <Notifications isOpened={this.state.isOpened} changeState={this.changeState} />
            </Route>
            <Route path="/settings">
              <Settings isOpened={this.state.isOpened} changeState={this.changeState} />
            </Route>
            <Route path="/follow_requests" exact>
              <FollowRequests isOpened={this.state.isOpened} changeState={this.changeState} />
            </Route>
            <Route path="/admin_requests" exact>
              <AdminRequests isOpened={this.state.isOpened} changeState={this.changeState} />
            </Route>
          </PrivateRoute>
          <Route path="/">
            <Helmet bodyAttributes={{style: 'background : white !important'}}/>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

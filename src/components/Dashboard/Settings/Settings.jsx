import React, {Component} from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import {Helmet} from "react-helmet"
import { Nav, Row, Col, Tab, Alert } from 'react-bootstrap';
import NotificationSettings from './NotificationSettings';
import PrivacySettings from './PrivacySettings';
import SecuritySettings from './SecuritySettings';
import { refreshToken } from '../../../PrivateRoute/isLogin';
import { getFromStorage } from '../../../utils/storage';

const color = "#229a88";

export default class Settings extends Component {
    whenChangeHandler = (e) => {
        const { name, value } = e.target;
        this.setState({[name]: value})
    }

    componentDidMount(){
        if(getFromStorage("user")) {
            refreshToken();
        }
    }

    render() {
        return (
            <div>
                <Helmet bodyAttributes={{style: 'background : #eee !important'}}/>
                <Sidebar isOpened={this.props.isOpened} changeState={this.props.changeState}/>
                <div style={{marginLeft: window.innerWidth > 600 ? (this.props.isOpened ? "200px" : "55px") : "55px",  color: "black", paddingTop: "50px", paddingLeft: "10px", overflowX: "auto"}}>
                    <h3 style={{color, marginLeft: "20px"}}>Settings</h3>
                    {
                        getFromStorage("user") ? !getFromStorage("user").user.is_account_setup &&
                        <Alert variant="danger" style={{fontSize: "12px"}}>
                            Go to profile and update it
                        </Alert>
                        :
                        <span></span>
                    }
                    <div style={{backgroundColor: "white", paddingLeft: "10px", borderRadius: 10, paddingRight: "20px", marginLeft: "20px", marginRight: "20px", overflowX: "auto"}}>
                    <br/>
                    <Tab.Container defaultActiveKey="privacy">
                        <Row>
                            <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="privacy">Privacy</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="notification">Notification</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="security">Security</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="privacy">
                                        <PrivacySettings />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="notification">
                                        <NotificationSettings />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="security">
                                        <SecuritySettings />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                    <br/>
                    </div>
                    
                </div>
                
            </div>
        )
    }
}
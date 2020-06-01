import React, {Component} from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import {Helmet} from "react-helmet"
import Api from "../../../Api/Api.json";
import axios from 'axios';
import { getFromStorage } from '../../../utils/storage';
import img from "../../../image/user.png"
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { refreshToken } from '../../../PrivateRoute/isLogin';
import { Badge, Row, Col, Alert } from 'react-bootstrap';
import { getHeaders } from '../../../utils/headers';
import { withRouter } from 'react-router';

const color = "#229a88";
const norificationUrl = Api.BASE_URL + Api.NOTIFICATIONS_LIST;
const eventsUrl = Api.BASE_URL + Api.EVENTS_LIST;
const usersUrl = Api.BASE_URL + Api.ACCOUNT_STATUS;

class Home extends Component {
    state = { isLoading: true, eventsList: [], notifications: [], organizations: [], universities: [], business: [], months: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Dec"],}

    fetchNotificationsList = () => {
        const headers = getHeaders();

        axios
        .get(norificationUrl, headers)
        .then(res => this.setState({isLoading: false, notifications: res.data.results ? res.data.results : []}))
        .catch(err => this.setState({isLoading: false}))
    }

    fetchEventsList = () => {
        const headers = getHeaders();

        axios
        .get(eventsUrl, headers)
        .then(res => this.setState({eventsList: res.data.results ? res.data.results : []}, () => {
            this.fetchNotificationsList();
        }))
        .catch(err => this.setState({isLoading: false}))
    }

    fetchAccountStatus = () => {
        const headers = getHeaders();

        axios
        .get(usersUrl, headers)
        .then(res => this.setState({ 
            organizations: res.data.organization_admins, 
            business: res.data.business_admins,
            universities: res.data.university_admins
        }, () => { this.fetchEventsList() }))
        .catch(err => this.setState({isLoading: false}))
    }

    componentDidMount(){
        if(getFromStorage("user")) {
            refreshToken();
            this.fetchAccountStatus();
        } else {
            this.setState({isLoading: false})
        }
    }

    render() {
        return (
            <div style={{overflowX: "hidden"}}>
                <Helmet bodyAttributes={{style: 'background : #eee !important'}}/>
                <Sidebar isOpened={this.props.isOpened} changeState={this.props.changeState}/>
                <div style={{marginLeft: window.innerWidth > 600 ? (this.props.isOpened ? "200px" : "55px") : "55px",  color: "black", paddingTop: "60px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "10px"}}>
                    {!this.state.isLoading ?
                    <div>
                    {
                        getFromStorage("user") ? !getFromStorage("user").user.is_account_setup &&
                        <Alert variant="danger" style={{fontSize: "12px"}}>
                            Go to profile and update it
                        </Alert>
                        :
                        <span></span>
                    }
                    <Row>
                        <Col sm="6">
                    <div className="pa4 ma1 shadow-4 bg-white" style={{borderRadius: 10}}>
                        <div style={{height: "360px", overflow: "hidden"}}>
                        <h4>Notifications</h4>
                        {this.state.notifications.map(item =>
                        <div key={item.id} className="ma0 pa0 v-top dib Cards" style={{cursor: "pointer", background:  "white", width: "100%", borderBottom: "0.5px solid #eee"}}>
                            {item.seen && <Badge variant="danger" size="sm" style={{width: "10px", position: "absolute", marginTop: "5px", height: "10px",borderRadius: "50%", marginLeft: "5px"}}>{" "}</Badge>}
                            <div className="ma2 pa0 dib v-top" style={{overflowX: "auto"}}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style={{position: "absolute"}}>
                                                <img 
                                                    src={item.image} alt="home" 
                                                    className="notification-img"
                                                    style={{width:"50px", height: "50px", borderRadius: "50%"}}
                                                />
                                            </td>
                                            <td style={{paddingLeft: "60px"}} className="notification-td">
                                                <span className="notification" style={{fontSize: "14px", fontWeight: "600"}}>
                                                    {item.title} 
                                                </span>
                                                {" "}
                                                <span className="notification" style={{fontSize: "14px", color: "gray"}}>sent you a message</span>
                                                
                                                <div className="notification" style={{fontSize: "14px"}}>
                                                    {item.text}
                                                </div>
                                                <div className="notification" style={{fontSize: "12px", color: "silver"}}>
                                                    {item.created_date}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                
                            </div>
                        </div>)}
                        {this.state.notifications.length === 0 && 
                        <div style={{textAlign: "center", marginTop: "20px"}}>
                            No Notifications
                        </div>}
                        </div>
                        {this.state.notifications.length > 0 &&
                        <div style={{textAlign: "right", cursor: "pointer"}} onClick={() => this.props.history.push("/notifications")}>
                            See more
                        </div>}
                    </div>
                    </Col>
                    <Col sm="6">
                    <div className="pa4 ma1 shadow-4 bg-white" style={{borderRadius: 10}}>
                        <div style={{height: "360px", overflow: "hidden"}}>
                        <h4>Posts</h4>
                        <h6>Write a Post</h6>
                        </div>
                    </div>
                    </Col>
                    </Row>
                    <Row>
                        <Col sm="6">
                    <div className="pa4 ma1 shadow-4 bg-white" style={{borderRadius: 10}}>
                        <div style={{ height: "440px", overflow: "hidden"}}>
                        <h4>Events</h4>
                        {this.state.eventsList.map(item =>
                    <div key={item.slug} className="ma2 pa0 v-top dib Cards" style={{cursor: "pointer", background:  "white", width: "100%", borderBottom: "0.5px solid #eee", borderRadius: 10}} onClick={() => this.props.history.push(`/event/${item.slug}`)}>
                        <div className="ma0 pa0 dib v-top">
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{position: "relative", width: "100px"}}>
                                            <div className="profile-container">
                                                {item.cover === "" ?
                                                <img 
                                                    src={require("../../../image/cover.png")} alt="home" 
                                                    className="cover-event"
                                                    style={{width:"100px", height: "100px", borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}
                                                />
                                                :
                                                <img 
                                                    src={item.cover} alt="home" 
                                                    className="cover-event"
                                                    style={{width:"100px", height: "100px", borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}
                                                />
                                                }
                                                    <div className="event-middle" style={{color: "white", background: "rgba(34, 154, 136, 1)", borderRadius: 5, marginTop: "5px"}}>
                                                    <div className="profile-text" style={{height: "100%", width: "100%", paddingTop: "2px"}}>
                                                    <span style={{fontSize: "14px", fontWeight: "bold", padding: "5px"}}>{new Date(parseInt(item.start_time[0])).getDate().toString()}{new Date(parseInt(item.start_time[0])).getDate() ===  1 || new Date(parseInt(item.start_time[0])).getDate() ===  21 || new Date(parseInt(item.start_time[0])).getDate() ===  31 ? "st" : new Date(parseInt(item.start_time[0])).getDate() ===  2 || new Date(parseInt(item.start_time[0])).getDate() ===  22 ? "nd" : new Date(parseInt(item.start_time[0])).getDate() ===  3 || new Date(parseInt(item.start_time[0])).getDate() ===  23 ? "rd" : "th"}</span>
                                                        <div style={{fontSize: "14px", fontWeight: "bold"}}>{this.state.months[(new Date(parseInt(item.start_time[0])).getMonth())]}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{paddingLeft: "10px", width: "150px"}}>
                                            <div >
                                                <span style={{fontSize: "18px", fontWeight: "600"}}>
                                                    {item.name}
                                                </span> 
                                                <div style={{fontSize: "14px"}}>
                                                    {item.address}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            
                            </div>
                        </div>)}
                        {this.state.eventsList.length === 0 && 
                        <div style={{textAlign: "center", marginTop: "20px"}}>
                            No Events
                        </div>}
                        </div>
                        {this.state.eventsList.length > 0 &&
                        <div style={{textAlign: "right", cursor: "pointer"}} onClick={() => this.props.history.push("/event_list")}>
                            See more
                        </div>}
                    </div>
                    </Col>
                    <Col sm="6">
                    <div className="pa4 ma1 shadow-4 bg-white" style={{borderRadius: 10}}>
                        <div style={{ height: "460px", overflowY: "auto"}}>
                        <h4>Admins</h4>
                        <div style={{marginBottom: "10px"}}>
                        {
                            this.state.universities.map(item =>
                                <div key={item.username} style={{marginBottom: "10px"}}>
                                    <img src={item.profile_photo ? item.profile_photo : img} width={35} height={35} style={{borderRadius: 5, cursor: "pointer"}} alt="profiles"/> <span style={{marginLeft: "5px"}}>{item.username}</span>
                                </div>
                            )
                        }
                        {
                            this.state.organizations.map(item =>
                                <div key={item.username} style={{marginBottom: "10px"}}>
                                    <img src={item.profile_photo ? item.profile_photo : img} width={35} height={35} style={{borderRadius: 5, cursor: "pointer"}} alt="profiles"/> <span style={{marginLeft: "5px"}}>{item.username}</span>
                                </div>
                            )
                        }
                        {
                            this.state.business.map(item =>
                                <div key={item.username} style={{marginBottom: "10px"}}>
                                    <img src={item.profile_photo ? item.profile_photo : img} width={35} height={35} style={{borderRadius: 5, cursor: "pointer"}} alt="profiles"/> <span style={{marginLeft: "5px"}}>{item.username}</span>
                                </div>
                            )
                        }
                        </div>
                        {this.state.universities.length === 0 && this.state.organizations.length === 0 && this.state.business.length === 0 && 
                        <div style={{textAlign: "center", marginTop: "20px"}}>
                            No Admins
                        </div>}
                        </div>
                    </div>
                    </Col>
                    </Row>
                    </div>
                    :
                    <h1 style={{textAlign: "center", color}}>Loading...</h1>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Home)
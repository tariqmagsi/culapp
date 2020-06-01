import React, {Component} from "react";
import { Helmet } from "react-helmet";
import Sidebar from "../../Sidebar/Sidebar";
import { refreshToken } from "../../../PrivateRoute/isLogin";
import { Badge, Button, Alert } from "react-bootstrap";
import axios from 'axios';
import Api from '../../../Api/Api.json'
import { getFromStorage } from "../../../utils/storage";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import { getHeaders } from "../../../utils/headers";

const color = "#229a88";
const url = Api.BASE_URL + Api.NOTIFICATIONS_LIST;
const markAsReadUrl = Api.BASE_URL + Api.MARK_AS_READ;
const markAllAsReadUrl = Api.BASE_URL + Api.MARK_ALL_AS_READ;

class Notifications extends Component {
    state = {
        notifications: [],
        isLoading: true,
        next: null,
        previous: null,
        count: 0,
        error: ""
    }

    markAllAsRead = () => {
        const headers = getHeaders();

        axios
        .post(markAllAsReadUrl, {}, headers)
        .then(res => this.setState({error: ""}, () => {
            if(this.state.next) 
                this.fetchNotificationsList(this.state.next)
            else if(this.state.previous)
                this.fetchNotificationsList(this.state.previous)
            else
                this.fetchNotificationsList(url)
        }))
        .catch(err => this.setState({isLoading: false}))
    }

    markAsRead = (uri) => {
        const headers = getHeaders();

        axios
        .post(markAsReadUrl + `${uri}/`, {}, headers)
        .then(res => this.setState({error: ""}, () => {
            if(this.state.next) 
                this.fetchNotificationsList(this.state.next)
            else if(this.state.previous)
                this.fetchNotificationsList(this.state.previous)
            else
                this.fetchNotificationsList(url)
        }))
        .catch(err => this.setState({isLoading: false}))
    }

    fetchNotificationsList = (notificationsURL) => {
        const headers = getHeaders();

        axios
        .get(notificationsURL.split("://")[0] === "http" ? "https://" + notificationsURL.split("://")[1] : notificationsURL, headers)
        .then(res => this.setState({isLoading: false, notifications: res.data.results ? res.data.results : res.data, next: res.data.next, previous: res.data.previous, count: res.data.count, error: ""}))
        .catch(err => this.setState({isLoading: false}))
    }

    componentDidMount(){
        if(getFromStorage("user")) {
            refreshToken();
            this.fetchNotificationsList(url);
        } else {
            this.setState({isLoading: false})
        }
    }

    render() {
        return (
            <div>
                <Helmet bodyAttributes={{style: 'background : #eee !important'}}/>
                <Sidebar isOpened={this.props.isOpened} changeState={this.props.changeState}/>
                <div style={{marginLeft: window.innerWidth > 600 ? (this.props.isOpened ? "200px" : "55px") : "55px",  color: "black", paddingTop: "50px", paddingLeft: "10px"}}>
                    <h3 style={{color, marginLeft: "7px"}}>Notifications</h3>
                    {
                        this.state.error.length > 0 && 
                        <Alert variant="danger" style={{fontSize: "12px"}}>
                            {this.state.error}
                        </Alert>
                    }
                    {
                        getFromStorage("user") ? !getFromStorage("user").user.is_account_setup &&
                        <Alert variant="danger" style={{fontSize: "12px"}}>
                            Go to profile and update it
                        </Alert>
                        :
                        <span></span>
                    }
                    {!this.state.isLoading ? 
                    <div style={{ borderRadius: 10, marginRight: "20px", marginLeft: "10px"}}>
                    {this.state.notifications.length > 0 && <Button size="sm" variant="success" style={{fontSize: "12px", marginBottom: "10px"}}>Mark All As Read</Button>}

                    {this.state.notifications.map(item =>
                    <div key={item.id} onClick={this.markAsRead(item.uri)} className="ma0 pa0 v-top dib Cards" style={{cursor: "pointer", background:  "white", width: "100%", borderBottom: "0.5px solid #eee"}}>
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
                    {this.state.notifications.length === 0 ? 
                    <div style={{textAlign: "center", color, background: "white", paddingTop: "20px", paddingBottom: "20px", borderRadius: 10}}>No Notification</div>
                    :
                    <div>
                        <div style={{textAlign: "left", marginTop: "10px"}}>
                            {this.state.previous && <Button variant="success" size="sm" style={{width: "100px", background: color, borderColor: color, marginLeft: "20px"}} onClick={() => this.fetchNotificationsList(this.state.previous)}><ArrowLeft /><span style={{marginLeft: "5px"}}>Previous</span></Button>}
                            {this.state.next && <Button variant="success" size="sm" style={{float: "right", width: "100px", background: color, borderColor: color}} onClick={() => this.fetchNotificationsList(this.state.next)}><span style={{marginRight: "5px"}}>Next</span><ArrowRight /></Button>}
                        </div>
                    </div>
                    }
                    <br/>
                    <br/>
                    <br/>
                </div>
                :
                <h1 style={{textAlign: "center", color}}>Loading...</h1>
                }
            </div>
        </div>
        )
    }
}

export default Notifications;
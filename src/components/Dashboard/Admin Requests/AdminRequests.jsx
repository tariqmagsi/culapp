import React, {Component} from "react";
import { Helmet } from "react-helmet";
import Sidebar from "../../Sidebar/Sidebar";
import { Button, Alert } from "react-bootstrap";
import { refreshToken } from "../../../PrivateRoute/isLogin";
import Api from "../../../Api/Api.json";
import { getFromStorage } from "../../../utils/storage";
import axios from 'axios';
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import { getHeaders } from "../../../utils/headers";
import profile from "../../../image/user.png";
import { withRouter } from "react-router";

const color = "#229a88";
const url = Api.BASE_URL + Api.ADMIN_REQUESTS;
const approveUrl = Api.BASE_URL + Api.ADMIN_APPROVE_REQUESTS;

class AdminRequests extends Component {
    state = {
        adminRequests: [],
        isLoading: true,
        next: null,
        previous: null,
        count: 0,
        error: ""
    }

    fetchAdminRequests = (adminRequestsURL) => {
        const headers = getHeaders();

        axios
        .get(adminRequestsURL.split("://")[0] === "http" ? "https://" + adminRequestsURL.split("://")[1] : adminRequestsURL, headers)
        .then(res => this.setState({isLoading: false, adminRequests: res.data ? res.data.results : [], next: res.data.next, previous: res.data.previous, count: res.data.count, error: ""}, () => console.log(res.data)))
        .catch(err => this.setState({isLoading: false}))
    }

    declineAdminRequest = (uri) => {
        const headers = getHeaders();
        axios
        .delete(url + `delete/${uri}/`, headers)
        .then(res => this.setState({ error: "" }, () => this.fetchAdminRequests(url)))
        .catch(err => this.setState({error: "Something Went Wrong"}))
    }

    acceptAdminRequest = (uri) => {
        const headers = getHeaders();
        axios
        .post(approveUrl + `${uri}`, {}, headers)
        .then(res => this.setState({ error: "" }, () => this.fetchAdminRequests(url)))
        .catch(err => {
            if(err.response) {
                this.setState({error: err.response.data.detail})
            } else {
                this.setState({error: "Something Went Wrong"})
            }      
        })
    }

    componentDidMount(){
        if(getFromStorage("user")){
            if(getFromStorage("user").user.is_admin) {
                refreshToken();
                this.fetchAdminRequests(url);
            } else {
                this.setState({isLoading: false}, () => {
                    this.props.history.push("/create_event")
                })
            }
        } else {
            this.setState({isLoading: false})
        }
    }

    render() {
        return (
            <div>
                <Helmet bodyAttributes={{style: 'background : #eee !important'}}/>
                <Sidebar isOpened={this.props.isOpened} changeState={this.props.changeState}/>
                <div style={{marginLeft: window.innerWidth > 600 ? (this.props.isOpened ? "200px" : "55px") : "55px",  color: "black",  paddingTop: "50px", paddingLeft: "10px"}}>
                    <h3 style={{color, marginLeft: "7px"}}>Admin Requests</h3>
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
                    <div style={{ borderRadius: 10,  marginRight: "20px", marginLeft: "10px"}}>
                    {this.state.adminRequests.map(item =>
                    <div key={item.uri} className="ma0 pa0 v-top dib Cards" style={{cursor: "pointer", background:  "white", width: "100%", borderBottom: "0.5px solid #eee"}}>
                        <div className="ma2 pa0 dib v-top" style={{overflowX: "auto"}}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{position: "absolute", marginTop: "5px"}}>
                                            {
                                                
                                                item.university ? (item.university.profile_photo ?
                                                <img 
                                                    src={item.university.profile_photo} alt="profile" 
                                                    className="notification-img"
                                                    style={{width:"50px", height: "50px", borderRadius: "50%"}}
                                                />
                                                :
                                                <img 
                                                    src={profile} alt="profile" 
                                                    className="notification-img"
                                                    style={{width:"50px", height: "50px", borderRadius: "50%"}}
                                                />)
                                                : item.organization ? (item.organization.profile_photo ?
                                                <img 
                                                    src={item.organization.profile_photo} alt="profile" 
                                                    className="notification-img"
                                                    style={{width:"50px", height: "50px", borderRadius: "50%"}}
                                                />
                                                :
                                                <img 
                                                    src={profile} alt="profile" 
                                                    className="notification-img"
                                                    style={{width:"50px", height: "50px", borderRadius: "50%"}}
                                                />)
                                                : item.business && (item.business.profile_photo ?
                                                <img 
                                                    src={item.business.profile_photo} alt="profile" 
                                                    className="notification-img"
                                                    style={{width:"50px", height: "50px", borderRadius: "50%"}}
                                                />
                                                :
                                                <img 
                                                    src={profile} alt="profile" 
                                                    className="notification-img"
                                                    style={{width:"50px", height: "50px", borderRadius: "50%"}}
                                                />)
                                            }
                                        </td>
                                        <td style={{paddingLeft: "60px"}} className="notification-td">
                                            <span className="notification" style={{fontSize: "14px", fontWeight: "600"}}>
                                                {item.user_full_name}
                                            </span>
                                            {" "}
                                            <span className="notification" style={{fontSize: "14px", color: "gray"}}>sent you admin request</span>
                                            <div style={{color: "gray", fontSize: "12px"}}>{item.user_username}</div>
                                            
                                            <div className="notification">
                                                <Button onClick={() => this.acceptAdminRequest(item.uri)} style={{background: color, borderColor: color, width: "auto", marginLeft: "auto", marginRight: "auto", fontSize: "12px"}} className="notification" variant="dark" size="sm">
                                                    Accept
                                                </Button>
                                                <Button onClick={() => this.declineAdminRequest(item.uri)} style={{ width: "auto", marginLeft: "10px", marginRight: "auto", fontSize: "12px"}} className="notification" variant="light" size="sm">
                                                    Delete
                                                </Button>
                                            </div>
                                            {/* <div className="notification" style={{fontSize: "12px", color: "silver"}}>
                                                2h ago
                                            </div> */}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                    </div>)}
                    {this.state.adminRequests.length === 0 ? 
                    <div style={{textAlign: "center", color, background: "white", paddingTop: "20px", paddingBottom: "20px", borderRadius: 10}}>No Admin Requests</div>
                    :
                    <div>
                        <div style={{textAlign: "left", marginTop: "10px"}}>
                            {this.state.previous && <Button variant="success" size="sm" style={{width: "100px", background: color, borderColor: color, marginLeft: "20px"}} onClick={() => this.fetchAdminRequests(this.state.previous)}><ArrowLeft /><span style={{marginLeft: "5px"}}>Previous</span></Button>}
                            {this.state.next && <Button variant="success" size="sm" style={{float: "right", width: "100px", background: color, borderColor: color}} onClick={() => this.fetchAdminRequests(this.state.next)}><span style={{marginRight: "5px"}}>Next</span><ArrowRight /></Button>}
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

export default withRouter(AdminRequests);
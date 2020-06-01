import React, {Component} from "react";
import { Helmet } from "react-helmet";
import Sidebar from "../../Sidebar/Sidebar";
import { Button, Alert } from "react-bootstrap";
import { refreshToken } from "../../../PrivateRoute/isLogin";
import img from "../../../image/user.png"
import Api from "../../../Api/Api.json";
import { getFromStorage } from "../../../utils/storage";
import axios from 'axios';
import { ArrowLeft, ArrowRight, PersonAdd } from "@material-ui/icons";
import { getHeaders } from "../../../utils/headers";
import profile from "../../../image/user.png";
import { withRouter } from "react-router";
import AdminAccount from "./AdminCreate";

const color = "#229a88";
const url = Api.BASE_URL + Api.ADMIN_REQUESTS;
const approveUrl = Api.BASE_URL + Api.ADMIN_APPROVE_REQUESTS;
const usersUrl = Api.BASE_URL + Api.ACCOUNT_STATUS;

class AdminRequests extends Component {
    state = {
        show: false,
        adminRequests: [],
        isLoading: true,
        next: null,
        previous: null,
        count: 0,
        error: "",
        organizations: [], universities: [], business: []
    }

    fetchAdminRequests = (adminRequestsURL) => {
        const headers = getHeaders();

        axios
        .get(adminRequestsURL.split("://")[0] === "http" ? "https://" + adminRequestsURL.split("://")[1] : adminRequestsURL, headers)
        .then(res => this.setState({isLoading: false, adminRequests: res.data ? res.data.results : [], next: res.data.next, previous: res.data.previous, count: res.data.count, error: ""}))
        .catch(err => this.setState({isLoading: false}))
    }

    declineAdminRequest = (uri) => {
        const headers = getHeaders();
        axios
        .delete(url + `delete/${uri}/`, headers)
        .then(res => this.setState({ error: "" }, () => {
            if(this.state.next) 
                this.fetchAdminRequests(this.state.next)
            else if(this.state.previous)
                this.fetchAdminRequests(this.state.previous)
            else
                this.fetchAdminRequests(url)
        }))
        .catch(err => this.setState({error: "Something Went Wrong"}))
    }

    acceptAdminRequest = (uri) => {
        const headers = getHeaders();
        axios
        .post(approveUrl + `${uri}`, {}, headers)
        .then(res => this.setState({ error: "" }, () => {
            if(this.state.next) 
                this.fetchAdminRequests(this.state.next)
            else if(this.state.previous)
                this.fetchAdminRequests(this.state.previous)
            else
                this.fetchAdminRequests(url)
        }))
        .catch(err => {
            if(err.response) {
                this.setState({error: err.response.data.detail})
            } else {
                this.setState({error: "Something Went Wrong"})
            }      
        })
    }

    fetchAccountStatus = () => {
        const headers = getHeaders();

        axios
        .get(usersUrl, headers)
        .then(res => this.setState({ 
            organizations: res.data.organization_admins, 
            business: res.data.business_admins,
            universities: res.data.university_admins
        }, () => { this.fetchAdminRequests(url) }))
        .catch(err => this.setState({isLoading: false}))
    }

    checkAdminType = () => {
        if(getFromStorage("username")) {
            if(getFromStorage("username").type === "business") {
                return "business"
            } else if(getFromStorage("username").type === "organization") {
                return "organization"
            } else if(getFromStorage("username").type === "university") {
                return "organization"
            }
        }
        return "";
    }

    componentDidMount(){
        if(getFromStorage("user")){
            if(getFromStorage("user").user.is_admin) {
                refreshToken();
                this.fetchAccountStatus();
            } else {
                this.setState({isLoading: false}, () => {
                    this.props.history.push("/")
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
                <div style={{marginLeft: window.innerWidth > 600 ? (this.props.isOpened ? "200px" : "55px") : "55px",  color: "black",  paddingTop: "65px", paddingLeft: "10px"}}>
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
                    <div>
                     <div style={{ borderRadius: 10,  marginRight: "20px", marginLeft: "10px", padding: "20px", background: "white"}}>
                        <div>
                        <h5 style={{color}}>Admins</h5>
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
                        <div style={{textAlign: "center", color}}>
                            No Admins
                        </div>}
                        <AdminAccount show={this.state.show} handleClose={() => this.setState({show: false})}/>
                        <div style={{cursor: "pointer", textAlign: "right"}}>
                            <Button style={{color: "white"}} variant="success" size="sm" onClick={() => this.setState({show: true})}>
                                <PersonAdd fontSize="small"/>
                                <span style={{marginLeft: "5px"}}>Add Admin</span>
                            </Button>
                        </div>
                        </div>
                    </div>
                    <br/>
                    <div style={{ borderRadius: 10,  marginRight: "20px", marginLeft: "10px", padding: "20px", background: "white"}}>
                        <h5 style={{color, textAlign: "left"}}>Admin Requests</h5>
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
                    <div>
                        <div style={{textAlign: "center", color, background: "white", borderRadius: 10}}>
                            No Admin Requests
                        </div>
                    </div>
                    :
                    <div>
                        <div style={{textAlign: "left", marginTop: "10px"}}>
                            {this.state.previous && <Button variant="success" size="sm" style={{width: "100px", background: color, borderColor: color, marginLeft: "20px"}} onClick={() => this.fetchAdminRequests(this.state.previous)}><ArrowLeft /><span style={{marginLeft: "5px"}}>Previous</span></Button>}
                            {this.state.next && <Button variant="success" size="sm" style={{float: "right", width: "100px", background: color, borderColor: color}} onClick={() => this.fetchAdminRequests(this.state.next)}><span style={{marginRight: "5px"}}>Next</span><ArrowRight /></Button>}
                        </div>
                    </div>
                    }
                </div>
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
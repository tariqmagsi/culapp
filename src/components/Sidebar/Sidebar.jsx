import React, {Component} from 'react';
import img from "../../image/user.png";
import logo from "../../image/logo.png";
import { Add, Event, SupervisedUserCircle, List, Notifications, Settings, ExitToApp, Menu, Person, PersonAdd, Home } from "@material-ui/icons";
import { NavLink, withRouter } from 'react-router-dom';
import { removeFromStorage, getFromStorage, setInStorage } from '../../utils/storage';
import AdminAccount from "./AdminAccount";
import Api from "../../Api/Api.json";
import axios from "axios";
import { getHeaders } from '../../utils/headers';


const backgroundColor = "#545151";
const color= "white";
const accountStatusUrl = Api.BASE_URL + Api.ACCOUNT_STATUS;

const checkAdmin = () => {
    return getFromStorage("username") ? (getFromStorage("username").privilege === 0 ? true : false) : true
}

class Sidebar extends Component {
    state = {
        show: false,
        profile: {profile_photo: null, username: ""},
        organizations: [],
        universities: [],
        business: []
    }

    fetchSubscriptions = () => {
        const headers = getHeaders();

        axios
        .get(Api.BASE_URL + Api.SUBSCRIPTION, headers)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

    fetchAccountStatus = () => {
        const headers = getHeaders();

        axios
        .get(accountStatusUrl, headers)
        .then(res => this.setState({
            profile: res.data.profile, 
            organizations: res.data.organization_admins, 
            business: res.data.business_admins,
            universities: res.data.university_admins
        }))
        .catch(err => console.log(err))
    }

    componentDidMount(){
        this.fetchAccountStatus();
        this.fetchSubscriptions()
    }

    render() {
        return (
            <div style={{position: "fixed", top: 0, zIndex: 1}}>
                <div style={{cursor: "pointer",height: "50px", backgroundColor,marginLeft: this.props.isOpened ? "200px": "55px", width: "100%", top: 0, left: 0, right: 0, position: "fixed", border: "0.5px solid #5c5857"}}>
                    <Menu style={{marginLeft: "10px", color, fontSize: "25px", marginTop: "10px"}} onClick={this.props.changeState}/>
                </div>
                <div className="sidebar" style={{width: this.props.isOpened ? "200px": "55px", backgroundColor, height: "100vh", border: "0.5px solid #5c5857"}}>
                    {this.props.isOpened && 
                    <div style={{position: "absolute", color, marginLeft: "55px", width: "145px", }}>
                        <ul style={{borderBottom: "0.5px solid #5c5857"}}>
                            
                            <li style={{marginLeft: "10px"}}>
                                <img src={logo} width={35} height={35} style={{borderRadius: 5}} alt="profiles"/>
                                <span style={{paddingTop: "25px",  textAlign: "left", marginLeft: "5px"}}>Culapp</span>
                            </li>
                            <li style={{fontSize: "14px", color: "silver", marginLeft: "10px", marginTop: "-15px"}}>
                                {getFromStorage("username") ? getFromStorage("username").username : "username"}
                            </li>
                        </ul>
                        <ul className="lists" style={{marginTop: "-10px", marginLeft: "10px", color: "silver", fontSize: "14px"}}>
                            <NavLink to="/home" activeStyle={{color: "white"}} style={{textDecoration: "none", color: "silver"}}>
                                <li>
                                    <Home style={{fontSize: "20px"}}/>
                                    <span style={{marginLeft: "5px"}}>Home</span>
                                </li>
                            </NavLink>
                            <NavLink to="/create_event" activeStyle={{color: "white"}} style={{textDecoration: "none", color: "silver"}}>
                                <li>
                                    <Event style={{fontSize: "20px"}}/>
                                    <span style={{marginLeft: "5px"}}>Create Event</span>
                                </li>
                            </NavLink>
                            <NavLink to="/event_list" activeStyle={{color: "white"}} style={{textDecoration: "none", color: "silver"}}>
                                <li>
                                    <List style={{fontSize: "20px"}}/>
                                    <span style={{marginLeft: "5px"}}>Event List</span>
                                </li>
                            </NavLink>
                            {
                                getFromStorage("username") ? 
                                (getFromStorage("username").type !== "profile") && checkAdmin() &&
                                <NavLink to="/admin_requests" activeStyle={{color: "white"}} style={{textDecoration: "none", color: "silver"}}>
                                    <li>
                                        <PersonAdd style={{fontSize: "20px"}}/>
                                        <span style={{marginLeft: "5px"}}>Admin Requests</span>
                                    </li>
                                </NavLink>
                                :
                                <span></span>
                            }
                            {
                                 getFromStorage("username") ? 
                                 (getFromStorage("username").type !== "profile") && checkAdmin() &&
                                <NavLink to="/follow_requests" activeStyle={{color: "white"}} style={{textDecoration: "none", color: "silver"}}>
                                    <li>
                                        <SupervisedUserCircle style={{fontSize: "20px"}}/>
                                        <span style={{marginLeft: "5px"}}>Follow Requests</span>
                                    </li>
                                </NavLink>
                                :
                                <span></span>
                            }
                            
                            <NavLink to={getFromStorage("username") ? (getFromStorage("username").type === "profile" ? "/notifications" : `/notifications/${getFromStorage("username").type}/${getFromStorage("username").username}`) : "/login"} activeStyle={{color: "white"}} style={{textDecoration: "none", color: "silver"}}>
                                <li>
                                    <Notifications style={{fontSize: "20px"}}/>
                                    <span style={{marginLeft: "5px"}}>Notifications </span>
                                </li>
                            </NavLink>
                           {getFromStorage("username") && ((getFromStorage("username").type === "profile" || checkAdmin()) &&
                                <NavLink to={getFromStorage("username") ? (getFromStorage("username").type === "profile" ? "/settings" : `/settings/${getFromStorage("username").type}/${getFromStorage("username").username}`) : "/login"} activeStyle={{color: "white"}} style={{textDecoration: "none", color: "silver"}}>
                                    <li>
                                        <Settings style={{fontSize: "20px"}}/>
                                        <span style={{marginLeft: "5px"}}>Settings</span>
                                    </li>
                                </NavLink>)
                            }
                            {getFromStorage("username") && ((getFromStorage("username").type === "profile" || checkAdmin()) &&
                            <NavLink to={getFromStorage("username") ? (getFromStorage("username").type === "profile" ? "/profile" : `/profile/${getFromStorage("username").type}/${getFromStorage("username").username}`) : "/login"} activeStyle={{color: "white"}} style={{textDecoration: "none", color: "silver"}}>
                                <li>
                                    <Person style={{fontSize: "20px"}}/>
                                    <span style={{marginLeft: "5px"}}>Profile</span>
                                </li>
                            </NavLink>)
                            }
                            <li onClick={() => {
                                        removeFromStorage("username")
                                        removeFromStorage("user");
                                        this.props.history.replace("/login");
                                    }}
                            >
                                <ExitToApp style={{fontSize: "20px"}}/>
                                <span style={{marginLeft: "5px"}}>Logout</span>
                            </li>
                        </ul>
                    </div>}
                    <div className="sidebar shadow-4" style={{width: "55px", backgroundColor, borderRight: "0.5px solid #5c5857", textAlign: "center", height: "99.8vh", overflowY: "auto"}}>
                        <ul>
                            <li>
                                <img src={this.state.profile.profile_photo ? this.state.profile.profile_photo : img} width={35} height={35} style={{borderRadius: "50%", width: "35px", height: "35px", cursor: "pointer"}} alt="profiles" onClick={() => { setInStorage("username", { username: getFromStorage("user") ? getFromStorage("user").user.username : "", type: "profile", privilege: -1 }); this.props.history.push("/home") }}/>
                            </li>

                            {
                                this.state.universities.map(item =>
                                    <li key={item.username}>
                                        <img src={item.profile_photo ? item.profile_photo : img} width={35} height={35} style={{borderRadius: 5, cursor: "pointer", textDecoration: "none", color: "black"}} alt="profiles" onClick={() => { setInStorage("username", { username: item.username, type: "university", privilege: item.privilege }); this.props.history.push("/home")  }}/>
                                    </li>
                                )
                            }
                            {
                                this.state.organizations.map(item =>
                                    <li key={item.username}>
                                        <img src={item.profile_photo ? item.profile_photo : img} width={35} height={35} style={{borderRadius: 5, cursor: "pointer", textDecoration: "none", color: "black"}} alt="profiles" onClick={() => { setInStorage("username", { username: item.username, type: "organization", privilege: item.privilege }); this.props.history.push("/home") }}/>
                                    </li>
                                )
                            }
                            {
                                this.state.business.map(item =>
                                    <li key={item.username}>
                                        <img src={item.profile_photo ? item.profile_photo : img} width={35} height={35} style={{borderRadius: 5, cursor: "pointer", textDecoration: "none", color: "black"}} alt="profiles" onClick={() => { setInStorage("username", { username: item.username, type: "business", privilege: item.privilege }); this.props.history.push("/home") }}/>
                                    </li>
                                )
                            }
                            <li onClick={() => this.setState({show: true})}>
                                <Add style={{color, backgroundColor: "silver", borderRadius: 5, fontSize: "35px", cursor: "pointer"}} />
                            </li>
                        </ul>
                    </div>
                    <AdminAccount show={this.state.show} handleClose={() => this.setState({show: false})}/>
                </div>
            </div>
        )
    }
}

export default withRouter(Sidebar);
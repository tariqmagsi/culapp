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

const color = "#229a88";
const url = Api.BASE_URL + Api.FOLLOW_REQUESTS;

class FollowRequests extends Component {
    state = {
        followRequests: [],
        isLoading: true,
        next: null,
        previous: null,
        count: 0,
        error: ""
    }

    fetchFollowRequests = (followRequestsURL) => {
        const headers = getHeaders();

        axios
        .get(followRequestsURL.split("://")[0] === "http" ? "https://" + followRequestsURL.split("://")[1] : followRequestsURL, headers)
        .then(res => this.setState({isLoading: false, followRequests: res.data.length > 0 ? res.data.results : res.data, next: res.data.next, previous: res.data.previous, count: res.data.count, error: ""}))
        .catch(err => this.setState({isLoading: false}))
    }

    declineFollowRequest = (uri) => {
        const headers = getHeaders();
        axios
        .delete(url + `${uri}/`, headers)
        .then(res => this.setState({ error: "" }))
        .catch(err => this.setState({error: "Something Went Wrong"}))
    }

    acceptFollowRequest = (uri) => {
        const headers = getHeaders();
        axios
        .post(url + `${uri}/`, {}, headers)
        .then(res => this.setState({ error: "" }))
        .catch(err => this.setState({error: "Something Went Wrong"}))
    }

    componentDidMount(){
        if(getFromStorage("user")){
            refreshToken();
            this.fetchFollowRequests(url);
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
                    <h3 style={{color, marginLeft: "7px"}}>Follow Requests</h3>
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
                    {this.state.followRequests.map(item =>
                    <div key={item.user_username} className="ma0 pa0 v-top dib Cards" style={{cursor: "pointer", background:  "white", width: "100%", borderBottom: "0.5px solid #eee"}}>
                        <div className="ma2 pa0 dib v-top" style={{overflowX: "auto"}}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{position: "absolute", marginTop: "5px"}}>
                                            <img 
                                                src={item.user_profile_photo} alt="home" 
                                                className="notification-img"
                                                style={{width:"50px", height: "50px", borderRadius: "50%"}}
                                            />
                                        </td>
                                        <td style={{paddingLeft: "60px"}} className="notification-td">
                                            <span className="notification" style={{fontSize: "14px", fontWeight: "600"}}>
                                                {item.user_full_name}
                                            </span>
                                            {" "}
                                            <span className="notification" style={{fontSize: "14px", color: "gray"}}>sent you follow request</span>
                                            <div style={{color: "gray", fontSize: "12px"}}>{item.user_username}</div>
                                            
                                            <div className="notification">
                                                <Button type="submit" style={{background: color, borderColor: color, width: "auto", marginLeft: "auto", marginRight: "auto", fontSize: "12px"}} className="notification" variant="dark" size="sm">
                                                    Accept
                                                </Button>
                                                <Button type="submit" style={{ width: "auto", marginLeft: "10px", marginRight: "auto", fontSize: "12px"}} className="notification" variant="light" size="sm">
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
                    {this.state.followRequests.length === 0 ? 
                    <div style={{textAlign: "center", color, background: "white", paddingTop: "20px", paddingBottom: "20px", borderRadius: 10}}>No Follow Requests</div>
                    :
                    <div>
                        <div style={{textAlign: "left", marginTop: "10px"}}>
                            {this.state.previous && <Button variant="success" size="sm" style={{width: "100px", background: color, borderColor: color, marginLeft: "20px"}} onClick={() => this.fetchFollowRequests(this.state.previous)}><ArrowLeft /><span style={{marginLeft: "5px"}}>Previous</span></Button>}
                            {this.state.next && <Button variant="success" size="sm" style={{float: "right", width: "100px", background: color, borderColor: color}} onClick={() => this.fetchFollowRequests(this.state.next)}><span style={{marginRight: "5px"}}>Next</span><ArrowRight /></Button>}
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

export default FollowRequests;
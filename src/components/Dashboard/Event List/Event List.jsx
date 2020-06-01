import React, {Component} from "react";
import { Helmet } from "react-helmet";
import Sidebar from "../../Sidebar/Sidebar";
import { refreshToken } from "../../../PrivateRoute/isLogin";
import Api from "../../../Api/Api.json"
import { getFromStorage } from "../../../utils/storage";
import axios from 'axios';
import { Button, Alert } from "react-bootstrap";
import { ArrowRight, ArrowLeft } from "@material-ui/icons";
import { getHeaders } from "../../../utils/headers";
import { withRouter } from "react-router";

const color = "#229a88";
const url = Api.BASE_URL + Api.EVENTS_LIST;

class EventList extends Component {

    state = {
        eventsList: [],
        months: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Dec"],
        isLoading: true,
        next: null,
        previous: null,
        count: 0,
        error: ""
    }

    fetchEventsList = (eventUrl) => {

        const headers = getHeaders();

        axios
        .get(eventUrl.split("://")[0] === "http" ? "https://" + eventUrl.split("://")[1] : eventUrl, headers)
        .then(res => this.setState({isLoading: false, eventsList: res.data.results, next: res.data.next, previous: res.data.previous, count: res.data.count, error: ""}))
        .catch(err => this.setState({isLoading: false}))
    }

    componentDidMount(){
        if(getFromStorage("user")){
            refreshToken();
            this.fetchEventsList(url);
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
                    <h3 style={{color, marginLeft: "17px"}}>Events List</h3>
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
                    {this.state.eventsList.map(item =>
                    <div key={item.slug} className="ma2 pa0 v-top dib Cards" style={{cursor: "pointer", background:  "white", width: "100%", borderBottom: "0.5px solid #eee", borderRadius: 10, }} onClick={() => this.props.history.push(`/event_list/event/${item.slug}`)}>
                        <div className="ma0 pa0 dib v-top">
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{position: "relative", width: "150px"}}>
                                            <div className="profile-container">
                                                {item.cover === "" ?
                                                <img 
                                                    src={require("../../../image/cover.png")} alt="home" 
                                                    className="cover-event"
                                                    style={{width:"150px", height: "150px", borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}
                                                />
                                                :
                                                <img 
                                                    src={item.cover} alt="home" 
                                                    className="cover-event"
                                                    style={{width:"150px", height: "150px", borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}
                                                />
                                                }
                                                    <div className="event-middle" style={{color: "white", background: "rgba(34, 154, 136, 1)", borderRadius: 5}}>
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
                    {this.state.eventsList.length === 0 ? 
                    <div style={{textAlign: "center", color, background: "white", paddingTop: "20px", paddingBottom: "20px", borderRadius: 10}}>No Events</div>
                    :
                    <div>
                        <div style={{textAlign: "left", marginTop: "10px"}}>
                            {this.state.previous && <Button variant="success" size="sm" style={{width: "100px", background: color, borderColor: color, marginLeft: "20px"}} onClick={() => this.fetchEventsList(this.state.previous)}><ArrowLeft /><span style={{marginLeft: "5px"}}>Previous</span></Button>}
                            {this.state.next && <Button variant="success" size="sm" style={{float: "right", width: "100px", background: color, borderColor: color}} onClick={() => this.fetchEventsList(this.state.next)}><span style={{marginRight: "5px"}}>Next</span><ArrowRight /></Button>}
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

export default withRouter(EventList);
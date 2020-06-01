import React, {Component} from "react";
import { Helmet } from "react-helmet";
import Sidebar from "../../Sidebar/Sidebar";
import { refreshToken } from "../../../PrivateRoute/isLogin";
import Api from "../../../Api/Api.json"
import { getFromStorage } from "../../../utils/storage";
import axios from 'axios';
import { getHeaders } from "../../../utils/headers";
import img from "../../../image/cover.png"
import { Button } from "react-bootstrap";
import { Edit, Delete } from "@material-ui/icons";
import DeleteModal from "./Delete";
import { withRouter } from "react-router";
import moment from 'moment';

const color = "#229a88";
const url = Api.BASE_URL + Api.EVENT;
const categoriesUrl = Api.BASE_URL + Api.EVENT_CATEGORIES;

class Event extends Component {

    state = {
        event: null,
        isLoading: true,
        months: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Dec"],
        error: "",
        show: false,
        categories: []
    }

    fetchEvent = () => {

        const headers = getHeaders();

        axios
        .get(url + `${window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]}/`, headers)
        .then(res => this.setState({event: res.data, error: "", isLoading: false}))
        .catch(err => this.setState({isLoading: false}))
    }

    deleteEvent = () => {

        const headers = getHeaders();

        axios
        .delete(url + `${window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]}/`, headers)
        .then(res => this.setState({event: res.data, error: "", show: false}, () => {
            this.props.history.push("/event_list")
        }))
        .catch(err => this.setState({error: "Something went wrong", show: false}))
    }

    fetchCategories = () => {
        const headers = getHeaders();

        axios.get(categoriesUrl, headers)
        .then(res => {
            this.fetchEvent();
            this.setState({categories: res.data.results ? res.data.results : res.data, error: ""})})
        .catch(err => {
            this.setState({isLoading: false})
        })
    }

    componentDidMount(){
        if(getFromStorage("user")){
            refreshToken();
            this.fetchCategories();
        } else {
            this.setState({isLoading: false})
        }
    }

    render() {
        const { event } = this.state
        const visibility_scope = ["Everyone","College Students", "Your Univeresity", "Your Campus", "Your Organization", "Invite Only"];
        const status = ["Unpublished","Published","Cancelled","Reshcheduled"];
        const frequency = ["Once","Daily","Weekly","Monthly","Annually"];
        const type = ["User Event","Organization Event","University Event","Business Event"];

        return (
            <div>
                <DeleteModal show={this.state.show} handleClose={() => this.setState({show: false})} deleteEvent={this.deleteEvent}/>
                <Helmet bodyAttributes={{style: 'background : #eee !important'}}/>
                <Sidebar isOpened={this.props.isOpened} changeState={this.props.changeState}/>
                <div style={{marginLeft: window.innerWidth > 600 ? (this.props.isOpened ? "200px" : "55px") : "55px",  color: "black", paddingTop: "70px", paddingLeft: "20px",paddingRight: "20px", paddingBottom: "20px", borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                    {!this.state.isLoading ?
                    event &&
                    <div>
                        <img src={event.cover ? event.cover : img} alt="event" style={{height: "350px", width: "100%", borderTopLeftRadius: 10, borderTopRightRadius: 10}}/>
                        <div style={{ padding: "20px", backgroundColor: "white", fontSize: "14px"}}>
                            <h3>{event.name}</h3>
                            <div>
                                <h5>Time</h5>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td style={{width: "200px"}}>Start Time:</td> 
                                        <td style={{marginLeft: "2px"}}>{moment(event.start_time).format("DD-MM-YYYY hh:mm A")}</td>
                                    </tr>
                                    <tr>
                                        <td style={{width: "200px"}}>End Time:</td> 
                                        <td style={{marginLeft: "2px"}}>{moment(event.end_time).format("DD-MM-YYYY hh:mm A")}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <br/>
                            <div style={{marginTop: "-10px"}}>
                                <h5>Information</h5>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style={{width: "200px"}}>Category:</td> 
                                            <td>{this.state.categories[event.category].name}</td>
                                        </tr>
                                        <tr>
                                            <td style={{width: "200px"}}>Address:</td> 
                                            <td>{event.address}</td>
                                        </tr>
                                        <tr>
                                            <td style={{width: "200px"}}>Description:</td> 
                                            <td>{event.description}</td>
                                        </tr>
                                        <tr>
                                            <td style={{width: "200px"}}>Visibility Scope:</td> 
                                            <td>{visibility_scope[event.visibility_scope]}</td>
                                        </tr>
                                        {event.email && 
                                        <tr>
                                            <td style={{width: "200px"}}>Email:</td> 
                                            <td>{event.email}</td>
                                        </tr>}
                                        {event.phone_number && 
                                        <tr>
                                            <td style={{width: "200px"}}>Phone Number:</td> 
                                            <td>{event.phone_number}</td>
                                        </tr>}
                                        {event.website && 
                                        <tr>
                                            <td style={{width: "200px"}}>Website:</td> 
                                            <td>{event.website}</td>
                                        </tr>}
                                        {event.cost > 0 && 
                                        <tr>
                                            <td style={{width: "200px"}}>Cost:</td> 
                                            <td>{event.cost}</td>
                                        </tr>}
                                        {event.free_until && 
                                        <tr>
                                            <td style={{width: "200px"}}>Free Until:</td> 
                                            <td>{moment(event.free_until).format("DD-MM-YYYY hh:mm A")}</td>
                                        </tr>}
                                        {event.free_food_and_drinks && 
                                        <tr>
                                            <td style={{width: "200px"}}>Free Food and Drinks:</td> 
                                            <td>{event.free_food_and_drinks}</td>
                                        </tr>}
                                        {event.age_required > 0 && 
                                        <tr>
                                            <td style={{width: "200px"}}>Age Required:</td> 
                                            <td>{event.age_required}</td>
                                        </tr>}
                                        {event.dress_code > 0 && 
                                        <tr>
                                            <td style={{width: "200px"}}>Dress Code:</td> 
                                            <td>{event.dress_code}</td>
                                        </tr>}
                                        <tr>
                                            <td style={{width: "200px"}}>Status:</td> 
                                            <td>{status[event.status]}</td>
                                        </tr>
                                        <tr>
                                            <td style={{width: "200px"}}>Frequency:</td> 
                                            <td>{frequency[event.frequency]}</td>
                                        </tr>
                                        <tr>
                                            <td style={{width: "200px"}}>Type:</td> 
                                            <td>{type[event.type]}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br/>
                                <h5 style={{marginTop: "-10px"}}>Allowed</h5>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td style={{width: "200px"}}>Food Offered:</td> 
                                        <td>{event.food_offered ? "Yes" : "No"}</td>
                                    </tr>
                                    <tr>
                                        <td style={{width: "200px"}}>Drinks Offered:</td> 
                                        <td>{event.drinks_offered ? "Yes" : "No"}</td>
                                    </tr>
                                    <tr>
                                        <td style={{width: "200px"}}>Alcohol:</td> 
                                        <td>{event.alcohol ? "Yes" : "No"}</td>
                                    </tr>
                                    <tr>
                                        <td style={{width: "200px"}}>Smoking Allowed:</td> 
                                        <td>{event.smoking_allowed ? "Yes" : "No"}</td>
                                    </tr>
                                    <tr>
                                        <td style={{width: "200px"}}>Pets Allowed:</td> 
                                        <td>{event.pets_allowed ? "Yes" : "No"}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <br/>
                            {
                                 getFromStorage("username") ? 
                                 (getFromStorage("username").type !== "profile") &&
                                <div style={{textAlign: "center"}}>
                                    <Button size="sm" variant="success" onClick={() => this.props.history.push(`/event_list/edit_event/${window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]}`)}>
                                        <Edit fontSize="small"/>
                                        <span style={{marginLeft: "5px"}}>Edit</span>
                                    </Button>
                                    <Button size="sm" variant="danger" style={{marginLeft: "10px"}} onClick={() => this.setState({show: true})}>
                                        <Delete fontSize="small"/>
                                        <span style={{marginLeft: "5px"}}>Delete</span>
                                    </Button>
                                </div>
                                :
                                <span></span>
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

export default withRouter(Event);
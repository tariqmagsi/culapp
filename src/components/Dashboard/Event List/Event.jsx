import React, {Component} from "react";
import { Helmet } from "react-helmet";
import Sidebar from "../../Sidebar/Sidebar";
import { refreshToken } from "../../../PrivateRoute/isLogin";
import Api from "../../../Api/Api.json"
import { getFromStorage } from "../../../utils/storage";
import axios from 'axios';
import { getHeaders } from "../../../utils/headers";

const color = "#229a88";
const url = Api.BASE_URL + Api.EVENT;

class Event extends Component {

    state = {
        event: null,
        isLoading: true,
        error: ""
    }

    fetchEvent = () => {

        const headers = getHeaders();

        axios
        .get(url + `${window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]}/`, headers)
        .then(res => this.setState({event: res.data, error: "", isLoading: false}, () => console.log(res.data)))
        .catch(err => this.setState({isLoading: false}))
    }

    componentDidMount(){
        if(getFromStorage("user")){
            refreshToken();
            this.fetchEvent(url);
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
                    {!this.state.isLoading ?
                    <div style={{ borderRadius: 10, marginRight: "20px", marginLeft: "10px"}}>
                </div>
                :
                <h1 style={{textAlign: "center", color}}>Loading...</h1>
                }
            </div>
        </div>
        )
    }
}

export default Event;
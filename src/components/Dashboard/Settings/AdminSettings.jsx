import React, {Component} from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import { FormGroup, Form } from 'react-bootstrap';
import {Helmet} from "react-helmet"
import Api from "../../../Api/Api.json";
import axios from 'axios';
import { getFromStorage } from '../../../utils/storage';
import { refreshToken } from '../../../PrivateRoute/isLogin';
import { getHeaders } from '../../../utils/headers';

const color = "#229a88";
let settingsUrl = Api.BASE_URL + Api.UPDATE_ADMINS + `/${(window.location.pathname.split("/")[2]+"/"+window.location.pathname.split("/")[3])}/settings`;

export default class AdminSettings extends Component {
    state = {
        error: "",
        files: [],
        isLoading: true,
        success: "",
        include_sibling_campus_timeline: false,
        include_parent_campus_timeline: false,
        include_children_campus_timeline: false,
        allow_unverified_events_on_timeline: false,
        allow_non_admin_events_on_timeline: false
    }

    whenChangeHandler = (e) => {
        const { name, value } = e.target;
        this.setState({[name]: value})
    }

    fetchSettings = () => {
        const headers = getHeaders();

        axios
        .get(settingsUrl, headers)
        .then(res => {
            this.setState({
                isLoading: false,
                include_sibling_campus_timeline: res.data.include_sibling_campus_timeline,
                include_parent_campus_timeline: res.data.include_parent_campus_timeline,
                include_children_campus_timeline: res.data.include_children_campus_timeline,
            })
            if(window.location.pathname.split("/")[2] === "business") {
                this.setState({
                    allow_unverified_events_on_timeline: res.data.allow_unverified_events_on_timeline,
                    allow_non_admin_events_on_timeline: res.data.allow_non_admin_events_on_timeline,
                })
            }
        })
        .catch(err => {
            this.setState({isLoading: false})
        })
    }

    updateSettings = (name) => {
        const headers = getHeaders();

        let data = {
            include_sibling_campus_timeline: name === "include_sibling_campus_timeline" ? !this.state.include_sibling_campus_timeline : this.state.include_sibling_campus_timeline,
            include_parent_campus_timeline: name === "include_parent_campus_timeline" ? !this.state.include_parent_campus_timeline : this.state.include_parent_campus_timeline,
            include_children_campus_timeline: name === "include_children_campus_timeline" ? !this.state.include_children_campus_timeline : this.state.include_children_campus_timeline,
            allow_unverified_events_on_timeline: name === "allow_unverified_events_on_timeline" ? !this.state.allow_unverified_events_on_timeline : this.state.allow_unverified_events_on_timeline,
            allow_non_admin_events_on_timeline: name === "allow_non_admin_events_on_timeline" ? !this.state.allow_non_admin_events_on_timeline : this.state.allow_non_admin_events_on_timeline,
        }

        if(window.location.pathname.split("/")[2] === "business") {
            data = {
                include_sibling_campus_timeline: name === "include_sibling_campus_timeline" ? !this.state.include_sibling_campus_timeline : this.state.include_sibling_campus_timeline,
                include_parent_campus_timeline: name === "include_parent_campus_timeline" ? !this.state.include_parent_campus_timeline : this.state.include_parent_campus_timeline,
                include_children_campus_timeline: name === "include_children_campus_timeline" ? !this.state.include_children_campus_timeline : this.state.include_children_campus_timeline,
            }
        }

        axios
        .post(settingsUrl, data, headers)
        .then(res => {
            this.setState({
                isLoading: false,
                include_sibling_campus_timeline: res.data.include_sibling_campus_timeline,
                include_parent_campus_timeline: res.data.include_parent_campus_timeline,
                include_children_campus_timeline: res.data.include_children_campus_timeline,
            })
            if(window.location.pathname.split("/")[2] === "business") {
                this.setState({
                    allow_unverified_events_on_timeline: res.data.allow_unverified_events_on_timeline,
                    allow_non_admin_events_on_timeline: res.data.allow_non_admin_events_on_timeline,
                })
            }
        })
        .catch(err => {
            this.setState({isLoading: false})
        })
    }

    componentDidMount(){
        settingsUrl = Api.BASE_URL + Api.UPDATE_ADMINS + `/${(window.location.pathname.split("/")[2]+"/"+window.location.pathname.split("/")[3])}/settings`;
        refreshToken();
        if(getFromStorage("user")) {
            this.fetchSettings();
        } else {
            this.setState({isLoading: false})
        }
    }

    render() {
        const { isLoading } = this.state;

        return (
            <div>
                <Helmet bodyAttributes={{style: 'background : #eee !important'}}/>
                <Sidebar isOpened={this.props.isOpened} changeState={this.props.changeState}/>
                <div style={{marginLeft: window.innerWidth > 600 ? (this.props.isOpened ? "200px" : "55px") : "55px",  color: "black", paddingTop: "50px", paddingLeft: "10px", overflowX: "auto"}}>
                    <h3 style={{color, marginLeft: "20px"}}>Settings</h3>
                    {!isLoading ?
                    <form 
                        style={{marginRight: "20px", fontSize: "14px", paddingLeft: "20px"}} 
                    >    
                        <div style={{backgroundColor: "white", paddingLeft: "20px", borderRadius: 10, paddingRight: "20px", overflowX: "auto"}}>
                            <br/>
                            {/* <Row>
                            <Col sm="4"> */}
                                <FormGroup controlId="include_sibling_campus_timeline" bssize="large" style={{textAlign: "left"}}>
                                    <Form.Check 
                                        custom
                                        type="checkbox"
                                        name="include_sibling_campus_timeline"
                                        checked={this.state.include_sibling_campus_timeline}
                                        value={this.state.include_sibling_campus_timeline}
                                        label={`Include Sibling Campus Timeline`}
                                        onChange={() => this.updateSettings("include_sibling_campus_timeline")}
                                    />
                                </FormGroup>
                            {/* </Col>
                            <Col sm="4"> */}
                                <FormGroup controlId="include_parent_campus_timeline" bssize="large" style={{textAlign: "left"}}>
                                    <Form.Check 
                                        custom
                                        type="checkbox"
                                        name="include_parent_campus_timeline"
                                        checked={this.state.include_parent_campus_timeline}
                                        value={this.state.include_parent_campus_timeline}
                                        label={`Include Parent Campus Timeline`}
                                        onChange={() => this.updateSettings("include_parent_campus_timeline")}
                                    />
                                </FormGroup>
                            {/* </Col>
                            <Col sm="4"> */}
                                <FormGroup controlId="include_children_campus_timeline" bssize="large" style={{textAlign: "left"}}>
                                    <Form.Check 
                                        custom
                                        type="checkbox"
                                        name="include_children_campus_timeline"
                                        checked={this.state.include_children_campus_timeline}
                                        value={this.state.include_children_campus_timeline}
                                        label={`Include Children Campus Timeline`}
                                        onChange={() => this.updateSettings("include_children_campus_timeline")}
                                    />
                                </FormGroup>
                            {/* </Col>
                            </Row> */}
                            {window.location.pathname.split("/")[2] !== "business" &&
                            <div>
                                <FormGroup controlId="allow_unverified_events_on_timeline" bssize="large" style={{textAlign: "left"}}>
                                    <Form.Check 
                                        custom
                                        type="checkbox"
                                        name="allow_unverified_events_on_timeline"
                                        checked={this.state.allow_unverified_events_on_timeline}
                                        value={this.state.allow_unverified_events_on_timeline}
                                        label={`Allow Unverified Events On Timeline`}
                                        onChange={() => this.updateSettings("allow_unverified_events_on_timeline")}
                                    />
                                </FormGroup>
                                <FormGroup controlId="allow_non_admin_events_on_timeline" bssize="large" style={{textAlign: "left"}}>
                                    <Form.Check 
                                        custom
                                        type="checkbox"
                                        name="allow_non_admin_events_on_timeline"
                                        checked={this.state.allow_non_admin_events_on_timeline}
                                        value={this.state.allow_non_admin_events_on_timeline}
                                        label={`Allow Non Admin Events On Timeline`}
                                        onChange={() => this.updateSettings("allow_non_admin_events_on_timeline")}
                                    />
                                </FormGroup>
                            </div>}
                            <br/>
                        </div>
                    </form>
                    :
                    <div style={{textAlign: "center", color}}>
                        <h1>Loading...</h1>
                    </div>
                    }
                    <br/>
                </div>
            </div>
        )
    }
}
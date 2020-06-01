import React, {Component} from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import { FormGroup, FormLabel, FormControl, Button, Col, Alert, Row } from 'react-bootstrap';
import {Helmet} from "react-helmet"
import Api from "../../../Api/Api.json";
import axios from 'axios';
import { getFromStorage } from '../../../utils/storage';
import profile from "../../../image/user.png";
import { Photo } from '@material-ui/icons';
import ProfileModal from "./ProfileModal";
import { refreshToken } from '../../../PrivateRoute/isLogin';
import moment from "moment";
import { getHeaders } from '../../../utils/headers';

const color = "#229a88";
let url = Api.BASE_URL + Api.UPDATE_ADMINS + `/${(window.location.pathname.split("/")[2]+"/"+window.location.pathname.split("/")[3])}/`;

export default class AdminProfile extends Component {
    state = {
        username: "", 
        address: "",
        web_page: "",
        profile_photo: null,
        isSubmitting: false,
        error: "",
        files: [],
        show:false,
        isLoading: true,
        success: "",
        base64: "",
        date: moment(),
    }

    setFile = (data) => {
        this.setState({files: data, base64: data.length > 0 ? data[0].src.base64 : ""})
    }

    whenChangeHandler = (e) => {
        const { name, value } = e.target;
        this.setState({[name]: value})
    }

    validateForm = () => {
        return this.state.username.length > 0 && this.state.address.length > 0;
    }

    checkNull = (data) => {
        return data ? data : "";
    }

    fetchProfile = () => {
        const headers = getHeaders();

        axios
        .get(url, headers)
        .then(res => {
            this.setState({
                isLoading: false,
                username: this.checkNull(res.data.username), 
                address: this.checkNull(res.data.address),
                web_page: this.checkNull(res.data.web_page), 
                profile_photo: res.data.profile_photo,
            })
        })
        .catch(err => {
            this.setState({isLoading: false})
        })
    }

    postRequest = (name) => {
        const { username, web_page, address } = this.state;
        let data = {}
        if(name === "upload") {
            const formData = new FormData();
            formData.append("profile_photo", this.state.files[0].src.file, this.state.files[0].src.file.name)
            data = formData
        } else {
            data = {
                username, 
                address,
                web_page: web_page.length === 0 ? null : web_page
            }
        }
        
        const headers = getHeaders();

        axios
        .post(url, data, headers)
        .then(res => {
            this.setState({
                isSubmitting: false,
                files: [],
                base64: "",
                success: name === "uploaded" ? "Image Uploaded Successfully" : "Profile Updated Successfully",
                error: "",
                profile_photo: res.data.profile_photo
            })
        })
        .catch(err => {
            if(err.response) {
                if(err.response.data.web_page)
                    this.setState({error: err.response.data.web_page[0]})
            } else {
                this.setState({error: "Something Went Wrong!"})
            }
            this.setState({isSubmitting: false, success: ""})
        })
    }

    formSubmit = (e) => {
        e.preventDefault();
        refreshToken();
        
        this.setState({isSubmitting: true}, () => {
            this.postRequest("");
        })
    }

    componentDidMount(){
        url = Api.BASE_URL + Api.UPDATE_ADMINS + `/${(window.location.pathname.split("/")[2]+"/"+window.location.pathname.split("/")[3])}/`;
        refreshToken();
        if(getFromStorage("user")) {
            this.fetchProfile();
        } else {
            this.setState({isLoading: false})
        }
    }

    render() {
        const { isSubmitting, isLoading } = this.state;

        return (
            <div>
                <ProfileModal show={this.state.show} base64={this.state.base64} handleShow={() => this.setState({show: true})} setFile={this.setFile} handleClose={() => this.setState({show: false}, () => {this.setFile([])})} closeHandle={() => this.setState({show: false})} uploadImage={() => this.setState({show: false}, () => {this.postRequest("upload")})}/>
                <Helmet bodyAttributes={{style: 'background : #eee !important'}}/>
                <Sidebar isOpened={this.props.isOpened} changeState={this.props.changeState}/>
                <div style={{marginLeft: window.innerWidth > 600 ? (this.props.isOpened ? "200px" : "55px") : "55px",  color: "black", paddingTop: "50px", paddingLeft: "10px", overflowX: "auto"}}>
                    <h3 style={{color, marginLeft: "20px"}}>Profile</h3>
                    {!isLoading ?
                    <form 
                        style={{marginRight: "20px", fontSize: "14px", paddingLeft: "20px"}} 
                        onSubmit={this.formSubmit}
                    >
                        <div style={{backgroundColor: "white", paddingLeft: "10px", borderRadius: 10, paddingRight: "20px", overflowX: "auto"}}>
                            {
                                this.state.error.length > 0 && 
                                <Alert variant="danger" style={{fontSize: "12px"}}>
                                    {this.state.error}
                                </Alert>
                            }
                            {
                                this.state.success.length > 0 && 
                                <Alert variant="success" style={{fontSize: "12px"}}>
                                    {this.state.success}
                                </Alert>
                            }
                            {
                                getFromStorage("user") ? !getFromStorage("user").user.is_account_setup &&
                                <Alert variant="danger" style={{fontSize: "12px"}}>
                                   Update Your Profile
                                </Alert>
                                :
                                <span></span>
                            }
                            <br/>
                            <Row>
                            <Col sm="4">
                                <div className="profile-container" onClick={() => this.setState({show: true})}>
                                    {!this.state.profile_photo ? 
                                    <img src={profile} alt="profile_pic" className="profile-image"/>
                                    :
                                    <img src={this.state.profile_photo} alt="profile_pic" className="profile-image"/>
                                    }
                                    
                                    <div className="profile-middle" style={{color: "#229a88"}}>
                                        <div className="profile-text">
                                            <Photo /> 
                                            <span style={{marginLeft: "5px", fontSize: "16px", fontWeight: "bold"}}>Upload Photo</span>
                                        </div>
                                    </div>

                                </div>
                                <br/>
                                <div style={{textAlign:"center", fontSize: "16px", fontWeight: "bold"}}>
                                    {this.state.username ? `@${this.state.username}` : ""}
                                </div>
                                <br/>
                            </Col>
                            <Col sm="8">
                                <FormGroup controlId="username" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Username<span style={{color: "red"}}>*</span></FormLabel>
                                    <FormControl
                                        size="sm"
                                        name="username"
                                        type="text"
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChange={this.whenChangeHandler}
                                    />
                                </FormGroup>
                                <FormGroup controlId="address" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Address<span style={{color: "red"}}>*</span></FormLabel>
                                    <FormControl
                                        size="sm"
                                        name="address"
                                        type="text"
                                        placeholder="Address"
                                        value={this.state.address}
                                        onChange={this.whenChangeHandler}
                                    />
                                </FormGroup>
                                <FormGroup controlId="web_page" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Web Page</FormLabel>
                                    <FormControl
                                        name="web_page"
                                        size="sm"
                                        type="text"
                                        placeholder="Web Page"
                                        value={this.state.web_page}
                                        onChange={this.whenChangeHandler}
                                    />
                                </FormGroup>
                                <Button block bssize="large" disabled={!this.validateForm() || isSubmitting} type="submit" style={{background: color, borderColor: color,width: "auto", marginLeft: "auto", marginRight: "auto"}} variant="dark" size="sm">
                                    {!isSubmitting ? "Update Profile" : "Loading..."}
                                </Button>
                            </Col>
                            </Row>
                            <br/>
                        </div>
                        <br/>
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
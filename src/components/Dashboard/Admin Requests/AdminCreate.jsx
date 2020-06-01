import React, { Component } from "react";
import { Modal, Button, Alert, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import { getFromStorage } from "../../../utils/storage";
import axios from 'axios';
import Api from "../../../Api/Api.json"
import { refreshToken } from "../../../PrivateRoute/isLogin";
import { getHeaders } from "../../../utils/headers";
import ReactLiveSearch from '../../Sidebar/ReactLiveSearch'
import img from '../../../image/user.png'

const color = "#229a88"
const searchUsersUrl = Api.BASE_URL + Api.SEARCH_USERS 
const createAdminUrl = Api.BASE_URL + Api.CREATE_ADMIN_ACCOUNT

export default class AdminAccount extends Component {
    state = {    
        university: "",
        business: "",
        organization: "",
        admin_type: "",
        privilege: "",
        user: "",
        success: "",
        error: "",
        searches: [],
        isSubmitting: false,
        users: []
    }

    whenChangeHandler = (e) => {
        const { name, value } = e.target
        this.setState({[name]: value})
    }

    searchUsers = () => {
        const headers = getHeaders();

        axios
        .get(searchUsersUrl + `?q=${this.state.user}`, headers)
        .then(res => this.setState({ users: res.data.results.map((result, i) => ({ label: 
            <div>
                
            {result.profile_photo ? <img src={result.profile_photo} style={{ width: "30px", height: "30px"}} alt="search"/> : 
            <img src={img} style={{ width: "30px", height: "30px"}} alt="search"/>}
            <span style={{marginLeft: "10px"}}>{result.full_name + " (" + result.username + ") "}</span>
           </div>, value: result.username})) }))
        .catch(err => {
            if(err.response) {
                if(err.response.data.length > 0) {
                    this.setState({error: err.response.data[0]})
                } else {
                    this.setState({error: "Something went wrong"})
                }
            } else {
                this.setState({error: "Something went wrong"})
            }
        })
    }

    createAdmin = () => {
        refreshToken()
        this.setState({isSubmitting: true}, () => {
            const headers = getHeaders();

            const data = {
                university: this.state.university,
                business: this.state.business,
                organization: this.state.organization,
                privilege: this.state.privilege.trim() !== "" ? parseInt(this.state.privilege) : 0,
                user: this.state.user,
                admin_type: this.state.admin_type
            }

            var temp = Object.assign({}, data);

            if(this.state.admin_type === "organization") {
                delete temp.university;
                delete temp.business;
            } else if(this.state.admin_type === "university") {
                delete temp.organization;
                delete temp.business;
            } else {
                delete temp.university;
                delete temp.organization;
            }

            axios
            .post(createAdminUrl, temp, headers)
            .then(res => {
                this.setState({
                        isSubmitting: false, 
                        error: "", 
                        success: "Form submitted successfully",
                        privilege: "",
                        user: "", 
                        users: []
                })
            })
            .catch(err => this.setState({isSubmitting: false, success: ""},() => {
                if(err.response) {
                    if(err.response.status === 404) {
                        this.setState({error: err.response.data.detail})
                    }
                    else if(err.response.status === 403) {
                        this.setState({error: err.response.data})
                    } 
                } else {
                    this.setState({error: "Something went wrong!"})
                }
            }))
        })
    }

    formSubmit = (e) => {
        e.preventDefault();
        this.createAdmin()
    }

    validateForm = () => {
        return this.state.privilege.length > 0 && this.state.user.length > 0 && this.state.admin_type.length > 0 && (this.state.admin_type === "organization" ? this.state.organization.length > 0 : this.state.admin_type === "university" ? this.state.university.length > 0 : this.state.business.length > 0);
    }

    componentDidMount(){
       this.setState({    
            university: getFromStorage("username") && (getFromStorage("username").type === "university" ? getFromStorage("username").username : ""),
            business: getFromStorage("username") && (getFromStorage("username").type === "business" ? getFromStorage("username").username : ""),
            organization: getFromStorage("username") && (getFromStorage("username").type === "organization" ? getFromStorage("username").username : ""),
            admin_type: getFromStorage("username") ? getFromStorage("username").type : "",
            privilege: "",
            user: "",
            success: "",
            error: "",
            searches: [],
            isSubmitting: false,
            users: []
        })
    }

    render() {
        const {isSubmitting} = this.state;

        return (
        <>
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{marginBottom: "-90px", color}}>Admin Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form 
                        style={{marginRight: "20px", fontSize: "14px", paddingLeft: "20px"}} 
                        onSubmit={this.formSubmit}
                    >
                        <div style={{backgroundColor: "white", paddingLeft: "10px", borderRadius: 10, paddingRight: "10px", overflowX: "auto"}}>
                            <br/>
                            {
                                this.state.success.length > 0 && 
                                <Alert variant="success" style={{fontSize: "12px"}}>
                                    {this.state.success}
                                </Alert>
                            }
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

                            <FormGroup controlId="privilege" bssize="large" style={{textAlign: "left"}}>
                                <FormLabel>Privilege<span style={{color:"red"}}>*</span></FormLabel>
                                <FormControl
                                    size="sm"
                                    name="privilege"
                                    as="select"
                                    value={this.state.privilege}
                                    onChange={this.whenChangeHandler}
                                >
                                    <option value="" style={{color: "gray"}}>Select Privilege*</option>
                                    {["Admin", "Event Editor", "Messenger", "Event Creator"]
                                    .map((item, i) => <option key={item} value={i}>{item}</option>)}
                                </FormControl>
                            </FormGroup>
                            <FormGroup controlId="user" bssize="large" style={{textAlign: "left"}}>
                                <FormLabel>User<span style={{color:"red"}}>*</span></FormLabel>
                                <ReactLiveSearch
                                    value={this.state.user}
                                    onChange={(value) => { this.setState({user: value}, () => this.searchUsers()) }}
                                    onSelect={() => {}}
                                    data={this.state.users}
                                />
                            </FormGroup>
                            <Button block bssize="large" disabled={!this.validateForm() || isSubmitting} type="submit" style={{background: color, borderColor: color, width: "100px", marginLeft: "auto", marginRight: "auto"}} variant="dark" size="sm">
                                {!isSubmitting ? "Submit" : "Loading..."}
                            </Button>
                            <br/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose} size="sm">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
        );
    }
}
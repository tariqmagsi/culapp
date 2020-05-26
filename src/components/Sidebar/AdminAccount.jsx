import React, { Component } from "react";
import { Modal, Button, Alert, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import { getFromStorage } from "../../utils/storage";
import axios from 'axios';
import Api from "../../Api/Api.json"
import { refreshToken } from "../../PrivateRoute/isLogin";
import { getHeaders } from "../../utils/headers";
import ReactLiveSearch from './ReactLiveSearch'

const color = "#229a88"
const url = Api.BASE_URL + Api.CREATE_ADMIN_REQUEST;
const searchUniversitiesUrl = Api.BASE_URL + Api.SEARCH_UNIVERSITIES 
const searchOrganizationsUrl = Api.BASE_URL + Api.SEARCH_ORGANIZATIONS 
const searchBusinessUrl = Api.BASE_URL + Api.SEARCH_BUSINESS 
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
        .then(res => this.setState({ users: res.data.results.map((result, i) => ({ label: result.username, value: result.username})) }))
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

    searchUniversities = () => {
        const headers = getHeaders();

        axios
        .get(searchUniversitiesUrl + `?q=${this.state.university}`, headers)
        .then(res => this.setState({ searches: res.data.results.map((result, i) => ({ label: result.username, value: result.username})) }))
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

    searchOrganizations = () => {
        const headers = getHeaders();

        axios
        .get(searchOrganizationsUrl + `?q=${this.state.organization}`, headers)
        .then(res => this.setState({ searches: res.data.results.map((result, i) => ({ label: result.username, value: result.username})) }, () => console.log(res.data)))
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

    searchBusiness = () => {
        const headers = getHeaders();

        axios
        .get(searchBusinessUrl + `?q=${this.state.business}`, headers)
        .then(res => this.setState({ searches: res.data.results.map((result, i) => ({ label: result.username, value: result.username})) }))
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
            .then(res => this.setState({
                        isSubmitting: false, 
                        error: "", 
                        success: "Form submitted successfully",
                        university: "",
                        business: "",
                        organization: "",
                        admin_type: "",
                        privilege: "",
                        user: "", 
                        users: []
            }))
            .catch(err => this.setState({isSubmitting: false, success: ""},() => {
                console.log(err.response.data)
                if(err.response) {
                    if(err.response.data)
                        this.setState({error: err.response.data[0]})
                } else {
                    this.setState({error: "Something went wrong!"})
                }
            }))
        })
    }

    formSubmit = (e) => {
        e.preventDefault();
        if(getFromStorage("user")) {
            if(!getFromStorage("user").user.is_admin) {
                refreshToken()
                this.setState({isSubmitting: true}, () => {
                    const headers = getHeaders();

                    const data = {
                        university: this.state.university,
                        business: this.state.business,
                        organization: this.state.organization,
                        privilege: this.state.privilege.trim() !== "" ? parseInt(this.state.privilege) : 0,
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
                    .post(url, temp, headers)
                    .then(res => this.setState({
                        isSubmitting: false, 
                        error: "", 
                        success: "Form submitted successfully",
                        university: "",
                        business: "",
                        organization: "",
                        admin_type: "",
                        privilege: "",
                        user: "", 
                        users: []
                    }))
                    .catch(err => this.setState({isSubmitting: false, success: ""},() => {
                        if(err.response) {
                            this.setState({error: err.response.data[0]})
                        } else {
                            this.setState({error: "Something went wrong!"})
                        }
                    }))
                })
            } else {
                this.createAdmin();
            }
        }
    }

    validateForm = () => {
        return this.state.privilege.length > 0 && this.state.user.length > 0 && this.state.admin_type.length > 0 && (this.state.admin_type === "organization" ? this.state.organization.length > 0 : this.state.admin_type === "university" ? this.state.university.length > 0 : this.state.business.length > 0);
    }

    componentDidMount(){
        this.searchUniversities()
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
                            {/* {
                                this.state.success.length > 0 && 
                                <Alert variant="success" style={{fontSize: "12px"}}>
                                    {this.state.success}
                                </Alert>
                            } */}
                            {/* {
                                this.state.error.length > 0 && 
                                <Alert variant="danger" style={{fontSize: "12px"}}>
                                    {this.state.error}
                                </Alert>
                            } */}
                            {
                                getFromStorage("user") ? !getFromStorage("user").user.is_account_setup &&
                                <Alert variant="danger" style={{fontSize: "12px"}}>
                                    Go to profile and update it
                                </Alert>
                                :
                                <span></span>
                            }
                            <FormGroup controlId="admin_type" bssize="large" style={{textAlign: "left"}}>
                                <FormLabel>Admin Type<span style={{color:"red"}}>*</span></FormLabel>
                                    <FormControl
                                        size="sm"
                                        name="admin_type"
                                        as="select"
                                        placeholder="Admin Type*"
                                        value={this.state.admin_type}
                                        onChange={(e) => {
                                                this.whenChangeHandler(e)
                                                this.setState({business: "", organization: "", university: "", searches: []})
                                            }}
                                    >
                                        <option value="" style={{color: "gray"}}>Select Admin Type*</option>
                                        {["Organization", "Business", "University"]
                                        .map((item, i) => <option key={item} value={item.toLowerCase()}>{item}</option>)}
                                    </FormControl>
                            </FormGroup>
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
                            {getFromStorage("user") && getFromStorage("user").user.is_admin &&
                                <FormGroup controlId="user" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>User<span style={{color:"red"}}>*</span></FormLabel>
                                    <ReactLiveSearch
                                        value={this.state.user}
                                        onChange={(value) => { this.setState({user: value}, () => this.searchUsers()) }}
                                        onSelect={() => {}}
                                        data={this.state.users}
                                    />
                                </FormGroup>
                            }
                            {this.state.admin_type !== "" &&
                                <div>
                                    {this.state.admin_type === "university" &&
                                        <FormGroup controlId="university" bssize="large" style={{textAlign: "left"}} className="live-search">
                                            <FormLabel>University<span style={{color:"red"}}>*</span></FormLabel>
                                            <ReactLiveSearch
                                                value={this.state.university}
                                                onChange={(value) => { this.setState({university: value}, () => this.searchUniversities()) }}
                                                onSelect={() => {}}
                                                data={this.state.searches}
                                            />
                                        </FormGroup>
                                    }
                                    {this.state.admin_type === "business" &&
                                        <FormGroup controlId="business" bssize="large" style={{textAlign: "left"}}>
                                            <FormLabel>Business<span style={{color:"red"}}>*</span></FormLabel>
                                            <ReactLiveSearch
                                                value={this.state.business}
                                                onChange={(value) => { this.setState({business: value}, () => this.searchBusiness()) }}
                                                onSelect={() => {}}
                                                data={this.state.searches}
                                            />
                                        </FormGroup>
                                    }
                                    {this.state.admin_type === "organization" &&
                                        <FormGroup controlId="organization" bssize="large" style={{textAlign: "left"}}>
                                            <FormLabel>Organization<span style={{color:"red"}}>*</span></FormLabel>
                                            <ReactLiveSearch
                                                value={this.state.organization}
                                                onChange={(value) => { this.setState({organization: value}, () => this.searchOrganizations()) }}
                                                onSelect={() => {}}
                                                data={this.state.searches}
                                            />
                                        </FormGroup>
                                    }
                                </div>
                            }
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
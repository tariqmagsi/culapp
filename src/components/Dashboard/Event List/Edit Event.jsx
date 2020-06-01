import React, {Component} from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import { FormGroup, FormLabel, FormControl, Button, Col, InputGroup, Alert } from 'react-bootstrap';
import {Helmet} from "react-helmet"
import Form from 'react-bootstrap/Form';
import Api from "../../../Api/Api.json";
import axios from 'axios';
import { getFromStorage } from '../../../utils/storage';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker-edited';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
import { CalendarToday } from '@material-ui/icons';
import { refreshToken } from '../../../PrivateRoute/isLogin';
import Files from "react-butterfiles";
import ReactTags from 'react-tag-autocomplete'
import img from "../../../image/user.png"
import { getHeaders } from '../../../utils/headers';
import ReactLiveSearch from '../../Sidebar/ReactLiveSearch';

const color = "#229a88";
const url = Api.BASE_URL + Api.EVENT;
const categoriesUrl = Api.BASE_URL + Api.EVENT_CATEGORIES;
const usersUrl = Api.BASE_URL + Api.SEARCH_USERS;
const searchUniversitiesUrl = Api.BASE_URL + Api.SEARCH_UNIVERSITIES 
const searchOrganizationsUrl = Api.BASE_URL + Api.SEARCH_ORGANIZATIONS 
const searchBusinessUrl = Api.BASE_URL + Api.SEARCH_BUSINESS 

export default class EditEvent extends Component {
    state = {
        name: "", 
        category: "",
        description: "", 
        address: "", 
        email: "", 
        phone_number: "", 
        website: "", 
        cost: "", 
        free_until: "",
        start_time: "",
        end_time: "",
        university_username: "",
        organization_username: "",
        invited_guest_usernames: [],
        visibility_scope: "",
        free_food_and_drinks: "",
        food_offered: false,
        drinks_offered: false,
        alchohol: false,
        smoking_allowed: false,
        pets_allowed: false,
        age_required: "",
        dress_code: "",
        status: "",
        groups: [],
        frequency: "",
        business_username: "",
        type: "",
        isSubmitting: false,
        categories: [],
        error: "",
        startDate: moment(),
        endDate: moment(),
        date: moment(),
        range: "",
        isLoading: true,
        files: [],
        errors: [],
        base64: "",
        success: "",
        search: "",
        tags: [],
        universities: [],
        businesses: [],
        organizations: []
    }

    searchUniversities = () => {
        const headers = getHeaders();

        axios
        .get(searchUniversitiesUrl + `?q=${this.state.university_username}`, headers)
        .then(res => this.setState({ universities: res.data.results.map((result, i) => ({ 
            label: <div>
                    {result.profile_photo ? <img src={result.profile_photo} style={{ width: "30px", height: "30px"}} alt="search"/> : 
                    <img src={img} style={{ width: "30px", height: "30px"}} alt="search"/>}
                    <span style={{marginLeft: "10px"}}>{result.name + " (" + result.username + ") "}</span>
                   </div>, 
            value: result.username})) }))
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
        .get(searchOrganizationsUrl + `?q=${this.state.organization_username}`, headers)
        .then(res => this.setState({ organizations: res.data.results.map((result, i) => ({ label: 
            <div>
            {result.profile_photo ? <img src={result.profile_photo} style={{ width: "30px", height: "30px"}} alt="search"/> : 
            <img src={img} style={{ width: "30px", height: "30px"}} alt="search"/>}
            <span style={{marginLeft: "10px"}}>{result.name + " (" + result.username + ") "}</span>
           </div>, value: result.username})) }, () => console.log(res.data)))
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
        .get(searchBusinessUrl + `?q=${this.state.business_username}`, headers)
        .then(res => this.setState({ businesses: res.data.results.map((result, i) => ({ label: 
            <div>
            {result.profile_photo ? <img src={result.profile_photo} style={{ width: "30px", height: "30px"}} alt="search"/> : 
            <img src={img} style={{ width: "30px", height: "30px"}} alt="search"/>}
            <span style={{marginLeft: "10px"}}>{result.name + " (" + result.username + ") "}</span>
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


    handleDelete = (i) => {
        const tags = this.state.tags.slice(0)
        tags.splice(i, 1)
        this.setState({ tags })
    }
     
    handleAddition = (tag) => {
        const tags = this.state.tags.filter((name) => name.name === tag.name).length === 0 ? [].concat(this.state.tags, tag) : this.state.tags
        this.setState({ tags })
    }

    whenChangeHandler = (e) => {
        const { name, value } = e.target;
        this.setState({[name]: value})
    }

    validateForm = () => {
        return this.state.name.length > 0 && this.state.category.toString().length > 0 && this.state.description.length > 0 && this.state.address.length > 0 && this.state.start_time.length > 0 && this.state.end_time.length > 0 && this.state.visibility_scope.toString().length > 0;
    }

    handleApply = (event, picker) => {
        this.setState({
          startDate: picker.startDate,
          endDate: picker.endDate,
        }, () => {
            this.setState({
                start_time: this.state.startDate.format("DD/MM/YYYY HH:mm A").toString(),
                end_time: this.state.endDate.format("DD/MM/YYYY HH:mm A").toString(),
                range: `${this.state.startDate.format("DD/MM/YYYY HH:mm A").toString()} - ${this.state.endDate.format("DD/MM/YYYY HH:mm A").toString()}`
            })
        });
    }

    returnData = ({ organization_username, business_username, university_username, ...rest }) => {
        return organization_username.length > 0 ? {organization_username, ...rest} : business_username
    }   

    formSubmit = (e) => {
        e.preventDefault();

        refreshToken();
        this.setState({isSubmitting: true}, () => {
            const data = {
                name: this.state.name, 
                category: parseInt(this.state.category),
                description: this.state.description, 
                address: this.state.address, 
                email: this.state.email, 
                phone_number: this.state.phone_number, 
                website: this.state.website, 
                cost: this.state.cost.length > 0 ? parseInt(this.state.cost) : 0, 
                free_until: this.state.free_until.length > 0 ? this.state.date.toISOString() : null,
                start_time: this.state.startDate.toISOString(),
                end_time: this.state.endDate.toISOString(),
                university_username: this.state.university_username,
                organization_username: this.state.organization_username,
                invited_guests: this.state.tags.length > 0 ? this.state.tags.map(name => name.name) : [],
                visibility_scope: parseInt(this.state.visibility_scope),
                free_food_and_drinks: this.state.free_food_and_drinks,
                food_offered: this.state.food_offered,
                drinks_offered: this.state.drinks_offered,
                alchohol: this.state.alchohol,
                smoking_allowed: this.state.smoking_allowed,
                pets_allowed: this.state.pets_allowed,
                age_required: this.state.age_required.length > 0 ? parseInt(this.state.age_required) : null,
                dress_code: this.state.dress_code,
                status: this.state.status.length > 0 ? parseInt(this.state.status) : "",
                groups: this.state.groups.length > 0 ? this.state.groups : [],
                frequency: this.state.status.length > 0 ? parseInt(this.state.frequency) : "",
                business_username: this.state.business_username,
                type: this.state.status.length > 0 ? parseInt(this.state.type) : "",
            }

            const formData = new FormData();
            var temp = Object.assign({}, data);

            if(temp.business_username.length === 0) {
                delete temp.business_username;
            } else {
                formData.append("business_username", temp.business_username)
            }
            if(temp.organization_username.length === 0) {
                delete temp.organization_username;
            } else {
                formData.append("organization_username", temp.organization_username)
            }
            if(temp.university_username.length === 0) {
                delete temp.university_username;
            } else {
                formData.append("university_username", temp.university_username)
            }
            if(this.state.frequency.length === 0) {
                delete temp.frequency;
            } else {
                formData.append("frequency", temp.frequency)
            }
            if(this.state.type.length === 0) {
                delete temp.type;
            } else {
                formData.append("type", temp.type)
            }
            if(this.state.status.length === 0) {
                delete temp.status;
            } else {
                formData.append("status", temp.status)
            }

            const headers = getHeaders();

            if(this.state.files.length > 0) {
                formData.append("cover", this.state.files[0].src.file, this.state.files[0].src.file.name)
            }
            formData.append("name", temp.name); 
            formData.append("category", temp.category);
            formData.append("description", temp.description)
            formData.append("address", temp.address)
            formData.append("email", temp.email) 
            formData.append("phone_number", temp.phone_number) 
            formData.append("website", temp.website) 
            formData.append("cost", temp.cost)
            if(this.state.free_until.length > 0)
                formData.append("free_until", temp.free_until)
            formData.append("start_time", temp.start_time)
            formData.append("end_time", temp.end_time)
            formData.append("invited_guests",temp.invited_guests)
            formData.append("visibility_scope", temp.visibility_scope)
            formData.append("free_food_and_drinks", temp.free_food_and_drinks)
            formData.append("food_offered", temp.food_offered)
            formData.append("drinks_offered", temp.drinks_offered)
            formData.append("alchohol", temp.alchohol)
            formData.append("smoking_allowed", temp.smoking_allowed)
            formData.append("pets_allowed", temp.pets_allowed)
            if(this.state.age_required.length > 0)
                formData.append("age_required", temp.age_required)
            formData.append("dress_code", temp.dress_code)
            if(this.state.groups.length > 0)
                formData.append("groups", temp.groups)

            axios
            .put(url + `${window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]}/`, formData, headers)
            .then(res => {
                    this.setState({
                        files: [],
                        errors: [],
                        base64: "",
                        isSubmitting: false, 
                        error: "",
                        profile_photo: res.data.cover,
                        success: "Event Updated Successfully"
                    })
            })
            .catch(err => {
                if(err.response) {
                    if(err.response.data.start_time) {
                        this.setState({error: err.response.data.start_time})
                    } else if(err.response.data.address) {
                        this.setState({error: err.response.data.address})
                    } else if(err.response.data.business_username) {
                        this.setState({error: err.response.data.business_username[0]})
                    } else if(err.response.data.organization_username) {
                        this.setState({error: err.response.data.organization_username[0]})
                    } else if(err.response.data.university_username) {
                        this.setState({error: err.response.data.university_username})
                    } else if(err.response.data.end_time) {
                        this.setState({error: err.response.data.university_username})
                    } else if(err.response.data.website) {
                        this.setState({error: err.response.data.website})
                    } 
                } else {
                    this.setState({error: "Something went wrong!"})
                }
                this.setState({isSubmitting: false})
            })
        })
    }

    fetchCategories = () => {
        const headers = getHeaders();

        axios.get(categoriesUrl, headers)
        .then(res => {
            this.fetchUsers("")
            this.setState({categories: res.data.results ? res.data.results : res.data, error: ""}, () => this.fetchEvent())})
        .catch(err => {
            this.setState({isLoading: false})
        })
    }

    fetchEvent = () => {
        const headers = getHeaders();

        axios
        .get(url + `${window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]}/`, headers)
        .then(res => this.setState({
                name: res.data.name, 
                category: res.data.category,
                description: res.data.description, 
                address: res.data.address,  
                email: res.data.email ? res.data.email : "", 
                phone_number: res.data.phone_number ? res.data.phone_number : "", 
                website: res.data.website ? res.data.website : "", 
                cost: res.data.cost !== 0 ? res.data.cost : "", 
                free_until: res.data.free_until ? moment(res.data.free_until).format("DD/MM/YYYY").toString() : "", 
                university_username: res.data.university_username ? res.data.university_username : "",
                organization_username: res.data.organization_username ? res.data.organization_username : "",
                invited_guest_usernames: res.data.invited_guest_usernames,
                visibility_scope: res.data.visibility_scope,
                free_food_and_drinks: res.data.free_food_and_drinks ? res.data.free_food_and_drinks : "",
                food_offered: res.data.food_offered,
                drinks_offered: res.data.drinks_offered,
                alchohol: res.data.alchohol,
                smoking_allowed: res.data.smoking_allowed,
                pets_allowed: res.data.pets_allowed,
                age_required: res.data.age_required ? res.data.age_required : "",
                dress_code: res.data.dress_code ? res.data.dress_code : "",
                status: res.data.status,
                groups: res.data.groups,
                frequency: res.data.frequency,
                business_username: res.data.business_username ? res.data.business_username : "",
                profile_photo: res.data.cover,
                type: res.data.type,
                startDate: moment(res.data.start_time),
                endDate: moment(res.data.end_time),
                date: moment(res.data.free_until),
                start_time: moment(res.data.start_time).format("DD/MM/YYYY HH:mm A").toString(),
                end_time: moment(res.data.start_time).format("DD/MM/YYYY HH:mm A").toString(),
                range: `${moment(res.data.start_time).format("DD/MM/YYYY HH:mm A").toString()} - ${moment(res.data.start_time).format("DD/MM/YYYY HH:mm A").toString()}`,
                error: "", 
                isLoading: false
            }))
        .catch(err => this.setState({isLoading: false}))
    }

    fetchUsers = (query) => {
        refreshToken()
        const headers = getHeaders();

        axios.get(usersUrl + `?q=${query}`, headers)
        .then(res => {this.setState({invited_guest_usernames: res.data.results ? res.data.results.length > 0 ? res.data.results.map((item,i) => ({id: i+1, name: item.username})) : [] : res.data, error: ""})})
        .catch(err => {
            this.setState({isLoading: false})
        })
    }

    componentDidMount(){
        if(getFromStorage("user")) {
            refreshToken();
            this.fetchCategories();
        } else {
            this.setState({isLoading: false})
        }
    }

    render() {
        const { isSubmitting } = this.state;

        return (
            <div>
                <Helmet bodyAttributes={{style: 'background : #eee !important'}}/>
                <Sidebar isOpened={this.props.isOpened} changeState={this.props.changeState}/>
                <div style={{marginLeft: window.innerWidth > 600 ? (this.props.isOpened ? "200px" : "55px") : "55px",  color: "black", paddingTop: "50px", paddingLeft: "10px", overflowX: "auto"}}>
                    <h3 style={{color, marginLeft: "20px"}}>Edit Event</h3>
                    {!this.state.isLoading ?
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
                            <Form.Row>
                                <FormGroup as={Col} sm="6" controlId="name" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Name<span style={{color:"red"}}>*</span></FormLabel>
                                        <FormControl
                                            size="sm"
                                            name="name"
                                            type="text"
                                            placeholder="Name*"
                                            value={this.state.name}
                                            onChange={this.whenChangeHandler}
                                        />
                                </FormGroup>
                                <FormGroup as={Col} sm="6" controlId="category" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Category<span style={{color:"red"}}>*</span></FormLabel>
                                    <FormControl
                                        size="sm"
                                        name="category"
                                        as="select"
                                        placeholder="Category*"
                                        value={this.state.category}
                                        onChange={this.whenChangeHandler}
                                    >
                                        <option value="" style={{color: "gray"}}>Select Category*</option>
                                        {this.state.categories.map(item => 
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        )}
                                    </FormControl>
                                </FormGroup>
                            </Form.Row>
                            <Form.Row>
                                <FormGroup as={Col} sm="6" controlId="description" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Description<span style={{color:"red"}}>*</span></FormLabel>
                                    <FormControl
                                        name="description"
                                        size="sm"
                                        as="textarea"
                                        placeholder="Description*"
                                        value={this.state.description}
                                        onChange={this.whenChangeHandler}
                                    />
                                </FormGroup>
                                <FormGroup as={Col} sm="6" controlId="address" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Address<span style={{color:"red"}}>*</span></FormLabel>
                                    <FormControl
                                        name="address"
                                        size="sm"
                                        as="textarea"
                                        placeholder="Address*"
                                        value={this.state.address}
                                        onChange={this.whenChangeHandler}
                                    />
                                </FormGroup>
                            </Form.Row>
                            <Form.Row>
                                <FormGroup as={Col} sm="6" controlId="start_time" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Start Time<span style={{color:"red"}}>*</span> - End Time<span style={{color:"red"}}>*</span></FormLabel>
                                        <DatetimeRangePicker
                                            timePicker
                                            showDropdowns
                                            startDate={this.state.startDate}
                                            endDate={this.state.endDate}
                                            onApply={this.handleApply}
                                        >
                                            <InputGroup className="mb-3" size="sm">
                                                <FormControl
                                                    size="sm"
                                                    name="start_time"
                                                    type="text"
                                                    placeholder="Start Time* - End Time*"
                                                    value={this.state.range}
                                                    onChange={() => {}}
                                                />
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text>
                                                        <CalendarToday fontSize="small"/>
                                                    </InputGroup.Text>
                                                </InputGroup.Prepend>
                                            </InputGroup>
                                        </DatetimeRangePicker>
                                </FormGroup>
                                
                                <FormGroup as={Col} sm="6" controlId="visibility_scope" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Visibility Scope<span style={{color: "red"}}>*</span></FormLabel>
                                    <FormControl
                                        as="select"
                                        size="sm"
                                        name="visibility_scope"
                                        placeholder="Visibility Scope"
                                        value={this.state.visibility_scope}
                                        onChange={this.whenChangeHandler}
                                    >
                                        <option value="" style={{color: "gray"}}>Select Visibility Scope*</option>
                                        {["Everyone","College Students", "Your Univeresity", "Your Campus", "Your Organization", "Invite Only"].map((item, i) =>
                                            <option value={i} key={item}>{item}</option>
                                        )}
                                    </FormControl>
                                </FormGroup>
                            </Form.Row>
                            <Form.Row>
                                <FormGroup as={Col} sm="3" controlId="email" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl
                                        size="sm"
                                        name="email"
                                        type="text"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.whenChangeHandler}
                                    />
                                </FormGroup>
                                <FormGroup as={Col} sm="3" controlId="phone_number" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl
                                        size="sm"
                                        name="phone_number"
                                        pattern="[0-9,+]*"
                                        type="text"
                                        placeholder="Phone Number"
                                        value={this.state.phone_number}
                                        onChange={(e) => {
                                            if(e.target.validity.valid){
                                                this.setState({phone_number: e.target.value})
                                            }
                                        }}
                                    />
                                </FormGroup>
                                <FormGroup as={Col} sm="3" controlId="website" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Website</FormLabel>
                                    <FormControl
                                        size="sm"
                                        name="website"
                                        type="text"
                                        placeholder="Website"
                                        value={this.state.website}
                                        onChange={this.whenChangeHandler}
                                    />
                                </FormGroup>
                                <FormGroup as={Col} sm="3" controlId="free_until" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Free Until</FormLabel>
                                    <DatetimeRangePicker
                                        singleDatePicker
                                        showDropdowns
                                        startDate={this.state.date}
                                        onApply={(e, picker) => {
                                            this.setState({
                                                date: picker.startDate,
                                                free_until: picker.startDate.format("DD/MM/YYYY")
                                            })
                                        }}
                                    >
                                        <InputGroup className="mb-3" size="sm">
                                            <FormControl
                                                size="sm"
                                                name="start_time"
                                                type="text"
                                                placeholder="Free Until"
                                                value={this.state.free_until}
                                                onChange={() => {}}
                                            />
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    <CalendarToday fontSize="small"/>
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                        </InputGroup>
                                    </DatetimeRangePicker>
                                </FormGroup>
                            </Form.Row>  
                            <Form.Row>
                                <FormGroup as={Col} sm="12" controlId="invited_guest_usernames" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Invited Guest Usernames</FormLabel>
                                    <ReactTags
                                        tags={this.state.tags}
                                        suggestions={this.state.invited_guest_usernames}
                                        handleDelete={this.handleDelete}
                                        handleAddition={this.handleAddition} 
                                        handleInputChange={this.fetchUsers}
                                        placeholder="Add New Username"
                                    />
                                </FormGroup>
                            </Form.Row>
                            <Form.Row> 
                                <FormGroup as={Col} sm="4" controlId="university_username" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>University</FormLabel>
                                    <ReactLiveSearch
                                        value={this.state.university_username}
                                        onChange={(value) => { this.setState({university_username: value}, () => this.searchUniversities()) }}
                                        onSelect={() => {}}
                                        data={this.state.universities}
                                    />
                                </FormGroup>
                                <FormGroup as={Col} sm="4" controlId="orgnization_username" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Organization</FormLabel>
                                    <ReactLiveSearch
                                        value={this.state.orgnization_username}
                                        onChange={(value) => { this.setState({orgnization_username: value}, () => this.searchOrganizations()) }}
                                        onSelect={() => {}}
                                        data={this.state.organizations}
                                    />
                                </FormGroup>
                                
                                <FormGroup as={Col} sm="4" controlId="business_username" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Business</FormLabel>
                                    <ReactLiveSearch
                                        value={this.state.business_username}
                                        onChange={(value) => { this.setState({business_username: value}, () => this.searchBusiness()) }}
                                        onSelect={() => {}}
                                        data={this.state.businesses}
                                    />
                                </FormGroup>
                            </Form.Row>
                            <Form.Row>
                                <FormGroup as={Col} sm="4" controlId="status" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl
                                        name="status"
                                        size="sm"
                                        as="select"
                                        placeholder="Status"
                                        value={this.state.status}
                                        onChange={this.whenChangeHandler}
                                    >
                                        <option value="" style={{color: "gray"}}>Select Status</option>
                                        {["Unpublished","Published","Cancelled","Reshcheduled"].map((item, i) => 
                                            <option value={i.toString()} key={item}>{item}</option>
                                        )}
                                    </FormControl>
                                </FormGroup>
                                <FormGroup as={Col} sm="4" controlId="frequency" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Frequency</FormLabel>
                                    <FormControl
                                        size="sm"
                                        name="frequency"
                                        as="select"
                                        placeholder="Frequency"
                                        value={this.state.frequency}
                                        onChange={this.whenChangeHandler}
                                    >
                                        <option value="" style={{color: "gray"}}>Select Frequency</option>
                                        {["Once","Daily","Weekly","Monthly","Annually"].map((item, i) => 
                                            <option value={i.toString()} key={item}>{item}</option>
                                        )}
                                    </FormControl>
                                </FormGroup>
                                <FormGroup as={Col} sm="4" controlId="type" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Type</FormLabel>
                                    <FormControl
                                        size="sm"
                                        name="type"
                                        as="select"
                                        placeholder="Type"
                                        value={this.state.type}
                                        onChange={this.whenChangeHandler}
                                    >
                                        <option value="" style={{color: "gray"}}>Select Type</option>
                                        {["User Event","Organization Event","University Event","Business Event"].map((item,i) => 
                                            <option value={i.toString()} key={item}>{item}</option>
                                        )}
                                    </FormControl>
                                </FormGroup>
                            </Form.Row>
                            <Form.Row>
                                <FormGroup as={Col} sm="3" controlId="cost" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Cost</FormLabel>
                                    <InputGroup className="mb-3" size="sm">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>$</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            size="sm"
                                            name="cost"
                                            type="text"
                                            pattern="[0-9]*"
                                            placeholder="Cost"
                                            value={this.state.cost}
                                            onChange={(e) => {
                                                if(e.target.validity.valid){
                                                    this.setState({cost: e.target.value})
                                                }
                                            }}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup as={Col} sm="3" controlId="free_food_and_drinks" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Free Food And Drinks</FormLabel>
                                    <FormControl
                                        size="sm"
                                        name="free_food_and_drinks"
                                        type="text"
                                        placeholder="Free Food And Drinks"
                                        value={this.state.free_food_and_drinks}
                                        onChange={this.whenChangeHandler}
                                    />
                                </FormGroup>
                                <FormGroup as={Col} sm="3" controlId="age_requierd" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Age Required</FormLabel>
                                    <FormControl
                                        name="age_required"
                                        pattern="[0-9]*"
                                        size="sm"
                                        type="text"
                                        placeholder="Age Required"
                                        value={this.state.age_required}
                                        onChange={(e) => {
                                            if(e.target.validity.valid){
                                                this.setState({age_required: e.target.value})
                                            }
                                        }}
                                    />
                                </FormGroup>
                                <FormGroup as={Col} sm="3" controlId="dress_code" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Dress Code</FormLabel>
                                    <FormControl
                                        name="dress_code"
                                        size="sm"
                                        type="text"
                                        placeholder="Dress Code"
                                        value={this.state.dress_code}
                                        onChange={this.whenChangeHandler}
                                    />
                                </FormGroup>
                            </Form.Row>
                            
                            <Form.Row>
                                <legend className="login-legend" style={{marginLeft: "5px"}}>Options</legend>
                                <FormGroup as={Col} sm="3" controlId="food_offered" bssize="large" style={{marginLeft: "3px"}}>
                                    <Form.Check 
                                        custom
                                        type="checkbox"
                                        id="food_offered"
                                        checked={this.state.food_offered}
                                        value={this.state.food_offered}
                                        label={`Food Offered`}
                                        onChange={() => {
                                            this.setState({food_offered: !this.state.food_offered})
                                        }}
                                    />
                                </FormGroup>
                                <FormGroup as={Col} sm="3" controlId="drinks_offered" bssize="large" style={{marginLeft: "3px"}}>
                                    <Form.Check 
                                        custom
                                        type="checkbox"
                                        id="drinks_offered"
                                        checked={this.state.drinks_offered}
                                        value={this.state.drinks_offered}
                                        label={`Drinks Offered`}
                                        onChange={() => {
                                            this.setState({drinks_offered: !this.state.drinks_offered})
                                        }}
                                    />
                                </FormGroup>
                                <FormGroup as={Col} sm="3" controlId="alchohol" bssize="large" style={{marginLeft: "3px"}}>
                                    <Form.Check 
                                        custom
                                        type="checkbox"
                                        id="alchohol"
                                        checked={this.state.alchohol}
                                        value={this.state.alchohol}
                                        label={`Alchohol`}
                                        onChange={() => {
                                            this.setState({alchohol: !this.state.alchohol})
                                        }}
                                    />
                                </FormGroup>
                                <FormGroup as={Col} sm="3" controlId="smoking_allowed" bssize="large" style={{marginLeft: "3px"}}>
                                    <Form.Check 
                                        custom
                                        type="checkbox"
                                        id="smoking_allowed"
                                        checked={this.state.smoking_allowed}
                                        value={this.state.smoking_allowed}
                                        label={`Smoking Allowed`}
                                        onChange={() => {
                                            this.setState({smoking_allowed: !this.state.smoking_allowed})
                                        }}
                                    />
                                </FormGroup>
                                <FormGroup as={Col} sm="3" controlId="pets_allowed" bssize="large" style={{marginLeft: "3px"}}>
                                    <Form.Check 
                                        custom
                                        type="checkbox"
                                        id="pets_allowed"
                                        checked={this.state.pets_allowed}
                                        value={this.state.pets_allowed}
                                        label={`Pets Allowed`}
                                        onChange={() => {
                                            this.setState({pets_allowed: !this.state.pets_allowed})
                                        }}
                                    />
                                </FormGroup>
                            </Form.Row>
                            <div>
                            <Files
                                multiple={false} 
                                maxSize="1000mb"
                                convertToBase64={true}
                                accept={["image/jpg","image/jpeg", "image/png"]}
                                onSuccess={files => {
                                            this.setState({files, errors: [], base64: files[0].src.base64})
                                        }}
                                onError={errors => {
                                            this.setState({files: [], errors, base64: ""});
                                        }}
                            >
                                {({ browseFiles, getDropZoneProps, getLabelProps }) => (
                                    <>
                                        <div {...getDropZoneProps({ className: "myDropZone" })}/>
                                        
                                        <FormGroup as={Col} sm="6" controlId="browse" bssize="large" style={{marginLeft: "-10px"}} onClick={browseFiles}>
                                            <InputGroup className="mb-3" size="sm" style={{cursor: "pointer"}}>
                                                <FormControl
                                                    size="sm"
                                                    name="browse"
                                                    type="text"
                                                    value=""
                                                    placeholder="Browse..."
                                                    style={{cursor: "pointer"}}
                                                    onChange={() => {}}
                                                />
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text>Choose Photo</InputGroup.Text>
                                                </InputGroup.Prepend>
                                            </InputGroup>
                                        </FormGroup>
                                        {this.state.errors.map(error => (
                                            <div key={error} style={{color: "red",  marginLeft: "10px"}}>
                                                {error.file.name} - {error.type}
                                            </div>
                                        ))}
                                        {this.state.base64.length > 0 ?
                                            <img src={this.state.base64} alt="cover" style={{width: "auto", height: "100px",  marginLeft: "10px"}}/>
                                            :
                                            this.state.profile_photo && 
                                            <img src={this.state.profile_photo} alt="cover" style={{width: "auto", height: "100px",  marginLeft: "10px"}}/>
                                        }
                                        <br/>
                                    </>
                                )}
                            </Files>
                            </div>
                            <Button block bssize="large" disabled={!this.validateForm() || isSubmitting} type="submit" style={{background: color, borderColor: color, width: "100px", marginLeft: "auto", marginRight: "auto"}} variant="dark" size="sm">
                                {!isSubmitting ? "Update" : "Loading..."}
                            </Button>
                            <br/>
                        </div>
                    </form>
                    :
                    <h1 style={{textAlign: "center", color}}>Loading...</h1>
                    }
                    
                    <br/>
                </div>
            </div>
        )
    }
}
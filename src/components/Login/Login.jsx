import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel, Alert } from "react-bootstrap";
import logo from "../../image/logo.png"
import { NavLink, withRouter } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import Api from "../../Api/Api.json"
import axios from "axios";
import { setInStorage, getFromStorage, removeFromStorage } from "../../utils/storage";
import { refreshToken } from "../../PrivateRoute/isLogin";

const color = "#229a88";
const url = Api.BASE_URL + Api.LOGIN_API;
const verifyURL = Api.BASE_URL + Api.VERIFY_TOKEN_API;

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModelShow, setisModelShow] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if(isLoading) {
    if(getFromStorage("user")){
      if(!refreshToken()) {
        verifyToken();
      } else {
        props.history.replace("/create_event")
      }
    }
    else {
      setIsLoading(false);
    }
  }

  function verifyToken(){
    const data = {
        token: getFromStorage("user") ? getFromStorage("user").token : ""
    }
    axios
    .post(verifyURL, data)
    .then(res => {
        props.history.replace("/create_event")
    })
    .catch(err => {
      if(err.toString().includes("400") || !getFromStorage("user")){
        removeFromStorage("user")
        setIsLoading(false)
      } else {
        props.history.replace("/create_event")
      }
    })
  }

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    const data = {
        email,
        password
    }
    axios
    .post(url, data)
    .then(res => {
      setEmail("");
      setPassword("");
      setError("");
      setIsSubmitting(false);
      setInStorage("user", res.data);
      props.history.replace("/create_event")
    })
    .catch(err => {
      setError("Email or Password incorrect");
      setIsSubmitting(false);
    })
  }

  if(isLoading) {
    return <div></div>
  }
   
  return (
    <div className="Login" style={{textAlign: "center"}}>
      <div style={{backgroundColor: "white", marginLeft: "20px", marginRight: "20px", marginTop: "10px"}} className="ma2 pa5 dib shadow-4">
        <div style={{textAlign: "center"}}>
            <h1 style={{textAlign: "center", color, marginBottom: "0px"}} className="name">Culapp</h1>
            <img src={logo} alt="logo" width="100" style={{marginLeft: "auto", marginRight: "auto"}}/>
        </div>
        <br/>
        <h3 style={{textAlign: "center", color, fontWeight: "bold"}}>Login</h3>
        <form onSubmit={handleSubmit}>
            {
              error.length > 0 && 
              <Alert variant="danger" style={{fontSize: "12px"}}>
                  {error}
              </Alert>
            }
            <FormGroup controlId="email" bssize="large" style={{textAlign: "left"}}>
            <FormLabel>Email</FormLabel>
            <FormControl
                autoFocus
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setError("");
                }}
            />
            </FormGroup>
            <FormGroup controlId="password" bssize="large" style={{textAlign: "left"}}>
            <FormLabel>Password</FormLabel>
            <FormControl
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Password"
                type="password"
            />
            </FormGroup>
            <FormGroup style={{marginTop: "-5px", marginBottom: "5px", textAlign: "right"}}>
                <FormLabel style={{color: "gray", cursor: "pointer"}} onClick={() => setisModelShow(true)}>
                    Forgot Password?
                </FormLabel>
            </FormGroup>
            <Button block bssize="large" disabled={!validateForm() || isSubmitting ? true:false} type="submit" style={{background: color, borderColor: color}} variant="dark">
              {!isSubmitting ? "Login" : "Loading..."}
            </Button>
            <FormGroup style={{textAlign: "center", marginTop: "10px", marginBottom: "-10px"}}>
                <FormLabel>
                    <span style={{color: "gray"}}>Don't have an account?</span> {" "}
                    <NavLink to="/Signup">
                        <span style={{color: color, fontWeight: "bold", cursor: "pointer"}}>
                            Register Now
                        </span>
                    </NavLink>
                </FormLabel>
            </FormGroup>
        </form>
      </div>
      <ForgotPassword show={isModelShow} onHide={() => setisModelShow(false)} />
    </div>
  );
}

export default withRouter(Login);
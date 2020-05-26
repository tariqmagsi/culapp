import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel, Alert } from "react-bootstrap";
import logo from "../../image/logo.png";
import Api from "../../Api/Api.json";
import axios from 'axios';

const color = "#229a88";
const url = Api.BASE_URL + Api.RESET_PASSWORD_API;

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function validateForm() {
    return  password.length > 0 && retypePassword.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    const data = {
      uid: window.location.pathname.split("/")[2],
      token: window.location.pathname.split("/")[3],
      new_password: password
    }
    if(password !== retypePassword) {
      setError("Passwords are not equal")
      setSuccess("");
      setIsSubmitting(false);
    } else {
      axios
      .post(url, data)
      .then(res => {
        setPassword("");
        setRetypePassword("");
        setIsSubmitting(false);
        setError("");
        setSuccess("Password Changed Successfully");
      })
      .catch(err => {
        setIsSubmitting(false);
        setError("Invalid Token or User id");
        setSuccess("");
      })
    }
  }

  return (
    <div className="Login" style={{textAlign: "center"}}>
      <div style={{backgroundColor: "white", marginLeft: "20px", marginRight: "20px", marginTop: "10px"}} className="ma2 pa5 dib shadow-4">
        <div style={{textAlign: "center"}}>
            <h1 style={{textAlign: "center", color, marginBottom: "0px"}} className="name">Culapp</h1>
            <img src={logo} alt="logo" width="100" style={{marginLeft: "auto", marginRight: "auto"}}/>
        </div>
        <br/>
        <h3 style={{textAlign: "center", color, fontWeight: "bold"}}>Change Password</h3>
        <form onSubmit={handleSubmit}>
            {
              error.length > 0 &&
              <Alert variant="danger" style={{fontSize: "12px"}}>
                  {error}
              </Alert>
            }
            {
              success.length > 0 && 
              <Alert variant="success" style={{fontSize: "12px"}}>
                  {success}
              </Alert>
            }
            <FormGroup controlId="password" bssize="large" style={{textAlign: "left"}}>
                <FormLabel>Password</FormLabel>
                <FormControl
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value);
                      setError("");
                      setSuccess("");
                    }}
                    placeholder="New Password"
                    type="password"
                />
            </FormGroup>
            <FormGroup controlId="repassword" bssize="large" style={{textAlign: "left"}}>
                <FormLabel>Re-Enter Password</FormLabel>
                <FormControl
                    value={retypePassword}
                    onChange={e => {
                      setRetypePassword(e.target.value);
                      setError("");
                      setSuccess("");
                    }}
                    placeholder="Re-Enter New Password"
                    type="password"
                />
            </FormGroup>
            <Button block bssize="large" disabled={!validateForm() || isSubmitting} type="submit" style={{background: color, borderColor: color}} variant="dark">
                {!isSubmitting ? "Change Password" : "Loading..."}
            </Button>
        </form>
      </div>
    </div>
  );
}
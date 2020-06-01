import React, { Component } from "react";
import logo from "../../images/logo.png";
import Home from "./Home";
import Loading from "react-fullscreen-loading";
import "../../css/style.css";

export default class HomeStart extends Component {
  state = { flag: false };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ flag: true });
    }, 1000);
  }
  render() {
    if (this.state.flag) {
      return (
        <div>
          <div
            style={{
              textAlign: "center",
              paddingTop: "70px"
            }}
          >
            <img src={logo} alt="logo" width="100" />
            <br />
            <br />
            <div id="culapp" style={{ color: "#0add96", fontSize: "60px" }}>
              Culapp
            </div>
          </div>
          <Home />
        </div>
      );
    } else {
      return (
        <div>
          <Loading loading background="#0add96" loaderColor="white" />
        </div>
      );
    }
  }
}

import React, { Component } from "react";
import avatar from "../../images/avatar.jpeg";
import ReactTooltip from "react-tooltip";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import "../../css/style.css";

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="line"></div>
        <br />
        <br />
        <br />
        <ul className="navbar">
          <a
            href="mailto:name@gmail.com"
            style={{ textDecoration: "none", color: "black" }}
          >
            <li>Support</li>
          </a>
          <NavLink
            to="/terms"
            style={{
              textDecoration: "none",
              color: "black",
              marginLeft: "60px"
            }}
          >
            <li>Terms</li>
          </NavLink>
          <NavLink
            to="/privacy"
            style={{
              textDecoration: "none",
              color: "black",
              marginLeft: "60px"
            }}
          >
            <li>Privacy</li>
          </NavLink>
        </ul>
        <br />
        <br />
        <br />
        <div className="avatars">
          <ul>
            <li>
              <span
                ref={ref => (this.fooRef1 = ref)}
                data-tip
                data-for="tooltip1"
                style={{
                  position: "absolute",
                  marginLeft: "23px"
                }}
              ></span>

              <ReactTooltip
                id="tooltip1"
                type="light"
                style={{ color: "black" }}
              >
                <span>CEO</span>
              </ReactTooltip>
              <Link to="initial">
                <img
                  src={avatar}
                  alt="avatar"
                  style={{ borderRadius: "50%", height: "45px" }}
                  onMouseOver={() => {
                    ReactTooltip.show(this.fooRef1);
                  }}
                  onMouseLeave={() => {
                    ReactTooltip.hide(this.fooRef1);
                  }}
                />
              </Link>
            </li>
            <li id="avatar-li">
              <span
                ref={ref => (this.fooRef2 = ref)}
                data-tip
                data-for="tooltip2"
                style={{
                  position: "absolute",
                  paddingRight: "46px"
                }}
              ></span>
              <ReactTooltip
                id="tooltip2"
                type="light"
                style={{ color: "black" }}
              >
                <span>Marketing</span>
              </ReactTooltip>
              <Link to="initial">
                <img
                  src={avatar}
                  alt="avatar"
                  style={{ borderRadius: "50%", height: "45px" }}
                  onMouseOver={() => {
                    ReactTooltip.show(this.fooRef2);
                  }}
                  onMouseLeave={() => {
                    ReactTooltip.hide(this.fooRef2);
                  }}
                />
              </Link>
            </li>
            {/* <li id="avatar-li">
              <span
                ref={ref => (this.fooRef3 = ref)}
                data-tip
                data-for="tooltip3"
                style={{
                  position: "absolute",
                  paddingRight: "46px"
                }}
              ></span>
              <ReactTooltip
                id="tooltip3"
                type="light"
                style={{ color: "black" }}
              >
                <span>Backend</span>
              </ReactTooltip>
              <Link to="initial">
                <img
                  src={avatar}
                  alt="avatar"
                  style={{ borderRadius: "50%", height: "45px" }}
                  onMouseOver={() => {
                    ReactTooltip.show(this.fooRef3);
                  }}
                  onMouseLeave={() => {
                    ReactTooltip.hide(this.fooRef3);
                  }}
                />
              </Link>
            </li> */}
            <li id="avatar-li">
              <span
                ref={ref => (this.fooRef4 = ref)}
                data-tip
                data-for="tooltip4"
                style={{
                  position: "absolute",
                  paddingRight: "46px"
                }}
              ></span>
              <ReactTooltip
                id="tooltip4"
                type="light"
                style={{ color: "black" }}
              >
                <span>Frontend</span>
              </ReactTooltip>
              <Link to="initial">
                <img
                  src={avatar}
                  alt="avatar"
                  style={{ borderRadius: "50%", height: "45px" }}
                  onMouseOver={() => {
                    ReactTooltip.show(this.fooRef4);
                  }}
                  onMouseLeave={() => {
                    ReactTooltip.hide(this.fooRef4);
                  }}
                />
              </Link>
            </li>
            <li id="avatar-li">
              <span
                ref={ref => (this.fooRef5 = ref)}
                data-tip
                data-for="tooltip5"
                style={{
                  position: "absolute",
                  paddingRight: "46px"
                }}
              ></span>
              <ReactTooltip
                id="tooltip5"
                type="light"
                style={{ color: "black" }}
              >
                <span>Backend</span>
              </ReactTooltip>
              <Link to="initial">
                <img
                  src={avatar}
                  alt="avatar"
                  style={{ borderRadius: "50%", height: "45px" }}
                  onMouseOver={() => {
                    ReactTooltip.show(this.fooRef5);
                  }}
                  onMouseLeave={() => {
                    ReactTooltip.hide(this.fooRef5);
                  }}
                />
              </Link>
            </li>
          </ul>
        </div>
        <br />
        <br />
        <br />
        <div className="copyrights" style={{ fontSize: "14px" }}>
          © CULAPP, 2020 Made in Paris & LA
        </div>
      </div>
    );
  }
}

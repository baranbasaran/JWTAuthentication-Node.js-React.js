import React, { Component } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

export default class Login extends Component {
  componentDidMount() {
    localStorage.removeItem("token"); //clear token in local storage
  }
  alert = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Wrong password or user name",
    });
  };
  submit = (e) => {
    e.preventDefault();
    const data = {
      username: this.username, //get data in the form
      password: this.password,
    };
    Axios.post("http://localhost:5000/login", data) //  We send http request and get jwttoken then push localstorage
      .then((res) => {
        localStorage.setItem("token", res.data.accessToken);
        this.props.history.push("/home");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.alert();
        }
      });
  };
  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3 style={{ color: "white" }}>Sign In</h3>

            <div className="form-group">
              <label style={{ color: "white" }}>User name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter user name"
                onChange={(e) => (this.username = e.target.value)}
              />
            </div>
            <div className="form-group">
              <label style={{ color: "white" }}>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => (this.password = e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-light btn-block"
              onClick={this.submit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

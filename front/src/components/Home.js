import React, { Component } from "react";
import Axios from "axios";
export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token") !== null) this.loadUser();  //check token in the localStorage, if it is true then fill data 
    else this.props.history.push("/");  
  }
  loadUser = () => {
    const token = localStorage.getItem("token");
    Axios.get("http://localhost:5000/users", {
      headers: { Authorization: `Bearer ${token}` },        // We send http request with headers then set state data
    }).then((res) => {
      this.setState({ user: res.data });
    });
  };
  fillData = () => {
    return this.state.user.map((data, index) => {
      return (
        <tr key={index}>
          <td>{index}</td>
          <td>{data.username}</td>
          <td>{data.age}</td>
          <td>{data.job}</td>
          <td>{data.status}</td>
        </tr>
      );
    });
  };
  render() {
    return (
      <div className="home-inner">
      <div className="home-wrapper">
        <table className="table table-hover table-striped"  >
          <thead className="thead">
            <tr>
              <th scope="col">#</th>
              <th scope="col">User Name</th>
              <th scope="col">Age</th>
              <th scope="col">Job</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>{this.fillData()}</tbody>
        </table>
      </div>
      </div>
    );
  }
}

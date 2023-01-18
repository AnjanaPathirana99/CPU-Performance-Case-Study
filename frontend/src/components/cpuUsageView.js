import React, { Component } from "react";
import axios from "axios";

class CpuUsageView extends Component {
  state = {};

  componentDidMount() {
    axios.get("http://localhost:3000/api/processes");
  }
  render() {
    return <h1>Hi</h1>;
  }
}

export default CpuUsageView;

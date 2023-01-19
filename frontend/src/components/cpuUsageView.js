import React, { Component } from "react";
import axios from "axios";

class CpuUsageView extends Component {
  state = {
    cpuProcesses: [],
  };

  async componentDidMount() {
    const { data: cpuProcesses } = await axios.get(
      "http://localhost:3000/api/processes"
    );
    this.setState({ cpuProcesses });
  }
  render() {
    return <h1>{[this.state.cpuProcesses]}</h1>;
  }
}

export default CpuUsageView;

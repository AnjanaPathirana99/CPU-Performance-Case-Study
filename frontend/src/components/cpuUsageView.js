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
    this.setState(cpuProcesses);
    console.log(cpuProcesses); //log
  }

  render() {
    const { length: count } = this.state.cpuProcesses;
    if (count === 0)
      return <p>There are no processes exceeding 50% of CPU memory</p>;
    return (
      <React.Fragment>
        <p>
          There are {this.state.cpuProcesses.length} processes exceeding 50% of
          CPU memory
        </p>
        <table className="cpuUsageViewTable">
          <thead>
            <tr>
              <th>Process</th>
              <th>CPU usage</th>
              <th>CPU Usage (%)</th>
            </tr>
          </thead>
          <tbody>
            {this.state.cpuProcesses.map((cpuProcess) => (
              <tr>
                <td>{cpuProcess.Name}</td>
                <td>{cpuProcess.WorkingSetSize}</td>
                <td>{cpuProcess.WorkingSetSize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default CpuUsageView;

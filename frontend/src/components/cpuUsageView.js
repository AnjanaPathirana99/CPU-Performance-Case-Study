import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

function CpuUsageTable() {
  const cpuUsagePercentageConstant = 2 ** 20;
  const [processes, setProcesses] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/processes")
      .then((res) => {
        setProcesses(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Fragment>
      <Table>
        <thead>
          <tr>
            <th>Process Name</th>
            <th>Memory Usage</th>
            <th>Memory Usage (%)</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((process) => (
            <tr key={process.ProcessId}>
              <td>{process.Name}</td>
              <td>{process.WorkingSetSize}</td>
              <td>{process.WorkingSetSize}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
}

export default CpuUsageTable;

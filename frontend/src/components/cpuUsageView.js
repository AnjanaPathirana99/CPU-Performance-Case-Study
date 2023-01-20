import React, { useState, useEffect } from "react";
import axios from "axios";

function ProcessTable() {
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
    <table>
      <thead>
        <tr>
          <th>Process Name</th>
          <th>Memory Usage</th>
        </tr>
      </thead>
      <tbody>
        {processes.map((process) => (
          <tr key={process.ProcessId}>
            <td>{process.Name}</td>
            <td>{process.WorkingSetSize}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProcessTable;

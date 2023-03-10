//Client's server
const express = require("express");
const cors = require("cors");
const wmi = require("node-wmi");
const io = require("socket.io-client");
const app = express();
const fiftyPercent = 0.5;

const socket = io.connect("http://localhost:3001"); //POrt number of the admin server

app.use(cors());

wmi.Query(
  {
    class: "Win32_Process",
    properties: ["ProcessId", "Name", "WorkingSetSize"],
  },
  function (error, processResults) {
    wmi.Query(
      {
        class: "Win32_ComputerSystem",
        properties: ["TotalPhysicalMemory"],
      },
      function (error, osResults) {
        var totalMemory = osResults[0].TotalPhysicalMemory;
        var memoryThreshold = totalMemory * fiftyPercent * 0.02; //development purpose made this 0.01
        var highMemoryProcesses = processResults.filter(function (p) {
          return p.WorkingSetSize > memoryThreshold;
        });
        socket.emit("çpu_usage", highMemoryProcesses);
      }
    );
  }
);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

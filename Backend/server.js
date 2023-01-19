const express = require("express");
const wmi = require("node-wmi");
const app = express();
const fiftyPercent = 0.5;

app.get("/api/processes", (req, res) => {
  wmi.Query(
    {
      class: "Win32_Process",
      properties: ["Name", "WorkingSetSize"],
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
          res.json(highMemoryProcesses);
        }
      );
    }
  );
});

//Access control allow origin
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

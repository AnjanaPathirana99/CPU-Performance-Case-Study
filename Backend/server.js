const express = require("express");
const wmi = require("node-wmi");
const app = express();
const fiftyPercent = 0.5;

app.get("/processes", (req, res) => {
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
          var memoryThreshold = totalMemory * fiftyPercent;
          var highMemoryProcesses = processResults.filter(function (p) {
            return p.WorkingSetSize > memoryThreshold;
          });
          res.json(highMemoryProcesses);
        }
      );
    }
  );
});
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
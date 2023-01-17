const express = require("express");
const wmi = require("node-wmi");

const app = express();

app.get("/processes", (req, res) => {
  wmi.Query(
    {
      class: "Win32_Process",
      properties: ["Name", "WorkingSetSize"],
    },
    function (error, result) {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(result);
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

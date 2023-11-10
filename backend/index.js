const express = require("express");
const cors = require("cors");
const fs = require("fs");
const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};
const port = 1234;
const app = express();
app.use(express.static("public"));
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  const fileContent = fs.readFileSync("./places.json");
  const data = JSON.parse(fileContent.toString());
  data.forEach((item, i) => {
    item.id = i + 1;
  });
  res.send(data);
});

app.listen(port);

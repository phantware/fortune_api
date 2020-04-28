const express = require("express");

const app = express();
const fortunes = require("./data/fortunes.json");
const port = 8089;

app.get("/fortunes", (req, res) => {
  res.status(200).send(fortunes);
});
app.listen(port, () => {
  console.log(`App listening at ${port}....`);
});

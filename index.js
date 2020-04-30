const express = require("express");
const app = express();
const fortunes = require("./data/fortunes.json");
const fs = require("fs");

const port = 8089;
app.use(express.json());

app.get("/fortunes", (req, res) => {
  res.status(200).send(fortunes);
});

app.get("/fortunes/random", (req, res) => {
  res.status(200).send(fortunes[Math.floor(Math.random() * fortunes.length)]);
});

app.get("/fortunes/:id", (req, res) => {
  const items = req.params.id;
  res.status(200).send(fortunes.find((f) => f.id == items));
});

app.post("/fortunes", (req, res) => {
  const { message, lucky_number, spirit_animal } = req.body;
  const newId = fortunes.map((f) => f.id);
  const fortune = {
    id: (newId.length > 0 ? Math.max(...newId) : 0) + 1,
    message,
    lucky_number,
    spirit_animal,
  };
  const newFortunes = fortunes.concat(fortune);
  fs.writeFile(
    "./data/fortunes.json",
    JSON.stringify(newFortunes, null, 2),
    (error) => console.log(error)
  );
  res.send(newFortunes);
});

app.listen(port, () => {
  console.log(`App listening at ${port}....`);
});

const express = require("express");
const app = express();
const fortunes = require("./data/fortunes.json");
const fs = require("fs");

const port = 8089;
app.use(express.json());
const writeFile = (json) => {
  fs.writeFile("./data/fortunes.json", JSON.stringify(json, null, 2), (error) =>
    console.log(error)
  );
};
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
  writeFile(newFortunes);
  res.send(newFortunes);
});

app.put("/fortunes/:id", (req, res) => {
  const { id } = req.params;
  const old_fortune = fortunes.find((f) => f.id == id);
  ["message", "lucky_number", "spirit_animal"].forEach((key) => {
    if (req.body[key]) old_fortune[key] = req.body[key];
  });
  writeFile(fortunes);
  res.send(fortunes);
});

app.listen(port, () => {
  console.log(`App listening at ${port}....`);
});

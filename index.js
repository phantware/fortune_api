const express = require("express");

const app = express();
const fortunes = require("./data/fortunes.json");
const port = 8089;

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

app.listen(port, () => {
  console.log(`App listening at ${port}....`);
});

// const array = [{ id: 1 }, { id: 2 }, { id: 3 }];
// const findArray = array.find((items) => {
//   return items.id === 2;
// });
// console.log(findArray);

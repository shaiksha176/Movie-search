const express = require("express");
require("dotenv").config();
const app = express();
app.set("view engine", "ejs");
const api = process.env.API_KEY;

app.use(express.static("views"));
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.render("movie", { api });
});

app.listen(PORT, () => console.log(`server is running at port ${PORT}`));

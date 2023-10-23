require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors");

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const mainRouter = require("./routes/main");
app.use("/", mainRouter);

app.listen(PORT, () => console.log("Server listening on port:", PORT));

import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import csrf from "csurf";
import cookieParser from "cookie-parser";
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

const csrfProtection = csrf({ cookie: true });

const app = express();

//db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("db connection err =>", err));

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

//route
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

app.use(csrfProtection);
app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port, ${port}`));

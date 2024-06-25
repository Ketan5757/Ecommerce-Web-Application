const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();
app.use(express.json()); 

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use("/", require("./routes/index"));
app.use('/auth', require('./routes/authRoutes'));

app.use(notFound);
app.use(errorHandler);

module.exports = app;

const app = require("./server.js");
const http = require("http");
const PORT = process.env.PORT || 5000;
const dbConnect = require("./config/db.js");
const mongoose = require("mongoose");

// Connect to DB
mongoose.set("strictQuery", true);
dbConnect();

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
    console.log("Error Connecting to MongoDB");
    console.log(err);
    logEvents(
        `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
        "mongoErrLog.log"
    );
});

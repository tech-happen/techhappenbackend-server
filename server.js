require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const corsOption = require("./config/corsOption");
const { errorHandler } = require("./middleware/errormiddleware");
const connectDB = require("./config/db");
const logger = require("./utils/logger");
const chalk = require("chalk")

const app = express();

const port = process.env.PORT || 4040;

// Logger
app.use(morgan("tiny", { stream: logger.stream }));
app.use(
    morgan(
        ":date[iso] - :method :url :status :res[content-length] - :response-time ms"
    )
);
// app.use(requestIp.mw());

// Database connection
connectDB();

// Middleware
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//authorizations endpoint
app.set("trust proxy", true);
app.use((req, res, next) => {
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    // Add the 'Authorization' header to the list of exposed headers
    res.append("Access-Control-Expose-Headers", "Authorization");
    next();
});
app.get("/", (req, res) => {
    res.send("welcome to the default route, if you get this message then it means you have probably set it u, doesnt mean you wont further experience challenge");
});
app.use("/api/v1/waitingist", require("./Routes/waitinglist"));
// app.use("app/v1/authenticate", require("./Routes/user"))
app.use(errorHandler);

app.listen(port, () => {
    console.log(chalk.blue.underline(`Server running on port ${port}`));
    logger.info(`Server running on port ${port}`);
});
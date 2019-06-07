"use strict";

const path = require("path");

const express = require("express");
const app = express();
const subtitles = require("./routes/subtitles.js");
const {port: devPort} = require("./configs.json")

const port = process.env.port || devPort;

// =========================================== Routes =========================================== \\
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../common")));
app.use("/subtitles", subtitles);

// =========================================== Errors =========================================== \\
app.use((req, res) => {
    return res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    return res.status(500).send("Something broke!");
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));

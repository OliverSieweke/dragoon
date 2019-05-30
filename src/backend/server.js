"use strict";

const path = require("path")
const express = require("express");
const app = express();

const port = process.env.port || 8080;


app.use(express.static(path.join(__dirname, "../public")));


app.post("/subtitles", (req, res, next) => {
    // TODO: add conversion logic and finish with download here (use express-zip if multiple selected)
});

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));



// if (res.headersSent) {
//     return next(err)
// }

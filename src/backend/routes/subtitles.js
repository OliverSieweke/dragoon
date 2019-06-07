"use strict";

const path = require("path");
const { inspect } = require("util");

const express = require("express");
const zip = require("express-zip");
const router = express.Router(); /* eslint-disable-line new-cap */
const multer = require("multer");

const { formatPromise } = require("../lib/format-promise.js");

const { buildPowerPoint } = require("../lib/build-powerpoint.js");
const { ZIPPED_DOWNLOAD_FILE_NAME } = require("../settings/download-settings.js");

module.exports = router;

// ======================================= Multer Configs ======================================= \\
const dest = path.join(__dirname, "../documents/uploads/");

function fileFilter(req, file, callback) {
    const { mimetype, originalname } = file;

    if (mimetype !== "text/plain") {
        console.error(`fileFilter(): Invalid mimetype ${mimetype} for file ${originalname}. "text/plain" expected.`);
        req.fileValidationError = [415, new Error("The uploaded file should be a .txt file")]; /* eslint-disable-line no-param-reassign */
        return callback(null, false);
    }
    return callback(null, true);
}

const upload = multer({ fileFilter, dest });


// ========================================= POST Route ========================================= \\
router.post("/", upload.single("subtitles"), async (req, res, next) => {
// I) Handle Missing File or Invalid Format --------------------------------------------------------
    const { file, fileValidationError, body: options } = req;

    if (fileValidationError) {
        const [code, error] = fileValidationError;
        console.error("POST /subtitles: File validation error.");
        return res.status(code).send(error.message);
    } else if (!file) {
        console.error("POST /subtitles: Invalid request: no file was found.");
        return res.status(400).send("The request should contain a .txt file");
    }

    const { filename, originalname, path: absolutePath } = file;

    const [err, filesToDownload] = await formatPromise(buildPowerPoint({
        filename,
        absolutePath,
        originalname,
    }, options));

    if (err) {
        console.error("POST /subtitles: Error in building PowerPoint.", err.stack);
        return next(err); // Internal Server Error
    }

    if (!filesToDownload.length) {
        console.error(`POST /subtitles: Finished conversion for file ${absolutePath} without any finding any files to download.`);
        return next(err); // Internal Server Error
    } else if (filesToDownload.length === 1) {
        const [fileToDownload] = filesToDownload;
        return res.download(fileToDownload.path, fileToDownload.name, err => { /* eslint-disable-line consistent-return */
            if (err) {
                console.error(`POST /subtitles: Error in responding with file download for file:\n${inspect(fileToDownload)}\n${err.stack}`);
                return next(err);  // Internal Server Error
            }
        });
    } else {
        return res.zip(filesToDownload, ZIPPED_DOWNLOAD_FILE_NAME, err => { /* eslint-disable-line consistent-return */
            if (err) {
                console.error(`POST /subtitles: Error in responding with download zip for files:\n${inspect(filesToDownload)}\n${err.stack}`);
                return next(err); // Internal Server Error
            }
        });
    }
});

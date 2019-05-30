"use strict";

const { readFile, writeFile } = require("fs");

module.exports = {
    readFile: readFilePromisified,
    writeFile: writeFilePromisified,
};

function readFilePromisified(path, options = {}) {
    return new Promise((resolve, reject) => {
        readFile(
            path,
            options,
            (err, result) => (err ? reject(err) : resolve(result)),
        );
    });
}

function writeFilePromisified(file, data, options = {}) {
    return new Promise((resolve, reject) => {
        writeFile(
            file,
            data,
            options,
            (err, result) => (err ? reject(err) : resolve(result)),
        );
    });
}

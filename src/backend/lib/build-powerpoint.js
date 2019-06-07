"use strict";

const { readFile } = require("../lib/fs-promise.js");
const { formatPromise } = require("../lib/format-promise.js");

const { determineDocumentType } = require("../lib/determine-document-type.js");
const { documentTypeToConverterPipeMap } = require("../converters/document-type-to-converter-pipe.js");
const { complementWithDefaultOptions } = require("../utils/complement-with-default-options.js");


module.exports = { buildPowerPoint };

// ============================================================================================== \\
async function buildPowerPoint({ filename, absolutePath, originalname }, userOptions) {
    const options = complementWithDefaultOptions(userOptions);

    const filesToDownload = [];
    let err, result, content, fileToDownload;

    [err, content] = await formatPromise(readFile(absolutePath, "utf8"));

    if (err) {
        console.error(`buildPowerPoint(): Error in reading file ${absolutePath}:\n${err.stack}`);
        throw err;
    }

    const documentType = determineDocumentType(content);
    const converterPipe = documentTypeToConverterPipeMap(options).get(documentType);

    for (const step of converterPipe) {
        /* eslint-disable-next-line no-await-in-loop */ // The steps need to happen in sequence
        [err, result] = await formatPromise(step(filename, originalname, content, options));

        if (err) {
            console.error(`buildPowerPoint(): Error in performing conversion for file ${absolutePath}`);
            throw err;
        }

        ({ content, fileToDownload } = result);

        fileToDownload && filesToDownload.push(fileToDownload);
    }

    return filesToDownload;
}

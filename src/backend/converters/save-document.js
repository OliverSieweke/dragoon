"use strict";

const path = require("path");
const PptxGenJS = require("pptxgenjs");

const { writeFile } = require("../lib/fs-promise.js");
const { formatPromise } = require("../lib/format-promise.js");

const { savePowerpoint } = require("../utils/pptxgenjs-utils.js");
const { documentTypeToExtensionMap } = require("../settings/document-type-to-extension-map.js");


module.exports = { saveDocumentAs };

// ============================================================================================== \\
function saveDocumentAs(documentType) {
    return async function saveDocument(filename, originalname, content) {
        let err;
        const documentTypeFolder = `${documentType.toLocaleLowerCase().replace("_", "-")}s`;
        const extension = documentTypeToExtensionMap.get(documentType);
        const absolutePath = path.join(__dirname, "../documents", documentTypeFolder, `${filename}.${extension}`);
        const downloadFilename = originalname.replace(/txt$/u, documentTypeToExtensionMap.get(documentType));

        if (content instanceof PptxGenJS) {
            [err] = await formatPromise(savePowerpoint(content, absolutePath)); // This will never lead to an error, as the pptxgenjs library does not provide an error argument in its callback.
        } else {
            [err] = await formatPromise(writeFile(absolutePath, content));
        }

        if (err) {
            console.error(`saveDocument: Error in writing file to ${absolutePath}:\n${err.stack}`);
            throw err;
        }

        return { content, fileToDownload: { path: absolutePath, name: downloadFilename }};
    };
}

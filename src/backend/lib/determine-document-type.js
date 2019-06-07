"use strict";

const { PLAIN_TEXT, DOUBLE_ANNOTATED_TEXT, ANNOTATED_TEXT, STRUCTURED_TEXT } = require("../settings/document-types.js");

module.exports = { determineDocumentType };

function determineDocumentType(content) {
    if (content.match(/(?<!\\)\{1/u)) { // Check if there is any non-escaped "{"
        return DOUBLE_ANNOTATED_TEXT;
    } else if (content.match(/(?<!\\)\{/u)) { // Check if there is any non-escaped "{"
        return ANNOTATED_TEXT;
    } else if (content.match(/(?<!\\)#/u)) { // Check if there is any non-escaped "#"
        return STRUCTURED_TEXT;
    } else {
        return PLAIN_TEXT;
    }
}

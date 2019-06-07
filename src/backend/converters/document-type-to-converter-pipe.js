"use strict";

const { convertStructuredTextToPowerpoint } = require("./structured-text-to-powerpoint.js");
const { convertPlainTextToAnnotatedText } = require("./plain-text-to-structured-text.js");
const { convertAnnotatedTextToStructuredText } = require("./annotated-text-to-structured-text.js");
const { convertDoubleAnnotatedTextToStructuredText } = require("./double-annotated-text-to-structured-text.js");
const { saveDocumentAs } = require("./save-document.js");
const { PLAIN_TEXT, DOUBLE_ANNOTATED_TEXT, ANNOTATED_TEXT, STRUCTURED_TEXT, POWER_POINT } = require(
    "../settings/document-types.js");

module.exports = {
    documentTypeToConverterPipeMap({ getStructuredText = false }) {
        return new Map([
            [
                PLAIN_TEXT,
                [
                    convertPlainTextToAnnotatedText,
                    convertAnnotatedTextToStructuredText,
                    ...getStructuredText ? [saveDocumentAs(STRUCTURED_TEXT)] : [],
                    convertStructuredTextToPowerpoint,
                    saveDocumentAs(POWER_POINT),
                ],
            ],
            [
                DOUBLE_ANNOTATED_TEXT,
                [
                    convertDoubleAnnotatedTextToStructuredText,
                    ...getStructuredText ? [saveDocumentAs(STRUCTURED_TEXT)] : [],
                    convertStructuredTextToPowerpoint,
                    saveDocumentAs(POWER_POINT),
                ],
            ],
            [
                ANNOTATED_TEXT,
                [
                    convertAnnotatedTextToStructuredText,
                    ...getStructuredText ? [saveDocumentAs(STRUCTURED_TEXT)] : [],
                    convertStructuredTextToPowerpoint,
                    saveDocumentAs(POWER_POINT),
                ],
            ],
            [
                STRUCTURED_TEXT,
                [
                    convertStructuredTextToPowerpoint,
                    saveDocumentAs(POWER_POINT),
                ],
            ],
        ]);
    },
};

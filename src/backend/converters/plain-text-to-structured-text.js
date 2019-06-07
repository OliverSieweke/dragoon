"use strict";

const { ANNOTATED_TEXT_START, ANNOTATED_TEXT_END } = require("../settings/parsing-settings.js");

module.exports = { convertPlainTextToAnnotatedText };

// ============================================================================================== \\
function convertPlainTextToAnnotatedText(filename, originalname, plainText) {
    return { content: `${ANNOTATED_TEXT_START}${plainText}${ANNOTATED_TEXT_END}` };
}

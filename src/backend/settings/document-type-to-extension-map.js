"use strict";

const { STRUCTURED_TEXT, POWER_POINT } = require("../settings/document-types.js");

module.exports = {
    documentTypeToExtensionMap: new Map([
        [STRUCTURED_TEXT, "txt"],
        [POWER_POINT, "pptx"],
    ]),
};

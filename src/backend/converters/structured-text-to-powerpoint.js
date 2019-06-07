"use strict";

const { harmonizeLineSeparators } = require("../lib/text-formatting-utils.js");
const { createPowerpoint, createSlide } = require("../utils/pptxgenjs-utils.js");
const { SLIDE_SEPARATOR } = require("../settings/parsing-settings.js");

module.exports = { convertStructuredTextToPowerpoint };

// ============================================================================================== \\
function convertStructuredTextToPowerpoint(filename, originalname, structuredText, options) {
// I) Extract Slides -------------------------------------------------------------------------------
    const harmonizedStructuredText = harmonizeLineSeparators(structuredText);
    const firstOrLastEmptySlideMarkerRegexp = new RegExp(
        `(^${SLIDE_SEPARATOR}${SLIDE_SEPARATOR})|(${SLIDE_SEPARATOR}${SLIDE_SEPARATOR}$)`,
        "ug",
    );
    const slideTexts = harmonizedStructuredText
        .replace(firstOrLastEmptySlideMarkerRegexp, SLIDE_SEPARATOR)// This is to prevent multiple empty slides at the very begin or end
        .split(SLIDE_SEPARATOR)
        .map(slideText => slideText.trim());

// III) Build Powerpoint ---------------------------------------------------------------------------
    const pptx = createPowerpoint(options);

    for (const slideText of slideTexts) {
        const slideText1 = slideText.match(/.+(?=\n&)/u) && slideText.match(/.+(?=\n&)/u)[0] || slideText;
        const slideText2 = slideText.match(/(?<=&\n).+/u) && slideText.match(/(?<=&\n).+/u)[0] || "";
        createSlide(pptx, [slideText1, slideText2], options);
    }

    return { content: pptx };
}

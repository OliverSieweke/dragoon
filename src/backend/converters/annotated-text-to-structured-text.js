"use strict";

const { harmonizeLineSeparators } = require("../lib/text-formatting-utils.js");
const { extractSlides } = require("../lib/slide-construction-utils.js"); // TODO: move to text-formatting utils
const { SLIDE_SEPARATOR, ANNOTATED_TEXT_START_REGEXP, ANNOTATED_TEXT_END_REGEXP } = require("../settings/parsing-settings.js");


module.exports = { convertAnnotatedTextToStructuredText };


function convertAnnotatedTextToStructuredText(filename, originalname, annotatedText, options) {
// I) Extract Slides -------------------------------------------------------------------------------
    const harmonizedAnnotatedText = harmonizeLineSeparators(annotatedText);

    const chunks = getChunks(harmonizedAnnotatedText);

    const slides = chunks.reduce((accumulator, chunk) => [...accumulator, ...extractSlides(chunk)], []);

// II) Convert to structured text ------------------------------------------------------------------
    const structuredText = slides.reduce((accumulator, slide) => {
        if (slide) {
            return `${accumulator}\n${slide}\n${SLIDE_SEPARATOR}`;
        } else {
            return `${accumulator}${SLIDE_SEPARATOR}`;
        }
    }, "");

    return { content: structuredText };
}


function getChunks(text) {
    const translatedTextRegexp = new RegExp(
        `(?<=${ANNOTATED_TEXT_START_REGEXP})[^]*?(?=${ANNOTATED_TEXT_END_REGEXP})`,
        "gu",
    );
    const translatedTexts = text.match(translatedTextRegexp);

    const chunks = translatedTexts.reduce((accumulator, translatedText) => [
        ...accumulator,
        ...translatedText.split("\n"),
    ], []);

    return chunks;
}

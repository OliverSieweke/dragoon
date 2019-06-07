"use strict";

const { harmonizeLineSeparators } = require("../lib/text-formatting-utils.js");
const { extractSlides } = require("../lib/slide-construction-utils.js"); // TODO: move to text-formatting utils
const { SLIDE_SEPARATOR, DOUBLE_ANNOTATED_TEXT1_START_REGEXP, DOUBLE_ANNOTATED_TEXT1_END_REGEXP, DOUBLE_ANNOTATED_TEXT2_START_REGEXP, DOUBLE_ANNOTATED_TEXT2_END_REGEXP } = require(
    "../settings/parsing-settings.js");


module.exports = { convertDoubleAnnotatedTextToStructuredText };


function convertDoubleAnnotatedTextToStructuredText(filename, originalname, annotatedText, options) {
// I) Extract Slides -------------------------------------------------------------------------------
    const harmonizedAnnotatedText = harmonizeLineSeparators(annotatedText);
    const [chunks1, chunks2] = getChunks(harmonizedAnnotatedText);

    // TODO: warning if not same length

    // TODO: divide into major chunks


    const slidesTranslation1 = chunks1.reduce((accumulator, chunk) => [...accumulator, ...extractSlides(chunk)], []);
    const slidesTranslation2 = chunks2.reduce((accumulator, chunk) => [...accumulator, ...extractSlides(chunk)], []);


// II) Convert to structured text ------------------------------------------------------------------
    let structuredText = "";
    for (let i = 0; i < Math.max(slidesTranslation1.length, slidesTranslation2.length); i++) {
        if (slidesTranslation1[i] || slidesTranslation2[i]) {
            structuredText += `\n${`${slidesTranslation1[i]}\n` || ""}&\n${`${slidesTranslation2[i]}\n` || ""}\n${SLIDE_SEPARATOR}`;
        } else {
            structuredText += SLIDE_SEPARATOR
        }
    }

    return { content: structuredText };
}


function getChunks(text) {
    const translatedTextRegexp1 = new RegExp(
        `(?<=${DOUBLE_ANNOTATED_TEXT1_START_REGEXP})[^]*?(?=${DOUBLE_ANNOTATED_TEXT1_END_REGEXP})`,
        "gu",
    );
    const translatedTextRegexp2 = new RegExp(
        `(?<=${DOUBLE_ANNOTATED_TEXT2_START_REGEXP})[^]*?(?=${DOUBLE_ANNOTATED_TEXT2_END_REGEXP})`,
        "gu",
    );

    const translatedTexts1 = text.match(translatedTextRegexp1);
    const translatedTexts2 = text.match(translatedTextRegexp2);

    const chunks1 = translatedTexts1.reduce((accumulator, translatedText) => [
        ...accumulator,
        ...translatedText.split("\n"),
    ], []);

    const chunks2 = translatedTexts2.reduce((accumulator, translatedText) => [
        ...accumulator,
        ...translatedText.split("\n"),
    ], []);

    return [chunks1, chunks2];
}

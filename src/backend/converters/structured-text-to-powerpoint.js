"use strict";

module.exports = { convertStructuredTextToPowerpoint };

const path = require("path");
const { readFile } = require("../lib/fsPromises.js");
const { formatPromiseResult } = require("../lib/formatPromiseResult.js");
const { harmonizeLineSeparators } = require("../lib/text-formatting-utils.js");
const { createPowerpoint, createSlide, savePowerpoint } = require("../lib/powerpoint-builder-utils.js");
const { SLIDE_SEPARATOR } = require("../settings/parsing-settings.js");


/**
 * Converts a structured text file into a powerpoint file (one slide separator marks a new slide, two slide separators mark an empty slide).
 *
 * @param   {string}        relativePath        Relative path to the structured text file (taking /documents/structured-texts as the root)
 * @param   {object}        options             Options object containing option fields as accepted by the PptxGenJs defineSlideMaster() and addText() methods
 *                                                  • https://gitbrent.github.io/PptxGenJS/docs/masters.html
 *                                                  • https://gitbrent.github.io/PptxGenJS/docs/api-text.html
 * @return  {undefined}                         The generated powerpoint is automatically saved to the /documents/powerpoints directory.
 */
async function convertStructuredTextToPowerpoint(relativePath, options) {
// I) Read File ------------------------------------------------------------------------------------
    const absolutePath = path.join(
        __dirname,
        "../documents/structured-texts",
        relativePath,
    );

    const [err, structuredText] = await formatPromiseResult(
        readFile(absolutePath, "utf8"),
    );

    if (err) {
        console.error(`Error in reading structured text file ${absolutePath}:\n${err.stack}`);
    }

// II) Extract Slides ------------------------------------------------------------------------------
    const harmonizedStructuredText = harmonizeLineSeparators(structuredText);
    const slideTexts = harmonizedStructuredText
        .split(SLIDE_SEPARATOR)
        .map(slideText => slideText.trim());

// III) Build Powerpoint ---------------------------------------------------------------------------
    const pptx = createPowerpoint(options);

    for (const slideText of slideTexts) {
        createSlide(pptx, slideText, options);
    }

    savePowerpoint(pptx, relativePath.replace(/\.[^/\.]+$/u, ""));
}

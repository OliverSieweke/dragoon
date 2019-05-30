"use strict";

module.exports = { convertAnnotatedTextToStructuredText };

const path = require("path");
const { readFile, writeFile } = require("../lib/fsPromises.js");
const { formatPromiseResult } = require("../lib/formatPromiseResult.js");
const { harmonizeLineSeparators } = require("../lib/text-formatting-utils.js");
const DEFAULT_OPTIONS = require("../settings/default-options.js");
const { extractSlides } = require("../lib/slide-construction-utils.js");


async function convertAnnotatedTextToStructuredText(relativePath, options) {
    let err, annotatedText;
// I) Read File ------------------------------------------------------------------------------------
    const absolutePath = path.join(
        __dirname,
        "../documents/annotated-texts",
        relativePath,
    );

    [err, annotatedText] = await formatPromiseResult(
        readFile(absolutePath, "utf8"),
    );

    if (err) {
        console.error(`Error in reading annotated text file ${absolutePath}:\n${err.stack}`);
    }

// II) Extract Slides ------------------------------------------------------------------------------
    const harmonizedAnnotatedText = harmonizeLineSeparators(annotatedText);

    const chunks = getChunks(harmonizedAnnotatedText);

    const slides = chunks.reduce((accumulator, chunk) => {
        const slides = extractSlides(chunk, 47, 2);

        return [...accumulator, ...slides];

    }, []);


    console.log(slides);

// III) Convert to structured text -----------------------------------------------------------------
    const structuredText = slides.reduce((accumulator, slide) => {
        if (slide) {
            return `${accumulator}${slide}\n#\n`;
        } else {
            return `${accumulator}\n##"\n`;
        }
    }, "");

    [err] = await formatPromiseResult(
        writeFile(path.join(
            __dirname,
            "../documents/structured-texts",
            relativePath,
        ), structuredText),
    );

    if (err) {
        console.error(`Error in writing structured text file ${absolutePath}:\n${err.stack}`);
    }


}


function getChunks(text) {
    const translatedTexts = text.match(/(?<=\{)[^]*?(?=\})/gu);

    const chunks = translatedTexts.reduce((accumulator, translatedText) => {
        return [...accumulator, ...translatedText.split("\n")];
    }, []);

    return chunks;
}

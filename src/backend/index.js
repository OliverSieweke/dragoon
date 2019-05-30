"use strict";

const { convertStructuredTextToPowerpoint } = require("./converters/structured-text-to-powerpoint.js");
const { convertAnnotatedTextToStructuredText } = require("./converters/annotated-text-to-structured-text.js");
const path = require("path");
const { readFileSync, writeFileSync } = require("fs");
const DEFAULT_OPTIONS = require("./settings/default-options.js");
const { extractSlides } = require("./lib/slide-construction-utils.js");

const options = {};


const testText = readFileSync("./documents/plain-texts/tests/test.txt", "utf8");

// extractSlides(testText, 47, 2);

// convertStructuredTextToPowerpoint(path.join("tests", "test.txt"));
convertAnnotatedTextToStructuredText(path.join("tests", "testt.txt"), { ...DEFAULT_OPTIONS, ...options });

// const converter = require("office-converter")();
//
// converter.generatePdf("./documents/powerpoints/tests/test.pptx", (err, result) => {
//     // Process result if no error
//
//     if (err) {
//         console.log(err);
//     }
//     if (result.status === 0) {
//         console.log(`Output File located at ${result.outputFile}`);
//     }
// });

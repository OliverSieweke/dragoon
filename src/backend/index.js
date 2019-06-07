"use strict";

const path = require("path")

const {readFileSync} = require("fs");
const {extractSlides} = require("./lib/slide-construction-utils.js", )


const annotatedText = readFileSync(path.join(__dirname, "/documents/annotated-texts/tests/MY_TEST.txt"), "utf8");

const slides = extractSlides(annotatedText)

console.log(slides.map( slide => [slide.length, slide]))

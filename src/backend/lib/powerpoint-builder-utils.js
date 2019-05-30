"use strict";

const path = require("path");
const PptxGenJS = require("pptxgenjs");
const DEFAULT_OPTIONS = require("../settings/default-options.js");
const MASTER_SLIDE = "MASTER_SLIDE";

module.exports = {
    createPowerpoint,
    createSlide,
    savePowerpoint,
};


function createPowerpoint(options = {}) {
    const { layout } = options;

    const pptx = new PptxGenJS();

    pptx.setLayout(layout || DEFAULT_OPTIONS.layout);
    pptx.defineSlideMaster({ title: MASTER_SLIDE, ...DEFAULT_OPTIONS, ...options });

    return pptx;
}

function createSlide(pptx, text = "", options = {}) {
    const slide = pptx.addNewSlide(MASTER_SLIDE);

    slide.addText(text, { ...DEFAULT_OPTIONS, ...options });
}

function savePowerpoint(pptx, relativePath) {
    return new Promise((resolve) => { // The API does note provide an error-first callback.
        pptx.save(path.join(__dirname, "../documents/powerpoints", relativePath), file => resolve(file));
    });
}

"use strict";

const PptxGenJS = require("pptxgenjs");
const MASTER_SLIDE = "MASTER_SLIDE";

const { formatTextOptions } = require("../utils/complement-with-default-options.js");

module.exports = {
    createPowerpoint,
    createSlide,
    savePowerpoint,
};

// ============================================================================================== \\
function createPowerpoint(options = {}) {
    const { layout } = options;
    const pptx = new PptxGenJS();

    pptx.setLayout(layout);
    pptx.defineSlideMaster({ title: MASTER_SLIDE, ...options });

    return pptx;
}

function createSlide(pptx, text = [""], options = {}) {
    const slide = pptx.addNewSlide(MASTER_SLIDE);

    const [optionsText1, optionsText2] = formatTextOptions(options);

    slide.addText(text[0] || "", { ...options, ...optionsText1 });
    slide.addText(text[1] || "", { ...options, ...optionsText2 });
}

function savePowerpoint(pptx, absolutePath) {
    return new Promise(resolve => { // The API does note provide an error-first callback. Potential saving errors cannot be caught without changing the source code.
        pptx.save(absolutePath, file => resolve(file));
    });
}

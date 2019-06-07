"use strict";

const DEFAULT_OPTIONS = require("../../common/default-options.json");


module.exports = { complementWithDefaultOptions, formatTextOptions };

// ============================================================================================== \\
function complementWithDefaultOptions(userOptions) {
    const options = { ...DEFAULT_OPTIONS, ...userOptions };
    // The browser color picker expects a hex code with '#', while pptxgenjs expects a hex code without.
    options.bkgd = options.bkgd.replace("#", "");
    options.color1 = options.color1.replace("#", "");
    options.color2 = options.color2.replace("#", "");

    return options;
}

function formatTextOptions(options) {

    const optionsText1 = {
        color: options.color1,
        align: options.align1,
        valign: options.valign1,
        bold: options.bold1,
        italic: options.italic1,
        fontFace: options.fontFace1,
        fontSize: options.fontSize1,
        lineSpacing: options.lineSpacing1,
    };

    const optionsText2 = {
        color: options.color2,
        align: options.align2,
        valign: options.valign2,
        bold: options.bold2,
        italic: options.italic2,
        fontFace: options.fontFace2,
        fontSize: options.fontSize2,
        lineSpacing: options.lineSpacing2,
    };

    return [optionsText1, optionsText2];
}

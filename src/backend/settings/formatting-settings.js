"use strict";

const FORMATTING_SETTINGS = Object.create(null);

module.exports = Object.assign(FORMATTING_SETTINGS, {
    SYNTACTIC_DELIMITERS: [
        { character: ".", priority: 3 },
        { character: "!", priority: 3 },
        { character: "?", priority: 3 },
        { character: ";", priority: 2 },
        { character: ":", priority: 2 },
        { character: ",", priority: 1 },
        { character: "-", priority: 1 },
    ],
});

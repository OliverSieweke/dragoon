"use strict";

module.exports = { harmonizeLineSeparators };


function harmonizeLineSeparators(text) {
    return text.replace(/\r\n|\r/gu, "\n").trim();
}

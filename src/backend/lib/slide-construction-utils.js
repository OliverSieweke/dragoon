"use strict";

module.exports = { extractSlides };

const { minimumLengthOfSingleLine } = require("../settings/default-options.js");


function extractSlides(text, maxLineLength, maxNumberOfLinesPerSlide) {
    const majorSyntacticChunks = divideIntoMajorSyntacticChunks(text);

    const intermediateSyntacticChunks = majorSyntacticChunks.reduce((accumulator, majorChunk) => {
        if (majorChunk.length > maxLineLength*maxNumberOfLinesPerSlide) {
            const intermediateChunks = divideIntoIntermediateSyntacticChunks(majorChunk);

            return [...accumulator, ...intermediateChunks];
        }

        return [...accumulator, majorChunk];
    }, []);

    const minorSyntacticChunks = intermediateSyntacticChunks.reduce((accumulator, intermediateChunk) => {
        if (intermediateChunk.length > maxLineLength*maxNumberOfLinesPerSlide) {
            const minorChunk = divideIntoMinorSyntacticChunks(intermediateChunk);

            return [...accumulator, ...minorChunk];
        }

        return [...accumulator, intermediateChunk];
    }, []);

    const finalChunks = minorSyntacticChunks.reduce((accumulator, minorChunk) => {
        if (minorChunk.length > maxLineLength*maxNumberOfLinesPerSlide) {
            const finalChunk = divideIntoFinalSyntacticChunks(minorChunk);

            return [...accumulator, ...finalChunk];
        }

        return [...accumulator, minorChunk];
    }, []);

    // console.log(majorSyntacticChunks);
    // console.log(intermediateSyntacticChunks);
    // console.log(finalChunks.map(chunk => [chunk, chunk.length]));
    // Make custom line division here

    return finalChunks;

}

function divideIntoMajorSyntacticChunks(text) {
    const majorSyntacticChunks = text.match(/[^.!?:]+[.!?:]*/gu) || [text];

    return combineChunks(majorSyntacticChunks).map(chunk => chunk.trim());
}

function divideIntoIntermediateSyntacticChunks(text) {
    const intermediateSyntacticChunk = text.match(/[^;]+[;]*/gu) || [text];

    return combineChunks(intermediateSyntacticChunk).map(chunk => chunk.trim());
}

function divideIntoMinorSyntacticChunks(text) {
    const minorSyntacticChunk = text.match(/[^,-]+[,-]*/gu) || [text];

    return combineChunks(minorSyntacticChunk).map(chunk => chunk.trim());
}

function divideIntoFinalSyntacticChunks(text) {
    const words = text.match(/[^ ]+[ ]*/gu) || [text];

    return combineChunks(words).map(chunk => chunk.trim());
    // TODO: check for amazingly long word.
}

function combineChunks(chunks) {
    // Try to find best balance instead of just adding to previous (check what it means for words as well)
    const combinedChunks = chunks.reduce((accumulator, chunk, index) => {
        if (index === 0) {
            return [...accumulator, chunk];
        }

        const lengthWithPrevious = accumulator[accumulator.length - 1].length + chunk.length;

        if (lengthWithPrevious < 47*2) {
            accumulator[accumulator.length - 1] += chunk;

            return accumulator;
        }

        return [...accumulator, chunk];
    }, []);

    return combinedChunks;
}


//
// function extractSlides(text, maxLineLength, maxNumberOfLinesPerSlide) {
//     const maxSlideLength = maxLineLength*maxNumberOfLinesPerSlide;
//
//     let success;
//     let subText = text.slice(0, maxSlideLength + 1) // Take one more to recognize end of word
//
//     // while(!success) {
//     // }
//
//         const nextBestSyntacticUnit = findNextBestSyntacticUnit(subText);
//         // const slide = breakIntoLines(nextBestSyntacticUnit, maxLineLength);
//
//     slides.push(nextBestSyntacticUnit.trim()); // trim in case of space last punctuation
//
//     const newText = text.slice(nextBestSyntacticUnit.length).trim();
//
//     if (newText.length) {
//         extractSlides(newText, maxLineLength, maxNumberOfLinesPerSlide);
//     } else {
//         console.log(slides);
//     }
// }
//
//
// function findNextBestSyntacticUnit(text) {
//     const lastDot = text.lastIndexOf(".");
//     const lastInterrogation = text.lastIndexOf("?");
//     const lastExclamation = text.lastIndexOf("!");
//     const lastSemiColon = text.lastIndexOf(";");
//     const lastColon = text.lastIndexOf(",");
//     const lastDoubleQuotes = text.lastIndexOf("\"");
//     const lastDash = text.lastIndexOf("-");
//     const lastSpace = text.lastIndexOf(" ");
//
//     // TODO: if lastIndesOfSpace === -1 throw error?
//
//     const lastMajorPunctuation = Math.max(lastDot, lastInterrogation, lastExclamation);
//     const lastIntermediatePunctutation = Math.max(lastSemiColon, lastDoubleQuotes);
//     const lastMinorPunctuation = Math.max(lastColon, lastDash);
//
//     const breakPoint = lastMajorPunctuation > minimumLengthOfSingleLine ? lastMajorPunctuation :
//                        lastIntermediatePunctutation > minimumLengthOfSingleLine ? lastIntermediatePunctutation :
//                        lastMinorPunctuation > minimumLengthOfSingleLine ? lastMinorPunctuation :
//                        lastSpace;
//
//     return text.slice(0, breakPoint + 1);
// }
//
//
// function breakIntoLines(text, maxLineLength) {
//     const firstDot = text.indexOf(".");
//     const firstInterrogation = text.indexOf("?");
//     const firstExclamation = text.indexOf("!");
//     const firstSemiColon = text.indexOf(";");
//     const firstColon = text.indexOf(",");
//     const firstDoubleQuotes = text.indexOf("\"");
//     const firstDash = text.indexOf("-");
//     const firstSpace = text.indexOf(" ");
//
//     const firstMajorPunctuation = Math.max(lastDot, lastInterrogation, lastExclamation);
//     const firstIntermediatePunctutation = Math.max(lastSemiColon, lastDoubleQuotes);
//     const firstMinorPunctuation = Math.max(lastColon, lastDash);
// }

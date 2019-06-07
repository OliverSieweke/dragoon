"use strict";

module.exports = { extractSlides };

const { minimumLengthOfSingleLine } = require("../../common/default-options.json");


const { SYNTACTIC_DELIMITERS } = require("../settings/formatting-settings.js");

const MAX_NUMBER_OF_LINES_PER_SLIDE = 2;
const MAX_NUMBER_OF_CHARACTERS_PER_LINE = 47;


function extractSlides(text) {
    const qualifiedChunks = divideIntoSyntacticChunks(text);
    const slides = combineChunksIntoSlides(qualifiedChunks);

    return slides;
}

function divideIntoSyntacticChunks(text) {
    const syntacticCharacters = SYNTACTIC_DELIMITERS.map(delimiter => delimiter.character);
    const syntacticChunksRegexp = new RegExp(
        `[^${syntacticCharacters.join()}]+[${syntacticCharacters.join()}|$]*`,
        "gu",
    );
    const syntacticChunks = text.match(syntacticChunksRegexp) || [text];

    const qualifiedSyntacticChunks = syntacticChunks.map(chunk => {
        const chunkDelimiter = SYNTACTIC_DELIMITERS.find(delimiter => chunk[chunk.length - 1] === delimiter.character);
        const priority = (chunkDelimiter && chunkDelimiter.priority) || 0;
        return { chunk, priority };
    });

    return qualifiedSyntacticChunks;
}

function combineChunksIntoSlides(qualifiedChunks) {
    const firstPartialSlide = qualifiedChunks.splice(0, 1);
    const qualifiedSlides = qualifiedChunks.length ? addChunksRecursively(firstPartialSlide, qualifiedChunks) :
                            firstPartialSlide;

    return qualifiedSlides.map(qualifiedSlide => qualifiedSlide.chunk.trim());
}

function addChunksRecursively(slides, qualifiedChunks) {
    const { chunk: previousChunk, priority: previousPriority } = slides[slides.length - 1];

    const numberOfLineBreaks = (previousChunk.match("\n") && previousChunk.match("\n").length) || 0;
    const numberOfLines = numberOfLineBreaks + 1;
    const availableLines = MAX_NUMBER_OF_LINES_PER_SLIDE - numberOfLines;

    const lastLine = previousChunk.substring(previousChunk.lastIndexOf("\n"), previousChunk.length);

    let potentialAddition = "";

    // TODO: deal with no syntactic chunk and too long chunk;
    // Also min line or not?
    for (const [index, { chunk, priority }] of qualifiedChunks.entries()) {
        if (`${lastLine}${potentialAddition}${chunk}`.length > MAX_NUMBER_OF_CHARACTERS_PER_LINE) { // Did not find relevant priority: add new line.
            if (availableLines > 0 && canAddEquivalentChunk(previousPriority, availableLines, qualifiedChunks)) {
                const [{ chunk: nextChunk, priority: nextPriority }] = qualifiedChunks.splice(0, 1); // Remove the chunks the next chunk.
                slides[slides.length - 1] = {
                    chunk: `${previousChunk}\n${nextChunk}`,
                    priority: nextPriority,
                };
            } else {
                slides.push(...qualifiedChunks.splice(0, 1));
            }
            break;
        } else if (priority < previousPriority) {
            potentialAddition += chunk; // Keep looping until the potential addition becomes too long or is of relevant priority.
        } else if (priority >= previousPriority) { // Relevant priority: add to the line.
            qualifiedChunks.splice(0, index + 1); // Remove the chunks that were used.
            slides[slides.length - 1] = {
                chunk: `${previousChunk}${potentialAddition}${chunk}`,
                priority,
            };
            break;
        }
    }

    return qualifiedChunks.length ? addChunksRecursively(slides, qualifiedChunks) : slides;
}


function canAddEquivalentChunk(previousPriority, availableLines, qualifiedChunks) {
    let potentialLineAddition = "";
    for (const { chunk, priority } of qualifiedChunks) {
        if (availableLines === 0) {
            return false;
        } else if (`${potentialLineAddition}${chunk}`.length > MAX_NUMBER_OF_CHARACTERS_PER_LINE) { // Need to add a new line and start over.
            availableLines--; /* eslint-disable-line no-param-reassign */
            potentialLineAddition = chunk;
        } else if (priority < previousPriority) {
            potentialLineAddition += chunk; // Keep looping until the potential addition becomes too long or is of relevant priority.
        } else if (priority >= previousPriority) { // We have a valid line
            return true;
        }
    }
}


function divideIntoMajorSyntacticChunks(text) {
    const majorSyntacticChunks = text.match(/[^.!?]+[.!?]*/gu) || [text];
    const trimmedMajorSyntacticChunks = majorSyntacticChunks.map(chunk => chunk.trim());

    return combineMajorSyntacticChunks(trimmedMajorSyntacticChunks);
}

function divideIntoIntermediateSyntacticChunks(text) {
    const intermediateSyntacticChunk = text.match(/[^:;]+[:;]*/gu) || [text];

    return combineChunks(intermediateSyntacticChunk).map(chunk => chunk.trim());
}

function divideIntoMinorSyntacticChunks(text) {
    const minorSyntacticChunk = text.match(/[^,-]+[,-]*/gu) || [text];

    return combineChunks(minorSyntacticChunk).map(chunk => chunk.trim());
}

function divideIntoFinalSyntacticChunks(text) {
    const words = text.match(/[^ ]+[ ]*/gu) || [text];

    // return combineChunks(words).map(chunk => chunk.trim());
    // TODO: check for amazingly long word.
}


function combineMajorSyntacticChunks(chunks) {

    const combinedChunks = chunks.reduce((slides, chunk, index) => {
        if (index === 0) {
            return [chunk];
        }

        const previousSlide = slides[slides.length - 1];
        const lineBreaksOfPreviousSlide = previousSlide.match("\n");
        const numberOfLinesOnPreviousSlide = (lineBreaksOfPreviousSlide && lineBreaksOfPreviousSlide.length + 1) || 1;

        const acceptsFurtherLine = numberOfLinesOnPreviousSlide < MAX_NUMBER_OF_LINES_PER_SLIDE
                                   && previousSlide.length <= MAX_NUMBER_OF_CHARACTERS_PER_LINE;
        const chunkFitsInSingleLine = chunk.length < MAX_NUMBER_OF_CHARACTERS_PER_LINE;

        if (acceptsFurtherLine && chunkFitsInSingleLine) { // TODO: This logic only works because we have max 2 lines.
            slides[slides.length - 1] += `\n${chunk}`;
            return slides;
        } else {
            return [...slides, chunk];
        }
    }, []);

    return combinedChunks;
}


function combineChunksOld(chunks) {
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


// ======================================== OLD ================================================= \\

// const intermediateSyntacticChunks = majorSyntacticChunks.reduce((accumulator, majorChunk) => {
//     if (majorChunk.length > maxLineLength*maxNumberOfLinesPerSlide) {
//         const intermediateChunks = divideIntoIntermediateSyntacticChunks(majorChunk);
//
//         return [...accumulator, ...intermediateChunks];
//     }
//
//     return [...accumulator, majorChunk];
// }, []);

//
// const minorSyntacticChunks = intermediateSyntacticChunks.reduce((accumulator, intermediateChunk) => {
//     if (intermediateChunk.length > maxLineLength*maxNumberOfLinesPerSlide) {
//         const minorChunk = divideIntoMinorSyntacticChunks(intermediateChunk);
//
//         return [...accumulator, ...minorChunk];
//     }
//
//     return [...accumulator, intermediateChunk];
// }, []);

// const finalChunks = minorSyntacticChunks.reduce((accumulator, minorChunk) => {
//     if (minorChunk.length > maxLineLength*maxNumberOfLinesPerSlide) {
//         const finalChunk = divideIntoFinalSyntacticChunks(minorChunk);
//
//         return [...accumulator, ...finalChunk];
//     }
//
//     return [...accumulator, minorChunk];
// }, []);

// console.log(majorSyntacticChunks);
// console.log(intermediateSyntacticChunks);
// console.log(finalChunks.map(chunk => [chunk, chunk.length]));
// Make custom line division here

// return finalChunks;
//
//
//
//
// const combinedChunks = syntacticChunks.reduce((slides, { chunk, priority }, index) => {
//     if (index === 0) {
//         return [chunk];
//     }
//
//     const previousSlide = slides[slides.length - 1];
//     const numberOfLinesOnPreviousSlide = (previousSlide.match("\n") && previousSlide.match("\n").length + 1) || 1;
//
//
//     const acceptsFurtherLine = numberOfLinesOnPreviousSlide < MAX_NUMBER_OF_LINES_PER_SLIDE;
//
//
//     if (acceptsFurtherLine && chunkFitsInSingleLine) { // TODO: This logic only works because we have max 2 lines.
//         slides[slides.length - 1] += `\n${chunk}`;
//         return slides;
//     } else {
//         return [...slides, chunk];
//     }
// }, []);
//
// return combinedChunks;


// const indexOfNextRelevantChunk = qualifiedChunks.findIndex(qualifiedChunk => { /* eslint-disable-line arrow-body-style */
//     return qualifiedChunk.priority >= previousPriority;
// }) || qualifiedChunks.length;
//
// const nextQualifiedChunkOfRelevantPriority = qualifiedChunks.slice(0, indexOfNextRelevantChunk)
//                                                             .reduce((
//                                                                 accumulator,
//                                                                 { chunk, priority },
//                                                             ) => ({
//                                                                 chunk: `${accumulator.chunk}${chunk}`,
//                                                                 priority,
//                                                             }), { chunk: "" });
//
// const concatenatedLine = `${lastLine}${nextQualifiedChunkOfRelevantPriority.chunk}`;

// if (concatenatedLine.length <= MAX_NUMBER_OF_CHARACTERS_PER_LINE) {
//     qualifiedChunks.splice(0, indexOfNextRelevantChunk + 1);
//     const newChunk = previousChunk.replace(lastLine, concatenatedLine);
//     slides[slides.length - 1] = {
//         chunk: newChunk,
//         priority: nextQualifiedChunkOfRelevantPriority.priority,
//     };
// } else {
//     const newChunk = `${previousChunk}\n${nextQualifiedChunkOfRelevantPriority.chunk}`;
//     slides[slides.length - 1] = {
//         chunk: newChunk,
//         priority: nextQualifiedChunkOfRelevantPriority.priority,
//     };
// }

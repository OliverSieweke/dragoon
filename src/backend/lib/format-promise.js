"use strict";

module.exports = { formatPromise };

async function formatPromise(promise) {
    try {
        const result = await promise;

        return [null, result];
    } catch (err) {
        return [err, null];
    }
}

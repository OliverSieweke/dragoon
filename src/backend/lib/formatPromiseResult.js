"use strict";

module.exports = { formatPromiseResult };

async function formatPromiseResult(promise) {
    try {
        const result = await promise;

        return [null, result];
    } catch (err) {
        return [err, null];
    }
}

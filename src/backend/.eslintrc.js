module.exports = {
    env: {
        es6: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "script",
        ecmaFeatures: {
            globalReturn: false,
        },
    },
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    rules: {
// ============================================================================================== \\
// ======================================== --fix Rules ========================================= \\
// Strict Mode -------------------------------------------------------------------------------------
        "strict": [
            "error",
            "global",
        ],

// ============================================================================================== \\
// ===================================== Recommended Rules ====================================== \\
// Possible Errors ---------------------------------------------------------------------------------
        "no-console": "off",

// ============================================================================================== \\
// ======================================== Other Rules ========================================= \\
// Node.js and CommonJS ----------------------------------------------------------------------------
        "global-require": "error",
        "no-buffer-constructor": "error",
        "no-mixed-requires": [
            "warn",
            {
                grouping: true,
                allowCall: true,
            },
        ],
        "no-new-require": "error",
        "no-path-concat": "error",
        "no-process-env": "off",
        "no-process-exit": "error",
        "no-restricted-modules": [
            "error",
            {
                "paths": [],
                "patterns": [],
            },
        ],
        "no-sync": [
            "warn",
            {
                allowAtRootLevel: false,
            },
        ],
    },
};

module.exports = {
    root: true,
    env: { /* Intentionally left empty - is being specified in nested .eslintrc.js files*/ },
    parserOptions: { /* Intentionally left empty - is being specified in nested .eslintrc.js files*/ },
    globals: { /* Intentionally left empty - is being specified in nested .eslintrc.js files*/ },
    plugins: [
        "jsdoc",
    ],
    rules: {
// ============================================================================================== \\
// ======================================== --fix Rules ========================================= \\
// Possible Errors ---------------------------------------------------------------------------------
        "no-extra-boolean-cast": "warn",                                        // recommended
        "no-extra-parens": [
            "warn",
            "all",
            {
                conditionalAssign: false,
                returnAssign: false,
                nestedBinaryExpressions: false,
                ignoreJSX: "multi-line",
                enforceForArrowConditionals: false,
            },
        ],
        "no-extra-semi": "warn",                                                // recommended
        "no-regex-spaces": "warn",                                              // recommended
        "no-unsafe-negation": "error",                                          // recommended

// Best Practices ----------------------------------------------------------------------------------
        "curly": [
            "warn",
            "all",
        ],
        "dot-location": [
            "warn",
            "property",
        ],
        "dot-notation": [                                                       // airbnb
            "warn",
            {
                allowKeywords: true,
            },
        ],
        "eqeqeq": [                                                             // airbnb [without null exception]
            "off",
            "always",
            {
                null: "ignore",
            },
        ],
        "no-else-return": "off",                                                // airbnb [with { allowElseIf: false }]
        "no-extra-bind": "error",
        "no-extra-label": "warn",
        "no-floating-decimal": "warn",
        "no-implicit-coercion": "warn",
        "no-implicit-globals": "off",
        "no-multi-spaces": [
            "warn",
            {
                ignoreEOLComments: true,
                exceptions: { ImportDeclaration: true },
            },
        ],
        "no-unused-labels": "warn",                                             // recommended
        "no-useless-return": "warn",
        "wrap-iife": [                                                          // airbnb [with "outside" option]
            "warn",
            "inside",
        ],
        "yoda": [
            "warn",
            "never",
            {
                exceptRange: true,
            },
        ],
// Strict Mode -------------------------------------------------------------------------------------
        "strict": [
            "error",
            "global",
        ],

// Variables ---------------------------------------------------------------------------------------
        "no-undef-init": "warn",

// Stylistic Issues --------------------------------------------------------------------------------
        "array-bracket-newline": [
            "warn",
            {
                multiline: true,
                minItems: null,
            },
        ],
        "array-bracket-spacing": [                                              // airbnb
            "warn",
            "never",
            {
                singleValue: false,
                objectsInArrays: false,
                arraysInArrays: false,
            },
        ],
        "array-element-newline": [
            "warn",
            "consistent",
        ],
        "block-spacing": [                                                      // airbnb
            "warn",
            "always",
        ],
        "brace-style": [                                                        // airbnb [without "allowSingleLine" option]
            "warn",
            "1tbs",
            {
                allowSingleLine: true,
            },
        ],
        "capitalized-comments": "off",
        "comma-dangle": [                                                       // airbnb
            "warn",
            {
                arrays: "always-multiline",
                objects: "always-multiline",
                imports: "always-multiline",
                exports: "always-multiline",
                functions: "always-multiline",
            },
        ],
        "comma-spacing": [                                                      // airbnb
            "warn",
            {
                before: false,
                after: true,
            },
        ],
        "comma-style": [                                                        // airbnb
            "warn",
            "last",
            {
                exceptions: {
                    ArrayExpression: false,
                    ArrayPattern: false,
                    ArrowFunctionExpression: false,
                    CallExpression: false,
                    FunctionDeclaration: false,
                    FunctionExpression: false,
                    ImportDeclaration: false,
                    ObjectExpression: false,
                    ObjectPattern: false,
                    NewExpression: false,
                },
            },
        ],
        "computed-property-spacing": [                                          // airbnb
            "warn",
            "never",
        ],
        "eol-last": [                                                           // airbnb
            "warn",
            "always",
        ],
        "func-call-spacing": [                                                  // airbnb
            "warn",
            "never",
        ],
        "function-paren-newline": [                                             // airbnb
            "warn",
            "multiline",
        ],
        "implicit-arrow-linebreak": [                                           // airbnb
            "warn",
            "beside",
        ],
        "indent": [                                                             // airbnb [2]
            "warn",
            4,
            {
                SwitchCase: 1,
                VariableDeclarator:
                    {
                        var: "first",
                        let: "first",
                        const: "first",
                    },
                outerIIFEBody: 0,
                MemberExpression: "off",                                        // Better handled by Webstorm.
                FunctionDeclaration: {
                    parameters: "first",
                    body: 1,
                },
                CallExpression: {
                    arguments: "first",
                },
                ArrayExpression: "first",
                ObjectExpression: "first",
                ImportDeclaration: "first",
                flatTernaryExpressions: true,                                   // Better handled by Webstorm
                ignoredNodes: ["ConditionalExpression"],                        // Better handled by Webstorm
                ignoreComments: true,
            },
        ],
        "jsx-quotes": [
            "warn",
            "prefer-double",
        ],
        "key-spacing": [                                                        // airbnb
            "warn",
            {
                beforeColon: false,
                afterColon: true,
                mode: "strict",
            },
        ],
        "keyword-spacing": [                                                    // airbnb
            "warn",
            {
                before: true,
                after: true,
            },
        ],
        "linebreak-style": [
            "warn",
            "unix",
        ],
        "lines-around-comments": "off",
        "lines-between-class-members": [
            "warn",
            "always",
            {
                exceptAfterSingleLine: true,
            },
        ],
        "multiline-comment-style": [
            "warn",
            "separate-lines",
        ],
        "new-parens": "warn",
        "newline-per-chained-call": [                                           // airbnb
            "warn",
            {
                ignoreChainWithDepth: 2,
            },
        ],
        "no-lonely-if": "warn",
        "no-multiple-empty-lines": [                                            // airbnb [1]
            "warn",
            {
                max: 2,
                maxEOF: 0,
                maxBOF: 0,
            },
        ],
        "no-trailing-spaces": [                                                 // airbnb
            "warn",
            {
                skipBlankLines: true,
            },
        ],
        "no-unneeded-ternary": [                                                // airbnb
            "warn",
            {
                defaultAssignment: false,
            },
        ],
        "no-whitespace-before-property": "warn",                                // airbnb
        "nonblock-statement-body-position": [
            "warn",
            "beside",
        ],
        "object-curly-newline": [
            "warn",
            {
                ObjectExpression: {
                    multiline: true,
                },
                ObjectPattern: {
                    multiline: true,
                },
                ImportDeclaration: {
                    multiline: true,
                },
                ExportDeclaration: {
                    multiline: true,
                },
            },
        ],
        "object-curly-spacing": [                                               // airbnb
            "warn",
            "always",
            {
                objectsInObjects: false,
                arraysInObjects: false,
            },
        ],
        "object-property-newline": "off",                                       // Cannot be fine-tuned for allowing shorthand properties on the same line
        "one-var": [                                                            // airbnb [without {uninitialized: "consecutive"} option]
            "warn",
            {
                initialized: "never",
                uninitialized: "consecutive",
            },
        ],
        "one-var-declaration-per-line": [
            "warn",
            "initializations",
        ],
        "operator-assignment": [
            "warn",
            "always",
        ],
        "operator-linebreak": [                                                 // airbnb [for "="]
            "warn",
            "before",
            {
                overrides: {
                    "?": "none",
                    ":": "after",
                },
            },
        ],
        "padded-blocks": [                                                      // airbnb [also {blocks: "never"}]
            "warn",
            {
                classes: "never",
                switches: "never",
            },
            {
                allowSingleLineBlocks: true,
            },
        ],
        "padding-line-between-statements": [                                    // Too restrictive
            "off",
            { blankLine: "always", prev: "*", next: "return" },
            { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
            { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
        ],
        "prefer-object-spread": "warn",
        "quote-props": [                                                        // airbnb
            "warn",
            "as-needed",
            {
                keywords: false,
                unnecessary: true,
                numbers: true,
            },
        ],
        quotes: [                                                               // airbnb ["single"]
            "warn",
            "double",
            {
                avoidEscape: false,
                allowTemplateLiterals: false,
            },
        ],
        semi: [                                                                 // airbnb
            "warn",
            "always",
            {
                omitLastInOneLineBlock: true,
            },
        ],
        "semi-spacing": [
            "warn",
            {
                before: false,
                after: true,
            },
        ],
        "semi-style": [
            "warn",
            "last",
        ],
        "sort-vars": "off",
        "space-before-blocks": [                                                // airbnb
            "warn",
            {
                functions: "always",
                keywords: "always",
                classes: "always",
            },
        ],
        "space-before-function-paren": [                                        // airbnb [with {anonymous: "always"}]
            "warn",
            {
                anonymous: "never",
                named: "never",
                asyncArrow: "always",
            },
        ],
        "space-in-parens": [                                                    // airbnb
            "warn",
            "never",
            {
                exceptions: [],
            },
        ],
        "space-infix-ops": "off",                                               // airbnb | Better handled by Webstorm (allows to differentiate between additive and multiplicative operators)
        "space-unary-ops": [
            "warn",
            {
                words: true,
                nonwords: false,
            },
        ],
        "spaced-comment": [                                                     // airbnb
            "warn",
            "always",
            {
                line: {
                    markers: [],
                    exceptions: [],
                },
                block: {
                    markers: [],
                    exceptions: [],
                    balanced: true,
                },
            },
        ],
        "switch-colon-spacing": [
            "warn",
            {
                after: true,
                before: false,
            },
        ],
        "template-tag-spacing": [
            "warn",
            "never",
        ],
        "unicode-bom": [
            "warn",
            "never",
        ],
        "wrap-regex": "warn",

// ECMAScript 6 ------------------------------------------------------------------------------------
        "arrow-body-style": [                                                   // airbnb
            "warn",
            "as-needed",
            {
                requireReturnForObjectLiteral: false,
            },
        ],
        "arrow-parens": [                                                       // airbnb
            "warn",
            "as-needed",
            {
                requireForBlockBody: false,
            },
        ],
        "arrow-spacing": [                                                      // airbnb
            "warn",
            {
                before: true,
                after: true,
            },
        ],
        "generator-star-spacing": [                                             // airbnb [with {anonymous: {before: false, after: true}} ]
            "warn",
            {
                before: false,
                after: true,
                anonymous: { before: false, after: false },
                method: { before: false, after: true },
            },
        ],
        "no-confusing-arrow": [                                                 // airbnb
            "warn",
            { allowParens: true },
        ],
        "no-useless-computed-key": "warn",
        "no-useless-rename": [
            "warn",
            {
                ignoreDestructuring: false,
                ignoreImport: false,
                ignoreExport: false,
            },
        ],
        "no-var": "error",                                                      // airbnb
        "object-shorthand": [                                                   // airbnb
            "warn",
            "always",
            {
                avoidQuotes: true,
                ignoreConstructors: false,
                avoidExplicitReturnArrows: true,
            },
        ],
        "prefer-arrow-callback": [                                              // airbnb
            "warn",
            {
                allowNamedFunctions: false,
                allowUnboundThis: false,
            },
        ],
        "prefer-const": [                                                       // airbnb
            "warn",
            {
                destructuring: "any",
                ignoreReadBeforeAssign: false,
            },
        ],
        "prefer-destructuring": [                                               // airbnb
            "warn",
            {
                VariableDeclarator: {
                    array: true,
                    object: true,
                },
                AssignmentExpression: {
                    array: true,
                    object: true,
                },
            },
            // {
            //     enforceForRenamedProperties: true,                           // ESLint bug
            // },
        ],
        "prefer-numeric-literals": "warn",
        "prefer-template": "warn",                                              // airbnb
        "rest-spread-spacing": [
            "warn",
            "never",
        ],
        "sort-imports": [
            "warn",
            {
                ignoreCase: true,
                ignoreDeclarationSort: false,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
            },
        ],
        "template-curly-spacing": [                                             // airbnb
            "warn",
            "never",
        ],
        "yield-star-spacing": [
            "warn",
            {
                before: false,
                after: true,
            },
        ],

// ============================================================================================== \\
// ===================================== Recommended Rules ====================================== \\
// Possible Errors ---------------------------------------------------------------------------------
        "for-direction": "error",
        "getter-return": [
            "error",
            {
                allowImplicit: false,
            },
        ],
        "no-compare-neg-zero": "warn",
        "no-cond-assign": [
            "error",
            "except-parens",
        ],
        "no-constant-condition": [
            "error",
            {
                checkLoops: true,
            },
        ],
        "no-console": "error",
        "no-control-regex": "warn",
        "no-debugger": "error",
        "no-dupe-args": "error",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-empty": [
            "error",
            {
                allowEmptyCatch: true,
            },
        ],
        "no-empty-character-class": "warn",
        "no-ex-assign": "error",
        "no-func-assign": "error",
        "no-inner-declarations": "off",
        "no-invalid-regexp": [
            "error",
            {
                allowConstructorFlags: ["u", "y"],
            },
        ],
        "no-irregular-whitespace": [
            "error",
            {
                skipStrings: true,
                skipComments: false,
                skipRegExps: true,
                skipTemplates: true,
            },
        ],
        "no-obj-calls": "error",
        "no-sparse-arrays": "error",
        "no-unexpected-multiline": "error",
        "no-unreachable": "error",
        "no-unsafe-finally": "error",
        "use-isnan": "warn",
        "valid-typeof": [
            "error",
            {
                requireStringLiterals: false,
            },
        ],

// Best Practices ----------------------------------------------------------------------------------
        "no-case-declarations": "error",                                        // airbnb
        "no-empty-pattern": "error",
        "no-fallthrough": [
            "error",
            {
                commentPattern: "fall through",
            },
        ],
        "no-global-assign": [
            "error",
            {
                exceptions: [],
            },
        ],
        "no-octal": "error",
        "no-redeclare": [
            "error",
            {
                builtinGlobals: true,
            },
        ],
        "no-self-assign": [
            "error",
            {
                props: true,
            },
        ],
        "no-useless-escape": "warn",                                            // airbnb

// Variables ---------------------------------------------------------------------------------------
        "no-delete-var": "error",
        "no-undef": [                                                           // airbnb
            "error",
            {
                typeof: true,
            },
        ],
        "no-unused-vars": [                                                     // airbnb
            "error",
            {
                vars: "all",
                varsIgnorePattern: "",
                args: "after-used",
                argsIgnorePattern: "",
                ignoreRestSiblings: true,
                caughtErrors: "all",
                caughtErrorsIgnorePattern: "",
            },
        ],

// Stylistic Issues --------------------------------------------------------------------------------
        "no-mixed-spaces-and-tabs": "warn",

// ECMAScript 6 ------------------------------------------------------------------------------------
        "constructor-super": "error",
        "no-class-assign": "error",
        "no-const-assign": "error",                                             // airbnb
        "no-dupe-class-members": "error",                                       // airbnb
        "no-new-symbol": "error",
        "no-this-before-super": "error",
        "require-yield": "error",

// ============================================================================================== \\
// ======================================== Other Rules ========================================= \\
// Possible Errors ---------------------------------------------------------------------------------
        "no-async-promise-executor": "error",
        "no-await-in-loop": "warn",
        "no-misleading-character-class": "error",
        "no-prototype-builtins": "off",                                        // airbnb
        "no-template-curly-in-string": "error",
        "require-atomic-updates": "warn",

// Best Practices ----------------------------------------------------------------------------------
        "accessor-pairs": [
            "error",
            {
                setWithoutGet: true,
                getWithoutSet: false,
            },
        ],
        "array-callback-return": [                                              // airbnb
            "error",
            {
                allowImplicit: false,
            },
        ],
        "block-scoped-var": "error",
        "class-methods-use-this": [
            "error",
            {
                exceptMethods: [],
            },
        ],
        "complexity": [
            "warn",
            15,
        ],
        "consistent-return": [
            "error",
            {
                "treatUndefinedAsUnspecified": false,
            },
        ],
        "default-case": [
            "warn",
            {
                commentPattern: "^no default$",
            },
        ],
        "guard-for-in": "error",
        "max-classes-per-file": [
            "warn",
            10,
        ],
        "no-alert": "error",
        "no-caller": "error",
        "no-div-regex": "off",
        "no-empty-function": [
            "warn",
            {
                allow: [],
            },
        ],
        "no-eq-null": "off",
        "no-eval": [                                                            // airbnb
            "warn",
            {
                "allowIndirect": false,
            },
        ],
        "no-extend-native": [
            "error",
            {
                exceptions: [],
            },
        ],
        "no-implied-eval": "error",
        "no-invalid-this": "error",
        "no-iterator": "error",                                                 // airbnb
        "no-labels": "off",
        "no-lone-blocks": "warn",
        "no-loop-func": "error",                                                // airbnb
        "no-magic-numbers": [
            "warn",
            {
                ignore: [
                    -1, 0, 1, 2, 3,
                    180,                                                         // Degrees
                    201, 400, 404, 409, 415, 422, 500                            // HTTP Codes
                ],
                ignoreArrayIndexes: true,
                enforceConst: true,
                detectObjects: false,
            },
        ],
        "no-multi-str": "warn",
        "no-new": "error",
        "no-new-func": "warn",                                                  // airbnb
        "no-new-wrappers": "error",                                             // airbnb
        "no-octal-escape": "error",
        "no-param-reassign": [                                                  // airbnb
            "warn",
            {
                ignorePropertyModificationsFor: [],
            },
        ],
        "no-proto": "error",
        "no-restricted-properties": [                                           // airbnb
            "warn",
            {
                object: "Math",
                property: "pow",
            },
        ],
        "no-return-assign": [
            "error",
            "except-parens",
        ],
        "no-return-await": "error",
        "no-script-url": "error",
        "no-self-compare": "error",
        "no-sequences": "error",
        "no-throw-literal": "error",
        "no-unmodified-loop-condition": "warn",
        "no-unused-expressions": [
            "error",
            {
                allowShortCircuit: true,
                allowTernary: true,
                allowTaggedTemplates: false,
            },
        ],
        "no-useless-call": "warn",
        "no-useless-catch": "warn",
        "no-useless-concat": "warn",
        "no-void": "error",
        "no-warning-comments": "off",                                           // Better handled by Webstorm
        "no-with": "error",
        "prefer-named-capture-group": "warn",
        "prefer-promise-reject-errors": [
            "error",
            {
                allowEmptyReject: false,
            },
        ],
        "radix": [                                                              // airbnb
            "warn",
            "always",
        ],
        "require-await": "warn",
        "require-unicode-regexp": "warn",
        "vars-on-top": "error",

// Variables ---------------------------------------------------------------------------------------
        "init-declarations": "off",
        "no-label-var": "warn",
        "no-restricted-globals": [                                              // airbnb
            "error",
            {
                name: "isNaN",
                message: "Use Number.isNaN() and make eventual type coercions explicit.",
            },
            {
                name: "isFinite",
                message: "Use Number.isFinite() and make eventual type coercions explicit.",
            },
        ],
        "no-shadow": [
            "error",
            {
                builtinGlobals: true,
                hoist: "all",
                allow: [
                    "err"
                ],
            },
        ],
        "no-shadow-restricted-names": "error",
        "no-undefined": "off",

// Node.js and CommonJS ----------------------------------------------------------------------------
        "callback-return": [
            "error",
            ["callback", "cb", "next", "done"],
        ],
        "handle-callback-err": [
            "error",
            "^.*(e|E)rr",
        ],

// Stylistic Issues --------------------------------------------------------------------------------
        "camelcase": [                                                          // airbnb
            "warn",
            {
                properties: "always",
                ignoreDestructuring: false,
                allow: [],
            },
        ],
        "consistent-this": [
            "warn",
            "self",
        ],
        "func-name-matching": [
            "warn",
            "always",
            {
                considerPropertyDescriptor: false,
                includeCommonJSModuleExports: false,
            },
        ],
        "func-names": [
            "warn",
            "as-needed",
            {
                generators: "as-needed",
            },
        ],
        "func-style": [                                                         // airbnb ["expression"]
            "warn",
            "declaration",
            {
                allowArrowFunctions: true,
            },
        ],
        "id-blacklist": [
            "warn",
            "async",
            "await",
        ],
        "id-length": [                                                          // airbnb [{min:2}]
            "warn",
            {
                min: 3,
                max: 50,
                properties: "always",
                exceptions: [
                    "i", "j", "k",                                              // Loop indices
                    "x", "y", "z",                                              // Standard variables
                    "a", "b", "c",                                              // Standard variables
                    "e",                                                        // Event
                    "id"
                ],
            },
        ],
        "id-match": [
            "warn",
            "",
            {
                properties: true,
                onlyDeclarations: false,
                ignoreDestructuring: false,
            },
        ],
        "line-comment-position": "off",
        "max-depth": [
            "warn",
            6,
        ],
        "max-len": [                                                            // airbnb [100]
            "warn",
            {
                code: 120,
                tabWidth: 4,
                comments: 120,
                ignorePattern: "",
                ignoreComments: true,
                ignoreTrailingComments: true,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true,
            },
        ],
        "max-lines": [
            "warn",
            {
                max: 1000,
                skipBlankLines: true,
                skipComments: true,
            },
        ],
        "max-lines-per-function": [
            "warn",
            {
                max: 100,
                skipBlankLines: true,
                skipComments: true,
                IIFEs: false,
            },
        ],
        "max-nested-callbacks": [
            "warn",
            5,
        ],
        "max-params": [
            "warn",
            4,
        ],
        "max-statements": "off",
        "max-statements-per-line": [
            "warn",
            {
                max: 1,
            },
        ],
        "multiline-ternary": "off",
        "new-cap": [                                                            // airbnb
            "warn",
            {
                newIsCap: true,
                newIsCapExceptions: [],
                newIsCapExceptionPattern: "",
                capIsNew: true,
                capIsNewExceptions: [],
                capIsNewExceptionPattern: "",
                properties: true,
            },
        ],
        "no-array-constructor": "warn",
        "no-bitwise": [
            "error",
            {
                int32Hint: false,
            },
        ],
        "no-continue": "off",
        "no-inline-comments": "off",
        "no-mixed-operators": [                                                 // airbnb
            "warn",
            {
                "groups": [
                    ["%", "**"],
                    ["&", "|", "^", "~", "<<", ">>", ">>>"],
                    ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
                    ["&&", "||"],
                    ["in", "instanceof"],
                ],
                "allowSamePrecedence": true,
            },
        ],
        "no-multi-assign": "warn",                                              // airbnb
        "no-negated-condition": "off",                                          // Generally a good idea but a bit too restrictive.
        "no-nested-ternary": "off",                                             // airbnb ["error"]
        "no-new-object": "warn",                                                // airbnb
        "no-plusplus": "off",                                                   // airbnb ["error"]
        "no-restricted-syntax": [
            "warn",
        ],
        "no-tabs": [
            "warn",
            {
                allowIndentationTabs: true,
            },
        ],
        "no-ternary": "off",
        "no-underscore-dangle": [                                               // airbnb
            "warn",
            {
                allow: [],
                allowAfterThis: false,
                allowAfterSuper: false,
                enforceInMethodNames: false,
            },
        ],
        "sort-keys": "off",

// ECMAScript 6 ------------------------------------------------------------------------------------
        "no-duplicate-imports": [                                               // airbnb
            "warn",
            {
                includeExports: true,
            },
        ],
        "no-restricted-imports": [
            "error",
            {
                paths: [],
                patterns: [],
            },
        ],
        "no-useless-constructor": "warn",
        "prefer-rest-params": "warn",
        "prefer-spread": "warn",
        "symbol-description": "warn",

// ============================================================================================== \\
// ======================================== JSDoc Rules ========================================= \\
        "jsdoc/check-alignment": "off",                                         // Does not work (but handled by Webstorm Reformatting)
        "jsdoc/check-examples": "off",                                          // Does not work well
        "jsdoc/check-indentation": "off",                                       // Does not work
        "jsdoc/check-param-names": "off",                                       // Better handled by Webstorm (for object params)
        "jsdoc/check-syntax": "off",
        "jsdoc/check-tag-names": "warn",
        "jsdoc/check-types": [
            "warn",
            "always",
        ],
        "jsdoc/no-types": "off",                                                // Only for TypeScript
        "jsdoc/no-undefined-types": "off",                                      // Does not work (but handled by Webstorm's "Validate JSDoc" intention)
        "jsdoc/newline-after-description": "warn",
        "jsdoc/no-undefined-types": "off",                                      // Better handled by Webstorm (for types coming from different files)
        "jsdoc/require-description-complete-sentence": "off",                   // Does not work
        "jsdoc/require-description": "off",
        "jsdoc/require-example": "off",
        "jsdoc/require-hyphen-before-param-description": [
            "warn",
            "never",
        ],
        "jsdoc/require-jsdoc": "off",
        "jsdoc/require-param-description": "off",                               // Already handled by Webstorm
        "jsdoc/require-param-name": "off",                                      // Already handled by Webstorm
        "jsdoc/require-param-type": "warn",
        "jsdoc/require-param": "off",                                           // Already handled by Webstorm
        "jsdoc/require-returns-check": "off",
        "jsdoc/require-returns-description": "warn",
        "jsdoc/require-returns-type": "off",                                    // Already handled by Webstorm
        "jsdoc/require-returns": "off",                                         // Does not work
        "jsdoc/valid-types": "off",
    },
    settings:
        {
            jsdoc:
                {
                    additionalTagNames: {
                        customTags: [],
                    },
                    preferredTypes: {},
                    tagNamePreference:
                        {
                            returns:
                                "return",
                        }
                    ,
                }
            ,
        }
    ,
};

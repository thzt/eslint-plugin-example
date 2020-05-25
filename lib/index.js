/**
 * @fileoverview example
 * @author thzt
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require('requireindex');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
// https://eslint.org/docs/developer-guide/working-with-plugins#rules-in-plugins
module.exports.rules = requireIndex(__dirname + '/rules');

// import processors
// https://eslint.org/docs/developer-guide/working-with-plugins#processors-in-plugins
module.exports.processors = {
    // add your processors here
};

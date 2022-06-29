const validator = require('validator');

let test = "98@_3";

let has
for (value in test)
    console.log(validator.isAlpha(test[value]));
console.log(validator.isAscii(test))
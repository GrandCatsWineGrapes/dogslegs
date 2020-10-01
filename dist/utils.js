"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function compareArray(array1, array2) {
    var sortedArray1 = array1.slice().sort();
    var sortedArray2 = array2.slice().sort();
    if (sortedArray1.length === sortedArray2.length && sortedArray1.every(function (value, index) { return value === sortedArray2[index]; })) {
        return true;
    }
    else
        return false;
}
exports.default = compareArray;
//# sourceMappingURL=utils.js.map
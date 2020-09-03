"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverInfo = void 0;
var fs = require('fs');
var path = require('path');
var rawInfo = fs.readFileSync(path.join(__dirname, '../config.json'));
exports.serverInfo = JSON.parse(rawInfo);
//# sourceMappingURL=serverInfo.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nedb_1 = __importDefault(require("nedb"));
var path_1 = __importDefault(require("path"));
var utils_1 = __importDefault(require("../utils"));
var StorageWorker = /** @class */ (function () {
    function StorageWorker() {
        this._db = new nedb_1.default({
            filename: path_1.default.join(__dirname, '../../db/storage.db'),
            autoload: true
        });
    }
    StorageWorker.prototype.findAllLayouts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this._db.find({}, function (err, doc) {
                            if (err)
                                reject("Error on findAllLayouts - StorageWorker: " + err);
                            else
                                resolve(doc);
                        });
                    })];
            });
        });
    };
    StorageWorker.prototype.findLayout = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this._db.findOne({ _id: id }, function (err, doc) {
                            if (Array.isArray(doc)) {
                                reject("Err: no layouts with current ID found");
                            }
                            else {
                                if (err)
                                    reject("Error on findLayout - StorageWorker: " + err);
                                else if (doc)
                                    resolve(doc);
                                else
                                    reject('No layouts matching current ID');
                            }
                        });
                    })];
            });
        });
    };
    StorageWorker.prototype.pushLayout = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this._db.find({ name: data.name }, function (err, doc) {
                            if (Array.isArray(doc) && utils_1.default(doc, [])) {
                                _this._db.insert(data, function (err, doc) {
                                    if (err)
                                        reject("Error on pushLayout - StorageWorker: " + err);
                                    else
                                        resolve(doc);
                                });
                            }
                            else
                                reject("Error on pushLayout - element with name: " + data.name + " is already in DB");
                        });
                    })];
            });
        });
    };
    StorageWorker.prototype.deleteLayout = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this._db.remove({ _id: id }, {}, function (err) {
                            if (err)
                                reject(err);
                            else
                                resolve();
                        });
                    })];
            });
        });
    };
    StorageWorker.prototype.updateLayout = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (id) {
                            _this.findLayout(id).then(function () {
                                _this._db.update({ _id: id }, { $set: { name: data.name, layout: data.layout } });
                                resolve();
                            }).catch(function (err) {
                                reject("Error on updateLayout - StorageWorker " + err + " ");
                            });
                        }
                        else
                            reject('ID is not defined on updateLayout');
                    })];
            });
        });
    };
    return StorageWorker;
}());
exports.default = StorageWorker;
//# sourceMappingURL=Storage.js.map
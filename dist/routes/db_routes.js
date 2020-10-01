"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Storage_1 = __importDefault(require("../services/Storage"));
var dbRoutes = express_1.default();
dbRoutes.post('/layout', function (req, res) {
    var storageWorker = new Storage_1.default();
    storageWorker.pushLayout(req.body)
        .then(function () {
        res.status(202).send('success');
    }).catch(function (err) {
        res.status(500).send(err + " on POST on /layout");
    });
});
exports.default = dbRoutes;
//# sourceMappingURL=db_routes.js.map
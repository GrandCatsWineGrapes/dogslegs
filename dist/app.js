"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var express_1 = __importDefault(require("express"));
var serverInfo_1 = require("./serverInfo");
var app = express_1.default();
var automaton = __importStar(require("./services/Automaton"));
var Storage_1 = __importDefault(require("./services/Storage"));
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
    res.header('Access-Contol-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept');
    next();
});
app.get('/automaton', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requestSimBody, AutomatonWorker;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                requestSimBody = {
                    clicheId: 'problem_unconfirmed',
                    date_start: '12.02.2020',
                    date_end: '30.05.2021',
                    time_start: '10:00',
                    time_end: '22:00',
                    service: 'Собачьи ножки',
                    isScreenshot: true,
                    url: 'https://dogslegs.ru',
                    SDNumber: '',
                };
                AutomatonWorker = new automaton.AutomatonWorker(requestSimBody);
                return [4 /*yield*/, AutomatonWorker.clicheHandler().then(function (result) {
                        res.send(result);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
app.listen(serverInfo_1.serverInfo.port, serverInfo_1.serverInfo.host, function () {
    console.log("Listening on " + serverInfo_1.serverInfo.host + ":" + serverInfo_1.serverInfo.port);
});
app.post('/layout', function (req, res) {
    var storageWorker = new Storage_1.default();
    storageWorker.pushLayout(req.body)
        .then(function (data) {
        res.status(202).send(data);
    }).catch(function (err) {
        res.status(500).send(err + " on POST on /layout");
    });
});
app.delete('/layout/:id', function (req, res) {
    var storageWorker = new Storage_1.default();
    storageWorker.deleteLayout(req.params.id)
        .then(function () {
        res.status(202).send('success');
    }).catch(function (err) {
        res.status(500).send(err + " on DELETE on /layout");
    });
});
app.get('/layout/all', function (req, res) {
    var storageWorker = new Storage_1.default();
    storageWorker.findAllLayouts()
        .then(function (data) { return res.status(200).send(data); })
        .catch(function (err) { return res.status(500).send(err + " on GET on /layout/all"); });
});
app.put('/layout/:id', function (req, res) {
    var storageWorker = new Storage_1.default();
    storageWorker.updateLayout(req.params.id, req.body)
        .then(function () { return res.status(202).send('success'); })
        .catch(function (err) { return res.status(500).send(err + " on PUT on /layout"); });
});
app.get('/layout/:id', function (req, res) {
    var storageWorker = new Storage_1.default();
    storageWorker.findLayout(req.params.id)
        .then(function (val) { return res.status(200).send(val); })
        .catch(function (err) { return res.status(500).send(err + " on GET on /layout"); });
});
//# sourceMappingURL=app.js.map
'use strict';
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
var express = require('express');
var resourceApp = express();
require('dotenv').config(); //uses the environment parameters in the .env file
var envPort = process.env.PORT;
var getPort = require('get-port');
var portHarbor = function () { return ([envPort, 8080, 8081, 8082, 8083, 8084, 8085, 8086, 8087, 8088]); };
var modID = module.id;
var modPack = require('../package.json');
var os = require('os');
var netInf = os.networkInterfaces();
var ipADDR = "localhost";
var ipFamily = "IPv?";
var ipNetworks = ['wlan0', 'v4-rmnet_data1', 'rmnet_ipa0', 'rmnet_data2', 'rmnet_data1', 'rmnet_data0', 'r_rmnet_data0', 'rmnet2', 'rmnet1', 'rmnet0', 'p2p0', 'lo', 'epdg0', 'en1', 'en0', 'dummy0'];
function getIpPort(item) {
    if (typeof netInf[item] !== 'undefined') {
        if (typeof netInf[item][0] !== 'undefined') {
            if (netInf[item][0].family === 'IPv4') {
                ipADDR = netInf[item][0].address;
                ipFamily = netInf[item][0].family;
                //console.log(`${item}[0]`)
                //console.log(netInf[item][0])
            }
        }
        if (ipADDR === 'localhost') {
            if (typeof netInf[item][1] !== 'undefined') {
                if (netInf[item][1].family === 'IPv4') {
                    ipADDR = netInf[item][1].address;
                    ipFamily = netInf[item][1].family;
                    //console.log(`${item}[1]`)
                    //console.log(netInf[item][1])
                }
            }
        }
    }
}
do {
    getIpPort(ipNetworks.shift());
} while (ipADDR === 'localhost');
var serverIpAddr = ipADDR;
var xtemplate = require('../views');
var appRoot = './templates/index.html';
var cameraRoot = './templates/camera.html';
var uploadRoot = './templates/upload.html';
var appMeta = { "Content-Type": "text/html" };
var resourceServer;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var portAvail, err_1, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                //Express helpers
                resourceApp.use('/css', express.static('./resources/css'));
                resourceApp.use('/js', express.static('./resources/js'));
                resourceApp.use('/assets', express.static('./assets'));
                resourceApp.use('/uploads', express.static('./controllers/upload'));
                resourceApp.get('/upload', function (req, res, next) { xtemplate.xForm(req, res, cameraRoot, appMeta, serverIpAddr, portAvail); });
                resourceApp.post('/upload', function (req, res, next) { xtemplate.xUpload(req, res, uploadRoot, appMeta, serverIpAddr, portAvail); });
                resourceApp.use('/camera', function (req, res, next) { xtemplate.xForm(req, res, cameraRoot, appMeta, serverIpAddr, portAvail); });
                resourceApp.use('/', function (req, res, next) { xtemplate.xRoot(req, res, appRoot, appMeta, serverIpAddr, portAvail); });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 10]);
                return [4 /*yield*/, getPort({ port: portHarbor() })];
            case 2:
                portAvail = _a.sent();
                return [4 /*yield*/, resourceApp.listen(portAvail)];
            case 3:
                resourceServer = _a.sent();
                console.log("[" + modPack.name + "]: The resource server is listening to port " + portAvail + ".");
                return [3 /*break*/, 10];
            case 4:
                err_1 = _a.sent();
                console.log("[" + modPack.name + "]: The resource server is unable to listen to a preferred port.");
                _a.label = 5;
            case 5:
                _a.trys.push([5, 8, , 9]);
                return [4 /*yield*/, getPort({ port: portHarbor().slice(1) })];
            case 6:
                portAvail = _a.sent();
                return [4 /*yield*/, resourceApp.listen(portAvail)];
            case 7:
                resourceServer = _a.sent();
                console.log("[" + modPack.name + "]: The resource server is listening to port " + portAvail + ".");
                return [3 /*break*/, 9];
            case 8:
                err_2 = _a.sent();
                console.log(": The resource server is unable to listen to any preferred port.");
                return [3 /*break*/, 9];
            case 9: return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); })();
process.on('SIGINT', function () {
    resourceServer.close(function () {
        console.log("[" + modPack.name + "]: The static resource server has terminated.");
    });
});

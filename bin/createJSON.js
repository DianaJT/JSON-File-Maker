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
var htmlparser2_1 = __importDefault(require("htmlparser2"));
var fs_1 = __importDefault(require("fs"));
function createJSON() {
    return __awaiter(this, void 0, void 0, function () {
        var inPackageList_1, onPackageLine_1, inPackage_1, awaitingName_1, firstPackageDone_1, firstProjectDone_1, currentURL_1, currentName_1, parser;
        return __generator(this, function (_a) {
            try {
                inPackageList_1 = false;
                onPackageLine_1 = false;
                inPackage_1 = false;
                awaitingName_1 = true;
                firstPackageDone_1 = false;
                firstProjectDone_1 = false;
                currentURL_1 = '';
                currentName_1 = '';
                fs_1.default.writeFile('temp/awesome-nodejs.json', '{\n  github:', function (err) {
                    console.error(err);
                });
                parser = new htmlparser2_1.default.Parser({
                    onopentag: function (name, attribs) {
                        if (attribs.id === 'user-content-packages') {
                            inPackageList_1 = true;
                        }
                        if (inPackageList_1 === true) {
                            if (inPackage_1 === false && name === 'a') {
                                onPackageLine_1 = true;
                            }
                            if (inPackage_1 === true && name === 'a') {
                                currentURL_1 = attribs.href;
                            }
                        }
                    },
                    ontext: function (text) {
                        if (onPackageLine_1 === true) { // handling package text
                            if (firstPackageDone_1 === true) {
                                fs_1.default.appendFile('temp/awesome-nodejs.json', ',', function (err) {
                                    console.error(err);
                                });
                            }
                            fs_1.default.appendFile('temp/awesome-nodejs.json', ' {\n    package: "'.concat(text, '",\n    projects: ['), function (err) {
                                console.error(err);
                            });
                            firstProjectDone_1 = false;
                            onPackageLine_1 = false;
                            inPackage_1 = true;
                            firstPackageDone_1 = true;
                        }
                        if (inPackage_1 === true) {
                            if (awaitingName_1 === true) {
                                currentName_1 = text;
                                awaitingName_1 = false;
                            }
                            if (awaitingName_1 === false) {
                                if (firstProjectDone_1 === true) {
                                    fs_1.default.appendFile('temp/awesome-nodejs.json', ', ', function (err) {
                                        console.error(err);
                                    });
                                }
                                fs_1.default.appendFile('temp/awesome-nodejs.json', '{\n      name: "'.concat(currentName_1, '",\n'), function (err) {
                                    console.error(err);
                                });
                                fs_1.default.appendFile('temp/awesome-nodejs.json', '      url: "'.concat(currentURL_1, '",\n'), function (err) {
                                    console.error(err);
                                });
                                fs_1.default.appendFile('temp/awesome-nodejs.json', '      description: "'.concat(text, '"\n    }'), function (err) {
                                    console.error(err);
                                });
                                awaitingName_1 = true;
                            }
                            firstProjectDone_1 = true;
                        }
                    },
                    onclosetag: function (name) {
                        if (name === 'ul' && inPackage_1 === true) {
                            inPackage_1 = false;
                            firstProjectDone_1 = false;
                            fs_1.default.appendFile('temp/awesome-nodejs.json', ']\n  }', function (err) {
                                console.error(err);
                            });
                        }
                        if (name === 'ul' && inPackage_1 === false) {
                            inPackageList_1 = false;
                            fs_1.default.appendFile('temp/awesome-nodejs.json', '\n}', function (err) {
                                console.error(err);
                            });
                        }
                    },
                }, { decodeEntities: true });
                parser.write(fs_1.default.readFileSync('temp/awesome-nodejs.html').toString());
            }
            catch (err) {
                console.error(err);
            }
            return [2 /*return*/];
        });
    });
}
exports.default = createJSON;

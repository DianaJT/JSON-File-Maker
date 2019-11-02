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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var htmlparser = __importStar(require("htmlparser2"));
var fs_1 = __importDefault(require("fs"));
var soupselect_1 = __importDefault(require("soupselect"));
function createObject() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                return [2 /*return*/, new Promise(function (resolve) {
                        var dom = htmlparser.parseDOM(fs_1.default.readFileSync('temp/awesome-nodejs.html').toString());
                        var headers = soupselect_1.default.select(dom, 'h3');
                        var github = [];
                        github.push({ package: headers[3].children[1].data, projects: [] });
                        for (var j = 1; j < headers[3].next.next.children.length; j += 2) {
                            github[0].projects.push({
                                name: headers[3].next.next.children[j].children[0].children[0].data,
                                url: headers[3].next.next.children[j].children[0].attribs.href,
                                description: headers[3].next.next.children[j].children[1].data,
                            });
                        }
                        for (var i = 4; i < headers.length - 12; i += 1) {
                            github.push({ package: headers[i].children[1].data, projects: [] });
                            if (headers[i].next.next.children[1].children[0].type === 'tag') {
                                for (var j = 1; j < headers[i].next.next.children.length; j += 2) {
                                    github[i - 3].projects.push({
                                        name: headers[i].next.next.children[j].children[0].children[0].data,
                                        url: headers[i].next.next.children[j].children[0].attribs.href,
                                        description: headers[i].next.next.children[j].children[1].data,
                                    });
                                }
                            }
                            else {
                                for (var j = 1; j < headers[i].next.next.children.length; j += 2) {
                                    var subsectionLength = headers[i].next.next.children[j].children[1].children.length;
                                    for (var k = 1; k < subsectionLength; k += 2) {
                                        var currentLine = headers[i].next.next.children[j].children[1].children[k];
                                        if (currentLine.children.length > 1) {
                                            github[i - 3].projects.push({
                                                name: currentLine.children[0].children[0].data,
                                                url: currentLine.children[0].attribs.href,
                                                description: currentLine.children[1].data,
                                            });
                                        }
                                    }
                                }
                            }
                        }
                        resolve(github);
                    })];
            }
            catch (err) {
                return [2 /*return*/, new Promise(function (_resolve, reject) {
                        console.error(err);
                        reject(err);
                    })];
            }
            return [2 /*return*/];
        });
    });
}
exports.default = createObject;

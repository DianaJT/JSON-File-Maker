#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var saveHTML_1 = __importDefault(require("./saveHTML"));
var createJSON_1 = __importDefault(require("./createJSON"));
saveHTML_1.default('https://github.com/sindresorhus/awesome-nodejs', 'temp/awesome-nodejs.html').then(function () { return createJSON_1.default(); });
// async function main() {
//   try {
//     await saveHTML('https://github.com/sindresorhus/awesome-nodejs', 'temp/awesome-nodejs.html');
//     createJSON();
//   } catch (err) {
//     console.error(err);
//   }
// }
// main();

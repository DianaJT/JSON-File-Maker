#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var saveHTML_1 = __importDefault(require("./saveHTML"));
var createString_1 = __importDefault(require("./createString"));
saveHTML_1.default('https://github.com/sindresorhus/awesome-nodejs', 'temp/awesome-nodejs.html').then(function () { return createString_1.default(); });
// async function main() {
//   try {
//     await saveHTML('https://github.com/sindresorhus/awesome-nodejs', 'temp/awesome-nodejs.html');
//     const ourString = await createString();
//     fs.writeFileSync('temp/awesome-nodejs.json', JSON.stringify(ourString));
//   } catch (err) {
//     console.error(err);
//   }
// }
// main();

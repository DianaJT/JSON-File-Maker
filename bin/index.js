#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var saveHTML_1 = __importDefault(require("./saveHTML"));
saveHTML_1.default('https://github.com/sindresorhus/awesome-nodejs', 'awesome-nodejs.html');

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var axios_1 = __importDefault(require("axios"));
var fs_1 = __importDefault(require("fs"));
function saveHTML(url, fileName) {
    axios_1.default.get(url)
        .then(function (response) {
        fs_1.default.writeFile(fileName, response.data, function (err) {
            console.error(err);
        });
    }, function (err) {
        console.error(err);
    });
}
module.exports = saveHTML;

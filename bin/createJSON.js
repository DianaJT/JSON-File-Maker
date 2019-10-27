"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var htmlparser2_1 = __importDefault(require("htmlparser2"));
var fs_1 = __importDefault(require("fs"));
function createJSON() {
    var inPackageList = false;
    var onPackageLine = false;
    var inPackage = false;
    var awaitingName = true;
    var firstPackageDone = false;
    var firstProjectDone = false;
    var currentURL = '';
    var currentName = '';
    fs_1.default.appendFile('awesome-nodejs.json', '{\n  github:', function (err) {
        console.error(err);
    });
    var parser = new htmlparser2_1.default.Parser({
        onopentag: function (name, attribs) {
            if (attribs.id === 'user-content-packages') {
                inPackageList = true;
            }
            if (inPackageList === true) {
                if (inPackage === false && name === 'a') {
                    onPackageLine = true;
                }
                if (inPackage === true && name === 'a') {
                    currentURL = attribs.href;
                }
            }
        },
        ontext: function (text) {
            if (onPackageLine === true) { // handling package text
                if (firstPackageDone === true) {
                    fs_1.default.appendFile('awesome-nodejs.json', ',', function (err) {
                        console.error(err);
                    });
                }
                fs_1.default.appendFile('awesome-nodejs.json', ' {\n    package: "'.concat(text, '",\n    projects: ['), function (err) {
                    console.error(err);
                });
                firstProjectDone = false;
                onPackageLine = false;
                inPackage = true;
                firstPackageDone = true;
            }
            if (inPackage === true) {
                if (awaitingName === true) {
                    currentName = text;
                    awaitingName = false;
                }
                if (awaitingName === false) {
                    if (firstProjectDone === true) {
                        fs_1.default.appendFile('awesome-nodejs.json', ', ', function (err) {
                            console.error(err);
                        });
                    }
                    fs_1.default.appendFile('awesome-nodejs.json', '{\n      name: "'.concat(currentName, '",\n'), function (err) {
                        console.error(err);
                    });
                    fs_1.default.appendFile('awesome-nodejs.json', '      url: "'.concat(currentURL, '",\n'), function (err) {
                        console.error(err);
                    });
                    fs_1.default.appendFile('awesome-nodejs.json', '      description: "'.concat(text, '"\n    }'), function (err) {
                        console.error(err);
                    });
                    awaitingName = true;
                }
                firstProjectDone = true;
            }
        },
        onclosetag: function (name) {
            if (name === 'ul' && inPackage === true) {
                inPackage = false;
                firstProjectDone = false;
                fs_1.default.appendFile('awesome-nodejs.json', ']\n  }', function (err) {
                    console.error(err);
                });
            }
            if (name === 'ul' && inPackage === false) {
                inPackageList = false;
                fs_1.default.appendFile('awesome-nodejs.json', '\n}', function (err) {
                    console.error(err);
                });
            }
        },
    }, { decodeEntities: true });
    parser.write(fs_1.default.readFileSync('awesome-nodejs.html').toString());
}
module.exports = createJSON;

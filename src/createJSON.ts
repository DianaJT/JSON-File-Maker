import htmlparser2 from 'htmlparser2';
import fs from 'fs';

export default async function createJSON() {
  try {
    let inPackageList: boolean = false;
    let onPackageLine: boolean = false;
    let inPackage: boolean = false;

    let awaitingName: boolean = true;
    let firstPackageDone: boolean = false;
    let firstProjectDone: boolean = false;

    let currentURL: string = '';
    let currentName: string = '';

    fs.writeFile('temp/awesome-nodejs.json', '{\n  github:', (err) => {
      console.error(err);
    });

    const parser = new htmlparser2.Parser(
      {
        onopentag(name, attribs) {
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
        ontext(text) {
          if (onPackageLine === true) { // handling package text
            if (firstPackageDone === true) {
              fs.appendFile('temp/awesome-nodejs.json', ',', (err) => {
                console.error(err);
              });
            }

            fs.appendFile('temp/awesome-nodejs.json', ' {\n    package: "'.concat(text, '",\n    projects: ['), (err) => {
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
                fs.appendFile('temp/awesome-nodejs.json', ', ', (err) => {
                  console.error(err);
                });
              }
              fs.appendFile('temp/awesome-nodejs.json', '{\n      name: "'.concat(currentName, '",\n'), (err) => {
                console.error(err);
              });
              fs.appendFile('temp/awesome-nodejs.json', '      url: "'.concat(currentURL, '",\n'), (err) => {
                console.error(err);
              });
              fs.appendFile('temp/awesome-nodejs.json', '      description: "'.concat(text, '"\n    }'), (err) => {
                console.error(err);
              });

              awaitingName = true;
            }
            firstProjectDone = true;
          }
        },
        onclosetag(name) {
          if (name === 'ul' && inPackage === true) {
            inPackage = false;
            firstProjectDone = false;
            fs.appendFile('temp/awesome-nodejs.json', ']\n  }', (err) => {
              console.error(err);
            });
          }
          if (name === 'ul' && inPackage === false) {
            inPackageList = false;
            fs.appendFile('temp/awesome-nodejs.json', '\n}', (err) => {
              console.error(err);
            });
          }
        },
      },
      { decodeEntities: true },
    );
    parser.write(fs.readFileSync('temp/awesome-nodejs.html').toString());
  } catch (err) {
    console.error(err);
  }
}

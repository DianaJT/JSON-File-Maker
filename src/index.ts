#!/usr/bin/env node

import fs from 'fs';
import saveHTML from './saveHTML';
import createString from './createString';

saveHTML('https://github.com/sindresorhus/awesome-nodejs', 'temp/awesome-nodejs.html').then(() => createString());

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

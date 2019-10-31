#!/usr/bin/env node

import saveHTML from './saveHTML';
import createJSON from './createJSON';

saveHTML('https://github.com/sindresorhus/awesome-nodejs', 'temp/awesome-nodejs.html').then(() => createJSON());

// async function main() {
//   try {
//     await saveHTML('https://github.com/sindresorhus/awesome-nodejs', 'temp/awesome-nodejs.html');
//     createJSON();
//   } catch (err) {
//     console.error(err);
//   }
// }
// main();

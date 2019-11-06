#!/usr/bin/env node

import { promises as fs } from 'fs';
import saveHTML from './saveHTML';
import createObject from './createObject';

async function main() {
  try {
    await saveHTML('https://github.com/sindresorhus/awesome-nodejs', 'temp/awesome-nodejs.html');
    const github = await createObject();
    await fs.writeFile('temp/awesome-nodejs.json', JSON.stringify(github, null, 2));
  } catch (err) {
    console.error(err);
  }
}

main();

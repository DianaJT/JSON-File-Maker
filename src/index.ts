#!/usr/bin/env node

import { promises as fs } from 'fs';
import process from 'process';
import saveHTML from './saveHTML';
import createObject from './createObject';

const logMeasurement = (name: string, time1: bigint, time2: bigint) =>
  console.log(`Benchmark [${name}]: ${(time2 - time1)/BigInt(1000000)} ms`);

async function main() {
  try {
    const downloadStart = process.hrtime.bigint();
    await saveHTML('https://github.com/sindresorhus/awesome-nodejs', 'temp/awesome-nodejs.html');
    const downloadEnd = process.hrtime.bigint();
    const github = await createObject();
    const fileWriteStart = process.hrtime.bigint();
    await fs.writeFile('temp/awesome-nodejs.json', JSON.stringify(github, null, 2));
    const fileWriteEnd = process.hrtime.bigint();

    logMeasurement('downloading html', downloadStart, downloadEnd);
    logMeasurement('object creation', downloadEnd, fileWriteStart);
    logMeasurement('writing json', fileWriteStart, fileWriteEnd);
    logMeasurement('total', downloadStart, fileWriteEnd);

  } catch (err) {
    console.error(err);
  }
}

main();

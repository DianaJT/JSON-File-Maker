#!/usr/bin/env node

import saveHTML from './saveHTML';
import createJSON from './createJSON';

saveHTML('https://github.com/sindresorhus/awesome-nodejs', 'awesome-nodejs.html');
createJSON();

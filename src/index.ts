#!/usr/bin/env node

import saveHTML from './saveHTML';
import createJSON from './createJSON';

saveHTML('https://github.com/sindresorhus/awesome-nodejs', 'tf-awesome-nodejs.html');

// disabled for now
// createJSON();

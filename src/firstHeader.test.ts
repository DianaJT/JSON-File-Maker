import saveHTML from './saveHTML';
import createObject from './createObject';

async function thirdHeader(callback: Function) {
  try {
    await saveHTML('https://github.com/sindresorhus/awesome-nodejs', 'temp/awesome-nodejs.html');
    const github = await createObject();
    expect(github[0].package).toBe('Mad science');
    callback();
  } catch (err) {
    console.error(err);
  }
}

test('tests first package name', (done) => {
  thirdHeader(done);
});

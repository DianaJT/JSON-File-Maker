import * as htmlparser from 'htmlparser2';
import fs from 'fs';
import soupselect from 'soupselect';

interface packageObject {package: string, projects: Object[]}

export default async function createObject():Promise<packageObject[]> {
  try {
    return new Promise((resolve) => {
      const dom = htmlparser.parseDOM(fs.readFileSync('temp/awesome-nodejs.html').toString());
      const headers = soupselect.select(dom, 'h3');

      const github: packageObject[] = [];

      // github.push({ package: headers[3].children[1].data, projects: [] });

      // for (let j = 1; j < headers[3].next.next.children.length; j += 2) {
      //   github[0].projects.push({
      //     name: headers[3].next.next.children[j].children[0].children[0].data,
      //     url: headers[3].next.next.children[j].children[0].attribs.href,
      //     description: headers[3].next.next.children[j].children[1].data,
      //   });
      // }

      for (let i = 3; i < headers.length - 12; i += 1) {
        github.push({ package: headers[i].children[1].data, projects: [] });
        if (headers[i].next.next.children[1].children[0].type === 'tag') {
          for (let j = 1; j < headers[i].next.next.children.length; j += 2) {
            const currentLine = headers[i].next.next.children[j];
            let currentDesc = '';

            for (let l = 1; l < currentLine.children.length; l += 1) {
              if (currentLine.children[l].type === 'text') {
                currentDesc = currentDesc.concat(currentLine.children[l].data);
              }
              if (currentLine.children[l].name === 'code' || currentLine.children[l].name === 'a') {
                currentDesc = currentDesc.concat(currentLine.children[l].children[0].data);
              }
            }

            github[i - 3].projects.push({
              name: currentLine.children[0].children[0].data,
              url: currentLine.children[0].attribs.href,
              description: currentDesc,
            });
          }
        } else {
          for (let j = 1; j < headers[i].next.next.children.length; j += 2) {
            const subsectionLength = headers[i].next.next.children[j].children[1].children.length;
            for (let k = 1; k < subsectionLength; k += 2) {
              const currentLine = headers[i].next.next.children[j].children[1].children[k];
              let currentDesc = '';

              for (let l = 1; l < currentLine.children.length; l += 1) {
                if (currentLine.children[l].type === 'text') {
                  currentDesc = currentDesc.concat(currentLine.children[l].data);
                }
                if (currentLine.children[l].name === 'code' || currentLine.children[l].name === 'a') {
                  currentDesc = currentDesc.concat(currentLine.children[l].children[0].data);
                }
              }
              if (currentLine.children.length > 1) {
                github[i - 3].projects.push({
                  name: currentLine.children[0].children[0].data,
                  url: currentLine.children[0].attribs.href,
                  description: currentDesc,
                });
              }
            }
          }
        }
      }
      resolve(github);
    });
  } catch (err) {
    return new Promise((_resolve, reject) => {
      console.error(err);
      reject(err);
    });
  }
}

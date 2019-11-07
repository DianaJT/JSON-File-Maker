import * as htmlparser from 'htmlparser2';
import { promises as fs } from 'fs';
// @ts-ignore
import soupselect from 'soupselect';

interface packageObject { package: string, projects: Object[] }

export default async function createObject(): Promise<packageObject[]> {
  return new Promise(async (resolve,reject) => {
    try {
      const rawHtml = (await fs.readFile('temp/awesome-nodejs.html')).toString();
      const dom = htmlparser.parseDOM(rawHtml);
      const headers = soupselect.select(dom, 'h3');
      const github: packageObject[] = [];
  
      for (let i = 3; i < headers.length - 12; i += 1) {
        github.push({ package: headers[i].children[1].data, projects: [] });

        if (headers[i].next.next.children[1].children[0].type === 'tag') {
          for (let j = 1; j < headers[i].next.next.children.length; j += 2) {
            const currentLine = headers[i].next.next.children[j];
            let currentDesc: string = '';

            for (let l = 1; l < currentLine.children.length; l += 1) {
              if (currentLine.children[l].type === 'text') {
                currentDesc += currentLine.children[l].data;
              }
              if (currentLine.children[l].name === 'code' || currentLine.children[l].name === 'a') {
                currentDesc += currentLine.children[l].children[0].data;
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
              let currentDesc: string = '';

              for (let l = 1; l < currentLine.children.length; l += 1) {
                if (currentLine.children[l].type === 'text') {
                  currentDesc += currentLine.children[l].data;
                }

                if (currentLine.children[l].name === 'code' || currentLine.children[l].name === 'a') {
                  currentDesc += currentLine.children[l].children[0].data;
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
    } catch (err) {
      console.error(err);
      
      reject(err);
    }
  });
}
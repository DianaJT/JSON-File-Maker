import * as htmlparser from 'htmlparser2';
import { promises as fs } from 'fs';
// @ts-ignore
import soupselect from 'soupselect';

export default async function createString() {
  try {
    const rawHTML = (await fs.readFile('temp/awesome-nodejs.html')).toString();
    const dom = htmlparser.parseDOM(rawHTML);
    const headers = soupselect.select(dom, 'h3');

    let outputString = '';

    outputString = outputString.concat('{\n  github: {\n    package: "', headers[3].children[1].data, '",\n    projects: [');

    outputString = outputString.concat('{\n      name: "', headers[3].next.next.children[1].children[0].children[0].data);
    outputString = outputString.concat('",\n      url: "', headers[3].next.next.children[1].children[0].attribs.href);
    outputString = outputString.concat('",\n      description: "', headers[3].next.next.children[1].children[1].data, '"\n    }');

    for (let j = 3; j < headers[3].next.next.children.length; j += 2) {
      outputString = outputString.concat(', {\n      name: "', headers[3].next.next.children[j].children[0].children[0].data);
      outputString = outputString.concat('",\n      url: "', headers[3].next.next.children[j].children[0].attribs.href);
      outputString = outputString.concat('",\n      description: "', headers[3].next.next.children[j].children[1].data, '"\n    }');
    }

    outputString = outputString.concat(']\n  }');
    outputString = outputString.concat('\n}');

    return outputString;
  } catch (err) {
    console.error(err);
  }
}

import * as htmlparser from 'htmlparser2';
import fs from 'fs';
import soupselect from 'soupselect';

export default async function createString() {
  try {
    const dom = htmlparser.parseDOM(fs.readFileSync('temp/awesome-nodejs.html').toString());
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

    // for (let i = 4; i < headers.length - 12; i += 1) {
    //   outputString = outputString.concat(', {\n    package: "', headers[i].children[1].data, '",\n    projects: [');

    //   outputString = outputString.concat('{\n      name: "', headers[i].next.next.children[1].children[0].children[0].data);
    //   outputString = outputString.concat('",\n      url: "', headers[i].next.next.children[1].children[0].attribs.href);
    //   outputString = outputString.concat('",\n      description: "', headers[i].next.next.children[1].children[1].data, '"\n    }');

    //   for (let j = 3; j < headers[i].next.next.children.length; j += 2) {
    //     outputString = outputString.concat(', {\n      name: "', headers[i].next.next.children[j].children[0].children[0].data);
    //     outputString = outputString.concat('",\n      url: "', headers[i].next.next.children[j].children[0].attribs.href);
    //     outputString = outputString.concat('",\n      description: "', headers[i].next.next.children[j].children[1].data, '"\n    }');
    //   }
    //   outputString = outputString.concat(']\n  }');
    // }
    outputString = outputString.concat('\n}');
    return outputString;
  } catch (err) {
    console.error(err);
  }
}

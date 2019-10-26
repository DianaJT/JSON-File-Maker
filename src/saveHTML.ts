import axios from 'axios';
import fs from 'fs';

function saveHTML(url: string, fileName: string) {
  axios.get(url)
    .then((response) => {
      fs.writeFile(fileName, response.data, (err) => {
        console.error(err);
      });
    }, (err) => {
      console.error(err);
    });
}

export = saveHTML

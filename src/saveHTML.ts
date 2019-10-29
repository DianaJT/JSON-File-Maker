import axios from 'axios';
import fs from 'fs';

export default async function saveHTML(url: string, fileName: string) {
  try {
    axios.get(url)
      .then((response) => {
        fs.writeFile(fileName, response.data, (err) => {
          console.error(err);
        });
      }, (err) => {
        console.error(err);
      });
  } catch (err) {
    console.error(err);
  }
}

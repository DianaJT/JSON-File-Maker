import axios from 'axios';
import fs from 'fs';

export default async function saveHTML(url: string, fileName: string) {
  try {
    const response = await axios({
      method: 'get',
      url,
      responseType: 'stream'
    });

    response.data.pipe(fs.createWriteStream(`temp/${fileName}`));
  } catch (error) {
    console.error(`Could not get data ${error.message}`);
  }
}

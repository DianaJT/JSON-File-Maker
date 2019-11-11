import axios from 'axios';
import fs from 'fs';

export default async function saveHTML(url: string, fileName: string) {
  try {
    const { response } = await axios.get(url);
    await fs.promises.writeFile(fileName, response);
  } catch (err) {
    console.error(err);
  }
}

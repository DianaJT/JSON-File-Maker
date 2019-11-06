import axios from 'axios';
import { promises as fs } from 'fs';

export default async function saveHTML(url: string, fileName: string) {
  try {
    const { data } = await axios.get(url);

    await fs.writeFile(fileName, data);
  } catch (err) {
    console.error(err);
  }
}

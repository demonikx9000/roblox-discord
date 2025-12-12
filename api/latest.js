import { promises as fs } from "fs";
import path from "path";

const file = path.join(process.cwd(), "latest.json");

export default async function handler(req, res) {
  try {
    const data = await fs.readFile(file, "utf8");
    res.status(200).send(data);
  } catch (err) {
    res.status(200).send("{}");
  }
}

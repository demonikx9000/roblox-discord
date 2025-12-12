import { promises as fs } from "fs";
import path from "path";

const file = path.join(process.cwd(), "latest.json");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  try {
    const { sender, command } = req.body;

    const data = JSON.stringify({ sender, command });
    await fs.writeFile(file, data);

    res.status(200).send("OK");
  } catch (err) {
    res.status(500).send("ERROR");
  }
}

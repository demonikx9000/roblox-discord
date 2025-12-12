import { promises as fs } from "fs";
import path from "path";

const file = path.join(process.cwd(), "latest.json");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const { sender, command } = req.body;

    // Save the command to latest.json
    const data = JSON.stringify({ sender, command });
    await fs.writeFile(file, data);

    // Optional: send to Discord webhook
    await fetch("https://discord.com/api/webhooks/1448871462113902713/Ka85kRmhJmxpg92b4YOJuNUdymt9f_ewdcRS2ARn-9zN6QB_rFbJLloDluerO7RtPWdW", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `**Command Received:** ${command}\n**Sender:** ${sender}`
      })
    });

    res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).send("ERROR");
  }
}

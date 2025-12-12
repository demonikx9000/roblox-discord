import fetch from "node-fetch";

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1448871462113902713/Ka85kRmhJmxpg92b4YOJuNUdymt9f_ewdcRS2ARn-9zN6QB_rFbJLloDluerO7RtPWdW";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  try {
    const { player, action } = req.body;

    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `📢 Roblox Log\nPlayer: ${player}\nAction: ${action}`
      })
    });

    res.status(200).send("Logged");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
}

export const config = {
  runtime: "edge",
};

let lastCommand = "";

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const body = await req.json();
  lastCommand = JSON.stringify(body);

  // send to discord webhook
  await fetch("https://discord.com/api/webhooks/1448871462113902713/Ka85kRmhJmxpg92b4YOJuNUdymt9f_ewdcRS2ARn-9zN6QB_rFbJLloDluerO7RtPWdW", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `**Command Received:** ${body.command}\n**Sender:** ${body.sender}`
    }),
  });

  return new Response(JSON.stringify({ ok: true }));
};

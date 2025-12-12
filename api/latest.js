export const config = {
  runtime: "edge",
};

let lastCommand = "";

export default async () => {
  return new Response(lastCommand || "{}", {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

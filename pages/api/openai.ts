import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const url = "https://api.openai.com/v1/engines/davinci/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_SECRET}`,
  };
  const prompt = req.query.prompt;
  if (!prompt) return res.json({ error: "No prompt provided." });

  const body = { prompt };
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers,
  });
  const json = await response.json();

  return res.json(json);
};

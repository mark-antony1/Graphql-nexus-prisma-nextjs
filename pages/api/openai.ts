import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const url = "https://api.openai.com/v1/engines/davinci/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_SECRET}`,
  };
  const prompt = req.query.prompt;
  //   if (!prompt) return res.json({ error: "No prompt provided." });

  const body = { prompt: "hi there " };
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers,
  });
  const json: {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
      text: string;
      index: number;
      logprobs: null;
      finish_reason: string;
    }[];
  } = await response.json();

  return res.json(json);
};

// Example response

/* 
{
    "id": "cmpl-sRfG5OgHcPKNLQFHP4hkoRFW",
    "object": "text_completion",
    "created": 1598559533,
    "model": "davinci:2020-05-03",
    "choices": [
        {
            "text": "ia, near the dlole of Ibe l%lu1i1",
            "index": 0,
            "logprobs": null,
            "finish_reason": "length"
        }
    ]   
}


*/

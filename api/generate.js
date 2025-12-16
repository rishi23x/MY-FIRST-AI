export default async function handler(req, res) {
  const userText = req.body.text;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/google/flan-t5-base",
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer  ${process.env.HF_API_KEY}",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: `Write a promotional message for this business:\n${userText}`
      })
    }
  );

  const data = await response.json();
  res.status(200).json({ result: data[0].generated_text });
}

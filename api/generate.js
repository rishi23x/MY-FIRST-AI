export default async function handler(req, res) {
  try {
    const userText = req.body.text;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/distilgpt2",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: `Write a short promotional message:\n${userText}`
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(200).json({
        result: "AI is loading. Click Generate again in 20 seconds."
      });
    }

    res.status(200).json({
      result: data[0]?.generated_text || "Try again."
    });

  } catch {
    res.status(200).json({
      result: "Temporary issue. Try again."
    });
  }
}


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
          inputs: userText
        })
      }
    );

    const data = await response.json();

    // If AI still loading, return smart fallback
    if (data.error || !data[0]?.generated_text) {
      return res.status(200).json({
        result: `Special offer just for you! ${userText}. Visit us today and don’t miss out.`
      });
    }

    res.status(200).json({
      result: data[0].generated_text
    });

  } catch {
    res.status(200).json({
      result: "Limited-time offer available now. Visit us today!"
    });
  }
}



export default async function handler(req, res) {
  try {
    const userText = req.body.text;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: `Write a short promotional message for this business:\n${userText}`
        })
      }
    );

    const data = await response.json();

    if (!data || data.error) {
      return res.status(500).json({
        result: "AI is waking up. Please try again in 30 seconds."
      });
    }

    res.status(200).json({
      result: data[0]?.generated_text || "No response generated."
    });

  } catch (error) {
    res.status(500).json({
      result: "Something went wrong. Try again."
    });
  }
}

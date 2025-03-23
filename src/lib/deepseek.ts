export const fetchDeepSeek = async (userMessage: string) => {
    const API_KEY = process.env.DEEPSEEK_API_KEY;
    const API_URL = "https://openrouter.ai/api/v1/chat/completions";
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-small-3.1-24b-instruct:free",
          messages: [
            { role: "system", content: "You are an AI assistant." },
            { role: "user", content: userMessage }
          ],
        }),
      });
  
      if (!response.ok) {
        // Log the response details to understand the error
        const errorText = await response.text();
        console.error("API Response Error:", errorText);
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.choices?.[0]?.message?.content || "No response received.";
    } catch (error) {
      console.error("DeepSeek API Error:", error);
      return "Error fetching response.";
    }
  };
  
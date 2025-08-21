import OpenAI from "openai";
import TelegramBot from "node-telegram-bot-api";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: question }],
    });

    const answer = completion.choices[0].message.content;

    // Send to Telegram channel
    await bot.sendMessage(process.env.TELEGRAM_CHAT_ID, answer);

    res.status(200).json({ answer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
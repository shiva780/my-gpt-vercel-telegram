import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input }),
    });
    const data = await res.json();
    setResponse(data.answer);
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>My GPT + Telegram</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          style={{ width: "80%", padding: "8px" }}
        />
        <button type="submit">Ask</button>
      </form>
      <div style={{ marginTop: 20 }}>
        <strong>Answer:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}
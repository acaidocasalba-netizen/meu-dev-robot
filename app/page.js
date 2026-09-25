"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function createProject() {
    if (!prompt.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ocorreu um erro.");
      }

      setAnswer(data.text);
    } catch (error) {
      setAnswer(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <div className="robot-container">
        <div className="robot-header">
          <h1 className="robot-title">🤖 Meu Dev Robot</h1>

          <p className="robot-subtitle">
            Seu agente de IA para criar sites, sistemas e automações.
          </p>
        </div>

        <textarea
          className="robot-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Descreva o sistema ou site que você quer criar..."
        />

        <button
          className="robot-button"
          onClick={createProject}
          disabled={loading}
        >
          {loading ? "Pensando..." : "Criar projeto"}
        </button>

        {answer && (
          <div className="robot-answer">
            <h2>🤖 Resposta do robô</h2>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </main>
  );
}

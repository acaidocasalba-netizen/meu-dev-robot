"use client";

import { useState } from "react";
import { pipeline } from "@huggingface/transformers";

let robot = null;
async function getRobot() {
  if (!robot) {
    try {
      if (navigator.gpu) {
        robot = await pipeline(
          "text-generation",
        "onnx-community/SmolLM2-135M-Instruct-ONNX-MHA",
          {
            dtype: "q4",
            device: "webgpu",
          }
        );
      }
    } catch (error) {
      console.log("WebGPU indisponível. Usando WASM.");
    }

    if (!robot) {
      robot = await pipeline(
        "text-generation",
        "onnx-community/Qwen2.5-0.5B-Instruct",
        {
          dtype: "q4",
          device: "wasm",
        }
      );
    }
  }

  return robot;
}
export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function createProject() {
    if (!prompt.trim()) return;

    setLoading(true);
    setAnswer("Carregando o robô local...");

    try {
      const model = await getRobot();

      setAnswer("Analisando seu projeto...");

      const messages = [
        {
          role: "system",
          content:
            "Você é o Meu Dev Robot, um agente de desenvolvimento. Responda em português do Brasil. Analise pedidos de criação de sites, sistemas e automações. Explique as funcionalidades e proponha uma estrutura de desenvolvimento.",
        },
        {
          role: "user",
          content: prompt,
        },
      ];

     const output = await model(messages, {
  max_new_tokens: 300,
  do_sample: true,
  temperature: 0.7,
  repetition_penalty: 1.15,
});

      const result = output[0]?.generated_text;

      if (Array.isArray(result)) {
        setAnswer(result[result.length - 1]?.content || "Não consegui gerar uma resposta.");
      } else {
        setAnswer(result || "Não consegui gerar uma resposta.");
      }
    } catch (error) {
  console.error(error);

  setAnswer(
    `Erro ao iniciar o modelo: ${
      error?.message || String(error)
    }`
  );
}
     finally {
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

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return Response.json(
        { error: "Descreva o projeto." },
        { status: 400 }
      );
    }

    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      instructions:
        "Você é o Meu Dev Robot, um agente de desenvolvimento. Analise o pedido do usuário e responda em português do Brasil. Nesta primeira versão, não execute alterações no projeto. Explique o que deve ser criado, liste as funcionalidades e proponha um plano de construção.",
      input: prompt,
    });

    return Response.json({
      text: response.output_text,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Não foi possível falar com a IA." },
      { status: 500 }
    );
  }
}

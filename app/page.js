export default function Home() {
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
          placeholder="Descreva o sistema ou site que você quer criar..."
        />

        <button className="robot-button">
          Criar projeto
        </button>
      </div>
    </main>
  );
}

export function Hero() {
  return (
    <section className="hero">
      <span className="badge">Ke Trancas</span>
      <h1 style={{ margin: 0, fontSize: 38, lineHeight: 1.1 }}>
        Trancas, cuidados e produtos com curadoria para cabelo real.
      </h1>
      <p className="muted" style={{ margin: 0, maxWidth: 680 }}>
        Catalogo objetivo, videos praticos e recomendacoes claras para rotina de manutencao.
      </p>
      <div>
        <a className="btn" href="/catalogo">
          Ver catalogo
        </a>
      </div>
    </section>
  );
}

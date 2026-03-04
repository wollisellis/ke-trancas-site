const ITEMS = [
  { icon: '🙌', title: 'Trança sem dor', sub: 'Cuidado do começo ao fim' },
  { icon: '💛', title: '100+ clientes', sub: 'Em Limeira e região, SP' },
  { icon: '💬', title: 'Fala com a Claudeth', sub: 'WhatsApp direto, sem robô' },
  { icon: '🔁', title: 'Troca em 7 dias', sub: 'Sem burocracia' },
];

export function TrustBar() {
  return (
    <div className="trust-bar">
      <div className="container">
        <div className="trust-bar-inner">
          {ITEMS.map((item) => (
            <div key={item.title} className="trust-bar-item">
              <span className="trust-bar-icon">{item.icon}</span>
              <div>
                <strong className="trust-bar-title">{item.title}</strong>
                <p className="trust-bar-sub">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

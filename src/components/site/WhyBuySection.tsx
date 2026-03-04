import { CMSReason } from '@/types/cms';

type WhyBuySectionProps = {
  reasons: CMSReason[];
};

export function WhyBuySection({ reasons }: WhyBuySectionProps) {
  if (!reasons || reasons.length === 0) return null;

  return (
    <section className="container section-space">
      <div className="section-head">
        <h2>Por que a Ke Tranças?</h2>
      </div>
      <div className="why-grid">
        {reasons.map((reason, i) => (
          <div key={i} className="why-card card">
            <span className="why-icon">{reason.icon}</span>
            <h3>{reason.title}</h3>
            <p className="muted">{reason.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

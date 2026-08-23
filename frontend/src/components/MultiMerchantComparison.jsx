import React, { useState, useEffect } from 'react';
import { ShoppingBag, Award, ArrowRight, ShieldCheck, Zap, RefreshCw, Star, CheckCircle2, Store, Sparkles } from 'lucide-react';

const PRESET_SEARCHES = [
  "Mechanical Keyboard",
  "ANC Headphones",
  "USB-C Dock",
  "Desk Mat"
];

export function MultiMerchantComparison({ onExecutePurchase, onSelectTab }) {
  const [query, setQuery] = useState(PRESET_SEARCHES[0]);
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchComparison = async (searchQuery) => {
    const q = searchQuery || query;
    setLoading(true);
    try {
      const res = await fetch(`/api/catalog/compare?query=${encodeURIComponent(q)}`);
      const data = await res.json();
      setComparison(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComparison(PRESET_SEARCHES[0]);
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (!query.trim()) return;
    fetchComparison(query);
  };

  const handleQuickBuy = (product, merchantName) => {
    onExecutePurchase({
      user_prompt: `Buy ${product.name} from ${merchantName} under ₹5,000`,
      spending_policy: {
        max_budget_inr: 5000,
        max_shipping_inr: 250,
        allowed_categories: ['Electronics', 'Peripherals', 'Accessories'],
        require_warranty: true,
        allow_bundle_upsell: true
      },
      include_upsell_bundle: true,
      force_failure_simulation: null
    });
    if (onSelectTab) onSelectTab('studio');
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 36px' }}>
      {/* Header & Federated Search Bar */}
      <div className="glass-panel animate-slide-up" style={{ padding: '26px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '18px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #00d2d3, #6366f1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(0, 210, 211, 0.3)'
              }}>
                <Store size={20} color="#04131d" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
                  Multi-Merchant Deal Engine & Price Matrix
                </h2>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Federated search across registered Razorpay merchants to automatically highlight best-in-class pricing.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {PRESET_SEARCHES.map((ps, idx) => (
              <button
                key={idx}
                onClick={() => { setQuery(ps); fetchComparison(ps); }}
                className={query === ps ? 'btn-primary' : 'btn-secondary'}
                style={{ fontSize: '0.75rem', padding: '6px 14px', borderRadius: '20px' }}
              >
                {ps}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across all 3 merchant inventories (e.g. 'keyboard', 'headphones', 'dock')..."
            style={{
              flex: 1,
              background: 'rgba(0, 0, 0, 0.45)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '14px',
              padding: '13px 20px',
              color: 'var(--text-main)',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
          <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '0 24px', borderRadius: '14px' }}>
            {loading ? <RefreshCw size={16} className="pulse-active" /> : 'Compare Deals'}
          </button>
        </form>
      </div>

      {/* Comparison Results */}
      {comparison && comparison.comparison && (
        <div className="animate-slide-up">
          {/* Best Deal Winner Callout */}
          {comparison.best_deal && (
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(0, 210, 211, 0.16), rgba(16, 185, 129, 0.16))',
                border: '1px solid rgba(0, 210, 211, 0.45)',
                borderRadius: '18px',
                padding: '22px 28px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '18px',
                boxShadow: '0 10px 30px rgba(0, 210, 211, 0.15)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '50px', height: '50px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, #00d2d3, #10b981)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 6px 20px rgba(0, 210, 211, 0.45)'
                }}>
                  <Award size={26} color="#04131d" />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge badge-success" style={{ fontSize: '0.72rem' }}>
                      🥇 Agent Best Deal Winner
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      From <strong>{comparison.best_deal.merchant_name}</strong>
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginTop: '4px', letterSpacing: '-0.02em' }}>
                    {comparison.best_deal.product.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '6px' }}>
                    <span className="text-mono" style={{ color: '#34d399', fontWeight: '800', fontSize: '1.1rem' }}>
                      ₹{comparison.best_deal.total_cost_inr?.toLocaleString('en-IN')} All-In
                    </span>
                    {comparison.savings_vs_worst > 0 && (
                      <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>
                        Save ₹{comparison.savings_vs_worst?.toLocaleString('en-IN')} vs. Competition
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleQuickBuy(comparison.best_deal.product, comparison.best_deal.merchant_name)}
                className="btn-primary"
                style={{ padding: '12px 24px', fontSize: '0.88rem' }}
              >
                <ShieldCheck size={16} /> Instant Bounded Buy
              </button>
            </div>
          )}

          {/* Cards for all compared merchants */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px'
          }}>
            {comparison.comparison.map((item, idx) => {
              const isWinner = comparison.best_deal?.merchant_id === item.merchant_id;
              const prod = item.product;

              return (
                <div
                  key={idx}
                  className="glass-panel"
                  style={{
                    padding: '22px',
                    borderColor: isWinner ? 'rgba(0, 210, 211, 0.4)' : 'var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = isWinner ? 'rgba(0, 210, 211, 0.6)' : 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = isWinner ? 'rgba(0, 210, 211, 0.4)' : 'var(--border-subtle)';
                  }}
                >
                  <div>
                    {/* Merchant Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '10px', height: '10px', borderRadius: '50%',
                          background: item.merchant_color || 'var(--brand-primary)',
                          boxShadow: `0 0 8px ${item.merchant_color || 'var(--brand-primary)'}`
                        }} />
                        <span style={{ fontWeight: '800', fontSize: '0.9rem' }}>{item.merchant_name}</span>
                      </div>
                      <span className="badge badge-secondary" style={{ fontSize: '0.68rem' }}>
                        {item.merchant_badge}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1rem', fontWeight: '700', lineHeight: '1.4', marginBottom: '10px' }}>
                      {prod.name}
                    </h4>

                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.55', marginBottom: '16px' }}>
                      {prod.description}
                    </p>

                    {/* Specs / Badges */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '18px' }}>
                      <span className="badge badge-secondary" style={{ fontSize: '0.68rem' }}>
                        ⭐ {prod.rating || 4.8} / 5
                      </span>
                      <span className="badge badge-secondary" style={{ fontSize: '0.68rem' }}>
                        🛡️ {prod.warranty_months} Mo Warranty
                      </span>
                      <span className="badge badge-secondary" style={{ fontSize: '0.68rem' }}>
                        📦 {prod.shipping_tier} (₹{prod.shipping_cost_inr})
                      </span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Total Delivered Price:</div>
                      <div className="text-mono" style={{ fontSize: '1.25rem', fontWeight: '800', color: isWinner ? '#34d399' : 'var(--text-main)' }}>
                        ₹{item.total_cost_inr?.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <button
                      onClick={() => handleQuickBuy(prod, item.merchant_name)}
                      className={isWinner ? 'btn-primary' : 'btn-secondary'}
                      style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                    >
                      <ArrowRight size={14} /> Buy on Razorpay
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

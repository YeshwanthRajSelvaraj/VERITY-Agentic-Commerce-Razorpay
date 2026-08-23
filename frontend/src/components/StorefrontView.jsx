import React, { useState, useEffect } from 'react';
import { ShoppingBag, ShieldCheck, Zap, AlertTriangle, RefreshCw, Star, Filter } from 'lucide-react';

export function StorefrontView({ activeDrift }) {
  const [products, setProducts] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [selectedMerchant, setSelectedMerchant] = useState('all');
  const [loading, setLoading] = useState(false);

  const fetchStoreData = async () => {
    setLoading(true);
    try {
      const [prodRes, merchRes] = await fetchAllStoreData();
      setProducts(prodRes);
      setMerchants(merchRes);
    } catch (e) {
      console.error("Error loading store:", e);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllStoreData = async () => {
    const [pRes, mRes] = await Promise.all([
      fetch('/api/catalog/products' + (selectedMerchant !== 'all' ? `?merchant_id=${selectedMerchant}` : '')),
      fetch('/api/catalog/merchants')
    ]);
    return [await pRes.json(), await mRes.json()];
  };

  useEffect(() => {
    fetchStoreData();
  }, [selectedMerchant, activeDrift]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 32px' }}>
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>
              Razorpay Multi-Merchant Federated Network
            </h2>
            <span className="badge badge-primary">Agent-Readable Schema</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Live inventories exposed via machine-readable JSON schema, enabling AI autonomous search, quoting, and checkout.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Merchant Filter Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '10px' }}>
            <button
              onClick={() => setSelectedMerchant('all')}
              className={selectedMerchant === 'all' ? 'btn-primary' : 'btn-secondary'}
              style={{ fontSize: '0.75rem', padding: '6px 12px' }}
            >
              All Merchants ({products.length})
            </button>
            {merchants.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMerchant(m.id)}
                className={selectedMerchant === m.id ? 'btn-primary' : 'btn-secondary'}
                style={{ fontSize: '0.75rem', padding: '6px 12px' }}
              >
                {m.name}
              </button>
            ))}
          </div>

          <button onClick={fetchStoreData} className="btn-secondary" style={{ padding: '8px' }}>
            <RefreshCw size={16} className={loading ? 'pulse-active' : ''} />
          </button>
        </div>
      </div>

      {/* Catalog Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '24px'
      }}>
        {products.map((prod) => {
          const isSpiked = activeDrift === 'PRICE_SPIKE' && prod.id === 'nt_kb_01';
          const isOOS = (activeDrift === 'OUT_OF_STOCK' && prod.id === 'nt_kb_01') || prod.stock_count === 0;

          return (
            <div
              key={prod.id}
              className="glass-panel"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderColor: isSpiked || isOOS ? 'rgba(239, 68, 68, 0.4)' : 'var(--border-subtle)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Drift Badge */}
              {isSpiked && (
                <div style={{ position: 'absolute', top: '12px', right: '12px' }} className="badge badge-danger">
                  <AlertTriangle size={12} /> Active Price Spike (+₹1,600)
                </div>
              )}
              {isOOS && (
                <div style={{ position: 'absolute', top: '12px', right: '12px' }} className="badge badge-danger">
                  <AlertTriangle size={12} /> Stock Zero
                </div>
              )}

              <div>
                {/* Category & Merchant Tag */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                    {prod.category}
                  </span>
                  <span className="badge badge-secondary" style={{ fontSize: '0.7rem' }}>
                    {prod.merchant_name}
                  </span>
                  <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                    ⭐ {prod.rating || 4.8}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', lineHeight: '1.3', marginBottom: '8px' }}>
                  {prod.name}
                </h3>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '16px' }}>
                  {prod.description}
                </p>

                {/* Specs Box */}
                <div style={{
                  background: 'rgba(0, 0, 0, 0.25)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  marginBottom: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  {Object.entries(prod.specs || {}).map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                      <span style={{ color: 'var(--text-dim)' }}>{k}:</span>
                      <span className="text-mono" style={{ color: 'var(--text-main)', fontWeight: '600' }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Upsell Opportunity */}
                {prod.upsell_bundle && (
                  <div style={{
                    marginTop: '12px',
                    padding: '10px 12px',
                    background: 'rgba(0, 210, 211, 0.08)',
                    borderRadius: '10px',
                    border: '1px dashed rgba(0, 210, 211, 0.3)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: '700', color: 'var(--brand-primary)' }}>
                      <Zap size={14} /> Available Upsell Bundle:
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-main)', marginTop: '2px' }}>
                      {prod.upsell_bundle.name} (+₹{prod.upsell_bundle.bundle_price_inr?.toLocaleString('en-IN')})
                    </p>
                  </div>
                )}
              </div>

              {/* Price & Razorpay Badge */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '1.35rem', fontWeight: '800', color: isSpiked ? '#f87171' : 'var(--text-main)' }}>
                      ₹{prod.price_inr.toLocaleString('en-IN')}
                    </span>
                    {prod.original_price_inr > prod.price_inr && (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textDecoration: 'line-through' }}>
                        ₹{prod.original_price_inr.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Shipping: {prod.shipping_tier} (₹{prod.shipping_cost_inr})
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-success" style={{ fontSize: '0.72rem' }}>
                    <ShieldCheck size={12} /> Razorpay Test API
                  </span>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                    Stock: {prod.stock_count} units
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

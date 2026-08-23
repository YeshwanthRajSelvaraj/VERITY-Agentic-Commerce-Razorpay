import React, { useState } from 'react';
import { Key, ShieldCheck, Check, X, CreditCard, ExternalLink, Zap } from 'lucide-react';

export function RazorpayConfigModal({ isOpen, onClose }) {
  const [keyId, setKeyId] = useState('');
  const [keySecret, setKeySecret] = useState('');
  const [webhookSecret, setWebhookSecret] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  if (!isOpen) return null;

  const handleSave = async (e) => {
    e?.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch('/api/agent/razorpay/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key_id: keyId || "rzp_test_mock_builder2026",
          key_secret: keySecret || "sec_mock_builder_secret2026",
          webhook_secret: webhookSecret || "whsec_mock_builder2026"
        })
      });
      const data = await res.json();
      setSaveStatus(data);
      setTimeout(() => {
        onClose();
        setSaveStatus(null);
      }, 1200);
    } catch (e) {
      console.error('Config update error:', e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(4, 19, 29, 0.85)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }}>
      <div className="glass-panel animate-slide-up" style={{
        maxWidth: '540px', width: '100%', padding: '28px',
        border: '1px solid rgba(0, 210, 211, 0.35)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #00d2d3, #0284c7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Key size={20} color="#04131d" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800' }}>Razorpay Test Mode Rails</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Configure live test API keys or use the built-in simulator
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Razorpay Key ID (rzp_test_...)
            </label>
            <input
              type="text"
              value={keyId}
              onChange={(e) => setKeyId(e.target.value)}
              placeholder="e.g. rzp_test_mock_builder2026 or your RZP test key"
              style={{
                width: '100%', padding: '10px 14px', borderRadius: '8px',
                background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-subtle)',
                color: 'var(--text-main)', fontSize: '0.85rem', outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Razorpay Key Secret
            </label>
            <input
              type="password"
              value={keySecret}
              onChange={(e) => setKeySecret(e.target.value)}
              placeholder="e.g. sec_mock_builder_secret2026"
              style={{
                width: '100%', padding: '10px 14px', borderRadius: '8px',
                background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-subtle)',
                color: 'var(--text-main)', fontSize: '0.85rem', outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Webhook HMAC Secret
            </label>
            <input
              type="password"
              value={webhookSecret}
              onChange={(e) => setWebhookSecret(e.target.value)}
              placeholder="e.g. whsec_mock_builder2026"
              style={{
                width: '100%', padding: '10px 14px', borderRadius: '8px',
                background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-subtle)',
                color: 'var(--text-main)', fontSize: '0.85rem', outline: 'none'
              }}
            />
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.1)', padding: '10px 14px', borderRadius: '8px',
            border: '1px solid rgba(16, 185, 129, 0.25)', fontSize: '0.72rem', color: '#34d399'
          }}>
            ✓ High-Fidelity Test Mode Simulator is active by default. If no custom keys are provided, orders, webhooks, and HMAC checks operate with zero friction.
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
            <button
              type="submit"
              disabled={isSaving}
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center', padding: '11px', fontSize: '0.88rem' }}
            >
              {isSaving ? 'Updating...' : saveStatus ? '✓ Config Updated!' : 'Save & Activate Test Rails'}
            </button>
            <button type="button" onClick={onClose} className="btn-secondary" style={{ padding: '11px 16px' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

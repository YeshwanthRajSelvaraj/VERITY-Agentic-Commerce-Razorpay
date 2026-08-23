import React, { useState } from 'react';
import { Bot, Send, Sliders, Shield, Sparkles, AlertCircle, CheckCircle2, ArrowRight, Lock, Zap } from 'lucide-react';
import { LiveExecutionTrace } from './LiveExecutionTrace';

const PRESET_PROMPTS = [
  "Buy a wireless mechanical keyboard for coding under ₹4,500",
  "Procure an active noise-cancelling headset for deep work",
  "Get an 11-in-1 USB-C dual 4K dock for developer setup",
  "Order an ergonomic merino leather desk pad"
];

export function BuyerAgentStudio({ onExecutePurchase, executionResponse, isRunning, onTriggerCheckout }) {
  const [prompt, setPrompt] = useState(PRESET_PROMPTS[0]);
  const [maxBudget, setMaxBudget] = useState(4500);
  const [maxShipping, setMaxShipping] = useState(200);
  const [includeUpsell, setIncludeUpsell] = useState(true);
  const [allowedCategories, setAllowedCategories] = useState(['Electronics', 'Peripherals', 'Accessories']);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!prompt.trim() || isRunning) return;

    onExecutePurchase({
      user_prompt: prompt,
      spending_policy: {
        max_budget_inr: parseFloat(maxBudget),
        max_shipping_inr: parseFloat(maxShipping),
        allowed_categories: allowedCategories,
        require_warranty: true,
        allow_bundle_upsell: includeUpsell
      },
      include_upsell_bundle: includeUpsell,
      force_failure_simulation: null
    });
  };

  return (
    <div style={{ padding: '0 24px 32px', display: 'grid', gridTemplateColumns: '1.05fr 1.35fr', gap: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Left Column: Directive & Policy Guardrails */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Directive Box */}
        <div className="glass-panel animate-slide-up" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #00d2d3, #0284c7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Bot size={18} color="#04131d" />
              </div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: '800', letterSpacing: '-0.02em' }}>Autonomous Buyer Directive</h2>
            </div>
            <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>Agent Prompt</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ position: 'relative' }}>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Instruct your AI buyer agent (e.g. 'Buy a mechanical keyboard for programming under ₹4,500')..."
                rows={3}
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.45)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '14px',
                  padding: '14px 16px',
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  resize: 'none',
                  outline: 'none',
                  lineHeight: '1.5',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--brand-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
              />
            </div>

            {/* Presets */}
            <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {PRESET_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPrompt(p)}
                  style={{
                    background: prompt === p ? 'rgba(0, 210, 211, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                    color: prompt === p ? 'var(--brand-primary)' : 'var(--text-muted)',
                    border: prompt === p ? '1px solid var(--brand-primary)' : '1px solid rgba(255,255,255,0.06)',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    fontWeight: '500'
                  }}
                >
                  {p.slice(0, 36)}...
                </button>
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isRunning}
              className="btn-primary"
              style={{
                width: '100%',
                marginTop: '18px',
                justifyContent: 'center',
                padding: '12px 20px',
                fontSize: '0.92rem',
                opacity: isRunning ? 0.7 : 1
              }}
            >
              {isRunning ? (
                <>
                  <Sparkles size={18} className="pulse-active" /> Executing Bounded Purchase...
                </>
              ) : (
                <>
                  <Send size={18} /> Run Autonomous Purchase
                </>
              )}
            </button>
          </form>
        </div>

        {/* Policy Guardrails Panel */}
        <div className="glass-panel animate-slide-up" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Shield size={18} color="#34d399" />
              </div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: '800', letterSpacing: '-0.02em' }}>Spending Policy Invariants</h2>
            </div>
            <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
              <Lock size={11} /> Mathematical Gate
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Max Budget Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Max Budget Ceiling:</span>
                <span className="text-mono" style={{ fontWeight: '800', color: 'var(--brand-primary)', fontSize: '1rem' }}>
                  ₹{parseInt(maxBudget).toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="10000"
                step="100"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                style={{ width: '100%', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                <span>₹1,000</span>
                <span>₹5,000</span>
                <span>₹10,000</span>
              </div>
            </div>

            {/* Max Shipping Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Max Allowed Shipping:</span>
                <span className="text-mono" style={{ fontWeight: '800', color: '#38bdf8', fontSize: '0.95rem' }}>
                  ₹{maxShipping}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                step="50"
                value={maxShipping}
                onChange={(e) => setMaxShipping(e.target.value)}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>

            {/* Bundle Upsell Toggle */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)'
            }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>Allow Merchant Upsell Bundles</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Auto-accept accessory bundle if within budget limit</div>
              </div>
              <input
                type="checkbox"
                checked={includeUpsell}
                onChange={(e) => setIncludeUpsell(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--brand-primary)', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Live Execution Stream & Order Card */}
      <div>
        <LiveExecutionTrace 
          executionResponse={executionResponse} 
          isRunning={isRunning}
          onTriggerCheckout={onTriggerCheckout}
        />
      </div>
    </div>
  );
}

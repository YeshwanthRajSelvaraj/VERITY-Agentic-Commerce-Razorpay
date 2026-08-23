import React, { useState, useEffect } from 'react';
import { Zap, Cpu, ShieldCheck, Activity, ArrowRight, CheckCircle2, TrendingUp, AlertTriangle, RefreshCw, Layers, Server, Sparkles } from 'lucide-react';

export function VulcanTelemetryView() {
  const [telemetry, setTelemetry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [simAmount, setSimAmount] = useState(4500);
  const [simMerchant, setSimMerchant] = useState('NovaTech Gear (Verified)');
  const [simResult, setSimResult] = useState(null);
  const [evaluating, setEvaluating] = useState(false);

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 15000);
    return () => clearInterval(interval);
  }, []);

  const fetchTelemetry = async () => {
    try {
      const res = await fetch('/api/agent/vulcan/telemetry');
      const data = await res.json();
      setTelemetry(data);
    } catch (e) {
      console.error('Error fetching Vulcan telemetry:', e);
    }
  };

  const handleSimulateInference = () => {
    setEvaluating(true);
    setTimeout(() => {
      const amount = parseFloat(simAmount);
      const isHigh = amount > 7000;
      const risk = isHigh ? 0.16 : 0.04;
      const rail = amount <= 5000 ? "UPI_AUTOPAY_FASTPATH" : "HDFC_DIRECT_ACQUIRER";
      const successRate = amount <= 5000 ? 99.4 : 98.6;

      setSimResult({
        amount,
        rail,
        successRate,
        riskScore: risk,
        verdict: risk < 0.15 ? "CLEARED_LOW_RISK" : "ELEVATED_WATCH",
        signalsCount: 3142,
        latencyMs: (Math.random() * 4 + 9.5).toFixed(1),
        method: amount <= 5000 ? "Razorpay Turbo UPI (1-Click Mandate)" : "Corporate Smart EMI Routing"
      });
      setEvaluating(false);
    }, 400);
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px 36px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel animate-slide-up" style={{ padding: '24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #f97316 0%, #ef4444 50%, #dc2626 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(249, 115, 22, 0.4)'
          }}>
            <Zap size={24} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
                Razorpay Vulcan™ AI Foundation Intelligence
              </h2>
              <span className="badge badge-primary" style={{ background: 'rgba(249, 115, 22, 0.2)', color: '#fb923c', border: '1px solid rgba(249, 115, 22, 0.4)', fontSize: '0.68rem' }}>
                Transformer v2.4
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              India's first payment foundation model (NVIDIA + AWS) — 4B+ payment events, 3T data points, 3,142 signals/tx
            </p>
          </div>
        </div>

        <button
          onClick={fetchTelemetry}
          className="btn-secondary"
          style={{ padding: '8px 14px', fontSize: '0.78rem' }}
        >
          <RefreshCw size={14} /> Refresh Network Stream
        </button>
      </div>

      {/* KPI Highlights Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '24px' }}>
        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #f97316' }}>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Network Success Lift</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#f97316', marginTop: '6px' }}>
            +9.4% Uplift
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>vs Traditional Static Routing</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #34d399' }}>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fraud Interception</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#34d399', marginTop: '6px' }}>
            8.2x Protection
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>Real-time International Card Anomaly</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #38bdf8' }}>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Inference Latency</div>
          <div className="text-mono" style={{ fontSize: '1.5rem', fontWeight: '800', color: '#38bdf8', marginTop: '6px' }}>
            11.4 ms
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>3,142 signals analyzed / tx</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #a855f7' }}>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Agent Clearance Rate</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#a855f7', marginTop: '6px' }}>
            99.8% Cleared
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>Autonomous Bounded Procurement</div>
        </div>
      </div>

      {/* Main 2-Column Grid: Acquirer Health & Live Simulator */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        
        {/* Left: Dynamic Acquirer Routing Matrix */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Server size={18} color="#f97316" /> Multi-Acquirer Real-Time Telemetry
            </h3>
            <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Live Auto-Failover</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {telemetry?.active_acquirers && Object.entries(telemetry.active_acquirers).map(([key, acq]) => (
              <div
                key={key}
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#e0f2fe' }}>
                    {key.replace('_', ' ')}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                    Latency: <strong className="text-mono" style={{ color: '#94a3b8' }}>{acq.latency_ms}ms</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '800', color: acq.success_rate >= 0.95 ? '#34d399' : '#fbbf24', fontSize: '0.92rem' }}>
                      {(acq.success_rate * 100).toFixed(1)}% Success
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>Predicted Yield</div>
                  </div>

                  <span
                    className={`badge ${acq.status === 'OPTIMAL' ? 'badge-success' : 'badge-warning'}`}
                    style={{ fontSize: '0.68rem' }}
                  >
                    {acq.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Interactive Vulcan Inference Simulator */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '18px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#fb923c', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Sparkles size={18} /> Test Vulcan Transformer Routing
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  Order Amount (INR):
                </label>
                <input
                  type="number"
                  value={simAmount}
                  onChange={(e) => setSimAmount(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    color: '#fff',
                    fontFamily: 'var(--font-mono)'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  Target Merchant:
                </label>
                <select
                  value={simMerchant}
                  onChange={(e) => setSimMerchant(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    color: '#fff'
                  }}
                >
                  <option>NovaTech Gear (Verified Tier 1)</option>
                  <option>ByteForge Labs (Standard)</option>
                  <option>DevDesk Supplies (Budget Seller)</option>
                </select>
              </div>

              <button
                onClick={handleSimulateInference}
                disabled={evaluating}
                className="btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
                  justifyContent: 'center',
                  padding: '12px',
                  fontWeight: '700',
                  marginTop: '6px'
                }}
              >
                {evaluating ? <RefreshCw size={16} className="pulse-active" /> : <Zap size={16} />}
                <span>{evaluating ? 'Running Payment Transformer...' : 'Run Vulcan 3,142 Signal Analysis'}</span>
              </button>
            </div>
          </div>

          {simResult ? (
            <div style={{ background: 'rgba(0,0,0,0.35)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(249, 115, 22, 0.3)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: '#fb923c', fontWeight: '700' }}>
                  Vulcan AI Routing Verdict:
                </span>
                <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>
                  {simResult.verdict}
                </span>
              </div>

              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                Optimal Rail: <strong style={{ color: '#38bdf8' }}>{simResult.rail}</strong>
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                Predicted Success: <strong style={{ color: '#34d399' }}>{simResult.successRate}%</strong> (Inference: {simResult.latencyMs}ms)
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                Recommended Method: <strong style={{ color: '#f8fafc' }}>{simResult.method}</strong>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '16px', color: 'var(--text-dim)', fontSize: '0.78rem' }}>
              Click 'Run Vulcan 3,142 Signal Analysis' to test neural payment routing.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

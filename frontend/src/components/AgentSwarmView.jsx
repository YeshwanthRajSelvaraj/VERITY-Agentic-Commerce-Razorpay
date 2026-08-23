import React, { useState, useEffect } from 'react';
import { Bot, Cpu, Sparkles, Shield, Send, ArrowRight, CheckCircle2, Zap, Layers, Activity, RefreshCw, Lock, Store, CreditCard } from 'lucide-react';

export function AgentSwarmView({ onSelectTab, onExecutePurchase }) {
  const [agents, setAgents] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('HuggingFaceTB/SmolLM2-1.7B-Instruct');
  const [testPrompt, setTestPrompt] = useState('Procure a wireless tactile keyboard with brown switches under ₹4,200 for programming');
  const [analyzing, setAnalyzing] = useState(false);
  const [semanticProfile, setSemanticProfile] = useState(null);
  const [activeTab, setActiveMeshTab] = useState('swarm'); // 'swarm' | 'parser'

  useEffect(() => {
    fetchSwarmData();
  }, []);

  const fetchSwarmData = async () => {
    try {
      const [swarmRes, modelsRes] = await Promise.all([
        fetch('/api/agent/swarm'),
        fetch('/api/agent/hf-models')
      ]);
      const swarmData = await swarmRes.json();
      const modelsData = await modelsRes.json();
      setAgents(swarmData);
      setModels(modelsData);
    } catch (e) {
      console.error('Error fetching swarm status:', e);
    }
  };

  const handleAnalyzeIntent = async () => {
    if (!testPrompt.trim() || analyzing) return;
    setAnalyzing(true);
    try {
      const res = await fetch('/api/agent/semantic-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: testPrompt, model_id: selectedModel })
      });
      const data = await res.json();
      setSemanticProfile(data);
    } catch (e) {
      console.error('Error analyzing intent:', e);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleLaunchToBuyerAgent = () => {
    if (!semanticProfile) return;
    onExecutePurchase({
      user_prompt: testPrompt,
      spending_policy: {
        max_budget_inr: semanticProfile.inferred_budget_inr || 5000,
        max_shipping_inr: 200,
        allowed_categories: [semanticProfile.target_category || 'Electronics', 'Peripherals', 'Accessories'],
        require_warranty: true,
        allow_bundle_upsell: true
      },
      include_upsell_bundle: true,
      force_failure_simulation: null
    });
    if (onSelectTab) onSelectTab('studio');
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px 36px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel animate-slide-up" style={{ padding: '24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(251, 191, 36, 0.3)'
            }}>
              <Cpu size={22} color="#04131d" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '10px' }}>
                Hugging Face AI Agent Mesh & Inference Swarm
              </h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Specialized multi-agent architecture coordinating intent reasoning, federated search, PQC signing, and Razorpay settlement
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => setActiveMeshTab('swarm')}
              className={activeTab === 'swarm' ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '6px 14px', fontSize: '0.78rem', border: 'none' }}
            >
              <Layers size={14} /> 6-Agent Swarm Topology
            </button>
            <button
              onClick={() => setActiveMeshTab('parser')}
              className={activeTab === 'parser' ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '6px 14px', fontSize: '0.78rem', border: 'none' }}
            >
              <Sparkles size={14} /> HF Model Sandbox
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'swarm' ? (
        /* 6-Agent Swarm Grid */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px' }}>
          {agents.map((agent, idx) => (
            <div
              key={agent.agent_id || idx}
              className="glass-panel animate-slide-up"
              style={{
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px',
                position: 'relative',
                overflow: 'hidden',
                borderLeft: `4px solid ${agent.color || 'var(--brand-primary)'}`
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span className="text-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                    AGENT #{idx + 1}
                  </span>
                  <span className="badge badge-success" style={{ fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Activity size={10} /> {agent.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#f8fafc', marginBottom: '4px' }}>
                  {agent.role}
                </h3>
                
                <div style={{ fontSize: '0.75rem', color: agent.color || 'var(--brand-primary)', fontWeight: '600', marginBottom: '10px' }}>
                  ⚡ Engine: {agent.engine}
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  {agent.description}
                </p>
              </div>

              <div style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '10px 14px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.74rem'
              }}>
                <span style={{ color: 'var(--text-dim)' }}>Mesh ID:</span>
                <span className="text-mono" style={{ color: '#94a3b8' }}>{agent.agent_id}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Hugging Face Model Sandbox & Intent Extraction */
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '24px' }}>
          
          {/* Left: Configuration & Prompting */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>
                Select Hugging Face Inference Model:
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {models.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setSelectedModel(m.id)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      background: selectedModel === m.id ? 'rgba(251, 191, 36, 0.12)' : 'rgba(0,0,0,0.25)',
                      border: `1px solid ${selectedModel === m.id ? '#fbbf24' : 'var(--border-subtle)'}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '0.88rem', color: selectedModel === m.id ? '#fbbf24' : 'var(--text-main)' }}>
                        {m.name}
                      </div>
                      <div className="text-mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                        {m.id}
                      </div>
                    </div>
                    <span className="badge badge-primary" style={{ fontSize: '0.68rem' }}>
                      ⚡ {m.latency_ms}ms
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>
                Natural Language Procurement Directive:
              </label>
              <textarea
                value={testPrompt}
                onChange={(e) => setTestPrompt(e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.45)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  color: 'var(--text-main)',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
            </div>

            <button
              onClick={handleAnalyzeIntent}
              disabled={analyzing}
              className="btn-primary"
              style={{ justifyContent: 'center', padding: '12px', background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)', color: '#04131d', fontWeight: '800' }}
            >
              {analyzing ? <RefreshCw size={16} className="pulse-active" /> : <Sparkles size={16} />}
              <span>{analyzing ? 'Reasoning with Hugging Face Model...' : 'Parse Semantic Procurement Intent'}</span>
            </button>
          </div>

          {/* Right: Parsed Intent Profile & Actions */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {semanticProfile ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#34d399', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={18} /> Inferred Semantic Profile
                  </h3>
                  <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                    Confidence: {(semanticProfile.intent_confidence * 100).toFixed(0)}%
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>Target Product:</span>
                    <div style={{ fontWeight: '700', fontSize: '0.92rem', color: '#e0f2fe' }}>{semanticProfile.intended_product}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>Target Category:</span>
                    <div style={{ fontWeight: '700', fontSize: '0.92rem', color: '#38bdf8' }}>{semanticProfile.target_category}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>Inferred Budget:</span>
                    <div className="text-mono" style={{ fontWeight: '800', fontSize: '1rem', color: '#34d399' }}>
                      ₹{semanticProfile.inferred_budget_inr?.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>Price Sensitivity:</span>
                    <div style={{ fontWeight: '700', fontSize: '0.88rem', color: '#fbbf24' }}>{semanticProfile.price_sensitivity}</div>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: '600' }}>Extracted Requirement Features:</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                    {semanticProfile.extracted_features?.map((f, i) => (
                      <span key={i} className="badge badge-primary" style={{ fontSize: '0.72rem' }}>
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>Inference Reasoning Summary:</div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', marginTop: '4px', lineHeight: '1.4' }}>
                    {semanticProfile.reasoning_summary}
                  </p>
                  <div className="text-mono" style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: '6px' }}>
                    Provider: {semanticProfile.model_provider}
                  </div>
                </div>

                <button
                  onClick={handleLaunchToBuyerAgent}
                  className="btn-primary"
                  style={{ justifyContent: 'center', width: '100%', padding: '12px', fontSize: '0.9rem' }}
                >
                  <Send size={16} /> Dispatch to Autonomous Buyer Agent Studio
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '320px', textAlign: 'center', gap: '12px' }}>
                <Cpu size={40} color="var(--text-dim)" />
                <h4 style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Awaiting Hugging Face Model Inference</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', maxWidth: '280px' }}>
                  Click 'Parse Semantic Procurement Intent' to test how SmolLM2 / Qwen parses unstructured queries into deterministic constraints.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

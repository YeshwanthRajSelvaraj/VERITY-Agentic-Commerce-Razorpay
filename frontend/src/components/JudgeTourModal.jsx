import React, { useState } from 'react';
import { X, Award, ChevronRight, ChevronLeft, Bot, Shield, Cpu, Zap, CreditCard, Sparkles, ArrowRight, Play, CheckCircle2 } from 'lucide-react';

const TOUR_STEPS = [
  {
    step: 1,
    title: "Multimodal Natural Language Intent",
    category: "Conversational In-App Commerce",
    icon: Bot,
    color: "#00d2d3",
    description: "Buyers express high-level natural language procurement requests or voice directives (e.g. 'Buy a wireless mechanical keyboard under ₹4,500'). Hugging Face open-weight models (SmolLM2 / Qwen-2.5) extract target specs, price sensitivity, and category invariants.",
    highlight: "Zero prompt hallucination — transforms freeform text into deterministic bounds."
  },
  {
    step: 2,
    title: "Multi-Merchant Federated Deal Hunter",
    category: "Agent-to-Agent Commerce & Discovery",
    icon: Sparkles,
    color: "#38bdf8",
    description: "VERITY queries a federated network of verified Razorpay merchant storefronts (NovaTech, ByteForge, DevDesk) via dense 64-dim vector embeddings to discover the cheapest delivered price and show buyer savings.",
    highlight: "Discovers best price across 3 merchants automatically in milliseconds."
  },
  {
    step: 3,
    title: "Deterministic Mathematical Invariant Gate",
    category: "Bounded & Explainable Action",
    icon: Shield,
    color: "#34d399",
    description: "Before moving a single rupee, the policy gate evaluates mathematical assertions: Total ≤ Max Budget, Shipping ≤ Cap, Category ∈ Whitelist. If a price surge or out-of-stock event occurs, it initiates a graceful counter-offer instead of crashing.",
    highlight: "Rigid mathematical safety guarantee: Not an LLM judgment call."
  },
  {
    step: 4,
    title: "NIST FIPS 204 Post-Quantum Mandate",
    category: "Quantum-Resilient Security & Audit",
    icon: Cpu,
    color: "#a855f7",
    description: "Every autonomous purchase mandate is signed using NIST FIPS 204 (ML-DSA-65 / Dilithium) lattice cryptography and hashed with SHA3-512 into an immutable Merkle ledger, defending against 20+ year 'Store Now, Decrypt Later' (SNDL) attacks.",
    highlight: "Dual-layer trust: Standard Razorpay rails + Post-Quantum non-repudiation."
  },
  {
    step: 5,
    title: "Razorpay Vulcan™ Payment Intelligence",
    category: "AI Foundation Model Integration",
    icon: Zap,
    color: "#f97316",
    description: "Leverages Razorpay's newest Transformer Foundation Model (NVIDIA + AWS, trained on 4B+ transactions). Evaluates 3,142 signals in 11ms to route through the highest-converting acquirer (+9.4% success lift) with 8.2x fraud defense.",
    highlight: "Sub-12ms payment transformer inference with real-time auto-failover."
  },
  {
    step: 6,
    title: "Razorpay Settlement & Explainable Audit",
    category: "Settlement & Compliance",
    icon: CreditCard,
    color: "#0284c7",
    description: "Creates Razorpay Orders API payloads with PQC public key metadata. Webhooks verify incoming HMAC-SHA256 signatures, and compliance officers can export full CSV/JSON audit trails and PDF certificates with 1 click.",
    highlight: "Production-ready Razorpay Test Key integration + 100% test coverage."
  }
];

export function JudgeTourModal({ isOpen, onClose, onSelectTab }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const current = TOUR_STEPS[currentStepIndex];
  const Icon = current.icon;
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === TOUR_STEPS.length - 1;

  const handleJumpToTab = () => {
    onClose();
    if (current.step === 1) onSelectTab('chat');
    else if (current.step === 2) onSelectTab('comparison');
    else if (current.step === 3) onSelectTab('studio');
    else if (current.step === 4) onSelectTab('studio');
    else if (current.step === 5) onSelectTab('vulcan');
    else if (current.step === 6) onSelectTab('metrics');
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(2, 6, 23, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '20px'
    }}>
      <div className="glass-panel animate-scale-in" style={{
        maxWidth: '680px', width: '100%',
        padding: '32px', borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)',
        position: 'relative',
        display: 'flex', flexDirection: 'column', gap: '22px'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '20px', right: '20px',
            background: 'rgba(255, 255, 255, 0.06)', border: 'none',
            borderRadius: '50%', width: '32px', height: '32px',
            color: 'var(--text-muted)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>

        {/* Header Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #fbbf24, #d97706)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Award size={20} color="#04131d" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
              VERITY ⚡ 90-Second Judge Tour
            </h2>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Step {current.step} of {TOUR_STEPS.length}: {current.category}
            </p>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {TOUR_STEPS.map((s, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentStepIndex(idx)}
              style={{
                flex: 1, height: '5px', borderRadius: '4px',
                background: idx <= currentStepIndex ? current.color : 'rgba(255, 255, 255, 0.1)',
                cursor: 'pointer', transition: 'all 0.2s ease'
              }}
            />
          ))}
        </div>

        {/* Step Content Box */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.4)',
          border: `1px solid ${current.color}40`,
          borderRadius: '16px',
          padding: '24px',
          display: 'flex', flexDirection: 'column', gap: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '12px',
              background: `${current.color}20`,
              border: `1px solid ${current.color}60`,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Icon size={22} color={current.color} />
            </div>
            <div>
              <span className="text-mono" style={{ fontSize: '0.7rem', color: current.color, fontWeight: '700' }}>
                ARCHITECTURE STEP #{current.step}
              </span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#fff', marginTop: '2px' }}>
                {current.title}
              </h3>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
            {current.description}
          </p>

          <div style={{
            background: `${current.color}15`,
            border: `1px solid ${current.color}30`,
            borderRadius: '10px',
            padding: '10px 14px',
            fontSize: '0.78rem',
            color: current.color,
            fontWeight: '600',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <Sparkles size={16} /> Key Innovation: {current.highlight}
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <button
            onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
            disabled={isFirst}
            className="btn-secondary"
            style={{ opacity: isFirst ? 0.4 : 1, padding: '10px 18px', fontSize: '0.85rem' }}
          >
            <ChevronLeft size={16} /> Previous
          </button>

          <button
            onClick={handleJumpToTab}
            className="btn-secondary"
            style={{ padding: '10px 18px', fontSize: '0.85rem', color: '#38bdf8' }}
          >
            <Play size={14} /> Open Live Screen
          </button>

          {isLast ? (
            <button
              onClick={onClose}
              className="btn-primary"
              style={{ padding: '10px 22px', fontSize: '0.85rem', background: 'linear-gradient(135deg, #34d399 0%, #059669 100%)', color: '#04131d', fontWeight: '800' }}
            >
              <CheckCircle2 size={16} /> Complete Tour
            </button>
          ) : (
            <button
              onClick={() => setCurrentStepIndex(prev => Math.min(TOUR_STEPS.length - 1, prev + 1))}
              className="btn-primary"
              style={{ padding: '10px 22px', fontSize: '0.85rem' }}
            >
              Next Step <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

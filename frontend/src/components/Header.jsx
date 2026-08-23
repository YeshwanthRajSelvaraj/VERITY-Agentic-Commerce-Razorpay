import React, { useState } from 'react';
import { Bot, ShieldCheck, Store, FileText, RefreshCw, Zap, MessageSquare, BarChart3, ArrowLeftRight, Sparkles, Cpu, Network, Award, Search, Command, Activity, Lock, Globe, ShieldAlert, ShoppingCart, BookOpen, Key } from 'lucide-react';

export function Header({ activeTab, setActiveTab, openAuditModal, onReset, onOpenTour, onOpenSearch, onOpenConfig }) {
  const tabs = [
    { id: 'chat', label: 'Buyer Chat', icon: MessageSquare, badge: 'Voice' },
    { id: 'studio', label: 'Agent Studio', icon: Bot, badge: 'PoPI' },
    { id: 'negotiate', label: 'A2A Arena', icon: ArrowLeftRight, badge: 'Save' },
    { id: 'cart', label: 'Smart Cart', icon: ShoppingCart, badge: 'Route' },
    { id: 'rag', label: 'RAG Intel', icon: BookOpen, badge: 'Docs' },
    { id: 'failures', label: 'Failure Suite', icon: ShieldCheck, badge: '5 Tests' },
    { id: 'comparison', label: 'Deal Hunter', icon: Sparkles },
    { id: 'store', label: '3 Merchants', icon: Store },
    { id: 'metrics', label: 'Growth Metrics', icon: BarChart3 },
    { id: 'gaps', label: 'RZP Gaps', icon: ShieldAlert, badge: 'Fix' },
    { id: 'swarm', label: 'AI Swarm', icon: Cpu, badge: 'HF' },
    { id: 'neural', label: 'Neural ML', icon: Network, badge: 'DL' },
    { id: 'vulcan', label: 'Vulcan AI', icon: Zap, badge: 'RZP' },
  ];

  return (
    <div style={{ margin: '12px 24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      
      {/* Enterprise System Telemetry Ribbon */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '4px 16px',
        background: 'rgba(0, 0, 0, 0.4)',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        fontSize: '0.7rem',
        color: 'var(--text-dim)',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399' }} />
            <span style={{ color: '#cbd5e1', fontWeight: '600' }}>Razorpay Test Rails:</span>
            <span className="text-mono" style={{ color: '#34d399' }}>LIVE TEST</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={11} color="var(--brand-primary)" />
            <span style={{ color: '#cbd5e1', fontWeight: '600' }}>Proof-of-Policy (PoPI):</span>
            <span className="text-mono" style={{ color: 'var(--brand-primary)' }}>ACTIVE</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Lock size={11} color="#c084fc" />
            <span style={{ color: '#cbd5e1', fontWeight: '600' }}>Post-Quantum:</span>
            <span className="text-mono" style={{ color: '#c084fc' }}>NIST FIPS 204 (ML-DSA-65)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={11} color="#f97316" />
            <span style={{ color: '#cbd5e1', fontWeight: '600' }}>Vulcan Transformer:</span>
            <span className="text-mono" style={{ color: '#f97316' }}>11.4ms (99.4% Yield)</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: 'var(--text-dim)' }}>Track 1: AI Growth & Agentic Commerce</span>
          <span className="badge badge-primary" style={{ fontSize: '0.6rem', padding: '1px 6px' }}>
            Buildathon 2026
          </span>
        </div>
      </div>

      {/* Main Flagship Navigation Header */}
      <header
        className="glass-panel"
        style={{
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          borderColor: 'rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Brand Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #00d2d3 0%, #0284c7 50%, #6366f1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0, 210, 211, 0.35)',
            position: 'relative'
          }}>
            <Bot size={22} color="#04131d" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-0.03em' }}>
                VERITY <span className="gradient-text">AI</span>
              </h1>
              <span className="badge badge-success" style={{ fontSize: '0.62rem', padding: '2px 6px' }}>
                Enterprise
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '-0.01em', marginTop: '1px' }}>
              Autonomous Bounded Agentic Commerce on Razorpay Rails
            </p>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'rgba(0, 0, 0, 0.35)',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid var(--border-subtle)',
          overflowX: 'auto',
          maxWidth: '100%'
        }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 12px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? '#04131d' : 'var(--text-muted)',
                  background: isActive
                    ? 'linear-gradient(135deg, #00d2d3, #0284c7)'
                    : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  position: 'relative',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={14} color={isActive ? '#04131d' : 'currentColor'} />
                <span>{tab.label}</span>
                {tab.badge && !isActive && (
                  <span style={{
                    fontSize: '0.58rem',
                    padding: '1px 5px',
                    borderRadius: '4px',
                    background: 'rgba(0, 210, 211, 0.15)',
                    color: 'var(--brand-primary)',
                    fontWeight: '700'
                  }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={onOpenTour}
            className="btn-secondary"
            style={{ padding: '7px 12px', fontSize: '0.75rem', borderColor: 'rgba(0, 210, 211, 0.4)', color: 'var(--brand-primary)' }}
          >
            <Award size={14} /> Guided Tour
          </button>

          <button
            onClick={openAuditModal}
            className="btn-secondary"
            style={{ padding: '7px 12px', fontSize: '0.75rem' }}
          >
            <FileText size={14} /> Audit Ledger
          </button>

          {onOpenConfig && (
            <button
              onClick={onOpenConfig}
              className="btn-secondary"
              style={{ padding: '7px 10px', fontSize: '0.75rem' }}
              title="Razorpay Key Configuration"
            >
              <Key size={14} />
            </button>
          )}

          <button
            onClick={onReset}
            className="btn-secondary"
            style={{ padding: '7px 10px', fontSize: '0.75rem' }}
            title="Reset Catalog & Invariants"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </header>
    </div>
  );
}

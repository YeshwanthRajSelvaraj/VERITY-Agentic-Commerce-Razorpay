import React, { useState, useEffect, useRef } from 'react';
import { Search, Command, ArrowRight, Bot, Sparkles, Shield, Cpu, Zap, Store, BarChart3, ShieldCheck, FileText, ChevronRight, CornerDownLeft, X } from 'lucide-react';

const SEARCH_ITEMS = [
  // Navigation Tabs
  { id: 'tab_chat', title: 'Buyer Chat (Voice & Natural Language)', category: 'Navigation', type: 'tab', tabId: 'chat', icon: Bot, badge: 'Voice' },
  { id: 'tab_studio', title: 'Agent Studio & Policy Bounds', category: 'Navigation', type: 'tab', tabId: 'studio', icon: Bot, badge: 'Core' },
  { id: 'tab_swarm', title: 'Hugging Face AI Agent Mesh', category: 'Navigation', type: 'tab', tabId: 'swarm', icon: Cpu, badge: 'HF' },
  { id: 'tab_neural', title: 'Neural ML/DL (64-Dim Vectors & RL)', category: 'Navigation', type: 'tab', tabId: 'neural', icon: Cpu, badge: 'DL' },
  { id: 'tab_vulcan', title: 'Razorpay Vulcan™ AI Foundation Model', category: 'Navigation', type: 'tab', tabId: 'vulcan', icon: Zap, badge: 'RZP' },
  { id: 'tab_comparison', title: 'Multi-Merchant Deal Hunter & Bundles', category: 'Navigation', type: 'tab', tabId: 'comparison', icon: Sparkles, badge: 'Save' },
  { id: 'tab_store', title: '3 Merchant Storefronts (NovaTech, ByteForge, DevDesk)', category: 'Navigation', type: 'tab', tabId: 'store', icon: Store },
  { id: 'tab_metrics', title: 'Revenue Growth & Observability Metrics', category: 'Navigation', type: 'tab', tabId: 'metrics', icon: BarChart3 },
  { id: 'tab_failures', title: 'Failure Recovery & Step-Up Suite', category: 'Navigation', type: 'tab', tabId: 'failures', icon: ShieldCheck },

  // Quick Procurement Directives
  { id: 'act_kb', title: 'Buy wireless mechanical keyboard under ₹4,500', category: 'Autonomous Directives', type: 'action', prompt: 'Buy a wireless mechanical keyboard for coding under ₹4,500', budget: 4500, icon: Sparkles },
  { id: 'act_anc', title: 'Procure ANC headphones with active noise cancelling under ₹5,000', category: 'Autonomous Directives', type: 'action', prompt: 'Procure an active noise-cancelling headset for deep work', budget: 5000, icon: Sparkles },
  { id: 'act_dock', title: 'Get 11-in-1 dual 4K USB-C dock under ₹3,500', category: 'Autonomous Directives', type: 'action', prompt: 'Get an 11-in-1 USB-C dual 4K dock for developer setup', budget: 3500, icon: Sparkles },

  // Products & SKUs
  { id: 'prod_k2', title: 'KeyChron K2 Pro Mechanical Keyboard — ₹3,899 (NovaTech)', category: 'Merchant Catalog', type: 'action', prompt: 'Buy KeyChron K2 Pro keyboard under 4500', budget: 4500, icon: Store },
  { id: 'prod_anc', title: 'AuraSound Flow ANC Headphones — ₹4,499 (ByteForge)', category: 'Merchant Catalog', type: 'action', prompt: 'Buy AuraSound Flow ANC Headphones', budget: 5000, icon: Store },
  { id: 'prod_dock', title: 'DevDesk Pro 11-in-1 4K USB-C Hub — ₹2,799 (DevDesk)', category: 'Merchant Catalog', type: 'action', prompt: 'Buy DevDesk Pro USB-C Hub', budget: 3500, icon: Store },

  // Security & Audit
  { id: 'sec_pqc', title: 'Inspect NIST FIPS 204 Lattice Cryptography Audit Ledger', category: 'Security & Compliance', type: 'modal', modal: 'audit', icon: Shield },
  { id: 'sec_tour', title: 'Launch 90-Second Hackathon Judge Guided Tour', category: 'Presentations', type: 'modal', modal: 'tour', icon: Sparkles }
];

export function CommandPalette({ isOpen, onClose, onSelectTab, onExecutePurchase, onOpenAudit, onOpenTour }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filtered = SEARCH_ITEMS.filter(item => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
  });

  const handleSelect = (item) => {
    onClose();
    if (item.type === 'tab') {
      onSelectTab(item.tabId);
    } else if (item.type === 'action') {
      onExecutePurchase({
        user_prompt: item.prompt,
        spending_policy: {
          max_budget_inr: item.budget || 5000,
          max_shipping_inr: 200,
          allowed_categories: ['Electronics', 'Peripherals', 'Accessories'],
          require_warranty: true,
          allow_bundle_upsell: true
        },
        include_upsell_bundle: true,
        force_failure_simulation: null
      });
      onSelectTab('studio');
    } else if (item.type === 'modal') {
      if (item.modal === 'audit') onOpenAudit();
      if (item.modal === 'tour') onOpenTour();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(2, 6, 23, 0.75)',
      backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      zIndex: 2000, paddingTop: '10vh', paddingLeft: '16px', paddingRight: '16px'
    }}
    onClick={onClose}
    >
      <div
        className="glass-panel animate-scale-in"
        style={{
          width: '100%', maxWidth: '640px',
          background: 'rgba(10, 15, 29, 0.96)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '16px',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(255, 255, 255, 0.1)',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <Search size={20} color="var(--brand-primary)" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, search products, AI agents, or switch tabs..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: '1rem',
              fontFamily: 'var(--font-sans)'
            }}
          />
          <span style={{
            fontSize: '0.65rem',
            padding: '3px 7px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '6px',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)'
          }}>
            ESC
          </span>
        </div>

        {/* Search Results List */}
        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '8px' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
              No matching commands or products found for "{query}"
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: isSelected ? 'rgba(0, 210, 211, 0.12)' : 'transparent',
                    border: isSelected ? '1px solid rgba(0, 210, 211, 0.25)' : '1px solid transparent',
                    transition: 'all 0.1s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '8px',
                      background: isSelected ? 'rgba(0, 210, 211, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: isSelected ? 'var(--brand-primary)' : 'var(--text-muted)'
                    }}>
                      <Icon size={15} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.86rem', fontWeight: isSelected ? '700' : '500', color: isSelected ? '#fff' : 'var(--text-secondary)' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: '1px' }}>
                        {item.category}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {item.badge && (
                      <span className="badge badge-primary" style={{ fontSize: '0.6rem', padding: '1px 6px' }}>
                        {item.badge}
                      </span>
                    )}
                    {isSelected && (
                      <CornerDownLeft size={13} color="var(--brand-primary)" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div style={{
          padding: '10px 16px',
          background: 'rgba(0, 0, 0, 0.3)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: '0.7rem', color: 'var(--text-dim)'
        }}>
          <div style={{ display: 'flex', gap: '14px' }}>
            <span><kbd style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 5px', borderRadius: '4px' }}>↑</kbd> <kbd style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 5px', borderRadius: '4px' }}>↓</kbd> to navigate</span>
            <span><kbd style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 5px', borderRadius: '4px' }}>↵</kbd> to select</span>
          </div>
          <span>VERITY Global Command Palette</span>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { AlertTriangle, TrendingUp, PackageX, Ban, ArrowRight, ShieldCheck, CheckCircle2, ServerCrash, RefreshCw, Lock } from 'lucide-react';

export function FailureScenarios({ onRunScenario, isRunning }) {
  const scenarios = [
    {
      id: 'PRICE_SPIKE',
      title: 'Dynamic Price Spike Drift',
      badge: 'Mid-Checkout Price Surge',
      badgeClass: 'badge-danger',
      icon: TrendingUp,
      color: '#f87171',
      description: 'The buyer initiates a purchase for KeyChron K2 Pro (advertised at ₹3,899 within ₹4,500 budget), but live merchant flash pricing spikes to ₹5,499 during checkout.',
      expectedHandling: 'Policy Engine intercepts budget ceiling violation (₹5,649 > ₹4,500) before money is touched. Failure Recovery Agent catches exception and generates an in-budget counter-offer for Apex 60% Linear Red Keyboard (₹2,499) + gated approval link.',
      runPayload: {
        user_prompt: "Buy a mechanical keyboard with brown switches",
        spending_policy: {
          max_budget_inr: 4500.0,
          max_shipping_inr: 200.0,
          allowed_categories: ["Electronics", "Peripherals"],
          require_warranty: true,
          allow_bundle_upsell: false
        },
        include_upsell_bundle: false,
        force_failure_simulation: "PRICE_SPIKE"
      }
    },
    {
      id: 'OUT_OF_STOCK',
      title: 'Live Inventory Exhaustion (OOS)',
      badge: 'Zero Stock at Order Time',
      badgeClass: 'badge-warning',
      icon: PackageX,
      color: '#fbbf24',
      description: 'The buyer selects KeyChron K2 Pro, but live merchant stock drops to 0 units immediately before Razorpay Order generation.',
      expectedHandling: 'Live inventory validator catches stock_count = 0. Failure Recovery Agent logs outage to Audit Ledger and proposes an available in-stock alternative without aborting user session.',
      runPayload: {
        user_prompt: "Buy a KeyChron mechanical keyboard",
        spending_policy: {
          max_budget_inr: 5000.0,
          max_shipping_inr: 200.0,
          allowed_categories: ["Electronics"],
          require_warranty: true,
          allow_bundle_upsell: false
        },
        include_upsell_bundle: false,
        force_failure_simulation: "OUT_OF_STOCK"
      }
    },
    {
      id: 'CATEGORY_BREACH',
      title: 'Unauthorized Category Violation',
      badge: 'Policy Whitelist Block',
      badgeClass: 'badge-purple',
      icon: Ban,
      color: '#c084fc',
      description: 'Buyer agent receives prompt to purchase an unapproved category (e.g. "Office Desk Mat") when policy whitelist is strictly restricted to "Electronics".',
      expectedHandling: 'Policy Gate evaluates category whitelist, fails invariant evaluation deterministically, and halts execution before invoking Razorpay Orders API.',
      runPayload: {
        user_prompt: "Buy a leather desk pad for office",
        spending_policy: {
          max_budget_inr: 2000.0,
          max_shipping_inr: 200.0,
          allowed_categories: ["Electronics"],
          require_warranty: false,
          allow_bundle_upsell: false
        },
        include_upsell_bundle: false,
        force_failure_simulation: "CATEGORY_BREACH"
      }
    },
    {
      id: 'MERCHANT_API_DOWN',
      title: 'Merchant Gateway 504 Timeout',
      badge: 'API Failure & Federated Failover',
      badgeClass: 'badge-danger',
      icon: ServerCrash,
      color: '#f87171',
      description: 'Primary merchant endpoint returns 504 Gateway Timeout during checkout initialization.',
      expectedHandling: 'Failure Recovery Agent intercepts outage and automatically executes federated failover to online mirror merchant DevDesk Supply Co. without user friction.',
      runPayload: {
        user_prompt: "Buy a quiet coding keyboard",
        spending_policy: {
          max_budget_inr: 4500.0,
          max_shipping_inr: 200.0,
          allowed_categories: ["Electronics"],
          require_warranty: true,
          allow_bundle_upsell: false
        },
        include_upsell_bundle: false,
        force_failure_simulation: "MERCHANT_API_DOWN"
      }
    },
    {
      id: 'DUPLICATE_ORDER_REPLAY',
      title: 'Duplicate Transaction & Replay Attack',
      badge: 'Idempotency Defense',
      badgeClass: 'badge-primary',
      icon: RefreshCw,
      color: '#38bdf8',
      description: 'An external script attempts to replay an identical transaction mandate with duplicate nonce within 3600s TTL.',
      expectedHandling: 'Idempotency and Security Guard intercept duplicate nonce, prevent duplicate debit on Razorpay rails, and return cached order state.',
      runPayload: {
        user_prompt: "Buy a wireless mechanical keyboard",
        spending_policy: {
          max_budget_inr: 4500.0,
          max_shipping_inr: 200.0,
          allowed_categories: ["Electronics"],
          require_warranty: true,
          allow_bundle_upsell: false
        },
        include_upsell_bundle: false,
        force_failure_simulation: "DUPLICATE_ORDER_REPLAY"
      }
    }
  ];

  return (
    <div style={{ padding: '0 24px 32px', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header Info */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={24} color="#34d399" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>
            Graceful Failure Handling & Resilience Suite
          </h2>
          <span className="badge badge-success">5 Interactive Simulators</span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px', lineHeight: '1.5' }}>
          Razorpay Buildathon Requirement: <em>"Every money action explainable, bounded and gated. Show the audit trail and one failure handled gracefully."</em> Click any scenario below to trigger a real-time failure simulation and inspect the automated recovery workflow.
        </p>
      </div>

      {/* Scenarios Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px' }}>
        {scenarios.map((sc) => {
          const Icon = sc.icon;
          return (
            <div
              key={sc.id}
              className="glass-panel animate-slide-up"
              style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '18px' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '12px',
                    background: `rgba(255, 255, 255, 0.05)`, border: `1px solid ${sc.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <Icon size={20} color={sc.color} />
                  </div>
                  <span className={`badge ${sc.badgeClass}`} style={{ fontSize: '0.68rem' }}>
                    {sc.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '8px' }}>
                  {sc.title}
                </h3>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '14px' }}>
                  {sc.description}
                </p>

                <div style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '12px 14px'
                }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--brand-primary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Automated Agent Recovery Behavior
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
                    {sc.expectedHandling}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onRunScenario(sc.runPayload)}
                disabled={isRunning}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '10px 16px',
                  fontSize: '0.85rem',
                  background: `linear-gradient(135deg, ${sc.color}dd, #0284c7)`
                }}
              >
                Trigger Simulation & Watch Recovery <ArrowRight size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

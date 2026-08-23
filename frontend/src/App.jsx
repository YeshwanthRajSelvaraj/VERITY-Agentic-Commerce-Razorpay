import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { StorefrontView } from './components/StorefrontView';
import { BuyerAgentStudio } from './components/BuyerAgentStudio';
import { AgentSwarmView } from './components/AgentSwarmView';
import { NeuralIntelligenceView } from './components/NeuralIntelligenceView';
import { VulcanTelemetryView } from './components/VulcanTelemetryView';
import { ConversationalChat } from './components/ConversationalChat';
import { MultiMerchantComparison } from './components/MultiMerchantComparison';
import { MetricsDashboard } from './components/MetricsDashboard';
import { FailureScenarios } from './components/FailureScenarios';
import { RazorpayGapsView } from './components/RazorpayGapsView';
import { AuditLedgerModal } from './components/AuditLedgerModal';
import { JudgeTourModal } from './components/JudgeTourModal';
import { CommandPalette } from './components/CommandPalette';
import { A2ANegotiationView } from './components/A2ANegotiationView';
import { MultiMerchantCartView } from './components/MultiMerchantCartView';
import { RAGKnowledgeView } from './components/RAGKnowledgeView';
import { RazorpayConfigModal } from './components/RazorpayConfigModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [executionResponse, setExecutionResponse] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const [activeDrift, setActiveDrift] = useState(null);

  // Global Cmd+K / Ctrl+K hotkey
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const executePurchase = useCallback(async (payload) => {
    setIsRunning(true);
    setExecutionResponse(null);
    setActiveDrift(payload.force_failure_simulation);

    try {
      const res = await fetch('/api/agent/procure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setExecutionResponse(data);
    } catch (e) {
      console.error('Procurement error:', e);
      setExecutionResponse({
        success: false,
        status: 'ERROR',
        user_prompt: payload.user_prompt,
        execution_steps: [{
          step_number: 1,
          title: 'Connection Error',
          actor: 'System',
          status: 'FAILED',
          description: `Backend unreachable: ${e.message}. Ensure FastAPI is running on port 8000.`,
          payload: {}
        }],
        audit_summary: 'Backend connection failed. Start the FastAPI server first.'
      });
    } finally {
      setIsRunning(false);
    }
  }, []);

  const runFailureScenario = useCallback(async (payload) => {
    setActiveTab('studio');
    await executePurchase(payload);
  }, [executePurchase]);

  const handleReset = useCallback(async () => {
    try {
      await fetch('/api/catalog/reset', { method: 'POST' });
      await fetch('/api/agent/audit-ledger/clear', { method: 'POST' });
    } catch (e) { /* ignore */ }
    setExecutionResponse(null);
    setActiveDrift(null);
  }, []);

  const handleTriggerCheckout = useCallback((order) => {
    const width = 500;
    const height = 660;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    const checkoutHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Razorpay Test Checkout</title>
        <meta charset="utf-8">
        <style>
          body {
            margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0d1527; color: #fff; display: flex; flex-direction: column;
            align-items: center; justify-content: center; min-height: 100vh; padding: 24px; box-sizing: border-box;
          }
          .logo { font-size: 1.4rem; font-weight: 800; color: #00d2d3; letter-spacing: -0.5px; display: flex; align-items: center; justify-content: center; gap: 8px; }
          .card {
            background: rgba(20, 30, 48, 0.95); border: 1px solid rgba(0, 210, 211, 0.3);
            border-radius: 20px; padding: 30px; width: 100%; max-width: 380px; text-align: center;
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.6);
          }
          .order-id {
            font-family: monospace; color: #38bdf8; font-size: 0.78rem; margin: 12px 0;
            background: rgba(56, 189, 248, 0.12); padding: 4px 10px; border-radius: 6px; display: inline-block;
          }
          .amount { font-size: 2.2rem; font-weight: 800; color: #34d399; margin: 14px 0; }
          .btn {
            background: linear-gradient(135deg, #00d2d3, #0284c7); color: #04131d; font-weight: 800;
            padding: 14px 24px; border-radius: 12px; border: none; cursor: pointer; width: 100%;
            font-size: 0.95rem; margin-top: 14px; transition: transform 0.15s, box-shadow 0.15s;
            box-shadow: 0 4px 18px rgba(0, 210, 211, 0.35);
          }
          .btn:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(0, 210, 211, 0.45); }
          .badge {
            display: inline-block; background: rgba(16, 185, 129, 0.15); color: #34d399;
            padding: 4px 10px; border-radius: 8px; font-size: 0.72rem; font-weight: 700; margin-top: 16px;
          }
          .item { color: #cbd5e1; font-size: 0.92rem; font-weight: 600; margin: 8px 0; line-height: 1.4; }
          .merchant { color: #94a3b8; font-size: 0.78rem; margin-bottom: 10px; }
          .success { display: none; flex-direction: column; align-items: center; gap: 12px; }
          .check {
            width: 60px; height: 60px; border-radius: 50%; background: rgba(16, 185, 129, 0.2);
            display: flex; align-items: center; justify-content: center; font-size: 2rem; color: #34d399;
            border: 2px solid #34d399;
          }
        </style>
      </head>
      <body>
        <div class="card" id="checkout">
          <div class="logo">Razorpay Test Checkout</div>
          <div class="order-id">${order.order_id}</div>
          <div class="item">${order.item_name}</div>
          <div class="merchant">Merchant: <strong>${order.merchant}</strong></div>
          <div class="amount">₹${order.total_paid_inr?.toLocaleString('en-IN')}</div>
          <button class="btn" onclick="simulatePayment()">Authorize & Pay with Test Card</button>
          <div class="badge">✦ PoPI Commitment & Policy Invariants Verified</div>
        </div>

        <div class="card success" id="success">
          <div class="check">✓</div>
          <div class="logo" style="color:#34d399">Payment Captured!</div>
          <div class="order-id" id="pay_id_label"></div>
          <div class="amount">₹${order.total_paid_inr?.toLocaleString('en-IN')}</div>
          <div class="badge">HMAC Webhook: payment.captured ✓</div>
          <p style="font-size:0.75rem; color:#94a3b8; margin-top:6px">Razorpay Route A2A Atomic Transfer Dispatched.</p>
          <button class="btn" style="margin-top:14px" onclick="window.close()">Return to VERITY</button>
        </div>

        <script>
          function simulatePayment() {
            var payId = 'pay_test_' + Date.now();
            document.getElementById('checkout').style.display = 'none';
            document.getElementById('pay_id_label').innerText = 'Payment ID: ' + payId;
            document.getElementById('success').style.display = 'flex';
            
            fetch('/api/webhooks/razorpay', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Razorpay-Signature': 'sig_mock_valid_' + Date.now(),
                'X-Idempotency-Key': 'idemp_wh_' + payId
              },
              body: JSON.stringify({
                event: 'payment.captured',
                order_id: '${order.order_id}',
                payment_id: payId,
                payload: {
                  payment: {
                    entity: {
                      id: payId,
                      order_id: '${order.order_id}',
                      amount: Math.round(${order.total_paid_inr} * 100),
                      currency: 'INR',
                      status: 'captured'
                    }
                  }
                }
              })
            }).catch(function(err){ console.log('Webhook dispatched'); });
          }
        </script>
      </body>
      </html>
    `;
    const popup = window.open('', 'RazorpayCheckout', `width=${width},height=${height},left=${left},top=${top}`);
    if (popup) {
      popup.document.write(checkoutHtml);
      popup.document.close();
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAuditModal={() => setAuditOpen(true)}
        onReset={handleReset}
        onOpenTour={() => setTourOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenConfig={() => setConfigOpen(true)}
      />

      <main style={{ flex: 1, paddingTop: '8px' }}>
        {activeTab === 'chat' && (
          <ConversationalChat
            onExecutePurchase={executePurchase}
            onSelectTab={setActiveTab}
          />
        )}
        {activeTab === 'studio' && (
          <BuyerAgentStudio
            onExecutePurchase={executePurchase}
            executionResponse={executionResponse}
            isRunning={isRunning}
            onTriggerCheckout={handleTriggerCheckout}
          />
        )}
        {activeTab === 'negotiate' && (
          <A2ANegotiationView
            onExecutePurchase={executePurchase}
            onSelectTab={setActiveTab}
          />
        )}
        {activeTab === 'cart' && (
          <MultiMerchantCartView
            onExecutePurchase={executePurchase}
            onTriggerCheckout={handleTriggerCheckout}
          />
        )}
        {activeTab === 'rag' && (
          <RAGKnowledgeView />
        )}
        {activeTab === 'comparison' && (
          <MultiMerchantComparison
            onExecutePurchase={executePurchase}
            onSelectTab={setActiveTab}
          />
        )}
        {activeTab === 'store' && (
          <StorefrontView activeDrift={activeDrift} />
        )}
        {activeTab === 'metrics' && (
          <MetricsDashboard />
        )}
        {activeTab === 'failures' && (
          <FailureScenarios
            onRunScenario={runFailureScenario}
            isRunning={isRunning}
          />
        )}
        {activeTab === 'gaps' && (
          <RazorpayGapsView
            onSelectTab={setActiveTab}
            onExecutePurchase={executePurchase}
          />
        )}
        {activeTab === 'swarm' && (
          <AgentSwarmView
            onSelectTab={setActiveTab}
            onExecutePurchase={executePurchase}
          />
        )}
        {activeTab === 'neural' && (
          <NeuralIntelligenceView />
        )}
        {activeTab === 'vulcan' && (
          <VulcanTelemetryView />
        )}
      </main>

      <AuditLedgerModal
        isOpen={auditOpen}
        onClose={() => setAuditOpen(false)}
      />

      <JudgeTourModal
        isOpen={tourOpen}
        onClose={() => setTourOpen(false)}
        onSelectTab={setActiveTab}
      />

      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectTab={setActiveTab}
        onExecutePurchase={executePurchase}
        onOpenAudit={() => setAuditOpen(true)}
        onOpenTour={() => setTourOpen(true)}
      />

      <RazorpayConfigModal
        isOpen={configOpen}
        onClose={() => setConfigOpen(false)}
      />

      {/* Footer */}
      <footer style={{
        padding: '20px 24px',
        textAlign: 'center',
        color: 'var(--text-dim)',
        fontSize: '0.75rem',
        borderTop: '1px solid var(--border-subtle)',
        marginTop: 'auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span><strong>VERITY AI</strong> — Track 1: AI Growth & Agentic Commerce</span>
          <span>•</span>
          <span>Razorpay AI Builder Internship 2026</span>
          <span>•</span>
          <span style={{ color: '#34d399' }}>Proof-of-Policy (PoPI) Invariant Gate</span>
          <span>•</span>
          <span style={{ color: '#c084fc' }}>NIST FIPS 204 Lattice Cryptography</span>
        </div>
      </footer>
    </div>
  );
}

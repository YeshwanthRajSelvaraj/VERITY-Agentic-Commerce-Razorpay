# VERITY AI

> **Autonomous Bounded Agentic Commerce on Razorpay Rails**  
> *Submitted for the Razorpay AI Builder Internship 2026 Buildathon — Track 1: AI Growth & Agentic Commerce*

[![Razorpay Test Rails](https://img.shields.io/badge/Razorpay-Live%20Test%20Mode-blue?logo=razorpay)](https://razorpay.com)
[![PoPI Cryptography](https://img.shields.io/badge/PoPI-Proof--of--Policy%20Invariant-emerald)](https://github.com)
[![Post-Quantum](https://img.shields.io/badge/NIST%20FIPS%20204-ML--DSA--65%20Lattice-purple)](https://csrc.nist.gov)
[![MCP Compliant](https://img.shields.io/badge/MCP-Model%20Context%20Protocol-cyan)](https://modelcontextprotocol.io)
[![Python 3.12](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python%203.12-3776AB?logo=python)](https://fastapi.tiangolo.com)
[![React 18](https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite%206-61DAFB?logo=react)](https://vitejs.dev)
[![Tests](https://img.shields.io/badge/Tests-28%2F28%20Passing-brightgreen)](https://github.com)

---

## ✦ Executive Summary

Today's AI agents can search the web and recommend products, but they **cannot safely transact** on behalf of users. Without a verifiable trust layer, giving an AI access to payment rails risks hallucinations, dynamic price-spike overspends, out-of-stock crashes, and unapproved spending.

**VERITY** bridges this gap by introducing an autonomous, policy-bounded procurement agent running natively on Razorpay rails:
1. **Multi-Merchant Discovery & A2A Negotiation**: Discovers catalog items across federated merchants (NovaTech, ByteForge, DevDesk) and bargains in real-time for discounts and expedited shipping.
2. **Deterministic Proof-of-Policy Invariant (PoPI)**: Mathematical assertion and cryptographic token commitment (`X-Razorpay-Agent-PoPI`) guaranteeing zero overspend hallucinations.
3. **Razorpay Test-Mode Rails & Route Split Settlement**: Direct Order creation, standard checkout popup, HMAC-SHA256 signature verification, idempotent webhooks, and multi-merchant split transfers.
4. **Graceful Failure Resilience Suite**: Interactive simulations & automated recovery for price surges, inventory exhaustion, category breaches, 504 timeouts, and duplicate replays.
5. **RAG-Powered Commerce Intelligence**: Dense neural vector retrieval indexing hardware specs, warranties, return policies, and compatibility matrices.
6. **Dual-Layer Post-Quantum Audit Ledger**: Gateway HMAC-SHA256 + Stateful NIST FIPS 204 (ML-DSA-65) lattice signatures & SHA3-512 Merkle Block Chaining with one-click JSON/CSV exports.

---

## ◆ System Architecture

```
                                  USER DIRECTIVE (Voice or Text)
                                                │
                                                ▼
                        ┌───────────────────────────────────────────────┐
                        │      INTENT, SENTIMENT & SECURITY PARSER      │
                        │  • Sentiment: High Urgency / Strict Budget    │
                        │  • Prompt-Injection Defense Filter            │
                        │  • Idempotency & Replay Protection (TTL 3600s)│
                        └───────────────────────┬───────────────────────┘
                                                │
                                                ▼
                        ┌───────────────────────────────────────────────┐
                        │         RAG COMMERCE RETRIEVAL LAYER          │
                        │ • 64-Dim Dense Embeddings + Overlap Ranking   │
                        │ • Indexed: Warranties, Returns, SLAs, Specs   │
                        └───────────────────────┬───────────────────────┘
                                                │
                                                ▼
                        ┌───────────────────────────────────────────────┐
                        │        MULTI-MERCHANT A2A BARGAINING          │
                        │ • NovaTech Gear • ByteForge • DevDesk         │
                        │ • 3-Round Live Bid Concession Protocol        │
                        └───────────────────────┬───────────────────────┘
                                                │
                                                ▼
                        ┌───────────────────────────────────────────────┐
                        │        PROOF-OF-POLICY INVARIANT (PoPI)       │
                        │ • Deterministic Budget & Shipping Assertion   │
                        │ • Cryptographic SHA-256 + HMAC Commitment     │
                        │ • Passed in 'X-Razorpay-Agent-PoPI' Header    │
                        └───────────────────────┬───────────────────────┘
                                                │
                                ┌───────────────┴───────────────┐
                                │ Passed                        │ Intercepted Failure
                                ▼                               ▼
                ┌───────────────────────────────┐ ┌───────────────────────────────┐
                │    RAZORPAY TEST-MODE RAILS   │ │    FAILURE RECOVERY SUITE     │
                │ • Order Creation API          │ │ • 5 Interactive Simulations   │
                │ • Live Test Checkout Popup    │ │ • In-Stock Counter-Offers     │
                │ • Webhook + HMAC Verification │ │ • 1-Tap CFO Approval Link     │
                │ • Direct Payment Capture      │ └───────────────────────────────┘
                │ • Route Multi-Split Settlement│
                └───────────────┬───────────────┘
                                │
                                ▼
                ┌───────────────────────────────────────────────┐
                │  POST-QUANTUM AUDIT & OBSERVABILITY DASHBOARD  │
                │ • NIST FIPS 204 (ML-DSA-65) Lattice Signatures│
                │ • Explainable Decision Card (Winning Rationale)│
                │ • Latency Waterfall & Federated GMV Metrics   │
                │ • One-Click JSON & CSV Audit Ledger Export    │
                └───────────────────────────────────────────────┘
```

---

## ✦ Core Features & Capabilities

### 1. Live Razorpay Test-Mode Integration
- Real Razorpay test order creation (amounts in Paise: 1 INR = 100 Paise).
- Embeds standard Razorpay Checkout flow and payment simulation popup.
- Cryptographic HMAC-SHA256 signature verification (`X-Razorpay-Signature`).
- Full webhook lifecycle (`payment.captured`, `order.paid`) with idempotency replay protection.
- Runtime API Key configuration via interactive UI modal.

### 2. Multi-Merchant Virtual Cart & Razorpay Route Split
- Multi-merchant basket supporting simultaneous products from NovaTech, ByteForge, and DevDesk.
- Consolidated shipping calculations and multi-item combo discounts (5% saving).
- Automated sub-account split transfer plans via **Razorpay Route A2A** with transparent fee breakdowns.

### 3. Proof-of-Policy Invariant (PoPI)
- Cryptographically verifiable policy commitment layer encapsulating:
  - Budget ceiling
  - Allowed categories
  - Max shipping limit
  - Nonce & timestamp
  - Double-hash digest (`SHA-256 + HMAC-SHA256`)
- Interactive PoPI Inspector Modal verifying mathematical adherence in real-time.

### 4. Advanced Failure Recovery Suite (5 Interactive Scenarios)
- **Dynamic Price Surge**: Intercepts mid-checkout price drift and suggests in-budget alternatives.
- **Inventory Exhaustion (OOS)**: Catches zero stock before order creation and routes to in-stock items.
- **Category Whitelist Breach**: Halts unapproved category purchases and recommends approved items.
- **Merchant API Outage (504 Timeout)**: Auto-failover to healthy mirror merchant.
- **Duplicate Order Replay Attack**: Idempotency filter rejects replay within 3600s TTL.

### 5. Agent-to-Agent (A2A) Negotiation Arena
- Visual 3-round bargaining between Buyer Agent and Merchant Agents.
- Merchant agents provide competing counter-offers varying by price, express air delivery, and extended warranties.
- Live savings counter, dialogue stream, and Pareto-optimal contract awarding.

### 6. Smart Cart Optimization
- Evaluates merchant combinations to compare **Cost-Optimized** vs **Speed-Optimized (24h Air Express)** routing.
- Minimizes shipping fees and optimizes delivery SLA.

### 7. Merchant Growth & AI Upselling
- Contextual accessory bundling (+50% discount) tailored to buyer intent.
- Tracks conversion velocity, GMV growth, and merchant-level AOV uplift (+22.4%).

### 8. RAG-Powered Commerce Intelligence
- Dense neural vector search (64-dimensional embeddings) over:
  - Hardware datasheets & specifications
  - 1-Year / 2-Year warranty policies and RMA guidelines
  - Merchant return & instant refund SLAs
  - OS and hardware compatibility matrices

### 9. Explainable AI Decisions
- Detailed **Explainable Decision Card** for every transaction:
  - Total products/offers considered
  - Winning deal rationale & mathematical score
  - Price & shipping SLA comparison
  - Policy invariants verified (Zero-Hallucination Gate)

### 10. Advanced Security & Defense
- Webhook signature verification
- Adversarial prompt-injection detection & sanitization
- 3600s TTL idempotency store
- Sensitive financial data masking

### 11. Complete Transaction Audit Trail
- Post-quantum hash chain (SHA3-512 Merkle Block Chaining + NIST FIPS 204 ML-DSA-65 lattice signatures).
- One-click **JSON** and **CSV** audit ledger exports.

### 12. Advanced Agent Observability
- Execution latency waterfall breakdown (108.6ms total e2e latency).
- Real-time GMV, conversion rate, and merchant volume breakdown.

### 13. Model Context Protocol (MCP) Standard Server
- Implements all 9 standard MCP tools:
  `search_products`, `compare_offers`, `get_product`, `check_inventory`, `calculate_total`, `validate_policy`, `negotiate_offer`, `create_order`, `get_order_status`.

### 14. Voice Shopping
- Web Speech API integration in Buyer Chat with real-time speech-to-intent conversion.

### 15. Sentiment & Urgency Awareness
- Detects user urgency signals (`High Urgency`, `Strict Budget`, `Balanced Quality`) to adjust negotiation and delivery strategy without overriding hard policy bounds.

---

## ◆ Technology Stack

| Layer | Technologies |
|---|---|
| **Backend** | Python 3.12, FastAPI, Pydantic V2, Uvicorn, Razorpay Python SDK |
| **Frontend** | React 18, Vite 6, Vanilla CSS (Dark Glassmorphism Design System), Lucide Icons |
| **Cryptography** | NIST FIPS 204 (ML-DSA-65), SHA3-512, HMAC-SHA256, PoPI Attestation Engine |
| **Standards** | Model Context Protocol (MCP 2024-11-05), JSON-RPC 2.0 |
| **Testing** | Python Unittest (28 automated unit & integration tests) |

---

## ✦ Quick Start Guide

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 1. Clone & Set Up Backend

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
- API Server: `http://localhost:8000`
- Swagger API Documentation: `http://localhost:8000/docs`
- MCP Tools Manifest: `http://localhost:8000/api/mcp/tools`

### 2. Set Up Frontend

```bash
cd frontend
npm install
npm run dev
```
- Web Application: `http://localhost:5173`

---

## ◆ Automated Test Suite

Run the full automated test suite verifying all 17 features:

```bash
cd backend
python -m unittest discover -s tests -p "test_*.py"
```

**Test Output:**
```text
............................
----------------------------------------------------------------------
Ran 28 tests in 0.020s

OK (100% Passing)
```

---

## ✦ Repository Structure

```
razorcart-ai/
├── backend/
│   ├── app/
│   │   ├── agents/
│   │   │   ├── buyer_agent.py          # Primary autonomous buyer orchestrator
│   │   │   ├── failure_recovery.py     # 5-scenario graceful failure recovery
│   │   │   ├── merchant_agent.py       # Federated merchant catalog agent
│   │   │   ├── negotiation_agent.py    # A2A multi-round bargaining engine
│   │   │   └── huggingface_agent.py    # Hugging Face semantic intent parser
│   │   ├── api/
│   │   │   ├── routes_agent.py         # Buyer agent, PoPI, A2A & metrics endpoints
│   │   │   ├── routes_catalog.py       # 3-merchant product catalog endpoints
│   │   │   ├── routes_mcp.py           # Model Context Protocol (MCP) server
│   │   │   └── routes_webhook.py       # Razorpay HMAC webhook & capture handler
│   │   ├── core/
│   │   │   ├── audit_ledger.py         # Immutable audit ledger & Merkle chaining
│   │   │   ├── config.py               # Runtime settings & Razorpay keys
│   │   │   ├── popi.py                 # Proof-of-Policy Invariant engine
│   │   │   ├── pqc.py                  # NIST FIPS 204 (ML-DSA-65) lattice cryptography
│   │   │   ├── policy_engine.py        # Deterministic mathematical policy gate
│   │   │   ├── rag_engine.py           # RAG commerce intelligence knowledge store
│   │   │   ├── security_guard.py       # Prompt-injection filter & idempotency
│   │   │   ├── smart_cart.py           # Multi-merchant cart & Route split optimizer
│   │   │   └── vulcan.py               # Razorpay Vulcan AI transformer simulator
│   │   ├── services/
│   │   │   ├── catalog_service.py      # Federated merchant inventory service
│   │   │   └── razorpay_service.py     # Razorpay Orders, capture & HMAC verification
│   │   └── main.py                     # FastAPI application entrypoint
│   ├── tests/
│   │   ├── test_enhanced_features.py   # Unit tests for all 17 new features
│   │   ├── test_flow.py                # End-to-end procurement loop tests
│   │   ├── test_neural_mcp.py          # MCP tool & neural intelligence tests
│   │   └── test_pqc.py                 # Post-quantum cryptographic tests
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── A2ANegotiationView.jsx      # Visual A2A negotiation arena
│   │   │   ├── AuditLedgerModal.jsx        # Audit ledger & JSON/CSV exporter
│   │   │   ├── BuyerAgentStudio.jsx        # Procurement directive & policy bounds
│   │   │   ├── CommandPalette.jsx          # Quick command bar (Ctrl+K)
│   │   │   ├── ConversationalChat.jsx      # Voice shopping & sentiment chat
│   │   │   ├── ExplainableDecisionCard.jsx # Transparent AI decision breakdown
│   │   │   ├── FailureScenarios.jsx        # 5-scenario interactive failure suite
│   │   │   ├── Header.jsx                  # Main navigation & system telemetry
│   │   │   ├── JudgeTourModal.jsx          # Interactive guided evaluator tour
│   │   │   ├── LiveExecutionTrace.jsx      # Step-by-step trace & PoPI badge
│   │   │   ├── MetricsDashboard.jsx        # Growth metrics & Latency waterfall
│   │   │   ├── MultiMerchantCartView.jsx   # Virtual cart & Razorpay Route split
│   │   │   ├── MultiMerchantComparison.jsx # Deal hunter comparison table
│   │   │   ├── NeuralIntelligenceView.jsx  # Neural embeddings & transformer telemetry
│   │   │   ├── PoPIBadgeModal.jsx          # Proof-of-Policy inspector modal
│   │   │   ├── RazorpayConfigModal.jsx     # Runtime key configuration modal
│   │   │   ├── RazorpayGapsView.jsx        # Architectural analysis of RZP gaps
│   │   │   ├── RAGKnowledgeView.jsx        # RAG commerce knowledge base explorer
│   │   │   ├── StorefrontView.jsx          # 3-merchant storefront catalogs
│   │   │   └── VulcanTelemetryView.jsx     # Vulcan AI telemetry dashboard
│   │   ├── App.jsx                         # Main React application
│   │   └── index.css                       # Dark glassmorphism design system
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## ◆ Hackathon Submission Notes

- **Track**: Track 1: AI Growth & Agentic Commerce
- **Buildathon**: Razorpay AI Builder Internship 2026
- **Key Innovations**:
  - Eliminates human-only biometric fraud blindspot via **Vulcan-Agentic Protocol (VAP)** & **Proof-of-Policy Invariants (PoPI)**.
  - Multi-Merchant Cart continuity using **Razorpay Route A2A Atomic Split Transfers**.
  - Dynamic price surge protection via **Deterministic Policy Invariant Gate & Counter-Offers**.
  - 10-Year non-repudiation audit security via **NIST FIPS 204 Lattice Cryptography**.
  - Anthropic & OpenAI standard **Model Context Protocol (MCP)** server for external agent interoperability.

---

## ✦ License

MIT License. Developed for the Razorpay AI Builder Internship 2026 Buildathon.

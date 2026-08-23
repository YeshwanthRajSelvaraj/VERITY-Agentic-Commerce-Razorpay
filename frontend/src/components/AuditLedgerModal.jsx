import React, { useState, useEffect } from 'react';
import { X, FileText, CheckCircle2, AlertTriangle, ShieldCheck, Info, RefreshCw, Download, FileSpreadsheet, Printer, Shield, Lock, Cpu } from 'lucide-react';

const STATUS_CONFIG = {
  SUCCESS: { color: '#34d399', bg: 'rgba(16, 185, 129, 0.15)', icon: CheckCircle2 },
  VIOLATION: { color: '#fb7185', bg: 'rgba(244, 63, 94, 0.15)', icon: AlertTriangle },
  WARNING: { color: '#fbbf24', bg: 'rgba(245, 158, 11, 0.15)', icon: AlertTriangle },
  RECOVERED: { color: '#22d3ee', bg: 'rgba(0, 210, 211, 0.15)', icon: ShieldCheck },
  INFO: { color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.1)', icon: Info },
};

export function AuditLedgerModal({ isOpen, onClose }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pqcVerified, setPqcVerified] = useState(null);
  const [verifyingPqc, setVerifyingPqc] = useState(false);

  const fetchAudit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/agent/audit-ledger?limit=100');
      const data = await res.json();
      setEvents(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPqc = async () => {
    setVerifyingPqc(true);
    try {
      const res = await fetch('/api/agent/audit-ledger/verify-pqc');
      const data = await res.json();
      setPqcVerified(data);
    } catch (e) {
      console.error(e);
    } finally {
      setVerifyingPqc(false);
    }
  };

  const clearAudit = async () => {
    await fetch('/api/agent/audit-ledger/clear', { method: 'POST' });
    setEvents([]);
    setPqcVerified(null);
  };

  useEffect(() => {
    if (isOpen) {
      fetchAudit();
      handleVerifyPqc();
    }
  }, [isOpen]);

  // ─── Export Functions ───

  const downloadCSV = () => {
    if (!events.length) return;
    const headers = ["Event ID", "Timestamp (UTC)", "Actor", "Action", "Status", "Message", "Razorpay Order ID", "PQC Signature", "PQC Block Hash (SHA3-512)"];
    const rows = events.map(ev => [
      `"${ev.id}"`,
      `"${ev.timestamp}"`,
      `"${ev.actor}"`,
      `"${ev.action}"`,
      `"${ev.status}"`,
      `"${(ev.message || '').replace(/"/g, '""')}"`,
      `"${ev.razorpay_order_id || 'N/A'}"`,
      `"${ev.pqc_signature || 'N/A'}"`,
      `"${ev.pqc_block_hash || 'N/A'}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `verity_pqc_audit_ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadJSON = () => {
    if (!events.length) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      report_name: "VERITY Post-Quantum Resilient Commerce Audit Ledger",
      organization: "Razorpay AI Builder Buildathon 2026",
      security_layer: "Dual-Layer: Gateway HMAC-SHA256 + Stateful PQC ML-DSA-65 Lattice Signatures",
      hash_chain_primitive: "SHA3-512 (Keccak)",
      generated_at: new Date().toISOString(),
      total_events: events.length,
      pqc_integrity_verification: pqcVerified,
      events: events
    }, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", dataStr);
    link.setAttribute("download", `verity_pqc_audit_report_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printAuditReportPDF = () => {
    if (!events.length) return;
    const printWindow = window.open('', '_blank');
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>VERITY AI - Post-Quantum Compliance Audit Certificate</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #1e293b; background: #fff; line-height: 1.5; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #0284c7; padding-bottom: 20px; margin-bottom: 25px; }
          .title { font-size: 24px; font-weight: 800; color: #0f172a; margin: 0; }
          .subtitle { font-size: 13px; color: #64748b; margin-top: 4px; }
          .badge { background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 6px; font-weight: 700; font-size: 11px; }
          .pqc-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px; font-size: 12px; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 11px; }
          th { background: #f8fafc; text-align: left; padding: 8px 10px; border-bottom: 2px solid #cbd5e1; color: #475569; font-weight: 700; }
          td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
          .status-SUCCESS { color: #15803d; font-weight: 700; }
          .status-VIOLATION { color: #b91c1c; font-weight: 700; }
          .status-RECOVERED { color: #0284c7; font-weight: 700; }
          .mono { font-family: monospace; font-size: 10px; }
          .footer { margin-top: 35px; border-top: 1px solid #e2e8f0; padding-top: 15px; font-size: 11px; color: #94a3b8; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1 class="title">VERITY AI ⚡ Post-Quantum Audit Certificate</h1>
            <div class="subtitle">Razorpay AI Builder Internship 2026 Buildathon — Track 1: Agentic Commerce</div>
          </div>
          <div>
            <span class="badge">NIST FIPS 204 (ML-DSA-65)</span>
            <div style="font-size: 11px; color: #64748b; margin-top: 6px; text-align: right;">Generated: ${new Date().toLocaleString()}</div>
          </div>
        </div>

        <div class="pqc-box">
          <strong>🔒 Cryptographic Architecture:</strong> Dual-Layer Security Model &nbsp;|&nbsp;
          <strong>Gateway:</strong> Razorpay Native HMAC-SHA256 &nbsp;|&nbsp;
          <strong>Mandate & Ledger:</strong> Stateful NIST FIPS 204 Lattice Cryptography (SHA3-512 Merkle Chain)
        </div>

        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Actor</th>
              <th>Action</th>
              <th>Status</th>
              <th>Razorpay Order ID</th>
              <th>PQC Signature Hash</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            ${events.map(ev => `
              <tr>
                <td class="mono" style="white-space: nowrap;">${new Date(ev.timestamp).toLocaleTimeString()}</td>
                <td><strong>[${ev.actor}]</strong></td>
                <td>${ev.action}</td>
                <td class="status-${ev.status}">${ev.status}</td>
                <td class="mono">${ev.razorpay_order_id || '—'}</td>
                <td class="mono" style="color: #0369a1;">${(ev.pqc_signature || '').slice(0, 18)}...</td>
                <td>${ev.message}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="footer">
          VERITY AI — Post-Quantum Resilient Autonomous Bounded Commerce. Verified immutable hash chain.
        </div>

        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999,
      background: 'rgba(4, 7, 15, 0.85)', backdropFilter: 'blur(14px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px'
    }} onClick={onClose}>
      <div
        className="glass-panel animate-slide-up"
        style={{
          width: '100%', maxWidth: '980px', maxHeight: '90vh',
          display: 'flex', flexDirection: 'column',
          borderColor: 'rgba(0, 210, 211, 0.4)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 210, 211, 0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '20px 26px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '14px',
          background: 'rgba(6, 9, 17, 0.8)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #00d2d3, #6366f1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0, 210, 211, 0.4)'
            }}>
              <FileText size={20} color="#04131d" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
                  Explainable Audit Ledger
                </h2>
                <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                  <Shield size={11} /> NIST FIPS 204 (ML-DSA-65) PQC
                </span>
                <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{events.length} Blocks</span>
              </div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Dual-Layer Security: Gateway HMAC-SHA256 + Post-Quantum Lattice Hash Chain (SHA3-512)
              </p>
            </div>
          </div>

          {/* Action Buttons: CSV, JSON, PDF Print, Verify, Clear */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={downloadCSV}
              disabled={!events.length}
              className="btn-primary"
              style={{ padding: '7px 13px', fontSize: '0.78rem', borderRadius: '10px' }}
              title="Download Excel-compatible CSV Spreadsheet"
            >
              <FileSpreadsheet size={14} />
              <span>Export CSV</span>
            </button>

            <button
              onClick={downloadJSON}
              disabled={!events.length}
              className="btn-secondary"
              style={{ padding: '7px 12px', fontSize: '0.78rem', borderRadius: '10px' }}
              title="Download Machine-Readable JSON Audit Report"
            >
              <Download size={14} />
              <span>JSON</span>
            </button>

            <button
              onClick={printAuditReportPDF}
              disabled={!events.length}
              className="btn-secondary"
              style={{ padding: '7px 12px', fontSize: '0.78rem', borderRadius: '10px' }}
              title="Print or Save as Official PDF Certificate"
            >
              <Printer size={14} />
              <span>PDF</span>
            </button>

            <button
              onClick={handleVerifyPqc}
              className="btn-secondary"
              style={{ padding: '7px 10px', borderRadius: '10px' }}
              title="Verify Post-Quantum Cryptographic Chain"
            >
              <Cpu size={14} color="var(--brand-primary)" className={verifyingPqc ? 'pulse-active' : ''} />
            </button>

            <button onClick={fetchAudit} className="btn-secondary" style={{ padding: '7px 10px', borderRadius: '10px' }} title="Refresh">
              <RefreshCw size={14} className={loading ? 'pulse-active' : ''} />
            </button>
            <button onClick={clearAudit} className="btn-danger-outline" style={{ padding: '7px 12px', fontSize: '0.78rem', borderRadius: '10px' }}>
              Clear
            </button>
            <button onClick={onClose} className="btn-secondary" style={{ padding: '7px 10px', borderRadius: '10px' }}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* PQC Verification Status Banner */}
        {pqcVerified && pqcVerified.valid && (
          <div style={{
            padding: '10px 26px',
            background: 'rgba(16, 185, 129, 0.08)',
            borderBottom: '1px solid rgba(16, 185, 129, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399' }}>
              <CheckCircle2 size={15} />
              <span><strong>PQC Lattice Hash Chain Verified:</strong> {pqcVerified.total_blocks_verified} Merkle blocks cryptographically intact.</span>
            </div>
            <span className="text-mono" style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>
              Head Hash: {pqcVerified.head_hash?.slice(0, 16)}...
            </span>
          </div>
        )}

        {/* Events List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 26px' }}>
          {events.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-dim)' }}>
              <FileText size={36} style={{ opacity: 0.3, marginBottom: '12px' }} />
              <p style={{ fontSize: '0.9rem' }}>No audit events recorded yet. Run a purchase directive to generate the trail.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {events.map((ev) => {
                const cfg = STATUS_CONFIG[ev.status] || STATUS_CONFIG.INFO;
                const Icon = cfg.icon;
                return (
                  <div
                    key={ev.id}
                    className="glass-panel"
                    style={{
                      background: 'rgba(6, 9, 17, 0.7)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                      padding: '14px 18px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
                        <div style={{
                          width: '28px', height: '28px', borderRadius: '8px',
                          background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          marginTop: '2px'
                        }}>
                          <Icon size={16} color={cfg.color} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span className="text-mono" style={{ fontSize: '0.74rem', color: cfg.color, fontWeight: '700' }}>
                              [{ev.actor}]
                            </span>
                            <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main)' }}>
                              {ev.action}
                            </span>
                            {ev.razorpay_order_id && (
                              <span className="text-mono badge badge-primary" style={{ fontSize: '0.65rem', padding: '2px 7px' }}>
                                {ev.razorpay_order_id}
                              </span>
                            )}
                          </div>
                          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.5' }}>
                            {ev.message}
                          </p>

                          {/* PQC Hash Footer */}
                          {ev.pqc_signature && (
                            <div style={{
                              display: 'flex', alignItems: 'center', gap: '12px',
                              marginTop: '8px', paddingTop: '6px', borderTop: '1px dashed rgba(255,255,255,0.06)',
                              fontSize: '0.68rem'
                            }}>
                              <span className="text-mono" style={{ color: 'var(--brand-primary)', opacity: 0.9 }}>
                                🔒 PQC Sig: {ev.pqc_signature}
                              </span>
                              <span className="text-mono" style={{ color: 'var(--text-dim)' }}>
                                SHA3-512: {ev.pqc_block_hash?.slice(0, 16)}...
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="text-mono" style={{ fontSize: '0.68rem', color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>
                        {new Date(ev.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

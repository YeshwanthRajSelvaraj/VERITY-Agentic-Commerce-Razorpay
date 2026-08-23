import React, { useState, useEffect } from 'react';
import { Network, Search, BookOpen, ShieldCheck, Truck, RefreshCw, Layers, CheckCircle2, Award, Sparkles, Filter } from 'lucide-react';

export function RAGKnowledgeView() {
  const [docs, setDocs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const fetchKnowledge = async () => {
    try {
      const res = await fetch('/api/agent/rag/knowledge');
      const data = await res.json();
      setDocs(data);
    } catch (e) {
      console.error('Error fetching knowledge:', e);
    }
  };

  useEffect(() => {
    fetchKnowledge();
  }, []);

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch('/api/agent/rag/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery,
          category: selectedCategory === "ALL" ? null : selectedCategory,
          top_k: 6
        })
      });
      const data = await res.json();
      setSearchResults(data);
    } catch (e) {
      console.error('Search error:', e);
    } finally {
      setIsSearching(false);
    }
  };

  const categories = [
    { id: "ALL", label: "All Intelligence" },
    { id: "WARRANTY", label: "Warranties & RMA" },
    { id: "MERCHANT_POLICY", label: "Return & Refund Rules" },
    { id: "SHIPPING_RULE", label: "Shipping & SLA" },
    { id: "COMPATIBILITY", label: "Compatibility Matrix" },
    { id: "SPECIFICATION", label: "Specifications" }
  ];

  const displayedDocs = searchResults
    ? searchResults.map(r => ({ ...r.document, similarity_score: r.similarity_score, snippet: r.relevance_snippet }))
    : (selectedCategory === "ALL" ? docs : docs.filter(d => d.category === selectedCategory));

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Info */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #00d2d3, #0284c7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <BookOpen size={22} color="#04131d" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
              RAG-Powered Commerce Intelligence
            </h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Dense neural vector retrieval indexing warranties, refund policies, SLAs & compatibility matrices
            </p>
          </div>
        </div>

        <span className="badge badge-primary" style={{ fontSize: '0.75rem', padding: '6px 12px' }}>
          {docs.length} Knowledge Chunks Indexed
        </span>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel" style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search specifications, return policies, warranty rules (e.g. 'KeyChron warranty refund', 'Mac M2 dock compatibility')..."
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '10px',
                background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-subtle)',
                color: 'var(--text-main)', fontSize: '0.88rem', outline: 'none'
              }}
            />
          </div>
          <button type="submit" disabled={isSearching} className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.88rem' }}>
            <Search size={16} /> {isSearching ? 'Retrieving Chunks...' : 'Vector Search'}
          </button>
          {searchResults && (
            <button
              type="button"
              onClick={() => { setSearchResults(null); setSearchQuery(""); }}
              className="btn-secondary"
              style={{ padding: '10px 16px', fontSize: '0.82rem' }}
            >
              Clear Results
            </button>
          )}
        </form>

        {/* Category Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => { setSelectedCategory(c.id); if (searchResults) handleSearch(); }}
              style={{
                background: selectedCategory === c.id ? 'rgba(0, 210, 211, 0.18)' : 'rgba(255,255,255,0.04)',
                color: selectedCategory === c.id ? 'var(--brand-primary)' : 'var(--text-muted)',
                border: selectedCategory === c.id ? '1px solid var(--brand-primary)' : '1px solid rgba(255,255,255,0.06)',
                padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer'
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {displayedDocs.map((doc, idx) => {
          const score = doc.similarity_score;

          return (
            <div
              key={doc.id || idx}
              className="glass-panel animate-slide-up"
              style={{
                padding: '22px', display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between', gap: '14px',
                border: score ? '1px solid rgba(0, 210, 211, 0.4)' : '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <span className="badge" style={{
                    fontSize: '0.68rem',
                    background: doc.category === 'WARRANTY' ? 'rgba(16,185,129,0.15)' : doc.category === 'SHIPPING_RULE' ? 'rgba(56,189,248,0.15)' : 'rgba(192,132,252,0.15)',
                    color: doc.category === 'WARRANTY' ? '#34d399' : doc.category === 'SHIPPING_RULE' ? '#38bdf8' : '#c084fc'
                  }}>
                    {doc.category}
                  </span>
                  
                  {score && (
                    <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                      Match: {Math.round(score * 100)}%
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#fff', lineHeight: '1.3' }}>
                  {doc.title}
                </h3>

                <span style={{ fontSize: '0.72rem', color: 'var(--brand-primary)', fontWeight: '600' }}>
                  Merchant: {doc.merchant_name || 'All Verified Sellers'}
                </span>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: '1.5', marginTop: '4px' }}>
                  {doc.content}
                </p>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
                {doc.tags?.map((t, tIdx) => (
                  <span key={tIdx} style={{
                    fontSize: '0.68rem', color: 'var(--text-dim)',
                    background: 'rgba(0,0,0,0.3)', padding: '2px 8px', borderRadius: '4px'
                  }}>
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Search, 
  Activity, 
  Brain, 
  Cpu, 
  Globe, 
  Database, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp,
  FileText,
  AlertCircle,
  BarChart3,
  RefreshCw,
  MoreVertical,
  PlusCircle
} from 'lucide-react';
import ClassificationForm from './ClassificationForm';

const AIDiseaseClassification = () => {
  const [activeTab, setActiveTab] = useState('engine');
  const [classificationLogs, setClassificationLogs] = useState([
    { id: 'REC-2948', disease: 'Dengue Fever', icd: 'A90', confidence: 94.2, timestamp: '2m ago', district: 'Chittoor', status: 'Verified' },
    { id: 'REC-2947', disease: 'Influenza-like Illness', icd: 'J11', confidence: 88.5, timestamp: '5m ago', district: 'Visakhapatnam', status: 'Pending' },
    { id: 'REC-2946', disease: 'Acute Diarrheal Disease', icd: 'A09', confidence: 97.1, timestamp: '12m ago', district: 'Guntur', status: 'Verified' },
    { id: 'REC-2945', disease: 'Enteric Fever', icd: 'A01.0', confidence: 91.8, timestamp: '22m ago', district: 'Krishna', status: 'Verified' },
  ]);

  return (
    <div className="ai-classification-container animate-fade">
      <div className="mesh-gradient-ai"></div>
      
      <header className="ai-header">
        <div className="ai-brand">
          <div className="ai-icon-pulse">
            <Brain size={32} />
          </div>
          <div>
            <h1>Statewide Disease Classification Engine</h1>
            <p>Automated clinical NLP pipeline for real-time ICD-10 surveillance</p>
          </div>
        </div>
        <div className="ai-metrics-quick">
          <div className="q-metric">
            <span className="q-val">94.8%</span>
            <span className="q-lbl">Avg. Confidence</span>
          </div>
          <div className="q-metric">
            <span className="q-val">1.2s</span>
            <span className="q-lbl">Latency (P95)</span>
          </div>
        </div>
      </header>

      <nav className="ai-nav">
        <button 
          className={`ai-nav-item ${activeTab === 'engine' ? 'active' : ''}`}
          onClick={() => setActiveTab('engine')}
        >
          <Cpu size={18} /> AI Core Engine
        </button>
        <button 
          className={`ai-nav-item ${activeTab === 'intake' ? 'active' : ''}`}
          onClick={() => setActiveTab('intake')}
        >
          <PlusCircle size={18} /> Patient Intake
        </button>
        <button 
          className={`ai-nav-item ${activeTab === 'logs' ? 'active' : ''}`}
          onClick={() => setActiveTab('logs')}
        >
          <Database size={18} /> Classification Logs
        </button>
      </nav>

      <div className="ai-content">
        {activeTab === 'engine' && (
          <div className="engine-overview grid-layout">
            <div className="v-card metrics-card animate-slide-up">
              <div className="v-card-header">
                <h3><Activity size={20} color="var(--primary)" /> Real-time Performance</h3>
                <RefreshCw size={16} className="spin-slow" />
              </div>
              <div className="v-card-body">
                <div className="stat-bars">
                  <div className="bar-item">
                    <div className="bar-info"><span>NLP Tokenization</span><span>99.9%</span></div>
                    <div className="bar-track"><div className="bar-fill" style={{ width: '99.9%' }}></div></div>
                  </div>
                  <div className="bar-item">
                    <div className="bar-info"><span>Disease Inference</span><span>94.2%</span></div>
                    <div className="bar-track"><div className="bar-fill" style={{ width: '94.2%', background: 'var(--secondary)' }}></div></div>
                  </div>
                  <div className="bar-item">
                    <div className="bar-info"><span>ICD-10 Mapping</span><span>98.5%</span></div>
                    <div className="bar-track"><div className="bar-fill" style={{ width: '98.5%', background: '#10b981' }}></div></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="v-card live-feed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="v-card-header">
                <h3><Zap size={20} color="var(--accent)" /> Live Inference Stream</h3>
              </div>
              <div className="v-card-body" style={{ padding: 0 }}>
                <div className="feed-list">
                  {classificationLogs.map((log) => (
                    <div key={log.id} className="feed-item">
                      <div className="feed-icon"><ShieldCheck size={16} /></div>
                      <div className="feed-main">
                        <div className="feed-top">
                          <strong>{log.disease}</strong>
                          <span className="log-id">{log.id}</span>
                        </div>
                        <div className="feed-meta">
                          <span>{log.district}</span>
                          <span>•</span>
                          <span>{log.timestamp}</span>
                        </div>
                      </div>
                      <div className="feed-badge" style={{ background: log.confidence > 90 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', color: log.confidence > 90 ? '#10b981' : '#f59e0b' }}>
                        {log.confidence}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="v-card animate-slide-up" style={{ gridColumn: 'span 2', animationDelay: '0.2s' }}>
              <div className="v-card-header">
                <h3><Globe size={20} color="var(--secondary)" /> Geospatial Intelligence Node</h3>
              </div>
              <div className="v-card-body" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: "var(--surface-light)", borderRadius: '12px', border: '1px solid var(--border)' }}>
                 <div style={{ textAlign: 'center' }}>
                   <BarChart3 size={48} color="var(--primary)" style={{ opacity: 0.5, marginBottom: '1rem' }} />
                   <p style={{ color: 'var(--text-muted)' }}>Regional Distribution Analysis Processing...</p>
                 </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'intake' && (
          <div className="intake-section animate-slide-up">
            <ClassificationForm />
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="v-card table-card animate-slide-up">
            <div className="v-card-header">
              <h3><Database size={20} color="var(--primary)" /> Master Classification Ledger</h3>
            </div>
            <div className="v-card-body" style={{ padding: 0 }}>
              <table className="v-table">
                <thead>
                  <tr>
                    <th>Record ID</th>
                    <th>Classified Disease</th>
                    <th>ICD-10 Code</th>
                    <th>District</th>
                    <th>Confidence</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {classificationLogs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.id}</td>
                      <td><strong>{log.disease}</strong></td>
                      <td><code>{log.icd}</code></td>
                      <td>{log.district}</td>
                      <td>
                        <div className="conf-bar-small">
                          <div className="fill" style={{ width: `${log.confidence}%` }}></div>
                          <span>{log.confidence}%</span>
                        </div>
                      </td>
                      <td><span className={`status-pill ${log.status.toLowerCase()}`}>{log.status}</span></td>
                      <td><button className="icon-btn"><MoreVertical size={16} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .ai-classification-container {
          padding: 2.5rem;
          color: var(--text);
          max-width: 1600px;
          margin: 0 auto;
        }

        .ai-classification-container h1 {
          font-size: 3.5rem;
          font-weight: 900;
          letter-spacing: -2px;
          margin-bottom: 0.5rem;
          color: var(--text);
        }

        .ai-classification-container p {
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .mesh-gradient-ai {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 10% 10%, var(--primary-glow) 0%, transparent 50%),
                      radial-gradient(circle at 90% 90%, var(--accent-glow) 0%, transparent 50%);
          z-index: -1;
          pointer-events: none;
        }

        .ai-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4rem;
        }

        .ai-brand {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        .ai-icon-pulse {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text);
          box-shadow: 0 10px 30px var(--primary-glow);
          animation: pulse-glow 3s infinite;
        }

        @keyframes pulse-glow {
          0% { box-shadow: 0 0 20px var(--primary-glow); }
          50% { box-shadow: 0 0 40px var(--primary-glow); }
          100% { box-shadow: 0 0 20px var(--primary-glow); }
        }

        .ai-metrics-quick {
          display: flex;
          gap: 3rem;
        }

        .q-metric {
          text-align: right;
        }

        .q-val {
          display: block;
          font-size: 2.2rem;
          font-weight: 900;
          color: var(--primary);
        }

        .q-lbl {
          font-size: 0.9rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 800;
        }

        .ai-nav {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 3rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 1.5rem;
        }

        .ai-nav-item {
          background: transparent;
          border: none;
          color: var(--text-muted);
          padding: 14px 28px;
          font-size: 1.1rem;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: var(--transition);
          border-radius: 16px;
        }

        .ai-nav-item:hover {
          color: var(--primary);
          background: var(--surface-light);
        }

        .ai-nav-item.active {
          color: var(--text);
          background: var(--primary);
          box-shadow: 0 8px 20px var(--primary-glow);
        }

        .grid-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
        }

        .stat-bars {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .bar-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 1rem;
          font-weight: 800;
        }

        .bar-track {
          height: 12px;
          background: var(--surface-light);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--border);
        }

        .bar-fill {
          height: 100%;
          background: var(--primary);
          border-radius: 20px;
          box-shadow: 0 0 15px var(--primary-glow);
        }

        .feed-list {
          display: flex;
          flex-direction: column;
        }

        .feed-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid var(--border);
          transition: var(--transition);
        }

        .feed-item:hover {
          background: var(--surface-light);
          transform: translateX(10px);
        }

        .feed-icon {
          width: 44px;
          height: 44px;
          background: var(--primary-glow);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
        }

        .feed-main { flex: 1; }
        .feed-top { display: flex; justify-content: space-between; margin-bottom: 4px; }
        .feed-top strong { font-size: 1.2rem; font-weight: 900; color: var(--text); }
        .log-id { font-size: 0.85rem; color: var(--text-muted); font-weight: 800; }
        .feed-meta { font-size: 0.9rem; color: var(--text-muted); display: flex; gap: 10px; font-weight: 700; }
        .feed-badge { font-size: 0.9rem; font-weight: 900; padding: 6px 14px; border-radius: 100px; }

        .conf-bar-small {
          display: flex;
          align-items: center;
          gap: 15px;
          font-size: 0.9rem;
          font-weight: 800;
        }

        .conf-bar-small .fill {
          height: 6px;
          background: var(--primary);
          border-radius: 10px;
          width: 120px;
          box-shadow: 0 0 10px var(--primary-glow);
        }

        .status-pill {
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 900;
          text-transform: uppercase;
        }

        .status-pill.verified { background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2); }
        .status-pill.pending { background: var(--primary-glow); color: var(--primary); border: 1px solid var(--border); }

        .spin-slow { animation: spin 4s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-slide-up {
          animation: slideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default AIDiseaseClassification;

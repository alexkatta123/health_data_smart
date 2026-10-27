import React, { useState } from 'react';
import { Key, Shield, ShieldCheck, Database, Cpu, Globe, ArrowRight, Copy, CheckCircle2, AlertTriangle, Terminal, Lock } from 'lucide-react';

const CreateServiceAccount = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    role: 'Read-only',
    expiry: '90 Days',
    scope: ['Epidemiological Data']
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedKey, setGeneratedKey] = useState(null);
  const [copied, setCopied] = useState(false);

  const roles = [
    { id: 'Read-only', title: 'Intelligence Observer', desc: 'Authorized to view and monitor regional health trends without data mutation.', color: '#94a3b8' },
    { id: 'Data-Entry', title: 'Data Feed Integrator', desc: 'Permission to push raw clinical data into the surveillance stream.', color: '#10b981' },
    { id: 'AI-Model', title: 'AI Model Service', desc: 'High-compute access for training and inference on anonymized datasets.', color: '#8b5cf6' },
    { id: 'Admin', title: 'System Orchestrator', desc: 'Full administrative access to platform infrastructure and user nodes.', color: '#ef4444' }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedKey(`SAP_KEY_${Math.random().toString(36).substr(2, 9).toUpperCase()}_${Date.now().toString(36).toUpperCase()}`);
      setIsGenerating(false);
      setStep(3);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="service-account-portal animate-fade">
      <div className="portal-header-tactical">
        <div className="p-title-group">
          <h1>Initialize Service Account</h1>
          <p>Generate secure, automated credentials for system-to-system intelligence integration.</p>
        </div>
        <div className="p-status-badge">
          <Shield size={14} />
          <span>DPDP-2023 COMPLIANT</span>
        </div>
      </div>

      <div className="tactical-stepper">
        <div className={`step-node ${step >= 1 ? 'active' : ''}`}>1. Configuration</div>
        <div className="step-line"></div>
        <div className={`step-node ${step >= 2 ? 'active' : ''}`}>2. Authorization</div>
        <div className="step-line"></div>
        <div className={`step-node ${step >= 3 ? 'active' : ''}`}>3. Initialization</div>
      </div>

      <div className="portal-main-content">
        {step === 1 && (
          <div className="config-pane animate-slide-up">
            <div className="form-grid-p">
              <div className="form-group-p">
                <label>Account Name</label>
                <div className="input-with-icon">
                  <Terminal size={18} />
                  <input 
                    type="text" 
                    placeholder="e.g. VISAKHAPATNAM_GH_AI_FEED" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group-p">
                <label>Access Tier / Role</label>
                <div className="role-selector-grid">
                  {roles.map(r => (
                    <div 
                      key={r.id} 
                      className={`role-card-p ${formData.role === r.id ? 'active' : ''}`}
                      onClick={() => setFormData({...formData, role: r.id})}
                      style={{ '--r-color': r.color }}
                    >
                      <div className="r-check"><CheckCircle2 size={16} /></div>
                      <div className="r-content">
                        <strong>{r.title}</strong>
                        <p>{r.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group-p">
                <label>Token Lifespan</label>
                <select 
                  className="select-p"
                  value={formData.expiry}
                  onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                >
                  <option>30 Days</option>
                  <option>90 Days</option>
                  <option>1 Year</option>
                  <option>Never (Service Level)</option>
                </select>
              </div>
            </div>

            <div className="action-footer-p">
              <button 
                className="h-btn-primary large" 
                disabled={!formData.name}
                onClick={() => setStep(2)}
              >
                Proceed to Authorization <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="auth-pane animate-slide-up">
            <div className="security-check-card">
              <div className="s-icon-header">
                <ShieldCheck size={64} color="#10b981" />
              </div>
              <h2>Security Verification</h2>
              <p>You are about to generate a <strong>{formData.role}</strong> credential for <strong>{formData.name}</strong>.</p>
              
              <div className="warning-box-p">
                <AlertTriangle size={20} />
                <p>Ensure this key is stored in a secure vault. It will only be displayed once during initialization.</p>
              </div>

              <div className="auth-actions">
                <button className="h-btn-outline" onClick={() => setStep(1)}>Back</button>
                <button 
                  className="h-btn-primary large" 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Initializing Crypto-Link...' : 'Generate Secure Key'}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="init-pane animate-slide-up">
            <div className="key-reveal-card">
              <div className="k-header">
                <div className="k-badge">INITIALIZATION COMPLETE</div>
                <h2>Service Account Key Generated</h2>
              </div>

              <div className="key-display-area">
                <div className="k-label">PRIMARY API KEY</div>
                <div className="k-value-box">
                  <code>{generatedKey}</code>
                  <button className="copy-btn" onClick={copyToClipboard}>
                    {copied ? <CheckCircle2 size={18} color="#10b981" /> : <Copy size={18} />}
                  </button>
                </div>
              </div>

              <div className="key-meta-grid">
                <div className="k-meta">
                  <small>NODE ASSIGNMENT</small>
                  <strong>SAP-OFFICIAL-001</strong>
                </div>
                <div className="k-meta">
                  <small>EXPIRATION</small>
                  <strong>{formData.expiry}</strong>
                </div>
              </div>

              <div className="action-footer-p">
                <button className="h-btn-primary large" onClick={() => window.location.reload()}>
                  Complete & Finish
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .service-account-portal {
          padding: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .portal-header-tactical {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 3rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding-bottom: 2rem;
        }

        .p-title-group h1 { font-size: 2.5rem; font-weight: 900; letter-spacing: -1px; margin-bottom: 0.5rem; }
        .p-title-group p { color: var(--text-muted); font-weight: 600; font-size: 1.1rem; }

        .p-status-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 900;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .tactical-stepper {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 4rem;
        }

        .step-node {
          font-size: 0.8rem;
          font-weight: 900;
          color: #334155;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: 0.3s;
        }
        .step-node.active { color: var(--primary); }
        .step-line { flex: 1; height: 1px; background: var(--surface); }

        .form-grid-p { display: flex; flex-direction: column; gap: 2.5rem; }
        .form-group-p label { display: block; font-size: 0.75rem; font-weight: 900; text-transform: uppercase; color: var(--text-muted); margin-bottom: 1rem; letter-spacing: 1px; }

        .input-with-icon {
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          color: var(--text-muted);
          transition: 0.3s;
        }
        .input-with-icon:focus-within { border-color: var(--primary); background: var(--surface); }
        .input-with-icon input { background: transparent; border: none; color: var(--text); font-size: 1rem; font-weight: 600; width: 100%; outline: none; }

        .role-selector-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .role-card-p {
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 1.5rem;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .role-card-p:hover { border-color: var(--r-color); background: var(--surface); transform: translateY(-5px); }
        .role-card-p.active { border-color: var(--r-color); background: rgba(var(--primary-rgb), 0.05); }

        .r-check { position: absolute; right: 1rem; top: 1rem; color: var(--r-color); opacity: 0; transition: 0.3s; }
        .role-card-p.active .r-check { opacity: 1; }

        .r-content strong { display: block; font-size: 1.1rem; margin-bottom: 0.5rem; }
        .r-content p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; font-weight: 600; }

        .select-p {
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 14px 20px;
          color: var(--text);
          font-weight: 700;
          width: 100%;
          outline: none;
        }

        .action-footer-p { margin-top: 4rem; display: flex; justify-content: flex-end; }

        .security-check-card {
          text-align: center;
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 4rem;
          border-radius: 30px;
          max-width: 600px;
          margin: 0 auto;
        }

        .s-icon-header { margin-bottom: 2rem; }
        .security-check-card h2 { font-size: 2rem; font-weight: 900; margin-bottom: 1rem; }
        .security-check-card p { color: var(--text-muted); font-weight: 600; margin-bottom: 2.5rem; }

        .warning-box-p {
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.2);
          padding: 1.5rem;
          border-radius: 16px;
          color: #f59e0b;
          display: flex;
          align-items: center;
          gap: 15px;
          text-align: left;
          margin-bottom: 3rem;
        }
        .warning-box-p p { margin: 0; color: inherit; font-size: 0.85rem; }

        .auth-actions { display: flex; gap: 1.5rem; justify-content: center; }

        .key-reveal-card {
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 4rem;
          border-radius: 30px;
          text-align: center;
        }

        .k-badge { display: inline-block; padding: 6px 14px; background: var(--surface-light); color: black; border-radius: 100px; font-size: 0.7rem; font-weight: 900; margin-bottom: 1.5rem; }
        .key-reveal-card h2 { font-size: 2rem; font-weight: 900; margin-bottom: 3rem; }

        .key-display-area { margin-bottom: 3rem; text-align: left; }
        .k-label { font-size: 0.7rem; font-weight: 900; color: var(--text-muted); margin-bottom: 1rem; letter-spacing: 2px; }
        .k-value-box {
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 1.5rem 2rem;
          border-radius: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .k-value-box code { color: #10b981; font-family: monospace; font-size: 1.2rem; font-weight: 900; }
        .copy-btn { background: transparent; border: none; color: var(--text-muted); cursor: pointer; transition: 0.3s; }
        .copy-btn:hover { color: var(--text); }

        .key-meta-grid { display: flex; gap: 4rem; justify-content: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 3rem; }
        .k-meta { text-align: left; }
        .k-meta small { display: block; font-size: 0.65rem; color: var(--text-muted); font-weight: 800; margin-bottom: 4px; }
        .k-meta strong { color: var(--text); font-size: 0.9rem; }
      `}</style>
    </div>
  );
};

export default CreateServiceAccount;

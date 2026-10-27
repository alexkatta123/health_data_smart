import React, { useState, useEffect } from 'react';
import { 
  CloudSync, 
  Upload, 
  Terminal, 
  Activity, 
  CheckCircle, 
  AlertCircle, 
  ShieldCheck, 
  Database,
  ArrowRight,
  Globe,
  Zap
} from 'lucide-react';

const DataIngestionGateway = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [logs, setLogs] = useState([]);
  const [syncProgress, setSyncProgress] = useState(0);
  const [stats, setStats] = useState({
    recordsIngested: 0,
    errorsFound: 0,
    apiStatus: 'Connected'
  });

  const addLog = (msg, type = 'info') => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [{ time, msg, type }, ...prev].slice(0, 8));
  };

  const handleSync = () => {
    setIsSyncing(true);
    setSyncProgress(0);
    setLogs([]);
    addLog("Initializing secure handshake with State Health Hub...", 'info');
    
    const steps = [
      { p: 15, msg: "Authenticating with eSanjeevani API gateway...", type: 'info' },
      { p: 35, msg: "Fetching encrypted EMR batches from 26 districts...", type: 'info' },
      { p: 55, msg: "Applying DPDP 2023 Anonymization filters...", type: 'success' },
      { p: 75, msg: "Running AI Classification Engine on 1,420 clinical notes...", type: 'info' },
      { p: 90, msg: "Mapping SNOMED CT / ICD-10 standardized codes...", type: 'success' },
      { p: 100, msg: "Sync Complete. 1,412 records ingested successfully.", type: 'success' }
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setSyncProgress(step.p);
        addLog(step.msg, step.type);
        if (step.p === 100) {
          setIsSyncing(false);
          setStats(prev => ({
            ...prev,
            recordsIngested: prev.recordsIngested + 1412
          }));
        }
      }, (index + 1) * 1200);
    });
  };

  return (
    <div className="ingestion-gateway animate-fade">
      <div className="section-header-h" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900 }}>Data Ingestion Gateway</h2>
        <p style={{ color: 'var(--text-muted)' }}>Simulated Integration with AP State Health Portals (HMIS / eSanjeevani)</p>
      </div>

      <div className="gateway-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Main Sync Control */}
        <div className="mo-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ padding: '12px', background: 'var(--primary-glow)', borderRadius: '12px', color: 'var(--primary)' }}>
                <CloudSync size={28} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontWeight: 900 }}>Statewide API Sync</h3>
                <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700 }}>● SECURE UPLINK ACTIVE</span>
              </div>
            </div>
            <button 
              className="h-btn h-btn-primary" 
              onClick={handleSync}
              disabled={isSyncing}
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              {isSyncing ? <Zap className="animate-pulse" size={18} /> : <CloudSync size={18} />}
              {isSyncing ? "Syncing Statewide Data..." : "Manual Sync Now"}
            </button>
          </div>

          <div className="progress-container" style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 700 }}>
              <span>Extraction Progress</span>
              <span>{syncProgress}%</span>
            </div>
            <div style={{ height: '10px', background: 'var(--surface-light)', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ 
                height: '100%', 
                background: 'var(--primary)', 
                width: `${syncProgress}%`, 
                transition: 'width 0.5s ease-in-out',
                boxShadow: '0 0 10px var(--primary-glow)'
              }}></div>
            </div>
          </div>

          <div className="gateway-terminal" style={{ background: 'var(--surface-light)', borderRadius: '20px', padding: '1.5rem', fontFamily: 'monospace', fontSize: '0.8rem', border: '1px solid var(--border)', minHeight: '300px', position: 'relative' }}>
           <div className="terminal-header" style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--error)' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--warning)' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--success)' }}></div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: '10px', fontWeight: 900 }}>STATE_SYNC_UPLINK v2.4.0</span>
           </div>
           <div className="terminal-body" style={{ color: 'var(--text)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {logs.map((log, i) => (
                <div key={i} className="animate-fade" style={{ display: 'flex', gap: '15px' }}>
                   <span style={{ color: 'var(--primary)', fontWeight: 900 }}>[{log.time}]</span>
                   <span style={{ fontWeight: 600 }}>{log.msg}</span>
                </div>
              ))}
              {isSyncing && (
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                   <span style={{ color: 'var(--primary)', fontWeight: 900 }}>[SYS]</span>
                   <div style={{ width: '8px', height: '15px', background: 'var(--primary)', animation: 'blink 0.8s infinite' }}></div>
                </div>
              )}
           </div>
        </div>
        </div>

        {/* Integration Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="mo-card" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Integration Health</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '10px' }}><Globe size={16} /> eSanjeevani</span>
                <span style={{ color: 'var(--success)', fontWeight: 900, fontSize: '0.8rem' }}>ACTIVE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '10px' }}><Database size={16} /> HMIS Core</span>
                <span style={{ color: '#10b981', fontWeight: 900, fontSize: '0.8rem' }}>ACTIVE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '10px' }}><ShieldCheck size={16} /> DPDP Filter</span>
                <span style={{ color: '#10b981', fontWeight: 900, fontSize: '0.8rem' }}>COMPLIANT</span>
              </div>
            </div>
          </div>

          <div className="mo-card" style={{ padding: '1.5rem', background: 'var(--primary)', color: "var(--text)" }}>
            <Activity size={32} style={{ marginBottom: '1rem', opacity: 0.8 }} />
            <div style={{ fontSize: '2rem', fontWeight: 900 }}>{stats.recordsIngested.toLocaleString()}</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, opacity: 0.9 }}>RECORDS INGESTED TODAY</div>
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', fontWeight: 900 }}>
               <CheckCircle size={14} /> 99.8% CLASSIFIED
            </div>
          </div>

          <div className="mo-card" style={{ padding: '1.5rem', border: '1px dashed var(--border)', background: 'transparent' }}>
             <div style={{ textAlign: 'center', padding: '1rem' }}>
                <Upload size={32} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                <h4 style={{ margin: '0 0 5px 0' }}>Bulk Import</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Drag and drop CSV/JSON EMR records for mass classification.</p>
                <button className="secondary-btn" style={{ marginTop: '1rem', width: '100%', fontSize: '0.8rem' }}>Browse Files</button>
             </div>
          </div>
        </div>

      </div>

      <style>{`
        .ingestion-gateway { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default DataIngestionGateway;

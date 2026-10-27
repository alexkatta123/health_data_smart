import React from 'react';
import { 
  ShieldAlert, Send, Users, 
  MessageSquare, Radio, Bell,
  ChevronRight, ArrowRight, Zap,
  AlertTriangle, Globe
} from 'lucide-react';

const DistrictCommandCenter = () => {
  const activeAdvisories = [
    { id: 'ADV-01', target: 'Gajuwaka PHCs', subject: 'Water-borne outbreak protocol', status: 'Sent', time: '2h ago' },
    { id: 'ADV-02', target: 'District Medical Officers', subject: 'Larvicide shortage directive', status: 'Active', time: '5h ago' },
    { id: 'ADV-03', target: 'Pendurthi CHC', subject: 'Immediate case verification required', status: 'Pending', time: '12m ago' }
  ];

  return (
    <div className="module-padding animate-fade">
      <div className="command-layout">
        {/* Left: Advisory Panel */}
        <div className="advisory-panel">
           <div className="dho-card-v7">
              <div className="card-header-v7">
                 <div className="title-group-v7">
                    <Radio size={24} className="text-primary animate-pulse" />
                    <div>
                       <h3>District Advisory Console</h3>
                       <p>Issue high-priority directives to sub-district facilities</p>
                    </div>
                 </div>
              </div>

              <div className="advisory-form">
                 <div className="form-group-v7">
                    <label>Target Recipients</label>
                    <select>
                       <option>All District Facilities</option>
                       <option>Gajuwaka Mandal PHCs</option>
                       <option>Pendurthi Mandal PHCs</option>
                       <option>District Medical Officers only</option>
                       <option>Community Health Volunteers</option>
                    </select>
                 </div>

                 <div className="form-group-v7">
                    <label>Priority Level</label>
                    <div className="priority-selector">
                       <button className="p-opt low">Standard</button>
                       <button className="p-opt med">Elevated</button>
                       <button className="p-opt high active">Critical Outbreak</button>
                    </div>
                 </div>

                 <div className="form-group-v7">
                    <label>Advisory Content</label>
                    <textarea placeholder="Type your surveillance directive or emergency advisory here..."></textarea>
                 </div>

                 <div className="advisory-footer">
                    <div className="attachment-info">
                       <span>No files attached</span>
                    </div>
                    <button className="send-advisory-btn">
                       <Send size={18} /> BROADCAST ADVISORY
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Right: Monitoring & History */}
        <div className="status-sidebar">
           <div className="dho-card-v7 mini">
              <h3>Real-time Response Status</h3>
              <div className="response-stats">
                 <div className="r-stat-v7">
                    <span>ACK RATE</span>
                    <strong>92%</strong>
                 </div>
                 <div className="r-stat-v7">
                    <span>AVG RESP</span>
                    <strong>14m</strong>
                 </div>
              </div>
           </div>

           <div className="dho-card-v7 history">
              <div className="history-header">
                 <h3>Sent Directives</h3>
                 <button className="view-all-btn">View All</button>
              </div>
              <div className="history-list">
                 {activeAdvisories.map((adv, i) => (
                   <div key={i} className="history-item">
                      <div className="h-top">
                         <span className="h-id">{adv.id}</span>
                         <span className="h-time">{adv.time}</span>
                      </div>
                      <div className="h-subject">{adv.subject}</div>
                      <div className="h-target">To: {adv.target}</div>
                      <div className={`h-status ${adv.status.toLowerCase()}`}>
                         {adv.status}
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="emergency-contact-card">
              <div className="e-top">
                 <ShieldAlert size={20} />
                 <h4>State Emergency Link</h4>
              </div>
              <p>Direct channel to SHC-3 State Command is open and encrypted.</p>
              <button className="connect-btn">ESTABLISH SECURE LINK</button>
           </div>
        </div>
      </div>

      <style>{`
        .command-layout { padding: 1.5rem; display: grid; grid-template-columns: 1.7fr 1fr; gap: 1.5rem; }
        
        .dho-card-v7 { background: var(--surface); border: 1px solid var(--border); border-radius: 32px; padding: 2rem; }
        .dho-card-v7.mini { padding: 1.5rem; margin-bottom: 1.5rem; }
        .dho-card-v7.history { flex: 1; min-height: 400px; }

        .card-header-v7 { margin-bottom: 2rem; }
        .title-group-v7 { display: flex; gap: 15px; align-items: center; }
        .title-group-v7 h3 { margin: 0; font-size: 1.4rem; font-weight: 900; }
        .title-group-v7 p { margin: 4px 0 0 0; color: var(--text-muted); font-size: 0.9rem; font-weight: 600; }

        .advisory-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .form-group-v7 label { display: block; font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 10px; letter-spacing: 0.5px; }
        
        .form-group-v7 select, .form-group-v7 textarea {
          width: 100%; background: var(--surface); border: 1px solid var(--border);
          border-radius: 14px; color: var(--text); padding: 12px; font-size: 0.95rem; outline: none;
        }
        .form-group-v7 textarea { height: 180px; resize: none; border-style: dashed; }
        .form-group-v7 textarea:focus { border-color: var(--primary); background: rgba(14, 165, 233, 0.05); }

        .priority-selector { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
        .p-opt { padding: 10px; border-radius: 10px; border: 1px solid var(--border); background: transparent; color: var(--text-muted); font-size: 0.8rem; font-weight: 800; cursor: pointer; }
        .p-opt.active.high { background: rgba(244, 63, 94, 0.1); color: #f43f5e; border-color: #f43f5e; }
        .p-opt.active.med { background: rgba(245, 158, 11, 0.1); color: #f59e0b; border-color: #f59e0b; }
        .p-opt.active.low { background: rgba(16, 185, 129, 0.1); color: #10b981; border-color: #10b981; }

        .advisory-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; }
        .attachment-info { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
        
        .send-advisory-btn {
          background: #f59e0b; color: #000; border: none; padding: 14px 28px; border-radius: 14px;
          font-weight: 900; font-size: 1rem; display: flex; align-items: center; gap: 12px;
          cursor: pointer; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 10px 20px rgba(245, 158, 11, 0.2);
        }
        .send-advisory-btn:hover { transform: scale(1.05); box-shadow: 0 15px 30px rgba(245, 158, 11, 0.3); }

        .response-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px; }
        .r-stat-v7 { background: var(--surface); padding: 12px; border-radius: 12px; border: 1px solid var(--border); }
        .r-stat-v7 span { font-size: 0.65rem; color: var(--text-muted); font-weight: 800; }
        .r-stat-v7 strong { display: block; font-size: 1.2rem; font-weight: 900; color: var(--primary); }

        .history-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .history-header h3 { font-size: 1.1rem; margin: 0; }
        .view-all-btn { font-size: 0.75rem; color: var(--primary); background: transparent; border: none; font-weight: 800; cursor: pointer; }

        .history-list { display: flex; flex-direction: column; gap: 12px; }
        .history-item { background: var(--surface); padding: 1rem; border-radius: 16px; border: 1px solid var(--border); position: relative; }
        .h-top { display: flex; justify-content: space-between; margin-bottom: 6px; }
        .h-id { font-size: 0.65rem; color: var(--primary); font-weight: 900; }
        .h-time { font-size: 0.65rem; color: var(--text-muted); font-weight: 700; }
        .h-subject { font-size: 0.9rem; font-weight: 800; margin-bottom: 4px; }
        .h-target { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; margin-bottom: 8px; }
        .h-status { font-size: 0.65rem; font-weight: 900; text-transform: uppercase; padding: 2px 8px; border-radius: 4px; display: inline-block; }
        .h-status.sent { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .h-status.active { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .h-status.pending { background: var(--surface); color: var(--text); }

        .emergency-contact-card {
          margin-top: 1.5rem; background: rgba(244, 63, 94, 0.05); border: 1px solid rgba(244, 63, 94, 0.2);
          border-radius: 24px; padding: 1.5rem;
        }
        .e-top { display: flex; align-items: center; gap: 10px; color: #f43f5e; margin-bottom: 10px; }
        .e-top h4 { margin: 0; font-size: 1rem; font-weight: 900; }
        .emergency-contact-card p { font-size: 0.8rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 15px; }
        .connect-btn { width: 100%; background: #f43f5e; color: var(--text); border: none; padding: 10px; border-radius: 10px; font-weight: 800; font-size: 0.8rem; cursor: pointer; }
      `}</style>
    </div>
  );
};

export default DistrictCommandCenter;

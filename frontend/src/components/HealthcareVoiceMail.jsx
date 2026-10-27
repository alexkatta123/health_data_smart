import React, { useState } from 'react';
import { 
  Mic, 
  Volume2, 
  VolumeX,
  Play, 
  Pause, 
  Clock, 
  User, 
  Phone, 
  AlertCircle, 
  CheckCircle2, 
  MessageSquare, 
  Trash2, 
  Share2,
  Brain,
  Download,
  Filter,
  Search,
  ChevronRight
} from 'lucide-react';

const HealthcareVoiceMail = () => {
  const [activeMessage, setActiveMessage] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const voiceMails = [
    { 
      id: 'VM-201', 
      sender: 'Dr. Ramesh Kumar', 
      role: 'District Health Officer', 
      time: '10:45 AM', 
      duration: '0:42', 
      priority: 'High', 
      transcription: 'Immediate requirement of 500 doses of Dengue rapid test kits at Vizag GGH. Stocks depleted due to unseasonal surge in Ward 4 cases.',
      sentiment: 'Urgent',
      avatar: 'R'
    },
    { 
      id: 'VM-202', 
      sender: 'Anitha Reddy', 
      role: 'ASHA Worker - Guntur', 
      time: '09:30 AM', 
      duration: '1:15', 
      priority: 'Medium', 
      transcription: 'Reporting a localized fever cluster in Mangalagiri rural sector. 12 households affected. Requesting RRT inspection.',
      sentiment: 'Concerned',
      avatar: 'A'
    },
    { 
      id: 'VM-203', 
      sender: 'System Alert', 
      role: '108 Dispatch', 
      time: '08:15 AM', 
      duration: '0:22', 
      priority: 'Critical', 
      transcription: 'Ambulance AMB-442 reported critical patient transfer delay at Chittoor border checkpoint. High priority intervention needed.',
      sentiment: 'Neutral',
      avatar: 'S'
    }
  ];

  const [isResponding, setIsResponding] = useState(false);
  const [responseText, setResponseText] = useState('');

  const handleAcknowledge = () => {
    setIsResponding(true);
  };

  const submitResponse = () => {
    alert(`Response sent to ${activeMessage.sender}: "${responseText}"`);
    setIsResponding(false);
    setResponseText('');
  };

  const handleGenerateVoice = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Voice synthesis is not supported in this browser.");
    }
  };

  return (
    <div className="voicemail-page animate-fade">
      {/* Response Modal */}
      {isResponding && (
        <div className="modal-overlay">
          <div className="response-modal glass">
            <div className="modal-header">
              <h3><MessageSquare size={20} /> Responding to {activeMessage.sender}</h3>
              <button className="close-btn" onClick={() => setIsResponding(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="original-msg">
                <span className="label">Original Transcript:</span>
                <p>"{activeMessage.transcription}"</p>
              </div>
              <div className="response-input">
                <label>Direct Directive / Reply</label>
                <textarea 
                  placeholder="Type your strategic directive here..." 
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                ></textarea>
              </div>
              <div className="protocol-options">
                <label>Trigger Tactical Protocol</label>
                <div className="p-chips">
                  <span className="p-chip">Deploy RRT-Alpha</span>
                  <span className="p-chip">Logistics Rush</span>
                  <span className="p-chip">Medical Lockdown</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setIsResponding(false)}>Cancel</button>
              <button className="btn-primary" onClick={submitResponse}>Send Official Directive</button>
            </div>
          </div>
        </div>
      )}

      <header className="voicemail-header">
        <div className="header-left">
          <div className="badge"><Mic size={14} /> Voice Intelligence Hub</div>
          <h1>Healthcare Voice Mails</h1>
          <p>AI-transcribed clinical messages and emergency field recordings.</p>
        </div>
        <div className="header-actions">
          <div className="search-bar">
            <Search size={18} />
            <input type="text" placeholder="Search transcripts..." />
          </div>
          <button className="filter-btn"><Filter size={18} /> Filter</button>
        </div>
      </header>

      <div className="voicemail-grid">
        {/* Inbox Sidebar */}
        <div className="inbox-sidebar glass">
          <div className="sidebar-header">
            <span>Inbound Messages</span>
            <span className="count">{voiceMails.length}</span>
          </div>
          <div className="message-list">
            {voiceMails.map(vm => (
              <div 
                key={vm.id} 
                className={`vm-item ${activeMessage?.id === vm.id ? 'active' : ''}`}
                onClick={() => setActiveMessage(vm)}
              >
                <div className={`avatar ${vm.priority.toLowerCase()}`}>{vm.avatar}</div>
                <div className="vm-info">
                  <div className="vm-sender">{vm.sender}</div>
                  <div className="vm-role">{vm.role}</div>
                  <div className="vm-meta">
                    <span className="time">{vm.time}</span>
                    <span className="duration">{vm.duration}</span>
                  </div>
                </div>
                {vm.priority === 'Critical' && <div className="critical-dot"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Message Viewer */}
        <div className="message-viewer glass">
          {activeMessage ? (
            <div className="viewer-content">
              <div className="viewer-header">
                <div className="sender-profile">
                  <div className={`avatar-large ${activeMessage.priority.toLowerCase()}`}>{activeMessage.avatar}</div>
                  <div>
                    <h2>{activeMessage.sender}</h2>
                    <p>{activeMessage.role} • {activeMessage.id}</p>
                  </div>
                </div>
                <div className="header-tags">
                  <span className={`tag priority ${activeMessage.priority.toLowerCase()}`}>{activeMessage.priority} Priority</span>
                  <span className="tag sentiment">{activeMessage.sentiment}</span>
                </div>
              </div>

              <div className="audio-player-card">
                <div className="visualizer">
                  {[...Array(30)].map((_, i) => (
                    <div key={i} className="bar" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}></div>
                  ))}
                </div>
                <div className="player-controls">
                  <div className="time-display">0:00 / {activeMessage.duration}</div>
                  <button className="play-btn" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" />}
                  </button>
                  <div className="volume-control">
                    <Volume2 size={20} />
                    <div className="vol-slider"><div></div></div>
                  </div>
                </div>
              </div>

              <div className="transcription-section">
                <div className="section-title">
                  <div className="title-left">
                    <Brain size={20} color="var(--primary)" />
                    <h3>AI Transcription Preview</h3>
                  </div>
                  <button className="listen-btn" onClick={() => handleGenerateVoice(activeMessage.transcription)}>
                    <Volume2 size={16} /> Listen
                  </button>
                </div>
                <div className="transcription-box">
                  <p>{activeMessage.transcription}</p>
                </div>
              </div>

              <div className="action-footer">
                <button className="btn-secondary"><Share2 size={18} /> Forward to RRT</button>
                <button className="btn-secondary"><Download size={18} /> Archive</button>
                <button className="btn-primary" onClick={handleAcknowledge}>Acknowledge & Respond</button>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <MessageSquare size={48} color="var(--text-muted)" />
              <p>Select a voice mail to view details and AI transcription</p>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .voicemail-page { padding: 2rem; color: var(--text); }
        
        .voicemail-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2.5rem; }
        .badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(14, 165, 233, 0.1); color: var(--primary); padding: 6px 12px; border-radius: 100px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; margin-bottom: 12px; }
        .voicemail-header h1 { font-size: 2.4rem; font-weight: 800; }
        .voicemail-header p { color: var(--text-muted); font-size: 0.95rem; }
        
        .header-actions { display: flex; gap: 1rem; }
        .search-bar { background: var(--surface-light); border: 1px solid var(--border); padding: 8px 16px; border-radius: 12px; display: flex; align-items: center; gap: 12px; min-width: 300px; }
        .search-bar input { background: transparent; border: none; color: var(--text); outline: none; width: 100%; }
        .filter-btn { background: var(--surface-light); border: 1px solid var(--border); color: var(--text); padding: 0 16px; border-radius: 12px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: 600; }

        .voicemail-grid { display: grid; grid-template-columns: 350px 1fr; gap: 2rem; height: calc(100vh - 250px); }
        .glass { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; display: flex; flex-direction: column; overflow: hidden; backdrop-filter: blur(20px); }

        .sidebar-header { padding: 1.5rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; font-weight: 700; color: var(--text-muted); }
        .count { background: var(--surface-light); padding: 2px 8px; border-radius: 6px; font-size: 0.75rem; }

        .message-list { flex: 1; overflow-y: auto; }
        .vm-item { padding: 1.25rem; border-bottom: 1px solid var(--border); display: flex; gap: 1rem; cursor: pointer; transition: all 0.2s ease; position: relative; }
        .vm-item:hover { background: var(--surface-light); }
        .vm-item.active { background: rgba(14, 165, 233, 0.1); border-left: 4px solid var(--primary); }
        
        .avatar { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: var(--text); background: #94a3b8; }
        .avatar.high { background: #f59e0b; }
        .avatar.critical { background: #f43f5e; }
        .avatar.medium { background: var(--surface); }
        
        .vm-info { flex: 1; min-width: 0; }
        .vm-sender { font-weight: 700; font-size: 0.95rem; margin-bottom: 2px; }
        .vm-role { font-size: 0.75rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .vm-meta { display: flex; justify-content: space-between; margin-top: 8px; font-size: 0.7rem; font-weight: 700; color: var(--text-muted); }
        
        .critical-dot { width: 8px; height: 8px; background: #f43f5e; border-radius: 50%; position: absolute; top: 1.25rem; right: 1rem; box-shadow: 0 0 10px #f43f5e; }

        .message-viewer { padding: 2.5rem; }
        .empty-state { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; color: var(--text-muted); text-align: center; }

        .viewer-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2.5rem; }
        .sender-profile { display: flex; align-items: center; gap: 1.5rem; }
        .avatar-large { width: 64px; height: 64px; border-radius: 18px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 800; color: var(--text); }
        .avatar-large.high { background: #f59e0b; }
        .avatar-large.critical { background: #f43f5e; }
        .avatar-large.medium { background: var(--surface); }
        .sender-profile h2 { font-size: 1.5rem; font-weight: 800; margin-bottom: 4px; }
        .sender-profile p { color: var(--text-muted); font-size: 0.9rem; font-weight: 600; }
        
        .header-tags { display: flex; gap: 8px; }
        .tag { padding: 4px 12px; border-radius: 8px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; }
        .tag.priority { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .tag.priority.critical { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }
        .tag.sentiment { background: var(--surface-light); color: var(--text-muted); }

        .audio-player-card { background: var(--surface-light); border: 1px solid var(--border); border-radius: 20px; padding: 1.5rem; margin-bottom: 2.5rem; }
        .visualizer { height: 60px; display: flex; align-items: flex-end; gap: 4px; margin-bottom: 1.5rem; padding: 0 1rem; }
        .bar { flex: 1; background: var(--primary); border-radius: 2px; opacity: 0.4; }
        .active .bar { animation: wave 1s ease-in-out infinite alternate; }
        @keyframes wave { to { opacity: 1; height: 100%; } }

        .player-controls { display: flex; align-items: center; gap: 2rem; }
        .time-display { font-family: monospace; font-size: 0.9rem; font-weight: 700; color: var(--text-muted); }
        .play-btn { width: 56px; height: 56px; border-radius: 50%; background: var(--primary); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(14, 165, 233, 0.3); transition: transform 0.2s ease; }
        .play-btn:hover { transform: scale(1.05); }
        .volume-control { display: flex; align-items: center; gap: 12px; color: var(--text-muted); flex: 1; justify-content: flex-end; }
        .vol-slider { height: 4px; width: 100px; background: var(--border); border-radius: 2px; position: relative; }
        .vol-slider div { position: absolute; left: 0; top: 0; bottom: 0; width: 70%; background: var(--primary); border-radius: 2px; }

        .transcription-section { margin-bottom: 2.5rem; }
        .section-title { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
        .title-left { display: flex; align-items: center; gap: 10px; }
        .section-title h3 { font-size: 1rem; font-weight: 800; margin: 0; }
        .listen-btn { background: rgba(14, 165, 233, 0.1); border: 1px solid rgba(14, 165, 233, 0.2); color: var(--primary); padding: 6px 12px; border-radius: 8px; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.2s ease; }
        .listen-btn:hover { background: var(--primary); color: var(--text); }
        .transcription-box { background: var(--surface); border: 1px solid var(--border); padding: 1.5rem; border-radius: 16px; }
        .transcription-box p { font-size: 1.1rem; line-height: 1.6; font-style: italic; color: var(--text); }

        .action-footer { display: flex; gap: 1rem; margin-top: auto; padding-top: 1rem; }
        .btn-primary { background: var(--primary); border: none; color: var(--text); padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; flex: 1; transition: all 0.3s ease; }
        .btn-primary:hover { filter: brightness(1.1); transform: translateY(-2px); box-shadow: 0 4px 15px var(--primary-glow); }
        .btn-secondary { background: var(--surface-light); border: 1px solid var(--border); color: var(--text); padding: 12px 20px; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 10px; }

        .modal-overlay { position: fixed; inset: 0; background: var(--surface); backdrop-filter: blur(8px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 2rem; }
        .response-modal { width: 100%; max-width: 600px; background: var(--surface); border: 1px solid var(--border); border-radius: 24px; display: flex; flex-direction: column; box-shadow: 0 25px 50px rgba(0,0,0,0.5); }
        .modal-header { padding: 1.5rem 2rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
        .modal-header h3 { font-size: 1.1rem; font-weight: 800; display: flex; align-items: center; gap: 10px; }
        .close-btn { background: transparent; border: none; color: var(--text-muted); font-size: 1.5rem; cursor: pointer; }
        
        .modal-body { padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .original-msg { background: var(--surface-light); padding: 1rem; border-radius: 12px; border-left: 4px solid var(--primary); }
        .label { font-size: 0.7rem; font-weight: 800; color: var(--primary); text-transform: uppercase; display: block; margin-bottom: 4px; }
        .original-msg p { font-size: 0.9rem; font-style: italic; color: var(--text-muted); }
        
        .response-input label { display: block; font-size: 0.85rem; font-weight: 700; color: var(--text); margin-bottom: 10px; }
        .response-input textarea { width: 100%; height: 120px; background: var(--surface-light); border: 1px solid var(--border); border-radius: 12px; padding: 1rem; color: var(--text); outline: none; font-size: 0.95rem; resize: none; transition: border-color 0.3s ease; }
        .response-input textarea:focus { border-color: var(--primary); }
        
        .protocol-options label { display: block; font-size: 0.85rem; font-weight: 700; color: var(--text); margin-bottom: 10px; }
        .p-chips { display: flex; gap: 8px; flex-wrap: wrap; }
        .p-chip { padding: 6px 14px; background: rgba(14, 165, 233, 0.1); border: 1px solid rgba(14, 165, 233, 0.2); border-radius: 8px; font-size: 0.8rem; font-weight: 700; color: var(--primary); cursor: pointer; transition: all 0.2s ease; }
        .p-chip:hover { background: var(--primary); color: var(--text); }
        
        .modal-footer { padding: 1.5rem 2rem; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; gap: 1rem; }
      ` }} />
    </div>
  );
};

export default HealthcareVoiceMail;

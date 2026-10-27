import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  Volume2, 
  X, 
  CheckCircle2, 
  Activity, 
  ShieldCheck, 
  Sparkles,
  Save,
  Trash2,
  Maximize2
} from 'lucide-react';

const VoiceAssistant = ({ onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [status, setStatus] = useState('Idle');
  const [waveLines, setWaveLines] = useState([]);

  useEffect(() => {
    if (isListening) {
      setStatus('AI Scribe Active');
      const interval = setInterval(() => {
        setWaveLines(Array.from({ length: 40 }, () => Math.random() * 40 + 10));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setStatus('Idle');
      setWaveLines([]);
    }
  }, [isListening]);

  const handleStart = () => {
    setIsListening(true);
    setTranscription('Initializing Clinical AI Scribe... Detecting medical terminology... Listening for dictation...');
    setTimeout(() => {
      setTranscription('Patient presenting with acute respiratory distress. SpO2 at 88% on room air. Initiating emergency protocols... Administering 4L oxygen via nasal cannula.');
    }, 2000);
  };

  const handleStop = () => {
    setIsListening(false);
    setStatus('Reviewing Transcription');
  };

  return (
    <div className="voice-assistant-overlay animate-fade">
      <div className="va-container">
        <div className="va-header">
           <div className="va-title-sector">
              <div className="va-pulse-dot"></div>
              <div>
                 <h3>AI Clinical Scribe</h3>
                 <p>{status}</p>
              </div>
           </div>
           <button className="va-close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="va-main">
           <div className="va-visualizer">
              <div className={`va-mic-ring ${isListening ? 'active' : ''}`}>
                 <div className="va-mic-inner">
                    {isListening ? <Activity size={40} className="text-emerald" /> : <Volume2 size={40} className="text-emerald" />}
                 </div>
                 <div className="va-ring-pulse r1"></div>
                 <div className="va-ring-pulse r2"></div>
              </div>
              
              <div className="va-waves">
                 {waveLines.map((h, i) => (
                   <div key={i} className="va-wave-bar" style={{ height: `${h}px` }}></div>
                 ))}
              </div>
           </div>

           <div className="va-transcription-area">
              <div className="va-ta-header">
                 <span><Sparkles size={14} /> AI REAL-TIME TRANSCRIPTION</span>
                 <div className="va-ta-actions">
                    <button className="va-ta-btn"><Save size={14} /></button>
                    <button className="va-ta-btn"><Trash2 size={14} /></button>
                 </div>
              </div>
              <div className="va-ta-body">
                 {transcription || <span className="va-placeholder">Press the activation sector to begin clinical dictation...</span>}
              </div>
           </div>
        </div>

        <div className="va-footer">
           <div className="va-security">
              <ShieldCheck size={18} />
              <span>MISSION SECURE • DPDP PRIVACY COMPLIANT</span>
           </div>
           {!isListening ? (
             <button className="va-start-btn" onClick={handleStart}>
                <Mic size={20} /> ACTIVATE SCRIBE
             </button>
           ) : (
             <button className="va-stop-btn" onClick={handleStop}>
                <Activity size={20} /> STOP DICTATION
             </button>
           )}
        </div>
      </div>

      <style>{`
        .voice-assistant-overlay {
          position: fixed;
          inset: 0;
          background: rgba(7, 9, 15, 0.9);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5000;
          padding: 2rem;
        }

        .va-container {
          width: 100%;
          max-width: 800px;
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 40px;
          padding: 3rem;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
          position: relative;
          overflow: hidden;
        }

        .va-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 3rem; }
        .va-title-sector { display: flex; align-items: center; gap: 15px; }
        .va-pulse-dot { width: 12px; height: 12px; background: var(--surface-light); border-radius: 50%; box-shadow: 0 0 15px #10b981; animation: vaPulse 2s infinite; }
        .va-title-sector h3 { margin: 0; font-size: 1.5rem; font-weight: 900; color: var(--text); }
        .va-title-sector p { margin: 4px 0 0; color: var(--text-muted); font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }

        .va-close-btn { background: var(--surface); border: 1px solid rgba(255,255,255,0.05); color: var(--text); padding: 10px; border-radius: 50%; cursor: pointer; transition: 0.3s; }
        .va-close-btn:hover { background: #f43f5e; color: var(--text); }

        .va-main { display: grid; grid-template-columns: 300px 1fr; gap: 3rem; align-items: center; }

        .va-visualizer { display: flex; flex-direction: column; align-items: center; gap: 2rem; }
        .va-mic-ring { 
          width: 180px; height: 180px; 
          border: 2px solid rgba(16, 185, 129, 0.1); 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          position: relative; 
          transition: 0.5s;
        }
        .va-mic-ring.active { border-color: #10b981; box-shadow: 0 0 40px rgba(16, 185, 129, 0.2); }
        .va-mic-inner { 
          width: 120px; height: 120px; 
          background: rgba(16, 185, 129, 0.05); 
          border: 1px solid rgba(16, 185, 129, 0.2); 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          color: #10b981;
          z-index: 2;
        }
        .text-emerald { color: #10b981; }

        .va-ring-pulse { position: absolute; inset: -10px; border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 50%; opacity: 0; }
        .va-mic-ring.active .r1 { animation: vaRingPulse 2s infinite; }
        .va-mic-ring.active .r2 { animation: vaRingPulse 2s infinite 1s; }

        .va-waves { display: flex; align-items: center; gap: 3px; height: 60px; }
        .va-wave-bar { width: 3px; background: var(--surface-light); border-radius: 10px; transition: 0.1s; }

        .va-transcription-area { 
          background: var(--surface); 
          border: 1px solid rgba(255,255,255,0.05); 
          border-radius: 28px; 
          padding: 2rem; 
          height: 300px; 
          display: flex; 
          flex-direction: column; 
        }
        .va-ta-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .va-ta-header span { font-size: 0.75rem; font-weight: 900; color: #10b981; letter-spacing: 2px; display: flex; align-items: center; gap: 8px; }
        .va-ta-actions { display: flex; gap: 8px; }
        .va-ta-btn { background: var(--surface); border: 1px solid rgba(255,255,255,0.05); color: var(--text-muted); padding: 6px; border-radius: 8px; cursor: pointer; transition: 0.3s; }
        .va-ta-btn:hover { background: var(--surface); color: var(--text); }

        .va-ta-body { flex: 1; overflow-y: auto; color: var(--text); line-height: 1.7; font-size: 1.05rem; font-weight: 500; font-family: 'Inter', sans-serif; }
        .va-placeholder { color: var(--text-muted); font-style: italic; }

        .va-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 3rem; }
        .va-security { display: flex; align-items: center; gap: 10px; color: #10b981; font-size: 0.75rem; font-weight: 900; letter-spacing: 1px; }
        
        .va-start-btn { 
          background: var(--surface-light); 
          color: var(--text); 
          border: none; 
          padding: 1.25rem 2.5rem; 
          border-radius: 18px; 
          font-weight: 900; 
          font-size: 1rem; 
          display: flex; 
          align-items: center; 
          gap: 12px; 
          cursor: pointer; 
          transition: 0.3s;
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        }
        .va-start-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(16, 185, 129, 0.5); }

        .va-stop-btn { 
          background: #f43f5e; 
          color: var(--text); 
          border: none; 
          padding: 1.25rem 2.5rem; 
          border-radius: 18px; 
          font-weight: 900; 
          font-size: 1rem; 
          display: flex; 
          align-items: center; 
          gap: 12px; 
          cursor: pointer; 
          transition: 0.3s;
        }

        @keyframes vaPulse { 0% { opacity: 0.4; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.1); } 100% { opacity: 0.4; transform: scale(0.9); } }
        @keyframes vaRingPulse { 0% { opacity: 0.8; transform: scale(1); } 100% { opacity: 0; transform: scale(1.4); } }
      `}</style>
    </div>
  );
};

export default VoiceAssistant;

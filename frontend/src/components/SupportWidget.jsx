import React, { useState } from 'react';
import { MessageCircle, X, Send, Phone, Info, Zap, ShieldCheck, Mic, Languages, Volume2, StopCircle } from 'lucide-react';

const SupportWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSupport, setActiveSupport] = useState('menu'); // 'menu', 'chat', 'whatsapp'
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your SurvAP AI Assistant. How can I help you with your health data today?", sender: 'ai', time: 'Just now' }
  ]);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentLang, setCurrentLang] = useState('en-IN'); // 'en-IN', 'te-IN'

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    setActiveSupport('menu');
    if (isSpeaking) window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const speakHelp = (text, lang) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const helpScripts = {
    'en-IN': {
      intro: "Welcome to SurvAP Intelligence Hub. I am your English support assistant. You can use the analytics tab to track disease clusters and the settings tab to manage your clinical credentials. How can I assist you further?",
      gis: "The GIS Intelligence module provides real-time heatmaps of epidemiological events. You can drill down to specific PHCs in Guntur District.",
      hmis: "The HMIS repository allows you to sync EMR data directly with the state health cloud for compliance."
    },
    'te-IN': {
      intro: "SurvAP ఇంటెలిజెన్స్ హబ్‌కు స్వాగతం. నేను మీ తెలుగు సహాయ సహాయకుడిని. వ్యాధి క్లస్టర్‌లను ట్రాక్ చేయడానికి మీరు అనలిటిక్స్ ట్యాబ్‌ను మరియు మీ క్లినికల్ ఆధారాలను నిర్వహించడానికి సెట్టింగ్‌ల ట్యాబ్‌ను ఉపయోగించవచ్చు. నేను మీకు మరింత ఎలా సహాయం చేయగలను?",
      gis: "GIS ఇంటెలిజెన్స్ మాడ్యూల్ ఎపిడెమియోలాజికల్ ఈవెంట్‌ల యొక్క నిజ-సమయ హీట్‌మ్యాప్‌లను అందిస్తుంది. మీరు గుంటూరు జిల్లాలోని నిర్దిష్ట PHCలను వివరంగా చూడవచ్చు.",
      hmis: "HMIS రిపోజిటరీ మీరు EMR డేటాను నేరుగా స్టేట్ హెల్త్ క్లౌడ్‌తో సమకాలీకరించడానికి అనుమతిస్తుంది."
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg = { id: messages.length + 1, text: chatInput, sender: 'user', time: 'Just now' };
    setMessages([...messages, newMsg]);
    setChatInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: "I've received your request. I'm analyzing the localized health trends to provide a personalized response. Please wait a moment...",
        sender: 'ai',
        time: 'Just now'
      }]);
    }, 1000);
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/919876543210?text=Hi, I need support with the SurvAP platform.', '_blank');
  };

  return (
    <div className="support-widget-wrapper">
      {isOpen && (
        <div className="support-panel animate-scale-up">
          <div className="panel-header">
            <div className="header-info">
              <Zap size={20} color="var(--primary)" />
              <div>
                <h4>SurvAP Personal Support</h4>
                <span>AI-Powered & Human Intelligence</span>
              </div>
            </div>
            <button className="close-btn" onClick={toggleWidget}><X size={20} /></button>
          </div>

          <div className="panel-content">
            {activeSupport === 'menu' && (
              <div className="support-menu">
                <button className="menu-item chat-trigger" onClick={() => setActiveSupport('chat')}>
                  <div className="item-icon"><MessageCircle size={24} /></div>
                  <div className="item-text">
                    <strong>Live AI Chat</strong>
                    <p>Instant support for data entry & analytics</p>
                  </div>
                </button>
                
                <button className="menu-item whatsapp-trigger" onClick={openWhatsApp}>
                  <div className="item-icon wa"><Phone size={24} /></div>
                  <div className="item-text">
                    <strong>WhatsApp Support</strong>
                    <p>Direct contact with district coordinators</p>
                  </div>
                </button>

                <button className="menu-item voice-trigger" onClick={() => setActiveSupport('voice')}>
                  <div className="item-icon voice"><Mic size={24} /></div>
                  <div className="item-text">
                    <strong>Mission Help Bot</strong>
                    <p>Voice assistance in Telugu & English</p>
                  </div>
                </button>

                <div className="support-status">
                  <div className="status-dot"></div>
                  <span>Response time: ~2 minutes</span>
                </div>
              </div>
            )}

            {activeSupport === 'chat' && (
              <div className="chat-interface">
                <div className="chat-history">
                  {messages.map(msg => (
                    <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
                      <p>{msg.text}</p>
                      <span>{msg.time}</span>
                    </div>
                  ))}
                </div>
                <div className="chat-input">
                  <input 
                    type="text" 
                    placeholder="Ask anything..." 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button onClick={handleSendMessage}><Send size={18} /></button>
                </div>
              </div>
            )}

            {activeSupport === 'voice' && (
              <div className="voice-bot-interface animate-fade-in">
                <div className="bot-status-header">
                  <div className={`bot-visualizer ${isSpeaking ? 'speaking' : ''}`}>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="vis-bar"></div>
                    ))}
                  </div>
                  <div className="lang-toggle-bar">
                    <button 
                      className={`lang-btn ${currentLang === 'en-IN' ? 'active' : ''}`}
                      onClick={() => setCurrentLang('en-IN')}
                    >
                      English
                    </button>
                    <button 
                      className={`lang-btn ${currentLang === 'te-IN' ? 'active' : ''}`}
                      onClick={() => setCurrentLang('te-IN')}
                    >
                      తెలుగు
                    </button>
                  </div>
                </div>

                <div className="help-topics-grid">
                  <button className="topic-card" onClick={() => speakHelp(helpScripts[currentLang].intro, currentLang)}>
                    <Volume2 size={20} />
                    <span>General Help</span>
                  </button>
                  <button className="topic-card" onClick={() => speakHelp(helpScripts[currentLang].gis, currentLang)}>
                    <Zap size={20} />
                    <span>GIS Tracking</span>
                  </button>
                  <button className="topic-card" onClick={() => speakHelp(helpScripts[currentLang].hmis, currentLang)}>
                    <Info size={20} />
                    <span>HMIS Sync</span>
                  </button>
                </div>

                {isSpeaking && (
                  <button className="stop-btn-h" onClick={stopSpeaking}>
                    <StopCircle size={18} /> Stop AI Voice
                  </button>
                )}

                <button className="back-to-menu" onClick={() => { stopSpeaking(); setActiveSupport('menu'); }}>
                  Back to Support Menu
                </button>
              </div>
            )}
          </div>

          <div className="panel-footer">
            <ShieldCheck size={14} />
            <span>End-to-end encrypted support</span>
          </div>
        </div>
      )}

      <button className={`floating-support-btn ${isOpen ? 'active' : ''}`} onClick={toggleWidget}>
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      <style>{`
        .support-widget-wrapper {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 10000;
          font-family: var(--font-main);
        }

        .floating-support-btn {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--primary);
          color: var(--text);
          border: none;
          box-shadow: 0 10px 30px var(--primary-glow);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
          position: relative;
        }

        .floating-support-btn:hover {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 15px 40px var(--primary-glow);
        }

        .btn-badge {
          position: absolute;
          right: 100%;
          margin-right: 15px;
          background: var(--text);
          color: var(--text);
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 700;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transform: translateX(10px);
          transition: var(--transition);
        }

        .floating-support-btn:hover .btn-badge {
          opacity: 1;
          transform: translateX(0);
        }

        .support-panel {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 380px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          max-height: 600px;
        }

        @media (max-width: 480px) {
          .support-panel {
            width: calc(100vw - 40px);
            right: -10px;
          }
        }

        .panel-header {
          padding: 20px;
          background: var(--surface-light);
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-info {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .header-info h4 { font-size: 1rem; font-weight: 800; margin: 0; color: var(--text); }
        .header-info span { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }

        .close-btn { background: transparent; border: none; color: var(--text-muted); cursor: pointer; }

        .panel-content {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
        }

        .menu-item {
          width: 100%;
          background: var(--surface-light);
          border: 1px solid var(--border);
          padding: 18px;
          border-radius: 16px;
          display: flex;
          gap: 15px;
          align-items: center;
          margin-bottom: 12px;
          cursor: pointer;
          transition: var(--transition);
          text-align: left;
        }

        .menu-item:hover {
          background: var(--surface);
          border-color: var(--primary);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px var(--primary-glow);
        }

        .item-icon {
          width: 48px;
          height: 48px;
          background: var(--primary-glow);
          color: var(--primary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .item-icon.wa { background: rgba(37, 211, 102, 0.1); color: #25D366; }
        .item-icon.voice { background: rgba(14, 165, 233, 0.1); color: var(--primary); }

        .voice-bot-interface {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding: 10px 0;
        }

        .bot-status-header {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          margin-bottom: 10px;
        }

        .bot-visualizer {
          height: 60px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .vis-bar {
          width: 4px;
          height: 8px;
          background: var(--primary);
          border-radius: 10px;
          transition: all 0.2s;
        }

        .bot-visualizer.speaking .vis-bar {
          animation: barWave 0.8s ease-in-out infinite;
        }

        .bot-visualizer.speaking .vis-bar:nth-child(2) { animation-delay: 0.1s; }
        .bot-visualizer.speaking .vis-bar:nth-child(3) { animation-delay: 0.2s; }
        .bot-visualizer.speaking .vis-bar:nth-child(4) { animation-delay: 0.1s; }
        .bot-visualizer.speaking .vis-bar:nth-child(5) { animation-delay: 0.3s; }

        @keyframes barWave {
          0%, 100% { height: 8px; opacity: 0.5; }
          50% { height: 40px; opacity: 1; }
        }

        .lang-toggle-bar {
          display: flex;
          background: var(--surface-light);
          padding: 4px;
          border-radius: 12px;
          border: 1px solid var(--border);
        }

        .lang-btn {
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .lang-btn.active {
          background: var(--primary);
          color: white;
        }

        .help-topics-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
          width: 100%;
        }

        .topic-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          background: var(--surface-light);
          border: 1px solid var(--border);
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.2s;
          color: var(--text);
          font-weight: 700;
          font-size: 0.9rem;
        }

        .topic-card:hover {
          border-color: var(--primary);
          background: var(--surface);
          transform: translateX(5px);
        }

        .stop-btn-h {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: #fee2e2;
          color: #ef4444;
          border: 1px solid #fecaca;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 800;
          cursor: pointer;
          animation: fadeIn 0.3s;
        }

        .back-to-menu {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          text-decoration: underline;
          margin-top: 10px;
        }

        .item-text strong { display: block; font-size: 0.95rem; color: var(--text); }
        .item-text p { font-size: 0.75rem; color: var(--text-muted); margin: 0; }

        .support-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          color: var(--text-muted);
          justify-content: center;
          margin-top: 20px;
        }

        .status-dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; animation: pulse 2s infinite; }

        .chat-interface {
          display: flex;
          flex-direction: column;
          height: 400px;
        }

        .chat-history {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
          overflow-y: auto;
          margin-bottom: 15px;
        }

        .chat-bubble {
          max-width: 85%;
          padding: 12px 16px;
          border-radius: 16px;
          font-size: 0.9rem;
        }

        .chat-bubble.ai {
          background: var(--surface-light);
          align-self: flex-start;
          border-bottom-left-radius: 4px;
        }

        .chat-bubble.user {
          background: var(--primary);
          color: var(--text);
          align-self: flex-end;
          border-bottom-right-radius: 4px;
        }

        .chat-bubble span {
          display: block;
          font-size: 0.65rem;
          margin-top: 4px;
          opacity: 0.7;
        }

        .chat-input {
          display: flex;
          gap: 8px;
          background: var(--surface-light);
          padding: 6px;
          border-radius: 12px;
          border: 1px solid var(--border);
        }

        .chat-input input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 8px 12px;
          outline: none;
          color: var(--text);
        }

        .chat-input button {
          background: var(--primary);
          color: var(--text);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .panel-footer {
          padding: 12px 20px;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.7rem;
          color: var(--text-muted);
          background: var(--surface-light);
        }

        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }

        .animate-scale-up {
          animation: scaleUp 0.3s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }

        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SupportWidget;

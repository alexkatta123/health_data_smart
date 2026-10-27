import React, { useState } from 'react';
import { 
  Send, 
  Phone, 
  MessageCircle, 
  User, 
  CheckCheck, 
  Clock, 
  ShieldCheck,
  Zap,
  ArrowLeft,
  Search,
  MoreVertical,
  Mail
} from 'lucide-react';

const WhatsAppSupport = ({ onBack }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { id: 1, text: "Hello! Welcome to SurvAP Health Intelligence Support. How can we assist you today?", sender: 'agent', time: '10:00 AM' },
    { id: 2, text: "I need help with the route optimization feature. It's showing high congestion on NH-16.", sender: 'user', time: '10:05 AM' },
    { id: 3, text: "Understood. Our AI is currently rerouting emergency units. Would you like me to connect you with the District Dispatcher?", sender: 'agent', time: '10:06 AM' }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    const newMessage = {
      id: chat.length + 1,
      text: message,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChat([...chat, newMessage]);
    setMessage('');
    
    // Simulate agent response
    setTimeout(() => {
      setChat(prev => [...prev, {
        id: prev.length + 1,
        text: "Thank you for the update. We are monitoring the situation and will provide real-time updates.",
        sender: 'agent',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  return (
    <div className="support-container animate-fade">
      <div className="support-sidebar">
        <div className="sidebar-header">
          <div className="user-profile">
            <div className="avatar">AD</div>
            <div className="user-info">
              <h4>Admin Dashboard</h4>
              <span>Online • DPDP Secure</span>
            </div>
          </div>
          <MoreVertical size={20} color="var(--text-muted)" />
        </div>
        
        <div className="search-bar">
          <Search size={18} />
          <input type="text" placeholder="Search conversations..." />
        </div>

        <div className="chat-list">
          <div className="chat-preview active">
            <div className="preview-content">
              <div className="preview-top">
                <strong>Emergency Response Unit</strong>
                <span>10:06 AM</span>
              </div>
              <p>AI rerouting emergency units...</p>
            </div>
          </div>
          {[1, 2, 3].map(i => (
            <div key={i} className="chat-preview">
              <div className="avatar grey"><User size={20} /></div>
              <div className="preview-content">
                <div className="preview-top">
                  <strong>District Health Officer {i}</strong>
                  <span>Yesterday</span>
                </div>
                <p>Data validation complete for...</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-window">
        <div className="chat-header">
          <div className="header-left">
            <button className="back-btn" onClick={onBack}><ArrowLeft size={20} /></button>
            <div className="header-info">
              <h3>SurvAP AI Support</h3>
              <span className="online-tag"><div className="dot"></div> Active Intelligence</span>
            </div>
          </div>
          <div className="header-actions">
            <div className="encryption-pill">
              <ShieldCheck size={14} /> End-to-end Encrypted
            </div>
            <button className="call-btn"><Phone size={18} /></button>
          </div>
        </div>

        <div className="chat-body">
          <div className="system-alert">
            <Clock size={14} /> Messages are secured and logged for surveillance auditing.
          </div>
          
          {chat.map((msg) => (
            <div key={msg.id} className={`message-row ${msg.sender}`}>
              <div className="message-bubble">
                <p>{msg.text}</p>
                <div className="message-meta">
                  <span>{msg.time}</span>
                  {msg.sender === 'user' && <CheckCheck size={14} color="#53bdeb" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input-area">
          <div className="input-wrap">
            <Zap size={20} color="var(--primary)" />
            <input 
              type="text" 
              placeholder="Type a message or use AI commands (/status, /reroute)..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="send-btn" onClick={handleSend}>
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .support-container {
          display: grid;
          grid-template-columns: 350px 1fr;
          height: calc(100vh - 120px);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }

        .support-sidebar {
          border-right: 1px solid var(--border);
          background: var(--surface);
          display: flex;
          flex-direction: column;
        }

        .sidebar-header {
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border);
        }

        .user-profile {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .avatar {
          width: 40px;
          height: 40px;
          background: var(--primary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: var(--text);
        }

        .user-info h4 { font-size: 0.95rem; margin-bottom: 2px; }
        .user-info span { font-size: 0.75rem; color: #10b981; font-weight: 600; }

        .search-bar {
          padding: 15px;
          position: relative;
        }

        .search-bar input {
          width: 100%;
          background: var(--surface-light);
          border: 1px solid var(--border);
          padding: 10px 15px 10px 40px;
          border-radius: 10px;
          color: var(--text);
          font-size: 0.9rem;
        }

        .search-bar svg {
          position: absolute;
          left: 30px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .chat-list { flex: 1; overflow-y: auto; }

        .chat-preview {
          padding: 15px 20px;
          display: flex;
          gap: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .chat-preview:hover { background: var(--surface); }
        .chat-preview.active { background: rgba(14, 165, 233, 0.1); border-left: 3px solid var(--primary); }

        .avatar.wa { background: #25D366; }
        .avatar.grey { background: var(--surface-light); color: var(--text-muted); }

        .preview-content { flex: 1; }
        .preview-top { display: flex; justify-content: space-between; margin-bottom: 4px; }
        .preview-top strong { font-size: 0.9rem; }
        .preview-top span { font-size: 0.7rem; color: var(--text-muted); }
        .preview-content p { font-size: 0.8rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px; }

        .chat-window { display: flex; flex-direction: column; background: var(--surface); }

        .chat-header {
          padding: 15px 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--surface);
          border-bottom: 1px solid var(--border);
        }

        .header-left { display: flex; align-items: center; gap: 15px; }
        .back-btn { background: transparent; border: none; color: var(--text); cursor: pointer; display: none; }
        @media (max-width: 768px) { .back-btn { display: block; } }

        .header-info h3 { font-size: 1.1rem; margin-bottom: 2px; }
        .online-tag { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; color: #10b981; font-weight: 600; }
        .online-tag .dot { width: 6px; height: 6px; background: var(--surface-light); border-radius: 50%; }

        .header-actions { display: flex; align-items: center; gap: 20px; }
        .encryption-pill { font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; gap: 6px; background: var(--surface); padding: 6px 12px; border-radius: 100px; }
        .call-btn { background: var(--surface-light); border: 1px solid var(--border); color: var(--text); width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; }

        .chat-body { flex: 1; overflow-y: auto; padding: 30px; display: flex; flex-direction: column; gap: 20px; background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'); background-blend-mode: overlay; background-color: var(--surface-light); }

        .system-alert { align-self: center; background: var(--surface); backdrop-filter: blur(5px); padding: 8px 16px; border-radius: 100px; font-size: 0.75rem; color: #f59e0b; display: flex; align-items: center; gap: 8px; margin-bottom: 10px; border: 1px solid var(--border); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }

        .message-row { display: flex; width: 100%; }
        .message-row.agent { justify-content: flex-start; }
        .message-row.user { justify-content: flex-end; }

        .message-bubble { max-width: 70%; padding: 12px 16px; border-radius: 16px; position: relative; }
        .agent .message-bubble { background: var(--surface-light); border-bottom-left-radius: 4px; border: 1px solid var(--border); }
        .user .message-bubble { background: var(--surface); color: var(--text); border-bottom-right-radius: 4px; }

        .message-bubble p { font-size: 0.95rem; line-height: 1.5; margin-bottom: 4px; }
        .message-meta { display: flex; justify-content: flex-end; align-items: center; gap: 5px; font-size: 0.7rem; opacity: 0.7; }

        .chat-input-area { padding: 20px 30px; background: var(--surface); border-top: 1px solid var(--border); }
        .input-wrap { background: var(--surface-light); border-radius: 15px; display: flex; align-items: center; padding: 5px 15px; border: 1px solid var(--border); }
        .input-wrap input { flex: 1; background: transparent; border: none; padding: 12px; color: var(--text); font-size: 0.95rem; outline: none; }
        .send-btn { background: var(--primary); color: var(--text); border: none; width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease; }
        .send-btn:hover { transform: scale(1.05); background: var(--surface); }
      `}</style>
    </div>
  );
};

export default WhatsAppSupport;

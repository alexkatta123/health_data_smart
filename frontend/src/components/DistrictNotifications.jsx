import React from 'react';
import { 
  Bell, MessageSquare, Clock, 
  CheckCircle2, AlertTriangle, Trash2,
  Filter, MoreVertical, ShieldCheck, HardHat
} from 'lucide-react';

const DistrictNotifications = () => {
  const notifications = [
    { id: 1, type: 'complaint', title: 'New Complaint Received', desc: 'Water leakage reported in Gajuwaka Sector 3.', time: '2 mins ago', unread: true, priority: 'high' },
    { id: 2, type: 'deadline', title: 'Deadline Reminder', desc: 'Monthly audit report for Public Works is due in 4 hours.', time: '1 hour ago', unread: true, priority: 'medium' },
    { id: 3, type: 'approval', title: 'Approval Request', desc: 'Project "Smart Street Lights" requires your final approval.', time: '3 hours ago', unread: false, priority: 'high' },
    { id: 4, type: 'system', title: 'System Maintenance', desc: 'The portal will be down for maintenance tonight at 12:00 AM.', time: '5 hours ago', unread: false, priority: 'low' },
    { id: 5, type: 'task', title: 'Task Completed', desc: 'Officer Sneha Reddy has resolved Case #CMP-1024.', time: 'Yesterday', unread: false, priority: 'medium' },
    { id: 6, type: 'alert', title: 'Security Alert', desc: 'New login detected from a different device.', time: 'Yesterday', unread: false, priority: 'high' }
  ];

  return (
    <div className="notifications-container animate-fade">
      <div className="page-header">
        <div className="header-title">
          <h2>Notifications Hub</h2>
          <p>Stay updated with the latest complaints, task progress, and system alerts.</p>
        </div>
        <div className="header-actions">
           <button className="text-btn">Mark all as read</button>
           <button className="danger-btn"><Trash2 size={18} /> Clear All</button>
        </div>
      </div>

      <div className="notifications-layout">
        {/* Filters Sidebar */}
        <aside className="notif-filters">
           <div className="filter-card">
              <h3>Filter Notifications</h3>
              <div className="filter-list">
                 <button className="filter-item active">All Notifications <span>12</span></button>
                 <button className="filter-item">Unread <span>2</span></button>
                 <button className="filter-item">Complaints <span>4</span></button>
                 <button className="filter-item">Approvals <span>3</span></button>
                 <button className="filter-item">Reminders <span>2</span></button>
                 <button className="filter-item">System <span>1</span></button>
              </div>
           </div>

           <div className="filter-card settings-promo">
              <Bell size={32} className="text-primary" />
              <h4>Notification Settings</h4>
              <p>Configure how you receive alerts and updates.</p>
              <button className="settings-link">Manage Preferences</button>
           </div>
        </aside>

        {/* Notifications List */}
        <main className="notif-main">
           <div className="notif-header">
              <div className="search-notif">
                 <Filter size={16} />
                 <span>Showing recent alerts</span>
              </div>
           </div>

           <div className="notif-list">
              {notifications.map((n, i) => (
                <div key={i} className={`notif-item ${n.unread ? 'unread' : ''} ${n.priority}`}>
                   <div className="notif-icon">
                      {n.type === 'complaint' && <MessageSquare size={20} />}
                      {n.type === 'deadline' && <Clock size={20} />}
                      {n.type === 'approval' && <CheckCircle2 size={20} />}
                      {n.type === 'system' && <AlertTriangle size={20} />}
                      {n.type === 'task' && <HardHat size={20} />}
                      {n.type === 'alert' && <ShieldCheck size={20} />}
                   </div>
                   
                   <div className="notif-content">
                      <div className="notif-top">
                         <h4>{n.title}</h4>
                         <span className="notif-time">{n.time}</span>
                      </div>
                      <p>{n.desc}</p>
                      <div className="notif-actions">
                         <button className="notif-btn">View Details</button>
                         <button className="notif-btn secondary">Dismiss</button>
                      </div>
                   </div>

                   <div className="notif-options">
                      {n.unread && <div className="unread-dot"></div>}
                      <button className="more-btn"><MoreVertical size={16} /></button>
                   </div>
                </div>
              ))}
           </div>
        </main>
      </div>

      <style>{`
        .notifications-container { display: flex; flex-direction: column; gap: 2rem; }
        
        .page-header { display: flex; justify-content: space-between; align-items: flex-end; }
        .header-title h2 { margin: 0; font-size: 1.6rem; font-weight: 800; }
        .header-title p { margin: 4px 0 0 0; color: var(--text-muted); font-size: 0.95rem; }
        
        .header-actions { display: flex; gap: 15px; align-items: center; }
        .text-btn { background: transparent; border: none; color: var(--primary); font-weight: 800; font-size: 0.85rem; cursor: pointer; }
        .danger-btn { display: flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 12px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); color: #ef4444; font-weight: 700; font-size: 0.9rem; cursor: pointer; }

        .notifications-layout { display: grid; grid-template-columns: 280px 1fr; gap: 2rem; }
        
        .notif-filters { display: flex; flex-direction: column; gap: 1.5rem; }
        .filter-card { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 1.5rem; }
        .filter-card h3 { font-size: 0.9rem; font-weight: 800; margin-bottom: 1.25rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
        
        .filter-list { display: flex; flex-direction: column; gap: 4px; }
        .filter-item { 
          display: flex; justify-content: space-between; align-items: center; 
          padding: 10px 14px; border-radius: 10px; border: none; background: transparent; 
          color: var(--text-muted); font-size: 0.9rem; font-weight: 600; cursor: pointer; text-align: left; transition: all 0.2s;
        }
        .filter-item:hover { background: var(--surface-light); color: var(--text); }
        .filter-item.active { background: rgba(59, 130, 246, 0.1); color: var(--primary); font-weight: 700; }
        .filter-item span { font-size: 0.75rem; background: var(--bg); padding: 2px 8px; border-radius: 100px; color: var(--text-muted); }
        .filter-item.active span { background: var(--primary); color: var(--text); }

        .settings-promo { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 10px; }
        .settings-promo h4 { margin: 10px 0 0 0; font-size: 1rem; }
        .settings-promo p { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 10px; }
        .settings-link { width: 100%; padding: 8px; border-radius: 10px; background: var(--bg); border: 1px solid var(--border); color: var(--text); font-size: 0.8rem; font-weight: 800; cursor: pointer; }

        .notif-main { display: flex; flex-direction: column; gap: 1.25rem; }
        .notif-header { display: flex; justify-content: space-between; align-items: center; padding: 0 1rem; color: var(--text-muted); font-size: 0.8rem; font-weight: 700; }
        
        .notif-list { display: flex; flex-direction: column; gap: 12px; }
        .notif-item { 
          background: var(--surface); border: 1px solid var(--border); border-radius: 20px; 
          padding: 1.25rem; display: flex; gap: 1.25rem; position: relative; transition: all 0.2s;
        }
        .notif-item:hover { transform: scale(1.01); border-color: var(--primary); box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1); }
        .notif-item.unread { border-left: 4px solid var(--primary); background: rgba(59, 130, 246, 0.02); }
        
        .notif-icon { width: 44px; height: 44px; border-radius: 12px; background: var(--surface-light); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--text-muted); }
        .high .notif-icon { color: #ef4444; background: rgba(239, 68, 68, 0.05); }
        .medium .notif-icon { color: #f59e0b; background: rgba(245, 158, 11, 0.05); }

        .notif-content { flex: 1; }
        .notif-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .notif-top h4 { margin: 0; font-size: 1rem; font-weight: 800; }
        .notif-time { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
        .notif-content p { margin: 0 0 1rem 0; font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; }
        
        .notif-actions { display: flex; gap: 10px; }
        .notif-btn { padding: 6px 14px; border-radius: 8px; border: none; background: var(--primary); color: var(--text); font-size: 0.75rem; font-weight: 700; cursor: pointer; }
        .notif-btn.secondary { background: var(--surface-light); color: var(--text); }

        .notif-options { display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between; }
        .unread-dot { width: 10px; height: 10px; background: var(--primary); border-radius: 50%; box-shadow: 0 0 10px var(--primary); }
        .more-btn { background: transparent; border: none; color: var(--text-muted); cursor: pointer; opacity: 0.5; }
      `}</style>
    </div>
  );
};

export default DistrictNotifications;

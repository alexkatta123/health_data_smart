import React from 'react';
import { 
  HeartPulse, LogOut, Activity, LayoutGrid 
} from 'lucide-react';

const Sidebar = ({ 
  isSidebarOpen, 
  setIsSidebarOpen, 
  menuItems, 
  activeTab, 
  setActiveTab, 
  userRole, 
  logo,
  brandText,
  roleLabel,
  side = 'left'
}) => {
  return (
    <aside className={`premium-sidebar ${isSidebarOpen ? 'open' : 'closed'} side-${side}`}>
      <div className="sidebar-brand">
        <div className="brand-logo">
          {logo || <HeartPulse size={22} color="white" />}
        </div>
        {isSidebarOpen && <span className="brand-text">{brandText || 'Health Intel'}</span>}
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button 
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {activeTab === item.id && <div className="active-indicator"></div>}
            <span className="nav-icon">{item.icon}</span>
            {isSidebarOpen && <span className="nav-label">{item.label}</span>}
            
            {isSidebarOpen && item.badge && (
              <span className={`nav-badge ${item.badgeType || 'count'}`}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        {isSidebarOpen ? (
          <div className="role-indicator-btn">
            <Activity size={16} />
            <span>{roleLabel || userRole?.toUpperCase() + ' MODE'}</span>
          </div>
        ) : (
          <div className="role-indicator-dot" title={roleLabel || `${userRole} Mode`}>
            <Activity size={16} />
          </div>
        )}
        
        <button className="logout-action">
          <LogOut size={20} />
          {isSidebarOpen && <span>Sign Out</span>}
        </button>
      </div>

      <style>{`
        .premium-sidebar {
          width: 280px;
          background: var(--surface);
          display: flex;
          flex-direction: column;
          transition: var(--transition);
          z-index: 1000;
          height: 100vh;
          position: sticky;
          top: 0;
          box-shadow: var(--card-shadow);
        }
        .premium-sidebar.side-left { border-right: 1px solid var(--border); }
        .premium-sidebar.side-right { border-left: 1px solid var(--border); }
        .premium-sidebar.closed { width: 88px; }

        .sidebar-brand {
          height: 100px;
          display: flex;
          align-items: center;
          padding: 0 1.8rem;
          gap: 15px;
        }
        .brand-logo {
          width: 44px; height: 44px; background: var(--primary);
          border-radius: 14px; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 5px 15px var(--primary-glow);
        }
        .brand-text { font-weight: 900; font-size: 1.6rem; color: var(--text); letter-spacing: -1px; white-space: nowrap; }

        .sidebar-nav { flex: 1; padding: 2rem 0; display: flex; flex-direction: column; overflow-y: auto; overflow-x: hidden; }
        .nav-item {
          display: flex; align-items: center; padding: 20px 2rem;
          background: transparent; border: none; cursor: pointer;
          color: var(--text-muted); transition: var(--transition);
          position: relative; width: 100%; text-align: left;
        }
        .nav-item:hover { color: var(--primary); background: var(--surface-light); }
        .nav-item.active { color: var(--primary); font-weight: 900; background: var(--primary-glow); }

        .active-indicator {
          position: absolute; top: 0; bottom: 0; width: 6px;
          background: var(--primary);
          box-shadow: 4px 0 20px var(--primary-glow);
        }
        .side-left .active-indicator { left: 0; border-radius: 0 6px 6px 0; }
        .side-right .active-indicator { right: 0; border-radius: 6px 0 0 6px; }

        .nav-icon { margin-right: 20px; display: flex; align-items: center; flex-shrink: 0; }
        .nav-label { font-size: 1.15rem; flex: 1; white-space: nowrap; font-weight: 800; letter-spacing: -0.2px; }

        .nav-badge { font-size: 0.8rem; font-weight: 900; color: var(--text); display: flex; align-items: center; justify-content: center; }
        .nav-badge.live { background: var(--primary); padding: 6px 14px; border-radius: 100px; animation: pulse-soft 2s infinite; }
        .nav-badge.count { background: var(--primary); width: 26px; height: 26px; border-radius: 50%; }

        @keyframes pulse-soft { 0% { opacity: 1; } 50% { opacity: 0.7; } 100% { opacity: 1; } }

        .sidebar-footer { padding: 2.5rem; border-top: 1px solid var(--border); display: flex; flex-direction: column; gap: 2rem; }
        
        .role-indicator-btn {
          display: flex; align-items: center; justify-content: center; gap: 12px;
          background: var(--primary); color: var(--text);
          padding: 16px; border-radius: 18px; font-weight: 900; font-size: 1rem;
          text-transform: uppercase; letter-spacing: 1px;
          box-shadow: 0 8px 20px var(--primary-glow);
        }
        .role-indicator-dot {
          width: 58px; height: 58px; margin: 0 auto;
          background: var(--primary); color: var(--text);
          display: flex; align-items: center; justify-content: center; border-radius: 18px;
          box-shadow: 0 8px 20px var(--primary-glow);
        }

        .logout-action {
          display: flex; align-items: center; gap: 18px; padding: 12px 1rem;
          color: var(--primary); font-weight: 900; background: transparent; border: none; cursor: pointer;
          font-size: 1.1rem; transition: var(--transition);
        }
        .logout-action:hover { opacity: 0.8; transform: translateX(5px); }
      `}</style>
    </aside>
  );
};

export default Sidebar;

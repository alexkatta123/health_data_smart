import React, { useState } from 'react';
import { 
  Home, ClipboardList, Users, HardHat, 
  BarChart3, Bell, Settings, Search, 
  LogOut, Sun, Moon, ChevronRight,
  Menu, X, User, LayoutGrid
} from 'lucide-react';

// Import New Sub-Components
import Sidebar from './Sidebar';
import DistrictHome from './DistrictHome';
import DistrictComplaints from './DistrictComplaints';
import DistrictStaff from './DistrictStaff';
import DistrictProjects from './DistrictProjects';
import DistrictAnalytics from './DistrictAnalytics';
import DistrictNotifications from './DistrictNotifications';
import DistrictSettings from './DistrictSettings';

const DistrictOfficerDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const menuItems = [
    { id: 'home', label: 'Home / Overview', icon: <Home size={20} /> },
    { id: 'complaints', label: 'Complaints Management', icon: <ClipboardList size={20} />, badge: '12', badgeType: 'live' },
    { id: 'staff', label: 'Officers / Staff', icon: <Users size={20} /> },
    { id: 'projects', label: 'Projects Monitoring', icon: <HardHat size={20} /> },
    { id: 'analytics', label: 'Reports & Analytics', icon: <BarChart3 size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} />, badge: '5', badgeType: 'count' },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const renderModule = () => {
    switch (activeTab) {
      case 'home': return <DistrictHome />;
      case 'complaints': return <DistrictComplaints />;
      case 'staff': return <DistrictStaff />;
      case 'projects': return <DistrictProjects />;
      case 'analytics': return <DistrictAnalytics />;
      case 'notifications': return <DistrictNotifications />;
      case 'settings': return <DistrictSettings />;
      default: return <DistrictHome />;
    }
  };

  return (
    <div className={`dho-admin-portal ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <Sidebar 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        menuItems={menuItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        brandText="DHO Portal"
        roleLabel="GOVT. OFFICER"
        logo={<LayoutGrid size={22} color="white" />}
      />

      {/* Main Content Area */}
      <main className="dho-main-container">
        {/* Top Header Bar */}
        <header className="dho-topbar">
          <div className="topbar-left">
            <button className="toggle-sidebar" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="search-wrapper">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search complaints, projects, staff..." />
            </div>
          </div>

          <div className="topbar-right">
            <div className="header-actions">
              <button className="h-icon-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="h-icon-btn">
                <Bell size={20} />
                <div className="notif-dot"></div>
              </button>
            </div>
            
            <div className="user-profile-widget">
              <div className="user-text">
                <span className="u-name">Dr. Aruna Varma</span>
                <span className="u-id">District Health Officer</span>
              </div>
              <div className="u-avatar">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Viewport */}
        <section className="dho-content-viewport">
          {renderModule()}
        </section>
      </main>

      <style>{`
        :root {
          --sidebar-bg: #ffffff;
          --sidebar-active: #3b82f6;
          --sidebar-text: #64748b;
          --sidebar-active-bg: rgba(59, 130, 246, 0.05);
          --sidebar-border: #f1f5f9;
          --accent-blue: #3b82f6;
          --accent-red: #ef4444;
          --govt-green: #10b981;
          --govt-bg: #ecfdf5;
        }

        .dark-theme {
          --sidebar-bg: #1e293b;
          --sidebar-border: rgba(255, 255, 255, 0.05);
          --sidebar-text: #94a3b8;
          --bg: #0f172a;
          --text: #f8fafc;
        }

        .light-theme {
          --bg: #f8fafc;
          --text: #0f172a;
        }

        .dho-admin-portal {
          display: flex;
          height: 100vh;
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', sans-serif;
          transition: background 0.3s ease;
        }

        /* Sidebar Styling */
        /* Topbar */
        .dho-topbar {
          height: 80px; background: var(--sidebar-bg); border-bottom: 1px solid var(--sidebar-border);
          display: flex; justify-content: space-between; align-items: center; padding: 0 2rem;
        }
        .topbar-left { display: flex; align-items: center; gap: 20px; flex: 1; }
        .toggle-sidebar { background: transparent; border: none; color: var(--text-muted); cursor: pointer; }
        
        .search-wrapper {
          background: var(--surface); border-radius: 12px; display: flex; align-items: center;
          padding: 0 1rem; width: 400px; gap: 10px;
        }
        .search-wrapper input { background: transparent; border: none; height: 40px; width: 100%; outline: none; font-size: 0.9rem; color: var(--text); }
        .search-icon { color: var(--text-muted); }

        .topbar-right { display: flex; align-items: center; gap: 2rem; }
        .header-actions { display: flex; gap: 10px; }
        .h-icon-btn {
          width: 40px; height: 40px; border-radius: 10px; border: 1px solid var(--sidebar-border);
          background: transparent; color: var(--sidebar-text); cursor: pointer; position: relative;
          display: flex; align-items: center; justify-content: center;
        }
        .notif-dot { position: absolute; top: 10px; right: 10px; width: 8px; height: 8px; background: var(--accent-blue); border-radius: 50%; border: 2px solid var(--sidebar-bg); }

        .user-profile-widget { display: flex; align-items: center; gap: 12px; }
        .user-text { display: flex; flex-direction: column; text-align: right; }
        .u-name { font-weight: 700; font-size: 0.9rem; }
        .u-id { font-size: 0.75rem; color: var(--text-muted); }
        .u-avatar { width: 40px; height: 40px; border-radius: 10px; background: var(--surface); color: var(--accent-blue); display: flex; align-items: center; justify-content: center; }

        .dho-content-viewport { flex: 1; padding: 2rem; overflow-y: auto; }

        /* Animations */
        .animate-fade { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default DistrictOfficerDashboard;

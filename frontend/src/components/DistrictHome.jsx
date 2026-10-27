import React from 'react';
import { 
  ClipboardList, CheckCircle2, Clock, 
  HardHat, ArrowUpRight, TrendingUp, 
  User, MessageSquare, AlertCircle, 
  ChevronRight, Calendar
} from 'lucide-react';

const DistrictHome = () => {
  const stats = [
    { label: 'Total Complaints', val: '1,284', trend: '+12%', icon: <ClipboardList />, color: '#3b82f6' },
    { label: 'Resolved Cases', val: '842', trend: '+5%', icon: <CheckCircle2 />, color: '#10b981' },
    { label: 'Pending Approvals', val: '156', trend: '-2%', icon: <Clock />, color: '#f59e0b' },
    { label: 'Active Projects', val: '48', trend: 'Stable', icon: <HardHat />, color: '#8b5cf6' }
  ];

  const activities = [
    { id: 1, type: 'complaint', title: 'New Complaint: Water Supply Leakage', user: 'Ravi Kumar', time: '12m ago', status: 'new' },
    { id: 2, type: 'approval', title: 'Project Approved: Sector 4 Road Repair', user: 'Admin Panel', time: '45m ago', status: 'approved' },
    { id: 3, type: 'status', title: 'Case Resolved: Street Light #402', user: 'Electrical Dept', time: '2h ago', status: 'resolved' },
    { id: 4, type: 'alert', title: 'Deadline Reminder: Smart City Audit', user: 'System', time: '4h ago', status: 'urgent' }
  ];

  return (
    <div className="home-container animate-fade">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-content">
          <h1>Good Morning, <span>Dr. Aruna Varma</span></h1>
          <p>Here's what's happening in your district today. You have 12 new complaints and 5 pending approvals.</p>
        </div>
        <div className="welcome-img">
          <Calendar size={48} opacity={0.2} />
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-card" style={{ '--accent': s.color }}>
            <div className="stat-icon" style={{ background: `${s.color}15`, color: s.color }}>
              {s.icon}
            </div>
            <div className="stat-info">
              <span className="stat-label">{s.label}</span>
              <h2 className="stat-value">{s.val}</h2>
              <div className="stat-footer">
                <span className="trend-val" style={{ color: s.trend.includes('+') ? '#10b981' : '#f59e0b' }}>
                  {s.trend}
                </span>
                <span className="trend-label">since last week</span>
              </div>
            </div>
            <div className="stat-glow"></div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="home-grid">
        {/* Analytics Preview */}
        <div className="grid-section analytics-preview">
          <div className="section-header">
            <h3>District Performance Trends</h3>
            <div className="header-actions">
              <button className="small-btn active">Weekly</button>
              <button className="small-btn">Monthly</button>
            </div>
          </div>
          <div className="chart-placeholder">
            <div className="mock-chart">
              {[40, 60, 45, 90, 65, 80, 50].map((h, i) => (
                <div key={i} className="bar-container">
                  <div className="bar" style={{ height: `${h}%` }}>
                    <div className="bar-tooltip">{h}%</div>
                  </div>
                  <span className="bar-label">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <div className="legend-item"><span className="dot" style={{ background: '#3b82f6' }}></span> Resolution Rate</div>
              <div className="legend-item"><span className="dot" style={{ background: '#10b981' }}></span> Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="grid-section activity-feed">
          <div className="section-header">
            <h3>Recent Activity</h3>
            <button className="view-all-link">View All Activity</button>
          </div>
          <div className="feed-list">
            {activities.map(act => (
              <div key={act.id} className="feed-item">
                <div className={`feed-icon ${act.status}`}>
                  {act.type === 'complaint' && <MessageSquare size={16} />}
                  {act.type === 'approval' && <CheckCircle2 size={16} />}
                  {act.type === 'status' && <TrendingUp size={16} />}
                  {act.type === 'alert' && <AlertCircle size={16} />}
                </div>
                <div className="feed-info">
                  <div className="feed-top">
                    <strong>{act.title}</strong>
                    <span className="feed-time">{act.time}</span>
                  </div>
                  <p>Action by: <span>{act.user}</span></p>
                </div>
                <ChevronRight size={16} className="feed-chevron" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .home-container { display: flex; flex-direction: column; gap: 2rem; }

        /* Welcome Banner */
        .welcome-banner {
          background: linear-gradient(135deg, var(--primary) 0%, #1e40af 100%);
          padding: 2.5rem;
          border-radius: 30px;
          color: var(--text);
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
          position: relative;
          overflow: hidden;
        }
        .welcome-content h1 { font-size: 2rem; margin: 0; font-weight: 800; }
        .welcome-content h1 span { opacity: 0.8; }
        .welcome-content p { margin: 10px 0 0 0; opacity: 0.9; font-size: 1rem; max-width: 500px; }
        .welcome-img { width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; }

        /* Stats Grid */
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .stat-card {
          background: var(--surface);
          padding: 1.5rem;
          border-radius: 24px;
          border: 1px solid var(--border);
          display: flex;
          gap: 1rem;
          position: relative;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .stat-card:hover { transform: translateY(-5px); border-color: var(--accent); box-shadow: 0 15px 30px -10px rgba(0,0,0,0.1); }
        .stat-icon {
          width: 50px; height: 50px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .stat-info { display: flex; flex-direction: column; }
        .stat-label { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
        .stat-value { font-size: 1.8rem; font-weight: 900; margin: 5px 0; }
        .stat-footer { display: flex; align-items: center; gap: 6px; font-size: 0.7rem; font-weight: 700; }
        .trend-label { color: var(--text-muted); }
        .stat-glow { position: absolute; bottom: -20px; right: -20px; width: 80px; height: 80px; background: var(--accent); opacity: 0.05; filter: blur(30px); border-radius: 50%; }

        /* Content Grid */
        .home-grid { display: grid; grid-template-columns: 1.8fr 1.2fr; gap: 1.5rem; }
        .grid-section { background: var(--surface); padding: 1.5rem; border-radius: 28px; border: 1px solid var(--border); }
        
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .section-header h3 { font-size: 1.1rem; font-weight: 800; margin: 0; }
        .header-actions { display: flex; gap: 8px; }
        .small-btn { padding: 4px 12px; border-radius: 8px; border: 1px solid var(--border); background: transparent; color: var(--text-muted); font-size: 0.75rem; font-weight: 700; cursor: pointer; }
        .small-btn.active { background: var(--primary); color: var(--text); border-color: var(--primary); }

        .chart-placeholder { height: 280px; display: flex; flex-direction: column; }
        .mock-chart { flex: 1; display: flex; align-items: flex-end; gap: 20px; padding: 20px; border-bottom: 1px solid var(--border); }
        .bar-container { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .bar { width: 100%; background: linear-gradient(to top, var(--primary), #60a5fa); border-radius: 6px 6px 2px 2px; position: relative; transition: height 1s ease; }
        .bar:hover { filter: brightness(1.1); }
        .bar-tooltip { position: absolute; top: -30px; left: 50%; transform: translateX(-50%); background: var(--surface-light); padding: 2px 6px; border-radius: 4px; font-size: 0.65rem; font-weight: 800; opacity: 0; transition: opacity 0.2s; }
        .bar:hover .bar-tooltip { opacity: 1; }
        .bar-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 700; }
        
        .chart-legend { display: flex; gap: 20px; padding-top: 15px; justify-content: center; }
        .legend-item { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; color: var(--text-muted); font-weight: 700; }
        .legend-item .dot { width: 8px; height: 8px; border-radius: 50%; }

        /* Feed List */
        .view-all-link { background: transparent; border: none; color: var(--primary); font-size: 0.75rem; font-weight: 800; cursor: pointer; }
        .feed-list { display: flex; flex-direction: column; gap: 10px; }
        .feed-item {
          display: flex; align-items: center; gap: 12px; padding: 12px;
          background: var(--surface-light); border: 1px solid var(--border);
          border-radius: 16px; transition: all 0.2s; cursor: pointer;
        }
        .feed-item:hover { border-color: var(--primary); transform: translateX(5px); }
        .feed-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .feed-icon.new { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .feed-icon.approved { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .feed-icon.resolved { background: rgba(139, 92, 246, 0.1); color: var(--primary); }
        .feed-icon.urgent { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

        .feed-info { flex: 1; }
        .feed-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; }
        .feed-top strong { font-size: 0.85rem; }
        .feed-time { font-size: 0.7rem; color: var(--text-muted); font-weight: 700; }
        .feed-info p { margin: 0; font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
        .feed-info p span { color: var(--text); }
        .feed-chevron { color: var(--text-muted); opacity: 0.3; }
      `}</style>
    </div>
  );
};

export default DistrictHome;

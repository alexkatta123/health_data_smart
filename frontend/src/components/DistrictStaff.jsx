import React from 'react';
import { 
  Users, UserPlus, Briefcase, 
  Target, Mail, Phone, MoreHorizontal,
  ChevronRight, Star, ShieldCheck, MapPin
} from 'lucide-react';

const DistrictStaff = () => {
  const staff = [
    { name: 'Arjun Mehta', role: 'Head of Public Works', dept: 'Public Works', cases: 42, performance: 94, status: 'Active' },
    { name: 'Sneha Reddy', role: 'Chief Engineer', dept: 'Electrical', cases: 28, performance: 88, status: 'Active' },
    { name: 'Mohit Sharma', role: 'Sanitation Inspector', dept: 'Sanitation', cases: 56, performance: 72, status: 'On Leave' },
    { name: 'Kavita Iyer', role: 'Horticulture Officer', dept: 'Horticulture', cases: 15, performance: 98, status: 'Active' },
    { name: 'Vikram Seth', role: 'Traffic Coordinator', dept: 'Police/Traffic', cases: 34, performance: 85, status: 'Active' }
  ];

  return (
    <div className="staff-container animate-fade">
      <div className="page-header">
        <div className="header-title">
          <h2>Officers & Staff Management</h2>
          <p>Manage district-level administrative staff and monitor their performance.</p>
        </div>
        <button className="h-btn h-btn-primary"><UserPlus size={18} /> Add New Officer</button>
      </div>

      {/* Staff Stats Summary */}
      <div className="staff-summary">
        <div className="summary-box">
          <div className="icon-circ blue"><Users size={24} /></div>
          <div className="info">
            <h3>128</h3>
            <p>Total Staff</p>
          </div>
        </div>
        <div className="summary-box">
          <div className="icon-circ green"><ShieldCheck size={24} /></div>
          <div className="info">
            <h3>94%</h3>
            <p>Avg Performance</p>
          </div>
        </div>
        <div className="summary-box">
          <div className="icon-circ orange"><Target size={24} /></div>
          <div className="info">
            <h3>412</h3>
            <p>Active Tasks</p>
          </div>
        </div>
      </div>

      {/* Staff Directory */}
      <div className="staff-grid">
        {staff.map((member, i) => (
          <div key={i} className="staff-card">
            <div className="card-top">
              <div className="status-indicator" style={{ background: member.status === 'Active' ? '#10b981' : '#f59e0b' }}></div>
              <button className="more-btn"><MoreHorizontal size={18} /></button>
            </div>
            
            <div className="profile-main">
              <div className="avatar-large">{member.name[0]}</div>
              <h4>{member.name}</h4>
              <span className="role-text">{member.role}</span>
              <div className="dept-pill">{member.dept}</div>
            </div>

            <div className="performance-stats">
              <div className="stat-item">
                <span className="lbl">Active Cases</span>
                <span className="val">{member.cases}</span>
              </div>
              <div className="stat-item">
                <span className="lbl">Efficiency</span>
                <span className="val">{member.performance}%</span>
              </div>
            </div>

            <div className="efficiency-bar">
              <div className="fill" style={{ width: `${member.performance}%`, background: member.performance > 90 ? '#10b981' : member.performance > 80 ? '#3b82f6' : '#f59e0b' }}></div>
            </div>

            <div className="card-footer">
              <button className="footer-btn"><Mail size={16} /></button>
              <button className="footer-btn"><Phone size={16} /></button>
              <button className="assign-btn">Assign Task <ChevronRight size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .staff-container { display: flex; flex-direction: column; gap: 2rem; }
        
        .page-header { display: flex; justify-content: space-between; align-items: flex-end; }
        .header-title h2 { margin: 0; font-size: 1.6rem; font-weight: 800; }
        .header-title p { margin: 4px 0 0 0; color: var(--text-muted); font-size: 0.95rem; }
        
        .h-btn h-btn-primary { 
          display: flex; align-items: center; gap: 10px; padding: 12px 24px; 
          border-radius: 14px; background: var(--primary); border: none; color: var(--text); 
          font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }
        .h-btn h-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4); }

        .staff-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .summary-box { 
          background: var(--surface); padding: 1.5rem; border-radius: 24px; border: 1px solid var(--border);
          display: flex; align-items: center; gap: 20px;
        }
        .icon-circ { 
          width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
        }
        .icon-circ.blue { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .icon-circ.green { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .icon-circ.orange { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .summary-box .info h3 { margin: 0; font-size: 1.5rem; font-weight: 900; }
        .summary-box .info p { margin: 2px 0 0 0; font-size: 0.8rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; }

        .staff-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
        .staff-card { 
          background: var(--surface); padding: 1.5rem; border-radius: 28px; border: 1px solid var(--border);
          position: relative; transition: all 0.3s ease;
        }
        .staff-card:hover { border-color: var(--primary); transform: translateY(-5px); box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1); }
        
        .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .status-indicator { width: 10px; height: 10px; border-radius: 50%; }
        .more-btn { background: transparent; border: none; color: var(--text-muted); cursor: pointer; }

        .profile-main { display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 1.5rem; }
        .avatar-large { 
          width: 70px; height: 70px; border-radius: 20px; background: var(--surface-light); 
          display: flex; align-items: center; justify-content: center; font-size: 2rem; 
          font-weight: 900; color: var(--primary); margin-bottom: 1rem; border: 1px solid var(--border);
        }
        .profile-main h4 { margin: 0; font-size: 1.1rem; font-weight: 800; }
        .role-text { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; margin: 4px 0 8px 0; }
        .dept-pill { background: var(--surface); padding: 4px 12px; border-radius: 100px; font-size: 0.75rem; font-weight: 800; color: var(--text-muted); }

        .performance-stats { display: flex; justify-content: space-between; padding-top: 1.5rem; border-top: 1px solid var(--border); margin-bottom: 12px; }
        .stat-item { display: flex; flex-direction: column; }
        .stat-item .lbl { font-size: 0.65rem; color: var(--text-muted); font-weight: 800; text-transform: uppercase; }
        .stat-item .val { font-size: 1rem; font-weight: 900; }

        .efficiency-bar { height: 6px; background: var(--bg); border-radius: 10px; overflow: hidden; margin-bottom: 1.5rem; }
        .efficiency-bar .fill { height: 100%; border-radius: 10px; }

        .card-footer { display: flex; gap: 8px; align-items: center; }
        .footer-btn { 
          width: 36px; height: 36px; border-radius: 10px; background: var(--surface-light); 
          border: 1px solid var(--border); color: var(--text-muted); cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center;
        }
        .footer-btn:hover { color: var(--primary); border-color: var(--primary); }
        .assign-btn { 
          flex: 1; padding: 10px; border-radius: 10px; background: transparent; 
          border: 1px solid var(--border); color: var(--text); font-size: 0.8rem; 
          font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.2s;
        }
        .assign-btn:hover { background: var(--text); color: var(--surface); border-color: var(--text); }
      `}</style>
    </div>
  );
};

export default DistrictStaff;

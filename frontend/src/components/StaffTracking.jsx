import React, { useState } from 'react';
import { staffData as initialStaffData } from '../data/staffData';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Clock, 
  MapPin, 
  Phone, 
  UserPlus,
  LogIn,
  LogOut,
  ChevronRight
} from 'lucide-react';

const StaffTracking = () => {
  const [staff, setStaff] = useState(initialStaffData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');

  const filteredStaff = staff.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         person.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'All' || person.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const toggleStatus = (id) => {
    setStaff(staff.map(person => {
      if (person.id === id) {
        const newStatus = person.status === 'In' ? 'Out' : 'In';
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return {
          ...person,
          status: newStatus,
          [newStatus === 'In' ? 'lastEntry' : 'lastExit']: now
        };
      }
      return person;
    }));
  };

  return (
    <div className="staff-tracking-container animate-fade">
      <div className="mesh-gradient-staff"></div>
      
      <header className="staff-header">
        <div className="header-info">
          <h2 className="premium-title">Personnel Surveillance</h2>
          <p className="header-subtitle">Real-time tracking of doctors and health staff presence</p>
        </div>
        <div className="header-stats">
          <div className="mini-stat">
            <span className="stat-val">{staff.filter(s => s.status === 'In').length}</span>
            <span className="stat-lbl">Active In</span>
          </div>
          <div className="mini-stat">
            <span className="stat-val">{staff.filter(s => s.status === 'Out').length}</span>
            <span className="stat-lbl">On Break/Out</span>
          </div>
        </div>
      </header>

      <div className="staff-controls">
        <div className="search-pill-large">
          <Search size={20} />
          <input 
            type="text" 
            placeholder="Search by name, department..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <button 
            className={`filter-pill ${filterRole === 'All' ? 'active' : ''}`}
            onClick={() => setFilterRole('All')}
          >
            All Personnel
          </button>
          <button 
            className={`filter-pill ${filterRole === 'Doctor' ? 'active' : ''}`}
            onClick={() => setFilterRole('Doctor')}
          >
            Doctors
          </button>
          <button 
            className={`filter-pill ${filterRole === 'Staff' ? 'active' : ''}`}
            onClick={() => setFilterRole('Staff')}
          >
            Field Staff
          </button>
        </div>
        <button className="add-staff-btn">
          <UserPlus size={18} /> Add Personnel
        </button>
      </div>

      <div className="staff-grid">
        {filteredStaff.map((person) => (
          <div key={person.id} className={`staff-card ${person.status === 'In' ? 'status-in' : 'status-out'}`}>
            <div className="card-top">
              <div className="avatar-wrapper">
                <img src={person.avatar} alt={person.name} />
                <div className="status-indicator"></div>
              </div>
              <div className="person-info">
                <h3>{person.name}</h3>
                <p className="role-tag">{person.role} • {person.specialization}</p>
              </div>
              <button className="more-btn"><MoreVertical size={18} /></button>
            </div>

            <div className="card-mid">
              <div className="info-item">
                <MapPin size={14} />
                <span>{person.department}</span>
              </div>
              <div className="info-item">
                <Phone size={14} />
                <span>{person.contact}</span>
              </div>
            </div>

            <div className="card-time">
              <div className="time-entry">
                <Clock size={12} />
                <span>Entry: {person.lastEntry}</span>
              </div>
              <div className="time-exit">
                <Clock size={12} />
                <span>Exit: {person.lastExit}</span>
              </div>
            </div>

            <div className="card-actions">
              <button 
                className={`status-btn ${person.status === 'In' ? 'btn-out' : 'btn-in'}`}
                onClick={() => toggleStatus(person.id)}
              >
                {person.status === 'In' ? (
                  <><LogOut size={16} /> Mark Exit</>
                ) : (
                  <><LogIn size={16} /> Mark Entry</>
                )}
              </button>
              <button className="view-profile-btn">
                Details <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="presence-log-section animate-slide-up">
        <div className="log-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="log-icon-box"><Clock size={20} color="var(--primary)" /></div>
            <div>
              <h3>Daily Presence Log</h3>
              <p>Consolidated digital register of all personnel arrivals and departures</p>
            </div>
          </div>
          <button className="export-log-btn">Export Log (CSV)</button>
        </div>
        
        <div className="log-table-wrapper">
          <table className="log-table">
            <thead>
              <tr>
                <th>Personnel Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Entry Timestamp</th>
                <th>Exit Timestamp</th>
                <th>Shift Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((person) => (
                <tr key={person.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={person.avatar} alt="" style={{ width: '30px', height: '30px', borderRadius: '8px' }} />
                      <span style={{ fontWeight: 700 }}>{person.name}</span>
                    </div>
                  </td>
                  <td><span className="log-role-tag">{person.role}</span></td>
                  <td>{person.department}</td>
                  <td className="time-cell in">{person.lastEntry}</td>
                  <td className="time-cell out">{person.lastExit}</td>
                  <td>8h 15m</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div className={`dot-mini ${person.status === 'In' ? 'active' : 'inactive'}`}></div>
                      {person.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .staff-tracking-container {
          position: relative;
          color: var(--text);
          padding: 1rem;
        }

        .mesh-gradient-staff {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 10% 10%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
                      radial-gradient(circle at 90% 90%, rgba(14, 165, 233, 0.05) 0%, transparent 50%);
          z-index: -1;
          pointer-events: none;
        }

        .staff-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .header-stats {
          display: flex;
          gap: 1.5rem;
        }

        .mini-stat {
          background: var(--surface-light);
          border: 1px solid var(--border);
          padding: 10px 20px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          backdrop-filter: blur(10px);
        }

        .stat-val { font-size: 1.5rem; font-weight: 800; color: var(--secondary); }
        .stat-lbl { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }

        .staff-controls {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
          align-items: center;
        }

        .search-pill-large {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 14px 24px;
          border-radius: 100px;
          backdrop-filter: blur(20px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        .search-pill-large input {
          background: transparent;
          border: none;
          color: var(--text);
          font-size: 1rem;
          width: 100%;
        }

        .search-pill-large input:focus { outline: none; }

        .filter-group {
          display: flex;
          background: var(--surface);
          padding: 6px;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .filter-pill {
          background: transparent;
          border: none;
          color: var(--text-muted);
          padding: 10px 20px;
          border-radius: 100px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-pill.active {
          background: #6366f1;
          color: var(--text);
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }

        .add-staff-btn {
          background: var(--surface);
          color: var(--text);
          border: none;
          padding: 14px 28px;
          border-radius: 100px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
        }

        .add-staff-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(14, 165, 233, 0.4); }

        .staff-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .staff-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 1.5rem;
          backdrop-filter: blur(20px);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .staff-card:hover { transform: translateY(-8px); border-color: rgba(255, 255, 255, 0.1); }

        .card-top {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 1.5rem;
        }

        .avatar-wrapper {
          position: relative;
          width: 56px;
          height: 56px;
        }

        .avatar-wrapper img {
          width: 100%;
          height: 100%;
          border-radius: 18px;
          object-fit: cover;
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .status-indicator {
          position: absolute;
          bottom: -4px;
          right: -4px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 3px solid var(--surface);
        }

        .status-in .status-indicator { background: var(--surface-light); box-shadow: 0 0 10px #10b981; }
        .status-out .status-indicator { background: #f43f5e; box-shadow: 0 0 10px #f43f5e; }

        .person-info { flex: 1; }
        .person-info h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 2px; }
        .role-tag { font-size: 0.8rem; color: var(--text-muted); font-weight: 500; }

        .more-btn { background: transparent; border: none; color: var(--text-muted); cursor: pointer; }

        .card-mid {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 1.5rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .card-time {
          background: var(--surface-light);
          border-radius: 16px;
          padding: 12px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          border: 1px solid var(--border);
        }

        .time-entry, .time-exit {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .status-in .time-entry span { color: #10b981; }
        .status-out .time-exit span { color: #f43f5e; }

        .card-actions {
          display: flex;
          gap: 10px;
        }

        .status-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .btn-in { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .btn-in:hover { background: var(--surface-light); color: var(--text); }

        .btn-out { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }
        .btn-out:hover { background: #f43f5e; color: var(--text); }

        .view-profile-btn {
          padding: 12px 15px;
          background: var(--surface-light);
          border: 1px solid var(--border);
          color: var(--text-muted);
          border-radius: 12px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .view-profile-btn:hover { background: var(--surface); color: var(--text); }

        .presence-log-section {
          margin-top: 3rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 28px;
          padding: 2rem;
          box-shadow: 0 15px 40px rgba(0,0,0,0.1);
        }

        .log-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .log-icon-box {
          width: 44px;
          height: 44px;
          background: var(--surface-light);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
        }

        .log-header h3 { font-size: 1.2rem; margin-bottom: 4px; }
        .log-header p { font-size: 0.8rem; color: var(--text-muted); font-weight: 500; }

        .export-log-btn {
          background: var(--surface-light);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 10px 20px;
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .export-log-btn:hover { background: var(--primary); color: var(--text); border-color: var(--primary); }

        .log-table-wrapper { overflow-x: auto; }
        .log-table { width: 100%; border-collapse: collapse; }
        .log-table th { text-align: left; padding: 15px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); border-bottom: 1px solid var(--border); }
        .log-table td { padding: 18px 15px; font-size: 0.9rem; border-bottom: 1px solid rgba(255,255,255,0.02); }

        .log-role-tag {
          padding: 4px 10px;
          background: var(--surface-light);
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary);
        }

        .time-cell.in { color: #10b981; font-weight: 600; }
        .time-cell.out { color: #f43f5e; font-weight: 600; }

        .dot-mini { width: 6px; height: 6px; border-radius: 50%; }
        .dot-mini.active { background: var(--surface-light); box-shadow: 0 0 8px #10b981; }
        .dot-mini.inactive { background: #64748b; }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slideUp 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default StaffTracking;

import React from 'react';
import { 
  HardHat, Map, List, 
  Calendar, IndianRupee, Target, 
  ChevronRight, MoreVertical, Search,
  ArrowUpRight, Clock
} from 'lucide-react';

const DistrictProjects = () => {
  const projects = [
    { name: 'Smart City Road Network Phase 1', budget: '₹12.5 Cr', progress: 75, deadline: '2026-12-15', status: 'In Progress', dept: 'Public Works' },
    { name: 'Water Filtration Plant - North', budget: '₹4.2 Cr', progress: 40, deadline: '2026-08-20', status: 'Delayed', dept: 'Water Dept' },
    { name: 'Solar Street Lights Installation', budget: '₹1.8 Cr', progress: 100, deadline: '2026-04-10', status: 'Completed', dept: 'Electrical' },
    { name: 'District Hospital Expansion', budget: '₹28.0 Cr', progress: 15, deadline: '2027-03-30', status: 'In Progress', dept: 'Health / PWD' },
    { name: 'Public Park Redevelopment', budget: '₹0.75 Cr', progress: 60, deadline: '2026-06-05', status: 'In Progress', dept: 'Horticulture' }
  ];

  return (
    <div className="projects-container animate-fade">
      <div className="page-header">
        <div className="header-title">
          <h2>Projects Monitoring</h2>
          <p>Track ongoing government initiatives and infrastructure developments.</p>
        </div>
        <div className="header-actions">
           <button className="view-toggle-btn active"><List size={18} /> List</button>
           <button className="view-toggle-btn"><Map size={18} /> Map</button>
           <button className="h-btn h-btn-primary">Add New Project</button>
        </div>
      </div>

      {/* Projects Overview Row */}
      <div className="projects-stats">
         {[
           { label: 'Total Projects', val: '48', icon: <HardHat />, color: '#3b82f6' },
           { label: 'Allocated Budget', val: '₹142 Cr', icon: <IndianRupee />, color: '#10b981' },
           { label: 'Avg. Progress', val: '62%', icon: <Target />, color: '#8b5cf6' },
           { label: 'Behind Schedule', val: '05', icon: <Clock />, color: '#ef4444' }
         ].map((s, i) => (
           <div key={i} className="proj-stat-box" style={{ '--color': s.color }}>
              <div className="p-icon" style={{ background: `${s.color}15`, color: s.color }}>{s.icon}</div>
              <div className="p-info">
                 <span className="p-label">{s.label}</span>
                 <h3 className="p-value">{s.val}</h3>
              </div>
           </div>
         ))}
      </div>

      {/* Search & Filter */}
      <div className="projects-filter-bar">
         <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="Search project name..." />
         </div>
         <div className="status-filters">
            <button className="f-pill active">All</button>
            <button className="f-pill">Active</button>
            <button className="f-pill">Completed</button>
            <button className="f-pill text-danger">Delayed</button>
         </div>
      </div>

      {/* Projects List Grid */}
      <div className="projects-list-grid">
        {projects.map((p, i) => (
          <div key={i} className="project-card">
             <div className="p-card-header">
                <div className="p-identity">
                   <div className="p-dept">{p.dept}</div>
                   <h4>{p.name}</h4>
                </div>
                <button className="p-more"><MoreVertical size={18} /></button>
             </div>

             <div className="p-meta-grid">
                <div className="p-meta-item">
                   <IndianRupee size={14} />
                   <span>Budget: <strong>{p.budget}</strong></span>
                </div>
                <div className="p-meta-item">
                   <Calendar size={14} />
                   <span>Deadline: <strong>{p.deadline}</strong></span>
                </div>
             </div>

             <div className="p-progress-section">
                <div className="p-progress-top">
                   <span className="p-progress-label">Completion Progress</span>
                   <span className="p-progress-val">{p.progress}%</span>
                </div>
                <div className="p-progress-bar-bg">
                   <div 
                      className="p-progress-bar-fill" 
                      style={{ 
                        width: `${p.progress}%`, 
                        background: p.status === 'Delayed' ? '#ef4444' : p.status === 'Completed' ? '#10b981' : '#3b82f6' 
                      }}
                   ></div>
                </div>
                <div className="p-status-row">
                   <span className={`p-status-tag ${p.status.toLowerCase().replace(' ', '-')}`}>
                      {p.status}
                   </span>
                   {p.status === 'In Progress' && <span className="p-status-sub">On Track</span>}
                </div>
             </div>

             <div className="p-card-footer">
                <button className="p-details-btn">
                   Full Progress Report <ArrowUpRight size={14} />
                </button>
             </div>
          </div>
        ))}
      </div>

      <style>{`
        .projects-container { display: flex; flex-direction: column; gap: 2rem; }
        
        .page-header { display: flex; justify-content: space-between; align-items: flex-end; }
        .header-title h2 { margin: 0; font-size: 1.6rem; font-weight: 800; }
        .header-title p { margin: 4px 0 0 0; color: var(--text-muted); font-size: 0.95rem; }
        
        .header-actions { display: flex; gap: 10px; background: var(--surface); padding: 5px; border-radius: 16px; border: 1px solid var(--border); }
        .view-toggle-btn { 
          display: flex; align-items: center; gap: 8px; padding: 8px 16px; 
          border-radius: 12px; background: transparent; border: none; color: var(--text-muted); 
          font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.2s;
        }
        .view-toggle-btn.active { background: var(--surface-light); color: var(--text); }
        
        .h-btn h-btn-primary { 
          padding: 8px 20px; border-radius: 12px; background: var(--primary); 
          border: none; color: var(--text); font-weight: 700; font-size: 0.9rem; cursor: pointer;
        }

        .projects-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .proj-stat-box { 
          background: var(--surface); padding: 1.25rem; border-radius: 20px; border: 1px solid var(--border);
          display: flex; align-items: center; gap: 15px; border-bottom: 3px solid var(--color);
        }
        .p-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .p-label { font-size: 0.7rem; color: var(--text-muted); font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
        .p-value { margin: 2px 0 0 0; font-size: 1.4rem; font-weight: 900; }

        .projects-filter-bar { 
          display: flex; justify-content: space-between; align-items: center; 
          background: var(--surface); padding: 0.75rem 1.5rem; border-radius: 18px; border: 1px solid var(--border);
        }
        .search-box { display: flex; align-items: center; gap: 10px; background: var(--bg); padding: 8px 15px; border-radius: 10px; border: 1px solid var(--border); flex: 1; max-width: 300px; }
        .search-box input { background: transparent; border: none; color: var(--text); outline: none; width: 100%; font-size: 0.85rem; }
        
        .status-filters { display: flex; gap: 8px; }
        .f-pill { padding: 6px 14px; border-radius: 8px; border: 1px solid var(--border); background: transparent; color: var(--text-muted); font-size: 0.75rem; font-weight: 700; cursor: pointer; }
        .f-pill.active { background: var(--surface-light); color: var(--text); border-color: var(--primary); }

        .projects-list-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
        .project-card { 
          background: var(--surface); border: 1px solid var(--border); border-radius: 28px; padding: 1.75rem;
          display: flex; flex-direction: column; gap: 1.5rem; transition: all 0.3s ease;
        }
        .project-card:hover { transform: translateY(-5px); border-color: var(--primary); }
        
        .p-card-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .p-dept { font-size: 0.65rem; font-weight: 900; color: var(--primary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
        .p-identity h4 { margin: 0; font-size: 1.1rem; font-weight: 800; line-height: 1.4; color: var(--text); }
        .p-more { background: transparent; border: none; color: var(--text-muted); cursor: pointer; }

        .p-meta-grid { display: flex; flex-direction: column; gap: 8px; }
        .p-meta-item { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--text-muted); }
        .p-meta-item strong { color: var(--text); font-weight: 700; }

        .p-progress-section { display: flex; flex-direction: column; gap: 10px; }
        .p-progress-top { display: flex; justify-content: space-between; align-items: center; }
        .p-progress-label { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); }
        .p-progress-val { font-size: 0.85rem; font-weight: 900; color: var(--text); }
        
        .p-progress-bar-bg { height: 8px; background: var(--bg); border-radius: 10px; overflow: hidden; }
        .p-progress-bar-fill { height: 100%; border-radius: 10px; transition: width 1s ease-out; }

        .p-status-row { display: flex; justify-content: space-between; align-items: center; }
        .p-status-tag { 
          padding: 4px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 900; text-transform: uppercase;
        }
        .p-status-tag.in-progress { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .p-status-tag.delayed { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
        .p-status-tag.completed { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .p-status-sub { font-size: 0.7rem; color: #10b981; font-weight: 700; }

        .p-card-footer { padding-top: 1rem; border-top: 1px solid var(--border); }
        .p-details-btn { 
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; 
          padding: 10px; border-radius: 12px; background: var(--surface-light); border: 1px solid var(--border);
          color: var(--text); font-size: 0.8rem; font-weight: 800; cursor: pointer; transition: all 0.2s;
        }
        .p-details-btn:hover { background: var(--text); color: var(--surface); border-color: var(--text); }
      `}</style>
    </div>
  );
};

export default DistrictProjects;

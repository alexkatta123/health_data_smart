import React, { useState } from 'react';
import { 
  Search, Filter, Download, MoreVertical, 
  Eye, UserPlus, RefreshCw, ChevronLeft, 
  ChevronRight, Calendar, Building2
} from 'lucide-react';

const DistrictComplaints = () => {
  const [filterStatus, setFilterStatus] = useState('All');

  const complaints = [
    { id: 'CMP-2026-001', citizen: 'Ravi Kumar', category: 'Water Supply', dept: 'Public Works', date: '2026-04-20', status: 'Pending' },
    { id: 'CMP-2026-002', citizen: 'Sita Sharma', category: 'Street Lights', dept: 'Electrical', date: '2026-04-21', status: 'In Progress' },
    { id: 'CMP-2026-003', citizen: 'Anil Gupta', category: 'Road Potholes', dept: 'Public Works', date: '2026-04-22', status: 'Resolved' },
    { id: 'CMP-2026-004', citizen: 'Priya Verma', category: 'Waste Disposal', dept: 'Sanitation', date: '2026-04-23', status: 'In Progress' },
    { id: 'CMP-2026-005', citizen: 'Karan Singh', category: 'Drainage', dept: 'Public Works', date: '2026-04-23', status: 'Pending' },
    { id: 'CMP-2026-006', citizen: 'Meena Devi', category: 'Traffic Signals', dept: 'Police/Traffic', date: '2026-04-24', status: 'Resolved' },
    { id: 'CMP-2026-007', citizen: 'Rahul Jain', category: 'Park Maintenance', dept: 'Horticulture', date: '2026-04-24', status: 'In Progress' }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'In Progress': return 'status-progress';
      case 'Resolved': return 'status-resolved';
      default: return '';
    }
  };

  return (
    <div className="complaints-container animate-fade">
      <div className="page-header">
        <div className="header-title">
          <h2>Complaints Management</h2>
          <p>Monitor and resolve public grievances across your district.</p>
        </div>
        <div className="header-actions">
          <button className="export-btn"><Download size={18} /> Export List</button>
          <button className="h-btn h-btn-primary">Add New Complaint</button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="search-input">
          <Search size={18} />
          <input type="text" placeholder="Search by ID or Citizen Name..." />
        </div>
        
        <div className="filter-group">
          <div className="filter-item">
            <Filter size={16} />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option>All Statuses</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>
          <div className="filter-item">
            <Building2 size={16} />
            <select>
              <option>All Departments</option>
              <option>Public Works</option>
              <option>Sanitation</option>
              <option>Electrical</option>
            </select>
          </div>
          <div className="filter-item">
            <Calendar size={16} />
            <input type="date" />
          </div>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="table-container">
        <table className="complaints-table">
          <thead>
            <tr>
              <th>Complaint ID</th>
              <th>Citizen Name</th>
              <th>Category</th>
              <th>Department</th>
              <th>Date Filed</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c, i) => (
              <tr key={i}>
                <td><span className="id-tag">{c.id}</span></td>
                <td>
                  <div className="citizen-cell">
                    <div className="avatar-mini">{c.citizen[0]}</div>
                    <span>{c.citizen}</span>
                  </div>
                </td>
                <td>{c.category}</td>
                <td><span className="dept-tag">{c.dept}</span></td>
                <td>{c.date}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(c.status)}`}>
                    {c.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="icon-btn" title="View Details"><Eye size={16} /></button>
                    <button className="icon-btn" title="Assign Officer"><UserPlus size={16} /></button>
                    <button className="icon-btn" title="Update Status"><RefreshCw size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <span className="page-info">Showing 1 to 7 of 48 entries</span>
        <div className="page-controls">
          <button className="page-btn disabled"><ChevronLeft size={18} /></button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn"><ChevronRight size={18} /></button>
        </div>
      </div>

      <style>{`
        .complaints-container { display: flex; flex-direction: column; gap: 1.5rem; }

        .page-header { display: flex; justify-content: space-between; align-items: flex-end; }
        .header-title h2 { margin: 0; font-size: 1.6rem; font-weight: 800; }
        .header-title p { margin: 4px 0 0 0; color: var(--text-muted); font-size: 0.95rem; }
        
        .header-actions { display: flex; gap: 12px; }
        .export-btn { 
          display: flex; align-items: center; gap: 8px; padding: 10px 18px; 
          border-radius: 12px; background: var(--surface); border: 1px solid var(--border); 
          color: var(--text); font-weight: 700; font-size: 0.9rem; cursor: pointer;
        }
        .h-btn h-btn-primary { 
          padding: 10px 20px; border-radius: 12px; background: var(--primary); 
          border: none; color: var(--text); font-weight: 700; font-size: 0.9rem; cursor: pointer;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }

        .filter-bar { 
          background: var(--surface); padding: 1rem; border-radius: 20px; 
          border: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; gap: 2rem;
        }
        .search-input { 
          display: flex; align-items: center; gap: 10px; background: var(--bg); 
          padding: 10px 15px; border-radius: 12px; border: 1px solid var(--border); flex: 1;
        }
        .search-input input { background: transparent; border: none; color: var(--text); outline: none; width: 100%; font-size: 0.9rem; }
        
        .filter-group { display: flex; gap: 12px; }
        .filter-item { 
          display: flex; align-items: center; gap: 8px; background: var(--bg); 
          padding: 8px 12px; border-radius: 10px; border: 1px solid var(--border); color: var(--text-muted);
        }
        .filter-item select, .filter-item input { background: transparent; border: none; color: var(--text); font-size: 0.85rem; outline: none; }

        .table-container { 
          background: var(--surface); border-radius: 24px; border: 1px solid var(--border); 
          overflow: hidden; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
        }
        .complaints-table { width: 100%; border-collapse: collapse; text-align: left; }
        .complaints-table th { 
          padding: 1.25rem 1.5rem; background: var(--surface-light); 
          font-size: 0.75rem; font-weight: 800; color: var(--text-muted); 
          text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border);
        }
        .complaints-table td { padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border); font-size: 0.9rem; }
        .complaints-table tr:hover { background: var(--surface-light); opacity: 0.8; }

        .id-tag { font-family: monospace; font-weight: 700; color: var(--primary); }
        .citizen-cell { display: flex; align-items: center; gap: 12px; }
        .avatar-mini { 
          width: 28px; height: 28px; border-radius: 8px; background: var(--surface-light); 
          display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.75rem; color: var(--primary); border: 1px solid var(--border);
        }
        .dept-tag { padding: 4px 10px; background: var(--surface); border-radius: 6px; font-size: 0.75rem; font-weight: 700; }

        .status-badge { 
          padding: 6px 12px; border-radius: 100px; font-size: 0.75rem; font-weight: 800; 
          display: inline-flex; align-items: center; gap: 6px;
        }
        .status-pending { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); }
        .status-progress { background: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.2); }
        .status-resolved { background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2); }

        .action-buttons { display: flex; gap: 8px; }
        .action-buttons .icon-btn { 
          width: 32px; height: 32px; border-radius: 8px; background: var(--bg); 
          border: 1px solid var(--border); color: var(--text-muted); cursor: pointer; transition: all 0.2s;
        }
        .action-buttons .icon-btn:hover { color: var(--primary); border-color: var(--primary); background: var(--surface-light); }

        .pagination { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; }
        .page-info { font-size: 0.85rem; color: var(--text-muted); font-weight: 600; }
        .page-controls { display: flex; gap: 6px; }
        .page-btn { 
          width: 36px; height: 36px; border-radius: 10px; border: 1px solid var(--border); 
          background: var(--surface); color: var(--text); font-weight: 700; cursor: pointer; transition: all 0.2s;
        }
        .page-btn.active { background: var(--primary); color: var(--text); border-color: var(--primary); }
        .page-btn.disabled { opacity: 0.3; cursor: not-allowed; }
      `}</style>
    </div>
  );
};

export default DistrictComplaints;

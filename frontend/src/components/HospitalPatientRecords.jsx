import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  ArrowUpRight,
  Stethoscope,
  Bed,
  Calendar,
  ChevronRight,
  ShieldAlert,
  Activity
} from 'lucide-react';

const HospitalPatientRecords = ({ onViewEMR }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('All Facilities');

  const hospitals = [
    'All Facilities',
    'Visakhapatnam GGH',
    'Guntur General Hospital',
    'Vijayawada City Hospital',
    'Tirupati SVIMS',
    'Kurnool Medical College'
  ];

  const patientRecords = [
    { id: 'PAT-001', name: 'Rajesh Kumar', hospital: 'Visakhapatnam GGH', condition: 'Dengue', severity: 'Critical', ward: 'ICU-4', admitted: '2026-04-20' },
    { id: 'PAT-002', name: 'Sita Ramani', hospital: 'Guntur General Hospital', condition: 'Viral Fever', severity: 'Moderate', ward: 'General-B', admitted: '2026-04-21' },
    { id: 'PAT-003', name: 'Arjun Rao', hospital: 'Visakhapatnam GGH', condition: 'Malaria', severity: 'High', ward: 'Ward-12', admitted: '2026-04-19' },
    { id: 'PAT-004', name: 'Lakshmi Devi', hospital: 'Tirupati SVIMS', condition: 'Dengue', severity: 'High', ward: 'Ward-08', admitted: '2026-04-22' },
    { id: 'PAT-005', name: 'Pawan Kalyan', hospital: 'Vijayawada City Hospital', condition: 'Typhoid', severity: 'Moderate', ward: 'General-A', admitted: '2026-04-21' },
    { id: 'PAT-006', name: 'Anjali Sharma', hospital: 'Kurnool Medical College', condition: 'Dengue', severity: 'Critical', ward: 'ICU-1', admitted: '2026-04-18' },
  ];

  const filteredPatients = patientRecords.filter(p => 
    (selectedHospital === 'All Facilities' || p.hospital === selectedHospital) &&
    (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.includes(searchTerm))
  );

  const handleExportRegistry = () => {
    const headers = ['Patient ID', 'Name', 'Hospital', 'Ward', 'Condition', 'Severity', 'Admission Date'];
    const csvContent = [
      headers.join(','),
      ...filteredPatients.map(p => [
        p.id,
        `"${p.name}"`,
        `"${p.hospital}"`,
        `"${p.ward}"`,
        `"${p.condition}"`,
        p.severity,
        p.admitted
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Clinical_Registry_${selectedHospital.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="hospital-records-page animate-fade">
      <header className="page-header">
        <div className="header-left">
          <div className="badge"><Building2 size={14} /> Clinical Registry Hub</div>
          <h1>Hospital Patient Records</h1>
          <p>Real-time cross-facility patient tracking and capacity surveillance.</p>
        </div>
        <div className="header-actions">
          <div className="search-group">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by Patient ID or Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-secondary" onClick={handleExportRegistry}>
            <Download size={18} /> Export Registry
          </button>
        </div>
      </header>

      <div className="registry-stats">
        <div className="stat-card glass">
          <div className="s-icon blue"><Users size={20} /></div>
          <div className="s-info">
            <span className="s-label">Total In-Patients</span>
            <span className="s-val">1,428</span>
          </div>
        </div>
        <div className="stat-card glass">
          <div className="s-icon red"><ShieldAlert size={20} /></div>
          <div className="s-info">
            <span className="s-label">Critical Cases</span>
            <span className="s-val">84</span>
          </div>
        </div>
        <div className="stat-card glass">
          <div className="s-icon green"><Bed size={20} /></div>
          <div className="s-info">
            <span className="s-label">Bed Occupancy</span>
            <span className="s-val">78.2%</span>
          </div>
        </div>
        <div className="stat-card glass">
          <div className="s-icon orange"><Calendar size={20} /></div>
          <div className="s-info">
            <span className="s-label">Avg. Length of Stay</span>
            <span className="s-val">5.4 Days</span>
          </div>
        </div>
      </div>

      <div className="registry-container glass">
        <div className="registry-toolbar">
          <div className="filter-group">
            <Filter size={18} />
            <select value={selectedHospital} onChange={(e) => setSelectedHospital(e.target.value)}>
              {hospitals.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
          <div className="results-count">Showing {filteredPatients.length} active records</div>
        </div>

        <div className="table-wrapper">
          <table className="registry-table">
            <thead>
              <tr>
                <th>Patient Identity</th>
                <th>Facility / Ward</th>
                <th>Clinical Condition</th>
                <th>Severity</th>
                <th>Admission Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="p-cell">
                      <div className="p-avatar">{p.name.charAt(0)}</div>
                      <div className="p-meta">
                        <strong>{p.name}</strong>
                        <span>{p.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="h-cell">
                      <strong>{p.hospital}</strong>
                      <span>{p.ward}</span>
                    </div>
                  </td>
                  <td>
                    <div className="c-cell">
                      <Activity size={14} color="var(--primary)" />
                      {p.condition}
                    </div>
                  </td>
                  <td>
                    <span className={`severity-tag ${p.severity.toLowerCase()}`}>
                      {p.severity}
                    </span>
                  </td>
                  <td>
                    <div className="date-cell">
                      {p.admitted}
                    </div>
                  </td>
                  <td>
                    <div className="action-cell">
                      <button className="view-btn" onClick={() => onViewEMR(p.id)}>
                        View EMR <ArrowUpRight size={14} />
                      </button>
                      <button className="more-btn"><MoreVertical size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hospital-records-page { padding: 2rem; color: var(--text); }
        
        .page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2.5rem; }
        .badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(14, 165, 233, 0.1); color: var(--primary); padding: 6px 12px; border-radius: 100px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; margin-bottom: 12px; }
        .page-header h1 { font-size: 2.4rem; font-weight: 800; }
        .page-header p { color: var(--text-muted); font-size: 0.95rem; }
        
        .header-actions { display: flex; gap: 1rem; }
        .search-group { background: var(--surface-light); border: 1px solid var(--border); padding: 8px 16px; border-radius: 12px; display: flex; align-items: center; gap: 12px; min-width: 350px; }
        .search-group input { background: transparent; border: none; color: var(--text); outline: none; width: 100%; font-weight: 500; }
        .btn-secondary { background: var(--surface-light); border: 1px solid var(--border); color: var(--text); padding: 0 20px; height: 44px; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: all 0.2s ease; }
        .btn-secondary:hover { border-color: var(--primary); color: var(--primary); }

        .registry-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
        .stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 1.5rem; display: flex; align-items: center; gap: 1.5rem; }
        .s-icon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .s-icon.blue { background: rgba(14, 165, 233, 0.1); color: var(--secondary); }
        .s-icon.red { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }
        .s-icon.green { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .s-icon.orange { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .s-label { display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 4px; }
        .s-val { font-size: 1.5rem; font-weight: 800; }

        .registry-container { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 0; overflow: hidden; backdrop-filter: blur(20px); }
        .registry-toolbar { padding: 1.5rem 2rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; background: var(--surface); }
        .filter-group { display: flex; align-items: center; gap: 12px; color: var(--text-muted); }
        .filter-group select { background: var(--surface-light); border: 1px solid var(--border); color: var(--text); padding: 8px 12px; border-radius: 8px; font-weight: 600; outline: none; cursor: pointer; }
        .results-count { font-size: 0.85rem; font-weight: 700; color: var(--text-muted); }

        .table-wrapper { width: 100%; overflow-x: auto; }
        .registry-table { width: 100%; border-collapse: collapse; text-align: left; }
        .registry-table th { padding: 1.25rem 2rem; font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; border-bottom: 1px solid var(--border); }
        .registry-table td { padding: 1.25rem 2rem; border-bottom: 1px solid var(--border); font-size: 0.95rem; }
        .registry-table tr:last-child td { border-bottom: none; }
        .registry-table tr:hover { background: var(--surface); }

        .p-cell { display: flex; align-items: center; gap: 15px; }
        .p-avatar { width: 36px; height: 36px; border-radius: 10px; background: var(--surface-light); color: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: 800; border: 1px solid var(--border); }
        .p-meta strong { display: block; font-size: 0.95rem; }
        .p-meta span { font-size: 0.75rem; color: var(--text-muted); font-family: monospace; }

        .h-cell strong { display: block; font-size: 0.9rem; }
        .h-cell span { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; }

        .c-cell { display: flex; align-items: center; gap: 8px; font-weight: 600; }
        
        .severity-tag { padding: 4px 12px; border-radius: 100px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
        .severity-tag.critical { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }
        .severity-tag.high { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .severity-tag.moderate { background: rgba(14, 165, 233, 0.1); color: var(--secondary); }

        .date-cell { font-weight: 600; color: var(--text-muted); font-size: 0.9rem; }

        .action-cell { display: flex; align-items: center; gap: 10px; }
        .view-btn { background: rgba(14, 165, 233, 0.1); border: 1px solid rgba(14, 165, 233, 0.2); color: var(--primary); padding: 6px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.2s ease; }
        .view-btn:hover { background: var(--primary); color: var(--text); }
        .more-btn { background: transparent; border: none; color: var(--text-muted); cursor: pointer; padding: 4px; border-radius: 4px; }
        .more-btn:hover { background: var(--surface-light); color: var(--text); }
      ` }} />
    </div>
  );
};

export default HospitalPatientRecords;

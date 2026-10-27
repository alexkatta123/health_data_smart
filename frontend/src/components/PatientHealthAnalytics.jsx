import React, { useState } from 'react';
import { 
  ClipboardList, 
  Search, 
  Filter, 
  Download, 
  Heart, 
  Activity, 
  Thermometer, 
  Droplets,
  ArrowUpRight,
  User,
  Calendar,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, LineChart, Line, RadialBarChart, RadialBar, Legend
} from 'recharts';

const PatientHealthAnalytics = ({ onViewEMR }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const clinicalData = [
    { id: 'PAT-001', name: 'Ravi Kumar', age: 45, condition: 'Dengue', vitals: 'Stable', severity: 'Moderate', district: 'Visakhapatnam', date: '2026-04-22' },
    { id: 'PAT-002', name: 'Anitha Reddy', age: 32, condition: 'Malaria', vitals: 'Alert', severity: 'High', district: 'Guntur', date: '2026-04-21' },
    { id: 'PAT-003', name: 'Suresh Babu', age: 58, condition: 'Viral Fever', vitals: 'Stable', severity: 'Low', district: 'Vijayawada', date: '2026-04-22' },
    { id: 'PAT-004', name: 'Lakshmi Devi', age: 28, condition: 'Dengue', vitals: 'Critical', severity: 'Severe', district: 'Chittoor', date: '2026-04-22' },
    { id: 'PAT-005', name: 'Praveen Das', age: 39, condition: 'Influenza', vitals: 'Stable', severity: 'Moderate', district: 'Nellore', date: '2026-04-20' },
    { id: 'PAT-006', name: 'Kavitha S.', age: 52, condition: 'Typhoid', vitals: 'Monitoring', severity: 'Moderate', district: 'Kurnool', date: '2026-04-21' },
  ];

  const conditionDistribution = [
    { name: 'Dengue', value: 42, color: '#f43f5e' },
    { name: 'Malaria', value: 28, color: '#0ea5e9' },
    { name: 'Viral Fever', value: 15, color: '#f59e0b' },
    { name: 'Typhoid', value: 10, color: '#8b5cf6' },
    { name: 'Others', value: 5, color: '#94a3b8' },
  ];

  const volumeTrends = [
    { time: '08:00', op: 450, ip: 120 },
    { time: '10:00', op: 820, ip: 180 },
    { time: '12:00', op: 640, ip: 210 },
    { time: '14:00', op: 910, ip: 240 },
    { time: '16:00', op: 750, ip: 190 },
    { time: '18:00', op: 480, ip: 140 },
    { time: '20:00', op: 320, ip: 90 },
  ];

  const accuracyData = [
    { name: 'OP Accuracy', value: 96.4, fill: '#0ea5e9' },
    { name: 'IP Accuracy', value: 98.1, fill: '#10b981' },
  ];

  const handleExportCSV = () => {
    const headers = ['Patient ID', 'Name', 'Age', 'Condition', 'Vitals', 'Severity', 'District', 'Date'];
    const rows = clinicalData.map(p => [
      p.id, p.name, p.age, p.condition, p.vitals, p.severity, p.district, p.date
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `SurvAP_Patient_Conditions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="health-analytics-page animate-fade">
      <div className="mesh-bg"></div>

      <header className="page-header">
        <div className="header-left">
          <div className="badge"><Activity size={14} /> Statewide Clinical Intelligence</div>
          <h1>Patient Health Conditions</h1>
          <p>Analyzing pathological distributions and patient health datasets across Andhra Pradesh.</p>
        </div>
        <div className="header-right">
          <button className="export-btn" onClick={handleExportCSV}>
            <Download size={18} /> Export Dataset (CSV)
          </button>
        </div>
      </header>

      <div className="analytics-grid">
        {/* OP vs IP Volume Trends */}
        <div className="glass-card chart-card full-width">
          <div className="card-header">
            <h3>OP vs IP Real-time Volume Trends</h3>
            <span className="subtitle">Real-time patient inflow classification</span>
          </div>
          <div className="chart-wrapper-full">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={volumeTrends}>
                <defs>
                  <linearGradient id="colorOP" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorIP" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)' }} />
                <Area type="monotone" dataKey="op" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorOP)" name="Outpatient (OP)" />
                <Area type="monotone" dataKey="ip" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorIP)" name="Inpatient (IP)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Classification Accuracy Gauges */}
        <div className="glass-card accuracy-card">
          <div className="card-header">
            <h3>Classification Accuracy</h3>
            <span className="subtitle">AI Tagging Precision (ICD-10/SNOMED)</span>
          </div>
          <div className="accuracy-container">
            <div className="accuracy-gauge">
              <ResponsiveContainer width="100%" height={200}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="100%" barSize={10} data={[accuracyData[0]]}>
                  <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={10} />
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="gauge-label">
                <span className="g-val">{accuracyData[0].value}%</span>
                <span className="g-name">OP Precision</span>
              </div>
            </div>
            <div className="accuracy-gauge">
              <ResponsiveContainer width="100%" height={200}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="100%" barSize={10} data={[accuracyData[1]]}>
                  <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={10} />
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="gauge-label">
                <span className="g-val green">{accuracyData[1].value}%</span>
                <span className="g-name">IP Precision</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pathogen Distribution */}
        <div className="glass-card chart-card">
          <div className="card-header">
            <h3>Condition Distribution</h3>
            <span className="subtitle">By Pathogen Type</span>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={conditionDistribution}
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {conditionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="legend-custom">
              {conditionDistribution.map((d, i) => (
                <div key={i} className="legend-item">
                  <div className="dot" style={{ background: d.color }}></div>
                  <span>{d.name} ({d.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Clinical Dataset Table */}
        <div className="glass-card table-card full-width">
          <div className="table-header">
            <div className="header-info">
              <h3>Statewide Clinical Dataset</h3>
              <p>Primary health records and classification logs</p>
            </div>
            <div className="table-actions">
              <div className="search-wrap">
                <Search size={18} />
                <input 
                  type="text" 
                  placeholder="Filter by patient name, ID or district..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="filter-btn"><Filter size={18} /> Filters</button>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Name/Age</th>
                  <th>District</th>
                  <th>Condition</th>
                  <th>Vitals Status</th>
                  <th>Severity</th>
                  <th>Entry Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clinicalData.map((patient, i) => (
                  <tr key={i} className="animate-fade" style={{ animationDelay: `${i * 0.05}s` }}>
                    <td className="id-cell">{patient.id}</td>
                    <td>
                      <div className="name-cell">
                        <strong>{patient.name}</strong>
                        <span>Age: {patient.age}</span>
                      </div>
                    </td>
                    <td>{patient.district}</td>
                    <td>
                      <span className="condition-tag">{patient.condition}</span>
                    </td>
                    <td>
                      <div className={`vital-status ${patient.vitals.toLowerCase()}`}>
                        {patient.vitals}
                      </div>
                    </td>
                    <td>
                      <div className={`severity-tag ${patient.severity.toLowerCase()}`}>
                        {patient.severity}
                      </div>
                    </td>
                    <td>{patient.date}</td>
                    <td>
                      <button 
                        className="view-btn"
                        onClick={() => onViewEMR(patient.id)}
                      >
                        View Full EMR
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .health-analytics-page {
          padding: 2rem;
          color: var(--text);
          min-height: 100vh;
          position: relative;
        }

        .mesh-bg {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at 10% 10%, rgba(14, 165, 233, 0.05) 0%, transparent 40%),
                      radial-gradient(circle at 90% 90%, rgba(99, 102, 241, 0.05) 0%, transparent 40%);
          z-index: -1;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2.5rem;
        }

        .header-left .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(14, 165, 233, 0.1);
          color: var(--primary);
          padding: 6px 12px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .header-left h1 { font-size: 2.2rem; font-weight: 800; margin-bottom: 8px; }
        .header-left p { color: var(--text-muted); font-size: 1rem; }

        .export-btn {
          background: var(--surface-light);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 12px 20px;
          border-radius: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .export-btn:hover { background: var(--primary); color: var(--text); border-color: var(--primary); box-shadow: 0 10px 20px rgba(14, 165, 233, 0.2); }

        .analytics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .full-width { grid-column: span 2; }

        .glass-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 2rem;
          backdrop-filter: blur(20px);
          box-shadow: 0 10px 40px rgba(0,0,0,0.05);
        }

        .card-header { margin-bottom: 2rem; }
        .card-header h3 { font-size: 1.25rem; font-weight: 800; margin-bottom: 4px; }
        .subtitle { font-size: 0.85rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }

        .chart-wrapper { display: flex; align-items: center; gap: 2rem; }
        .legend-custom { display: flex; flex-direction: column; gap: 12px; }
        .legend-item { display: flex; align-items: center; gap: 10px; font-size: 0.9rem; font-weight: 600; }
        .dot { width: 10px; height: 10px; border-radius: 50%; }

        .chart-wrapper-full {
          width: 100%;
          margin-top: 1rem;
        }

        .accuracy-container {
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 100%;
          min-height: 250px;
        }

        .accuracy-gauge {
          position: relative;
          width: 150px;
          height: 200px;
        }

        .gauge-label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          display: flex;
          flex-direction: column;
        }

        .g-val {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary);
        }

        .g-val.green {
          color: #10b981;
        }

        .g-name {
          font-size: 0.7rem;
          color: var(--text-muted);
          font-weight: 700;
          text-transform: uppercase;
        }

        .metrics-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .m-item { display: grid; grid-template-columns: 120px 1fr 50px; align-items: center; gap: 1.5rem; }
        .m-label { font-size: 0.85rem; font-weight: 700; color: var(--text-muted); }
        .m-bar { height: 8px; background: var(--surface-light); border-radius: 10px; overflow: hidden; }
        .fill { height: 100%; border-radius: 10px; }
        .m-val { font-weight: 800; font-size: 0.9rem; text-align: right; }

        .m-item.severe .fill { background: #f43f5e; box-shadow: 0 0 10px rgba(244, 63, 94, 0.5); }
        .m-item.high .fill { background: #f59e0b; box-shadow: 0 0 10px rgba(245, 158, 11, 0.5); }
        .m-item.moderate .fill { background: var(--surface); box-shadow: 0 0 10px rgba(14, 165, 233, 0.5); }
        .m-item.stable .fill { background: var(--surface-light); box-shadow: 0 0 10px rgba(16, 185, 129, 0.5); }

        .table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; }
        .table-actions { display: flex; gap: 1rem; }
        .search-wrap { position: relative; width: 300px; }
        .search-wrap svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .search-wrap input { width: 100%; background: var(--surface-light); border: 1px solid var(--border); border-radius: 12px; padding: 10px 10px 10px 42px; color: var(--text); outline: none; }

        .filter-btn { background: var(--surface-light); border: 1px solid var(--border); color: var(--text); padding: 0 20px; border-radius: 12px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: 600; }

        .table-container { overflow-x: auto; margin: 0 -2rem; padding: 0 2rem; }
        table { width: 100%; border-collapse: collapse; text-align: left; }
        th { padding: 1rem; font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid var(--border); }
        td { padding: 1.25rem 1rem; border-bottom: 1px solid var(--border); font-size: 0.9rem; }

        .id-cell { font-family: monospace; font-weight: 700; color: var(--primary); }
        .name-cell strong { display: block; font-size: 1rem; margin-bottom: 2px; }
        .name-cell span { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }

        .condition-tag { background: rgba(14, 165, 233, 0.1); color: var(--primary); padding: 4px 10px; border-radius: 8px; font-weight: 700; font-size: 0.8rem; }
        
        .vital-status { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; display: flex; align-items: center; gap: 6px; }
        .vital-status.stable { color: #10b981; }
        .vital-status.alert { color: #f59e0b; }
        .vital-status.critical { color: #f43f5e; animation: blink 1.5s infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

        .severity-tag { padding: 4px 12px; border-radius: 100px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; width: fit-content; }
        .severity-tag.severe { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }
        .severity-tag.high { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .severity-tag.moderate { background: rgba(14, 165, 233, 0.1); color: var(--secondary); }
        .severity-tag.low { background: rgba(16, 185, 129, 0.1); color: #10b981; }

        .view-btn { background: transparent; border: 1px solid var(--border); color: var(--text); padding: 6px 14px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; cursor: pointer; transition: all 0.2s ease; }
        .view-btn:hover { border-color: var(--primary); color: var(--primary); }

        @media (max-width: 1024px) {
          .analytics-grid { grid-template-columns: 1fr; }
          .full-width { grid-column: span 1; }
          .chart-wrapper { flex-direction: column; }
        }
      ` }} />
    </div>
  );
};

export default PatientHealthAnalytics;

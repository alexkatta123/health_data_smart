import React, { useState, useEffect } from 'react';
import { 
  Database, Plus, Search, Filter, Activity, Clock, ShieldCheck, 
  ChevronRight, ArrowUpRight, Loader2, RefreshCw, FileText, 
  Users, Building2, Stethoscope, MapPin, BarChart2, PieChart as PieIcon,
  CheckCircle2, AlertCircle, TrendingUp, Zap
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend 
} from 'recharts';
import axios from 'axios';
import ClassificationForm from './ClassificationForm';

const HMISIntelligence = () => {
  const [activeTab, setActiveTab] = useState('records'); 
  const [facilityFilter, setFacilityFilter] = useState('All');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [personnelLoading, setPersonnelLoading] = useState(true);

  // HMIS Fallback Data
  const fallbackRecords = [
    { id: 1, patient_id_anonymized: 'AP-GNT-8921', patient_age: 48, patient_gender: 'Male', visit_type: 'IP', classified_disease: 'Dengue Fever', icd_code: 'A90', snomed_code: '38081000', category: 'Communicable', recorded_at: new Date().toISOString() },
    { id: 2, patient_id_anonymized: 'AP-TPT-4432', patient_age: 32, patient_gender: 'Female', visit_type: 'OP', classified_disease: 'Malaria', icd_code: 'B50', snomed_code: '61462000', category: 'Communicable', recorded_at: new Date(Date.now() - 86400000).toISOString() },
    { id: 3, patient_id_anonymized: 'AP-VZG-1122', patient_age: 25, patient_gender: 'Male', visit_type: 'OP', classified_disease: 'Influenza', icd_code: 'J11', snomed_code: '6142004', category: 'Communicable', recorded_at: new Date(Date.now() - 172800000).toISOString() },
    { id: 4, patient_id_anonymized: 'AP-KRN-7761', patient_age: 54, patient_gender: 'Female', visit_type: 'IP', classified_disease: 'Diabetes Mellitus', icd_code: 'E11', snomed_code: '73211009', category: 'Non-Communicable', recorded_at: new Date(Date.now() - 259200000).toISOString() },
    { id: 5, patient_id_anonymized: 'AP-NTR-9001', patient_age: 12, patient_gender: 'Male', visit_type: 'OP', classified_disease: 'Acute Diarrheal Disease', icd_code: 'A09', snomed_code: '19000001', category: 'Communicable', recorded_at: new Date().toISOString() },
    { id: 6, patient_id_anonymized: 'AP-GNT-3341', patient_age: 39, patient_gender: 'Female', visit_type: 'OP', classified_disease: 'Chikungunya', icd_code: 'A92.0', snomed_code: '63650001', category: 'Communicable', recorded_at: new Date(Date.now() - 43200000).toISOString() }
  ];

  const doctorsList = [
    { id: 1, name: 'Dr. Srinivas Rao', role: 'Chief Medical Officer', facility: 'Visakhapatnam District CHC', type: 'CHC', status: 'On Duty', contact: '+91 9876543210', efficiency: 94 },
    { id: 2, name: 'Dr. Lakshmi Devi', role: 'General Physician', facility: 'Gajuwaka North PHC', type: 'PHC', status: 'On Duty', contact: '+91 9876543211', efficiency: 88 },
    { id: 3, name: 'Dr. Venkat Sai', role: 'Epidemiologist', facility: 'Tirupati Urban CHC', type: 'CHC', status: 'Off Duty', contact: '+91 9876543212', efficiency: 91 },
    { id: 4, name: 'Dr. Priya Sharma', role: 'Pediatrician', facility: 'Nellore Central PHC', type: 'PHC', status: 'On Duty', contact: '+91 9876543213', efficiency: 96 },
    { id: 5, name: 'Dr. Ashok Kumar', role: 'Medical Officer', facility: 'Kurnool Town PHC', type: 'PHC', status: 'On Leave', contact: '+91 9876543214', efficiency: 82 },
    { id: 6, name: 'Dr. Ravi Teja', role: 'General Surgeon', facility: 'Guntur City CHC', type: 'CHC', status: 'On Duty', contact: '+91 9876543215', efficiency: 89 },
    { id: 7, name: 'Dr. Meena Kumari', role: 'Gynecologist', facility: 'Anantapur Rural PHC', type: 'PHC', status: 'On Duty', contact: '+91 9876543216', efficiency: 93 },
  ];

  // Analytics Data
  const pieData = [
    { name: 'Communicable', value: 65, color: '#10b981' },
    { name: 'Non-Communicable', value: 25, color: '#8b5cf6' },
    { name: 'Emerging Risks', value: 10, color: '#f59e0b' },
  ];

  const performanceData = [
    { month: 'Jan', phc: 400, chc: 240 },
    { month: 'Feb', phc: 300, chc: 139 },
    { month: 'Mar', phc: 200, chc: 980 },
    { month: 'Apr', phc: 278, chc: 390 },
    { month: 'May', phc: 189, chc: 480 },
    { month: 'Jun', phc: 239, chc: 380 },
  ];

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/records');
      setRecords(response.data);
    } catch (err) {
      setRecords(fallbackRecords);
    } finally {
      setLoading(false);
    }
  };

  const fetchPersonnel = () => {
    setPersonnelLoading(true);
    setTimeout(() => setPersonnelLoading(false), 800);
  };

  useEffect(() => {
    if (activeTab === 'records') fetchRecords();
    else fetchPersonnel();
  }, [activeTab]);

  const filteredRecords = records.filter(r => 
    r.classified_disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.icd_code || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDoctors = doctorsList.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.facility.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = facilityFilter === 'All' || d.type === facilityFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="hmis-intelligence-view animate-fade">
      <header className="view-header">
        <div className="header-left">
          <div className="badge-tactical">
            <Database size={14} /> STATE HEALTH COMMAND CENTER
          </div>
          <h1>Clinical Intelligence & Analytics</h1>
          <p>Real-time PHC/CHC network surveillance and HMIS performance tracking.</p>
        </div>
        
        <div className="header-actions">
          {activeTab === 'records' && (
            <button className="h-btn h-btn-primary" onClick={() => setShowForm(!showForm)}>
              {showForm ? <FileText size={18} /> : <Plus size={18} />}
              {showForm ? "View All Records" : "New Record Entry"}
            </button>
          )}
        </div>
      </header>

      {!showForm && (
        <div className="nav-tabs-container">
          <div className="nav-tabs">
            <button className={activeTab === 'records' ? 'active' : ''} onClick={() => setActiveTab('records')}>
              <Activity size={18} /> Clinical Registry
            </button>
            <button className={activeTab === 'personnel' ? 'active' : ''} onClick={() => setActiveTab('personnel')}>
              <Stethoscope size={18} /> Network Personnel
            </button>
            <button className={activeTab === 'analytics' ? 'active' : ''} onClick={() => setActiveTab('analytics')}>
              <BarChart2 size={18} /> Performance Analytics
            </button>
          </div>
        </div>
      )}

      {showForm ? (
        <div className="form-container-h">
          <ClassificationForm />
          <button className="back-link" onClick={() => setShowForm(false)}>← Return to Command Center</button>
        </div>
      ) : (
        <div className="content-view">
          {activeTab === 'analytics' ? (
            <div className="analytics-dashboard animate-slide-up">
              <div className="stats-grid-tactical">
                <div className="h-card stat-card-p">
                  <div className="stat-icon"><TrendingUp size={24} /></div>
                  <div className="stat-info">
                    <h3>98.2%</h3>
                    <p>Network Sync Rate</p>
                  </div>
                  <div className="stat-trend positive">+2.4%</div>
                </div>
                <div className="h-card stat-card-p">
                  <div className="stat-icon"><Zap size={24} /></div>
                  <div className="stat-info">
                    <h3>1.2s</h3>
                    <p>Avg. Classification</p>
                  </div>
                  <div className="stat-trend positive">-0.4s</div>
                </div>
                <div className="h-card stat-card-p">
                  <div className="stat-icon"><CheckCircle2 size={24} /></div>
                  <div className="stat-info">
                    <h3>14,821</h3>
                    <p>Total Cases Tracked</p>
                  </div>
                  <div className="stat-trend">Live</div>
                </div>
              </div>

              <div className="charts-grid-h">
                <div className="h-card chart-container-p">
                  <div className="chart-header">
                    <h4>Disease Distribution</h4>
                    <p>Statewide category analysis</p>
                  </div>
                  <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                          {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="h-card chart-container-p">
                  <div className="chart-header">
                    <h4>Facility Load Trends</h4>
                    <p>Monthly PHC vs CHC records</p>
                  </div>
                  <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="phc" fill="#10b981" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="chc" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="toolbar-tactical">
                <div className="search-pill">
                  <Search size={18} />
                  <input 
                    type="text" 
                    placeholder={activeTab === 'records' ? "Search Clinical Records..." : "Search Network Personnel..."} 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="filter-group-h">
                  {activeTab === 'personnel' && (
                    <div className="facility-tabs-mini">
                      {['All', 'PHC', 'CHC'].map(f => (
                        <button key={f} className={facilityFilter === f ? 'active' : ''} onClick={() => setFacilityFilter(f)}>
                          {f}
                        </button>
                      ))}
                    </div>
                  )}
                  <button className="secondary-btn" onClick={activeTab === 'records' ? fetchRecords : fetchPersonnel} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <RefreshCw size={16} className={(activeTab === 'records' ? loading : personnelLoading) ? 'animate-spin' : ''} />
                    Sync Data
                  </button>
                </div>
              </div>

              <div className="h-card table-card-tactical">
                {(activeTab === 'records' ? loading : personnelLoading) ? (
                  <div className="loader-box-h">
                    <Loader2 className="animate-spin" size={40} color="var(--primary)" />
                    <p>Synchronizing State Health Network...</p>
                  </div>
                ) : (
                  <div className="table-scroll-container">
                    <table>
                      <thead>
                        {activeTab === 'records' ? (
                          <tr>
                            <th>Patient Identity</th>
                            <th>Clinical Classification</th>
                            <th>Category</th>
                            <th>Timestamp</th>
                            <th>Status</th>
                          </tr>
                        ) : (
                          <tr>
                            <th>Medical Officer</th>
                            <th>Facility Details</th>
                            <th>Efficiency</th>
                            <th>Contact</th>
                            <th>Status</th>
                          </tr>
                        )}
                      </thead>
                      <tbody>
                        {activeTab === 'records' ? (
                          filteredRecords.map((r) => (
                            <tr key={r.id}>
                              <td>
                                <div className="identity-cell">
                                  <div className="age-circle">{r.patient_age}</div>
                                  <div>
                                    <div className="id-t">{r.patient_id_anonymized}</div>
                                    <div className="sub-t">{r.patient_gender} • {r.visit_type}</div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="class-cell">
                                  <div className="disease-t">{r.classified_disease}</div>
                                  <div className="codes-h">
                                    <span><ShieldCheck size={10} /> ICD: {r.icd_code}</span>
                                    <span>SNOMED: {r.snomed_code}</span>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span className={`category-pill ${r.category.toLowerCase()}`}>{r.category}</span>
                              </td>
                              <td><div className="time-cell"><Clock size={14} /> {new Date(r.recorded_at).toLocaleDateString()}</div></td>
                              <td><div className="status-cell verified"><CheckCircle2 size={14} /> CLASSIFIED</div></td>
                            </tr>
                          ))
                        ) : (
                          filteredDoctors.map((d) => (
                            <tr key={d.id}>
                              <td>
                                <div className="officer-cell">
                                  <div className="officer-icon"><Stethoscope size={20} /></div>
                                  <div>
                                    <div className="name-t">{d.name}</div>
                                    <div className="role-t">{d.role}</div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="facility-cell-h">
                                  <div className="fac-name">{d.facility}</div>
                                  <div className={`fac-tag ${d.type.toLowerCase()}`}>{d.type} NODE</div>
                                </div>
                              </td>
                              <td>
                                <div className="efficiency-bar-container">
                                  <div className="eff-label">{d.efficiency}%</div>
                                  <div className="eff-track"><div className="eff-fill" style={{ width: `${d.efficiency}%` }}></div></div>
                                </div>
                              </td>
                              <td className="contact-t">{d.contact}</td>
                              <td>
                                <div className={`status-pill-h ${d.status.toLowerCase().replace(' ', '-')}`}>
                                  <div className="dot"></div>
                                  {d.status.toUpperCase()}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      <style>{`
        .hmis-intelligence-view { padding: 2rem; max-width: 1600px; margin: 0 auto; }
        .view-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2.5rem; gap: 2rem; }
        .header-left h1 { font-size: 2.5rem; font-weight: 900; margin: 0.5rem 0; letter-spacing: -1px; }
        .header-left p { color: var(--text-muted); font-weight: 600; font-size: 1.1rem; }
        .badge-tactical { display: inline-flex; align-items: center; gap: 8px; background: var(--primary-glow); color: var(--primary); padding: 6px 14px; border-radius: 100px; font-size: 0.75rem; font-weight: 900; text-transform: uppercase; }

        .nav-tabs-container { border-bottom: 1px solid var(--border); margin-bottom: 2.5rem; }
        .nav-tabs { display: flex; gap: 1rem; }
        .nav-tabs button { background: none; border: none; padding: 1rem 1.5rem; color: var(--text-muted); font-weight: 800; font-size: 0.95rem; cursor: pointer; display: flex; align-items: center; gap: 8px; position: relative; transition: 0.3s; }
        .nav-tabs button.active { color: var(--primary); }
        .nav-tabs button.active::after { content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 3px; background: var(--primary); border-radius: 3px 3px 0 0; }

        .stats-grid-tactical { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .stat-card-p { display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem; }
        .stat-icon { width: 56px; height: 56px; background: var(--primary-glow); color: var(--primary); border-radius: 16px; display: flex; align-items: center; justify-content: center; }
        .stat-info h3 { font-size: 1.8rem; font-weight: 900; margin: 0; }
        .stat-info p { margin: 0; font-size: 0.85rem; color: var(--text-muted); font-weight: 700; }
        .stat-trend { margin-left: auto; font-size: 0.75rem; font-weight: 900; padding: 4px 8px; border-radius: 6px; background: var(--surface-light); color: var(--text-muted); }
        .stat-trend.positive { color: #10b981; background: rgba(16, 185, 129, 0.1); }

        .charts-grid-h { display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: 1.5rem; }
        .chart-container-p { padding: 1.5rem; }
        .chart-header { margin-bottom: 2rem; }
        .chart-header h4 { font-size: 1.2rem; font-weight: 900; margin: 0; }
        .chart-header p { font-size: 0.85rem; color: var(--text-muted); margin: 4px 0 0; font-weight: 600; }

        .toolbar-tactical { display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; margin-bottom: 2rem; flex-wrap: wrap; }
        .search-pill { flex: 1; min-width: 300px; display: flex; align-items: center; gap: 12px; background: var(--surface-light); border: 1px solid var(--border); padding: 0 1.25rem; height: 56px; border-radius: 16px; }
        .search-pill input { background: none; border: none; color: var(--text); font-weight: 600; width: 100%; outline: none; font-size: 0.95rem; }
        
        .facility-tabs-mini { background: var(--surface-light); padding: 4px; border-radius: 12px; display: flex; gap: 4px; border: 1px solid var(--border); }
        .facility-tabs-mini button { border: none; padding: 8px 16px; border-radius: 8px; font-weight: 800; font-size: 0.75rem; cursor: pointer; background: none; color: var(--text-muted); transition: 0.3s; }
        .facility-tabs-mini button.active { background: var(--surface); color: var(--primary); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }

        .table-card-tactical { padding: 0; border-radius: 20px; overflow: hidden; }
        .table-scroll-container { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; min-width: 1000px; }
        th { text-align: left; padding: 1.25rem 1.5rem; font-size: 0.7rem; font-weight: 900; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid var(--border); background: var(--surface-light); }
        td { padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border); }
        
        .identity-cell { display: flex; align-items: center; gap: 1rem; }
        .age-circle { width: 36px; height: 36px; background: var(--primary-glow); color: var(--primary); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 0.85rem; }
        .id-t { font-weight: 900; font-size: 0.95rem; }
        .sub-t { font-size: 0.75rem; color: var(--text-muted); font-weight: 700; }

        .disease-t { font-weight: 900; color: var(--text); }
        .codes-h { display: flex; gap: 12px; margin-top: 4px; }
        .codes-h span { font-size: 0.65rem; font-weight: 800; display: flex; align-items: center; gap: 4px; color: var(--text-muted); }

        .category-pill { padding: 4px 10px; border-radius: 100px; font-size: 0.7rem; font-weight: 900; text-transform: uppercase; }
        .category-pill.communicable { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }
        .category-pill.non-communicable { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }

        .efficiency-bar-container { width: 140px; }
        .eff-label { font-size: 0.75rem; font-weight: 900; margin-bottom: 6px; }
        .eff-track { width: 100%; height: 6px; background: var(--border); border-radius: 10px; }
        .eff-fill { height: 100%; background: var(--primary); border-radius: 10px; }

        .officer-cell { display: flex; align-items: center; gap: 12px; }
        .officer-icon { width: 40px; height: 40px; background: var(--surface-light); border: 1px solid var(--border); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--primary); }
        .name-t { font-weight: 800; font-size: 0.95rem; }
        .role-t { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }

        .facility-cell-h { display: flex; flex-direction: column; gap: 4px; }
        .fac-name { font-weight: 700; font-size: 0.9rem; }
        .fac-tag { font-size: 0.6rem; font-weight: 900; padding: 2px 6px; border-radius: 4px; display: inline-block; width: fit-content; }
        .fac-tag.phc { background: var(--primary-glow); color: var(--primary); }
        .fac-tag.chc { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }

        .status-pill-h { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; border-radius: 100px; font-size: 0.7rem; font-weight: 900; }
        .status-pill-h.on-duty { color: #10b981; background: rgba(16, 185, 129, 0.1); }
        .status-pill-h.on-leave { color: #f43f5e; background: rgba(244, 63, 94, 0.1); }
        .status-pill-h.off-duty { color: #f59e0b; background: rgba(245, 158, 11, 0.1); }
        .status-pill-h .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

        .loader-box-h { padding: 5rem; text-align: center; }
        .loader-box-h p { font-weight: 700; color: var(--text-muted); margin-top: 1rem; }

        .form-container-h { max-width: 800px; margin: 0 auto; }
        .back-link { background: none; border: none; color: var(--primary); font-weight: 800; cursor: pointer; display: block; margin: 2rem auto; }

        @media (max-width: 1024px) {
          .charts-grid-h { grid-template-columns: 1fr; }
          .hmis-intelligence-view { padding: 1.5rem; }
        }
        @media (max-width: 768px) {
          .view-header { flex-direction: column; align-items: flex-start; }
          .toolbar-tactical { flex-direction: column; align-items: stretch; }
          .search-pill { min-width: 100%; }
          .nav-tabs { overflow-x: auto; white-space: nowrap; padding-bottom: 4px; }
        }
      `}</style>
    </div>
  );
};

export default HMISIntelligence;

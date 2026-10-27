import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, Cell, PieChart, Pie
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  Activity, 
  ShieldCheck, 
  ArrowUpRight, 
  Map as MapIcon,
  Search, 
  Filter,
  FileText,
  Download,
  Bell,
  CheckCircle2,
  Zap,
  Bug,
  Wind,
  Droplet,
  Biohazard,
  Brain,
  Database,
  Cpu,
  PlusCircle
} from 'lucide-react';
import HeatMap from './HeatMap';

const mockTrendData = [
  { name: 'Mon', cases: 400, confidence: 92 },
  { name: 'Tue', cases: 300, confidence: 88 },
  { name: 'Wed', cases: 600, confidence: 95 },
  { name: 'Thu', cases: 800, confidence: 90 },
  { name: 'Fri', cases: 500, confidence: 85 },
  { name: 'Sat', cases: 900, confidence: 94 },
  { name: 'Sun', cases: 1100, confidence: 96 },
];

const diseaseData = [
  { name: 'Dengue', value: 45, color: 'var(--primary)', icon: <Bug size={14} />, glow: 'rgba(255, 139, 113, 0.4)' },
  { name: 'Malaria', value: 30, color: 'var(--accent-glow)', icon: <Bug size={14} />, glow: 'rgba(255, 176, 156, 0.4)' },
  { name: 'Viral Fever', value: 15, color: 'var(--accent)', icon: <Wind size={14} />, glow: 'rgba(255, 213, 194, 0.4)' },
  { name: 'Others', value: 10, color: '#7A635F', icon: <Biohazard size={14} />, glow: 'rgba(122, 99, 95, 0.4)' },
];

const Dashboard = ({ userRole, onNavigate }) => {
  const roleId = userRole?.id || 'admin';
  const [notificationStatus, setNotificationStatus] = React.useState('prompt');
  const [showFilters, setShowFilters] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const [filters, setFilters] = React.useState({
    district: 'All Districts',
    timeframe: 'Last 24h',
    riskLevel: 'All Levels',
    pathogen: 'All Pathogens',
    facilityType: 'All Facilities',
    status: 'All Status'
  });

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const requestPermission = () => {
    setNotificationStatus('granted');
  };

  return (
    <div className="dashboard-vibrant animate-fade">
      {notificationStatus === 'prompt' && (
        <div className="notification-access-banner animate-slide-down">
          <div className="banner-content">
            <div className="banner-icon-box">
              <Bell className="ringing-bell" size={24} />
            </div>
            <div className="banner-text">
              <h4 style={{ fontSize: '1.2rem' }}>Enable Real-Time Surveillance Alerts</h4>
              <p>Get instant notifications for emerging outbreaks and critical health anomalies in your jurisdiction.</p>
            </div>
          </div>
          <div className="banner-actions">
            <button className="ignore-btn" onClick={() => setNotificationStatus('denied')}>Not Now</button>
            <button className="enable-btn" onClick={requestPermission}>Enable Alerts</button>
          </div>
        </div>
      )}

      <header className="dashboard-header">
        <div className="header-text">
          <div className="department-label" style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 800 }}>State Health Data Authority | Govt. of Andhra Pradesh</div>
          <div className="theme-pill" style={{ fontSize: '0.85rem' }}>Role: {userRole?.title || 'System Administrator'}</div>
          <h2 className="premium-title" style={{ fontSize: '3rem', margin: '1rem 0' }}>
            {roleId === 'staff' && 'Hospital Capacity Portal'}
            {roleId === 'doctor' && 'Clinical AI Validation'}
            {roleId === 'dho' && 'District Intelligence'}
            {roleId === 'state' && 'Strategic Intelligence Hub'}
            {roleId === 'admin' && 'Health Monitor'}
          </h2>
          <p className="header-subtitle" style={{ fontSize: '1.2rem', opacity: 0.8 }}>
            {roleId === 'staff' && 'Real-time monitoring of facility workload and patient entry efficacy.'}
            {roleId === 'doctor' && 'Validating AI-driven ICD-10 classifications and pathogen trends.'}
            {roleId === 'dho' && 'Regional surveillance and strategic resource deployment for the district.'}
            {roleId === 'state' && 'Statewide epidemiological forecasting and policy-level decision analytics.'}
            {roleId === 'admin' && 'Technical overview of system performance, NLP latency, and data integrity.'}
          </p>
        </div>
        <div className="header-actions">
          <div className="search-pill">
            <Search size={20} />
            <input type="text" placeholder="Search districts..." style={{ fontSize: '1.1rem' }} />
          </div>
          <button 
            className={`h-btn h-btn-secondary ${showFilters ? 'active' : ''}`} 
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} /> Filters
          </button>
          <button className="h-btn h-btn-primary" onClick={() => {
            const data = { timestamp: new Date().toISOString() };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `SurvAP_Dashboard_Export.json`;
            a.click();
          }}>
            <Download size={20} /> Export
          </button>
        </div>
      </header>

      {/* Active Filter Pills */}
      <div className="v-active-filters-row">
        {Object.entries(filters).map(([key, value]) => {
          if (value.includes('All') || value === 'Last 24h') return null;
          
          const getPillColor = (k, v) => {
            if (v === 'Critical') return '#f43f5e';
            if (v === 'High' || v === 'Alert') return '#f59e0b';
            switch(k) {
              case 'district': return '#3b82f6';
              case 'pathogen': return '#6366f1';
              case 'facilityType': return '#8b5cf6';
              case 'status': return '#10b981';
              default: return 'var(--primary)';
            }
          };

          const color = getPillColor(key, value);

          return (
            <div key={key} className="v-filter-pill" style={{ borderColor: `${color}40`, background: `${color}10` }}>
              <span className="pill-key" style={{ color: color }}>{key}:</span>
              <span className="pill-val" style={{ color: color }}>{value}</span>
              <button className="pill-remove" style={{ color: color }} onClick={() => {
                const defaults = {
                  district: 'All Districts',
                  timeframe: 'Last 24h',
                  riskLevel: 'All Levels',
                  pathogen: 'All Pathogens',
                  facilityType: 'All Facilities',
                  status: 'All Status'
                };
                setFilters({...filters, [key]: defaults[key]});
              }}>&times;</button>
            </div>
          );
        })}
      </div>

      {/* Dynamic Filter Bar */}
      {showFilters && (
        <div className="v-filter-panel animate-slide-down">
          <div className="v-panel-header">
            <div className="v-panel-title">
              <Filter size={18} />
              <span>Intelligence Synthesis Filters</span>
            </div>
            <p>Refine surveillance parameters for localized reporting</p>
          </div>
          
          <div className="v-filter-grid">
            <div className="v-filter-group-premium">
              <label><MapIcon size={14} /> Location Hierarchy</label>
              <div className="v-select-custom">
                <select 
                  value={filters.district}
                  onChange={(e) => setFilters({...filters, district: e.target.value})}
                >
                  <option>State: Andhra Pradesh</option>
                  <option>District: Visakhapatnam</option>
                  <option>Mandal: Gajuwaka</option>
                  <option>Facility: PHC-4 Coastal</option>
                  <option>District: Vijayawada (NTR)</option>
                  <option>District: Guntur</option>
                </select>
                <ChevronDown size={14} />
              </div>
            </div>

            <div className="v-filter-group-premium">
              <label><Activity size={14} /> Pathogen Category</label>
              <div className="v-select-custom">
                <select
                  value={filters.pathogen}
                  onChange={(e) => setFilters({...filters, pathogen: e.target.value})}
                >
                  <option>All Pathogens</option>
                  <option>Communicable Diseases</option>
                  <option>Non-Communicable Diseases</option>
                  <option>Vector-borne (Dengue/Malaria)</option>
                  <option>Water-borne (Cholera/Typhoid)</option>
                  <option>Respiratory (Influenza/COVID)</option>
                </select>
                <ChevronDown size={14} />
              </div>
            </div>

            <div className="v-filter-group-premium">
              <label><Users size={14} /> Demographic Filter</label>
              <div className="v-select-custom">
                <select>
                  <option>All Demographics</option>
                  <option>Age: 0-18 (Paediatric)</option>
                  <option>Age: 19-60 (Adult)</option>
                  <option>Age: 60+ (Senior)</option>
                  <option>Gender: Male</option>
                  <option>Gender: Female</option>
                </select>
                <ChevronDown size={14} />
              </div>
            </div>

            <div className="v-filter-group-premium">
              <label><Zap size={14} /> Surveillance Period</label>
              <div className="v-select-custom">
                <select
                  value={filters.timeframe}
                  onChange={(e) => setFilters({...filters, timeframe: e.target.value})}
                >
                  <option>Today (Real-time)</option>
                  <option>Last 7 Days</option>
                  <option>Monthly View</option>
                  <option>Custom Range</option>
                </select>
                <ChevronDown size={14} />
              </div>
            </div>

            <div className="v-filter-group-premium">
              <label><AlertTriangle size={14} /> Risk Threshold</label>
              <div className="v-select-custom">
                <select
                  value={filters.riskLevel}
                  onChange={(e) => setFilters({...filters, riskLevel: e.target.value})}
                >
                  <option>All Levels</option>
                  <option>Critical Only</option>
                  <option>High Risk</option>
                  <option>Moderate</option>
                  <option>Stable</option>
                </select>
                <ChevronDown size={14} />
              </div>
            </div>

            <div className="v-filter-group-premium">
              <label><ShieldCheck size={14} /> Alert Status</label>
              <div className="v-select-custom">
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                  <option>All Status</option>
                  <option>Active Alerts</option>
                  <option>Under Investigation</option>
                  <option>Resolved</option>
                  <option>False Positive</option>
                </select>
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          <div className="v-filter-footer">
            <div className="v-active-count">
              <div className="count-pill">{Object.values(filters).filter(v => !v.includes('All') && v !== 'Last 24h').length}</div>
              <span>Active Analysis Filters</span>
            </div>
            <div className="v-panel-actions">
              <button className="v-reset-btn" onClick={() => setFilters({
                district: 'All Districts',
                timeframe: 'Last 24h',
                riskLevel: 'All Levels',
                pathogen: 'All Pathogens',
                facilityType: 'All Facilities',
                status: 'All Status'
              })}>Clear All</button>
              <button className="v-apply-btn" onClick={() => setShowFilters(false)}>
                Confirm Intelligence View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Stats Section - Role Specific */}
      <div className="stats-vibrant-grid">
        {(roleId === 'state' || roleId === 'admin' || roleId === 'doctor') && (
          <div className="v-stat-card primary" onClick={() => onNavigate('medical-loop')} style={{ cursor: 'pointer' }}>
            <div className="v-stat-header">
              <div className="v-icon-box"><Brain size={24} /></div>
              <span className="v-trend positive"><ArrowUpRight size={14} /> 94.8%</span>
            </div>
            <div className="v-stat-body">
              <h2 className="v-value">94.8%</h2>
              <p className="v-label">Avg. Classification Confidence</p>
            </div>
            <div className="v-stat-footer">
              <div className="v-progress-mini"><div style={{ width: '94.8%' }}></div></div>
              <span>Transformer Model: Active</span>
            </div>
          </div>
        )}

        {(roleId === 'staff' || roleId === 'admin') && (
          <div className="v-stat-card secondary">
            <div className="v-stat-header">
              <div className="v-icon-box"><PlusCircle size={24} /></div>
              <span className="v-trend positive"><ArrowUpRight size={14} /> 12%</span>
            </div>
            <div className="v-stat-body">
              <h2 className="v-value">1,284</h2>
              <p className="v-label">Today's Patient Intake</p>
            </div>
            <div className="v-stat-footer">
              <span className="v-subtext">Cumulative processing (24h)</span>
            </div>
          </div>
        )}

        {(roleId === 'dho' || roleId === 'state' || roleId === 'admin') && (
          <div className="v-stat-card danger h-card" onClick={() => onNavigate('mission-operations')} style={{ cursor: 'pointer' }}>
            <div className="v-stat-header">
              <div className="v-icon-box"><AlertTriangle size={24} /></div>
              <span className="v-badge">CRITICAL</span>
            </div>
            <div className="v-stat-body">
              <h2 className="v-value">04</h2>
              <p className="v-label">Active Regional Outbreaks</p>
            </div>
            <div className="v-stat-footer">
              <span className="v-subtext">Immediate action required</span>
            </div>
          </div>
        )}

        {roleId === 'admin' && (
          <div className="v-stat-card primary">
            <div className="v-stat-header">
              <div className="v-icon-box"><Cpu size={24} /></div>
              <span className="v-badge">OPTIMAL</span>
            </div>
            <div className="v-stat-body">
              <h2 className="v-value">0.8s</h2>
              <p className="v-label">System NLP Latency</p>
            </div>
            <div className="v-stat-footer">
              <span className="v-subtext">P95 Inference Time Secure</span>
            </div>
          </div>
        )}
      </div>

      <div className="dashboard-content-grid">
        <div className="grid-main-column">
          {/* ROLE SPECIFIC: ADMIN / STATE / DHO */}
          {(roleId === 'admin' || roleId === 'state' || roleId === 'dho') && (
            <>
              {/* Disease Heatmap & Trends (Already existing in high-fidelity) */}
              <div className="heatmap-card-premium h-card" style={{ marginBottom: '2rem' }}>
                <div className="v-card-header">
                  <h3><MapIcon size={20} color="#8b5cf6" /> Disease Heatmap (District-wise)</h3>
                </div>
                <HeatMap />
              </div>

              <div className="chart-card h-card">
                <div className="v-card-header">
                  <h3><TrendingUp size={20} color="#6366f1" /> Trend Intelligence (Weekly/Monthly)</h3>
                </div>
                <div className="v-card-body" style={{ height: '350px', minHeight: '350px' }}>
                  {isMounted && (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockTrendData}>
                        <defs>
                          <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                        <XAxis dataKey="name" stroke="var(--text-muted)" axisLine={false} tickLine={false} tick={{fontSize: 14, fontWeight: 600}} />
                        <YAxis stroke="var(--text-muted)" axisLine={false} tickLine={false} tick={{fontSize: 14, fontWeight: 600}} />
                        <Tooltip 
                          contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: 'var(--card-shadow)', fontSize: '1rem', fontWeight: 700 }}
                        />
                        <Area type="monotone" dataKey="cases" stroke="var(--primary)" strokeWidth={4} fillOpacity={1} fill="url(#colorCases)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ROLE SPECIFIC: HOSPITAL / DOCTOR */}
          {(roleId === 'doctor') && (
            <>
              <div className="v-card clinical-records-card">
                <div className="v-card-header">
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <FileText size={20} color="#10b981" />
                      <div>
                        <h3 style={{ margin: 0 }}>Patient Records (OP/IP)</h3>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AI Disease Classification Results & Validation</p>
                      </div>
                   </div>
                </div>
                <div className="v-card-body">
                   <table className="v-table">
                     <thead>
                       <tr>
                         <th>Patient ID</th>
                         <th>Symptom Cluster</th>
                         <th>AI Classification</th>
                         <th>Confidence</th>
                         <th>Validation</th>
                       </tr>
                     </thead>
                     <tbody>
                        {[
                          { id: 'P-9921', symptoms: 'Fever, Rash, Joint Pain', ai: 'Dengue', conf: '94%', status: 'Pending' },
                          { id: 'P-8842', symptoms: 'Cough, Shortness of breath', ai: 'Influenza', conf: '88%', status: 'Validated' },
                          { id: 'P-7731', symptoms: 'Diarrhea, Dehydration', ai: 'Cholera', conf: '91%', status: 'Review' }
                        ].map((row, i) => (
                          <tr key={i}>
                            <td style={{ fontWeight: 800 }}>{row.id}</td>
                            <td>{row.symptoms}</td>
                            <td><span className="v-status-tag info">{row.ai}</span></td>
                            <td style={{ fontWeight: 700, color: '#10b981' }}>{row.conf}</td>
                            <td>
                               <button className="v-mini-btn primary">Validate</button>
                            </td>
                          </tr>
                        ))}
                     </tbody>
                   </table>
                </div>
              </div>
              
              <div className="v-card validation-panel">
                <div className="v-card-header">
                  <h3><ShieldCheck size={20} color="#8b5cf6" /> Case Validation Panel</h3>
                </div>
                <div className="v-card-body" style={{ background: 'rgba(139, 92, 246, 0.05)', borderRadius: '16px', padding: '1.5rem' }}>
                  <p style={{ margin: 0, fontWeight: 600 }}>Total Cases Awaiting Validation: <strong>14</strong></p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>High confidence matches auto-suggested for IDSP bulk reporting.</p>
                  <button className="v-apply-btn" style={{ marginTop: '1rem', width: '100%' }}>Initialize Bulk Validation</button>
                </div>
              </div>
            </>
          )}

          {/* ROLE SPECIFIC: DATA ENTRY / STAFF */}
          {(roleId === 'staff') && (
            <>
              <div className="v-card upload-form-card">
                <div className="v-card-header">
                  <h3><Database size={20} color="#f59e0b" /> Data Upload Form (CSV / Manual)</h3>
                </div>
                <div className="v-card-body" style={{ padding: '2rem', textAlign: 'center', background: 'rgba(245, 158, 11, 0.05)', borderRadius: '24px', border: '2px dashed rgba(245, 158, 11, 0.2)' }}>
                  <div className="upload-icon-box" style={{ width: 64, height: 64, background: '#f59e0b', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: "var(--text)" }}>
                    <Download size={32} />
                  </div>
                  <h4>Drag & Drop Medical Records</h4>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Support for .CSV, .XLSX, and HL7 datasets.</p>
                  <button className="v-apply-btn" style={{ background: '#f59e0b' }}>Browse System Files</button>
                </div>
              </div>

              <div className="v-card validation-status">
                <div className="v-card-header">
                  <h3><Activity size={20} color="#10b981" /> Validation Status & Recent Uploads</h3>
                </div>
                <div className="v-card-body">
                   <div className="v-feed-list">
                      {[
                        { title: 'Vizag_Hosp_OP_Data.csv', status: 'Success', rows: '142 rows processed', time: '12m ago' },
                        { title: 'Emergency_Dept_Records.xlsx', status: 'Failed', rows: 'Error at row 42 (Invalid ICD)', time: '45m ago' }
                      ].map((item, i) => (
                        <div key={i} className="v-feed-item">
                           <div className={`v-feed-indicator ${item.status === 'Success' ? 'success' : 'alert'}`}></div>
                           <div className="v-feed-content">
                              <div className="v-feed-meta">
                                <strong>{item.title}</strong>
                                <span>{item.time}</span>
                              </div>
                              <p>{item.rows}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </>
          )}

          {/* Alert Panel (Shared but specialized for Admin) */}
          {(roleId === 'admin' || roleId === 'state' || roleId === 'dho') && (
            <div className="v-card alerts-panel-premium">
              <div className="v-card-header">
                <h3><ShieldAlert size={20} color="#f43f5e" /> Strategic Alerts Panel</h3>
              </div>
              <div className="v-card-body">
                 {/* Already have logic for Alerts in intel-actions-grid */}
              </div>
            </div>
          )}
        </div>

        <div className="grid-side-column">
          {/* Pathogen Distribution & AI Confidence Matrix (Already high-fidelity) */}
          
          {/* Demographic Metrics Widget */}
          <div className="v-card demographic-card">
             <div className="v-card-header">
                <h3><Users size={20} color="#3b82f6" /> Demographic Distribution</h3>
             </div>
             <div className="v-card-body">
                <div className="demo-list">
                   <div className="demo-item">
                      <div className="demo-info"><span>Age: 0-18</span> <strong>24%</strong></div>
                      <div className="demo-bar"><div style={{ width: '24%', background: '#3b82f6' }}></div></div>
                   </div>
                   <div className="demo-item">
                      <div className="demo-info"><span>Age: 19-60</span> <strong>58%</strong></div>
                      <div className="demo-bar"><div style={{ width: '58%', background: '#8b5cf6' }}></div></div>
                   </div>
                   <div className="demo-item">
                      <div className="demo-info"><span>Age: 60+</span> <strong>18%</strong></div>
                      <div className="demo-bar"><div style={{ width: '18%', background: '#10b981' }}></div></div>
                   </div>
                </div>
             </div>
          </div>
          
          {/* Report Export Hub */}
          <div className="v-card report-export-hub">
             <div className="v-card-header">
                <h3><FileSpreadsheet size={20} color="#10b981" /> Reporting Engine</h3>
             </div>
             <div className="v-card-body">
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Generate standardized IDSP S, P, and L format reports automatically.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                   <button className="v-mini-btn" style={{ background: 'rgba(255,255,255,0.05)', padding: '12px' }}>Download IDSP Form S (Suspect Cases)</button>
                   <button className="v-mini-btn" style={{ background: 'rgba(255,255,255,0.05)', padding: '12px' }}>Download IDSP Form P (Presumptive)</button>
                </div>
             </div>
          </div>
        </div>
      </div>


      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-left">
            <Activity size={24} color="#0ea5e9" />
            <div>
              <p>© 2026 Government of Andhra Pradesh | Health Intelligence Portal</p>
              <span>Built for public health surveillance & epidemic prevention.</span>
            </div>
          </div>
          <div className="footer-right">
            <div className="compliance-pill">
              <ShieldCheck size={14} /> DPDP Compliant
            </div>
            <div className="compliance-pill">
              <CheckCircle2 size={14} /> AI Audit Verified
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .dashboard-vibrant {
          position: relative;
          color: var(--text);
          padding-bottom: 2rem;
        }

        .mesh-gradient-1 {
          position: fixed;
          top: -10%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%);
          z-index: -1;
          filter: blur(60px);
        }

        .mesh-gradient-2 {
          position: fixed;
          bottom: -10%;
          left: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
          z-index: -1;
          filter: blur(60px);
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2.5rem;
        }

        .premium-title {
          font-size: 3rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          background: linear-gradient(135deg, var(--text) 0%, var(--primary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }

        .header-subtitle {
          color: var(--text-muted);
          font-weight: 500;
          font-size: 1rem;
        }

        .header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .search-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 10px 20px;
          border-radius: 100px;
          backdrop-filter: blur(10px);
        }

        .search-pill input {
          background: transparent;
          border: none;
          color: var(--text);
          font-size: 0.9rem;
          width: 200px;
        }

        .search-pill input:focus { outline: none; }

        .action-btn-outline {
          background: var(--surface-light);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 10px 18px;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-btn-outline:hover { background: var(--surface); }

        .action-btn-primary {
          background: var(--primary);
          border: none;
          color: var(--text);
          padding: 12px 28px;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: var(--transition);
          box-shadow: 0 4px 15px var(--primary-glow);
        }

        .action-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 30px var(--primary-glow); }
        
        .action-btn-secondary {
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.3);
          color: #6366f1;
          padding: 10px 22px;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-btn-secondary:hover { 
          background: rgba(99, 102, 241, 0.2); 
          border-color: #6366f1; 
          transform: translateY(-2px);
        }

        .stats-vibrant-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .v-stat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 1.8rem;
          backdrop-filter: blur(20px);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .v-stat-card:hover { transform: translateY(-10px); border-color: rgba(255, 255, 255, 0.1); }

        .v-stat-card.primary::after {
          content: ''; position: absolute; top: -50%; right: -50%; width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%); z-index: -1;
        }

        .v-stat-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .v-icon-box {
          padding: 12px;
          border-radius: 16px;
          background: var(--surface-light);
          color: var(--text);
        }

        .v-stat-card.primary .v-icon-box { color: var(--secondary); background: rgba(14, 165, 233, 0.1); }
        .v-stat-card.danger .v-icon-box { color: #f43f5e; background: rgba(244, 63, 94, 0.1); }
        .v-stat-card.secondary .v-icon-box { color: #6366f1; background: rgba(99, 102, 241, 0.1); }

        .intel-action-card.high-risk { border-left: 4px solid #f43f5e; }
        .intel-action-card.monitoring { border-left: 4px solid #0ea5e9; }
        .intel-action-card.pilot-highlight { 
          border-left: 4px solid #f59e0b; 
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, transparent 100%);
        }
        .status-badge.pilot { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }

        .v-trend {
          font-size: 0.85rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          border-radius: 100px;
        }

        .v-trend.positive { color: #10b981; background: rgba(16, 185, 129, 0.1); }
        .v-trend.negative { color: #f43f5e; background: rgba(244, 63, 94, 0.1); }
        .v-badge { font-size: 0.65rem; font-weight: 800; background: #6366f1; padding: 4px 10px; border-radius: 6px; letter-spacing: 0.5px; }

        .v-value { font-size: 2.8rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 4px; }
        .v-label { color: var(--text-muted); font-weight: 600; font-size: 0.95rem; }

        .v-stat-footer { margin-top: 1.5rem; font-size: 0.8rem; color: var(--text-muted); font-weight: 600; }
        .v-progress-mini { height: 6px; background: var(--border); border-radius: 100px; margin-bottom: 8px; overflow: hidden; }
        .v-progress-mini div { height: 100%; background: var(--surface); border-radius: 100px; box-shadow: 0 0 10px rgba(14, 165, 233, 0.5); }

        .dashboard-content-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 1.5rem;
        }

        .grid-main-column { display: flex; flex-direction: column; gap: 1.5rem; }
        .grid-side-column { display: flex; flex-direction: column; gap: 1.5rem; }

        .v-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          backdrop-filter: blur(20px);
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .v-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .v-card-header h3 { font-size: 1.2rem; font-weight: 700; display: flex; align-items: center; gap: 12px; }

        .v-card-tabs { display: flex; background: var(--surface); padding: 4px; border-radius: 12px; }
        .v-card-tabs button {
          border: none; background: transparent; color: var(--text-muted); padding: 6px 16px; border-radius: 8px;
          font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;
        }
        .v-card-tabs button.active { background: var(--primary); color: var(--text); box-shadow: 0 4px 10px var(--primary-glow); }

        .v-legend { display: flex; gap: 15px; }
        .v-legend-item { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: var(--text-muted); font-weight: 600; }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .dot.primary { background: var(--primary); box-shadow: 0 0 8px var(--primary); }
        .dot.secondary { background: #6366f1; box-shadow: 0 0 8px #6366f1; }

        .v-disease-list { margin-top: 1.5rem; display: flex; flex-direction: column; gap: 12px; }
        .v-disease-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: var(--surface-light); border: 1px solid var(--border); border-radius: 16px; transition: all 0.3s ease; }
        .v-disease-item:hover { background: var(--background); transform: translateX(5px); }
        .disease-logo-box { width: 32px; height: 32px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .disease-val { font-weight: 700; font-size: 1rem; }

        .v-metric-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .v-metric-info { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem; }
        .v-metric-bar { height: 8px; background: var(--border); border-radius: 100px; overflow: hidden; }
        .v-metric-fill { height: 100%; border-radius: 100px; }

        .v-action-btn {
          margin-top: 2rem; width: 100%; background: var(--surface-light); border: 1px solid var(--border);
          color: var(--text); padding: 12px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: all 0.3s ease;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .v-action-btn:hover { background: var(--primary); border-color: var(--primary); box-shadow: 0 8px 20px var(--primary-glow); color: var(--text); }

        /* New Table Styles */
        .v-table { width: 100%; border-collapse: collapse; text-align: left; }
        .v-table th { padding: 15px 20px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); border-bottom: 1px solid var(--border); }
        .v-table td { padding: 18px 20px; font-size: 0.9rem; border-bottom: 1px solid var(--border); }
        .v-risk-box { width: 100px; height: 6px; background: var(--border); border-radius: 100px; overflow: hidden; }
        .v-risk-bar { height: 100%; border-radius: 100px; }
        .v-status-tag { padding: 4px 12px; border-radius: 100px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
        .v-status-tag.stable { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .v-status-tag.alert { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .v-status-tag.critical { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }
        .v-link-btn { background: transparent; border: none; color: var(--secondary); font-weight: 600; cursor: pointer; font-size: 0.85rem; }

        /* Intelligence Feed Styles */
        .v-feed-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .v-feed-item { display: flex; gap: 15px; position: relative; }
        .v-feed-indicator { width: 12px; height: 12px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
        .v-feed-indicator.alert { background: #f43f5e; box-shadow: 0 0 10px #f43f5e; }
        .v-feed-indicator.info { background: var(--surface); box-shadow: 0 0 10px #0ea5e9; }
        .v-feed-indicator.success { background: var(--surface-light); box-shadow: 0 0 10px #10b981; }
        .v-feed-content { flex: 1; }
        .v-feed-meta { display: flex; justify-content: space-between; margin-bottom: 4px; }
        .v-feed-meta strong { font-size: 0.9rem; }
        .v-feed-meta span { font-size: 0.7rem; color: var(--text-muted); }
        .v-feed-content p { font-size: 0.8rem; color: var(--text-muted); line-height: 1.4; }

        /* Footer Styles */
        .dashboard-footer { margin-top: 4rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.05); }
        .footer-content { display: flex; justify-content: space-between; align-items: center; }
        .footer-left { display: flex; gap: 15px; align-items: center; }
        .footer-left p { font-size: 0.9rem; font-weight: 600; margin-bottom: 2px; }
        .footer-left span { font-size: 0.75rem; color: var(--text-muted); }
        .footer-right { display: flex; gap: 15px; }
        .compliance-pill { background: var(--surface); padding: 8px 16px; border-radius: 100px; font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; gap: 8px; border: 1px solid rgba(255,255,255,0.05); }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dashboard-vibrant .animate-fade { animation: fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

        .notification-access-banner {
          background: rgba(14, 165, 233, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(14, 165, 233, 0.2);
          border-radius: 20px;
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        .banner-content { display: flex; align-items: center; gap: 1.5rem; }
        .banner-icon-box { background: var(--surface); color: var(--text); padding: 12px; border-radius: 14px; box-shadow: 0 0 20px rgba(14, 165, 233, 0.4); }
        
        .ringing-bell { animation: ring 2s ease infinite; transform-origin: top center; }
        @keyframes ring {
          0%, 100% { transform: rotate(0); }
          10%, 30% { transform: rotate(15deg); }
          20%, 40% { transform: rotate(-15deg); }
          50% { transform: rotate(0); }
        }

        .banner-text h4 { font-size: 1.1rem; font-weight: 700; margin-bottom: 4px; }
        .banner-text p { font-size: 0.9rem; color: var(--text-muted); }

        .banner-actions { display: flex; gap: 1rem; }
        .ignore-btn { background: transparent; border: none; color: var(--text-muted); font-weight: 600; cursor: pointer; padding: 10px; }
        .enable-btn { background: var(--surface); color: var(--text); border: none; padding: 10px 24px; border-radius: 100px; font-weight: 700; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3); }
        .enable-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(14, 165, 233, 0.4); }

        .notification-bell-container {
          position: relative;
          background: var(--surface);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 10px;
          border-radius: 12px;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .notification-bell-container:hover { color: var(--secondary); background: rgba(14, 165, 233, 0.1); }
        
        .bell-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background: #f43f5e;
          border-radius: 50%;
          border: 2px solid #0b1224;
          animation: pulse-red 2s infinite;
        }

        @keyframes pulse-red {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(244, 63, 94, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(244, 63, 94, 0); }
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down { animation: slideDown 0.5s ease-out forwards; }

        /* New Filter Panel Styles */
        .v-filter-panel {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 1.5rem;
          margin-bottom: 2.5rem;
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          position: relative;
          z-index: 10;
        }

        .v-filter-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .v-filter-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .v-filter-group-premium {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .v-filter-group-premium label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .v-select-custom {
          position: relative;
        }

        .v-select-custom select {
          width: 100%;
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 14px 16px;
          border-radius: 12px;
          color: var(--text);
          font-weight: 700;
          font-size: 0.95rem;
          appearance: none;
          cursor: pointer;
          transition: 0.3s;
        }

        .v-select-custom select:hover {
          background: var(--surface);
          border-color: rgba(255,255,255,0.2);
        }

        .v-select-custom svg {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
        }

        .v-filter-footer {
          margin-top: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .v-active-count {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .count-pill {
          background: var(--primary);
          color: var(--text);
          width: 24px;
          height: 24px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 0.8rem;
        }

        .v-active-count span {
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 600;
        }

        .v-panel-actions {
          display: flex;
          gap: 12px;
        }

        .v-reset-btn {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-muted);
          padding: 10px 20px;
          border-radius: 100px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .v-reset-btn:hover {
          background: rgba(244, 63, 94, 0.1);
          color: #f43f5e;
          border-color: rgba(244, 63, 94, 0.2);
        }

        .v-apply-btn {
          background: var(--primary);
          color: var(--text);
          border: none;
          padding: 10px 24px;
          border-radius: 100px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
        }

        .v-apply-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px var(--primary-glow);
        }

        /* Active Filter Pills */
        .v-active-filters-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 2rem;
          min-height: 32px;
        }

        .v-filter-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(14, 165, 233, 0.1);
          border: 1px solid rgba(14, 165, 233, 0.2);
          padding: 6px 12px;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary);
          animation: fadeIn 0.3s ease-out;
        }

        .pill-key {
          text-transform: capitalize;
          opacity: 0.7;
          font-size: 0.7rem;
        }

        .pill-val {
          color: var(--text);
        }

        .pill-remove {
          background: transparent;
          border: none;
          color: var(--primary);
          font-size: 1.2rem;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 2px;
          margin-left: 4px;
          opacity: 0.6;
          transition: all 0.2s ease;
        }

        .pill-remove:hover {
          opacity: 1;
          transform: scale(1.2);
        }
        .timeline-vibrant {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-left: 10px;
          position: relative;
        }

        .timeline-node {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .node-time {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 60px;
        }

        .node-time .date {
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--text);
          background: var(--surface-light);
          padding: 4px 8px;
          border-radius: 6px;
          border: 1px solid var(--border);
        }

        .node-time .connector {
          width: 2px;
          height: 30px;
          margin-top: 10px;
          opacity: 0.5;
        }

        .timeline-node:last-child .connector {
          display: none;
        }

        .node-content {
          flex: 1;
          background: var(--surface);
          padding: 12px 20px;
          border-radius: 14px;
          border-left: 4px solid var(--primary);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .node-content strong {
          font-size: 0.9rem;
          color: var(--text);
        }

        .node-content span {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary);
        }
      `}</style>
    </div>
  );
}

export default Dashboard;

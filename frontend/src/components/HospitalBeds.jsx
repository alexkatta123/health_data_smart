import React, { useState } from 'react';
import { 
  Bed, ShieldAlert, LayoutGrid, 
  List, Filter, Info, 
  ChevronRight, ArrowRight, FileText
} from 'lucide-react';

const HospitalBeds = () => {
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'list'
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showRegistry, setShowRegistry] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedBed, setSelectedBed] = useState(null);

  const [patientsInBeds] = useState(() => {
    const conditions = ['Critical', 'Stable', 'Observation', 'Post-Op'];
    const names = ['Ramesh Kumar', 'Sita Devi', 'Vikram Singh', 'Ananya P', 'Arun Reddy', 'Lakshmi K', 'Suraj V', 'Meera N', 'Prasad B', 'Divya S'];
    const doctors = ['Dr. Sameer Khan', 'Dr. Anjali Rao', 'Dr. Robert Wilson', 'Dr. Priya Sharma', 'Dr. Michael Chen'];
    const wardsList = ['ICU - Intensive Care', 'General Ward - Male', 'General Ward - Female', 'Private Suites', 'Pediatric Ward', 'Isolation Ward'];
    
    return Array.from({ length: 40 }, (_, i) => ({
      id: `P-200${i}`,
      name: names[i % names.length],
      ward: wardsList[i % wardsList.length],
      bed: `#${(i % 10) + 1}`,
      doctor: doctors[i % doctors.length],
      condition: conditions[i % conditions.length],
      admitted: '24 April, 2026'
    }));
  });

  const wards = [
    { name: 'ICU - Intensive Care', total: 12, occupied: 10, color: '#ef4444' },
    { name: 'General Ward - Male', total: 40, occupied: 32, color: '#3b82f6' },
    { name: 'General Ward - Female', total: 40, occupied: 28, color: '#ec4899' },
    { name: 'Private Suites', total: 15, occupied: 8, color: '#8b5cf6' },
    { name: 'Pediatric Ward', total: 20, occupied: 12, color: '#10b981' },
    { name: 'Isolation Ward', total: 10, occupied: 4, color: '#f59e0b' }
  ];

  const renderBedGrid = (ward, count, occupied) => {
    return Array.from({ length: count }).map((_, i) => {
      const isOccupied = i < occupied;
      const isSelected = selectedWard === ward.name && selectedBed === i;
      return (
        <div 
          key={i} 
          className={`bed-box ${isOccupied ? 'occupied' : 'available'} ${isSelected ? 'selected' : ''}`}
          onClick={() => !isOccupied && (setSelectedWard(ward.name), setSelectedBed(i))}
          title={isOccupied ? 'Occupied: Patient ID P-1024' : 'Available'}
        >
          <Bed size={12} />
        </div>
      );
    });
  };

  return (
    <div className="hospital-beds animate-fade">
      <div className="page-header-h">
        <div className="title-area-h">
          <h2>Bed Management</h2>
          <p>Real-time occupancy tracking across all hospital wards and units.</p>
        </div>
        <div className="view-toggle" style={{ display: 'flex', background: 'var(--surface)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <button 
             onClick={() => setViewMode('kanban')}
             style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: viewMode === 'kanban' ? 'var(--primary)' : 'transparent', color: viewMode === 'kanban' ? 'white' : 'var(--text-muted)', fontWeight: 800, cursor: 'pointer', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
             <LayoutGrid size={16} /> Kanban
          </button>
          <button 
             onClick={() => setViewMode('list')}
             style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: viewMode === 'list' ? 'var(--primary)' : 'transparent', color: viewMode === 'list' ? 'white' : 'var(--text-muted)', fontWeight: 800, cursor: 'pointer', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
             <List size={16} /> List
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="beds-summary">
        <div className="b-summary-card">
          <div className="b-main-stat">
             <div className="b-main-info">
                <span>Total Occupancy</span>
                <h2>114 / 150</h2>
                <p>76% Capacity Utilized</p>
             </div>
             <div className="b-progress-ring">
                <svg viewBox="0 0 36 36" className="circular-chart primary">
                   <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                   <path className="circle" strokeDasharray="76, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
             </div>
          </div>
        </div>

        <div className="b-legend-card">
           <h3>Legend</h3>
           <div className="legend-items">
              <div className="l-item"><span className="l-dot available"></span> Available Bed</div>
              <div className="l-item"><span className="l-dot occupied"></span> Occupied Bed</div>
              <div className="l-item"><span className="l-dot cleaning"></span> Cleaning/Maint</div>
              <div className="l-item"><span className="l-dot reserved"></span> Reserved</div>
           </div>
        </div>
      </div>

      {/* Bed Visualization */}
      {viewMode === 'kanban' ? (
        <div className="beds-kanban-board" style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem' }}>
          {wards.map((w, i) => (
            <div key={i} className="kanban-ward-col" style={{ minWidth: '320px', flex: '0 0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderLeft: `4px solid ${w.color}`, paddingLeft: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 900 }}>{w.name}</h3>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, background: 'var(--surface)', padding: '2px 10px', borderRadius: '8px' }}>{w.occupied}/{w.total}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {patientsInBeds.filter(p => p.ward === w.name).map(patient => (
                  <div key={patient.id} className="bed-kanban-card" style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '24px', border: '1px solid var(--border)', position: 'relative', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', background: 'rgba(14, 165, 233, 0.1)', padding: '4px 10px', borderRadius: '100px' }}>Bed {patient.bed}</span>
                      <span style={{ fontSize: '0.65rem', fontWeight: 900, color: patient.condition === 'Critical' ? '#ef4444' : '#10b981' }}>{patient.condition.toUpperCase()}</span>
                    </div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 900 }}>{patient.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px' }}>ID: {patient.id} • Adm: {patient.admitted}</p>
                    <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '0.6rem', fontWeight: 900 }}>DR</div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{patient.doctor}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mo-card" style={{ padding: 0, overflow: 'hidden' }}>
           <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                 <tr style={{ background: 'var(--surface-light)', textAlign: 'left' }}>
                    <th style={{ padding: '1.25rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Ward Name</th>
                    <th style={{ padding: '1.25rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Occupancy</th>
                    <th style={{ padding: '1.25rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Capacity</th>
                    <th style={{ padding: '1.25rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status</th>
                    <th style={{ padding: '1.25rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                 </tr>
              </thead>
              <tbody>
                 {wards.map((w, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                       <td style={{ padding: '1.5rem 1.25rem' }}>
                          <strong style={{ fontSize: '1.1rem' }}>{w.name}</strong>
                       </td>
                       <td style={{ padding: '1.5rem 1.25rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                             <div style={{ width: '100px', height: '6px', background: 'var(--bg)', borderRadius: '10px', overflow: 'hidden' }}>
                                <div style={{ width: `${(w.occupied/w.total)*100}%`, height: '100%', background: w.color }}></div>
                             </div>
                             <span style={{ fontWeight: 800 }}>{w.occupied} / {w.total}</span>
                          </div>
                       </td>
                       <td style={{ padding: '1.5rem 1.25rem', fontWeight: 700 }}>{w.total} Total Beds</td>
                       <td style={{ padding: '1.5rem 1.25rem' }}>
                          <span style={{ padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 900, background: (w.occupied/w.total) > 0.8 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: (w.occupied/w.total) > 0.8 ? '#ef4444' : '#10b981' }}>
                             {(w.occupied/w.total) > 0.8 ? 'CRITICAL' : 'OPTIMAL'}
                          </span>
                       </td>
                       <td style={{ padding: '1.5rem 1.25rem', textAlign: 'right' }}>
                          <button 
                             className="h-btn-primary" 
                             style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                             onClick={() => {
                                setSelectedWard(w.name);
                                setShowRegistry(true);
                             }}
                          >
                             Open Registry
                          </button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      )}

      {/* Ward Registry Modal */}
      {showRegistry && (
        <div className="mo-modal-overlay" onClick={() => setShowRegistry(false)}>
           <div className="mo-modal-content tactical" style={{ maxWidth: '900px' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                 <div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '1px' }}>UNIT LEVEL AUDIT</span>
                    <h2 style={{ margin: '5px 0 0' }}>{selectedWard} Registry</h2>
                 </div>
                 <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="h-btn-secondary" style={{ padding: '8px 15px' }}><Filter size={16} /> Filter</button>
                    <button 
                       className="h-btn-secondary" 
                       style={{ padding: '8px 15px', background: 'var(--primary)', border: 'none', color: "var(--text)" }}
                       onClick={() => {
                          setIsExporting(true);
                          setTimeout(() => {
                             setIsExporting(false);
                          }, 3500);
                       }}
                    >
                       Export PDF
                    </button>
                 </div>
              </div>

              <div style={{ background: 'var(--bg)', borderRadius: '20px', border: '1px solid var(--border)', overflow: 'hidden' }}>
                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                       <tr style={{ background: 'rgba(255,255,255,0.02)', textAlign: 'left' }}>
                          <th style={{ padding: '1rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)' }}>BED ID</th>
                          <th style={{ padding: '1rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)' }}>PATIENT NAME</th>
                          <th style={{ padding: '1rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)' }}>ADMISSION DATE</th>
                          <th style={{ padding: '1rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)' }}>CONDITION</th>
                          <th style={{ padding: '1rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)' }}>STATUS</th>
                       </tr>
                    </thead>
                    <tbody>
                       {[1, 2, 3, 4, 5].map((b) => (
                          <tr key={b} style={{ borderBottom: '1px solid var(--border)' }}>
                             <td style={{ padding: '1rem', fontWeight: 900, color: 'var(--primary)' }}>#0{b}</td>
                             <td style={{ padding: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                   <div style={{ width: 30, height: 30, borderRadius: '8px', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800 }}>P</div>
                                   <strong>Patient {b}02{b}</strong>
                                </div>
                             </td>
                             <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>24 April, 2026</td>
                             <td style={{ padding: '1rem', fontSize: '0.85rem' }}>Clinical Monitoring</td>
                             <td style={{ padding: '1rem' }}>
                                <span style={{ padding: '3px 8px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: '0.65rem', fontWeight: 900 }}>STABLE</span>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>

              <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                 <button className="mo-button-outline" style={{ width: '150px' }} onClick={() => setShowRegistry(false)}>Close Registry</button>
              </div>
           </div>
        </div>
      )}

      {/* Bed Assignment Modal */}
      {showAssignModal && (
        <div className="mo-modal-overlay" onClick={() => setShowAssignModal(false)}>
           <div className="mo-modal-content tactical" style={{ maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem' }}>
                 <div style={{ width: 64, height: 64, borderRadius: '16px', background: 'rgba(14, 165, 233, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                    <Bed size={32} />
                 </div>
                 <div style={{ flex: 1 }}>
                    <h2 style={{ margin: 0 }}>Assign Bed: {selectedWard}</h2>
                    <p style={{ margin: '4px 0 0', color: 'var(--text-muted)' }}>Selected Position: Bed #{selectedBed + 1} • Unit Alpha</p>
                 </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--border)', marginBottom: '2.5rem' }}>
                 <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1px' }}>SELECT PATIENT</span>
                 <select style={{ width: '100%', marginTop: '10px', background: 'var(--bg)', border: '1px solid var(--border)', color: "var(--text)", padding: '12px', borderRadius: '10px', outline: 'none' }}>
                    <option>Select Patient from Waiting List...</option>
                    <option>P-1029: Vikram Reddy (Cardiology)</option>
                    <option>P-1030: Lakshmi Rao (General)</option>
                 </select>
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                 <button className="mo-button-outline" style={{ flex: 1 }} onClick={() => setShowAssignModal(false)}>Cancel</button>
                 <button 
                    className="mo-button-primary" 
                    style={{ flex: 2 }}
                    onClick={() => {
                       setShowAssignModal(false);
                       setSelectedBed(null);
                    }}
                 >
                    Confirm Assignment
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Strategic Export Overlay */}
      {isExporting && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(7, 9, 15, 0.95)', zIndex: 4000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ width: '400px', padding: '3rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '32px', textAlign: 'center', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
              <div className="radar-animation" style={{ width: 100, height: 100, borderRadius: '50%', border: '2px solid var(--primary)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                 <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, var(--primary) 0%, transparent 20%)', animation: 'sweep 2s linear infinite' }}></div>
                 <FileText size={40} color="var(--primary)" />
              </div>
              <h3 style={{ margin: 0, letterSpacing: '2px', fontWeight: 900 }}>GENERATING SECURE REPORT</h3>
              <p style={{ margin: '10px 0 2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Compiling {selectedWard} Clinical Data...</p>
              
              <div style={{ height: '6px', background: 'var(--bg)', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
                 <div className="export-progress-fill" style={{ height: '100%', background: 'var(--primary)', borderRadius: '10px', animation: 'progressFill 3.5s ease-out forwards' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                 <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--primary)' }}>ENCRYPTING PII DATA</span>
                 <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)' }}>DPDP COMPLIANT</span>
              </div>
           </div>
        </div>
      )}

      <style>{`
        @keyframes progressFill {
          0% { width: 0%; }
          30% { width: 45%; }
          70% { width: 85%; }
          100% { width: 100%; }
        }
        .hospital-beds { display: flex; flex-direction: column; gap: 2rem; }
        
        .beds-summary { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
        .b-summary-card, .b-legend-card { background: var(--surface); border: 1px solid var(--border); border-radius: 28px; padding: 1.5rem; }
        
        .b-main-stat { display: flex; justify-content: space-between; align-items: center; }
        .b-main-info span { font-size: 0.85rem; color: var(--text-muted); font-weight: 700; }
        .b-main-info h2 { font-size: 2.2rem; font-weight: 900; margin: 5px 0; }
        .b-main-info p { margin: 0; font-size: 0.8rem; color: var(--success); font-weight: 800; }

        .b-progress-ring { width: 80px; height: 80px; }
        .circular-chart { display: block; max-height: 250px; }
        .circle-bg { fill: none; stroke: var(--bg); stroke-width: 3.8; }
        .circle { fill: none; stroke-width: 3.8; stroke-linecap: round; stroke: var(--primary); }

        .b-legend-card h3 { font-size: 1rem; font-weight: 800; margin: 0 0 1rem 0; }
        .legend-items { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .l-item { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: var(--text-muted); font-weight: 700; }
        .l-dot { width: 10px; height: 10px; border-radius: 3px; }
        .l-dot.available { background: var(--bg); border: 1px solid var(--border); }
        .l-dot.occupied { background: var(--primary); }
        .l-dot.cleaning { background: #f59e0b; }
        .l-dot.reserved { background: var(--primary); }

        .wards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 1.5rem; }
        .ward-card { background: var(--surface); border: 1px solid var(--border); border-radius: 28px; padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; border-top: 4px solid var(--accent); }
        
        .ward-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .ward-title h4 { margin: 0; font-size: 1.1rem; font-weight: 800; }
        .ward-stat { font-size: 0.8rem; color: var(--text-muted); font-weight: 700; }

        .bed-grid-visual { display: flex; flex-wrap: wrap; gap: 8px; background: var(--bg); padding: 1rem; border-radius: 16px; border: 1px solid var(--border); }
        .bed-box { width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 10px; transition: all 0.2s; }
        .bed-box.available { background: var(--surface); color: var(--text-muted); border: 1px solid var(--border); cursor: pointer; }
        .bed-box.available:hover { border-color: var(--primary); color: var(--primary); transform: scale(1.1); }
        .bed-box.available.selected { background: var(--primary); color: var(--text); border: none; box-shadow: 0 0 15px var(--primary); transform: scale(1.15); }
        .bed-box.occupied { background: var(--primary); color: var(--text); cursor: help; }

        .ward-footer { display: flex; flex-direction: column; gap: 1rem; }
        .ward-progress-bar { height: 6px; background: var(--bg); border-radius: 10px; overflow: hidden; }
        .ward-progress-bar .fill { height: 100%; border-radius: 10px; }
        .ward-action-btn { width: 100%; padding: 10px; border-radius: 10px; background: var(--surface-light); border: 1px solid var(--border); color: var(--text); font-size: 0.85rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .ward-action-btn:hover { background: var(--text); color: var(--surface); }
      `}</style>
    </div>
  );
};

export default HospitalBeds;

import React, { useState } from 'react';
import { 
  Users, UserPlus, Search, Filter, 
  MoreVertical, Eye, HeartPulse, 
  ChevronLeft, ChevronRight, FileText,
  UserCheck, UserX, AlertCircle, X,
  Activity, CheckCircle2, ShieldCheck, Zap,
  RefreshCw, LogOut, Edit, Trash2
} from 'lucide-react';

const HospitalPatients = ({ onNavigate, patients, setPatients, setSelectedPatient }) => {
  const [showDetails, setShowDetails] = useState(false);

  const [showTelemetry, setShowTelemetry] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [isMobilizing, setIsMobilizing] = useState(false);
  const [isAdmitting, setIsAdmitting] = useState(false);
  const [localSelectedPatient, setLocalSelectedPatient] = useState(null); // Rename to avoid conflict
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [wardFilter, setWardFilter] = useState('All');
  const [isExporting, setIsExporting] = useState(false);
  const [toast, setToast] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('Master'); // Master, Inpatient, Outpatient
  const [facilityFilter, setFacilityFilter] = useState('All');
  const PAGE_SIZE = 20;
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [escalationNote, setEscalationNote] = useState('');
  const [escalationPriority, setEscalationPriority] = useState('Medium');

  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    disease: '',
    status: 'Inpatient',
    room: '',
    doctor: ''
  });


  const handleAssignBed = (patient) => {
    const bedNo = Math.floor(Math.random() * 50) + 1;
    const ward = patient.room.split('-')[0] || "Gen-Ward";
    
    setToast({
      title: "Bed Assignment Finalized",
      message: `Patient ${patient.name} assigned to ${ward} Bed-${bedNo < 10 ? '0'+bedNo : bedNo}.`,
      icon: <CheckCircle2 size={20} color="#10b981" />
    });
    
    setTimeout(() => setToast(null), 5000);
    setShowDetails(false);
  };

  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.disease.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesWard = wardFilter === 'All' || p.room.includes(wardFilter);
    const matchesFacility = facilityFilter === 'All' || p.phc === facilityFilter;
    const matchesView = viewMode === 'Master' || p.status.toLowerCase() === viewMode.toLowerCase() || (viewMode === 'Inpatient' && p.status === 'Critical');
    return matchesSearch && matchesStatus && matchesWard && matchesFacility && matchesView;
  });

  const totalPages = Math.max(1, Math.ceil(filteredPatients.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pagedPatients = filteredPatients.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleDischarge = (patient) => {
    setPatients(prev => prev.filter(p => p.id !== patient.id));
    setShowMoreActions(false);
    setToast({ title: 'Patient Discharged', message: `${patient.name} has been discharged successfully.`, icon: <CheckCircle2 size={20} color="#10b981" /> });
    setTimeout(() => setToast(null), 5000);
  };

  const handleTransfer = (patient) => {
    const wards = ['302-B', '401-A', 'ICU-02', 'OPD', '205-C'];
    const newRoom = wards[Math.floor(Math.random() * wards.length)];
    setPatients(prev => prev.map(p => p.id === patient.id ? { ...p, room: newRoom } : p));
    setShowMoreActions(false);
    setToast({ title: 'Patient Transferred', message: `${patient.name} transferred to ${newRoom}.`, icon: <CheckCircle2 size={20} color="#3b82f6" /> });
    setTimeout(() => setToast(null), 5000);
  };

  const handleEscalate = (e) => {
    e.preventDefault();
    if (!localSelectedPatient) return;
    
    const newAction = {
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      action: `Escalated: ${escalationNote} (Priority: ${escalationPriority})`,
      dr: localSelectedPatient.doctor
    };

    setPatients(prev => prev.map(p => 
      p.id === localSelectedPatient.id 
        ? { ...p, clinicalActions: [newAction, ...(p.clinicalActions || [])], status: (escalationPriority === 'Critical' || escalationPriority === 'High') ? 'Critical' : p.status }
        : p
    ));

    setToast({ 
      title: 'Case Escalated', 
      message: `Patient ${localSelectedPatient.name} has been escalated to ${localSelectedPatient.doctor}.`, 
      icon: <Zap size={20} color="#f59e0b" /> 
    });
    
    setEscalationNote('');
    setShowEscalateModal(false);
    setTimeout(() => setToast(null), 5000);
  };

  const handleUpdateStatus = (patient, newStatus) => {
    setPatients(prev => prev.map(p => p.id === patient.id ? { ...p, status: newStatus } : p));
    setShowMoreActions(false);
    setToast({ title: 'Status Updated', message: `${patient.name} status changed to ${newStatus}.`, icon: <CheckCircle2 size={20} color="#f59e0b" /> });
    setTimeout(() => setToast(null), 5000);
  };

  const handleExport = () => {
    const headers = ['ID', 'Name', 'Age', 'Gender', 'Mobile', 'Disease', 'Status', 'Ward', 'Facility'];
    const csvContent = [
      headers.join(','),
      ...filteredPatients.map(p => 
        `"${p.id}","${p.name}","${p.age}","${p.gender || ''}","${p.mobile || ''}","${p.disease}","${p.status}","${p.room}","${p.phc}"`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `survap_registry_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setToast({ title: 'Export Complete', message: 'Registry data downloaded successfully.', icon: <CheckCircle2 size={20} color="#10b981" /> });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="hospital-patients animate-fade">
      <div className="page-header-h">
        <div className="title-area-h">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: 48, height: 48, borderRadius: '14px', background: 'rgba(14, 165, 233, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Users size={24} />
            </div>
            <div>
               <h2 style={{ margin: 0 }}>{viewMode === 'Inpatient' ? 'Inpatient Registry' : viewMode === 'Outpatient' ? 'OPD Command Queue' : 'Clinical Master Registry'}</h2>
               <p style={{ margin: 0 }}>{viewMode === 'Inpatient' ? 'Managing high-acuity ward admissions and critical care beds.' : 'Real-time outpatient flow and consultation management.'}</p>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
           <div className="view-selector-h" style={{ background: 'var(--surface-light)', padding: '6px', borderRadius: '14px', display: 'flex', gap: '5px', border: '1px solid var(--border)' }}>
              {['Master', 'Inpatient', 'Outpatient'].map(mode => (
                <button 
                  key={mode} 
                  onClick={() => { setViewMode(mode); setCurrentPage(1); }}
                  style={{ 
                    padding: '8px 16px', 
                    borderRadius: '10px', 
                    border: 'none', 
                    fontSize: '0.8rem', 
                    fontWeight: 800, 
                    cursor: 'pointer',
                    background: viewMode === mode ? 'var(--primary)' : 'transparent',
                    color: viewMode === mode ? 'white' : 'var(--text-muted)',
                    transition: '0.3s'
                  }}
                >
                  {mode}
                </button>
              ))}
           </div>
           <button className="h-btn-primary" onClick={() => onNavigate('advanced-registration')} style={{ background: 'var(--primary)', color: "var(--text)", border: 'none', padding: '10px 24px', borderRadius: '12px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
             <UserPlus size={18} /> New Registration
           </button>
        </div>
      </div>

      <div className="h-action-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '1rem 1.5rem', borderRadius: '18px', border: '1px solid var(--border)' }}>
        <div className="h-filter-group" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="h-filter-item">
            <label style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>District Facility</label>
            <select value={facilityFilter} onChange={(e) => { setFacilityFilter(e.target.value); setCurrentPage(1); }} style={{ background: 'var(--surface-light)', border: '1px solid var(--border)', color: "var(--text)", padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', outline: 'none' }}>
              <option value="All">All PHCs/CHCs</option>
              <option value="Guntur Urban PHC">Guntur Urban PHC</option>
              <option value="Mangalagiri PHC">Mangalagiri PHC</option>
              <option value="Tenali CHC">Tenali CHC</option>
              <option value="Amaravati PHC">Amaravati PHC</option>
              <option value="Ponnur PHC">Ponnur PHC</option>
              <option value="Bapatla CHC">Bapatla CHC</option>
              <option value="Repalle PHC">Repalle PHC</option>
            </select>
          </div>
          <div className="h-filter-item">
            <label style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>Ward/Unit</label>
            <select value={wardFilter} onChange={(e) => { setWardFilter(e.target.value); setCurrentPage(1); }} style={{ background: 'var(--surface-light)', border: '1px solid var(--border)', color: "var(--text)", padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', outline: 'none' }}>
              <option value="All">All Wards</option>
              <option value="ICU">ICU - Intensive Care Unit</option>
              <option value="302">Ward 302 (General)</option>
              <option value="405">Ward 405 (Specialized)</option>
              <option value="201">Ward 201 (Observation)</option>
              <option value="OPD">OPD Registry</option>
            </select>
          </div>
          <div className="h-filter-item">
            <label style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>Clinical Status</label>
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} style={{ background: 'var(--surface-light)', border: '1px solid var(--border)', color: "var(--text)", padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', outline: 'none' }}>
              <option value="All">All Statuses</option>
              <option value="Inpatient">Inpatient</option>
              <option value="Outpatient">Outpatient</option>
              <option value="Critical">Critical</option>
              <option value="Observation">Observation</option>
            </select>
          </div>
        </div>
        <button className="mo-button-outline" style={{ height: '40px', padding: '0 20px', display: 'flex', alignItems: 'center', gap: '8px', borderColor: 'var(--primary)', color: 'var(--primary)' }} onClick={handleExport}>
          <FileText size={18} /> Export Patient Registry (CSV)
        </button>
      </div>

      <div className="h-filter-bar" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
        <div className="h-search" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--surface-light)', border: '1px solid var(--border)', padding: '10px 16px', borderRadius: '100px', maxWidth: '400px' }}>
          <Search size={18} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Search by name, ID or disease..." 
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            style={{ background: 'transparent', border: 'none', color: 'var(--text)', fontWeight: 600, width: '100%', outline: 'none' }}
          />
        </div>
      </div>

      <div className="h-table-card">
        <table className="h-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Name & Age</th>
              <th>Condition</th>
              <th>PHC Facility</th>
              <th>Room/Ward</th>
              <th>Status</th>
              <th>Primary Doctor</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pagedPatients.length > 0 ? (
              pagedPatients.map((p, i) => (
                <tr key={i}>
                  <td><span className="h-id-tag">{p.id}</span></td>
                  <td>
                    <div className="h-patient-cell">
                      <div className="h-avatar-s">{p.name[0]}</div>
                      <div className="h-p-info">
                        <strong>{p.name}</strong>
                        <span>{p.age} Yrs</span>
                      </div>
                    </div>
                  </td>
                  <td><span className="h-condition">{p.disease}</span></td>
                  <td style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>{p.phc || 'Guntur Urban PHC'}</td>
                  <td><span className="h-room-tag">{p.room}</span></td>
                  <td>
                    <span className={`h-status-pill ${p.status.toLowerCase()}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>{p.doctor}</td>
                  <td style={{ padding: '0.5rem' }}>
                    <div className="h-action-stack">
                      <button className="h-action-btn" title="Monitor & Track" onClick={() => { setSelectedPatient(p.id); onNavigate('patient-case-file'); }} style={{ color: '#0ea5e9' }}><Eye size={16} /></button>
                      <button className="h-action-btn" title="Edit Patient Details" onClick={() => { setSelectedPatient(p.id); onNavigate('patient-case-file'); }}><Edit size={16} /></button>
                      <button className="h-action-btn delete-btn" title="Delete Record" onClick={() => { if(window.confirm(`Delete ${p.name}?`)) setPatients(prev => prev.filter(item => item.id !== p.id)); }} style={{ color: '#ef4444' }}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <Users size={48} opacity={0.2} />
                    <p>No patients match your search criteria.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="h-pagination">
        <div className="h-pg-info">Showing {Math.min((safePage - 1) * PAGE_SIZE + 1, filteredPatients.length)}–{Math.min(safePage * PAGE_SIZE, filteredPatients.length)} of {filteredPatients.length} patients</div>
        <div className="h-page-btns">
          <button className="h-page-btn" onClick={() => handlePageChange(safePage - 1)} disabled={safePage === 1}><ChevronLeft size={16} /></button>
          {(() => {
            const pages = [];
            let start = Math.max(1, safePage - 2);
            let end = Math.min(totalPages, start + 4);
            if (end - start < 4) start = Math.max(1, end - 4);
            
            for (let i = start; i <= end; i++) {
              pages.push(
                <button 
                  key={i} 
                  className={`h-page-btn${i === safePage ? ' active' : ''}`} 
                  onClick={() => handlePageChange(i)}
                >
                  {i}
                </button>
              );
            }
            return pages;
          })()}
          <button className="h-page-btn" onClick={() => handlePageChange(safePage + 1)} disabled={safePage === totalPages}><ChevronRight size={16} /></button>
        </div>
        <div style={{ width: '120px' }}></div> {/* Spacer to keep info centered */}
      </div>

      <style>{`
        .hospital-patients { display: flex; flex-direction: column; gap: 1.5rem; }
        .h-table-card { background: var(--surface); border: 1px solid var(--border); border-radius: 28px; overflow: hidden; }
        .h-table { width: 100%; border-collapse: collapse; text-align: left; }
        .h-table th { padding: 1.25rem 1.5rem; background: var(--surface-light); font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; border-bottom: 1px solid var(--border); }
        .h-table td { padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border); font-size: 0.9rem; }
        .h-table tr:hover { background: var(--surface); }
        .h-id-tag { font-family: monospace; font-weight: 800; color: var(--primary); }
        .h-patient-cell { display: flex; align-items: center; gap: 12px; }
        .h-avatar-s { width: 32px; height: 32px; border-radius: 10px; background: var(--surface-light); display: flex; align-items: center; justify-content: center; font-weight: 800; color: var(--primary); border: 1px solid var(--border); font-size: 0.8rem; }
        .h-p-info { display: flex; flex-direction: column; }
        .h-p-info span { font-size: 0.75rem; color: var(--text-muted); }
        .h-condition { font-weight: 600; color: var(--text); }
        .h-room-tag { background: var(--surface-light); padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; color: var(--text-muted); border: 1px solid var(--border); }
        .h-status-pill { padding: 4px 12px; border-radius: 100px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; }
        .h-status-pill.inpatient { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .h-status-pill.outpatient { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .h-status-pill.critical { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); }
        .h-status-pill.observation { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .h-action-stack { display: flex; flex-direction: row; align-items: center; gap: 6px; }
        .h-action-btn { width: 34px; height: 34px; border-radius: 9px; background: var(--surface-light); border: 1px solid var(--border); color: var(--text-muted); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s ease; }
        .h-action-btn:hover:not(.delete-btn) { background: var(--primary); color: var(--text); border-color: var(--primary); transform: scale(1.08); }
        .h-action-btn.delete-btn:hover { background: #ef4444; color: white; border-color: #ef4444; transform: scale(1.08); }
        .h-pagination { display: flex; justify-content: center; align-items: center; gap: 2rem; margin-top: 2rem; padding-bottom: 4rem; }
        .h-pg-info { font-size: 0.8rem; font-weight: 800; color: var(--text-muted); width: 200px; text-align: left; }
        .h-page-btns { display: flex; gap: 8px; align-items: center; }
        .h-page-btn { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 10px; border: 1px solid var(--border); background: var(--surface-light); color: var(--text); font-weight: 800; font-size: 0.8rem; cursor: pointer; transition: 0.2s; }
        .h-page-btn:hover:not(:disabled) { background: var(--border); }
        .h-page-btn.active { background: var(--primary); color: white; border-color: var(--primary); }
        .h-page-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .h-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1.5rem; }
        .h-form-group { display: flex; flex-direction: column; gap: 8px; }
        .h-form-group label { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
        .h-form-group input, .h-form-group select { background: var(--surface); border: 1px solid var(--border); padding: 12px; border-radius: 12px; color: var(--text); font-weight: 600; outline: none; }
        .h-form-group input:focus { border-color: var(--primary); }
        @keyframes ecgLine { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .ecg-monitor { height: 100px; background: var(--surface); border-radius: 12px; position: relative; overflow: hidden; border: 1px solid #10b98140; }
        .ecg-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px); background-size: 20px 20px; }
        .ecg-wave { position: absolute; top: 50%; left: 0; width: 100%; height: 2px; background: var(--surface-light); box-shadow: 0 0 15px #10b981; animation: ecgLine 2s linear infinite; }
        
        .mo-modal-overlay { position: fixed; inset: 0; background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(8px); z-index: 1000; display: flex; align-items: center; justify-content: center; }
        .mo-modal-content { background: var(--surface); border-radius: 24px; padding: 2rem; width: 100%; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1); border: 1px solid var(--border); }
        .tactical-square-btn { width: 36px; height: 36px; border-radius: 10px; background: var(--surface-light); border: 1px solid var(--border); color: var(--text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
        .tactical-square-btn:hover { background: var(--surface); color: var(--text); border-color: var(--text-muted); }
        .mo-button-primary { padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.2s; color: var(--text); display: flex; align-items: center; justify-content: center; }
        .mo-button-primary:hover { opacity: 0.9; transform: translateY(-2px); }
        .mo-button-outline { padding: 12px 24px; border-radius: 12px; background: transparent; color: var(--text); border: 1px solid var(--border); font-weight: 700; cursor: pointer; transition: 0.2s; display: flex; align-items: center; justify-content: center; }
        .mo-button-outline:hover { background: var(--surface-light); border-color: var(--text-muted); }
      `}</style>

      {/* MODALS */}
      {showTelemetry && (
        <div className="mo-modal-overlay" onClick={() => setShowTelemetry(false)}>
           <div className="mo-modal-content tactical" style={{ maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                    <HeartPulse size={24} className="animate-pulse" />
                  </div>
                  <div>
                    <h3 style={{ margin: 0 }}>Live Telemetry: {selectedPatient?.name}</h3>
                    <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.8rem' }}>Direct Vitals Stream • Ward {selectedPatient?.room}</p>
                  </div>
                </div>
                <button className="tactical-square-btn" onClick={() => setShowTelemetry(false)}><X size={20} /></button>
              </div>
              <div className="ecg-monitor"><div className="ecg-grid"></div><div className="ecg-wave"></div></div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '2rem' }}>
                {[
                  { label: 'Heart Rate', val: '72', unit: 'BPM', color: '#ef4444' },
                  { label: 'SPO2', val: '98', unit: '%', color: '#3b82f6' },
                  { label: 'Blood Pressure', val: '120/80', unit: 'mmHg', color: '#10b981' },
                  { label: 'Temp', val: '98.6', unit: '°F', color: '#f59e0b' }
                ].map((v, i) => (
                  <div key={i} style={{ background: 'var(--surface-light)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{v.label}</span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginTop: '5px' }}>
                      <h2 style={{ margin: 0, color: v.color, fontSize: '1.5rem' }}>{v.val}</h2>
                      <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>{v.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '12px' }}>
                <button className="mo-button-primary" style={{ flex: 1, background: '#ef4444', border: 'none' }}>Trigger Alert</button>
                <button className="mo-button-outline" style={{ flex: 1 }} onClick={() => setShowTelemetry(false)}>Close Stream</button>
              </div>
           </div>
        </div>
      )}

      {showMoreActions && selectedPatient && (
        <div className="mo-modal-overlay" onClick={() => setShowMoreActions(false)}>
          <div className="mo-modal-content tactical" style={{ maxWidth: '420px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div>
                <h3 style={{ margin: 0 }}>Patient Actions</h3>
                <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.82rem' }}>{selectedPatient.name} • {selectedPatient.id}</p>
              </div>
              <button className="tactical-square-btn" onClick={() => setShowMoreActions(false)}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '1.2rem' }}>
              <button style={{ justifyContent: 'flex-start', color: 'var(--text)', border: '1px solid var(--border)', background: 'var(--surface-light)', padding: '12px 16px', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleTransfer(selectedPatient)}>
                <RefreshCw size={18} color="#3b82f6" /> Transfer to Another Ward
              </button>
              <button style={{ justifyContent: 'flex-start', color: 'var(--text)', border: '1px solid var(--border)', background: 'var(--surface-light)', padding: '12px 16px', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleUpdateStatus(selectedPatient, selectedPatient.status === 'Critical' ? 'Observation' : 'Critical')}>
                <Zap size={18} color="#f59e0b" /> Toggle Critical Status
              </button>
              <button style={{ justifyContent: 'flex-start', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.05)', padding: '12px 16px', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer', fontWeight: 700 }} onClick={() => { setShowMoreActions(false); setShowEscalateModal(true); }}>
                <Zap size={18} /> Escalate to Physician
              </button>
              <button style={{ justifyContent: 'flex-start', color: 'var(--primary)', border: '1px solid var(--border)', background: 'var(--surface-light)', padding: '12px 16px', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer', fontWeight: 700 }} onClick={() => { setShowMoreActions(false); setShowDetails(true); }}>
                <FileText size={18} color="var(--primary)" /> View Clinical History
              </button>
              <button style={{ justifyContent: 'flex-start', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.05)', padding: '12px 16px', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleDischarge(selectedPatient)}>
                <LogOut size={18} /> Discharge Patient
              </button>
            </div>
          </div>
        </div>
      )}


      {isAdmitting && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(12px)', zIndex: 4000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div className="radar-animation" style={{ width: 140, height: 140, borderRadius: '50%', border: '2px solid var(--primary)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, var(--primary) 0%, transparent 20%)', animation: 'sweep 2s linear infinite' }}></div>
              <Zap size={40} color="var(--primary)" className="animate-pulse" />
           </div>
           <h2 style={{ letterSpacing: '4px', fontWeight: 900, color: 'var(--primary)' }}>ORCHESTRATING REGISTRATION...</h2>
        </div>
      )}

      {showDetails && (
        <div className="mo-modal-overlay" onClick={() => setShowDetails(false)}>
           <div className="mo-modal-content tactical" style={{ maxWidth: '650px' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                 <div style={{ width: 64, height: 64, borderRadius: '16px', background: 'rgba(14, 165, 233, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '1.5rem', fontWeight: 900 }}>{selectedPatient?.name[0]}</div>
                 <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}><h2 style={{ margin: 0 }}>{selectedPatient?.name}</h2><span className={`h-status-pill ${selectedPatient?.status.toLowerCase()}`}>{selectedPatient?.status}</span></div>
                    <p style={{ margin: '4px 0 0', color: 'var(--text-muted)' }}>ID: {selectedPatient?.id} • {selectedPatient?.age} Years • {selectedPatient?.disease}</p>
                 </div>
              </div>
              
              <div style={{ marginBottom: '2.5rem' }}>
                 <h4 style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '1rem', letterSpacing: '1px' }}>CLINICAL ACTION LOG (What Doctors Did)</h4>
                 <div style={{ background: 'var(--surface-light)', borderRadius: '20px', border: '1px solid var(--border)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {selectedPatient?.clinicalActions?.length > 0 ? (
                      selectedPatient.clinicalActions.map((act, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '15px', borderLeft: '2px solid var(--primary)', paddingLeft: '15px' }}>
                           <div style={{ minWidth: '70px', fontSize: '0.75rem', fontWeight: 900, color: 'var(--primary)' }}>{act.time}</div>
                           <div style={{ flex: 1 }}>
                              <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>{act.action}</p>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Attending: {act.dr}</span>
                           </div>
                        </div>
                      ))
                    ) : (
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>No clinical actions recorded for this cycle.</p>
                    )}
                 </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                 <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--border)' }}><span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1px' }}>ROOM ASSIGNMENT</span><h3 style={{ margin: '8px 0 0', fontSize: '1.4rem' }}>{selectedPatient?.room}</h3></div>
                 <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--border)' }}><span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1px' }}>PRIMARY DOCTOR</span><h3 style={{ margin: '8px 0 0', fontSize: '1.4rem' }}>{selectedPatient?.doctor}</h3></div>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                 <button className="mo-button-outline" style={{ flex: 1 }} onClick={() => setShowDetails(false)}>Close Record</button>
                 <button 
                    className="mo-button-primary" 
                    style={{ flex: 2, background: 'var(--primary)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} 
                    onClick={() => handleAssignBed(selectedPatient)}
                 >
                    Assign Bed <ChevronRight size={18} />
                 </button>
              </div>
           </div>
        </div>
      )}

      {showEscalateModal && (
        <div className="mo-modal-overlay" onClick={() => setShowEscalateModal(false)}>
           <div className="mo-modal-content tactical" style={{ maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                 <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <Zap size={24} />
                    </div>
                    <div>
                       <h3 style={{ margin: 0 }}>Clinical Escalation</h3>
                       <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Escalating {selectedPatient?.name} to {selectedPatient?.doctor}</p>
                    </div>
                 </div>
                 <button className="tactical-square-btn" onClick={() => setShowEscalateModal(false)}><X size={20} /></button>
              </div>
              <form onSubmit={handleEscalate}>
                 <div className="h-form-group">
                    <label>Escalation Reason & Notes</label>
                    <textarea 
                       required 
                       value={escalationNote}
                       onChange={(e) => setEscalationNote(e.target.value)}
                       placeholder="Detail the clinical symptoms or reason for urgent review..."
                       style={{ width: '100%', height: '120px', background: 'var(--surface-light)', border: "1px solid var(--border)", color: "var(--text)", padding: '12px', borderRadius: '12px', outline: 'none', resize: 'none' }}
                    />
                 </div>
                 <div className="h-form-group" style={{ marginTop: '1.5rem' }}>
                    <label>Urgency Level</label>
                    <select value={escalationPriority} onChange={(e) => setEscalationPriority(e.target.value)} style={{ width: '100%', background: 'var(--surface-light)', border: "1px solid var(--border)", color: "var(--text)", padding: '12px', borderRadius: '12px' }}>
                       <option value="Normal">Normal Review</option>
                       <option value="Medium">Urgent (Within 4hrs)</option>
                       <option value="High">Immediate Attention</option>
                       <option value="Critical">Emergency Protocol</option>
                    </select>
                 </div>
                 <div style={{ marginTop: '2.5rem', display: 'flex', gap: '12px' }}>
                    <button type="button" className="mo-button-outline" style={{ flex: 1 }} onClick={() => setShowEscalateModal(false)}>Cancel</button>
                    <button type="submit" className="mo-button-primary" style={{ flex: 2, background: '#f59e0b', border: 'none' }}>Confirm Escalation</button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {isMobilizing && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(12px)', zIndex: 3000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div className="radar-animation" style={{ width: 160, height: 160, borderRadius: '50%', border: `2px solid ${selectedPatient?.status === 'Critical' ? '#f43f5e' : 'var(--primary)'}`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `conic-gradient(from 0deg, ${selectedPatient?.status === 'Critical' ? '#f43f5e' : 'var(--primary)'} 0%, transparent 20%)`, animation: 'sweep 2s linear infinite' }}></div>
              <Activity size={48} color={selectedPatient?.status === 'Critical' ? '#f43f5e' : 'var(--primary)'} />
           </div>
           <h2 style={{ letterSpacing: '4px', fontWeight: 900, color: selectedPatient?.status === 'Critical' ? '#f43f5e' : 'var(--primary)' }}>ORCHESTRATING...</h2>
        </div>
      )}

      {isExporting && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.96)', backdropFilter: 'blur(16px)', zIndex: 5000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ position: 'relative', width: '200px', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden', marginBottom: '1.5rem' }}>
              <div className="export-progress" style={{ position: 'absolute', inset: 0, background: 'var(--primary)', width: '40%', animation: 'progressMove 2s infinite ease-in-out' }}></div>
           </div>
           <h2 style={{ letterSpacing: '4px', fontWeight: 900, color: "var(--text)", margin: 0 }}>GENERATING CLINICAL PDF...</h2>
           <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontWeight: 800 }}>COMPILING DATA FOR {filteredPatients.length} PATIENTS • SECURING HASH</p>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="h-toast animate-slide-up" style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: 'var(--surface)', border: '1px solid var(--primary)', padding: '1rem 1.5rem', borderRadius: '20px', display: 'flex', gap: '1rem', alignItems: 'center', zIndex: 9000, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', maxWidth: '400px' }}>
          <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {toast.icon}
          </div>
          <div>
            <h4 style={{ margin: 0, color: "var(--text)", fontSize: '0.9rem' }}>{toast.title}</h4>
            <p style={{ margin: '2px 0 0', color: 'var(--text-muted)', fontSize: '0.8rem' }}>{toast.message}</p>
          </div>
          <button onClick={() => setToast(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginLeft: '1rem' }}>
            <X size={16} />
          </button>
        </div>
      )}

      <style>{`
        .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes progressMove {
          0% { transform: translateX(-100%); width: 20%; }
          50% { width: 50%; }
          100% { transform: translateX(200%); width: 20%; }
        }
      `}</style>
    </div>
  );
};

export default HospitalPatients;

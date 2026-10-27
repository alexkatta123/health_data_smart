import React, { useState } from 'react';
import { 
  TestTube, Upload, Download, Search, 
  Filter, Eye, FileText, CheckCircle2,
  Clock, AlertCircle, ChevronRight, User,
  Plus, Edit2
} from 'lucide-react';

const HospitalLabs = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isAssemblingPDF, setIsAssemblingPDF] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const [labReports, setLabReports] = useState([
    { id: 'LAB-4021', patient: 'Ramesh Kumar', test: 'Complete Blood Count', date: '2026-04-24', status: 'Ready', priority: 'Normal', facility: 'Mangalagiri PHC' },
    { id: 'LAB-4022', patient: 'Sita Devi', test: 'Lipid Profile', date: '2026-04-24', status: 'Processing', priority: 'High', facility: 'Tenali CHC' },
    { id: 'LAB-4023', patient: 'Venkat Rao', test: 'HbA1c', date: '2026-04-23', status: 'Ready', priority: 'Normal', facility: 'Guntur Urban PHC' },
    { id: 'LAB-4024', patient: 'Anil Gupta', test: 'COVID-19 RT-PCR', date: '2026-04-24', status: 'Awaiting Sample', priority: 'Critical', facility: 'Mangalagiri PHC' },
    { id: 'LAB-4025', patient: 'Priya Verma', test: 'Liver Function Test', date: '2026-04-22', status: 'Ready', priority: 'Normal', facility: 'Amaravati PHC' },
  ]);
  const [newReport, setNewReport] = useState({ patient: '', test: 'Complete Blood Count (CBC)', priority: 'Normal', remarks: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [facilityFilter, setFacilityFilter] = useState('All');

  const filteredReports = labReports.filter(r => {
    const matchStatus = statusFilter === 'All' || 
                       (statusFilter === 'Pending' && (r.status === 'Processing' || r.status === 'Awaiting Sample')) ||
                       (statusFilter === 'Critical' && r.priority === 'Critical');
    const matchFacility = facilityFilter === 'All' || r.facility === facilityFilter;
    return matchStatus && matchFacility;
  });

  const handleAddReport = () => {
    if (isEditing) {
      setLabReports(prev => prev.map(r => r.id === editingId ? { ...r, ...newReport, test: newReport.test.split(' (')[0] } : r));
    } else {
      const report = {
        ...newReport,
        id: `LAB-${Math.floor(4000 + Math.random() * 1000)}`,
        test: newReport.test.split(' (')[0],
        date: new Date().toISOString().split('T')[0],
        status: 'Awaiting Sample'
      };
      setLabReports([report, ...labReports]);
    }
    closeRegisterModal();
  };

  const handleDeleteReport = (id) => {
    if (window.confirm('Strike diagnostic record from statewide registry?')) {
      setLabReports(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleEditReport = (report) => {
    setNewReport({
      patient: report.patient,
      test: report.test,
      priority: report.priority,
      remarks: report.remarks || ''
    });
    setEditingId(report.id);
    setIsEditing(true);
    setShowRegister(true);
  };

  const closeRegisterModal = () => {
    setShowRegister(false);
    setIsEditing(false);
    setEditingId(null);
    setNewReport({ patient: '', test: 'Complete Blood Count (CBC)', priority: 'Normal', remarks: '' });
  };

  return (
    <div className="hospital-labs animate-fade">
      {/* Hidden Print Template */}
      <div className="print-report-only">
         <div style={{ textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '20px', marginBottom: '30px' }}>
            <h1 style={{ margin: 0 }}>GOVERNMENT OF ANDHRA PRADESH</h1>
            <h2 style={{ margin: '5px 0' }}>DEPARTMENT OF HEALTH & FAMILY WELFARE</h2>
            <h3 style={{ margin: 0 }}>OFFICIAL DIAGNOSTIC REPORT - {selectedReport?.facility || 'DISTRICT CENTRAL LAB'}</h3>
         </div>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
            <div>
               <p><strong>REPORT ID:</strong> {selectedReport?.id}</p>
               <p><strong>PATIENT NAME:</strong> {selectedReport?.patient}</p>
               <p><strong>GENDER/AGE:</strong> Not Specified</p>
            </div>
            <div style={{ textAlign: 'right' }}>
               <p><strong>DATE GENERATED:</strong> {new Date().toLocaleDateString()}</p>
               <p><strong>DIAGNOSTIC TEST:</strong> {selectedReport?.test}</p>
               <p><strong>STATUS:</strong> OFFICIAL RELEASE</p>
            </div>
         </div>
         <div style={{ border: '1px solid black', padding: '20px', minHeight: '300px' }}>
            <h4>CLINICAL OBSERVATIONS</h4>
            <p style={{ lineHeight: 1.8 }}>{selectedReport?.remarks || 'Screening complete. All parameters verified against statewide clinical benchmarks. No immediate anomalies detected. Clinical follow-up as per standard protocol.'}</p>
            <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px dashed #ccc' }}>
               <p><strong>INTERPRETATION:</strong> {selectedReport?.test} results are within the normal physiological range for the patient's demographic profile.</p>
            </div>
         </div>
         <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ textAlign: 'center' }}>
               <div style={{ height: '60px' }}></div>
               <p style={{ borderTop: '1px solid black', paddingTop: '5px' }}>Lab In-Charge Signature</p>
            </div>
            <div style={{ textAlign: 'center' }}>
               <div style={{ height: '60px', color: '#ccc', fontSize: '0.7rem' }}>[SECURE QR CODE STAMP]</div>
               <p style={{ borderTop: '1px solid black', paddingTop: '5px' }}>Authorized Digital Seal</p>
            </div>
         </div>
      </div>

      <div className="page-header-h">
        <div className="title-area-h">
          <h2>Diagnostic Lab Reports</h2>
          <p>Monitor lab test status, upload results, and manage patient diagnostics.</p>
        </div>
        <div className="header-btns-h" style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
          <button 
            className="tactical-header-btn" 
            onClick={() => setShowRegister(true)}
            style={{ background: 'white', color: 'black', border: 'none', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 800, fontSize: '0.85rem' }}
          >
            <FileText size={18} /> Lab Register
          </button>
          <button 
            className="tactical-header-btn" 
            onClick={() => setShowUpload(true)}
            style={{ background: 'transparent', color: "var(--text)", border: 'none', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '1px solid var(--border)', cursor: 'pointer', fontWeight: 800, fontSize: '0.85rem' }}
          >
            <Upload size={18} /> Upload Results
          </button>
          <button 
            className="tactical-header-btn" 
            onClick={() => {
              setIsAssemblingPDF(true);
              setTimeout(() => setIsAssemblingPDF(false), 4000);
            }}
            style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: 'none', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '1px solid var(--border)', cursor: 'pointer', fontWeight: 800, fontSize: '0.85rem' }}
          >
            <FileText size={18} /> Generate District Dossier (PDF)
          </button>
        </div>
      </div>

      {/* Lab Register Modal */}
      {showRegister && (
        <div className="mo-modal-overlay" onClick={closeRegisterModal}>
           <div className="mo-modal-content tactical" onClick={e => e.stopPropagation()}>
              <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                 <div>
                    <h3>{isEditing ? 'Modify Diagnostic Directive' : 'New Diagnostic Registration'}</h3>
                    <p>Enroll patient samples into the statewide laboratory network.</p>
                 </div>
                 <button onClick={closeRegisterModal} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <Plus style={{ transform: 'rotate(45deg)' }} />
                 </button>
              </div>
              <div className="modal-form" style={{ marginTop: '2rem' }}>
                 <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label>PATIENT SEARCH / ID</label>
                    <input 
                       type="text" 
                       value={newReport.patient}
                       onChange={e => setNewReport({...newReport, patient: e.target.value})}
                       placeholder="Enter Patient ID or Name..." 
                       style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: "var(--text)", padding: '10px', borderRadius: '8px', width: '100%', outline: 'none' }} 
                    />
                 </div>
                 <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="form-group">
                       <label>TEST TYPE</label>
                       <select 
                          value={newReport.test}
                          onChange={e => setNewReport({...newReport, test: e.target.value})}
                          style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: "var(--text)", padding: '10px', borderRadius: '8px', width: '100%', outline: 'none' }}
                       >
                          <option>Complete Blood Count (CBC)</option>
                          <option>RT-PCR (Viral)</option>
                          <option>HbA1c</option>
                          <option>Lipid Profile</option>
                          <option>Liver Function Test</option>
                       </select>
                    </div>
                    <div className="form-group">
                       <label>PRIORITY LEVEL</label>
                       <select 
                          value={newReport.priority}
                          onChange={e => setNewReport({...newReport, priority: e.target.value})}
                          style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: "var(--text)", padding: '10px', borderRadius: '8px', width: '100%', outline: 'none' }}
                       >
                          <option>Normal</option>
                          <option>High</option>
                          <option>Critical</option>
                       </select>
                    </div>
                 </div>
                 <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label>SAMPLE COLLECTION REMARKS</label>
                    <textarea 
                       value={newReport.remarks}
                       onChange={e => setNewReport({...newReport, remarks: e.target.value})}
                       placeholder="Optional clinical notes..." 
                       style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: "var(--text)", padding: '10px', borderRadius: '8px', width: '100%', outline: 'none', minHeight: '100px' }}
                    ></textarea>
                 </div>
                 <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="mo-button-outline" style={{ flex: 1 }} onClick={closeRegisterModal}>Back to Table</button>
                    <button className="mo-button-primary" style={{ flex: 2, background: 'var(--primary)', border: 'none' }} onClick={handleAddReport}>
                       {isEditing ? 'Commit Changes' : 'Finalize Registration'}
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Upload Results Modal */}
      {showUpload && (
        <div className="mo-modal-overlay" onClick={() => setShowUpload(false)}>
           <div className="mo-modal-content tactical" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                 <h3>Digitize Laboratory Results</h3>
                 <p>Upload and validate diagnostic findings for patient EMR integration.</p>
              </div>
              <div className="upload-area" style={{ marginTop: '2rem', border: '2px dashed var(--border)', borderRadius: '20px', padding: '3rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
                 <div style={{ background: 'rgba(14, 165, 233, 0.1)', width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--primary)' }}>
                    <Upload size={32} />
                 </div>
                 <h4 style={{ margin: '0 0 8px' }}>Drag & Drop Lab Results</h4>
                 <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Supported formats: PDF, JPEG (OCR Enabled)</p>
                 <button className="mo-button-outline" style={{ marginTop: '1.5rem' }}>Browse Local Files</button>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '2rem' }}>
                 <button className="mo-button-outline" style={{ flex: 1 }} onClick={() => setShowUpload(false)}>Cancel</button>
                 <button className="mo-button-primary" style={{ flex: 2 }} onClick={() => setShowUpload(false)}>Initiate AI Validation & Upload</button>
              </div>
           </div>
        </div>
      )}

      {/* Report Intelligence Modal */}
      {showReportModal && (
        <div className="mo-modal-overlay" onClick={() => setShowReportModal(false)}>
           <div className="mo-modal-content tactical" style={{ maxWidth: '800px' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                 <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '16px', background: 'rgba(14, 165, 233, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                       <TestTube size={32} />
                    </div>
                    <div>
                       <h2 style={{ margin: 0 }}>Diagnostic Intelligence: {selectedReport?.id}</h2>
                       <p style={{ margin: '4px 0 0', color: 'var(--text-muted)' }}>Target: {selectedReport?.patient} • {selectedReport?.test}</p>
                    </div>
                 </div>
                 <span className={`prio-tag ${selectedReport?.priority.toLowerCase()}`} style={{ fontSize: '0.8rem', padding: '6px 16px' }}>
                    {selectedReport?.priority} PRIORITY
                 </span>
              </div>

              <div style={{ background: 'var(--bg)', borderRadius: '24px', padding: '2rem', border: '1px solid var(--border)', marginBottom: '2.5rem' }}>
                 <div style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: '2rem' }}>
                    <div>
                       <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1px' }}>CLINICAL FINDING (SIMULATED)</span>
                       <p style={{ margin: '8px 0 0', fontWeight: 700 }}>{selectedReport?.test === 'HbA1c' ? 'HbA1c Level: 5.7%' : 'Hemoglobin: 14.2 g/dL'}</p>
                       <p style={{ margin: '4px 0 0', color: '#10b981', fontSize: '0.75rem', fontWeight: 800 }}>✓ WITHIN NORMAL RANGE</p>
                    </div>
                    <div>
                       <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1px' }}>DIAGNOSTIC REMARKS</span>
                       <p style={{ margin: '8px 0 0', fontWeight: 700, color: 'var(--text)' }}>{selectedReport?.remarks || 'No specific clinical anomalies detected during screening. Patient demonstrates normal physiological response.'}</p>
                    </div>
                 </div>
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                 <button className="mo-button-outline" style={{ flex: 1 }} onClick={() => setShowReportModal(false)}>Close Intelligence View</button>
                 <button 
                    className="mo-button-outline" 
                    style={{ flex: 1, color: '#3b82f6', borderColor: '#3b82f6' }} 
                    onClick={() => {
                       setShowReportModal(false);
                       handleEditReport(selectedReport);
                    }}
                 >
                    <Edit2 size={16} style={{ marginRight: '8px' }} /> Update Record
                 </button>
                 <button 
                    className="mo-button-outline" 
                    style={{ flex: 1, color: 'var(--danger)', borderColor: 'var(--danger)' }} 
                    onClick={() => {
                       setShowReportModal(false);
                       handleDeleteReport(selectedReport.id);
                    }}
                 >
                    Strike Record
                 </button>
                 <button 
                    className="mo-button-primary" 
                    style={{ flex: 2, background: 'var(--primary)', border: 'none' }}
                    disabled={selectedReport?.status !== 'Ready'}
                    onClick={() => {
                       setShowReportModal(false);
                       setIsSynthesizing(true);
                       setTimeout(() => {
                          setIsSynthesizing(false);
                          setLabReports(prev => prev.map(item => item.id === selectedReport.id ? { ...item, status: 'Released' } : item));
                          setTimeout(() => window.print(), 100);
                       }, 3500);
                    }}
                 >
                    RELEASE & AUTHORIZE FINDINGS
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* PDF Assembly Overlay */}
      {isAssemblingPDF && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(12px)', zIndex: 4000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div className="pdf-assembler" style={{ width: 120, height: 160, background: 'white', borderRadius: '12px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '15px' }}>
              <div style={{ height: 10, width: '60%', background: '#e2e8f0', marginBottom: '8px', borderRadius: '2px' }}></div>
              <div style={{ height: 6, width: '100%', background: '#f1f5f9', marginBottom: '6px', borderRadius: '1px' }}></div>
              <div style={{ height: 6, width: '80%', background: '#f1f5f9', marginBottom: '6px', borderRadius: '1px' }}></div>
              <div style={{ height: 6, width: '90%', background: '#f1f5f9', marginBottom: '15px', borderRadius: '1px' }}></div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', marginBottom: '10px' }}>
                 <div style={{ height: 20, background: '#f8fafc', borderRadius: '4px' }}></div>
                 <div style={{ height: 20, background: '#f8fafc', borderRadius: '4px' }}></div>
              </div>
              
              <div className="pdf-scan-line" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: '#10b981', boxShadow: '0 0 15px #10b981', animation: 'scan 2s linear infinite' }}></div>
           </div>
           <h2 style={{ letterSpacing: '4px', fontWeight: 900, color: '#10b981', marginTop: '2.5rem' }}>ASSEMBLING GOVERNMENT DOSSIER...</h2>
           <p style={{ marginTop: '1rem', color: 'var(--text)', fontWeight: 800, textAlign: 'center' }}>
              Merging {filteredReports.length} Clinical Records for {facilityFilter === 'All' ? 'Guntur District' : facilityFilter}<br/>
              Applying Statewide Secure Cryptographic Signature
           </p>
        </div>
      )}

      {/* Diagnostic Synthesis Overlay */}
      {isSynthesizing && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', zIndex: 3000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div className="radar-animation" style={{ width: 160, height: 160, borderRadius: '50%', border: '2px solid var(--primary)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, var(--primary) 0%, transparent 20%)', animation: 'sweep 2s linear infinite' }}></div>
              <FileText size={48} color="var(--primary)" />
           </div>
           <h2 style={{ letterSpacing: '4px', fontWeight: 900, color: 'var(--primary)' }}>SYNTHESIZING DIAGNOSTIC DATA...</h2>
           <p style={{ marginTop: '1rem', color: 'var(--text)', fontWeight: 800 }}>AUTHORIZING: {selectedReport?.id} • PATIENT: {selectedReport?.patient}</p>
        </div>
      )}

      {/* Lab Stats */}
      <div className="lab-stats-grid">
         <div className="l-stat-card">
            <CheckCircle2 size={24} className="text-success" />
            <div className="l-stat-info">
               <h3>24</h3>
               <span>Reports Ready</span>
            </div>
         </div>
         <div className="l-stat-card">
            <Clock size={24} className="text-primary" />
            <div className="l-stat-info">
               <h3>08</h3>
               <span>Processing</span>
            </div>
         </div>
         <div className="l-stat-card">
            <AlertCircle size={24} className="text-danger" />
            <div className="l-stat-info">
               <h3>03</h3>
               <span>Critical Results</span>
            </div>
         </div>
      </div>

       {/* Reports Table */}
       <div className="h-table-card">
          <div className="inv-header" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div className="inv-search" style={{ flex: 1, minWidth: '300px' }}>
               <Search size={18} />
               <input type="text" placeholder="Search by patient or test name..." />
            </div>
            
            <div className="facility-pivot" style={{ background: 'var(--bg)', padding: '8px 15px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
               <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>DISTRICT FACILITY</span>
               <select 
                  value={facilityFilter}
                  onChange={e => setFacilityFilter(e.target.value)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text)', outline: 'none', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
               >
                  <option value="All">All PHCs/CHCs</option>
                  <option>Guntur Urban PHC</option>
                  <option>Mangalagiri PHC</option>
                  <option>Tenali CHC</option>
                  <option>Amaravati PHC</option>
                  <option>Ponnur PHC</option>
                  <option>Bapatla CHC</option>
                  <option>Repalle PHC</option>
               </select>
            </div>

            <div className="inv-filters">
               <button className={`f-btn ${statusFilter === 'All' ? 'active' : ''}`} onClick={() => setStatusFilter('All')}>All Reports</button>
               <button className={`f-btn ${statusFilter === 'Pending' ? 'active' : ''}`} onClick={() => setStatusFilter('Pending')}>Pending</button>
               <button className={`f-btn ${statusFilter === 'Critical' ? 'active' : ''}`} onClick={() => setStatusFilter('Critical')}>Critical</button>
            </div>
         </div>

         <div className="inv-table-wrapper">
           <table className="h-table">
             <thead>
               <tr>
                 <th>Report ID</th>
                 <th>Patient Name</th>
                 <th>Test Type</th>
                 <th>Date Received</th>
                 <th>Priority</th>
                 <th>Status</th>
                 <th style={{ textAlign: 'center' }}>Actions</th>
               </tr>
             </thead>
             <tbody>
               {filteredReports.map((r, i) => (
                <tr key={i}>
                  <td><span className="h-id-tag">{r.id}</span></td>
                  <td>
                    <div className="h-patient-cell">
                      <User size={16} className="text-muted" />
                      <strong>{r.patient}</strong>
                    </div>
                  </td>
                  <td>{r.test}</td>
                  <td>{r.date}</td>
                  <td>
                    <span className={`prio-tag ${r.priority.toLowerCase()}`}>
                      {r.priority}
                    </span>
                  </td>
                  <td>
                    <div className="status-flex">
                      {r.status === 'Ready' ? <CheckCircle2 size={14} className="text-success" /> : 
                       r.status === 'Processing' ? <Clock size={14} className="text-primary" /> :
                       <AlertCircle size={14} className="text-muted" />}
                      <span>{r.status}</span>
                    </div>
                  </td>
                  <td>
                    <div className="tactical-action-formation" style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                      <button 
                         className="tactical-square-btn" 
                         title="View Detailed Report"
                         onClick={() => {
                            setSelectedReport(r);
                            setShowReportModal(true);
                         }}
                      >
                         <Eye size={18} />
                      </button>
                      <button 
                         className="tactical-square-btn" 
                         title="Edit Diagnostic Directive"
                         onClick={() => handleEditReport(r)}
                      >
                         <Edit2 size={16} />
                      </button>
                      <button 
                         className="tactical-square-btn" 
                         disabled={r.status !== 'Ready'} 
                         title={r.status === 'Ready' ? 'Release & Authorize' : 'Result Pending'}
                         style={{ color: r.status === 'Ready' ? 'var(--primary)' : 'rgba(0,0,0,0.1)' }}
                         onClick={() => {
                            setSelectedReport(r);
                            setIsSynthesizing(true);
                            setTimeout(() => {
                               setIsSynthesizing(false);
                               setLabReports(prev => prev.map(item => item.id === r.id ? { ...item, status: 'Released' } : item));
                               
                               // Small delay to ensure synthesis overlay is fully unmounted before printing
                               setTimeout(() => {
                                  window.print();
                               }, 100);
                            }, 3500);
                         }}
                      >
                         <Download size={18} />
                      </button>
                      <button 
                         className="tactical-square-btn" 
                         title="Delete Record"
                         style={{ color: 'var(--danger)' }}
                         onClick={() => handleDeleteReport(r.id)}
                      >
                         &times;
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .hospital-labs { display: flex; flex-direction: column; gap: 2rem; }

        .lab-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .l-stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 1.5rem; display: flex; align-items: center; gap: 15px; }
        .l-stat-info h3 { margin: 0; font-size: 1.4rem; font-weight: 900; }
        .l-stat-info span { font-size: 0.75rem; color: var(--text-muted); font-weight: 800; text-transform: uppercase; }

        .h-table-card { background: var(--surface); border: 1px solid var(--border); border-radius: 28px; overflow: hidden; }
        .inv-header { padding: 1.5rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
        .inv-search { display: flex; align-items: center; gap: 10px; background: var(--bg); padding: 10px 15px; border-radius: 12px; border: 1px solid var(--border); width: 350px; }
        .inv-search input { background: transparent; border: none; color: var(--text); outline: none; width: 100%; font-size: 0.9rem; }
        
        .inv-filters { display: flex; gap: 8px; }
        .f-btn { padding: 6px 14px; border-radius: 8px; border: 1px solid var(--border); background: transparent; color: var(--text-muted); font-size: 0.75rem; font-weight: 700; cursor: pointer; }
        .f-btn.active { background: var(--surface-light); color: var(--text); border-color: var(--primary); }

        .prio-tag { font-size: 0.7rem; font-weight: 900; text-transform: uppercase; padding: 2px 8px; border-radius: 4px; }
        .prio-tag.normal { background: var(--surface-light); color: var(--text-muted); }
        .prio-tag.high { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .prio-tag.critical { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

        .status-flex { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 700; }

        .tactical-square-btn { 
          width: 44px; 
          height: 44px; 
          background: var(--surface); 
          color: var(--text-muted); 
          border: 1px solid rgba(255,255,255,0.1); 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          cursor: pointer; 
          transition: all 0.2s;
          border-radius: 8px;
        }

        .tactical-square-btn:hover:not(:disabled) {
          background: #334155;
          color: var(--text);
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }

        .tactical-square-btn:disabled { 
          background: var(--surface); 
          color: rgba(255,255,255,0.15); 
          border-color: rgba(255,255,255,0.05);
          cursor: not-allowed; 
        }

        .pdf-assembler { box-shadow: 0 0 50px rgba(16, 185, 129, 0.2); border: 2px solid #e2e8f0; }
        @keyframes scan {
           0% { top: 0; }
           100% { top: 100%; }
        }

        .mo-modal-overlay {
           position: fixed;
           inset: 0;
           background: rgba(15, 23, 42, 0.7);
           backdrop-filter: blur(8px);
           z-index: 5000;
           display: flex;
           align-items: center;
           justify-content: center;
           padding: 2rem;
           animation: fadeIn 0.3s ease-out;
        }
        .mo-modal-content.tactical {
           background: var(--surface);
           border: 1px solid var(--border);
           border-radius: 32px;
           width: 100%;
           max-width: 600px;
           padding: 2.5rem;
           position: relative;
           box-shadow: 0 30px 60px rgba(0,0,0,0.4);
           animation: slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        
        .modal-header h3 { margin: 0; font-size: 1.5rem; font-weight: 900; }
        .modal-header p { margin: 5px 0 0; font-size: 0.85rem; color: var(--text-muted); font-weight: 700; }
        
        .form-group label { display: block; font-size: 0.65rem; font-weight: 900; color: var(--text-muted); letter-spacing: 1px; margin-bottom: 8px; }
        
        .mo-button-outline { 
           padding: 12px 24px; 
           border-radius: 12px; 
           border: 1px solid var(--border); 
           background: transparent; 
           color: var(--text); 
           font-weight: 800; 
           cursor: pointer; 
           transition: 0.3s; 
        }
        .mo-button-outline:hover { background: var(--bg); }
        
        .mo-button-primary { 
           padding: 12px 24px; 
           border-radius: 12px; 
           border: none; 
           background: var(--primary); 
           color: white; 
           font-weight: 800; 
           cursor: pointer; 
           transition: 0.3s; 
           box-shadow: 0 10px 20px var(--primary-glow);
        }
        .mo-button-primary:hover { transform: translateY(-2px); box-shadow: 0 15px 30px var(--primary-glow); }

        /* Print Logic */
        .print-report-only { display: none; }
        @media print {
           body * { visibility: hidden; }
           .print-report-only, .print-report-only * { visibility: visible; }
           .print-report-only { 
              display: block !important; 
              position: absolute; 
              left: 0; 
              top: 0; 
              width: 100%; 
              padding: 40px;
              background: white !important;
              color: black !important;
           }
        }
      `}</style>
    </div>
  );
};

export default HospitalLabs;

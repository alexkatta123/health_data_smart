import React from 'react';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  MapPin, 
  Phone, 
  Activity, 
  Thermometer, 
  Droplets,
  Heart,
  Clipboard,
  Stethoscope, 
  Pill, 
  FileText,
  ShieldCheck,
  Brain,
  Download,
  Printer,
  X,
  Check
} from 'lucide-react';
import { useState, useMemo } from 'react';

const PatientEMR = ({ patientId, onBack }) => {
  // Use state for patient data to allow updates
  const [patientData, setPatientData] = useState({
    id: patientId || 'PAT-004',
    name: 'Lakshmi Devi',
    age: 28,
    gender: 'Female',
    bloodGroup: 'B+',
    district: 'Chittoor',
    phone: '+91 98480 12345',
    address: '12-34/A, Gandhi Road, Tirupati, Chittoor Dist.',
    condition: 'Dengue Hemorrhagic Fever',
    vitals: { temp: '102.4°F', bp: '110/70', heartRate: '98 bpm', spO2: '94%' },
    history: [
      { date: '2026-04-22', event: 'Emergency Admission', notes: 'High grade fever with severe body pains and petechiae.' },
      { date: '2026-04-22', event: 'Lab Report (CBC)', notes: 'Platelet count: 45,000/mcL. Critical alert.' },
      { date: '2026-04-21', event: 'Primary Health Visit', notes: 'Initial symptoms reported. Prescribed Paracetamol.' },
    ],
    medications: [
      { id: 1, name: 'IV Fluids (RL)', dose: '100ml/hr', frequency: 'Continuous', status: 'Active' },
      { id: 2, name: 'Paracetamol', dose: '650mg', frequency: 'SOS', status: 'Active' },
    ],
    labReports: [
      { id: 1, test: 'CBC (Complete Blood Count)', date: '2026-04-22', result: 'Platelets: 45,000/mcL', status: 'Critical' },
      { id: 2, test: 'NS1 Antigen', date: '2026-04-21', result: 'Positive', status: 'Positive' },
      { id: 3, test: 'IgM Antibody', date: '2026-04-21', result: 'Reactive', status: 'Positive' },
    ],
    geoSurveillance: [
      { id: 1, location: 'Primary Residence (Tirupati)', type: 'Infection Origin', coordinates: '13.6288° N, 79.4192° E' },
      { id: 2, location: 'GGH Tirupati', type: 'Current Quarantine', coordinates: '13.6373° N, 79.4042° E' },
    ],
    aiInsights: {
      classification: 'ICD-10 A91 (Dengue hemorrhagic fever)',
      confidence: '96.4%',
      riskAnalysis: 'High risk of shock. Immediate hospitalization required.'
    }
  });

  const [activeTab, setActiveTab] = useState('Clinical History');

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isMedModalOpen, setIsMedModalOpen] = useState(false);
  const [isLabModalOpen, setIsLabModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    condition: patientData.condition,
    temp: patientData.vitals.temp,
    bp: patientData.vitals.bp,
    heartRate: patientData.vitals.heartRate,
    spO2: patientData.vitals.spO2
  });

  const [medForm, setMedForm] = useState({ name: '', dose: '', frequency: '' });
  const [labForm, setLabForm] = useState({ test: '', result: '', status: 'Stable' });

  const handleExportSummary = () => {
    const sheetContent = `
SURVAP CLINICAL INTELLIGENCE - PATIENT SUMMARY SHEET
Generated: ${new Date().toLocaleString()}
--------------------------------------------------

PATIENT IDENTITY:
ID: ${patient.id}
Name: ${patient.name}
Demographics: ${patient.age} Yrs, ${patient.gender}
Blood Group: ${patient.bloodGroup}
District: ${patient.district}
Phone: ${patient.phone}

CURRENT CLINICAL STATUS:
Diagnosis: ${patient.condition}
Vitals:
 - Temp: ${patient.vitals.temp}
 - BP: ${patient.vitals.bp}
 - Heart Rate: ${patient.vitals.heartRate}
 - SpO2: ${patient.vitals.spO2}

AI CLINICAL INSIGHTS:
Classification: ${patient.aiInsights.classification}
Confidence: ${patient.aiInsights.confidence}
Risk Analysis: ${patient.aiInsights.riskAnalysis}

CLINICAL HISTORY:
${patient.history.map(h => `[${h.date}] ${h.event}: ${h.notes}`).join('\n')}

CURRENT MEDICATIONS:
${patient.medications.map(m => `- ${m.name} (${m.dose}, ${m.frequency})`).join('\n')}

--------------------------------------------------
CONFIDENTIAL: Authorized Medical Personnel Only
Government of Andhra Pradesh | Health Intelligence Platform
    `;

    const blob = new Blob([sheetContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `SurvAP_Patient_Sheet_${patient.id}.txt`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpdateRecord = (e) => {
    e.preventDefault();
    setPatientData(prev => ({
      ...prev,
      condition: formData.condition,
      vitals: {
        temp: formData.temp,
        bp: formData.bp,
        heartRate: formData.heartRate,
        spO2: formData.spO2
      },
      history: [
        { date: new Date().toISOString().split('T')[0], event: 'Clinical Record Updated', notes: `Condition: ${formData.condition}. Vitals adjusted by clinical staff.` },
        ...prev.history
      ]
    }));
    setIsUpdateModalOpen(false);
  };

  const handleAddMedication = (e) => {
    e.preventDefault();
    if (!medForm.name) return;
    const newMed = {
      id: Date.now(),
      ...medForm,
      status: 'Active'
    };
    setPatientData(prev => ({
      ...prev,
      medications: [newMed, ...prev.medications],
      history: [
        { date: new Date().toISOString().split('T')[0], event: 'Medication Added', notes: `Prescribed ${medForm.name} (${medForm.dose}).` },
        ...prev.history
      ]
    }));
    setMedForm({ name: '', dose: '', frequency: '' });
    setIsMedModalOpen(false);
  };

  const handleAddLabReport = (e) => {
    e.preventDefault();
    if (!labForm.test) return;
    const newReport = {
      id: Date.now(),
      ...labForm,
      date: new Date().toISOString().split('T')[0]
    };
    setPatientData(prev => ({
      ...prev,
      labReports: [newReport, ...prev.labReports],
      history: [
        { date: new Date().toISOString().split('T')[0], event: 'Lab Report Added', notes: `New results for ${labForm.test}: ${labForm.result}. Status: ${labForm.status}.` },
        ...prev.history
      ]
    }));
    setLabForm({ test: '', result: '', status: 'Stable' });
    setIsLabModalOpen(false);
  };

  return (
    <div className="emr-page animate-fade">
      <header className="emr-header">
        <div className="header-left">
          <button className="back-btn" onClick={onBack}><ArrowLeft size={20} /></button>
          <div className="title-group">
            <div className="emr-badge">Electronic Medical Record</div>
            <h1>{patientData.name} <span className="id-tag">{patientData.id}</span></h1>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={handleExportSummary}><Download size={18} /> Export</button>
          <button className="btn-secondary"><Printer size={18} /> Print</button>
          <button className="btn-primary" onClick={() => setIsUpdateModalOpen(true)}>Update Record</button>
        </div>
      </header>

      {isUpdateModalOpen && (
        <div className="update-modal-overlay">
          <div className="update-modal glass">
            <div className="modal-header">
              <h3><Activity size={20} color="var(--primary)" /> Update Clinical Record</h3>
              <button className="close-modal" onClick={() => setIsUpdateModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleUpdateRecord}>
              <div className="form-group">
                <label>Current Condition</label>
                <input 
                  type="text" 
                  value={formData.condition} 
                  onChange={(e) => setFormData({...formData, condition: e.target.value})} 
                />
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Temperature</label>
                  <input 
                    type="text" 
                    value={formData.temp} 
                    onChange={(e) => setFormData({...formData, temp: e.target.value})} 
                  />
                </div>
                <div className="form-group">
                  <label>Blood Pressure</label>
                  <input 
                    type="text" 
                    value={formData.bp} 
                    onChange={(e) => setFormData({...formData, bp: e.target.value})} 
                  />
                </div>
                <div className="form-group">
                  <label>Heart Rate</label>
                  <input 
                    type="text" 
                    value={formData.heartRate} 
                    onChange={(e) => setFormData({...formData, heartRate: e.target.value})} 
                  />
                </div>
                <div className="form-group">
                  <label>SpO2 Levels</label>
                  <input 
                    type="text" 
                    value={formData.spO2} 
                    onChange={(e) => setFormData({...formData, spO2: e.target.value})} 
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsUpdateModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-save">Save Changes <Check size={16} /></button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isMedModalOpen && (
        <div className="update-modal-overlay">
          <div className="update-modal glass">
            <div className="modal-header">
              <h3><Pill size={20} color="var(--primary)" /> Add Medication</h3>
              <button className="close-modal" onClick={() => setIsMedModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddMedication}>
              <div className="form-group">
                <label>Drug Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., Paracetamol"
                  value={medForm.name} 
                  onChange={(e) => setMedForm({...medForm, name: e.target.value})} 
                />
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Dosage</label>
                  <input 
                    type="text" 
                    placeholder="e.g., 650mg"
                    value={medForm.dose} 
                    onChange={(e) => setMedForm({...medForm, dose: e.target.value})} 
                  />
                </div>
                <div className="form-group">
                  <label>Frequency</label>
                  <input 
                    type="text" 
                    placeholder="e.g., TID (3 times a day)"
                    value={medForm.frequency} 
                    onChange={(e) => setMedForm({...medForm, frequency: e.target.value})} 
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsMedModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-save">Add Medication <Check size={16} /></button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLabModalOpen && (
        <div className="update-modal-overlay">
          <div className="update-modal glass">
            <div className="modal-header">
              <h3><Activity size={20} color="var(--primary)" /> Add Lab Report</h3>
              <button className="close-modal" onClick={() => setIsLabModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddLabReport}>
              <div className="form-group">
                <label>Test Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., CBC, NS1 Antigen"
                  value={labForm.test} 
                  onChange={(e) => setLabForm({...labForm, test: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label>Result Value</label>
                <input 
                  type="text" 
                  placeholder="e.g., Platelets: 40k/mcL"
                  value={labForm.result} 
                  onChange={(e) => setLabForm({...labForm, result: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label>Criticality Status</label>
                <select 
                  value={labForm.status}
                  onChange={(e) => setLabForm({...labForm, status: e.target.value})}
                  style={{ width: '100%', padding: '12px', background: 'var(--surface-light)', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--text)' }}
                >
                  <option value="Stable">Stable</option>
                  <option value="Critical">Critical</option>
                  <option value="Positive">Positive</option>
                  <option value="Negative">Negative</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsLabModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-save">Save Report <Check size={16} /></button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="emr-grid">
        {/* Profile Sidebar */}
        <div className="emr-sidebar">
          <div className="profile-card glass">
            <div className="avatar-large">{patientData.name.charAt(0)}</div>
            <h2>{patientData.name}</h2>
            <p className="status-online">Currently Admitted</p>
            
            <div className="info-list">
              <div className="info-item"><User size={16} /> <span>{patientData.age} Yrs, {patientData.gender}</span></div>
              <div className="info-item"><Droplets size={16} /> <span>Blood Group: {patientData.bloodGroup}</span></div>
              <div className="info-item"><MapPin size={16} /> <span>{patientData.district}</span></div>
              <div className="info-item"><Phone size={16} /> <span>{patientData.phone}</span></div>
            </div>
            
            <div className="ai-summary">
              <div className="ai-header">
                <Brain size={16} />
                <span>AI Clinical Insight</span>
              </div>
              <div className="ai-content">
                <strong>{patientData.aiInsights.classification}</strong>
                <p>{patientData.aiInsights.riskAnalysis}</p>
                <div className="confidence-meter">
                  <div className="c-label">AI Confidence: {patientData.aiInsights.confidence}</div>
                  <div className="c-bar"><div style={{ width: patientData.aiInsights.confidence }}></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Clinical Data */}
        <div className="emr-main">
          {/* Vitals Grid */}
          <div className="vitals-row">
            <div className="vital-card">
              <Thermometer size={20} color="#f43f5e" />
              <div className="v-data">
                <span className="v-val">{patientData.vitals.temp}</span>
                <span className="v-label">Body Temp</span>
              </div>
            </div>
            <div className="vital-card">
              <Activity size={20} color="#0ea5e9" />
              <div className="v-data">
                <span className="v-val">{patientData.vitals.bp}</span>
                <span className="v-label">Blood Pressure</span>
              </div>
            </div>
            <div className="vital-card">
              <Heart size={20} color="#10b981" />
              <div className="v-data">
                <span className="v-val">{patientData.vitals.heartRate}</span>
                <span className="v-label">Heart Rate</span>
              </div>
            </div>
            <div className="vital-card">
              <Droplets size={20} color="#8b5cf6" />
              <div className="v-data">
                <span className="v-val">{patientData.vitals.spO2}</span>
                <span className="v-label">Oxygen Sat.</span>
              </div>
            </div>
          </div>

          <div className="content-tabs">
            {['Clinical History', 'Medications', 'Lab Reports', 'Geo-Surveillance'].map(tab => (
              <div 
                key={tab} 
                className={`tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>

          <div className="tab-content-container">
            {activeTab === 'Clinical History' && (
              <div className="tab-content glass animate-fade-in">
                <div className="section-header">
                   <h3><FileText size={20} /> Clinical Timeline</h3>
                   <button className="add-btn" onClick={() => setIsUpdateModalOpen(true)}>Update Clinical Record</button>
                </div>
                <div className="history-timeline">
                  {patientData.history.map((item, i) => (
                    <div key={i} className="timeline-item">
                      <div className="time-marker">
                        <span className="dot"></span>
                        <span className="date">{item.date}</span>
                      </div>
                      <div className="event-content">
                        <h4>{item.event}</h4>
                        <p>{item.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Medications' && (
              <div className="tab-content glass animate-fade-in">
                <div className="section-header">
                  <h3><Pill size={20} /> Current Medications</h3>
                  <button className="add-btn" onClick={() => setIsMedModalOpen(true)}>+ Add Medication</button>
                </div>
                <div className="med-grid">
                  {patientData.medications.map((med, i) => (
                    <div key={i} className="med-card">
                      <div className="med-icon"><Clipboard size={16} /></div>
                      <div className="med-info">
                        <strong>{med.name}</strong>
                        <span>{med.dose} • {med.frequency}</span>
                        <span className="med-status">{med.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Lab Reports' && (
              <div className="tab-content glass animate-fade-in">
                <div className="section-header">
                  <h3><Activity size={20} /> Diagnostic Results</h3>
                  <button className="add-btn" onClick={() => setIsLabModalOpen(true)}>+ Upload Report</button>
                </div>
                <div className="lab-table-container">
                   <table className="v-table">
                      <thead>
                        <tr>
                          <th>Test Parameter</th>
                          <th>Date</th>
                          <th>Result Value</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patientData.labReports.map(report => (
                          <tr key={report.id}>
                            <td><strong>{report.test}</strong></td>
                            <td>{report.date}</td>
                            <td style={{ color: report.status === 'Critical' ? 'var(--danger)' : 'var(--text)' }}>{report.result}</td>
                            <td>
                              <span className={`v-status-tag ${report.status.toLowerCase()}`}>{report.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
              </div>
            )}

            {activeTab === 'Geo-Surveillance' && (
              <div className="tab-content glass animate-fade-in">
                <div className="section-header">
                  <h3><MapPin size={20} /> Geospatial Tracking</h3>
                  <button className="add-btn">Configure Geo-Fence</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem' }}>
                  <div className="map-placeholder" style={{ 
                    height: '300px', 
                    background: 'var(--surface-light)', 
                    borderRadius: '16px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '1px solid var(--border)',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <MapPin size={48} color="var(--primary)" opacity={0.3} />
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>High-Resolution Spatial Map Integrated</span>
                  </div>
                  <div className="geo-list">
                    {patientData.geoSurveillance.map(geo => (
                      <div key={geo.id} className="geo-card" style={{ 
                        padding: '12px', 
                        background: 'var(--surface-light)', 
                        borderRadius: '12px', 
                        marginBottom: '10px',
                        border: '1px solid var(--border)'
                      }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{geo.location}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--primary)', marginBottom: '4px' }}>{geo.type}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{geo.coordinates}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .emr-page { padding: 2rem; color: var(--text); min-height: 100vh; }
        
        .emr-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; }
        .header-left { display: flex; align-items: center; gap: 2rem; }
        .back-btn { background: var(--surface-light); border: 1px solid var(--border); color: var(--text); padding: 10px; border-radius: 12px; cursor: pointer; }
        
        .emr-badge { font-size: 0.7rem; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
        .header-left h1 { font-size: 2rem; font-weight: 800; }
        .id-tag { color: var(--text-muted); font-size: 1.2rem; margin-left: 10px; font-family: monospace; }
        
        .header-actions { display: flex; gap: 1rem; }
        .btn-primary { background: var(--primary); border: none; color: var(--text); padding: 10px 20px; border-radius: 10px; font-weight: 700; cursor: pointer; }
        .btn-secondary { background: var(--surface-light); border: 1px solid var(--border); color: var(--text); padding: 10px 20px; border-radius: 10px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; }

        .emr-grid { display: grid; grid-template-columns: 350px 1fr; gap: 2rem; }
        
        .glass { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 2rem; backdrop-filter: blur(20px); }
        
        .profile-card { text-align: center; }
        .avatar-large { width: 100px; height: 100px; background: linear-gradient(135deg, var(--primary), #6366f1); border-radius: 30px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: 800; color: var(--text); box-shadow: 0 15px 30px rgba(14, 165, 233, 0.3); }
        .profile-card h2 { font-size: 1.5rem; font-weight: 800; margin-bottom: 4px; }
        .status-online { font-size: 0.8rem; color: #10b981; font-weight: 700; margin-bottom: 2rem; display: flex; align-items: center; justify-content: center; gap: 6px; }
        .status-online::before { content: ''; width: 8px; height: 8px; background: var(--surface-light); border-radius: 50%; box-shadow: 0 0 10px #10b981; }
        
        .info-list { display: flex; flex-direction: column; gap: 1rem; text-align: left; margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid var(--border); }
        .info-item { display: flex; align-items: center; gap: 12px; color: var(--text-muted); font-size: 0.9rem; font-weight: 600; }
        
        .ai-summary { background: rgba(14, 165, 233, 0.05); border: 1px solid rgba(14, 165, 233, 0.1); border-radius: 16px; padding: 1.5rem; text-align: left; }
        .ai-header { display: flex; align-items: center; gap: 8px; color: var(--primary); font-size: 0.75rem; font-weight: 800; text-transform: uppercase; margin-bottom: 1rem; }
        .ai-content h4 { font-size: 0.95rem; margin-bottom: 6px; }
        .ai-content p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1rem; }
        .confidence-meter { font-size: 0.7rem; }
        .c-label { margin-bottom: 4px; font-weight: 700; color: var(--text-muted); }
        .c-bar { height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; }
        .c-bar div { height: 100%; background: var(--primary); border-radius: 2px; }

        .emr-main { display: flex; flex-direction: column; gap: 2rem; }
        
        .vitals-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .vital-card { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 1.5rem; display: flex; align-items: center; gap: 1.5rem; }
        .v-data { display: flex; flex-direction: column; }
        .v-val { font-size: 1.25rem; font-weight: 800; }
        .v-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; }

        .content-tabs { display: flex; gap: 2rem; border-bottom: 1px solid var(--border); padding-bottom: 10px; }
        .tab { font-size: 0.9rem; font-weight: 700; color: var(--text-muted); cursor: pointer; padding-bottom: 10px; position: relative; }
        .tab.active { color: var(--primary); }
        .tab.active::after { content: ''; position: absolute; bottom: -11px; left: 0; right: 0; height: 2px; background: var(--primary); box-shadow: 0 0 10px var(--primary); }

        .history-timeline { display: flex; flex-direction: column; gap: 2rem; }
        .timeline-item { display: flex; gap: 2rem; }
        .time-marker { display: flex; flex-direction: column; align-items: center; width: 80px; }
        .time-marker .dot { width: 12px; height: 12px; background: var(--primary); border-radius: 50%; margin-bottom: 8px; border: 3px solid var(--background); }
        .time-marker .date { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); }
        .event-content h4 { font-size: 1.1rem; margin-bottom: 4px; }
        .event-content p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; }

        .prescription-section { margin-top: 1rem; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .add-btn { background: var(--surface-light); border: 1px solid var(--border); color: var(--text); padding: 8px 16px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; cursor: pointer; }
        
        .med-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .med-card { background: var(--surface-light); border: 1px solid var(--border); padding: 1.25rem; border-radius: 16px; display: flex; align-items: center; gap: 1rem; }
        .med-icon { width: 36px; height: 36px; background: rgba(14, 165, 233, 0.1); color: var(--primary); border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .med-info strong { display: block; font-size: 1rem; margin-bottom: 2px; }
        .med-info span { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; }

        .update-modal-overlay {
          position: fixed;
          inset: 0;
          background: var(--surface);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
        }

        .update-modal {
          width: 100%;
          max-width: 500px;
          padding: 2.5rem;
          border: 1px solid rgba(255,255,255,0.1);
          animation: modalSlideUp 0.3s ease-out;
        }

        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }

        .tab-content-container { min-height: 400px; }
        
        .tab-content { border-top-left-radius: 0; margin-top: -1px; }

        .lab-table-container { overflow-x: auto; }
        .v-table { width: 100%; border-collapse: collapse; text-align: left; }
        .v-table th { padding: 12px; font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; border-bottom: 1px solid var(--border); }
        .v-table td { padding: 16px 12px; font-size: 0.9rem; border-bottom: 1px solid var(--border); }
        
        .v-status-tag { padding: 4px 8px; borderRadius: 4px; font-size: 0.7rem; fontWeight: 700; text-transform: uppercase; }
        .v-status-tag.critical { background: var(--danger); color: var(--text); }
        .v-status-tag.positive { background: var(--accent); color: var(--text); }
        .v-status-tag.stable { background: var(--primary); color: var(--text); }

        .med-status { display: inline-block; margin-top: 4px; font-size: 0.65rem; padding: 2px 6px; background: rgba(16, 185, 129, 0.1); color: #10b981; border-radius: 4px; font-weight: 700; }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .modal-header h3 {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.25rem;
          font-weight: 800;
        }

        .close-modal {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .form-group input {
          width: 100%;
          background: var(--surface-light);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 12px 16px;
          color: var(--text);
          font-weight: 600;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus {
          border-color: var(--primary);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
        }

        .btn-save {
          flex: 2;
          background: var(--primary);
          color: var(--text);
          border: none;
          padding: 12px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-cancel {
          flex: 1;
          background: var(--surface-light);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 12px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
        }
      ` }} />
    </div>
  );
};

export default PatientEMR;

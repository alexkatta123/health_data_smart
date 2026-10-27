import React, { useState, useEffect } from 'react';
import { 
  UserPlus, MapPin, Calendar, ClipboardList, 
  Stethoscope, Thermometer, Activity, Pill, 
  TestTube, Redo, Save, CheckCircle2, 
  AlertCircle, ChevronRight, Search, 
  User, Phone, Home, Building2, Zap, 
  Loader2, Trash2, Plus, Clock
} from 'lucide-react';

const AdvancedPatientRegistration = ({ onNavigate, setPatients }) => {
  const [loading, setLoading] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    // 1. Basic Details
    phcName: 'Guntur Urban PHC',
    district: 'Guntur',
    date: new Date().toISOString().split('T')[0],
    opNumber: `OP-${Math.floor(100000 + Math.random() * 900000)}`,
    patientName: '',
    age: '',
    gender: 'Male',
    mobile: '',
    address: '',
    village: '',

    // 2. Visit Info
    visitType: 'New',
    department: 'General Medicine',
    doctorName: 'Dr. Ramana Reddy',

    // 3. Symptoms
    symptoms: {
      fever: false,
      cough: false,
      cold: false,
      headache: false,
      bodyPain: false,
      vomiting: false,
      diarrhea: false,
      breathlessness: false
    },
    otherSymptoms: '',

    // 4. Clinical Notes
    chiefComplaint: '',
    history: '',
    vitals: {
      temp: '',
      bp: '',
      pulse: '',
      spo2: ''
    },

    // 5. AI Classification (Mocked)
    aiResult: {
      category: 'Communicable',
      disease: 'Dengue Suspected',
      confidence: 92,
      icd: 'A90',
      snomed: '38081000'
    },

    // 7. Prescription
    prescriptions: [{ medicine: '', sku: '', dosage: '', duration: '' }],

    // 8. Lab Tests
    labTests: {
      blood: false,
      urine: false,
      xray: false,
      dengue: false,
      covid: false
    },
    otherLabs: '',

    // 9. Referral
    referral: {
      to: '',
      reason: ''
    },

    // 10. Follow-up
    nextVisit: ''
  });

  // Simulate AI analysis when symptoms or complaints change
  useEffect(() => {
    if (formData.chiefComplaint.length > 10 || formData.otherSymptoms.length > 5) {
      setAiAnalyzing(true);
      const timer = setTimeout(() => setAiAnalyzing(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [formData.chiefComplaint, formData.otherSymptoms]);

  const handleSymptomToggle = (symptom) => {
    setFormData(prev => ({
      ...prev,
      symptoms: { ...prev.symptoms, [symptom]: !prev.symptoms[symptom] }
    }));
  };

  const handleLabToggle = (test) => {
    setFormData(prev => ({
      ...prev,
      labTests: { ...prev.labTests, [test]: !prev.labTests[test] }
    }));
  };

  const addPrescription = () => {
    setFormData(prev => ({
      ...prev,
      prescriptions: [...prev.prescriptions, { medicine: '', sku: '', dosage: '', duration: '' }]
    }));
  };

  const updatePrescription = (index, field, value) => {
    const newPrescriptions = [...formData.prescriptions];
    newPrescriptions[index][field] = value;
    setFormData(prev => ({ ...prev, prescriptions: newPrescriptions }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Create new patient record
    const newRecord = {
      id: `P-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.patientName,
      age: parseInt(formData.age),
      disease: formData.aiResult.disease,
      room: formData.village || 'Triage',
      status: formData.visitType === 'New' ? 'Inpatient' : 'Observation',
      doctor: formData.doctorName,
      clinicalActions: [{ time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), action: 'Initial Intake Finalized', dr: formData.doctorName }]
    };

    setTimeout(() => {
      setPatients(prev => [newRecord, ...prev]);
      setLoading(false);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  const [ocrType, setOcrType] = useState(null); // 'Aadhaar' or 'Lab'

  const handleOcrUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setOcrProcessing(true);
    const isImage = file.type.startsWith('image/');
    setOcrType(isImage ? 'Aadhaar Card' : 'Laboratory Report');

    // Simulate high-fidelity OCR extraction based on detected document type
    setTimeout(() => {
      if (isImage) {
        // Data from aadhar.jpeg
        setFormData(prev => ({
          ...prev,
          patientName: 'Katta Alex',
          age: '26', // Calculated from 15/08/1999
          gender: 'Male',
          mobile: '98480 22334',
          village: 'Kopparru, Guntur',
          address: '3-64, Kopparru Village, Pedanandipadu Mandal, Guntur, AP - 522015',
          chiefComplaint: 'Patient identity verified via Aadhaar: 5705 3597 6297.',
        }));
      } else {
        // Data from Laboratory Report.docx
        setFormData(prev => ({
          ...prev,
          chiefComplaint: 'Clinical correlation advised per Laboratory Report. All primary viral nodes negative.',
          labTests: {
            blood: true,
            urine: false,
            xray: false,
            dengue: true,
            covid: true
          },
          otherLabs: 'NS1: Negative, RT-PCR: Negative, IgM: Negative'
        }));
      }
      setOcrProcessing(false);
    }, 2500);
  };

  if (success) {
    return (
      <div className="registration-success-view animate-fade">
        <div className="success-card">
          <div className="success-icon-container">
            <CheckCircle2 size={64} color="#10b981" />
          </div>
          <h1>Patient Record Synchronized</h1>
          <p>The clinical case for <strong>{formData.patientName}</strong> has been successfully broadcast to the District Surveillance Matrix and pharmacy nodes.</p>
          
          <div className="case-summary-minimal">
            <div className="s-item"><span>OP Number:</span> <strong>{formData.opNumber}</strong></div>
            <div className="s-item"><span>AI Diagnosis:</span> <strong>{formData.aiResult.disease} ({formData.aiResult.icd})</strong></div>
          </div>

          <div className="success-actions">
            <button className="h-btn h-btn-primary" onClick={() => window.location.reload()}>New Registration</button>
            <button className="h-btn-secondary">Print Case File</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="advanced-registration-page animate-fade">
      <header className="reg-header">
        <div className="header-text">
          <div className="tactical-breadcrumb">MISSION OPERATIONS / CLINICAL INTAKE</div>
          <h1>Advanced Patient Registration</h1>
          <p>Electronic Health Record (EHR) entry with real-time NLP classification.</p>
        </div>
        <div className="header-meta">
          <div className="m-pill"><Calendar size={14}/> {formData.date}</div>
          <div className="m-pill"><Clock size={14}/> 09:42 AM</div>
          <div className="m-pill primary"><Activity size={14}/> NETWORK ONLINE</div>
        </div>
      </header>

      <form className="reg-container" onSubmit={handleSubmit}>
        <div className="reg-main">
          {/* OCR Intake Module */}
          <section className="reg-section h-card" style={{ border: '2px dashed var(--primary)', background: 'var(--primary-glow)', position: 'relative', overflow: 'hidden' }}>
            <div className="section-title" style={{ border: 'none', marginBottom: '1rem' }}>
              <Zap size={20} color="var(--primary)" /> Medical Document Intelligence (OCR)
            </div>
            <p style={{ margin: '0 0 1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Upload OP tickets, prescriptions, or handwritten notes to auto-populate the clinical registry.
            </p>
            
            <div className="ocr-upload-zone" style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
              <label className="ocr-btn" style={{ background: 'var(--primary)', color: 'white', padding: '12px 24px', borderRadius: '12px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', transition: '0.3s' }}>
                <ClipboardList size={18} />
                {ocrProcessing ? 'Processing Document...' : 'Select Medical Document'}
                <input type="file" style={{ display: 'none' }} onChange={handleOcrUpload} accept="image/*,application/pdf" disabled={ocrProcessing} />
              </label>
              
              {ocrProcessing && (
                <div className="ocr-progress-h" style={{ flex: 1, minWidth: '200px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--primary)' }}>SCANNING {ocrType ? ocrType.toUpperCase() : 'DOCUMENT'}...</span>
                      <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--primary)' }}>78%</span>
                   </div>
                   <div style={{ height: '8px', background: 'rgba(0,0,0,0.1)', borderRadius: '100px', overflow: 'hidden' }}>
                      <div className="animate-pulse" style={{ height: '100%', width: '78%', background: 'var(--primary)', borderRadius: '100px' }}></div>
                   </div>
                </div>
              )}

              {!ocrProcessing && ocrType && (
                 <div className="animate-fade" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--surface)', padding: '10px 16px', borderRadius: '12px', border: '1px solid var(--primary)', boxShadow: '0 4px 15px var(--primary-glow)' }}>
                    <CheckCircle2 size={16} color="var(--primary)" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text)' }}>Intelligence Loaded: <span style={{ color: 'var(--primary)', fontWeight: 900 }}>{ocrType}</span></span>
                 </div>
              )}
            </div>
            
            {/* Decorative background element */}
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'var(--primary)', opacity: 0.05, borderRadius: '50%', filter: 'blur(40px)' }}></div>
          </section>
          {/* 1. Basic Patient Details */}
          <section className="reg-section h-card">
            <div className="section-title">
              <User size={20} /> 1. Basic Patient Details
            </div>
            <div className="form-grid-3">
              <div className="h-form-group">
                <label>PHC Name</label>
                <input type="text" value={formData.phcName} readOnly className="read-only-input" />
              </div>
              <div className="h-form-group">
                <label>District</label>
                <input type="text" value={formData.district} readOnly className="read-only-input" />
              </div>
              <div className="h-form-group">
                <label>OP Number</label>
                <input type="text" value={formData.opNumber} readOnly className="op-number-display" />
              </div>
              <div className="h-form-group span-2">
                <label>Patient Name</label>
                <input 
                  type="text" 
                  placeholder="Enter full name" 
                  value={formData.patientName} 
                  onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                  required 
                />
              </div>
              <div className="h-form-group">
                <label>Age</label>
                <input 
                  type="number" 
                  placeholder="Age" 
                  value={formData.age} 
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  required 
                />
              </div>
              <div className="h-form-group">
                <label>Gender</label>
                <div className="radio-group-h">
                  {['Male', 'Female', 'Other'].map(g => (
                    <label key={g} className={`radio-pill ${formData.gender === g ? 'active' : ''}`}>
                      <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={() => setFormData({...formData, gender: g})} />
                      {g}
                    </label>
                  ))}
                </div>
              </div>
              <div className="h-form-group">
                <label>Mobile Number</label>
                <input 
                  type="tel" 
                  placeholder="+91 XXXXX XXXXX" 
                  value={formData.mobile} 
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  required 
                />
              </div>
              <div className="h-form-group">
                <label>Village/Town</label>
                <input 
                  type="text" 
                  placeholder="Enter locality" 
                  value={formData.village} 
                  onChange={(e) => setFormData({...formData, village: e.target.value})}
                />
              </div>
              <div className="h-form-group span-3">
                <label>Full Address</label>
                <input 
                  type="text" 
                  placeholder="House No, Street Name..." 
                  value={formData.address} 
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </div>
          </section>

          {/* 2. Visit Information */}
          <section className="reg-section h-card">
            <div className="section-title">
              <Stethoscope size={20} /> 2. Visit Information
            </div>
            <div className="form-grid-3">
              <div className="h-form-group">
                <label>Visit Type</label>
                <select value={formData.visitType} onChange={(e) => setFormData({...formData, visitType: e.target.value})}>
                  <option value="New">New Admission</option>
                  <option value="Follow-up">Follow-up Visit</option>
                </select>
              </div>
              <div className="h-form-group">
                <label>Department</label>
                <input type="text" placeholder="e.g. Cardiology" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} />
              </div>
              <div className="h-form-group">
                <label>Attending Doctor</label>
                <input type="text" value={formData.doctorName} readOnly className="read-only-input" />
              </div>
            </div>
          </section>

          {/* 3. Symptoms */}
          <section className="reg-section h-card">
            <div className="section-title">
              <AlertCircle size={20} /> 3. Symptoms (Epidemiological Input)
            </div>
            <div className="symptoms-grid">
              {Object.keys(formData.symptoms).map(s => (
                <div 
                  key={s} 
                  className={`symptom-chip ${formData.symptoms[s] ? 'active' : ''}`}
                  onClick={() => handleSymptomToggle(s)}
                >
                  <div className="check-box-h"></div>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </div>
              ))}
            </div>
            <div className="h-form-group mt-1">
              <label>Other Symptoms / Clinical Observations</label>
              <textarea 
                placeholder="Enter additional symptoms here..." 
                value={formData.otherSymptoms}
                onChange={(e) => setFormData({...formData, otherSymptoms: e.target.value})}
                rows="2"
              ></textarea>
            </div>
          </section>

          {/* 4. Clinical Notes */}
          <section className="reg-section h-card">
            <div className="section-title">
              <ClipboardList size={20} /> 4. Clinical Notes (Doctor Entry)
            </div>
            <div className="h-form-group">
              <label>Chief Complaint</label>
              <textarea 
                placeholder="What is the primary reason for the visit?" 
                value={formData.chiefComplaint}
                onChange={(e) => setFormData({...formData, chiefComplaint: e.target.value})}
                rows="3"
                required
              ></textarea>
            </div>
            <div className="h-form-group">
              <label>History of Present Illness</label>
              <textarea 
                placeholder="Describe the progression of symptoms..." 
                value={formData.history}
                onChange={(e) => setFormData({...formData, history: e.target.value})}
                rows="3"
              ></textarea>
            </div>
            <div className="vitals-grid mt-1">
              <div className="v-item">
                <label>Temperature (°F)</label>
                <div className="v-input"><Thermometer size={14}/> <input type="text" placeholder="98.6" value={formData.vitals.temp} onChange={(e) => setFormData({...formData, vitals: {...formData.vitals, temp: e.target.value}})} /></div>
              </div>
              <div className="v-item">
                <label>BP (mmHg)</label>
                <div className="v-input"><Activity size={14}/> <input type="text" placeholder="120/80" value={formData.vitals.bp} onChange={(e) => setFormData({...formData, vitals: {...formData.vitals, bp: e.target.value}})} /></div>
              </div>
              <div className="v-item">
                <label>Pulse (BPM)</label>
                <div className="v-input"><Activity size={14}/> <input type="text" placeholder="72" value={formData.vitals.pulse} onChange={(e) => setFormData({...formData, vitals: {...formData.vitals, pulse: e.target.value}})} /></div>
              </div>
              <div className="v-item">
                <label>SpO2 (%)</label>
                <div className="v-input"><Activity size={14}/> <input type="text" placeholder="98" value={formData.vitals.spo2} onChange={(e) => setFormData({...formData, vitals: {...formData.vitals, spo2: e.target.value}})} /></div>
              </div>
            </div>
          </section>

          {/* 7. Prescription */}
          <section className="reg-section h-card">
            <div className="section-title">
              <Pill size={20} /> 7. Prescription (Linked to SKU)
            </div>
            <table className="prescription-table">
              <thead>
                <tr>
                  <th>Medicine Name</th>
                  <th>SKU ID</th>
                  <th>Dosage</th>
                  <th>Duration</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {formData.prescriptions.map((p, idx) => (
                  <tr key={idx}>
                    <td><input type="text" placeholder="Paracetamol" value={p.medicine} onChange={(e) => updatePrescription(idx, 'medicine', e.target.value)} /></td>
                    <td><input type="text" placeholder="SKU-102" value={p.sku} onChange={(e) => updatePrescription(idx, 'sku', e.target.value)} /></td>
                    <td><input type="text" placeholder="1-0-1" value={p.dosage} onChange={(e) => updatePrescription(idx, 'dosage', e.target.value)} /></td>
                    <td><input type="text" placeholder="5 Days" value={p.duration} onChange={(e) => updatePrescription(idx, 'duration', e.target.value)} /></td>
                    <td><button type="button" className="icon-btn-danger"><Trash2 size={14}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" className="add-line-btn" onClick={addPrescription}>
              <Plus size={14}/> Add Medicine
            </button>
          </section>

          {/* 8. Lab Tests */}
          <section className="reg-section h-card">
            <div className="section-title">
              <TestTube size={20} /> 8. Lab Tests
            </div>
            <div className="symptoms-grid">
              {Object.keys(formData.labTests).map(t => (
                <div 
                  key={t} 
                  className={`symptom-chip ${formData.labTests[t] ? 'active' : ''}`}
                  onClick={() => handleLabToggle(t)}
                >
                  <div className="check-box-h"></div>
                  {t.charAt(0).toUpperCase() + t.slice(1)} Test
                </div>
              ))}
            </div>
            <div className="h-form-group mt-1">
              <label>Other Tests Required</label>
              <input type="text" placeholder="e.g. Liver Function Test" onChange={(e) => setFormData({...formData, otherLabs: e.target.value})} />
            </div>
          </section>

          {/* 9 & 10. Referral & Follow-up */}
          <div className="form-grid-2">
            <section className="reg-section h-card">
              <div className="section-title"><Redo size={20} /> 9. Referral</div>
              <div className="h-form-group"><label>Referred to</label><input type="text" placeholder="District Hospital Guntur" onChange={(e) => setFormData({...formData, referral: {...formData.referral, to: e.target.value}})} /></div>
              <div className="h-form-group"><label>Reason</label><input type="text" placeholder="Surgical intervention required" onChange={(e) => setFormData({...formData, referral: {...formData.referral, reason: e.target.value}})} /></div>
            </section>
            <section className="reg-section h-card">
              <div className="section-title"><Calendar size={20} /> 10. Follow-Up</div>
              <div className="h-form-group"><label>Next Visit Date</label><input type="date" onChange={(e) => setFormData({...formData, nextVisit: e.target.value})} /></div>
              <div className="h-form-group"><label>Instructions</label><input type="text" placeholder="Keep records of BP" /></div>
            </section>
          </div>
        </div>

        {/* Sidebar: AI Analytics & Actions */}
        <aside className="reg-sidebar">
          <div className="sticky-sidebar">
            <div className="ai-intelligence-card h-card">
              <div className="ai-badge">
                <Zap size={14} /> AI CLASSIFICATION ENGINE
              </div>
              
              {aiAnalyzing ? (
                <div className="ai-analyzing">
                  <Loader2 className="animate-spin" size={32} color="var(--primary)" />
                  <p>Processing unstructured notes...</p>
                </div>
              ) : (
                <div className="ai-content-h">
                  <div className="ai-result-row">
                    <span className="lbl">Predicted Category</span>
                    <span className="val communicable">{formData.aiResult.category}</span>
                  </div>
                  <div className="ai-result-row">
                    <span className="lbl">Suggested Disease</span>
                    <span className="val">{formData.aiResult.disease}</span>
                  </div>
                  <div className="ai-confidence">
                    <div className="conf-header">
                      <span>Confidence Score</span>
                      <span>{formData.aiResult.confidence}%</span>
                    </div>
                    <div className="conf-bar"><div className="conf-fill" style={{ width: `${formData.aiResult.confidence}%` }}></div></div>
                  </div>
                  <div className="ai-codes">
                    <div className="code-item">
                      <span className="c-lbl">ICD-10</span>
                      <span className="c-val">{formData.aiResult.icd}</span>
                    </div>
                    <div className="code-item">
                      <span className="c-lbl">SNOMED CT</span>
                      <span className="c-val">{formData.aiResult.snomed}</span>
                    </div>
                  </div>

                  <div className="validation-buttons">
                    <button type="button" className="accept-btn"><CheckCircle2 size={16}/> Accept Prediction</button>
                    <button type="button" className="modify-btn">Modify Diagnosis</button>
                  </div>
                </div>
              )}
            </div>

            <div className="submission-card h-card">
              <h3>Case Operations</h3>
              <p>Finalize and synchronize patient record across state surveillance network.</p>
              <button type="submit" className="h-btn h-btn-primary full-btn" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                {loading ? 'Synchronizing Node...' : 'Commit & Sync Record'}
              </button>
              <button type="button" className="h-btn-outline full-btn mt-1">
                Save as Draft
              </button>
            </div>
          </div>
        </aside>
      </form>

      <style>{`
        .advanced-registration-page { padding: 2rem; max-width: 1400px; margin: 0 auto; }
        .reg-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 3rem; }
        .header-text h1 { font-size: 2.5rem; margin: 0.5rem 0; }
        .tactical-breadcrumb { font-size: 0.7rem; font-weight: 900; color: var(--primary); letter-spacing: 2px; }
        .header-meta { display: flex; gap: 10px; }
        .m-pill { background: var(--surface-light); padding: 8px 16px; border-radius: 100px; font-size: 0.75rem; font-weight: 800; display: flex; align-items: center; gap: 8px; border: 1px solid var(--border); }
        .m-pill.primary { background: var(--primary-glow); color: var(--primary); border-color: var(--primary); }

        .reg-container { display: grid; grid-template-columns: 1fr 400px; gap: 2rem; }
        .reg-main { display: flex; flex-direction: column; gap: 2rem; }
        .reg-section { padding: 2rem; border-radius: 24px; position: relative; }
        .section-title { font-size: 1.1rem; font-weight: 900; margin-bottom: 2rem; display: flex; align-items: center; gap: 12px; color: var(--text); border-bottom: 1px solid var(--border); padding-bottom: 1rem; }
        
        .form-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .form-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }
        .span-2 { grid-column: span 2; }
        .span-3 { grid-column: span 3; }
        .mt-1 { margin-top: 1.5rem; }

        .h-form-group label { display: block; font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px; letter-spacing: 1px; }
        .h-form-group input, .h-form-group select, .h-form-group textarea { width: 100%; padding: 14px; border-radius: 12px; border: 1px solid var(--border); background: var(--surface-light); color: var(--text); font-weight: 600; font-size: 0.95rem; outline: none; transition: 0.3s; }
        .h-form-group input:focus, .h-form-group textarea:focus { border-color: var(--primary); background: var(--surface); box-shadow: 0 0 15px var(--primary-glow); }
        .read-only-input { background: rgba(0,0,0,0.02) !important; color: var(--text-muted) !important; cursor: not-allowed; }
        .op-number-display { font-family: monospace; color: var(--primary) !important; font-weight: 900 !important; font-size: 1.1rem !important; }

        .radio-group-h { display: flex; gap: 10px; }
        .radio-pill { flex: 1; padding: 10px; text-align: center; background: var(--surface-light); border: 1px solid var(--border); border-radius: 10px; cursor: pointer; font-size: 0.85rem; font-weight: 800; transition: 0.3s; }
        .radio-pill.active { background: var(--primary); color: white; border-color: var(--primary); }
        .radio-pill input { display: none; }

        .symptoms-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }
        .symptom-chip { display: flex; align-items: center; gap: 10px; padding: 12px 16px; background: var(--surface-light); border: 1px solid var(--border); border-radius: 12px; font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: 0.2s; }
        .symptom-chip.active { background: var(--primary-glow); border-color: var(--primary); color: var(--primary); }
        .check-box-h { width: 16px; height: 16px; border: 2px solid var(--text-muted); border-radius: 4px; position: relative; }
        .active .check-box-h { border-color: var(--primary); background: var(--primary); }
        .active .check-box-h::after { content: '✓'; position: absolute; color: white; font-size: 10px; left: 2px; top: -2px; }

        .vitals-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .v-input { display: flex; align-items: center; gap: 8px; background: var(--surface-light); border: 1px solid var(--border); padding: 0 12px; border-radius: 10px; height: 45px; }
        .v-input input { border: none; background: none; width: 100%; font-weight: 800; font-size: 0.9rem; }

        .prescription-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        .prescription-table th { text-align: left; padding: 12px; font-size: 0.7rem; color: var(--text-muted); border-bottom: 1px solid var(--border); }
        .prescription-table td { padding: 8px; border-bottom: 1px solid var(--border); }
        .prescription-table input { width: 100%; border: none; background: var(--surface-light); padding: 10px; border-radius: 8px; font-size: 0.85rem; font-weight: 700; }
        .icon-btn-danger { background: none; border: none; color: #ef4444; cursor: pointer; opacity: 0.5; }
        .icon-btn-danger:hover { opacity: 1; }
        .add-line-btn { background: none; border: 2px dashed var(--border); color: var(--text-muted); width: 100%; padding: 12px; border-radius: 12px; margin-top: 1rem; font-weight: 800; cursor: pointer; transition: 0.2s; }
        .add-line-btn:hover { border-color: var(--primary); color: var(--primary); }

        .reg-sidebar { position: relative; }
        .sticky-sidebar { position: sticky; top: 2rem; display: flex; flex-direction: column; gap: 2rem; }
        .ai-badge { background: #7c3aed; color: white; padding: 6px 12px; border-radius: 100px; font-size: 0.65rem; font-weight: 900; width: fit-content; margin-bottom: 1.5rem; letter-spacing: 1px; }
        .ai-analyzing { text-align: center; padding: 2rem 0; color: var(--text-muted); font-weight: 700; }
        .ai-result-row { display: flex; justify-content: space-between; margin-bottom: 1rem; }
        .ai-result-row .lbl { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); }
        .ai-result-row .val { font-weight: 900; font-size: 0.95rem; }
        .val.communicable { color: #f43f5e; }
        
        .ai-confidence { margin-bottom: 1.5rem; }
        .conf-header { display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 800; margin-bottom: 8px; }
        .conf-bar { height: 8px; background: var(--border); border-radius: 10px; overflow: hidden; }
        .conf-fill { height: 100%; background: var(--primary); border-radius: 10px; }
        
        .ai-codes { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 2rem; }
        .code-item { background: var(--surface-light); padding: 12px; border-radius: 12px; border: 1px solid var(--border); }
        .c-lbl { display: block; font-size: 0.6rem; font-weight: 900; color: var(--text-muted); }
        .c-val { font-family: monospace; font-weight: 900; color: var(--text); }

        .validation-buttons { display: flex; flex-direction: column; gap: 10px; }
        .accept-btn { background: var(--primary-glow); color: var(--primary); border: 1px solid var(--primary); padding: 14px; border-radius: 14px; font-weight: 800; cursor: pointer; display: flex; alignItems: center; justifyContent: center; gap: 10px; }
        .modify-btn { background: none; border: 1px solid var(--border); color: var(--text-muted); padding: 12px; border-radius: 14px; font-weight: 800; cursor: pointer; }

        .submission-card h3 { margin-bottom: 0.5rem; }
        .submission-card p { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.5rem; }
        .full-btn { width: 100%; height: 55px; }

        .registration-success-view { padding: 4rem 2rem; display: flex; justify-content: center; }
        .success-card { background: var(--surface); border: 1px solid var(--border); padding: 4rem; border-radius: 40px; text-align: center; max-width: 600px; box-shadow: 0 40px 100px rgba(0,0,0,0.1); }
        .success-icon-container { width: 120px; height: 120px; background: var(--primary-glow); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; }
        .case-summary-minimal { background: var(--surface-light); padding: 1.5rem; border-radius: 20px; margin: 2rem 0; display: flex; flex-direction: column; gap: 10px; }
        .s-item { display: flex; justify-content: space-between; font-size: 0.9rem; }
        .success-actions { display: flex; gap: 1rem; justify-content: center; }

        @media (max-width: 1100px) {
          .reg-container { grid-template-columns: 1fr; }
          .reg-sidebar { display: none; }
        }
      `}</style>
    </div>
  );
};

export default AdvancedPatientRegistration;

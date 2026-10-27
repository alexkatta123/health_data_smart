import React, { useState } from 'react';
import { 
  ArrowLeft, Printer, Share2, ShieldCheck, 
  User, Calendar, Clock, Activity, Pill, 
  TestTube, ClipboardList, MapPin, Phone, 
  Stethoscope, Zap, FileText, CheckCircle2, 
  AlertTriangle, TrendingUp, TrendingDown, Brain, X, Search,
  Building2
} from 'lucide-react';

const PatientCaseFile = ({ patientData, onBack, setPatients, patients }) => {
  // Enhanced Logic: Generate clinical context if missing from the registry record
  const generateClinicalData = (base) => {
    if (!base) return null;
    
    // If it's the high-fidelity demo patient, keep his specific details
    if (base.id === 'P-1024') return {
      ...base,
      opNumber: 'OP-512409',
      vitals: { temp: '101.2°F', bp: '145/95', pulse: '88 BPM', spo2: '96%' },
      symptoms: ['Fever', 'Body Pain', 'Headache', 'Chills'],
      complaint: 'Patient reports high fever for 3 days with intense joint pain and retro-orbital headache. No cough or cold symptoms.',
      aiAnalysis: {
        disease: 'Dengue Fever (Suspected)',
        icd: 'A90',
        snomed: '38081000',
        confidence: 94.2,
        category: 'Communicable',
        epidemiologicalRisk: 'High (Cluster identified in Mangalagiri)'
      },
      prescription: [
        { name: 'Paracetamol', dosage: '500mg (1-0-1)', duration: '5 Days' },
        { name: 'ORS Packets', dosage: 'As needed', duration: '3 Days' }
      ],
      labs: ['NS1 Antigen Test', 'Complete Blood Count (CBC)'],
      trends: [
        { date: '05-01', count: 2 }, { date: '05-02', count: 5 }, { date: '05-03', count: 8 },
        { date: '05-04', count: 12 }, { date: '05-05', count: 15 }, { date: '05-06', count: 24 }
      ],
      geospatialRisk: { location: 'Mangalagiri Cluster', radius: '2km', activeCases: 14, riskLevel: 'Elevated' }
    };

    // For other district patients, generate data based on their 'disease' field
    const diseaseData = {
      'Dengue Suspected': { icd: 'A90', snomed: '38081000', cat: 'Communicable', symptoms: ['High Fever', 'Joint Pain', 'Rashes'] },
      'Malaria': { icd: 'B54', snomed: '61462000', cat: 'Communicable', symptoms: ['Chills', 'Sweating', 'Fever'] },
      'Acute Respiratory Infection': { icd: 'J06.9', snomed: '195708003', cat: 'Communicable', symptoms: ['Cough', 'Breathlessness', 'Chest Pain'] },
      'Viral Fever': { icd: 'A99', snomed: '43724002', cat: 'Communicable', symptoms: ['Body Ache', 'Weakness', 'Mild Fever'] },
      'Hypertension': { icd: 'I10', snomed: '38341003', cat: 'Non-Communicable', symptoms: ['Dizziness', 'Vision Problems', 'Palpitations'] },
      'Gastroenteritis': { icd: 'A09.9', snomed: '82215001', cat: 'Communicable', symptoms: ['Diarrhea', 'Vomiting', 'Stomach Cramps'] }
    }[base.disease] || { icd: 'Z00.0', snomed: '12345', cat: 'Other', symptoms: ['Fatigue', 'General Malaise'] };

    return {
      ...base,
      opNumber: base.opNumber || `OP-${Math.floor(100000 + Math.random() * 900000)}`,
      visitDate: base.visitDate || new Date().toISOString().split('T')[0],
      gender: base.gender || ['Male', 'Female', 'Other'][Math.floor(Math.random() * 3)],
      village: base.village || ['Guntur Urban', 'Mangalagiri', 'Tenali Central', 'Amaravati North', 'Ponnur East'][Math.floor(Math.random() * 5)],
      district: base.district || 'Guntur',
      mobile: base.mobile || `+91 ${Math.floor(60000 + Math.random() * 39999)} ${Math.floor(10000 + Math.random() * 89999)}`,
      phc: base.phc || 'Guntur Urban PHC',
      vitals: base.vitals || { 
        temp: `${(98 + Math.random() * 4).toFixed(1)}°F`, 
        bp: `${110 + Math.floor(Math.random() * 40)}/${70 + Math.floor(Math.random() * 30)}`, 
        pulse: `${70 + Math.floor(Math.random() * 30)} BPM`, 
        spo2: `${92 + Math.floor(Math.random() * 7)}%` 
      },
      symptoms: base.symptoms || diseaseData.symptoms,
      complaint: base.complaint || `Patient presenting with ${base.disease}. Symptoms include ${diseaseData.symptoms.join(', ')}. Monitoring for stability.`,
      aiAnalysis: base.aiAnalysis || {
        disease: base.disease,
        icd: diseaseData.icd,
        snomed: diseaseData.snomed,
        confidence: (88 + Math.random() * 10).toFixed(1),
        category: diseaseData.cat,
        epidemiologicalRisk: diseaseData.cat === 'Communicable' ? 'Medium (Regional cluster detected)' : 'Low (Standard metabolic risk)'
      },
      prescription: base.prescription || [
        { name: 'Standard Protocol Meds', dosage: '1-0-1', duration: '7 Days' },
        { name: 'Hydration Therapy', dosage: 'Oral', duration: 'Ongoing' }
      ],
      labs: base.labs || ['Routine Clinical Review', 'Metabolic Panel'],
      trends: base.trends || [
        { date: '05-01', count: random(2, 5) }, { date: '05-02', count: random(5, 10) }, { date: '05-03', count: random(10, 15) }
      ],
      geospatialRisk: base.geospatialRisk || { location: `${base.phc} Region`, radius: '5km', activeCases: random(5, 20), riskLevel: 'Stable' }
    };
  };

  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  const data = generateClinicalData(patientData);

  // If no data found at all, show a graceful fallback (shouldn't happen with generateClinicalData)
  if (!data) return <div style={{ padding: '4rem', textAlign: 'center' }}><h2>Patient Record Not Found</h2><button onClick={onBack}>Back to Registry</button></div>;

  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [showCodingLibrary, setShowCodingLibrary] = useState(false);

  const handleValidation = (isValid) => {
    setFeedbackGiven(true);
    updateStatus(isValid ? 'Validated' : 'Requires Review');
    // Simulate model training broadcast
    console.log(`Model feedback broadcast: Disease ${data.aiAnalysis.disease} validation=${isValid}`);
  };

  const updateStatus = (newStatus) => {
    setPatients(prev => prev.map(p => {
      if (p.id === data.id) {
        return { 
          ...p, 
          status: newStatus,
          clinicalActions: [
            { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), action: `Status updated to ${newStatus}`, dr: 'Dr. Ramana Reddy' },
            ...(p.clinicalActions || [])
          ]
        };
      }
      return p;
    }));
    alert(`Success: ${data.name}'s clinical status has been updated to "${newStatus}".`);
  };

  const dischargePatient = () => {
    if (window.confirm(`Are you sure you want to discharge ${data.name}?`)) {
      setPatients(prev => prev.filter(p => p.id !== data.id));
      onBack();
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Critical') return '#ef4444';
    if (status === 'Under Observation') return '#f59e0b';
    return '#10b981';
  };

  const handlePrintReceipt = () => {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Medical Report - ${data.name}</title>
          <style>
            body { font-family: 'Inter', sans-serif; padding: 40px; color: #111827; }
            .header { text-align: center; border-bottom: 2px solid #10b981; padding-bottom: 20px; margin-bottom: 30px; }
            .header h1 { margin: 0; color: #10b981; font-size: 24px; text-transform: uppercase; }
            .header h3 { margin: 5px 0 0 0; color: #4b5563; font-size: 16px; }
            .header p { margin: 5px 0 0 0; font-size: 12px; color: #6b7280; }
            .section { margin-bottom: 30px; }
            .section-title { font-weight: bold; text-transform: uppercase; font-size: 14px; color: #374151; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
            .row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }
            .label { font-weight: bold; color: #4b5563; }
            .value { color: #111827; }
            .diagnosis-box { background: #f3f4f6; padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444; margin-top: 10px; }
            .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 20px; }
            .signature { margin-top: 40px; display: flex; justify-content: space-between; padding: 0 40px; }
            .sig-line { border-top: 1px solid #111827; width: 200px; text-align: center; padding-top: 5px; font-size: 14px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Government of Andhra Pradesh</h1>
            <h3>Department of Health, Medical & Family Welfare</h3>
            <h3>${data.phc} - District Health Report</h3>
            <p>Generated via SurvAP Intelligence Platform • Date: ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="grid section">
            <div>
              <div class="section-title">Patient Details</div>
              <div class="row"><span class="label">Name:</span> <span class="value">${data.name}</span></div>
              <div class="row"><span class="label">Patient ID:</span> <span class="value">${data.id}</span></div>
              <div class="row"><span class="label">Age/Gender:</span> <span class="value">${data.age} Yrs / ${data.gender}</span></div>
              <div class="row"><span class="label">Location:</span> <span class="value">${data.village}</span></div>
              <div class="row"><span class="label">Contact:</span> <span class="value">${data.mobile}</span></div>
            </div>
            <div>
              <div class="section-title">Clinical Vitals</div>
              <div class="row"><span class="label">Temperature:</span> <span class="value">${data.vitals.temp}</span></div>
              <div class="row"><span class="label">Blood Pressure:</span> <span class="value">${data.vitals.bp}</span></div>
              <div class="row"><span class="label">Pulse:</span> <span class="value">${data.vitals.pulse}</span></div>
              <div class="row"><span class="label">SPO2:</span> <span class="value">${data.vitals.spo2}</span></div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Clinical Diagnosis & Intelligence</div>
            <p><strong>Chief Complaint:</strong> ${data.complaint}</p>
            <div class="diagnosis-box">
              <h3 style="margin: 0 0 5px 0; color: #ef4444;">${data.aiAnalysis.disease}</h3>
              <p style="margin: 0; font-size: 14px;"><strong>ICD-10 Code:</strong> ${data.aiAnalysis.icd10} | <strong>Match Reliability:</strong> ${data.aiAnalysis.confidence}%</p>
            </div>
          </div>

          <div class="signature">
            <div class="sig-line">Patient Signature</div>
            <div class="sig-line">Medical Officer Signature</div>
          </div>
          
          <div class="footer">
            This is an automated computer-generated clinical receipt from the SurvAP Platform.
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <div className="patient-case-file-view animate-fade">
      <div className="case-file-header h-card">
        <div className="header-top">
          <button className="back-btn" onClick={onBack}>
            <ArrowLeft size={18} /> Back to Registry
          </button>
          <div className="header-actions">
            <button className="h-btn-outline" onClick={() => { navigator.clipboard.writeText(`Patient Case: ${data.id} - ${data.name}`); alert('Patient case details copied to clipboard.'); }}><Share2 size={16}/> Share</button>
            <button className="h-btn-outline" onClick={handlePrintReceipt}><Printer size={16}/> Print File</button>
            <button className="h-btn h-btn-primary" onClick={() => { handleValidation(true); alert(`Clinical Path for ${data.name} Validated! Status updated.`); }}><ShieldCheck size={16}/> Validate Clinical Path</button>
          </div>
        </div>
        
        <div className="header-main">
          <div className="patient-id-badge">
            <div className="avatar-l">{data.name[0]}</div>
            <div>
              <h1>{data.name}</h1>
              <p className="case-id">{data.id} • {data.opNumber}</p>
            </div>
          </div>
          <div className="header-status-group">
            <div className="status-indicator">
              <span className="lbl">Clinical Status</span>
              <div className="status-val" style={{ color: getStatusColor(data.status) }}>
                <div className="status-dot" style={{ background: getStatusColor(data.status) }}></div>
                {data.status.toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        <div className="header-meta-grid">
          <div className="meta-item"><User size={14}/> {data.age} yrs • {data.gender}</div>
          <div className="meta-item"><Phone size={14}/> {data.mobile}</div>
          <div className="meta-item"><MapPin size={14}/> {data.village}, {data.district}</div>
          <div className="meta-item"><Building2 size={14}/> {data.phc}</div>
          <div className="meta-item"><Calendar size={14}/> Admitted: {data.visitDate}</div>
        </div>
      </div>

      <div className="case-file-content">
        <div className="content-left">
          {/* Clinical Vitals */}
          <section className="case-section h-card">
            <div className="sec-title"><Activity size={18}/> 1. Tactical Vitals Monitoring</div>
            <div className="vitals-dashboard">
              <div className="v-stat">
                <span className="v-lbl">Temp</span>
                <span className="v-val">{data.vitals.temp}</span>
                <TrendingUp size={14} color="#ef4444" />
              </div>
              <div className="v-stat">
                <span className="v-lbl">BP</span>
                <span className="v-val">{data.vitals.bp}</span>
                <TrendingUp size={14} color="#ef4444" />
              </div>
              <div className="v-stat">
                <span className="v-lbl">Pulse</span>
                <span className="v-val">{data.vitals.pulse}</span>
                <TrendingDown size={14} color="#10b981" />
              </div>
              <div className="v-stat">
                <span className="v-lbl">SpO2</span>
                <span className="v-val">{data.vitals.spo2}</span>
                <CheckCircle2 size={14} color="#10b981" />
              </div>
            </div>
          </section>

          {/* Chief Complaint & Notes */}
          <section className="case-section h-card">
            <div className="sec-title"><ClipboardList size={18}/> 2. Clinical Observations</div>
            <div className="notes-block">
              <div className="symptoms-list">
                {data.symptoms.map(s => <span key={s} className="s-tag">{s}</span>)}
              </div>
              <h4>Chief Complaint:</h4>
              <p>{data.complaint}</p>
            </div>
          </section>

          {/* Prescription & Labs */}
          <div className="grid-2-tactical">
            <section className="case-section h-card">
              <div className="sec-title"><Pill size={18}/> 3. Active Prescription</div>
              <div className="item-list">
                {data.prescription.map((p, idx) => (
                  <div key={idx} className="list-item">
                    <div className="item-icon"><Pill size={14}/></div>
                    <div>
                      <div className="item-name">{p.name}</div>
                      <div className="item-meta">{p.dosage} • {p.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="case-section h-card">
              <div className="sec-title"><TestTube size={18}/> 4. Laboratory Orders</div>
              <div className="item-list">
                {data.labs.map((l, idx) => (
                  <div key={idx} className="list-item">
                    <div className="item-icon"><TestTube size={14}/></div>
                    <div>
                      <div className="item-name">{l}</div>
                      <div className="item-meta">Status: Processing</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="content-right">
          {/* AI Intelligence Panel */}
          <section className="ai-case-intelligence h-card">
            <div className="ai-head">
              <Zap size={20} color="#7c3aed" />
              <h3>AI Disease Intelligence</h3>
            </div>
            
            <div className="ai-case-result">
              <div className="ai-main-label">{data.aiAnalysis.disease}</div>
              <div className="ai-sub-label">{data.aiAnalysis.category} Condition</div>
              
              <div className="ai-case-confidence">
                <div className="conf-track"><div className="conf-fill" style={{ width: `${data.aiAnalysis.confidence}%` }}></div></div>
                <div className="conf-text">Match Reliability: {data.aiAnalysis.confidence}%</div>
              </div>

              <div className="ai-case-codes">
                <div className="case-code">
                  <span className="c-label">ICD-10</span>
                  <span className="c-value">{data.aiAnalysis.icd}</span>
                </div>
                <div className="case-code">
                  <span className="c-label">SNOMED CT</span>
                  <span className="c-value">{data.aiAnalysis.snomed}</span>
                </div>
              </div>

              <div className="epidemiological-alert">
                <AlertTriangle size={16} />
                <div>
                  <strong>Surveillance Alert:</strong>
                  <p>{data.aiAnalysis.epidemiologicalRisk}</p>
                </div>
              </div>
              {/* Feedback Loop */}
              <div className="feedback-loop-p h-card-nested">
                <div className="f-head"><Brain size={14}/> Learning Feedback Loop</div>
                {!feedbackGiven ? (
                  <div className="f-actions">
                    <p>Was this AI classification accurate?</p>
                    <div className="f-btns">
                      <button className="f-btn-y" onClick={() => handleValidation(true)}><CheckCircle2 size={14}/> Yes</button>
                      <button className="f-btn-n" onClick={() => handleValidation(false)}><X size={14}/> No</button>
                    </div>
                  </div>
                ) : (
                  <div className="f-success"><CheckCircle2 size={16}/> Thank you. Feedback submitted.</div>
                )}
              </div>
            </div>

            <div className="ai-actions-h">
              <button className="h-btn h-btn-primary full-btn" onClick={() => setShowCodingLibrary(true)}>
                <Search size={16}/> Search ICD/SNOMED Library
              </button>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button className="h-btn-outline" style={{ borderColor: '#ef4444', color: '#ef4444' }} onClick={() => updateStatus('Critical')}>Escalate ICU</button>
                  <button className="h-btn-outline" style={{ borderColor: '#f59e0b', color: '#f59e0b' }} onClick={() => updateStatus('Observation')}>Stable Ward</button>
                </div>
                <button className="h-btn-outline full-btn" onClick={dischargePatient}>Discharge Patient</button>
              </div>
          </section>

          {/* Trend Detection Engine */}
          <section className="case-timeline h-card">
            <div className="sec-title"><TrendingUp size={18}/> 5. Regional Trend Detection</div>
            <div className="trend-stats">
              <div className="t-stat">
                <span className="t-lbl">Spatial Density</span>
                <span className="t-val">{data.geospatialRisk.activeCases} Cases / {data.geospatialRisk.radius}</span>
              </div>
              <div className="t-stat">
                <span className="t-lbl">Temporal Growth</span>
                <span className="t-val">+140% Weekly</span>
              </div>
            </div>
            <div className="mini-chart-h">
               <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '60px', marginTop: '1rem' }}>
                 {data.trends.map((t, i) => (
                   <div key={i} style={{ flex: 1, background: 'var(--primary)', height: `${(t.count / 24) * 100}%`, borderRadius: '2px', opacity: 0.5 + (i * 0.1) }}></div>
                 ))}
               </div>
            </div>
          </section>

          {/* Disease Cluster Analysis */}
          <section className="case-timeline h-card">
            <div className="sec-title"><MapPin size={18}/> 7. Active Disease Cluster Analysis</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Other active cases with <strong>{data.aiAnalysis.disease}</strong> in <strong>{data.phc}</strong>:
            </p>
            <div className="cluster-list">
              {/* Filter global patients for similar cases */}
              {(typeof patients !== 'undefined' ? patients : [])
                .filter(p => p.disease === data.aiAnalysis.disease && p.id !== data.id && p.phc === data.phc)
                .slice(0, 3)
                .map((p, i) => (
                  <div key={i} className="cluster-item">
                    <div className="c-dot"></div>
                    <div className="c-info">
                      <strong>{p.name}</strong> • {p.room}
                      <span className="c-status">{p.status}</span>
                    </div>
                  </div>
                ))}
              { (typeof patients !== 'undefined' ? patients : []).filter(p => p.disease === data.aiAnalysis.disease && p.id !== data.id && p.phc === data.phc).length === 0 && (
                <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>No other active cases in this facility.</div>
              )}
            </div>
          </section>

          {/* Case History */}
          <section className="case-timeline h-card">
            <div className="sec-title"><Clock size={18}/> 6. Case History</div>
            <div className="timeline-h">
              {(data.clinicalActions || []).map((action, idx) => (
                <div key={idx} className={`tl-item ${idx === 0 ? 'active' : ''}`}>
                  <div className="tl-dot"></div>
                  <div className="tl-content">
                    <div className="tl-time">{action.time}</div>
                    <div className="tl-desc">{action.action} by {action.dr}</div>
                  </div>
                </div>
              ))}
              <div className="tl-item">
                <div className="tl-dot"></div>
                <div className="tl-content">
                  <div className="tl-time">10:15 AM Today</div>
                  <div className="tl-desc">Vitals uploaded via Digital Stethoscope</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <style>{`
        .patient-case-file-view { padding: 2rem; max-width: 1400px; margin: 0 auto; display: flex; flex-direction: column; gap: 2rem; }
        .case-file-header { padding: 2.5rem; border-radius: 32px; border-left: 8px solid var(--primary); }
        .header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .back-btn { background: none; border: none; display: flex; align-items: center; gap: 8px; font-weight: 800; color: var(--text-muted); cursor: pointer; transition: 0.2s; }
        .back-btn:hover { color: var(--primary); transform: translateX(-5px); }
        .header-actions { display: flex; gap: 10px; }
        
        .header-main { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; }
        .patient-id-badge { display: flex; align-items: center; gap: 1.5rem; }
        .avatar-l { width: 72px; height: 72px; background: var(--primary-glow); color: var(--primary); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 900; }
        .patient-id-badge h1 { font-size: 2.2rem; margin: 0; }
        .case-id { color: var(--text-muted); font-weight: 700; margin-top: 4px; }

        .status-indicator .lbl { font-size: 0.7rem; font-weight: 900; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
        .status-val { display: flex; align-items: center; gap: 8px; font-weight: 900; font-size: 1.1rem; margin-top: 4px; }
        .status-dot { width: 10px; height: 10px; border-radius: 50%; box-shadow: 0 0 10px currentColor; }

        .header-meta-grid { display: flex; flex-wrap: wrap; gap: 2rem; padding-top: 2rem; border-top: 1px solid var(--border); }
        .meta-item { display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 0.85rem; color: var(--text-muted); }

        .case-file-content { display: grid; grid-template-columns: 1fr 420px; gap: 2.5rem; }
        .content-left { display: flex; flex-direction: column; gap: 2.5rem; }
        .content-right { display: flex; flex-direction: column; gap: 2.5rem; }
        .sec-title { font-size: 1rem; font-weight: 900; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 10px; color: var(--text); }

        .vitals-dashboard { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .v-stat { background: var(--surface-light); padding: 1.5rem; border-radius: 20px; border: 1px solid var(--border); display: flex; flex-direction: column; gap: 6px; }
        .v-lbl { font-size: 0.7rem; font-weight: 900; color: var(--text-muted); text-transform: uppercase; }
        .v-val { font-size: 1.2rem; font-weight: 900; }

        .notes-block { display: flex; flex-direction: column; gap: 1rem; }
        .symptoms-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .s-tag { background: var(--primary-glow); color: var(--primary); padding: 6px 12px; border-radius: 100px; font-size: 0.8rem; font-weight: 800; }
        .notes-block h4 { margin: 0; font-size: 0.9rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; }
        .notes-block p { font-size: 1.05rem; font-weight: 600; line-height: 1.6; margin: 0; }

        .grid-2-tactical { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .item-list { display: flex; flex-direction: column; gap: 12px; }
        .list-item { display: flex; align-items: center; gap: 12px; background: var(--surface-light); padding: 12px; border-radius: 14px; border: 1px solid var(--border); }
        .item-icon { width: 36px; height: 36px; border-radius: 10px; background: white; display: flex; align-items: center; justify-content: center; color: var(--primary); border: 1px solid var(--border); }
        .item-name { font-weight: 800; font-size: 0.9rem; }
        .item-meta { font-size: 0.75rem; color: var(--text-muted); font-weight: 700; }

        .ai-case-intelligence { border: 2px solid #7c3aed30; border-radius: 28px; }
        .ai-head { display: flex; align-items: center; gap: 12px; margin-bottom: 2rem; }
        .ai-head h3 { margin: 0; font-size: 1.1rem; }
        .ai-main-label { font-size: 1.6rem; font-weight: 900; color: #7c3aed; line-height: 1.2; }
        .ai-sub-label { font-size: 0.85rem; font-weight: 800; color: var(--text-muted); margin-top: 6px; }
        
        .ai-case-confidence { margin: 2rem 0; }
        .conf-track { height: 8px; background: var(--border); border-radius: 10px; overflow: hidden; margin-bottom: 8px; }
        .conf-fill { height: 100%; background: #7c3aed; border-radius: 10px; }
        .conf-text { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-align: right; }

        .ai-case-codes { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 2rem; }
        .case-code { background: var(--surface-light); padding: 12px; border-radius: 12px; border: 1px solid var(--border); }
        .c-label { font-size: 0.6rem; font-weight: 900; color: var(--text-muted); display: block; }
        .c-value { font-family: monospace; font-weight: 900; color: var(--text); font-size: 1rem; }

        .epidemiological-alert p { font-size: 0.8rem; font-weight: 700; margin: 4px 0 0; color: var(--text); }

        .ai-actions-h { display: flex; flex-direction: column; gap: 12px; margin-top: 1.5rem; }
        .full-btn { width: 100%; height: 52px; font-weight: 800; border-radius: 14px; }

        .timeline-h { display: flex; flex-direction: column; gap: 1.5rem; position: relative; padding-left: 20px; }
        .timeline-h::before { content: ''; position: absolute; left: 4px; top: 5px; bottom: 5px; width: 2px; background: var(--border); }
        .tl-item { display: flex; gap: 15px; position: relative; }
        .tl-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--border); border: 2px solid white; position: absolute; left: -20px; top: 4px; z-index: 1; }
        .tl-item.active .tl-dot { background: var(--primary); box-shadow: 0 0 10px var(--primary-glow); }
        .tl-time { font-size: 0.7rem; font-weight: 900; color: var(--primary); text-transform: uppercase; }
        .tl-desc { font-size: 0.85rem; font-weight: 700; color: var(--text); }

        .feedback-loop-p { background: var(--surface-light); padding: 1rem; border-radius: 16px; border: 1px solid var(--border); margin-top: 1rem; }
        .f-head { font-size: 0.65rem; font-weight: 900; color: #7c3aed; text-transform: uppercase; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
        .f-actions p { font-size: 0.75rem; font-weight: 800; margin: 0 0 10px; }
        .f-btns { display: flex; gap: 8px; }
        .f-btns button { flex: 1; padding: 10px; border-radius: 10px; font-size: 0.75rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; transition: 0.2s; }
        .f-btn-y { background: #10b98115; color: #10b981; border: 1px solid #10b98130; }
        .f-btn-y:hover { background: #10b981; color: white; }
        .f-btn-n { background: #ef444415; color: #ef4444; border: 1px solid #ef444430; }
        .f-btn-n:hover { background: #ef4444; color: white; }
        .f-success { font-size: 0.75rem; font-weight: 800; color: #10b981; display: flex; align-items: center; gap: 8px; border: 1px solid #10b98140; padding: 10px; border-radius: 10px; background: #10b98110; }

        .trend-stats { display: flex; gap: 1rem; margin-top: 1rem; }
        .t-stat { flex: 1; display: flex; flex-direction: column; gap: 4px; }
        .t-lbl { font-size: 0.65rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; }
        .t-val { font-size: 0.9rem; font-weight: 900; color: var(--primary); }

        .cluster-list { display: flex; flex-direction: column; gap: 10px; }
        .cluster-item { display: flex; align-items: center; gap: 12px; background: var(--surface-light); padding: 10px; border-radius: 12px; border: 1px solid var(--border); }
        .c-dot { width: 8px; height: 8px; border-radius: 50%; background: #ef4444; }
        .c-info { font-size: 0.75rem; font-weight: 700; display: flex; justify-content: space-between; flex: 1; align-items: center; }
        .c-status { font-size: 0.65rem; background: var(--border); padding: 2px 6px; border-radius: 4px; color: var(--text-muted); }

        @media (max-width: 1000px) {
          .case-file-content { grid-template-columns: 1fr; }
          .ai-case-intelligence { position: static; }
        }
      `}</style>
    </div>
  );
};

export default PatientCaseFile;

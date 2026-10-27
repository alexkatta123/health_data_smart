import React, { useState } from 'react';
import { 
  CheckCircle2, FileSpreadsheet, Activity, 
  ShieldCheck, AlertTriangle, ChevronRight,
  Database, Zap, Info, Search, Filter as FilterIcon,
  Stethoscope, Thermometer, BrainCircuit, Edit3, Save, RotateCcw
} from 'lucide-react';

const MedicalAIReview = ({ onSelect }) => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [isRetraining, setIsRetraining] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [filter, setFilter] = useState('all');
  
  // Feedback Loop State
  const [correctionMode, setCorrectionMode] = useState(false);
  const [correctedDisease, setCorrectedDisease] = useState('');
  const [feedbackNotes, setFeedbackNotes] = useState('');

  const [cases, setCases] = useState([
    { id: "P-8801", symptoms: "High fever, chills, body ache", pred: "Malaria", code: "ICD-B54", conf: "92%", status: "Pending", patient: "Ramesh Kumar", age: 42, vitals: "102°F, Stable BP" },
    { id: "P-8802", symptoms: "Persistent cough, weight loss", pred: "Tuberculosis", code: "ICD-A15", conf: "74%", status: "Low Confidence", patient: "S. Lakshmi", age: 35, vitals: "Normal" },
    { id: "P-8803", symptoms: "Stomach pain, diarrhea", pred: "Gastroenteritis", code: "ICD-A09", conf: "89%", status: "Pending", patient: "K. Mohan", age: 28, vitals: "Dehydrated" },
    { id: "P-8804", symptoms: "Rash, high fever, joint pain", pred: "Dengue Fever", code: "ICD-A90", conf: "95%", status: "Pending", patient: "V. Ravi", age: 45, vitals: "103°F, Low Platelets" },
    { id: "P-8805", symptoms: "Sore throat, fatigue, headache", pred: "Viral Pharyngitis", code: "ICD-J02", conf: "68%", status: "Low Confidence", patient: "Anita Roy", age: 19, vitals: "Normal" },
    { id: "P-8806", symptoms: "Chest pain, shortness of breath", pred: "Pneumonia", code: "ICD-J18", conf: "82%", status: "Pending", patient: "B. Prasad", age: 62, vitals: "94% SpO2" },
    { id: "P-8807", symptoms: "Yellow eyes, dark urine", pred: "Hepatitis A", code: "ICD-B15", conf: "91%", status: "Pending", patient: "P. Swathi", age: 31, vitals: "Jaundiced" },
    { id: "P-8808", symptoms: "Ear pain, drainage", pred: "Otitis Media", code: "ICD-H66", conf: "88%", status: "Pending", patient: "M. Arjun", age: 6, vitals: "Normal" },
    { id: "P-8809", symptoms: "Rapid pulse, sweating, tremor", pred: "Hyperthyroidism", code: "ICD-E05", conf: "71%", status: "Low Confidence", patient: "L. Geetha", age: 38, vitals: "HR 115 bpm" },
    { id: "P-8810", symptoms: "Severe headache, stiff neck", pred: "Meningitis", code: "ICD-G03", conf: "94%", status: "High Priority", patient: "S. Venkat", age: 24, vitals: "104°F, Lethargic" },
    { id: "P-8811", symptoms: "Itchy eyes, sneezing", pred: "Allergic Rhinitis", code: "ICD-J30", conf: "97%", status: "Pending", patient: "K. Divya", age: 12, vitals: "Normal" },
    { id: "P-8812", symptoms: "Burning urination, back pain", pred: "UTI", code: "ICD-N39", conf: "85%", status: "Pending", patient: "D. Srinivas", age: 50, vitals: "Normal" },
    { id: "P-8813", symptoms: "Productive cough, fever", pred: "Bronchitis", code: "ICD-J20", conf: "79%", status: "Low Confidence", patient: "N. Babu", age: 44, vitals: "101°F" },
    { id: "P-8814", symptoms: "Loss of taste, dry cough", pred: "COVID-19", code: "ICD-U07", conf: "96%", status: "High Priority", patient: "A. Reddy", age: 29, vitals: "Normal" },
    { id: "P-8815", symptoms: "Muscle weakness, numbness", pred: "Neuropathy", code: "ICD-G62", conf: "65%", status: "Low Confidence", patient: "G. Murthy", age: 55, vitals: "Stable" }
  ]);

  const filteredCases = cases.filter(c => {
    if (filter === 'low') return parseFloat(c.conf) < 80;
    if (filter === 'high') return parseFloat(c.conf) >= 90;
    return true;
  });

  const handleValidate = () => {
    setShowValidationModal(false);
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      setCases(cases.filter(c => c.id !== selectedCase.id));
    }, 3500);
  };

  const handleRetrain = () => {
    setShowValidationModal(false);
    setIsRetraining(true);
    setTimeout(() => {
      setIsRetraining(false);
      setCorrectionMode(false);
      setCorrectedDisease('');
      setFeedbackNotes('');
      setCases(cases.filter(c => c.id !== selectedCase.id));
    }, 4500);
  };

  const openModal = (c) => {
    setSelectedCase(c);
    setCorrectionMode(false);
    setCorrectedDisease(c.pred);
    setShowValidationModal(true);
  };

  return (
    <div className="review-tab animate-fade">
      <div className="mo-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '28px', padding: '2.5rem', boxShadow: 'var(--card-shadow)' }}>
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
             <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900 }}>Clinical Validation Queue</h3>
             <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Verify AI diagnostic predictions and provide feedback for continuous model learning.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', background: 'var(--surface-light)', padding: '6px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <button 
               className={`filter-chip ${filter === 'all' ? 'active' : ''}`}
               onClick={() => setFilter('all')}
               style={{ background: filter === 'all' ? 'var(--primary)' : 'transparent', border: 'none', color: filter === 'all' ? 'white' : '#64748b', padding: '8px 16px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 900, cursor: 'pointer', transition: '0.3s' }}
            >
               ALL CASES
            </button>
            <button 
               className={`filter-chip ${filter === 'low' ? 'active' : ''}`}
               onClick={() => setFilter('low')}
               style={{ background: filter === 'low' ? 'rgba(244, 63, 94, 0.1)' : 'transparent', border: 'none', color: filter === 'low' ? '#f43f5e' : '#64748b', padding: '8px 16px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 900, cursor: 'pointer', transition: '0.3s' }}
            >
               LOW CONFIDENCE
            </button>
            <button 
               className={`filter-chip ${filter === 'high' ? 'active' : ''}`}
               onClick={() => setFilter('high')}
               style={{ background: filter === 'high' ? 'rgba(16, 185, 129, 0.1)' : 'transparent', border: 'none', color: filter === 'high' ? '#10b981' : '#64748b', padding: '8px 16px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 900, cursor: 'pointer', transition: '0.3s' }}
            >
               HIGH PRIORITY
            </button>
          </div>
        </div>

        <div className="h-table-card" style={{ border: '1px solid var(--border)', borderRadius: '20px', overflowX: 'auto' }}>
           <table className="mo-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
             <thead>
               <tr style={{ background: 'var(--surface-light)' }}>
                 <th style={{ textAlign: 'left', padding: '1.25rem', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase' }}>CASE ID</th>
                 <th style={{ textAlign: 'left', padding: '1.25rem', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase' }}>CLINICAL SYMPTOMS</th>
                 <th style={{ textAlign: 'left', padding: '1.25rem', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase' }}>AI PREDICTION</th>
                 <th style={{ textAlign: 'left', padding: '1.25rem', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase' }}>ICD-10 CODE</th>
                 <th style={{ textAlign: 'left', padding: '1.25rem', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase' }}>CONFIDENCE</th>
                 <th style={{ textAlign: 'right', padding: '1.25rem', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase' }}>ACTION</th>
               </tr>
             </thead>
             <tbody>
               {filteredCases.map((c, i) => (
                 <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                   <td style={{ padding: '1.5rem 1.25rem', color: 'var(--primary)', fontWeight: 900, fontSize: '0.9rem' }}>{c.id}</td>
                   <td style={{ padding: '1.5rem 1.25rem', maxWidth: '250px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{c.symptoms}</td>
                   <td style={{ padding: '1.5rem 1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, color: 'var(--text)' }}>
                         <BrainCircuit size={16} color="var(--primary)" />
                         {c.pred}
                      </div>
                   </td>
                   <td style={{ padding: '1.5rem 1.25rem' }}><code style={{ background: 'var(--surface-light)', border: '1px solid var(--border)', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', color: "var(--text)", fontWeight: 800 }}>{c.code}</code></td>
                   <td style={{ padding: '1.5rem 1.25rem' }}>
                     <div className="conf-pill" style={{ background: parseFloat(c.conf) < 80 ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: parseFloat(c.conf) < 80 ? '#f43f5e' : '#10b981', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 900, display: 'inline-block' }}>
                       {c.conf}
                     </div>
                   </td>
                   <td style={{ padding: '1.5rem 1.25rem', textAlign: 'right' }}>
                     <button 
                        className="h-btn-mini" 
                        style={{ background: 'var(--primary)', border: 'none', color: "var(--text)", padding: '8px 16px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 900, cursor: 'pointer', transition: '0.3s' }}
                        onClick={() => openModal(c)}
                     >
                        REVIEW & TRAIN
                     </button>
                   </td>
                 </tr>
               ))}
               {filteredCases.length === 0 && (
                 <tr>
                   <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                     No cases found matching the criteria.
                   </td>
                 </tr>
               )}
             </tbody>
           </table>
        </div>
      </div>

      {/* Clinical Validation & Feedback Modal */}
      {showValidationModal && (
        <div className="mo-modal-overlay" onClick={() => setShowValidationModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <div className="mo-modal-content tactical animate-fade" style={{ maxWidth: '850px', width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '32px', padding: '3rem', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                 <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '20px', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                       <Stethoscope size={32} />
                    </div>
                    <div>
                       <h2 style={{ margin: 0, color: 'var(--text)' }}>Clinical Validation: {selectedCase?.id}</h2>
                       <p style={{ margin: '4px 0 0', color: 'var(--text-muted)' }}>Diagnostic Review for {selectedCase?.patient} • Age: {selectedCase?.age}</p>
                    </div>
                 </div>
                 <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1px' }}>AI CONFIDENCE</span>
                    <strong style={{ display: 'block', fontSize: '1.5rem', color: parseFloat(selectedCase?.conf) < 80 ? '#f43f5e' : '#10b981' }}>{selectedCase?.conf}</strong>
                 </div>
              </div>

              <div className="validation-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
                 <div className="v-clinical-side">
                    <h4 style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '1rem', letterSpacing: '1px' }}>CLINICAL DATA (INPUT)</h4>
                    <div style={{ background: 'var(--surface-light)', padding: '1.5rem', borderRadius: '24px', border: '1px solid var(--border)' }}>
                       <div style={{ marginBottom: '1.5rem' }}>
                          <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '8px' }}>REPORTED SYMPTOMS</span>
                          <p style={{ margin: 0, fontWeight: 700, lineHeight: 1.4, color: 'var(--text)' }}>{selectedCase?.symptoms}</p>
                       </div>
                       <div>
                          <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '8px' }}>PATIENT VITALS</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f43f5e', fontWeight: 800 }}>
                             <Thermometer size={16} />
                             {selectedCase?.vitals}
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="v-intelligence-side">
                    <h4 style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '1rem', letterSpacing: '1px' }}>AI DIAGNOSIS (OUTPUT)</h4>
                    <div style={{ background: 'var(--primary-glow)', padding: '1.5rem', borderRadius: '24px', border: '1px solid var(--border)' }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                          <div>
                             <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '8px' }}>PRIMARY PREDICTION</span>
                             <strong style={{ fontSize: '1.2rem', color: 'var(--text)' }}>{selectedCase?.pred}</strong>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                             <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '8px' }}>ICD-10 TAG</span>
                             <code style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '4px 8px', borderRadius: '6px', color: "var(--text)", fontWeight: 800 }}>{selectedCase?.code}</code>
                          </div>
                       </div>
                       <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, fontWeight: 600 }}>AI Engine cross-referenced symptoms with regional clinical records. Differential diagnosis suggests 4% variance.</p>
                    </div>
                 </div>
              </div>

              {/* Feedback Loop Area */}
              {correctionMode && (
                 <div className="feedback-loop-area animate-fade" style={{ background: 'rgba(245, 158, 11, 0.05)', padding: '1.5rem', borderRadius: '24px', border: '1px solid rgba(245, 158, 11, 0.2)', marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#f59e0b' }}>
                       <BrainCircuit size={20} />
                       <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 900 }}>AI Learning Feedback</h4>
                    </div>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                       <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '8px' }}>CORRECTED CLASSIFICATION</label>
                       <input 
                          type="text" 
                          value={correctedDisease}
                          onChange={(e) => setCorrectedDisease(e.target.value)}
                          style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', outline: 'none', fontWeight: 700 }}
                          placeholder="e.g., Dengue Fever"
                       />
                    </div>
                    
                    <div>
                       <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '8px' }}>CLINICAL NOTES FOR AI RETRAINING (OPTIONAL)</label>
                       <textarea 
                          value={feedbackNotes}
                          onChange={(e) => setFeedbackNotes(e.target.value)}
                          style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', outline: 'none', fontWeight: 600, minHeight: '80px', resize: 'vertical' }}
                          placeholder="Explain why the AI prediction was inaccurate to improve future model weights..."
                       />
                    </div>
                 </div>
              )}

              <div style={{ display: 'flex', gap: '15px' }}>
                 {!correctionMode ? (
                   <>
                     <button className="secondary-btn" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px' }} onClick={() => setCorrectionMode(true)}>
                        <Edit3 size={18} /> OVERRIDE AI PREDICTION
                     </button>
                     <button 
                        className="h-btn h-btn-primary" 
                        style={{ flex: 2, background: 'var(--primary)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px' }}
                        onClick={handleValidate}
                     >
                        <CheckCircle2 size={18} /> CONFIRM & PROPAGATE
                     </button>
                   </>
                 ) : (
                   <>
                     <button className="secondary-btn" style={{ flex: 1, padding: '16px' }} onClick={() => setCorrectionMode(false)}>
                        CANCEL CORRECTION
                     </button>
                     <button 
                        className="h-btn h-btn-primary" 
                        style={{ flex: 2, background: '#f59e0b', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px', color: "var(--text)" }}
                        onClick={handleRetrain}
                     >
                        <RotateCcw size={18} /> SUBMIT FEEDBACK & RETRAIN MODEL
                     </button>
                   </>
                 )}
              </div>
           </div>
        </div>
      )}

      {/* Confirmation Sweeps */}
      {isValidating && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.9)', zIndex: 7000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
           <div className="radar-animation" style={{ width: 160, height: 160, borderRadius: '50%', border: '2px solid var(--primary)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, var(--primary) 0%, transparent 20%)', animation: 'sweep 2s linear infinite' }}></div>
              <ShieldCheck size={48} color="var(--primary)" />
           </div>
           <h2 style={{ letterSpacing: '4px', fontWeight: 900, color: 'var(--primary)' }}>VALIDATING CLINICAL CASE...</h2>
           <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontWeight: 800 }}>PROPAGATING: {selectedCase?.id} • SYNCHRONIZING WITH STATE HEALTH CLOUD</p>
        </div>
      )}

      {isRetraining && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.9)', zIndex: 7000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
           <div className="radar-animation" style={{ width: 160, height: 160, borderRadius: '50%', border: '2px solid #f59e0b', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, #f59e0b 0%, transparent 20%)', animation: 'sweep 1.5s linear infinite' }}></div>
              <BrainCircuit size={48} color="#f59e0b" />
           </div>
           <h2 style={{ letterSpacing: '4px', fontWeight: 900, color: '#f59e0b' }}>UPDATING NEURAL WEIGHTS...</h2>
           <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontWeight: 800 }}>PROCESSING OFFICER FEEDBACK FOR CASE: {selectedCase?.id}</p>
        </div>
      )}

      <style>{`
        .mo-card { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 1.5rem; }
        .h-btn h-btn-primary { background: var(--primary); color: var(--text); border: none; padding: 12px 24px; border-radius: 12px; font-weight: 800; cursor: pointer; transition: 0.3s; }
        .h-btn h-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .secondary-btn { background: var(--surface-light); border: 1px solid var(--border); color: var(--text); padding: 12px 24px; border-radius: 12px; font-weight: 800; cursor: pointer; transition: 0.3s; }
        .secondary-btn:hover { background: var(--border); }
        
        .h-btn-mini:hover { filter: brightness(1.2); transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        
        @keyframes sweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default MedicalAIReview;

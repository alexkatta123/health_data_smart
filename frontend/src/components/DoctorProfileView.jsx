import React from 'react';
import { 
  UserCircle, Star, Phone, Mail, 
  ChevronLeft, Calendar, Award, 
  BookOpen, FileText, Activity,
  Clock, ShieldCheck
} from 'lucide-react';

const DoctorProfileView = ({ doctor, onBack }) => {
  if (!doctor) return null;

  return (
    <div className="doctor-profile-view animate-fade">
      <div className="profile-header-strip">
         <button className="back-btn" onClick={onBack}>
            <ChevronLeft size={20} /> Back to Staff Registry
         </button>
         <div className="header-actions">
            <button className="p-btn-secondary"><Mail size={18} /> Message</button>
            <button className="p-btn-primary"><Phone size={18} /> Contact Doctor</button>
         </div>
      </div>

      <div className="profile-hero mo-card">
         <div className="hero-content">
            <div className="hero-avatar">
               <UserCircle size={120} />
            </div>
            <div className="hero-text">
               <div className="hero-top">
                  <h1>{doctor.name}</h1>
                  <span className={`status-tag ${doctor.status.toLowerCase().replace(' ', '-')}`}>{doctor.status}</span>
               </div>
               <p className="hero-spec">{doctor.spec} Specialist • Senior Medical Consultant</p>
               <div className="hero-badges">
                  <div className="h-badge"><Award size={14} /> Top Rated</div>
                  <div className="h-badge"><ShieldCheck size={14} /> Verified Professional</div>
               </div>
            </div>
         </div>
         
         <div className="hero-metrics">
            <div className="h-metric">
               <span className="m-val">{doctor.exp}</span>
               <span className="m-lbl">Experience</span>
            </div>
            <div className="h-metric">
               <span className="m-val">{doctor.rating}</span>
               <span className="m-lbl">Avg. Rating</span>
            </div>
            <div className="h-metric">
               <span className="m-val">{doctor.patients}+</span>
               <span className="m-lbl">Total Patients</span>
            </div>
         </div>
      </div>

      <div className="profile-grid">
         <div className="profile-main">
            <div className="mo-card section">
               <h3><BookOpen size={20} /> Professional Background</h3>
               <p>Specializing in advanced {doctor.spec.toLowerCase()} procedures and patient-centered care. Committed to clinical excellence and the integration of medical intelligence into daily practice. Leading various statewide initiatives for health surveillance and diagnostic optimization.</p>
               
               <div className="edu-list">
                  <div className="edu-item">
                     <div className="edu-icon"><Award size={18} /></div>
                     <div>
                        <strong>MD, {doctor.spec}</strong>
                        <p>All India Institute of Medical Sciences (AIIMS)</p>
                     </div>
                  </div>
                  <div className="edu-item">
                     <div className="edu-icon"><BookOpen size={18} /></div>
                     <div>
                        <strong>Board Certified Surgeon</strong>
                        <p>National Board of Examinations</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="mo-card section">
               <h3><Activity size={20} /> Clinical Performance</h3>
               <div className="perf-grid">
                  <div className="perf-item">
                     <div className="perf-top">
                        <span>Success Rate</span>
                        <strong>98.4%</strong>
                     </div>
                     <div className="perf-bar"><div className="fill" style={{ width: '98%' }}></div></div>
                  </div>
                  <div className="perf-item">
                     <div className="perf-top">
                        <span>Patient Feedback</span>
                        <strong>4.9/5.0</strong>
                     </div>
                     <div className="perf-bar"><div className="fill" style={{ width: '95%' }}></div></div>
                  </div>
               </div>
            </div>
         </div>

         <div className="profile-sidebar">
            <div className="mo-card section">
               <h3><Calendar size={20} /> OPD Schedule</h3>
               <div className="schedule-list">
                  {['Monday', 'Wednesday', 'Friday'].map((day, i) => (
                    <div key={i} className="sched-item">
                       <span>{day}</span>
                       <strong>09:00 AM - 02:00 PM</strong>
                    </div>
                  ))}
               </div>
               <button className="schedule-btn">Update Availability</button>
            </div>

            <div className="mo-card section">
               <h3><FileText size={20} /> Certifications</h3>
               <div className="cert-list">
                  <div className="cert-item">Standard ACLS Protocols</div>
                  <div className="cert-item">Advanced Robotic Surgery</div>
                  <div className="cert-item">State Surveillance Training</div>
               </div>
            </div>
         </div>
      </div>

      <style>{`
        .doctor-profile-view { display: flex; flex-direction: column; gap: 2rem; }
        
        .profile-header-strip { display: flex; justify-content: space-between; align-items: center; }
        .back-btn { background: transparent; border: none; color: var(--text-muted); font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 0.9rem; transition: 0.2s; }
        .back-btn:hover { color: var(--text); }
        
        .header-actions { display: flex; gap: 12px; }
        .p-btn-secondary { padding: 10px 20px; border-radius: 12px; background: var(--surface); border: 1px solid var(--border); color: var(--text); font-weight: 700; display: flex; align-items: center; gap: 8px; cursor: pointer; }
        .p-btn-primary { padding: 10px 20px; border-radius: 12px; background: var(--primary); border: none; color: var(--text); font-weight: 700; display: flex; align-items: center; gap: 8px; cursor: pointer; box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3); }

        .profile-hero { padding: 3rem; background: linear-gradient(135deg, var(--surface) 0%, var(--bg) 100%); border: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
        .hero-content { display: flex; gap: 3rem; align-items: center; }
        .hero-avatar { width: 140px; height: 140px; border-radius: 40px; background: rgba(14, 165, 233, 0.1); color: var(--primary); display: flex; align-items: center; justify-content: center; border: 2px solid rgba(14, 165, 233, 0.2); }
        
        .hero-top { display: flex; align-items: center; gap: 20px; margin-bottom: 8px; }
        .hero-top h1 { margin: 0; font-size: 2.2rem; font-weight: 900; }
        .hero-spec { font-size: 1.1rem; color: var(--primary); font-weight: 800; margin: 0 0 15px; }
        
        .hero-badges { display: flex; gap: 10px; }
        .h-badge { display: flex; align-items: center; gap: 6px; padding: 4px 12px; background: var(--surface); border: 1px solid var(--border); border-radius: 100px; font-size: 0.75rem; font-weight: 700; color: var(--text-muted); }

        .hero-metrics { display: flex; gap: 3rem; padding-left: 3rem; border-left: 1px solid var(--border); }
        .h-metric { text-align: center; }
        .m-val { display: block; font-size: 1.8rem; font-weight: 900; color: var(--text); }
        .m-lbl { font-size: 0.75rem; color: var(--text-muted); font-weight: 800; text-transform: uppercase; margin-top: 4px; display: block; }

        .profile-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 2rem; }
        .section { padding: 2.5rem; }
        .section h3 { margin: 0 0 1.5rem; font-size: 1.1rem; font-weight: 900; display: flex; align-items: center; gap: 10px; color: var(--text); }
        .section p { margin: 0; font-size: 1rem; color: var(--text-muted); line-height: 1.8; }

        .edu-list { margin-top: 2rem; display: grid; gap: 1.5rem; }
        .edu-item { display: flex; gap: 15px; align-items: flex-start; }
        .edu-icon { width: 36px; height: 36px; border-radius: 10px; background: var(--surface); display: flex; align-items: center; justify-content: center; color: var(--primary); }
        .edu-item strong { display: block; font-size: 1rem; margin-bottom: 4px; }
        .edu-item p { font-size: 0.85rem !important; }

        .perf-grid { display: grid; gap: 2rem; margin-top: 1rem; }
        .perf-top { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.9rem; font-weight: 700; }
        .perf-bar { height: 8px; background: var(--bg); border-radius: 100px; overflow: hidden; }
        .perf-bar .fill { height: 100%; background: var(--primary); border-radius: 100px; }

        .schedule-list { display: grid; gap: 12px; margin-bottom: 2rem; }
        .sched-item { display: flex; justify-content: space-between; padding: 12px; background: var(--bg); border-radius: 12px; border: 1px solid var(--border); font-size: 0.85rem; }
        .sched-item span { color: var(--text-muted); font-weight: 700; }
        .schedule-btn { width: 100%; padding: 12px; border-radius: 12px; background: transparent; border: 1px solid var(--border); color: var(--text); font-weight: 800; cursor: pointer; transition: 0.2s; }
        .schedule-btn:hover { background: var(--text); color: var(--surface); }

        .cert-list { display: grid; gap: 10px; }
        .cert-item { padding: 10px 15px; background: rgba(16, 185, 129, 0.05); color: #10b981; border-radius: 10px; font-size: 0.8rem; font-weight: 700; border: 1px solid rgba(16, 185, 129, 0.1); }
      `}</style>
    </div>
  );
};

export default DoctorProfileView;

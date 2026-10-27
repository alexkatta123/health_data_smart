import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  MoreVertical, 
  CheckCircle2, 
  AlertTriangle,
  Stethoscope,
  Activity,
  UserPlus,
  RefreshCcw
} from 'lucide-react';

const MasterSchedule = ({ onBack }) => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const shifts = [
    { time: '08:00 - 14:00', label: 'MORNING SHIFT', type: 'primary' },
    { time: '14:00 - 20:00', label: 'AFTERNOON SHIFT', type: 'secondary' },
    { time: '20:00 - 08:00', label: 'NIGHT SHIFT', type: 'emergency' }
  ];

  const scheduleData = {
    'Monday': [
      { dept: 'CARDIOLOGY', shifts: [{ staff: ['Dr. Sameer Khan', 'Dr. Aruna'], load: 'High' }, { staff: ['Dr. Priya Sharma'], load: 'Normal' }, { staff: ['Dr. Robert Wilson'], load: 'Low' }] },
      { dept: 'PEDIATRICS', shifts: [{ staff: ['Dr. Anjali Rao'], load: 'Normal' }, { staff: ['Dr. Varma'], load: 'High' }, { staff: ['Dr. Chen'], load: 'Normal' }] },
      { dept: 'EMERGENCY', shifts: [{ staff: ['Dr. Michael Chen', 'Dr. Priya'], load: 'Critical' }, { staff: ['Dr. Sameer Khan'], load: 'High' }, { staff: ['Dr. Anjali Rao'], load: 'Critical' }] },
      { dept: 'NEUROLOGY', shifts: [{ staff: ['Dr. Robert Wilson'], load: 'Low' }, { staff: ['Dr. Aruna'], load: 'Normal' }, { staff: ['Dr. Varma'], load: 'Low' }] }
    ],
    'Tuesday': [
      { dept: 'CARDIOLOGY', shifts: [{ staff: ['Dr. Aruna'], load: 'Normal' }, { staff: ['Dr. Sameer Khan'], load: 'High' }, { staff: ['Dr. Priya'], load: 'Normal' }] },
      { dept: 'EMERGENCY', shifts: [{ staff: ['Dr. Varma', 'Dr. Chen'], load: 'High' }, { staff: ['Dr. Michael Chen'], load: 'Critical' }, { staff: ['Dr. Priya'], load: 'High' }] }
    ],
    'Wednesday': [
      { dept: 'PEDIATRICS', shifts: [{ staff: ['Dr. Chen'], load: 'High' }, { staff: ['Dr. Anjali Rao'], load: 'Normal' }, { staff: ['Dr. Sameer Khan'], load: 'High' }] },
      { dept: 'NEUROLOGY', shifts: [{ staff: ['Dr. Michael Chen'], load: 'Normal' }, { staff: ['Dr. Robert Wilson'], load: 'Low' }, { staff: ['Dr. Aruna'], load: 'Normal' }] }
    ],
    'Thursday': [
      { dept: 'CARDIOLOGY', shifts: [{ staff: ['Dr. Sameer Khan'], load: 'High' }, { staff: ['Dr. Priya'], load: 'Normal' }, { staff: ['Dr. Varma'], load: 'Low' }] },
      { dept: 'EMERGENCY', shifts: [{ staff: ['Dr. Anjali Rao'], load: 'Critical' }, { staff: ['Dr. Michael Chen'], load: 'High' }, { staff: ['Dr. Robert Wilson'], load: 'Critical' }] }
    ],
    'Friday': [
      { dept: 'PEDIATRICS', shifts: [{ staff: ['Dr. Varma'], load: 'Normal' }, { staff: ['Dr. Chen'], load: 'High' }, { staff: ['Dr. Priya'], load: 'Normal' }] },
      { dept: 'CARDIOLOGY', shifts: [{ staff: ['Dr. Robert Wilson'], load: 'High' }, { staff: ['Dr. Aruna'], load: 'Normal' }, { staff: ['Dr. Sameer Khan'], load: 'High' }] }
    ],
    'Saturday': [
      { dept: 'EMERGENCY', shifts: [{ staff: ['Dr. Michael Chen', 'Dr. Varma'], load: 'Critical' }, { staff: ['Dr. Priya'], load: 'High' }, { staff: ['Dr. Sameer Khan'], load: 'Critical' }] }
    ],
    'Sunday': [
      { dept: 'EMERGENCY', shifts: [{ staff: ['Dr. Robert Wilson'], load: 'High' }, { staff: ['Dr. Aruna'], load: 'Normal' }, { staff: ['Dr. Chen'], load: 'Critical' }] }
    ]
  };

  const currentDayData = scheduleData[selectedDay] || scheduleData['Monday'];

  return (
    <div className="master-schedule-portal animate-fade">
      
      {/* Tactical Header */}
      <div style={{ marginBottom: '1rem' }}>
        <button className="tactical-btn-icon" onClick={onBack} style={{ display: 'flex', gap: '8px', width: 'auto', padding: '0 16px' }}>
          <ChevronLeft size={18} /> Back to Doctors
        </button>
      </div>
      <div className="ms-header">
        <div className="h-left">
           <div className="h-icon-box"><Calendar size={28} /></div>
           <div className="h-text">
              <h1>Clinical Master Schedule</h1>
              <p>Dynamic statewide staff allocation & shift governance matrix.</p>
           </div>
        </div>
        <div className="h-right">
           <button className="tactical-btn-p"><UserPlus size={18} /> Re-allocate Staff</button>
           <button className="tactical-btn-icon"><RefreshCcw size={18} /></button>
        </div>
      </div>

      {/* Timeline Controls */}
      <div className="ms-controls">
         <div className="day-selector-p">
            {days.map(day => (
              <button 
                key={day} 
                className={`day-btn ${selectedDay === day ? 'active' : ''}`}
                onClick={() => setSelectedDay(day)}
              >
                {day.substring(0, 3).toUpperCase()}
              </button>
            ))}
         </div>
         <div className="current-date-p">
            <ChevronLeft size={20} className="cursor-pointer" />
            <span>Week 16: April 20 - April 26, 2026</span>
            <ChevronRight size={20} className="cursor-pointer" />
         </div>
      </div>

      {/* Schedule Matrix */}
      <div className="schedule-matrix-p">
         {/* Shift Headers */}
         <div className="matrix-header">
            <div className="mh-label">DEPARTMENT</div>
            {shifts.map((s, i) => (
              <div key={i} className="mh-shift">
                 <div className="shift-time"><Clock size={12} /> {s.time}</div>
                 <div className="shift-label">{s.label}</div>
              </div>
            ))}
         </div>

         {/* Matrix Body */}
         <div className="matrix-body">
            {currentDayData.map((row, i) => (
              <div key={i} className="matrix-row">
                 <div className="row-dept">
                    <strong>{row.dept}</strong>
                    <div className="load-indicator">
                       <div className="dot" style={{ background: '#10b981' }}></div>
                       SYNCED
                    </div>
                 </div>
                 <div className="row-cells">
                    {row.shifts.map((shift, sIdx) => (
                      <div key={sIdx} className="matrix-cell">
                         <div className="staff-assignment active" style={{ borderLeftColor: sIdx === 0 ? '#0ea5e9' : sIdx === 1 ? '#8b5cf6' : '#f43f5e' }}>
                            <div className="sa-top" style={{ color: sIdx === 0 ? '#0ea5e9' : sIdx === 1 ? '#8b5cf6' : '#f43f5e' }}>
                               <Users size={14} />
                               <span>{shift.staff.length} Assigned</span>
                            </div>
                            <div className="sa-list">
                               {shift.staff.map((name, ni) => <div key={ni} className="sa-name">{name}</div>)}
                            </div>
                            <div className="sa-status" style={{ color: shift.load === 'Critical' ? '#f43f5e' : shift.load === 'High' ? '#f59e0b' : '#10b981' }}>
                               <Activity size={12} /> {shift.load} LOAD
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            ))}
         </div>
      </div>

      <style>{`
        .master-schedule-portal { padding: 1rem 0; }
        
        .ms-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
        .h-left { display: flex; align-items: center; gap: 2rem; }
        .h-icon-box { width: 64px; height: 64px; background: rgba(14, 165, 233, 0.1); color: var(--primary); border-radius: 20px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(14, 165, 233, 0.2); }
        .h-text h1 { font-size: 1.8rem; font-weight: 900; margin: 0; }
        .h-text p { color: var(--text-muted); font-weight: 600; margin-top: 4px; }
        .h-right { display: flex; gap: 1rem; }

        .ms-controls { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          background: var(--surface); 
          padding: 1.25rem 2rem; 
          border-radius: 24px; 
          border: 1px solid rgba(255,255,255,0.05);
          margin-bottom: 2rem;
        }
        .day-selector-p { display: flex; gap: 10px; }
        .day-btn { padding: 8px 16px; border-radius: 10px; border: none; background: transparent; color: var(--text-muted); font-weight: 900; font-size: 0.75rem; cursor: pointer; transition: 0.3s; }
        .day-btn.active { background: var(--primary); color: var(--text); }
        .current-date-p { display: flex; align-items: center; gap: 20px; font-weight: 800; color: var(--text-muted); font-size: 0.9rem; }

        .schedule-matrix-p { background: var(--surface); border: 1px solid var(--border); border-radius: 32px; overflow: hidden; }
        .matrix-header { display: grid; grid-template-columns: 280px repeat(3, 1fr); background: var(--surface); border-bottom: 1px solid var(--border); }
        .mh-label { padding: 1.5rem 2.5rem; font-size: 0.7rem; font-weight: 900; color: var(--text-muted); letter-spacing: 2px; }
        .mh-shift { padding: 1.5rem 2rem; border-left: 1px solid rgba(255,255,255,0.03); }
        .shift-time { display: flex; align-items: center; gap: 8px; font-size: 0.7rem; font-weight: 900; color: var(--text-muted); margin-bottom: 4px; }
        .shift-label { font-size: 0.85rem; font-weight: 900; color: var(--text); }

        .matrix-row { display: grid; grid-template-columns: 280px 1fr; border-bottom: 1px solid rgba(255,255,255,0.03); transition: 0.3s; }
        .matrix-row:hover { background: var(--surface); }
        .row-dept { padding: 2.5rem; border-right: 1px solid rgba(255,255,255,0.03); }
        .row-dept strong { display: block; font-size: 1.1rem; font-weight: 900; color: var(--text); margin-bottom: 8px; }
        .load-indicator { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; font-weight: 800; color: var(--text-muted); }
        .load-indicator .dot { width: 8px; height: 8px; border-radius: 50%; }

        .row-cells { display: grid; grid-template-columns: repeat(3, 1fr); }
        .matrix-cell { padding: 1.5rem; border-right: 1px solid rgba(255,255,255,0.02); display: flex; align-items: center; justify-content: center; min-height: 180px; }
        .cell-empty { color: #1e293b; font-weight: 900; font-size: 0.8rem; letter-spacing: 2px; }

        .staff-assignment { 
          background: var(--surface); 
          border-radius: 20px; 
          padding: 1.25rem; 
          width: 100%; 
          border-left: 4px solid var(--primary); 
          transition: 0.3s;
        }
        .staff-assignment.active:hover { transform: scale(1.02); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .sa-top { display: flex; align-items: center; gap: 10px; margin-bottom: 1rem; color: var(--primary); font-size: 0.75rem; font-weight: 900; }
        .sa-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 1rem; }
        .sa-name { font-size: 0.95rem; font-weight: 800; color: var(--text); }
        .sa-status { display: flex; align-items: center; gap: 8px; font-size: 0.65rem; font-weight: 900; color: #10b981; text-transform: uppercase; }

        .tactical-btn-p { background: var(--surface); border: none; padding: 12px 24px; border-radius: 12px; color: var(--text); font-weight: 900; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: 0.3s; box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3); }
        .tactical-btn-p:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(14, 165, 233, 0.4); }
        .tactical-btn-icon { width: 48px; height: 48px; background: var(--surface); border: 1px solid rgba(255,255,255,0.05); color: var(--text-muted); border-radius: 12px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s; }
        .tactical-btn-icon:hover { color: var(--text); background: var(--surface); }
      `}</style>
    </div>
  );
};

export default MasterSchedule;

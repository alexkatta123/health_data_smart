import React, { useState } from 'react';
import { 
  Calendar, Clock, Plus, 
  Search, Filter, User, 
  ChevronLeft, ChevronRight, CheckCircle2,
  AlertCircle, MoreVertical, MapPin, LayoutGrid, List,
  Edit2
} from 'lucide-react';

const HospitalAppointments = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [apptFilter, setApptFilter] = useState('upcoming'); // 'upcoming' or 'past'
  const [showNewAppt, setShowNewAppt] = useState(false);
  const [isMobilizing, setIsMobilizing] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [doctorFilter, setDoctorFilter] = useState('All');

  const [appointments, setAppointments] = useState([
    { id: 'APT-1001', time: '09:00 AM', patient: 'Ravi Kumar', doctor: 'Dr. Khan', type: 'Follow-up', status: 'Confirmed', period: 'upcoming' },
    { id: 'APT-1002', time: '10:30 AM', patient: 'Sita Devi', doctor: 'Dr. Sharma', type: 'Consultation', status: 'Pending', period: 'upcoming' },
    { id: 'APT-1003', time: '11:15 AM', patient: 'Anil Gupta', doctor: 'Dr. Rao', type: 'Diagnostic Review', status: 'Confirmed', period: 'upcoming' },
    { id: 'APT-1004', time: '01:45 PM', patient: 'Priya Verma', doctor: 'Dr. Wilson', type: 'Post-Surgery', status: 'Cancelled', period: 'upcoming' },
    { id: 'APT-1005', time: '03:00 PM', patient: 'Karan Singh', doctor: 'Dr. Khan', type: 'General Checkup', status: 'Confirmed', period: 'upcoming' },
    { id: 'APT-1006', time: '08:30 AM', patient: 'Meera Bai', doctor: 'Dr. Rao', type: 'Initial Review', status: 'Completed', period: 'past' },
    { id: 'APT-1007', time: '10:00 AM', patient: 'Suresh Raina', doctor: 'Dr. Khan', type: 'Vaccination', status: 'Completed', period: 'past' },
  ]);

  const [newAppt, setNewAppt] = useState({ patient: '', doctor: 'Dr. Khan (General)', type: 'Consultation', time: '09:00 AM' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const filteredAppts = appointments.filter(a => {
    const matchesSearch = a.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         a.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         a.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPeriod = a.period === apptFilter;
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    const matchesDoctor = doctorFilter === 'All' || a.doctor === doctorFilter;
    return matchesSearch && matchesPeriod && matchesStatus && matchesDoctor;
  });

  const handleAddAppointment = () => {
    if (isEditing) {
      setAppointments(prev => prev.map(a => a.id === editingId ? { ...a, ...newAppt, doctor: newAppt.doctor.split(' (')[0] } : a));
    } else {
      const id = `APT-${Math.floor(Math.random() * 9000) + 1000}`;
      setAppointments(prev => [{
        ...newAppt,
        id,
        doctor: newAppt.doctor.split(' (')[0],
        status: 'Confirmed',
        period: 'upcoming'
      }, ...prev]);
    }
    setShowNewAppt(false);
    setIsEditing(false);
    setNewAppt({ patient: '', doctor: 'Dr. Khan (General)', type: 'Consultation', time: '09:00 AM' });
  };

  const handleEditAppointment = (appt) => {
    setNewAppt({
      patient: appt.patient,
      doctor: `${appt.doctor} (General)`,
      type: appt.type,
      time: appt.time
    });
    setEditingId(appt.id);
    setIsEditing(true);
    setShowNewAppt(true);
  };

  const handleDeleteAppointment = (id) => {
    if (window.confirm('Strike clinical booking from statewide registry?')) {
      setAppointments(prev => prev.filter(a => a.id !== id));
    }
  };

  return (
    <div className="hospital-appointments animate-fade">
      <div className="page-header-h">
        <div className="title-area-h">
          <h2>Appointments Schedule</h2>
          <p>Manage patient bookings, doctor availability, and clinic schedules.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
            <button 
               onClick={() => setViewMode('list')}
               style={{ background: viewMode === 'list' ? 'white' : 'transparent', color: viewMode === 'list' ? 'black' : 'var(--text)', border: 'none', padding: '10px 20px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
               <List size={18} /> List
            </button>
            <button 
               onClick={() => setViewMode('calendar')}
               style={{ background: viewMode === 'calendar' ? 'white' : 'transparent', color: viewMode === 'calendar' ? 'black' : 'var(--text)', border: 'none', borderLeft: '1px solid var(--border)', padding: '10px 20px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
               <Calendar size={18} /> Calendar
            </button>
          </div>
          <button className="h-btn-primary" onClick={() => { setIsEditing(false); setShowNewAppt(true); }}><Plus size={18} /> New Appointment</button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="appt-layout">
          {/* Calendar Sidebar */}
          <aside className="appt-sidebar">
             <div className="mini-calendar">
                <div className="cal-header">
                   <button><ChevronLeft size={16} /></button>
                   <span>April 2026</span>
                   <button><ChevronRight size={16} /></button>
                </div>
                <div className="cal-grid">
                   {['S','M','T','W','T','F','S'].map(d => <div key={d} className="cal-day-label">{d}</div>)}
                   {Array.from({ length: 30 }).map((_, i) => (
                     <div key={i} className={`cal-day ${i === 23 ? 'active' : ''} ${[5, 12, 19, 26].includes(i) ? 'has-appt' : ''}`}>
                        {i + 1}
                     </div>
                   ))}
                </div>
             </div>

             <div className="appt-summary-card">
                <h3>Today's Summary</h3>
                <div className="a-sum-item">
                   <span>Total Bookings</span>
                   <strong>24</strong>
                </div>
                <div className="a-sum-item">
                   <span>Confirmed</span>
                   <strong className="text-success">18</strong>
                </div>
                <div className="a-sum-item">
                   <span>Pending</span>
                   <strong className="text-warning">06</strong>
                </div>
             </div>
          </aside>

          {/* Appointment List */}
          <main className="appt-main">
             <div className="appt-list-header" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', background: 'var(--surface)', padding: '1rem 1.5rem', borderRadius: '20px', border: '1px solid var(--border)' }}>
                <div className="h-search" style={{ flex: 1, minWidth: '250px', display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg)', padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                   <Search size={16} />
                   <input 
                     type="text" 
                     placeholder="Search patient, doctor, or type..." 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     style={{ background: 'transparent', border: 'none', color: 'var(--text)', outline: 'none', width: '100%', fontSize: '0.9rem' }}
                   />
                </div>
                
                <div className="filter-pivot" style={{ background: 'var(--bg)', padding: '6px 12px', borderRadius: '10px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)' }}>PHYSICIAN</span>
                   <select 
                      value={doctorFilter}
                      onChange={e => setDoctorFilter(e.target.value)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text)', outline: 'none', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                   >
                      <option value="All">All Doctors</option>
                      <option>Dr. Khan</option>
                      <option>Dr. Sharma</option>
                      <option>Dr. Rao</option>
                      <option>Dr. Wilson</option>
                   </select>
                </div>

                <div className="h-filters" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                   <button className={`f-btn ${statusFilter === 'All' ? 'active' : ''}`} onClick={() => setStatusFilter('All')}>All</button>
                   <button className={`f-btn ${statusFilter === 'Confirmed' ? 'active' : ''}`} onClick={() => setStatusFilter('Confirmed')}>Confirmed</button>
                   <button className={`f-btn ${statusFilter === 'Pending' ? 'active' : ''}`} onClick={() => setStatusFilter('Pending')}>Pending</button>
                   <button className={`f-btn ${statusFilter === 'Cancelled' ? 'active' : ''}`} onClick={() => setStatusFilter('Cancelled')}>Cancelled</button>
                   <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 5px' }}></div>
                   <button 
                      className={`f-btn ${apptFilter === 'upcoming' ? 'active' : ''}`}
                      onClick={() => setApptFilter('upcoming')}
                   >
                      Upcoming
                   </button>
                   <button 
                      className={`f-btn ${apptFilter === 'past' ? 'active' : ''}`}
                      onClick={() => setApptFilter('past')}
                   >
                      Past
                   </button>
                </div>
             </div>

             <div className="appt-items">
                {filteredAppts.length > 0 ? filteredAppts.map((a, i) => (
                  <div key={i} className="appt-card">
                     <div className="appt-time">
                        <Clock size={16} />
                        <span>{a.time}</span>
                     </div>
                     
                     <div className="appt-patient">
                        <div className="appt-avatar">{a.patient[0]}</div>
                        <div className="appt-p-info">
                           <strong>{a.patient}</strong>
                           <span>{a.type}</span>
                        </div>
                     </div>

                     <div className="appt-doctor">
                        <User size={16} className="text-muted" />
                        <span>{a.doctor}</span>
                     </div>

                     <div className="appt-status">
                        <span className={`h-status-pill ${a.status.toLowerCase()}`}>
                           {a.status}
                        </span>
                     </div>

                     <div className="appt-actions">
                        <button 
                           className="h-action-symbol confirm" title="Confirm Appointment"
                           disabled={a.status === 'Confirmed'}
                           style={{ opacity: a.status === 'Confirmed' ? 0.3 : 1 }}
                           onClick={() => {
                              setSelectedAppt(a);
                              setIsMobilizing(true);
                              setTimeout(() => {
                                 setIsMobilizing(false);
                                 setAppointments(prev => prev.map(item => item.id === a.id ? { ...item, status: 'Confirmed' } : item));
                              }, 3000);
                           }}
                        >
                           <CheckCircle2 size={18} />
                        </button>
                        <button 
                           className="h-action-symbol confirm" title="Update Booking"
                           style={{ color: '#3b82f6' }}
                           onClick={() => handleEditAppointment(a)}
                        >
                           <Edit2 size={18} />
                        </button>
                        <button 
                           className="h-action-symbol options" title="Strike Record"
                           style={{ color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.05)' }}
                           onClick={() => handleDeleteAppointment(a.id)}
                        >
                           &times;
                        </button>
                     </div>
                  </div>
                )) : (
                  <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--surface)', borderRadius: '20px', border: '1px solid var(--border)' }}>
                     <Calendar size={48} opacity={0.2} style={{ marginBottom: '1rem' }} />
                     <p style={{ color: 'var(--text-muted)' }}>No appointments found matching your search.</p>
                  </div>
                )}
             </div>
          </main>
        </div>
      ) : (
        <div className="calendar-full-view mo-card" style={{ padding: '2rem' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                 <div style={{ width: 50, height: 50, borderRadius: '14px', background: 'rgba(14, 165, 233, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                    <Calendar size={28} />
                 </div>
                 <div>
                    <h3 style={{ margin: 0 }}>Strategic OPD Schedule</h3>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>April 2026 • Regional Command Center</p>
                 </div>
              </div>
              <div style={{ display: 'flex', background: 'var(--bg)', borderRadius: '10px', padding: '4px' }}>
                 {['Day', 'Week', 'Month'].map(t => (
                    <button key={t} style={{ background: t === 'Month' ? 'var(--surface-light)' : 'transparent', border: 'none', color: t === 'Month' ? 'white' : 'var(--text-muted)', padding: '6px 15px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 800 }}>{t}</button>
                 ))}
              </div>
           </div>

           <div className="calendar-full-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '24px', overflow: 'hidden' }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                 <div key={d} style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', textAlign: 'center', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{d}</div>
              ))}
              {Array.from({ length: 35 }).map((_, i) => {
                 const dayNum = i - 2;
                 const isCurrentMonth = dayNum > 0 && dayNum < 31;
                 const hasAppts = isCurrentMonth && appointments.some(a => (dayNum === 24) || (dayNum === 5 && a.type.includes('Follow-up')));
                 
                 return (
                    <div key={i} style={{ background: 'var(--surface)', minHeight: '120px', padding: '15px', display: 'flex', flexDirection: 'column', gap: '8px', border: 'none' }}>
                       {isCurrentMonth && (
                          <>
                             <span style={{ fontSize: '0.9rem', fontWeight: 800, color: dayNum === 24 ? 'var(--primary)' : 'var(--text-muted)' }}>{dayNum}</span>
                             {hasAppts && (
                                <div style={{ background: 'rgba(14, 165, 233, 0.1)', color: 'var(--primary)', padding: '6px 10px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 800, borderLeft: '3px solid var(--primary)' }}>
                                   {dayNum === 24 ? `${appointments.filter(a => a.period === 'upcoming').length} Bookings` : 'Clinic Active'}
                                </div>
                             )}
                          </>
                       )}
                    </div>
                 );
              })}
           </div>
        </div>
      )}

      {/* New Appointment Modal */}
      {showNewAppt && (
        <div className="mo-modal-overlay" onClick={() => setShowNewAppt(false)}>
           <div className="mo-modal-content tactical" style={{ maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                 <h3>{isEditing ? 'Modify Clinical Booking' : 'Orchestrate New Booking'}</h3>
                 <p>Schedule a new clinical consultation within the regional network.</p>
              </div>
              <div className="modal-form" style={{ marginTop: '2rem' }}>
                 <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label>PATIENT IDENTIFIER</label>
                    <input 
                       type="text" 
                       value={newAppt.patient}
                       onChange={e => setNewAppt({...newAppt, patient: e.target.value})}
                       placeholder="Enter Patient ID or Name..." 
                       style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: "var(--text)", padding: '12px', borderRadius: '10px', width: '100%', outline: 'none' }} 
                    />
                 </div>
                 <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="form-group">
                       <label>DOCTOR / SPECIALIST</label>
                       <select 
                          value={newAppt.doctor}
                          onChange={e => setNewAppt({...newAppt, doctor: e.target.value})}
                          style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: "var(--text)", padding: '12px', borderRadius: '10px', width: '100%', outline: 'none' }}
                       >
                          <option>Dr. Khan (General)</option>
                          <option>Dr. Sharma (Cardiology)</option>
                          <option>Dr. Rao (Diagnostics)</option>
                          <option>Dr. Wilson (Surgery)</option>
                       </select>
                    </div>
                    <div className="form-group">
                       <label>APPOINTMENT TYPE</label>
                       <select 
                          value={newAppt.type}
                          onChange={e => setNewAppt({...newAppt, type: e.target.value})}
                          style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: "var(--text)", padding: '12px', borderRadius: '10px', width: '100%', outline: 'none' }}
                       >
                          <option>Consultation</option>
                          <option>Follow-up</option>
                          <option>Emergency Review</option>
                          <option>Diagnostic Review</option>
                          <option>Post-Surgery</option>
                       </select>
                    </div>
                 </div>
                 <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label>PREFERRED TIME SLOT</label>
                    <input 
                       type="text" 
                       value={newAppt.time}
                       onChange={e => setNewAppt({...newAppt, time: e.target.value})}
                       placeholder="e.g. 10:30 AM" 
                       style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: "var(--text)", padding: '12px', borderRadius: '10px', width: '100%', outline: 'none' }} 
                    />
                 </div>
                 <div style={{ display: 'flex', gap: '15px' }}>
                    <button className="mo-button-outline" style={{ flex: 1 }} onClick={() => setShowNewAppt(false)}>Back to List</button>
                    <button className="mo-button-primary" style={{ flex: 2 }} onClick={handleAddAppointment}>
                       {isEditing ? 'Commit Changes' : 'Authorize Booking'}
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Booking Mobilization Overlay */}
      {isMobilizing && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(7, 9, 15, 0.95)', zIndex: 3000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div className="radar-animation" style={{ width: 160, height: 160, borderRadius: '50%', border: '2px solid var(--primary)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, var(--primary) 0%, transparent 20%)', animation: 'sweep 2s linear infinite' }}></div>
              <CheckCircle2 size={48} color="var(--primary)" />
           </div>
           <h2 style={{ letterSpacing: '4px', fontWeight: 900, color: 'var(--primary)' }}>SYNCHRONIZING CLINICAL DATA...</h2>
           <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontWeight: 800 }}>ORCHESTRATING REGISTRY UPDATE • PATIENT: {selectedAppt?.patient} • PHYSICIAN: {selectedAppt?.doctor}</p>
        </div>
      )}

      <style>{`
        .hospital-appointments { display: flex; flex-direction: column; gap: 2rem; }

        .appt-layout { display: grid; grid-template-columns: 300px 1fr; gap: 2rem; }

        .appt-sidebar { display: flex; flex-direction: column; gap: 1.5rem; }
        .mini-calendar { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 1.5rem; }
        .cal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; font-weight: 800; }
        .cal-header button { background: transparent; border: none; color: var(--text-muted); cursor: pointer; }
        
        .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; text-align: center; }
        .cal-day-label { font-size: 0.7rem; font-weight: 800; color: var(--text-muted); margin-bottom: 8px; }
        .cal-day { font-size: 0.8rem; font-weight: 700; padding: 8px 0; border-radius: 10px; cursor: pointer; transition: all 0.2s; }
        .cal-day:hover { background: var(--surface-light); }
        .cal-day.active { background: var(--primary); color: var(--text); box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3); }
        .cal-day.has-appt { position: relative; }
        .cal-day.has-appt::after { content: ''; position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; background: var(--primary); border-radius: 50%; }

        .appt-summary-card { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 1.5rem; }
        .appt-summary-card h3 { font-size: 0.9rem; font-weight: 800; color: var(--text-muted); margin-bottom: 1.25rem; }
        .a-sum-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border); font-size: 0.85rem; }
        .a-sum-item:last-child { border-bottom: none; }
        .a-sum-item span { font-weight: 600; color: var(--text-muted); }
        .a-sum-item strong { font-weight: 900; }

        .appt-main { display: flex; flex-direction: column; gap: 1.25rem; }
        .appt-list-header { display: flex; justify-content: space-between; align-items: center; background: var(--surface); padding: 1rem 1.5rem; border-radius: 20px; border: 1px solid var(--border); }
        
        .appt-items { display: flex; flex-direction: column; gap: 10px; }
        .appt-card { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 1.25rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; transition: all 0.2s; gap: 1rem; }
        .appt-card:hover { transform: scale(1.01); border-color: var(--primary); }
        
        .appt-card > div { min-width: 120px; }

        .appt-time { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 800; color: var(--text-muted); }
        
        .appt-patient { display: flex; align-items: center; gap: 12px; }
        .appt-avatar { width: 36px; height: 36px; border-radius: 10px; background: var(--surface-light); display: flex; align-items: center; justify-content: center; font-weight: 900; color: var(--primary); border: 1px solid var(--border); }
        .appt-p-info { display: flex; flex-direction: column; }
        .appt-p-info strong { font-size: 0.9rem; }
        .appt-p-info span { font-size: 0.75rem; color: var(--text-muted); }

        .appt-doctor { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 700; color: var(--text); }
        
        .h-status-pill.confirmed { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .h-status-pill.pending { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .h-status-pill.cancelled { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

        .appt-actions { display: flex; gap: 12px; justify-content: flex-end; }
        .h-action-symbol { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s ease; border: 1px solid transparent; }
        .h-action-symbol.confirm { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: var(--text); }
        .h-action-symbol.confirm:hover { background: rgba(16, 185, 129, 0.1); border-color: #10b981; color: #10b981; }
        .f-btn { 
           background: white; 
           border: 1px solid #e2e8f0; 
           padding: 8px 18px; 
           border-radius: 12px; 
           font-size: 0.75rem; 
           font-weight: 800; 
           color: #64748b; 
           cursor: pointer; 
           transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
           box-shadow: 0 1px 3px rgba(0,0,0,0.05);
           display: flex;
           align-items: center;
           gap: 6px;
           white-space: nowrap;
        }
        .f-btn:hover { background: #f8fafc; border-color: #cbd5e1; transform: translateY(-1px); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        .f-btn.active { background: #0ea5e9; color: white; border-color: #0ea5e9; box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3); }
        .f-btn:active { transform: translateY(0); box-shadow: 0 1px 2px rgba(0,0,0,0.05); }

        .h-action-symbol.options { background: #f1f5f9; color: #0f172a; border: none; }
        .h-action-symbol.options:hover { background: white; transform: scale(1.05); }

        /* Tactical Modal Architecture */
        .mo-modal-overlay {
           position: fixed;
           inset: 0;
           background: rgba(255, 255, 255, 0.4);
           backdrop-filter: blur(12px);
           z-index: 2000;
           display: flex;
           align-items: center;
           justify-content: center;
           padding: 20px;
           animation: modalFadeIn 0.3s ease;
        }

        .mo-modal-content.tactical {
           background: white;
           border-radius: 32px;
           width: 100%;
           max-width: 600px;
           padding: 2.5rem;
           box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
           position: relative;
           color: #0f172a;
           animation: modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mo-modal-content.tactical h3 { font-size: 1.5rem; font-weight: 900; margin: 0 0 8px; letter-spacing: -0.5px; }
        .mo-modal-content.tactical p { color: #64748b; font-size: 0.95rem; margin: 0; }
        .mo-modal-content.tactical label { display: block; font-size: 0.65rem; font-weight: 900; letter-spacing: 1px; color: #94a3b8; margin-bottom: 8px; }

        .mo-button-primary {
           background: #0ea5e9;
           color: white;
           border: none;
           padding: 14px 24px;
           border-radius: 12px;
           font-weight: 800;
           cursor: pointer;
           transition: all 0.2s;
        }
        .mo-button-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(14, 165, 233, 0.4); }

        .mo-button-outline {
           background: transparent;
           border: 1.5px solid #e2e8f0;
           color: #0f172a;
           padding: 14px 24px;
           border-radius: 12px;
           font-weight: 800;
           cursor: pointer;
           transition: all 0.2s;
        }
        .mo-button-outline:hover { background: #f8fafc; border-color: #cbd5e1; }

        @keyframes modalFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalSlideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default HospitalAppointments;

import React, { useState } from 'react';
import { 
  UserCircle, Star, Phone, Mail, 
  ChevronRight, Calendar, Search, 
  Filter, Plus, MoreHorizontal,
  Clock, MapPin
} from 'lucide-react';
import DoctorProfileView from './DoctorProfileView.jsx';

const HospitalDoctors = ({ onNavigate }) => {
  const [view, setView] = useState('list'); // 'list' or 'profile'
  const [viewType, setViewType] = useState('list'); // 'list' or 'kanban'
  const [selectedDoc, setSelectedDoc] = useState(null);

  const [doctorsList, setDoctorsList] = useState(() => {
    const facilities = ['Guntur Urban PHC', 'Mangalagiri PHC', 'Tenali CHC', 'Amaravati PHC', 'Ponnur PHC', 'Bapatla CHC', 'Repalle PHC'];
    const specs = ['Cardiology', 'Pediatrics', 'Neurology', 'Orthopedics', 'Oncology', 'General Medicine', 'Emergency'];
    const statuses = ['Available', 'In Surgery', 'Off Duty', 'Busy'];
    const names = ['Sameer Khan', 'Anjali Rao', 'Robert Wilson', 'Priya Sharma', 'Michael Chen', 'Aruna V', 'Varma K', 'Reddy P', 'Lakshmi N', 'Prasad B'];
    
    return Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Dr. ${names[i % names.length]} ${i > 9 ? i : ''}`,
      spec: specs[i % specs.length],
      facility: facilities[i % facilities.length],
      status: statuses[i % statuses.length],
      exp: `${5 + (i % 20)} Yrs`,
      patients: i % 3 === 0 ? 0 : (i % 15) + 2,
      rating: (4.0 + (i % 10) / 10).toFixed(1)
    }));
  });

  const [facilityFilter, setFacilityFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDoctor, setNewDoctor] = useState({ name: '', spec: 'General Medicine', facility: 'Mangalagiri PHC', exp: '1 Yrs' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const doctorsPerPage = 12;

  const filteredDoctors = doctorsList.filter(d => 
    (facilityFilter === 'All' || d.facility === facilityFilter)
  );

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * doctorsPerPage, 
    currentPage * doctorsPerPage
  );

  const handleAddDoctor = () => {
    if (isEditing) {
      setDoctorsList(prev => prev.map(d => d.id === editingId ? { ...d, ...newDoctor, name: `Dr. ${newDoctor.name.replace('Dr. ', '')}` } : d));
    } else {
      setDoctorsList([{
        ...newDoctor,
        id: Math.max(...doctorsList.map(d => d.id), 0) + 1,
        name: `Dr. ${newDoctor.name}`,
        status: 'Available',
        patients: 0,
        rating: '5.0'
      }, ...doctorsList]);
    }
    closeModal();
  };

  const handleDeleteDoctor = (id) => {
    if (window.confirm('Are you sure you want to delete this medical officer profile?')) {
      setDoctorsList(prev => prev.filter(d => d.id !== id));
    }
  };

  const openEditModal = (doc) => {
    setNewDoctor({ name: doc.name.replace('Dr. ', ''), spec: doc.spec, facility: doc.facility, exp: doc.exp });
    setEditingId(doc.id);
    setIsEditing(true);
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setIsEditing(false);
    setEditingId(null);
    setNewDoctor({ name: '', spec: 'General Medicine', facility: 'Mangalagiri PHC', exp: '1 Yrs' });
  };


  if (view === 'profile' && selectedDoc) {
    return <DoctorProfileView doctor={selectedDoc} onBack={() => setView('list')} />;
  }

  return (
    <div className="hospital-doctors animate-fade">
      <div className="page-header-h">
        <div className="title-area-h">
          <h2>Doctors Panel</h2>
          <p>Manage medical staff, schedules, and clinical assignments.</p>
        </div>
        <div className="header-btns-h">
          <button className="h-btn-secondary" onClick={() => onNavigate('master-schedule')}><Calendar size={18} /> Master Schedule</button>
          <button className="h-btn-primary" onClick={() => setShowAddModal(true)}><Plus size={18} /> Add Doctor</button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="h-filter-bar">
        <div className="h-search">
          <Search size={18} />
          <input type="text" placeholder="Search by name or specialization..." />
        </div>
        <div className="h-filters" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
           <div className="view-toggle" style={{ display: 'flex', background: 'var(--bg)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border)' }}>
             <button onClick={() => setViewType('list')} style={{ padding: '6px 16px', borderRadius: '8px', border: 'none', background: viewType === 'list' ? 'var(--primary)' : 'transparent', color: viewType === 'list' ? 'white' : 'var(--text-muted)', fontWeight: 800, cursor: 'pointer', transition: '0.3s' }}>List</button>
             <button onClick={() => setViewType('kanban')} style={{ padding: '6px 16px', borderRadius: '8px', border: 'none', background: viewType === 'kanban' ? 'var(--primary)' : 'transparent', color: viewType === 'kanban' ? 'white' : 'var(--text-muted)', fontWeight: 800, cursor: 'pointer', transition: '0.3s' }}>Kanban</button>
           </div>
           <div className="h-filter-item" style={{ padding: 0, border: 'none', background: 'transparent' }}>
             <select value={facilityFilter} onChange={(e) => { setFacilityFilter(e.target.value); setCurrentPage(1); }} style={{ background: 'var(--surface-light)', border: '1px solid var(--border)', color: "var(--text)", padding: '10px 16px', borderRadius: '12px', fontSize: '0.85rem', outline: 'none', fontWeight: 700 }}>
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
           <div className="h-filter-item"><Filter size={16} /> <span>Specialization</span></div>
        </div>
      </div>

      {/* Doctors Display */}
      {viewType === 'list' ? (
        <div className="doctors-list-view" style={{ background: 'var(--surface)', borderRadius: '24px', border: '1px solid var(--border)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '1.5rem', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Medical Officer</th>
                <th style={{ padding: '1.5rem', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Specialization</th>
                <th style={{ padding: '1.5rem', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Assigned Facility</th>
                <th style={{ padding: '1.5rem', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '1.5rem', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Patients</th>
                <th style={{ padding: '1.5rem', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDoctors.map((doc) => (
                <tr key={doc.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', transition: '0.3s' }} className="list-row-hover">
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}><UserCircle size={24} /></div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{doc.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Exp: {doc.exp}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem', fontSize: '0.9rem', fontWeight: 700 }}>{doc.spec}</td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', background: 'rgba(14, 165, 233, 0.05)', padding: '6px 12px', borderRadius: '8px' }}>{doc.facility}</span>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <span className={`status-tag ${doc.status.toLowerCase().replace(' ', '-')}`} style={{ fontSize: '0.65rem' }}>{doc.status}</span>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem', fontWeight: 800 }}>{doc.patients}</td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => { setSelectedDoc(doc); setView('profile'); }} style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}>View</button>
                      <button onClick={() => openEditModal(doc)} style={{ background: 'rgba(14, 165, 233, 0.1)', border: '1px solid rgba(14, 165, 233, 0.2)', color: 'var(--primary)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}>Edit</button>
                      <button onClick={() => handleDeleteDoctor(doc.id)} style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="doctors-kanban-view" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {['Available', 'Busy', 'In Surgery', 'Off Duty'].map(status => (
            <div key={status} className="kanban-col">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', padding: '0 10px' }}>
                <h4 style={{ margin: 0, fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>{status}</h4>
                <span style={{ background: 'var(--surface)', padding: '2px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 900 }}>{filteredDoctors.filter(d => d.status === status).length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredDoctors.filter(d => d.status === status).slice(0, 10).map(doc => (
                  <div key={doc.id} className="kanban-card" style={{ background: 'var(--surface)', padding: '1.2rem', borderRadius: '20px', border: '1px solid var(--border)', position: 'relative' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '4px', paddingRight: '24px' }}>{doc.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '10px' }}>{doc.spec}</div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)' }}>{doc.facility}</div>
                    <button style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-muted)', width: '32px', height: '32px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.3s' }} className="kanban-call-btn" onClick={(e) => { e.stopPropagation(); alert(`Initiating secure call to ${doc.name}...`); }}>
                      <Phone size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '1rem' }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentPage(i + 1)}
              style={{ width: '40px', height: '40px', borderRadius: '12px', border: 'none', background: currentPage === i + 1 ? 'var(--primary)' : 'var(--surface)', color: currentPage === i + 1 ? 'white' : 'var(--text-muted)', fontWeight: 800, cursor: 'pointer', transition: '0.3s' }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Premium Responsive Add Doctor Modal */}
      {showAddModal && (
        <div className="mo-modal-overlay animate-fade-in">
          <div className="mo-modal-content animate-slide-up">
            <div className="mo-modal-header">
              <h3>{isEditing ? 'Update Medical Officer' : 'Register Medical Officer'}</h3>
              <p>{isEditing ? 'Modify existing staff credentials.' : 'Add new staff to the district health registry.'}</p>
              <button className="mo-close-btn" onClick={closeModal}>&times;</button>
            </div>
            
            <div className="mo-modal-body">
              <div className="mo-input-group">
                <label>Full Name</label>
                <div className="mo-input-wrapper">
                  <UserCircle size={18} />
                  <input type="text" value={newDoctor.name} onChange={e => setNewDoctor({...newDoctor, name: e.target.value})} placeholder="e.g. Dr. Ramesh Kumar" />
                </div>
              </div>

              <div className="mo-input-row">
                <div className="mo-input-group">
                  <label>Specialization</label>
                  <select value={newDoctor.spec} onChange={e => setNewDoctor({...newDoctor, spec: e.target.value})}>
                    {['Cardiology', 'Pediatrics', 'Neurology', 'Orthopedics', 'Oncology', 'General Medicine', 'Emergency'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="mo-input-group">
                  <label>Experience</label>
                  <input type="text" value={newDoctor.exp} onChange={e => setNewDoctor({...newDoctor, exp: e.target.value})} placeholder="e.g. 5 Yrs" />
                </div>
              </div>

              <div className="mo-input-group">
                <label>Assigned Facility</label>
                <div className="mo-input-wrapper">
                  <MapPin size={18} />
                  <select value={newDoctor.facility} onChange={e => setNewDoctor({...newDoctor, facility: e.target.value})}>
                    {['Guntur Urban PHC', 'Mangalagiri PHC', 'Tenali CHC', 'Amaravati PHC', 'Ponnur PHC', 'Bapatla CHC', 'Repalle PHC'].map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="mo-modal-footer">
              <button className="mo-cancel-btn" onClick={closeModal}>Discard</button>
              <button className="mo-save-btn" onClick={handleAddDoctor}>{isEditing ? 'Save Changes' : 'Register Staff Member'}</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .mo-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .mo-modal-content {
          background: white;
          width: 100%;
          max-width: 480px;
          border-radius: 32px;
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.15);
          overflow: hidden;
        }

        .mo-modal-header {
          padding: 2.5rem 2.5rem 1.5rem;
          border-bottom: 1px solid var(--border);
          position: relative;
        }
        .mo-modal-header h3 { margin: 0; font-size: 1.5rem; font-weight: 900; color: var(--text); }
        .mo-modal-header p { margin: 8px 0 0; color: var(--text-muted); font-size: 0.9rem; font-weight: 600; }
        .mo-close-btn { position: absolute; top: 2rem; right: 2rem; background: var(--bg); border: 1px solid var(--border); color: var(--text-muted); width: 36px; height: 36px; border-radius: 12px; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s; }
        .mo-close-btn:hover { color: var(--text); border-color: var(--primary); }

        .mo-modal-body { padding: 2rem 2.5rem; }
        .mo-input-group { margin-bottom: 1.5rem; flex: 1; }
        .mo-input-group label { display: block; font-size: 0.7rem; font-weight: 900; color: var(--primary); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 10px; }
        
        .mo-input-wrapper { position: relative; display: flex; align-items: center; }
        .mo-input-wrapper svg { position: absolute; left: 16px; color: var(--text-muted); pointer-events: none; }
        
        .mo-modal-body input, .mo-modal-body select {
          width: 100%;
          padding: 14px 16px 14px 48px;
          background: var(--bg);
          border: 1.5px solid var(--border);
          border-radius: 16px;
          color: var(--text);
          font-weight: 700;
          font-size: 0.95rem;
          outline: none;
          transition: 0.3s;
        }
        .mo-modal-body select { padding-left: 48px; appearance: none; }
        .mo-input-row { display: flex; gap: 1.5rem; }
        .mo-input-row input, .mo-input-row select { padding-left: 16px; }

        .mo-modal-body input:focus, .mo-modal-body select:focus { border-color: var(--primary); box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.1); }

        .mo-modal-footer { padding: 1.5rem 2.5rem 2.5rem; display: flex; gap: 1rem; }
        .mo-cancel-btn { flex: 1; padding: 16px; border-radius: 18px; border: 1px solid var(--border); background: transparent; color: var(--text-muted); font-weight: 800; cursor: pointer; transition: 0.3s; }
        .mo-save-btn { flex: 2; padding: 16px; border-radius: 18px; border: none; background: var(--primary); color: white; font-weight: 900; cursor: pointer; transition: 0.3s; box-shadow: 0 10px 20px rgba(14, 165, 233, 0.3); }
        .mo-save-btn:hover { transform: translateY(-2px); box-shadow: 0 15px 30px rgba(14, 165, 233, 0.4); }
        .mo-cancel-btn:hover { background: var(--bg); color: var(--text); }

        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        @media (max-width: 600px) {
          .mo-modal-content { border-radius: 32px 32px 0 0; position: fixed; bottom: 0; max-width: 100%; }
          .mo-input-row { flex-direction: column; gap: 0; }
        }

        .page-header-h { display: flex; justify-content: space-between; align-items: flex-end; }
        .title-area-h h2 { margin: 0; font-size: 1.6rem; font-weight: 800; }
        .title-area-h p { margin: 4px 0 0 0; color: var(--text-muted); font-size: 0.95rem; }

        .header-btns-h { display: flex; gap: 12px; }
        .h-btn-secondary { display: flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 12px; background: var(--surface); border: 1px solid var(--border); color: var(--text); font-weight: 700; cursor: pointer; }
        .h-btn-primary { display: flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 12px; background: var(--primary); border: none; color: var(--text); font-weight: 700; cursor: pointer; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); }

        .h-filter-bar { background: var(--surface); padding: 1rem; border-radius: 20px; border: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
        .h-search { display: flex; align-items: center; gap: 10px; background: var(--bg); padding: 10px 15px; border-radius: 12px; border: 1px solid var(--border); width: 350px; }
        .h-search input { background: transparent; border: none; color: var(--text); outline: none; width: 100%; font-size: 0.9rem; }
        .h-filters { display: flex; gap: 10px; }
        .h-filter-item { display: flex; align-items: center; gap: 8px; background: var(--bg); padding: 8px 12px; border-radius: 10px; border: 1px solid var(--border); font-size: 0.8rem; color: var(--text-muted); font-weight: 700; cursor: pointer; }

        .doctors-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem; }
        .doctor-card { 
          background: var(--surface); 
          border: 1px solid rgba(255,255,255,0.05); 
          border-radius: 32px; 
          padding: 2.5rem; 
          transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .doctor-card:hover { transform: translateY(-8px); border-color: var(--primary); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }

        .doc-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .status-tag { 
          padding: 6px 14px; 
          border-radius: 100px; 
          font-size: 0.7rem; 
          font-weight: 900; 
          text-transform: uppercase; 
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .status-tag::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
        }
        .status-tag.available { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .status-tag.available::before { background: var(--surface-light); box-shadow: 0 0 10px #10b981; animation: pulse 2s infinite; }
        .status-tag.in-surgery { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
        .status-tag.in-surgery::before { background: #ef4444; }
        .status-tag.off-duty { background: rgba(148, 163, 184, 0.1); color: var(--text-muted); }
        .status-tag.busy { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }

        .doc-profile { display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 2rem; }
        .doc-avatar { 
          width: 80px; 
          height: 80px; 
          border-radius: 24px; 
          background: rgba(14, 165, 233, 0.05); 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          color: var(--primary); 
          margin-bottom: 1rem; 
          border: 1px solid rgba(14, 165, 233, 0.1); 
        }
        .doc-profile h4 { margin: 0; font-size: 1.3rem; font-weight: 900; color: var(--text); }
        .doc-spec { font-size: 0.85rem; color: var(--text-muted); font-weight: 800; margin-top: 6px; letter-spacing: 0.5px; }

        .doc-stats { display: flex; justify-content: space-between; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.05); margin-bottom: 2rem; }
        .d-stat { display: flex; flex-direction: column; gap: 4px; }
        .d-lbl { font-size: 0.6rem; color: var(--text-muted); font-weight: 900; text-transform: uppercase; letter-spacing: 1px; }
        .d-val { font-size: 1rem; font-weight: 900; color: var(--text); display: flex; align-items: center; gap: 6px; }

        .doc-actions { display: flex; gap: 1rem; }
        .doc-btn-call { 
          width: 52px; 
          height: 52px; 
          border-radius: 14px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          cursor: pointer; 
          transition: 0.3s; 
          background: var(--surface) !important;
          border: 1px solid var(--border) !important;
          color: var(--text-muted);
        }
        .doc-btn-call:hover { background: var(--primary) !important; color: var(--text) !important; border-color: var(--primary) !important; transform: rotate(15deg); }
        .doc-btn-view { 
          flex: 1; 
          border-radius: 14px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          gap: 10px; 
          cursor: pointer; 
          transition: 0.3s; 
          background: var(--primary) !important;
          color: var(--text) !important;
          border: 1px solid var(--primary) !important;
        }
        .doc-btn-view:hover { background: var(--primary-dark) !important; color: var(--text) !important; border-color: var(--primary-dark) !important; }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
      `}</style>
    </div>
  );
};

export default HospitalDoctors;

import React, { useState } from 'react';
import { 
  Pill, AlertTriangle, Plus, 
  Search, Filter, ShoppingBag, 
  RefreshCw, TrendingUp, ChevronRight,
  MoreVertical, Package, Truck, Info
} from 'lucide-react';

const HospitalPharmacy = () => {
  const [showProcurement, setShowProcurement] = useState(false);
  const [showAddMedicine, setShowAddMedicine] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [isMobilizing, setIsMobilizing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newMed, setNewMed] = useState({ name: '', category: 'Analgesic', stock: '', unit: 'Tabs', price: '' });

  const [inventory, setInventory] = useState([
    { id: 1, name: 'Paracetamol 500mg', category: 'Analgesic', stock: 1250, unit: 'Tabs', status: 'In Stock', price: '₹1.50' },
    { id: 2, name: 'Amoxicillin 250mg', category: 'Antibiotic', stock: 15, unit: 'Vials', status: 'Low Stock', price: '₹45.00' },
    { id: 3, name: 'Insulin Glargine', category: 'Antidiabetic', stock: 0, unit: 'Pens', status: 'Out of Stock', price: '₹850.00' },
    { id: 4, name: 'Pantoprazole 40mg', category: 'Antacid', stock: 850, unit: 'Tabs', status: 'In Stock', price: '₹12.00' },
    { id: 5, name: 'Cetirizine 10mg', category: 'Antihistamine', stock: 45, unit: 'Tabs', status: 'Low Stock', price: '₹2.50' },
    { id: 6, name: 'Metformin 500mg', category: 'Antidiabetic', stock: 2000, unit: 'Tabs', status: 'In Stock', price: '₹5.00' },
    { id: 7, name: 'Azithromycin 500mg', category: 'Antibiotic', stock: 120, unit: 'Tabs', status: 'In Stock', price: '₹25.00' },
    { id: 8, name: 'Ibuprofen 400mg', category: 'Analgesic', stock: 400, unit: 'Tabs', status: 'In Stock', price: '₹3.50' },
    { id: 9, name: 'Dexamethasone', category: 'Steroid', stock: 8, unit: 'Vials', status: 'Low Stock', price: '₹18.00' },
    { id: 10, name: 'Normal Saline 500ml', category: 'IV Fluids', stock: 300, unit: 'Bottles', status: 'In Stock', price: '₹60.00' },
  ]);

  const handleAddMedicine = () => {
    if (isEditing) {
      setInventory(prev => prev.map(m => m.id === editingId ? { ...m, ...newMed, status: Number(newMed.stock) > 100 ? 'In Stock' : Number(newMed.stock) > 0 ? 'Low Stock' : 'Out of Stock' } : m));
    } else {
      setInventory([{
        ...newMed,
        id: Date.now(),
        status: Number(newMed.stock) > 100 ? 'In Stock' : Number(newMed.stock) > 0 ? 'Low Stock' : 'Out of Stock'
      }, ...inventory]);
    }
    closeAddModal();
  };

  const handleDeleteMedicine = (id) => {
    if (window.confirm('Delete this medication from inventory?')) {
      setInventory(prev => prev.filter(m => m.id !== id));
    }
  };

  const openEditModal = (med) => {
    setNewMed({ name: med.name, category: med.category, stock: med.stock, unit: med.unit, price: med.price.replace('₹', '') });
    setEditingId(med.id);
    setIsEditing(true);
    setShowAddMedicine(true);
  };

  const closeAddModal = () => {
    setShowAddMedicine(false);
    setIsEditing(false);
    setEditingId(null);
    setNewMed({ name: '', category: 'Analgesic', stock: '', unit: 'Tabs', price: '' });
  };

  return (
    <div className="hospital-pharmacy animate-fade">
      <div className="page-header-h">
        <div className="title-area-h">
          <h2>Pharmacy Inventory</h2>
          <p>Track medicine stock levels, manage procurement, and issue medications.</p>
        </div>
        <div className="header-btns-h" style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
          <button 
            className="tactical-header-btn" 
            onClick={() => setShowProcurement(true)}
            style={{ background: 'white', color: 'black', border: 'none', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 800, fontSize: '0.85rem' }}
          >
            <Truck size={18} /> Procurement
          </button>
          <button 
            className="tactical-header-btn" 
            onClick={() => setShowAddMedicine(true)}
            style={{ background: 'transparent', color: "var(--text)", border: 'none', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '1px solid var(--border)', cursor: 'pointer', fontWeight: 800, fontSize: '0.85rem' }}
          >
            <Plus size={18} /> Add Medicine
          </button>
        </div>
      </div>

      {/* Procurement Modal */}
      {showProcurement && (
        <div className="mo-modal-overlay" onClick={() => setShowProcurement(false)}>
           <div className="mo-modal-content tactical" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                 <h3>Statewide Procurement Tracking</h3>
                 <p>Monitor regional supply chain and logistics flow.</p>
              </div>
              <div className="procurement-timeline" style={{ marginTop: '2rem' }}>
                 {[
                   { id: 'ORD-8821', status: 'In Transit', origin: 'State Central Hub', eta: '4h 20m', items: '25,000 Units' },
                   { id: 'ORD-8815', status: 'Processing', origin: 'Regional Depot', eta: '12h', items: '12,400 Units' }
                 ].map((order, i) => (
                   <div key={i} className="order-item" style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                         <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--primary)' }}>{order.id}</span>
                         <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#f59e0b' }}>{order.status}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                         <div>
                            <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)' }}>ORIGIN</span>
                            <strong style={{ fontSize: '0.9rem' }}>{order.origin}</strong>
                         </div>
                         <div style={{ textAlign: 'right' }}>
                            <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)' }}>ETA</span>
                            <strong style={{ fontSize: '0.9rem' }}>{order.eta}</strong>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="mo-button-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={() => setShowProcurement(false)}>Close Tracking View</button>
           </div>
        </div>
      )}

      {/* Add Medicine Modal */}
      {showAddMedicine && (
        <div className="mo-modal-overlay" onClick={closeAddModal}>
           <div className="mo-modal-content tactical" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                 <h3>{isEditing ? 'Update Medication' : 'Add Medication to Inventory'}</h3>
                 <p>{isEditing ? 'Modify existing clinical supply details.' : 'Register new clinical supplies into the hospital repository.'}</p>
              </div>
              <div className="modal-form" style={{ marginTop: '2rem' }}>
                 <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="form-group">
                       <label>MEDICINE NAME</label>
                       <input type="text" value={newMed.name} onChange={e => setNewMed({...newMed, name: e.target.value})} placeholder="e.g. Paracetamol" style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: "var(--text)", padding: '10px', borderRadius: '8px', width: '100%', outline: 'none' }} />
                    </div>
                    <div className="form-group">
                       <label>CATEGORY</label>
                       <select value={newMed.category} onChange={e => setNewMed({...newMed, category: e.target.value})} style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: "var(--text)", padding: '10px', borderRadius: '8px', width: '100%', outline: 'none' }}>
                          <option>Analgesic</option>
                          <option>Antibiotic</option>
                          <option>Antiviral</option>
                          <option>Antidiabetic</option>
                          <option>IV Fluids</option>
                       </select>
                    </div>
                 </div>
                 <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div className="form-group">
                       <label>STOCK QUANTITY</label>
                       <input type="number" value={newMed.stock} onChange={e => setNewMed({...newMed, stock: e.target.value})} placeholder="Enter units" style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: "var(--text)", padding: '10px', borderRadius: '8px', width: '100%', outline: 'none' }} />
                    </div>
                    <div className="form-group">
                       <label>UNIT PRICE (₹)</label>
                       <input type="text" value={newMed.price} onChange={e => setNewMed({...newMed, price: e.target.value})} placeholder="1.50" style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: "var(--text)", padding: '10px', borderRadius: '8px', width: '100%', outline: 'none' }} />
                    </div>
                 </div>
                 <div style={{ display: 'flex', gap: '12px' }}>
                    <button 
                       className="ph-cancel-btn" 
                       style={{ flex: 1, padding: '14px', borderRadius: '16px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', fontWeight: 800, cursor: 'pointer', transition: '0.3s' }} 
                       onClick={closeAddModal}
                    >
                       Discard
                    </button>
                    <button 
                       className="ph-save-btn" 
                       style={{ flex: 2, padding: '14px', borderRadius: '16px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: 900, cursor: 'pointer', transition: '0.3s', boxShadow: '0 10px 20px rgba(14, 165, 233, 0.2)' }} 
                       onClick={handleAddMedicine}
                    >
                       {isEditing ? 'Update Inventory' : 'Finalize Entry'}
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Issue Medication Modal */}
      {showIssueModal && (
        <div className="mo-modal-overlay" onClick={() => setShowIssueModal(false)}>
           <div className="mo-modal-content tactical" style={{ maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem' }}>
                 <div style={{ width: 64, height: 64, borderRadius: '16px', background: 'rgba(14, 165, 233, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                    <Pill size={32} />
                 </div>
                 <div style={{ flex: 1 }}>
                    <h2 style={{ margin: 0 }}>Issue: {selectedItem?.name}</h2>
                    <p style={{ margin: '4px 0 0', color: 'var(--text-muted)' }}>Current Stock: {selectedItem?.stock} {selectedItem?.unit} • {selectedItem?.category}</p>
                 </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                 <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1px' }}>TARGET WARD</span>
                    <select style={{ width: '100%', marginTop: '10px', background: 'var(--bg)', border: '1px solid var(--border)', color: "var(--text)", padding: '10px', borderRadius: '10px', outline: 'none' }}>
                       <option>ICU - Intensive Care</option>
                       <option>General Ward - Male</option>
                       <option>General Ward - Female</option>
                    </select>
                 </div>
                 <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1px' }}>QUANTITY</span>
                    <input type="number" placeholder="0" style={{ width: '100%', marginTop: '10px', background: 'var(--bg)', border: '1px solid var(--border)', color: "var(--text)", padding: '10px', borderRadius: '10px', outline: 'none' }} />
                 </div>
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                 <button className="mo-button-outline" style={{ flex: 1 }} onClick={() => setShowIssueModal(false)}>Cancel Dispatch</button>
                 <button 
                    className="mo-button-primary" 
                    style={{ flex: 2, background: 'var(--primary)', border: 'none' }}
                    onClick={() => {
                       setShowIssueModal(false);
                       setIsMobilizing(true);
                       setTimeout(() => {
                          setIsMobilizing(false);
                       }, 3000);
                    }}
                 >
                    CONFIRM SECURE DISPATCH
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Stock Mobilization Overlay */}
      {isMobilizing && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(7, 9, 15, 0.95)', zIndex: 3000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div className="radar-animation" style={{ width: 160, height: 160, borderRadius: '50%', border: '2px solid var(--primary)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, var(--primary) 0%, transparent 20%)', animation: 'sweep 2s linear infinite' }}></div>
              <ShoppingBag size={48} color="var(--primary)" />
           </div>
           <h2 style={{ letterSpacing: '4px', fontWeight: 900, color: 'var(--primary)' }}>ORCHESTRATING STOCK MOBILIZATION...</h2>
           <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontWeight: 800 }}>DISPATCHING: {selectedItem?.name} • TARGET: ICU - INTENSIVE CARE</p>
        </div>
      )}

      {/* Pharmacy Overview */}
      <div className="pharmacy-stats">
        <div className="p-stat-box">
          <div className="p-s-icon blue"><Package size={24} /></div>
          <div className="p-s-info">
            <h3>1,420</h3>
            <span>Stock Keeping Unit</span>
          </div>
        </div>
        <div className="p-stat-box">
          <div className="p-s-icon orange"><AlertTriangle size={24} /></div>
          <div className="p-s-info">
            <h3>12</h3>
            <span>Low Stock Items</span>
          </div>
        </div>
        <div className="p-stat-box">
          <div className="p-s-icon green"><ShoppingBag size={24} /></div>
          <div className="p-s-info">
            <h3>₹4.2k</h3>
            <span>Today's Issues</span>
          </div>
        </div>
      </div>

      {/* Inventory Management */}
      <div className="inventory-card">
        <div className="inv-header">
           <div className="inv-search">
              <Search size={18} />
              <input type="text" placeholder="Search by medicine name or category..." />
           </div>
           <div className="inv-filters">
              <button className="f-btn active">All</button>
              <button className="f-btn">Low Stock</button>
              <button className="f-btn">Antibiotics</button>
           </div>
        </div>

        <div className="inv-table-wrapper">
          <table className="h-table">
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Unit</th>
                <th>Status</th>
                <th>Unit Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((m, i) => (
                <tr key={i}>
                  <td><strong>{m.name}</strong></td>
                  <td><span className="cat-tag">{m.category}</span></td>
                  <td>
                    <span className={`stock-val ${m.status === 'Out of Stock' ? 'text-danger' : m.status === 'Low Stock' ? 'text-warning' : ''}`}>
                      {m.stock}
                    </span>
                  </td>
                  <td>{m.unit}</td>
                  <td>
                    <span className={`h-status-pill ${m.status.toLowerCase().replace(/ /g, '-')}`}>
                      {m.status}
                    </span>
                  </td>
                  <td>{m.price}</td>
                  <td>
                    <div className="tactical-action-formation" style={{ display: 'flex', gap: '6px' }}>
                      <button 
                         className="tactical-square-btn" 
                         title="Edit Medication"
                         onClick={() => openEditModal(m)}
                         style={{ background: 'rgba(14, 165, 233, 0.1)', color: 'var(--primary)', borderColor: 'rgba(14, 165, 233, 0.2)' }}
                      >
                         <RefreshCw size={16} />
                      </button>
                      <button 
                         className="tactical-square-btn" 
                         title="Issue Medication"
                         onClick={() => {
                            setSelectedItem(m);
                            setShowIssueModal(true);
                         }}
                      >
                         <ChevronRight size={18} strokeWidth={3} />
                      </button>
                      <button 
                         className="tactical-square-btn" 
                         title="Delete Medication"
                         onClick={() => handleDeleteMedicine(m.id)}
                         style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}
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
        .hospital-pharmacy { display: flex; flex-direction: column; gap: 2rem; }

        .pharmacy-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .p-stat-box { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 1.5rem; display: flex; align-items: center; gap: 20px; }
        .p-s-icon { width: 50px; height: 50px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .p-s-icon.blue { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .p-s-icon.orange { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .p-s-icon.green { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .p-s-info h3 { margin: 0; font-size: 1.4rem; font-weight: 900; }
        .p-s-info span { font-size: 0.75rem; color: var(--text-muted); font-weight: 800; text-transform: uppercase; }

        .inventory-card { background: var(--surface); border: 1px solid var(--border); border-radius: 28px; overflow: hidden; }
        .inv-header { padding: 1.5rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
        .inv-search { display: flex; align-items: center; gap: 10px; background: var(--bg); padding: 10px 15px; border-radius: 12px; border: 1px solid var(--border); width: 350px; }
        .inv-search input { background: transparent; border: none; color: var(--text); outline: none; width: 100%; font-size: 0.9rem; }
        
        .inv-filters { display: flex; gap: 8px; }
        .f-btn { padding: 6px 14px; border-radius: 8px; border: 1px solid var(--border); background: transparent; color: var(--text-muted); font-size: 0.75rem; font-weight: 700; cursor: pointer; }
        .f-btn.active { background: var(--surface-light); color: var(--text); border-color: var(--primary); }

        .cat-tag { padding: 2px 8px; background: var(--bg); border-radius: 6px; font-size: 0.7rem; font-weight: 800; color: var(--text-muted); border: 1px solid var(--border); }
        .stock-val { font-weight: 900; font-size: 1rem; }

        .h-status-pill.in-stock { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .h-status-pill.low-stock { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .h-status-pill.out-of-stock { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

        .tactical-square-btn { 
          width: 44px; 
          height: 44px; 
          background: var(--surface); 
          color: var(--text-muted); 
          border: 1px solid var(--border); 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          cursor: pointer; 
          transition: all 0.2s;
          border-radius: 8px;
        }

        .tactical-square-btn:hover {
          background: var(--surface-light);
          color: var(--primary);
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .ph-cancel-btn:hover { background: var(--bg); color: var(--text); }
        .ph-save-btn:hover { transform: translateY(-2px); box-shadow: 0 15px 30px rgba(14, 165, 233, 0.4); }

        @media (max-width: 600px) {
          .pharmacy-stats { grid-template-columns: 1fr; }
          .inv-search { width: 100%; }
          .inv-header { flex-direction: column; gap: 1rem; }
        }
      `}</style>
    </div>
  );
};

export default HospitalPharmacy;

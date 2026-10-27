import React from 'react';
import { 
  Box, Truck, AlertTriangle, 
  BarChart3, Plus, Search,
  ChevronRight, ArrowUpRight, Database
} from 'lucide-react';

const DistrictResources = () => {
  const inventory = [
    { item: 'Dengue NS1 Kits', category: 'Diagnostics', stock: 450, threshold: 1000, status: 'Critical', zone: 'Pendurthi' },
    { item: 'ORS Packets (50pk)', category: 'Medicine', stock: 12000, threshold: 5000, status: 'Optimal', zone: 'District Warehouse' },
    { item: 'Paracetamol 500mg', category: 'Medicine', stock: 85000, threshold: 20000, status: 'Optimal', zone: 'District Warehouse' },
    { item: 'Malaria Rapid Test', category: 'Diagnostics', stock: 2100, threshold: 2000, status: 'Warning', zone: 'Gajuwaka' },
    { item: 'PPE Kits (L)', category: 'Safety', stock: 1500, threshold: 500, status: 'Optimal', zone: 'Anakapalle' },
    { item: 'Larvicide (Bulk)', category: 'Sanitation', stock: 120, threshold: 500, status: 'Critical', zone: 'Bheemili' }
  ];

  return (
    <div className="module-padding animate-fade">
      <div className="resources-layout">
        {/* Resource Command Center */}
        <div className="resource-header">
           <div className="r-title-group">
              <h2>District Supply Chain</h2>
              <p>Monitoring logistics and inventory across 42 facilities</p>
           </div>
           <div className="r-actions">
              <button className="r-btn secondary"><Database size={16} /> Central Warehouse</button>
              <button className="r-btn primary"><Plus size={16} /> New Requisition</button>
           </div>
        </div>

        <div className="resource-summary-row">
           {[
             { label: 'Stock Value', val: '₹1.2Cr', sub: '+12% from last month', color: '#0ea5e9' },
             { label: 'Active Shipments', val: '14', sub: '8 arriving today', color: '#8b5cf6' },
             { label: 'Critical Shortages', val: '04', sub: 'Action required in 3 Mandals', color: '#f43f5e' },
             { label: 'Warehouse Capacity', val: '82%', sub: 'Optimal utilization', color: '#10b981' }
           ].map((s, i) => (
             <div key={i} className="r-summary-card">
                <span className="r-label">{s.label}</span>
                <h3 className="r-value">{s.val}</h3>
                <p className="r-sub" style={{ color: i === 2 ? '#f43f5e' : 'var(--text-muted)' }}>{s.sub}</p>
             </div>
           ))}
        </div>

        {/* Main Inventory Table */}
        <div className="dho-card-v6">
           <div className="inventory-header">
              <div className="search-box-v6">
                 <Search size={18} />
                 <input type="text" placeholder="Search inventory..." />
              </div>
              <div className="filter-tabs-v6">
                 <button className="active">All Items</button>
                 <button>Diagnostics</button>
                 <button>Medicines</button>
                 <button className="text-danger">Critical</button>
              </div>
           </div>

           <div className="inventory-table-container">
              <table className="inventory-table">
                 <thead>
                    <tr>
                       <th>Item Name</th>
                       <th>Category</th>
                       <th>Current Stock</th>
                       <th>Min. Threshold</th>
                       <th>Storage Zone</th>
                       <th>Status</th>
                       <th>Logistics</th>
                    </tr>
                 </thead>
                 <tbody>
                    {inventory.map((item, i) => (
                      <tr key={i} className={item.status.toLowerCase()}>
                         <td>
                            <div className="item-cell">
                               <Box size={16} className="text-muted" />
                               <strong>{item.item}</strong>
                            </div>
                         </td>
                         <td><span className="cat-pill">{item.category}</span></td>
                         <td className="stock-cell">
                            <div className="stock-val">{item.stock.toLocaleString()}</div>
                            <div className="stock-bar-bg">
                               <div className="stock-bar-fill" style={{ 
                                 width: `${Math.min((item.stock / item.threshold) * 100, 100)}%`,
                                 background: item.status === 'Critical' ? '#f43f5e' : item.status === 'Warning' ? '#f59e0b' : '#10b981'
                               }}></div>
                            </div>
                         </td>
                         <td>{item.threshold.toLocaleString()}</td>
                         <td>{item.zone}</td>
                         <td><span className={`status-pill ${item.status.toLowerCase()}`}>{item.status}</span></td>
                         <td><button className="track-btn"><Truck size={14} /> Track</button></td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>

      <style>{`
        .resources-layout { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
        
        .resource-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 0.5rem; }
        .r-title-group h2 { margin: 0; font-size: 1.8rem; font-weight: 900; }
        .r-title-group p { margin: 4px 0 0 0; color: var(--text-muted); font-size: 0.9rem; font-weight: 600; }
        
        .r-actions { display: flex; gap: 12px; }
        .r-btn { padding: 10px 20px; border-radius: 12px; font-weight: 800; font-size: 0.85rem; display: flex; align-items: center; gap: 8px; cursor: pointer; border: none; transition: all 0.2s; }
        .r-btn.primary { background: var(--primary); color: var(--text); }
        .r-btn.secondary { background: var(--surface); color: var(--text); border: 1px solid var(--border); }
        .r-btn:hover { transform: translateY(-2px); opacity: 0.9; }

        .resource-summary-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .r-summary-card { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 1.5rem; }
        .r-label { font-size: 0.7rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
        .r-value { margin: 8px 0; font-size: 1.8rem; font-weight: 900; color: var(--text); }
        .r-sub { font-size: 0.75rem; font-weight: 700; margin: 0; }

        .dho-card-v6 { background: var(--surface); border: 1px solid var(--border); border-radius: 32px; padding: 2rem; }
        
        .inventory-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .search-box-v6 { display: flex; align-items: center; gap: 12px; background: var(--surface); border: 1px solid var(--border); padding: 8px 15px; border-radius: 12px; width: 300px; }
        .search-box-v6 input { background: transparent; border: none; color: var(--text); outline: none; font-size: 0.85rem; width: 100%; }
        
        .filter-tabs-v6 { display: flex; gap: 10px; }
        .filter-tabs-v6 button { background: transparent; border: none; color: var(--text-muted); padding: 8px 16px; font-size: 0.8rem; font-weight: 800; cursor: pointer; border-radius: 8px; transition: all 0.2s; }
        .filter-tabs-v6 button.active { background: rgba(14, 165, 233, 0.1); color: var(--primary); }

        .inventory-table-container { overflow-x: auto; }
        .inventory-table { width: 100%; border-collapse: collapse; }
        .inventory-table th { text-align: left; padding: 1rem; font-size: 0.75rem; color: var(--text-muted); border-bottom: 1px solid var(--border); text-transform: uppercase; letter-spacing: 0.05em; }
        .inventory-table td { padding: 1.25rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.03); font-size: 0.9rem; }

        .item-cell { display: flex; align-items: center; gap: 10px; }
        .cat-pill { font-size: 0.7rem; font-weight: 800; color: #a5b4fc; background: rgba(99, 102, 241, 0.1); padding: 2px 8px; border-radius: 4px; }
        
        .stock-cell { min-width: 150px; }
        .stock-val { font-weight: 800; margin-bottom: 6px; }
        .stock-bar-bg { height: 4px; background: var(--surface); border-radius: 10px; }
        .stock-bar-fill { height: 100%; border-radius: 10px; }

        .status-pill { padding: 4px 10px; border-radius: 100px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; }
        .status-pill.critical { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }
        .status-pill.warning { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .status-pill.optimal { background: rgba(16, 185, 129, 0.1); color: #10b981; }

        .track-btn { background: transparent; border: 1px solid var(--border); color: var(--text); padding: 6px 12px; border-radius: 8px; font-size: 0.75rem; font-weight: 800; display: flex; align-items: center; gap: 6px; cursor: pointer; }
        .track-btn:hover { background: var(--primary); border-color: var(--primary); }

        tr.critical td { background: rgba(244, 63, 94, 0.02); }
      `}</style>
    </div>
  );
};

export default DistrictResources;

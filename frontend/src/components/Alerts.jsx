import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  ShieldAlert, 
  Activity, 
  MapPin, 
  Clock, 
  CheckCircle, 
  ExternalLink,
  Filter,
  ArrowRight,
  Truck,
  Users,
  Send,
  X,
  AlertCircle
} from 'lucide-react';

const mockAlerts = [
  {
    id: 1,
    type: 'Outbreak',
    severity: 'Critical',
    disease: 'Dengue Cluster',
    location: 'Chittoor (PHC Tirupati)',
    time: '2 hours ago',
    desc: 'Sudden spike of 15+ cases detected within 2km radius. AI confidence: 94%.',
    status: 'Active'
  },
  {
    id: 2,
    type: 'Threshold',
    severity: 'High',
    disease: 'Viral Fever',
    location: 'Kurnool District',
    time: '5 hours ago',
    desc: 'Weekly threshold exceeded for seasonal fever. 22% increase compared to last year.',
    status: 'Pending'
  },
  {
    id: 3,
    type: 'System',
    severity: 'Info',
    disease: 'Data Sync',
    location: 'Visakhapatnam GGH',
    time: '1 day ago',
    desc: 'Weekly IP records successfully integrated and classified.',
    status: 'Resolved'
  },
  {
    id: 4,
    type: 'Outbreak',
    severity: 'Medium',
    disease: 'Malaria',
    location: 'East Godavari',
    time: '2 days ago',
    desc: 'Localized cluster detected in tribal regions. Immediate screening recommended.',
    status: 'In Progress'
  }
];

const Alerts = () => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState('All');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);
  const [deployingAlert, setDeployingAlert] = useState(null);
  const [deploymentConfig, setDeploymentConfig] = useState({
    team: 'RRT-Alpha',
    priority: 'High',
    action: 'Mass Screening'
  });
  const [deploymentSuccess, setDeploymentSuccess] = useState(false);

  const handleEnableNotifications = () => {
    setShowPermissionPrompt(true);
    setTimeout(() => {
      setShowPermissionPrompt(false);
      setNotificationsEnabled(true);
      alert('Real-time Departmental Alerts Enabled for this browser.');
    }, 1500);
  };

  const handleAcknowledge = (alertId) => {
    const alert = alerts.find(a => a.id === alertId);
    setDeployingAlert(alert);
  };

  const confirmDeployment = () => {
    setAlerts(prev => prev.map(a => 
      a.id === deployingAlert.id 
        ? { ...a, status: 'Deployed', desc: `[DEPLOYED] ${deploymentConfig.team} dispatched for ${deploymentConfig.action}. ${a.desc}` }
        : a
    ));
    setDeploymentSuccess(true);
    setTimeout(() => {
      setDeploymentSuccess(false);
      setDeployingAlert(null);
    }, 2000);
  };

  const filteredAlerts = filter === 'All' ? alerts : alerts.filter(a => a.severity === filter || a.type === filter);

  return (
    <div className="animate-fade">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Surveillance Alerts</h2>
          <p style={{ color: 'var(--text-muted)' }}>Real-time outbreak detection and system notifications</p>
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button 
            onClick={handleEnableNotifications}
            disabled={notificationsEnabled}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              background: notificationsEnabled ? 'var(--surface-light)' : 'var(--primary)',
              color: notificationsEnabled ? 'var(--primary)' : 'white',
              border: notificationsEnabled ? '1px solid var(--primary-glow)' : 'none',
              padding: '10px 20px',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: notificationsEnabled ? 'default' : 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {notificationsEnabled ? <CheckCircle size={18} /> : <Bell size={18} className="animate-pulse" />}
            {notificationsEnabled ? 'System Alerts Active' : 'Enable Real-time Alerts'}
          </button>
          <div className="chart-container" style={{ margin: 0, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={18} color="var(--primary)" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Active Monitors: 42</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem' }}>
        {['All', 'Critical', 'High', 'Medium', 'Info'].map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            style={{ 
              padding: '8px 16px', 
              borderRadius: '20px', 
              background: filter === f ? 'var(--primary)' : 'var(--surface)',
              color: filter === f ? 'white' : 'var(--text-muted)',
              border: filter === f ? 'none' : '1px solid var(--border)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              transition: 'var(--transition)'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredAlerts.map(alert => (
          <div 
            key={alert.id}
            className="stat-card"
            style={{ 
              display: 'flex', 
              gap: '1.5rem', 
              padding: '1.5rem',
              borderLeft: `4px solid ${alert.severity === 'Critical' ? 'var(--danger)' : alert.severity === 'High' ? 'var(--accent)' : 'var(--primary)'}`
            }}
          >
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px', 
              background: alert.severity === 'Critical' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: alert.severity === 'Critical' ? 'var(--danger)' : 'var(--primary)'
            }}>
              {alert.type === 'Outbreak' ? <ShieldAlert size={24} /> : <Bell size={24} />}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{alert.disease}</h3>
                    <span style={{ 
                      fontSize: '0.7rem', 
                      padding: '2px 8px', 
                      borderRadius: '4px', 
                      background: alert.severity === 'Critical' ? 'var(--danger)' : 'var(--surface-light)',
                      color: "var(--text)",
                      fontWeight: 700
                    }}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '4px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {alert.location}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {alert.time}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                   <div style={{ 
                     fontSize: '0.75rem', 
                     fontWeight: 600, 
                     color: alert.status === 'Active' ? 'var(--danger)' : 'var(--primary)',
                     display: 'flex',
                     alignItems: 'center',
                     gap: '4px',
                     justifyContent: 'flex-end'
                   }}>
                     <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: alert.status === 'Active' ? 'var(--danger)' : 'var(--primary)' }}></div>
                     {alert.status}
                   </div>
                </div>
              </div>
              
              <p style={{ fontSize: '0.9rem', color: 'var(--text)', opacity: 0.8, lineHeight: 1.6, marginBottom: '1.2rem' }}>
                {alert.desc}
              </p>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  className="h-btn h-btn-primary" 
                  onClick={() => handleAcknowledge(alert.id)}
                  disabled={alert.status === 'Deployed'}
                  style={{ 
                    padding: '8px 16px', 
                    fontSize: '0.8rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    opacity: alert.status === 'Deployed' ? 0.6 : 1,
                    cursor: alert.status === 'Deployed' ? 'not-allowed' : 'pointer'
                  }}
                >
                  {alert.status === 'Deployed' ? 'Deployed' : 'Acknowledge & Deploy'} <ArrowRight size={14} />
                </button>
                <button style={{ 
                  background: 'transparent', 
                  border: '1px solid var(--border)', 
                  color: 'var(--text-muted)', 
                  padding: '8px 16px', 
                  borderRadius: '8px', 
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <ExternalLink size={14} /> View Case Details
                </button>
                <button style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: 'var(--primary)', 
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <CheckCircle size={14} /> Mark as False Positive
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Deployment Modal */}
      {deployingAlert && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: "var(--surface-light)",
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--surface)',
            width: '100%',
            maxWidth: '500px',
            borderRadius: '24px',
            border: '1px solid var(--border)',
            padding: '2rem',
            position: 'relative',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
            animation: 'fadeIn 0.3s ease'
          }}>
            {deploymentSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: 'rgba(16, 185, 129, 0.1)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  color: 'var(--primary)'
                }}>
                  <CheckCircle size={48} />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Deployment Authorized</h3>
                <p style={{ color: 'var(--text-muted)' }}>Resources are being dispatched to {deployingAlert.location}.</p>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => setDeployingAlert(null)}
                  style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                  <div style={{ padding: '10px', background: 'var(--primary-glow)', borderRadius: '12px' }}>
                    <Truck size={24} color="var(--primary)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Authorize Resource Deployment</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Event: {deployingAlert.disease} - {deployingAlert.location}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label>Select Response Team</label>
                    <select 
                      value={deploymentConfig.team}
                      onChange={(e) => setDeploymentConfig({...deploymentConfig, team: e.target.value})}
                      style={{ background: 'var(--surface-light)', border: '1px solid var(--border)' }}
                    >
                      <option value="RRT-Alpha">Rapid Response Team (RRT) Alpha</option>
                      <option value="RRT-Beta">Rapid Response Team (RRT) Beta</option>
                      <option value="Medical-Logistics">Medical Logistics Support</option>
                      <option value="Field-Surveillance">Field Surveillance Unit</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label>Action Protocol</label>
                    <select 
                      value={deploymentConfig.action}
                      onChange={(e) => setDeploymentConfig({...deploymentConfig, action: e.target.value})}
                      style={{ background: 'var(--surface-light)', border: '1px solid var(--border)' }}
                    >
                      <option value="Mass Screening">Mass Screening & Testing</option>
                      <option value="Sanitization">Localized Sanitization Drive</option>
                      <option value="Public Advisory">Issue Public Health Advisory</option>
                      <option value="Quarantine">Establish Temporary Quarantine</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="form-group" style={{ margin: 0, flex: 1 }}>
                      <label>Deployment Priority</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {['Low', 'Medium', 'High'].map(p => (
                          <button
                            key={p}
                            onClick={() => setDeploymentConfig({...deploymentConfig, priority: p})}
                            style={{
                              flex: 1,
                              padding: '8px',
                              borderRadius: '8px',
                              fontSize: '0.8rem',
                              border: '1px solid var(--border)',
                              background: deploymentConfig.priority === p ? 'var(--primary)' : 'transparent',
                              color: deploymentConfig.priority === p ? 'white' : 'var(--text-muted)',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '12px', borderRadius: '12px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <AlertCircle size={18} color="var(--accent)" style={{ marginTop: '2px' }} />
                    <p style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 500 }}>
                      Confirming this action will notify district health officers and dispatch physical resources.
                    </p>
                  </div>

                  <button 
                    className="h-btn h-btn-primary" 
                    onClick={confirmDeployment}
                    style={{ 
                      width: '100%', 
                      padding: '14px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '10px',
                      marginTop: '0.5rem'
                    }}
                  >
                    <Send size={18} /> Confirm & Dispatch
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showPermissionPrompt && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--surface)',
          border: '1px solid var(--primary)',
          padding: '1rem 2rem',
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          animation: 'slideDown 0.4s ease'
        }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--primary-glow)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bell size={20} color="var(--primary)" />
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>survap.ap.gov.in wants to show notifications</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Allow to receive critical outbreak alerts and system updates.</div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { transform: translate(-50%, -100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Alerts;

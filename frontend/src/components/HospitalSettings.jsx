import React, { useState, useEffect } from 'react';
import { 
  User, Lock, Shield, 
  Palette, Bell, Globe, 
  ChevronRight, Save, LogOut,
  Trash2, Database, Laptop, Fingerprint,
  Smartphone, Activity, CheckCircle2,
  Users, Key, Settings, Zap, AlertTriangle,
  Mail, MessageSquare, Volume2, Search, Filter as FilterIcon,
  Mic, Radio, RefreshCw, CloudRain, HardDrive, Clock
} from 'lucide-react';

const HospitalSettings = ({ role, onRoleChange }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEnrollingBiometric, setIsEnrollingBiometric] = useState(false);
  const [isEnrolling2FA, setIsEnrolling2FA] = useState(false);
  const [isPropagatingRoles, setIsPropagatingRoles] = useState(false);
  const [isPropagatingAlerts, setIsPropagatingAlerts] = useState(false);
  const [isEnrollingVoice, setIsEnrollingVoice] = useState(false);
  const [isSyncingData, setIsSyncingData] = useState(false);
  const [voicePromptIndex, setVoicePromptIndex] = useState(0);
  const voicePrompts = [
    "AUTHORIZE EMERGENCY DISPATCH VIZAG",
    "INITIATE STATEWIDE HEALTH SWEEP",
    "CONFIRM COMPLIANCE AUDIT SYNC",
    "DEPLOY REGIONAL TRAUMA UNITS"
  ];
  const [alertChannelFilter, setAlertChannelFilter] = useState('all');

  const [permissions, setPermissions] = useState([
    { role: 'Administrator', clinical: true, billing: true, inventory: true, staffing: true },
    { role: 'Senior Doctor', clinical: true, billing: false, inventory: true, staffing: false },
    { role: 'Ward Nurse', clinical: true, billing: false, inventory: true, staffing: false },
    { role: 'Pharmacist', clinical: false, billing: true, inventory: true, staffing: false },
    { role: 'Lab Technician', clinical: true, billing: false, inventory: false, staffing: false },
  ]);

  const [triggers, setTriggers] = useState([
    { category: 'Clinical Intelligence', title: 'High Fever Cluster', threshold: '5 Cases/hr', status: 'Active', channels: ['mail', 'msg', 'vol'] },
    { category: 'Logistics Ops', title: 'Critical Bed Occupancy', threshold: '90% Capacity', status: 'Active', channels: ['msg', 'vol'] },
    { category: 'Pharmacy Supply', title: 'Essential Stock Depletion', threshold: '< 10% Stock', status: 'Active', channels: ['mail', 'msg'] },
    { category: 'Emergency Hub', title: 'Ambulance Inbound Peak', threshold: '4 Units/hr', status: 'Inactive', channels: ['msg'] },
  ]);

  const [profilePrefs, setProfilePrefs] = useState({
    emailReports: true,
    highRiskSMS: true
  });

  const [securityState, setSecurityState] = useState({
    biometric: true,
    twoFactor: false
  });

  const togglePermission = (roleIndex, field) => {
    const newPermissions = [...permissions];
    newPermissions[roleIndex][field] = !newPermissions[roleIndex][field];
    setPermissions(newPermissions);
  };

  const toggleTrigger = (index) => {
    const newTriggers = [...triggers];
    newTriggers[index].status = newTriggers[index].status === 'Active' ? 'Inactive' : 'Active';
    setTriggers(newTriggers);
  };

  const syncLogs = [
    { module: 'EMR Intelligence', status: 'Success', timestamp: '14:30:05', size: '2.4 MB' },
    { module: 'Inventory Registry', status: 'Success', timestamp: '14:25:12', size: '840 KB' },
    { module: 'State Health Cloud', status: 'Partial', timestamp: '14:10:45', size: '15.6 MB' },
    { module: 'Biometric Gateway', status: 'Success', timestamp: '13:50:22', size: '124 KB' },
  ];

  return (
    <div className="hospital-settings animate-fade">
      <div className="page-header-h">
        <div className="title-area-h">
          <h2 style={{ color: '#0f172a' }}>System Settings</h2>
          <p style={{ color: '#64748b' }}>Configure your personal profile, role-based access, and hospital station defaults.</p>
        </div>
        <button 
           className="h-btn-primary"
           onClick={() => {
              setIsUpdating(true);
              setTimeout(() => setIsUpdating(false), 3000);
           }}
        >
           <Save size={18} /> Save Preferences
        </button>
      </div>

      <div className="settings-layout-h">
         <aside className="s-sidebar-h">
            <div className="s-nav-h-tactical" style={{ background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
               <button 
                  className={`s-nav-btn-h ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                  style={{ color: activeTab === 'profile' ? 'var(--primary)' : '#64748b' }}
               >
                  <User size={20} /> Personal Profile
               </button>
               <button 
                  className={`s-nav-btn-h ${activeTab === 'security' ? 'active' : ''}`}
                  onClick={() => setActiveTab('security')}
                  style={{ color: activeTab === 'security' ? 'var(--primary)' : '#64748b' }}
               >
                  <Lock size={20} /> Security & Access
               </button>
               <button 
                  className={`s-nav-btn-h ${activeTab === 'roles' ? 'active' : ''}`}
                  onClick={() => setActiveTab('roles')}
                  style={{ color: activeTab === 'roles' ? 'var(--primary)' : '#64748b' }}
               >
                  <Shield size={20} /> Role Management
               </button>
               <button 
                  className={`s-nav-btn-h ${activeTab === 'alerts' ? 'active' : ''}`}
                  onClick={() => setActiveTab('alerts')}
                  style={{ color: activeTab === 'alerts' ? 'var(--primary)' : '#64748b' }}
               >
                  <Bell size={20} /> Alert Triggers
               </button>
               <button 
                  className={`s-nav-btn-h ${activeTab === 'data' ? 'active' : ''}`}
                  onClick={() => setActiveTab('data')}
                  style={{ color: activeTab === 'data' ? 'var(--primary)' : '#64748b' }}
               >
                  <Database size={20} /> Data Sync
               </button>
            </div>
         </aside>

         <main className="s-main-h">
            {activeTab === 'profile' && (
              <div className="s-tab-content animate-fade">
                 <div className="profile-formation-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
                    
                    {/* Identity Formation (Line by Line) */}
                    <div className="identity-formation-h" style={{ textAlign: 'center', padding: '2rem', background: 'white', borderRadius: '28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                       <div className="profile-avatar-h" style={{ width: 140, height: 140, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.05)', border: '2px solid rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', position: 'relative' }}>
                          <Volume2 size={48} color="#10b981" />
                          <div className="avatar-pulse" style={{ position: 'absolute', inset: -5, border: '2px solid #10b981', borderRadius: '50%', opacity: 0.2, animation: 'pulse 2s infinite' }}></div>
                       </div>
                       <h2 style={{ margin: '0 0 8px', fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>Dr. Aruna Varma</h2>
                       <span style={{ display: 'inline-block', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '6px 16px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 900 }}>Medical Officer</span>
                       
                       <div style={{ marginTop: '3rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
                             <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#64748b' }}>Reg No</span>
                             <strong style={{ fontSize: '0.9rem', color: "#0f172a" }}>APMC-82441</strong>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
                             <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#64748b' }}>Facility</span>
                             <strong style={{ fontSize: '0.9rem', color: "#0f172a" }}>Vizag West PHC</strong>
                          </div>
                       </div>
                    </div>

                    {/* Preference Configuration Hub */}
                    <div className="preference-hub-h" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                       <div className="pref-section-h" style={{ background: 'white', borderRadius: '28px', border: '1px solid #e2e8f0', padding: '2.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 900, letterSpacing: '1px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#0f172a' }}>NOTIFICATION PREFERENCES</h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '1.25rem 2rem', borderRadius: '18px', border: '1px solid #e2e8f0', cursor: 'pointer' }} onClick={() => setProfilePrefs(prev => ({ ...prev, emailReports: !prev.emailReports }))}>
                                <div>
                                   <strong style={{ display: 'block', fontSize: '1rem', color: '#0f172a' }}>Email Reports</strong>
                                   <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Receive daily epidemiological summaries via registered email.</span>
                                </div>
                                <div className={`tactical-checkbox ${profilePrefs.emailReports ? 'active' : ''}`} style={{ width: 24, height: 24, borderRadius: '6px', background: profilePrefs.emailReports ? 'var(--primary)' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                                   {profilePrefs.emailReports && <CheckCircle2 size={16} color="white" />}
                                </div>
                             </div>
                             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '1.25rem 2rem', borderRadius: '18px', border: '1px solid #e2e8f0', cursor: 'pointer' }} onClick={() => setProfilePrefs(prev => ({ ...prev, highRiskSMS: !prev.highRiskSMS }))}>
                                <div>
                                   <strong style={{ display: 'block', fontSize: '1rem', color: '#0f172a' }}>High Risk SMS Alerts</strong>
                                   <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Instant mobilization alerts for localized disease clusters.</span>
                                </div>
                                <div className={`tactical-checkbox ${profilePrefs.highRiskSMS ? 'active' : ''}`} style={{ width: 24, height: 24, borderRadius: '6px', background: profilePrefs.highRiskSMS ? 'var(--primary)' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                                   {profilePrefs.highRiskSMS && <CheckCircle2 size={16} color="white" />}
                                </div>
                             </div>
                          </div>
                       </div>

                       <div className="pref-section-h" style={{ background: 'white', borderRadius: '28px', border: '1px solid #e2e8f0', padding: '2.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 900, letterSpacing: '1px', marginBottom: '2rem', color: '#0f172a' }}>SECURITY</h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                             <button className="h-btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', color: "#0f172a", fontWeight: 900, cursor: 'pointer' }}>
                                Change Access Password
                             </button>
                             <button className="h-btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', color: "#0f172a", fontWeight: 900, cursor: 'pointer' }}>
                                MFA Settings
                             </button>
                          </div>
                       </div>
                    </div>

                 </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="s-tab-content animate-fade">
                 <div className="s-section-h" style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '28px', padding: '2.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                    <div className="s-title-h">
                       <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a' }}>Security & Encryption</h3>
                       <p style={{ color: '#64748b' }}>Manage your access credentials and DPDP privacy compliance settings.</p>
                    </div>
                    <div className="security-controls-h">
                       <div className="sec-item-h" style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                             <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                <Fingerprint size={24} />
                             </div>
                             <div>
                                <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#0f172a' }}>Biometric Authentication</h4>
                                <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#64748b' }}>Use your clinical workstation fingerprint for rapid login.</p>
                             </div>
                          </div>
                          <div 
                             className={`tactical-switch ${securityState.biometric ? 'active' : ''}`}
                             onClick={() => {
                                if (!securityState.biometric) setIsEnrollingBiometric(true);
                                setSecurityState(prev => ({ ...prev, biometric: !prev.biometric }));
                             }}
                          ></div>
                       </div>
                       <div className="sec-item-h" style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                             <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                                <Smartphone size={24} />
                             </div>
                             <div>
                                <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#0f172a' }}>Two-Factor Authorization</h4>
                                <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#64748b' }}>Secure sensitive patient data with mobile OTP verification.</p>
                             </div>
                          </div>
                          <div 
                             className={`tactical-switch ${securityState.twoFactor ? 'active' : ''}`}
                             onClick={() => {
                                if (!securityState.twoFactor) setIsEnrolling2FA(true);
                                setSecurityState(prev => ({ ...prev, twoFactor: !prev.twoFactor }));
                             }}
                          ></div>
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'roles' && (
              <div className="s-tab-content animate-fade">
                 <div className="s-section-h" style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '28px', padding: '2.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                    <div className="s-title-h" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                       <div>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a' }}>Permission Control Matrix</h3>
                          <p style={{ color: '#64748b' }}>Define functional authorization levels for regional health workers.</p>
                       </div>
                       <button 
                          className="h-btn-secondary"
                          onClick={() => {
                             setIsPropagatingRoles(true);
                             setTimeout(() => setIsPropagatingRoles(false), 3500);
                          }}
                       >
                          <Zap size={16} /> Propagate Role Updates
                       </button>
                    </div>
                    
                    <div className="h-table-card" style={{ marginTop: '2rem', border: '1px solid #e2e8f0', background: 'white' }}>
                       <table className="h-table">
                          <thead>
                             <tr style={{ background: '#f8fafc' }}>
                                <th style={{ padding: '1.25rem', color: '#0f172a' }}>AUTHORIZATION ROLE</th>
                                <th style={{ padding: '1.25rem', textAlign: 'center', color: '#0f172a' }}>CLINICAL EMR</th>
                                <th style={{ padding: '1.25rem', textAlign: 'center', color: '#0f172a' }}>BILLING / FIN</th>
                                <th style={{ padding: '1.25rem', textAlign: 'center', color: '#0f172a' }}>INVENTORY</th>
                                <th style={{ padding: '1.25rem', textAlign: 'center', color: '#0f172a' }}>STAFFING</th>
                             </tr>
                          </thead>
                          <tbody>
                             {permissions.map((p, i) => (
                               <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                  <td style={{ padding: '1.5rem 1.25rem' }}><strong style={{ color: '#0f172a' }}>{p.role}</strong></td>
                                  <td style={{ textAlign: 'center' }}>
                                     <div 
                                        className={`tactical-switch mini ${p.clinical ? 'active' : ''}`} 
                                        style={{ margin: '0 auto' }}
                                        onClick={() => togglePermission(i, 'clinical')}
                                     ></div>
                                  </td>
                                  <td style={{ textAlign: 'center' }}>
                                     <div 
                                        className={`tactical-switch mini ${p.billing ? 'active' : ''}`} 
                                        style={{ margin: '0 auto' }}
                                        onClick={() => togglePermission(i, 'billing')}
                                     ></div>
                                  </td>
                                  <td style={{ textAlign: 'center' }}>
                                     <div 
                                        className={`tactical-switch mini ${p.inventory ? 'active' : ''}`} 
                                        style={{ margin: '0 auto' }}
                                        onClick={() => togglePermission(i, 'inventory')}
                                     ></div>
                                  </td>
                                  <td style={{ textAlign: 'center' }}>
                                     <div 
                                        className={`tactical-switch mini ${p.staffing ? 'active' : ''}`} 
                                        style={{ margin: '0 auto' }}
                                        onClick={() => togglePermission(i, 'staffing')}
                                     ></div>
                                  </td>
                               </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'alerts' && (
              <div className="s-tab-content animate-fade">
                 <div className="s-section-h" style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '28px', padding: '2.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                    <div className="s-title-h" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                       <div>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a' }}>Alert Intelligence Triggers</h3>
                          <p style={{ color: '#64748b' }}>Define automated mobilization logic established on clinical thresholds.</p>
                       </div>
                       <div style={{ display: 'flex', gap: '10px' }}>
                          <button 
                             className="h-btn-secondary"
                             onClick={() => setIsEnrollingVoice(true)}
                             style={{ background: '#f8fafc', color: "#0f172a" }}
                          >
                             <Mic size={16} /> Voice Configuration
                          </button>
                          <button 
                             className="h-btn-secondary"
                             onClick={() => {
                                setIsPropagatingAlerts(true);
                                setTimeout(() => setIsPropagatingAlerts(false), 3500);
                             }}
                          >
                             <Zap size={16} /> Deploy Alert Logic
                          </button>
                       </div>
                    </div>

                    {/* Tactical Filter Bar */}
                    <div className="tactical-filter-bar-h" style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: '#f8fafc', padding: '12px 1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                       <div style={{ display: 'flex', gap: '10px', alignItems: 'center', borderRight: '1px solid #e2e8f0', paddingRight: '1.5rem' }}>
                          <FilterIcon size={16} color="#64748b" />
                          <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#64748b' }}>CHANNEL FILTER</span>
                       </div>
                       <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                             onClick={() => setAlertChannelFilter('all')}
                             className={`channel-filter-btn ${alertChannelFilter === 'all' ? 'active' : ''}`}
                             style={{ background: alertChannelFilter === 'all' ? 'var(--primary)' : 'transparent', border: 'none', padding: '8px 16px', borderRadius: '10px', color: alertChannelFilter === 'all' ? 'white' : '#64748b', fontSize: '0.75rem', fontWeight: 900, cursor: 'pointer' }}
                          >
                             ALL
                          </button>
                          <div style={{ width: '1px', background: '#e2e8f0', height: '20px', margin: '0 8px' }}></div>
                          <button 
                             onClick={() => setAlertChannelFilter('mail')}
                             style={{ background: alertChannelFilter === 'mail' ? 'rgba(148, 163, 184, 0.1)' : '#f1f5f9', border: 'none', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: alertChannelFilter === 'mail' ? '#1e293b' : '#64748b', cursor: 'pointer', transition: 'all 0.2s' }}
                          >
                             <Mail size={18} />
                          </button>
                          <button 
                             onClick={() => setAlertChannelFilter('msg')}
                             style={{ background: alertChannelFilter === 'msg' ? 'rgba(14, 165, 233, 0.1)' : '#f1f5f9', border: 'none', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: alertChannelFilter === 'msg' ? '#0ea5e9' : '#64748b', cursor: 'pointer', transition: 'all 0.2s' }}
                          >
                             <MessageSquare size={18} />
                          </button>
                          <button 
                             onClick={() => setAlertChannelFilter('vol')}
                             style={{ background: alertChannelFilter === 'vol' ? 'rgba(16, 185, 129, 0.1)' : '#f1f5f9', border: 'none', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: alertChannelFilter === 'vol' ? '#10b981' : '#64748b', cursor: 'pointer', transition: 'all 0.2s' }}
                          >
                             <Volume2 size={18} />
                          </button>
                       </div>
                    </div>

                    <div className="alert-grid-h" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                       {triggers
                          .filter(at => alertChannelFilter === 'all' || at.channels.includes(alertChannelFilter))
                          .map((at, i) => (
                          <div key={i} className="at-card-h animate-fade" style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                             <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#64748b', letterSpacing: '1px' }}>{at.category}</span>
                                <div 
                                   className={`tactical-switch mini ${at.status === 'Active' ? 'active' : ''}`}
                                   onClick={() => toggleTrigger(i)}
                                ></div>
                             </div>
                             <h4 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{at.title}</h4>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <AlertTriangle size={16} color="#f59e0b" />
                                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>Trigger Threshold: <strong style={{ color: "#0f172a" }}>{at.threshold}</strong></span>
                             </div>
                             <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
                                <div style={{ width: 32, height: 32, borderRadius: '8px', background: at.channels.includes('mail') ? '#f1f5f9' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: at.channels.includes('mail') ? '#1e293b' : '#e2e8f0', border: '1px solid #f1f5f9' }}><Mail size={16} /></div>
                                <div style={{ width: 32, height: 32, borderRadius: '8px', background: at.channels.includes('msg') ? 'rgba(14, 165, 233, 0.1)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: at.channels.includes('msg') ? 'var(--primary)' : '#e2e8f0', border: '1px solid #f1f5f9' }}><MessageSquare size={16} /></div>
                                <div style={{ width: 32, height: 32, borderRadius: '8px', background: at.channels.includes('vol') ? 'rgba(16, 185, 129, 0.1)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: at.channels.includes('vol') ? '#10b981' : '#e2e8f0', border: '1px solid #f1f5f9' }}><Volume2 size={16} /></div>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="s-tab-content animate-fade">
                 <div className="s-section-h" style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '28px', padding: '2.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                    <div className="s-title-h" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                       <div>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a' }}>State Health Cloud Synchronization</h3>
                          <p style={{ color: '#64748b' }}>Manage data telemetry between the local facility and statewide cloud architecture.</p>
                       </div>
                       <button 
                          className="h-btn-primary"
                          onClick={() => {
                             setIsSyncingData(true);
                             setTimeout(() => setIsSyncingData(false), 4000);
                          }}
                       >
                          <RefreshCw size={16} /> Force Station Sync
                       </button>
                    </div>

                    <div className="sync-stats-grid" style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: '1.5rem', marginTop: '2rem' }}>
                       <div className="sync-stat-card" style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '1.25rem' }}>
                             <CloudRain size={20} color="var(--primary)" />
                             <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#64748b' }}>CLOUD STATUS</span>
                          </div>
                          <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#10b981' }}>OPERATIONAL</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '6px' }}>LATENCY: 24ms</div>
                       </div>
                       <div className="sync-stat-card" style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '1.25rem' }}>
                             <HardDrive size={20} color="#f59e0b" />
                             <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#64748b' }}>STATION STORAGE</span>
                          </div>
                          <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>1.2 / 5.0 TB</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '6px' }}>76% REMAINING</div>
                       </div>
                       <div className="sync-stat-card" style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '1.25rem' }}>
                             <Clock size={20} color="#0ea5e9" />
                             <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#64748b' }}>LAST SYNC CYCLE</span>
                          </div>
                          <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>04M 12S AGO</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '6px' }}>NEXT: AUTOMATIC (15M)</div>
                       </div>
                    </div>

                    <div className="sync-logs-h" style={{ marginTop: '2.5rem' }}>
                       <h4 style={{ fontSize: '0.85rem', fontWeight: 900, color: '#64748b', marginBottom: '1.25rem', letterSpacing: '1px' }}>SYNCHRONIZATION LOGS</h4>
                       <div className="h-table-card" style={{ border: '1px solid #e2e8f0', background: 'white' }}>
                          <table className="h-table mini">
                             <thead>
                                <tr style={{ background: '#f8fafc' }}>
                                   <th style={{ padding: '1rem', color: '#0f172a' }}>DATA MODULE</th>
                                   <th style={{ padding: '1rem', color: '#0f172a' }}>SYNC STATUS</th>
                                   <th style={{ padding: '1rem', color: '#0f172a' }}>TIMESTAMP</th>
                                   <th style={{ padding: '1rem', textAlign: 'right', color: '#0f172a' }}>PAYLOAD SIZE</th>
                                </tr>
                             </thead>
                             <tbody>
                                {syncLogs.map((log, i) => (
                                   <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                      <td style={{ padding: '1.25rem 1rem' }}><strong style={{ color: '#0f172a' }}>{log.module}</strong></td>
                                      <td style={{ padding: '1.25rem 1rem' }}>
                                         <span style={{ 
                                            padding: '4px 10px', 
                                            borderRadius: '100px', 
                                            fontSize: '0.65rem', 
                                            fontWeight: 900, 
                                            background: log.status === 'Success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                            color: log.status === 'Success' ? '#10b981' : '#f59e0b'
                                         }}>
                                            {log.status.toUpperCase()}
                                         </span>
                                      </td>
                                      <td style={{ padding: '1.25rem 1rem', color: '#64748b', fontSize: '0.8rem' }}>{log.timestamp}</td>
                                      <td style={{ padding: '1.25rem 1rem', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>{log.size}</td>
                                   </tr>
                                ))}
                             </tbody>
                          </table>
                       </div>
                    </div>
                 </div>
              </div>
            )}
         </main>
      </div>

      {/* State Health Cloud Synchronization Overlay */}
      {isSyncingData && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', zIndex: 6500, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div className="radar-animation" style={{ width: 160, height: 160, borderRadius: '50%', border: '2px solid var(--primary)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, var(--primary) 0%, transparent 20%)', animation: 'sweep 2s linear infinite' }}></div>
              <Database size={48} color="var(--primary)" />
           </div>
           <h2 style={{ letterSpacing: '4px', fontWeight: 900, color: 'var(--primary)' }}>SYNCHRONIZING STATE HEALTH CLOUD...</h2>
           <p style={{ marginTop: '1rem', color: '#64748b', fontWeight: 800 }}>UPLOADING: EMR REGISTRY • PHARMACY LOGISTICS • EPIDEMIOLOGICAL DATA</p>
        </div>
      )}

      {/* Voice Recognition Enrollment Overlay */}
      {isEnrollingVoice && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(15px)', zIndex: 6000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ position: 'relative', width: '400px', textAlign: 'center' }}>
              <div className="voice-visualizer" style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '3rem' }}>
                 {[...Array(12)].map((_, i) => (
                    <div 
                       key={i} 
                       style={{ 
                          width: '4px', 
                          background: 'var(--primary)', 
                          borderRadius: '10px', 
                          animation: `wave 1.2s ease-in-out infinite ${i * 0.1}s`,
                          height: '20px'
                       }} 
                    />
                 ))}
              </div>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', margin: '0 auto 2rem', border: '2px solid rgba(239, 68, 68, 0.2)' }}>
                 <Mic size={32} />
              </div>
              <h3 style={{ margin: 0, letterSpacing: '4px', fontWeight: 900, color: "#0f172a" }}>VOICE SIGNATURE CAPTURE...</h3>
              <p style={{ margin: '15px 0 0', color: '#64748b', fontWeight: 800, fontSize: '0.9rem' }}>SPEAK THE AUTHORIZATION PHRASE: <br/> <strong style={{ color: "#0f172a", display: 'block', marginTop: '10px', fontSize: '1.1rem' }}>"{voicePrompts[voicePromptIndex]}"</strong></p>
              
              <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center', gap: '3rem' }}>
                 <div style={{ textAlign: 'center' }}>
                    <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 900, color: '#64748b' }}>BIOMETRIC MATCH</span>
                    <strong style={{ fontSize: '1rem', color: '#10b981' }}>{98 + (voicePromptIndex * 0.4)}%</strong>
                 </div>
                 <div style={{ textAlign: 'center' }}>
                    <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 900, color: '#64748b' }}>PHONETIC SYNC</span>
                    <strong style={{ fontSize: '1rem', color: '#0f172a' }}>{voicePromptIndex < 3 ? 'CALIBRATING...' : 'VERIFIED'}</strong>
                 </div>
              </div>

              <div style={{ marginTop: '4rem', display: 'flex', gap: '15px', width: '100%' }}>
                 <button 
                    className="mo-button-outline" 
                    style={{ flex: 1, borderColor: '#e2e8f0', color: '#64748b' }}
                    onClick={() => setIsEnrollingVoice(false)}
                 >
                    Abort
                 </button>
                 <button 
                    className="mo-button-primary" 
                    style={{ flex: 2, background: 'var(--primary)', border: 'none', color: 'white' }}
                    onClick={() => {
                       if (voicePromptIndex < voicePrompts.length - 1) {
                          setVoicePromptIndex(voicePromptIndex + 1);
                       } else {
                          setIsEnrollingVoice(false);
                          setVoicePromptIndex(0);
                       }
                    }}
                 >
                    {voicePromptIndex < voicePrompts.length - 1 ? 'Capture Next Phrase' : 'Finalize Authorization'}
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Secure Configuration Update Overlay */}
      {isUpdating && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', zIndex: 3000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div className="radar-animation" style={{ width: 160, height: 160, borderRadius: '50%', border: '2px solid var(--primary)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, var(--primary) 0%, transparent 20%)', animation: 'sweep 2s linear infinite' }}></div>
              <Lock size={48} color="var(--primary)" />
           </div>
           <h2 style={{ letterSpacing: '4px', fontWeight: 900, color: 'var(--primary)' }}>SYNCHRONIZING SECURE CONFIGURATION...</h2>
           <p style={{ marginTop: '1rem', color: '#64748b', fontWeight: 800 }}>UPDATING: SYSTEM PREFERENCES • DPDP COMPLIANCE SYNC</p>
        </div>
      )}

      {/* Biometric Enrollment Overlay */}
      {isEnrollingBiometric && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(15px)', zIndex: 4000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ position: 'relative', width: '300px', height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div className="fingerprint-scanner" style={{ width: 140, height: 140, borderRadius: '24px', border: '2px solid rgba(14, 165, 233, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', marginBottom: '3rem' }}>
                 <Fingerprint size={80} color="var(--primary)" style={{ opacity: 0.5 }} />
                 <div className="scan-line" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--primary)', boxShadow: '0 0 15px var(--primary)', animation: 'scan 2.5s ease-in-out infinite' }}></div>
              </div>
              <h3 style={{ margin: 0, letterSpacing: '4px', fontWeight: 900, color: "#0f172a" }}>AUTHENTICATING IDENTITY...</h3>
              <p style={{ margin: '15px 0 0', color: '#0ea5e9', fontWeight: 800, fontSize: '0.9rem' }}>PLACE FINGER ON WORKSTATION SCANNER</p>
              
              <div style={{ marginTop: '4rem', display: 'flex', gap: '2rem' }}>
                 <div style={{ textAlign: 'center' }}>
                    <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 900, color: '#64748b' }}>MATCH STATUS</span>
                    <strong style={{ fontSize: '1rem', color: '#10b981' }}>CAPTURING...</strong>
                 </div>
                 <div style={{ textAlign: 'center' }}>
                    <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 900, color: '#64748b' }}>ENCRYPTION</span>
                    <strong style={{ fontSize: '1rem', color: '#0f172a' }}>AES-256</strong>
                 </div>
              </div>

              <button 
                 className="mo-button-outline" 
                 style={{ marginTop: '4rem', width: '100%', borderColor: '#e2e8f0', color: '#64748b' }}
                 onClick={() => setIsEnrollingBiometric(false)}
              >
                 Abort Authentication
              </button>
           </div>
        </div>
      )}

      {/* 2FA Authorization Overlay */}
      {isEnrolling2FA && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', zIndex: 4500, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ width: '450px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '32px', padding: '3rem', textAlign: 'center', boxShadow: '0 40px 100px rgba(0,0,0,0.1)' }}>
              <div style={{ width: 80, height: 80, borderRadius: '20px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', margin: '0 auto 2rem' }}>
                 <Smartphone size={40} />
              </div>
              <h3 style={{ margin: 0, letterSpacing: '2px', fontWeight: 900, color: '#0f172a' }}>MULTI-FACTOR AUTHORIZATION</h3>
              <p style={{ margin: '10px 0 2.5rem', color: '#64748b', fontSize: '0.9rem' }}>A 6-digit verification code has been dispatched to your registered mobile device ending in •••• 4201.</p>
              
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '2.5rem' }}>
                 {[1, 2, 3, 4, 5, 6].map(i => (
                    <input 
                       key={i} 
                       type="text" 
                       maxLength="1" 
                       style={{ width: '50px', height: '60px', background: '#f8fafc', border: "1px solid #e2e8f0", borderRadius: '12px', textAlign: 'center', fontSize: '1.5rem', fontWeight: 900, color: "#0f172a", outline: 'none' }} 
                       autoFocus={i === 1}
                    />
                 ))}
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                 <button className="mo-button-outline" style={{ flex: 1, borderColor: '#e2e8f0', color: '#64748b' }} onClick={() => setIsEnrolling2FA(false)}>Cancel</button>
                 <button 
                    className="mo-button-primary" 
                    style={{ flex: 2, background: 'var(--primary)', border: 'none', color: 'white' }}
                    onClick={() => {
                       setIsEnrolling2FA(false);
                       setIsUpdating(true);
                       setTimeout(() => setIsUpdating(false), 2500);
                    }}
                 >
                    VERIFY & SECURE
                 </button>
              </div>
              <p style={{ marginTop: '2rem', fontSize: '0.75rem', color: '#64748b', fontWeight: 800 }}>DIDN'T RECEIVE CODE? <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>RESEND DISPATCH</span></p>
           </div>
        </div>
      )}

      {/* Role Propagation Overlay */}
      {isPropagatingRoles && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', zIndex: 5000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div className="radar-animation" style={{ width: 160, height: 160, borderRadius: '50%', border: '2px solid var(--primary)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, var(--primary) 0%, transparent 20%)', animation: 'sweep 2s linear infinite' }}></div>
              <Zap size={48} color="var(--primary)" />
           </div>
           <h2 style={{ letterSpacing: '4px', fontWeight: 900, color: 'var(--primary)' }}>PROPAGATING ROLE UPDATES...</h2>
           <p style={{ marginTop: '1rem', color: '#64748b', fontWeight: 800 }}>ORCHESTRATING: STATEWIDE AUTHORIZATION MATRIX • SYNCING 124 FACILITIES</p>
        </div>
      )}

      {/* Alert Logic Propagation Overlay */}
      {isPropagatingAlerts && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', zIndex: 5500, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div className="radar-animation" style={{ width: 160, height: 160, borderRadius: '50%', border: '2px solid var(--primary)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, var(--primary) 0%, transparent 20%)', animation: 'sweep 2s linear infinite' }}></div>
              <Bell size={48} color="var(--primary)" />
           </div>
           <h2 style={{ letterSpacing: '4px', fontWeight: 900, color: 'var(--primary)' }}>DEPLOYING ALERT LOGIC...</h2>
           <p style={{ marginTop: '1rem', color: '#64748b', fontWeight: 800 }}>CALIBRATING: CLINICAL THRESHOLDS • NOTIFICATION CHANNEL DISPATCH</p>
        </div>
      )}

      <style>{`
        .hospital-settings { display: flex; flex-direction: column; gap: 2rem; }

        .settings-layout-h { display: grid; grid-template-columns: 280px 1fr; gap: 2.5rem; }
        
        .s-nav-h-tactical { background: white; border: 1px solid #e2e8f0; border-radius: 24px; padding: 1rem; display: flex; flex-direction: column; gap: 6px; }
        .s-nav-btn-h { width: 100%; display: flex; align-items: center; gap: 14px; padding: 14px 1rem; border-radius: 12px; background: transparent; border: none; color: #64748b; font-size: 0.95rem; font-weight: 800; cursor: pointer; text-align: left; transition: all 0.2s; }
        .s-nav-btn-h:hover { background: #f8fafc; color: #0f172a; }
        .s-nav-btn-h.active { background: rgba(14, 165, 233, 0.1); color: var(--secondary); }

        .s-main-h { display: flex; flex-direction: column; gap: 2rem; }
        .s-section-h { background: white; border: 1px solid #e2e8f0; border-radius: 28px; padding: 2.5rem; }
        
        .s-title-h { margin-bottom: 2rem; }
        .s-title-h h3 { margin: 0; font-size: 1.2rem; font-weight: 900; }
        .s-title-h p { margin: 6px 0 0 0; color: #64748b; font-size: 0.9rem; font-weight: 600; }

        .role-switcher-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
        .role-choice-card-h { background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; text-align: center; cursor: pointer; transition: all 0.3s; }
        .role-choice-card-h:hover { border-color: var(--primary); transform: translateY(-5px); }
        .role-choice-card-h.active { border-color: var(--primary); background: rgba(14, 165, 233, 0.05); }
        .role-choice-card-h strong { display: block; margin-top: 12px; font-size: 0.95rem; font-weight: 900; color: #0f172a; }
        .role-choice-card-h span { font-size: 0.75rem; color: #64748b; margin-top: 6px; font-weight: 700; }

        .s-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .s-form-group { display: flex; flex-direction: column; gap: 8px; }
        .s-form-group label { font-size: 0.7rem; font-weight: 900; color: #64748b; letter-spacing: 0.5px; }
        
        .tactical-switch { width: 44px; height: 24px; background: #e2e8f0; border-radius: 100px; position: relative; cursor: pointer; transition: all 0.3s; border: 1px solid #e2e8f0; }
        .tactical-switch::after { content: ''; position: absolute; left: 3px; top: 3px; width: 16px; height: 16px; background: white; border-radius: 50%; transition: all 0.3s; }
        .tactical-switch.active { background: var(--primary); border-color: var(--primary); }
        .tactical-switch.active::after { left: 25px; }
        .tactical-switch.mini { width: 36px; height: 18px; }
        .tactical-switch.mini::after { width: 12px; height: 12px; top: 2px; left: 2px; }
        .tactical-switch.mini.active::after { left: 20px; }

        .channel-filter-btn:hover { color: var(--text) !important; background: rgba(255,255,255,0.05) !important; }

        @keyframes scan {
           0% { top: 0%; opacity: 0.2; }
           50% { top: 100%; opacity: 1; }
           100% { top: 0%; opacity: 0.2; }
        }

        @keyframes wave {
           0%, 100% { height: 10px; opacity: 0.5; }
           50% { height: 60px; opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default HospitalSettings;

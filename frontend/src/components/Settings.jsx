import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Database, 
  Lock, 
  Mail, 
  Smartphone,
  Save,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  Calendar,
  Briefcase
} from 'lucide-react';

const Settings = () => {
  const [view, setView] = useState('menu'); // 'menu', 'account', 'details'
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    outbreak: true,
    weekly: true
  });
  const [isSaving, setIsSaving] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  const renderMenu = () => (
    <div className="animate-fade">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <button 
          onClick={() => {}} // In the real app, this would go back to dashboard
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '10px 20px', 
            background: 'var(--surface)', 
            color: 'var(--text)', 
            border: `1px solid var(--border)`, 
            borderRadius: '8px', 
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <ChevronLeft size={20} /> Back
        </button>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>Settings</h2>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Today's Date</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '1.1rem' }}>
            {today} <Calendar size={20} color="var(--primary)" />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
        {/* Account Settings Card */}
        <div 
          onClick={() => setView('account')}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            cursor: 'pointer',
            transition: 'var(--transition)',
            boxShadow: 'var(--shadow-md)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ width: '60px', height: '60px', background: 'var(--primary-light)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <Briefcase size={32} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text)', marginBottom: '4px' }}>Account Settings</h3>
            <p style={{ color: 'var(--text-muted)' }}>Edit your Account Details & Change Password</p>
          </div>
        </div>

        {/* View Account Details Card */}
        <div 
          onClick={() => setView('details')}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            cursor: 'pointer',
            transition: 'var(--transition)',
            boxShadow: 'var(--shadow-md)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ width: '60px', height: '60px', background: 'var(--accent-light)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
            <Eye size={32} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text)', marginBottom: '4px' }}>View Account Details</h3>
            <p style={{ color: 'var(--text-muted)' }}>View Personal information About Your Account</p>
          </div>
          <ChevronRight size={32} color="var(--border)" />
        </div>

        {/* Delete Account Card */}
        <div 
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            cursor: 'pointer',
            transition: 'var(--transition)',
            boxShadow: 'var(--shadow-md)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ width: '60px', height: '60px', background: 'var(--danger-light)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--danger)' }}>
            <Trash2 size={32} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--danger)', marginBottom: '4px' }}>Delete Account</h3>
            <p style={{ color: 'var(--text-muted)' }}>Will Permanently Remove your Account</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccountEdit = () => (
    <div className="animate-fade">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => setView('menu')} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ChevronLeft size={20} /> Back to Settings
        </button>
      </div>
      <div className="chart-container" style={{ maxWidth: '600px' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Edit Account Details</h3>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" defaultValue="Dr. Arjun Reddy" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" defaultValue="arjun.reddy@ap.gov.in" />
        </div>
        <div style={{ marginTop: '2rem' }}>
          <h4 style={{ marginBottom: '1rem' }}>Change Password</h4>
          <div className="form-group">
            <label>New Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
        </div>
        <button className="h-btn h-btn-primary" onClick={handleSave} style={{ width: '100%', marginTop: '1rem' }}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );

  const renderDetails = () => (
    <div className="animate-fade">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => setView('menu')} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ChevronLeft size={20} /> Back to Settings
        </button>
      </div>
      <div className="chart-container" style={{ maxWidth: '600px' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Personal Information</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Name</div>
            <div style={{ fontWeight: 600 }}>Dr. Arjun Reddy</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Designation</div>
            <div style={{ fontWeight: 600 }}>District Health Officer</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Employee ID</div>
            <div style={{ fontWeight: 600 }}>AP-H-2024-8842</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Region</div>
            <div style={{ fontWeight: 600 }}>Krishna District, Andhra Pradesh</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '1rem' }}>
      {view === 'menu' && renderMenu()}
      {view === 'account' && renderAccountEdit()}
      {view === 'details' && renderDetails()}
    </div>
  );
};

export default Settings;

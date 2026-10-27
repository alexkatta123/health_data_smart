import React, { useState } from 'react';
import { 
  Filter, Map, Bell, Activity, Target, ShieldCheck, 
  MapPin, AlertTriangle, CheckCircle, BrainCircuit, Globe
} from 'lucide-react';

const FilterShowcase = () => {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedAlert, setSelectedAlert] = useState('All');
  const [selectedClass, setSelectedClass] = useState('All');

  return (
    <div className="filter-showcase animate-fade" style={{ padding: '1rem 0' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Filter size={28} color="var(--primary)" /> Intelligent Filter Showcase
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>Demonstrating multi-dimensional data filtration: Region, Alert Severity, and AI Classification.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: '2rem', marginBottom: '3rem' }}>
        
        {/* 1. Region Based Filters */}
        <div className="filter-panel" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '2rem', boxShadow: 'var(--card-shadow)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text)' }}>
            <Map size={22} color="var(--primary)" /> Region & Geography
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {['All', 'North Coast', 'Godavari Belt', 'Krishna-Guntur', 'Rayalaseema'].map(region => (
              <button 
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`showcase-tag ${selectedRegion === region ? 'active' : ''}`}
                style={{
                  padding: '8px 16px', borderRadius: '12px', border: '1px solid var(--border)', background: selectedRegion === region ? 'var(--primary)' : 'transparent', color: selectedRegion === region ? 'white' : 'var(--text-muted)', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                {region !== 'All' && <MapPin size={14} style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }} />}
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Alert Based Filters */}
        <div className="filter-panel" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '2rem', boxShadow: 'var(--card-shadow)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text)' }}>
            <Bell size={22} color="#f59e0b" /> Alert Severity
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              { id: 'All', icon: null, color: 'var(--text-muted)' },
              { id: 'Critical Spikes', icon: <AlertTriangle size={14} />, color: '#f43f5e' },
              { id: 'Emerging Clusters', icon: <Target size={14} />, color: '#f59e0b' },
              { id: 'Stable Zones', icon: <CheckCircle size={14} />, color: '#10b981' }
            ].map(alert => (
              <button 
                key={alert.id}
                onClick={() => setSelectedAlert(alert.id)}
                className={`showcase-tag ${selectedAlert === alert.id ? 'active' : ''}`}
                style={{
                  padding: '8px 16px', borderRadius: '12px', border: `1px solid ${selectedAlert === alert.id ? alert.color : 'var(--border)'}`, background: selectedAlert === alert.id ? `${alert.color}20` : 'transparent', color: selectedAlert === alert.id ? alert.color : 'var(--text-muted)', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px'
                }}
              >
                {alert.icon} {alert.id}
              </button>
            ))}
          </div>
        </div>

        {/* 3. AI Disease Classification Filters */}
        <div className="filter-panel" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '2rem', boxShadow: 'var(--card-shadow)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text)' }}>
            <BrainCircuit size={22} color="#8b5cf6" /> Disease Classification
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              { id: 'All', icon: null },
              { id: 'Communicable', icon: <Globe size={14} /> },
              { id: 'Non-Communicable', icon: <Activity size={14} /> },
              { id: 'Zoonotic', icon: <ShieldCheck size={14} /> }
            ].map(cls => (
              <button 
                key={cls.id}
                onClick={() => setSelectedClass(cls.id)}
                className={`showcase-tag ${selectedClass === cls.id ? 'active' : ''}`}
                style={{
                  padding: '8px 16px', borderRadius: '12px', border: '1px solid var(--border)', background: selectedClass === cls.id ? '#8b5cf6' : 'transparent', color: selectedClass === cls.id ? 'white' : 'var(--text-muted)', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px'
                }}
              >
                {cls.icon} {cls.id}
              </button>
            ))}
          </div>
        </div>
      </div>


      {/* District-Oriented Disease Monitoring Matrix */}
      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--text)' }}>
          <Map size={24} color="var(--primary)" /> District-Oriented Disease Monitoring Matrix
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { name: 'Srikakulam', region: 'North Coast', alert: 'Stable Zones', cls: 'Communicable' },
            { name: 'Vizianagaram', region: 'North Coast', alert: 'Emerging Clusters', cls: 'Non-Communicable' },
            { name: 'Visakhapatnam', region: 'North Coast', alert: 'Critical Spikes', cls: 'Communicable' },
            { name: 'Kakinada', region: 'Godavari Belt', alert: 'Stable Zones', cls: 'Zoonotic' },
            { name: 'Konaseema', region: 'Godavari Belt', alert: 'Emerging Clusters', cls: 'Communicable' },
            { name: 'East Godavari', region: 'Godavari Belt', alert: 'Critical Spikes', cls: 'Non-Communicable' },
            { name: 'West Godavari', region: 'Godavari Belt', alert: 'Stable Zones', cls: 'Communicable' },
            { name: 'Eluru', region: 'Godavari Belt', alert: 'Stable Zones', cls: 'Non-Communicable' },
            { name: 'Krishna', region: 'Krishna-Guntur', alert: 'Emerging Clusters', cls: 'Zoonotic' },
            { name: 'NTR (Vijayawada)', region: 'Krishna-Guntur', alert: 'Critical Spikes', cls: 'Communicable' },
            { name: 'Guntur', region: 'Krishna-Guntur', alert: 'Critical Spikes', cls: 'Communicable' },
            { name: 'Bapatla', region: 'Krishna-Guntur', alert: 'Stable Zones', cls: 'Non-Communicable' },
            { name: 'Palnadu', region: 'Krishna-Guntur', alert: 'Stable Zones', cls: 'Zoonotic' },
            { name: 'Prakasam', region: 'Krishna-Guntur', alert: 'Emerging Clusters', cls: 'Communicable' },
            { name: 'Nellore', region: 'Rayalaseema', alert: 'Critical Spikes', cls: 'Communicable' },
            { name: 'Tirupati', region: 'Rayalaseema', alert: 'Critical Spikes', cls: 'Zoonotic' },
            { name: 'Chittoor', region: 'Rayalaseema', alert: 'Emerging Clusters', cls: 'Non-Communicable' },
            { name: 'Annamayya', region: 'Rayalaseema', alert: 'Stable Zones', cls: 'Communicable' },
            { name: 'YSR Kadapa', region: 'Rayalaseema', alert: 'Stable Zones', cls: 'Zoonotic' },
            { name: 'Nandyal', region: 'Rayalaseema', alert: 'Emerging Clusters', cls: 'Non-Communicable' },
            { name: 'Kurnool', region: 'Rayalaseema', alert: 'Critical Spikes', cls: 'Communicable' },
            { name: 'Anantapur', region: 'Rayalaseema', alert: 'Emerging Clusters', cls: 'Non-Communicable' },
            { name: 'Sri Sathya Sai', region: 'Rayalaseema', alert: 'Stable Zones', cls: 'Zoonotic' },
            { name: 'Anakapalli', region: 'North Coast', alert: 'Stable Zones', cls: 'Communicable' },
            { name: 'Parvathipuram Manyam', region: 'North Coast', alert: 'Emerging Clusters', cls: 'Zoonotic' },
            { name: 'Alluri Sitharama Raju', region: 'North Coast', alert: 'Critical Spikes', cls: 'Communicable' }
          ].map(d => {
            const isMatch = (selectedRegion === 'All' || d.region === selectedRegion) &&
                            (selectedAlert === 'All' || d.alert === selectedAlert) &&
                            (selectedClass === 'All' || d.cls === selectedClass);
            
            let bg = 'var(--surface)';
            let borderColor = 'var(--border)';
            let iconColor = 'var(--text-muted)';
            
            if (isMatch) {
              if (d.alert === 'Critical Spikes') { bg = 'rgba(244, 63, 94, 0.1)'; borderColor = '#f43f5e'; iconColor = '#f43f5e'; }
              else if (d.alert === 'Emerging Clusters') { bg = 'rgba(245, 158, 11, 0.1)'; borderColor = '#f59e0b'; iconColor = '#f59e0b'; }
              else { bg = 'rgba(16, 185, 129, 0.1)'; borderColor = '#10b981'; iconColor = '#10b981'; }
            } else {
              bg = 'rgba(0,0,0,0.02)';
            }

            return (
              <div 
                key={d.name} 
                className="district-tile"
                style={{ 
                  background: bg, 
                  border: `1px solid ${borderColor}`, 
                  borderRadius: '16px', 
                  padding: '1.2rem',
                  opacity: isMatch ? 1 : 0.3,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isMatch ? 'scale(1)' : 'scale(0.98)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800 }}>{d.name}</h4>
                  <Activity size={16} color={iconColor} />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontWeight: 700 }}>{d.region}</span>
                  <span style={{ color: iconColor }}>{d.alert}</span>
                  <span>{d.cls}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .showcase-tag:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
      `}</style>
    </div>
  );
};

export default FilterShowcase;

import React from 'react';
import { 
  ClipboardList, 
  Stethoscope, 
  Database, 
  UserCircle,
  FileSearch,
  Activity,
  ArrowRight,
  Shield
} from 'lucide-react';

const DataArchitecture = () => {
  const dataStreams = [
    {
      title: "Outpatient (OP) Records",
      description: "Comprehensive tracking of patient visits, symptomatic data, clinical diagnoses, and prescribed treatment pathways.",
      icon: <Stethoscope size={24} />,
      tags: ["Real-time", "Primary Care"],
      metrics: "Live Stream Active"
    },
    {
      title: "Inpatient (IP) Records",
      description: "Detailed logs for secondary/tertiary facilities, including admission procedures, surgical discharge summaries, and clinical outcomes.",
      icon: <ClipboardList size={24} />,
      tags: ["Secondary", "Tertiary"],
      metrics: "Periodic Sync"
    },
    {
      title: "Disease Classification Data",
      description: "Standardized medical terminology integration using SNOMED CT and ICD-10 coded datasets for automated disease tagging.",
      icon: <Database size={24} />,
      tags: ["Standardized", "NLP"],
      metrics: "Ontology v2.1"
    },
    {
      title: "Demographic Data",
      description: "Anonymized patient profiles including age distribution, gender dynamics, and precise geographic cluster locations.",
      icon: <UserCircle size={24} />,
      tags: ["Privacy-First", "Spatial"],
      metrics: "Encrypted"
    }
  ];

  return (
    <div className="architecture-container animate-fade">
      <div className="arch-header">
        <h2 className="premium-title">Information Architecture</h2>
        <p className="header-subtitle">SurvAP Integrated Data Streams and Ontologies</p>
      </div>

      <div className="arch-grid">
        {dataStreams.map((stream, index) => (
          <div key={index} className="stream-card">
            <div className="stream-icon-wrap">
              {stream.icon}
            </div>
            <div className="stream-content">
              <div className="stream-top">
                <h3>{stream.title}</h3>
                <div className="stream-badge">
                  <div className="pulse-dot"></div>
                  {stream.metrics}
                </div>
              </div>
              <p>{stream.description}</p>
              <div className="stream-tags">
                {stream.tags.map(tag => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
            </div>
            <div className="stream-hover-arrow">
              <ArrowRight size={20} />
            </div>
          </div>
        ))}
      </div>

      <div className="technical-spec">
        <div className="spec-header">
          <FileSearch size={20} />
          <h4>Technical Stream Specification</h4>
        </div>
        <div className="spec-table-wrap">
          <table className="spec-table">
            <thead>
              <tr>
                <th>Data Segment</th>
                <th>Core Attributes</th>
                <th>Standardization</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="segment-name">Outpatient (OP)</td>
                <td>Symptomatic patterns, Primary Diagnoses, Treatment protocols</td>
                <td><span className="code-tag">ICD-10-CM</span></td>
                <td>PHC / CHC / Area Hospitals</td>
              </tr>
              <tr>
                <td className="segment-name">Inpatient (IP)</td>
                <td>Admission logs, Surgical procedures, Discharge summaries</td>
                <td><span className="code-tag">SNOMED CT</span></td>
                <td>District / Teaching Hospitals</td>
              </tr>
              <tr>
                <td className="segment-name">Disease Taxonomy</td>
                <td>Pathogen tagging, Outbreak clusters, Risk vectors</td>
                <td><span className="code-tag">Ontology v2</span></td>
                <td>Platform-Wide AI Engine</td>
              </tr>
              <tr>
                <td className="segment-name">Demographics</td>
                <td>Age, Gender, Geographic Cluster coordinates</td>
                <td><span className="code-tag">Geo-Encoded</span></td>
                <td>All Health Facilities</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="security-footer">
        <Shield size={18} />
        <span>All data streams are processed in compliance with DPDP Privacy Guidelines. No PII is exposed during analysis.</span>
      </div>

      <style>{`
        .architecture-container {
          padding: 1rem;
        }

        .arch-header {
          margin-bottom: 2.5rem;
        }

        .arch-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .stream-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 1.8rem;
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
          transition: all 0.3s ease;
          position: relative;
        }

        .stream-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .stream-icon-wrap {
          width: 50px;
          height: 50px;
          background: var(--surface-light);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          flex-shrink: 0;
        }

        .stream-content {
          flex: 1;
        }

        .stream-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .stream-content h3 {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text);
        }

        .stream-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--text-muted);
          background: var(--surface-light);
          padding: 4px 8px;
          border-radius: 6px;
        }

        .pulse-dot {
          width: 6px;
          height: 6px;
          background: var(--primary);
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }

        .stream-content p {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .stream-tags {
          display: flex;
          gap: 8px;
        }

        .tag-pill {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--primary);
          background: var(--primary-glow);
          padding: 4px 10px;
          border-radius: 100px;
        }

        .technical-spec {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }

        .spec-header {
          padding: 1.5rem 2rem;
          background: var(--surface-light);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--primary);
        }

        .spec-header h4 {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text);
        }

        .spec-table-wrap {
          padding: 1rem;
          overflow-x: auto;
        }

        .spec-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .spec-table th {
          padding: 1rem 1.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 1px solid var(--border);
        }

        .spec-table td {
          padding: 1.2rem 1.5rem;
          font-size: 0.9rem;
          border-bottom: 1px solid var(--border);
          color: var(--text);
        }

        .segment-name {
          font-weight: 700;
          color: var(--primary) !important;
        }

        .code-tag {
          font-family: 'Monaco', monospace;
          background: var(--background);
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.8rem;
          border: 1px solid var(--border);
        }

        .security-footer {
          margin-top: 3rem;
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-muted);
          font-size: 0.85rem;
          padding: 1rem;
          background: rgba(16, 185, 129, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(16, 185, 129, 0.1);
        }
      `}</style>
    </div>
  );
};

export default DataArchitecture;

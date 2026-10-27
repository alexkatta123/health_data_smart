import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  Tag, 
  Info, 
  ShieldCheck, 
  AlertTriangle,
  ChevronRight,
  Database,
  Layers
} from 'lucide-react';

const diseaseData = [
  { 
    id: 1, 
    name: 'Dengue Hemorrhagic Fever', 
    icd10: 'A91', 
    snomed: '409405001', 
    category: 'Viral Infection',
    risk: 'Critical',
    description: 'A severe form of dengue fever that can be fatal if not treated promptly.'
  },
  { 
    id: 2, 
    name: 'Malaria (Plasmodium falciparum)', 
    icd10: 'B50.9', 
    snomed: '61462000', 
    category: 'Parasitic Disease',
    risk: 'High',
    description: 'The most severe form of malaria, causing high fever and neurological complications.'
  },
  { 
    id: 3, 
    name: 'Typhoid Fever', 
    icd10: 'A01.0', 
    snomed: '48330000', 
    category: 'Bacterial Infection',
    risk: 'Medium',
    description: 'A systemic infection caused by Salmonella Typhi, common in areas with poor sanitation.'
  },
  { 
    id: 4, 
    name: 'COVID-19 (SARS-CoV-2)', 
    icd10: 'U07.1', 
    snomed: '840539006', 
    category: 'Viral Respiratory',
    risk: 'Critical',
    description: 'Acute respiratory disease caused by the novel coronavirus.'
  },
  { 
    id: 5, 
    name: 'Chikungunya Fever', 
    icd10: 'A92.0', 
    snomed: '36989005', 
    category: 'Viral Infection',
    risk: 'High',
    description: 'Viral disease transmitted by mosquitoes, causing fever and severe joint pain.'
  },
  { 
    id: 6, 
    name: 'Japanese Encephalitis', 
    icd10: 'A83.0', 
    snomed: '111853004', 
    category: 'Viral Infection',
    risk: 'Critical',
    description: 'A virus spread by mosquito bites, causing inflammation of the brain.'
  },
  { 
    id: 7, 
    name: 'Acute Diarrheal Disease', 
    icd10: 'A09', 
    snomed: '19213003', 
    category: 'Enteric Infection',
    risk: 'Medium',
    description: 'Rapid onset of diarrhea with or without vomiting, common in outbreak scenarios.'
  }
];

const DiseaseCodingLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDisease, setSelectedDisease] = useState(null);

  const filteredDiseases = diseaseData.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.icd10.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.snomed.includes(searchQuery)
  );

  return (
    <div className="coding-library-page animate-fade">
      <header className="library-header">
        <div className="header-title">
          <div className="badge"><Database size={14} /> Classification Standards</div>
          <h1>Disease Classification Intelligence</h1>
          <p>Global SNOMED CT & ICD-10 standardized datasets for clinical tagging.</p>
        </div>
        
        <div className="search-container glass">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Search by Disease Name, ICD-10 Code, or SNOMED CT..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="library-grid">
        <div className="disease-list-section glass">
          <div className="section-header">
            <h3><BookOpen size={18} /> Standardized Pathogen Registry</h3>
            <span className="count-badge">{filteredDiseases.length} Classifications</span>
          </div>
          
          <div className="disease-list">
            {filteredDiseases.map(disease => (
              <div 
                key={disease.id} 
                className={`disease-card ${selectedDisease?.id === disease.id ? 'active' : ''}`}
                onClick={() => setSelectedDisease(disease)}
              >
                <div className="card-main">
                  <div className="disease-info">
                    <h4>{disease.name}</h4>
                    <span className="category-tag">{disease.category}</span>
                  </div>
                  <div className="code-tags">
                    <span className="icd-tag">ICD: {disease.icd10}</span>
                  </div>
                </div>
                <ChevronRight size={18} className="arrow-icon" />
              </div>
            ))}
          </div>
        </div>

        <div className="details-section">
          {selectedDisease ? (
            <div className="disease-details glass animate-slide-up">
              <div className="details-header">
                <div className="title-group">
                  <h2>{selectedDisease.name}</h2>
                  <div className="tag-row">
                    <span className={`risk-pill ${selectedDisease.risk.toLowerCase()}`}>{selectedDisease.risk} Risk</span>
                    <span className="id-pill">ID: {selectedDisease.id}</span>
                  </div>
                </div>
              </div>

              <div className="coding-grid">
                <div className="coding-card icd">
                  <div className="c-header">
                    <Layers size={18} />
                    <span>ICD-10-CM</span>
                  </div>
                  <div className="c-body">
                    <div className="code-val">{selectedDisease.icd10}</div>
                    <p>International Classification of Diseases, 10th Revision</p>
                  </div>
                </div>

                <div className="coding-card snomed">
                  <div className="c-header">
                    <Tag size={18} />
                    <span>SNOMED CT</span>
                  </div>
                  <div className="c-body">
                    <div className="code-val">{selectedDisease.snomed}</div>
                    <p>Systematized Nomenclature of Medicine -- Clinical Terms</p>
                  </div>
                </div>
              </div>

              <div className="info-box">
                <div className="info-header">
                  <Info size={18} />
                  <span>Clinical Description</span>
                </div>
                <p>{selectedDisease.description}</p>
              </div>

              <div className="compliance-status">
                <ShieldCheck size={20} color="#10b981" />
                <span>WHO & IDSP Compliance Verified (DPDP Compliant Data)</span>
              </div>
            </div>
          ) : (
            <div className="empty-state glass">
              <AlertTriangle size={48} color="var(--primary)" />
              <h3>Select a classification to view mapping details</h3>
              <p>Explore full clinical coding parameters across global health standards.</p>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .coding-library-page {
          padding: 2rem;
          color: var(--text);
          min-height: 100vh;
        }

        .library-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2.5rem;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(14, 165, 233, 0.1);
          color: var(--primary);
          padding: 6px 12px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .library-header h1 {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .library-header p {
          color: var(--text-muted);
          font-size: 1rem;
        }

        .search-container {
          position: relative;
          width: 450px;
          padding: 0 !important;
        }

        .search-icon {
          position: absolute;
          left: 1.5rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-container input {
          width: 100%;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 1.25rem 1.5rem 1.25rem 3.5rem;
          color: var(--text);
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .search-container input:focus {
          border-color: var(--primary);
          background: var(--surface);
          box-shadow: 0 0 20px rgba(14, 165, 233, 0.1);
        }

        .library-grid {
          display: grid;
          grid-template-columns: 450px 1fr;
          gap: 2rem;
          height: calc(100vh - 250px);
        }

        .glass {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 2rem;
          backdrop-filter: blur(20px);
        }

        .disease-list-section {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .section-header h3 {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.1rem;
        }

        .count-badge {
          background: var(--surface-light);
          padding: 4px 12px;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .disease-list {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-right: 10px;
        }

        .disease-list::-webkit-scrollbar { width: 4px; }
        .disease-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }

        .disease-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .disease-card:hover {
          background: var(--surface);
          border-color: var(--primary);
          transform: translateX(5px);
        }

        .disease-card.active {
          background: rgba(14, 165, 233, 0.05);
          border-color: var(--primary);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .disease-info h4 {
          font-size: 1rem;
          margin-bottom: 6px;
        }

        .category-tag {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .icd-tag {
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--primary);
          background: rgba(14, 165, 233, 0.1);
          padding: 2px 8px;
          border-radius: 4px;
          margin-top: 8px;
          display: inline-block;
        }

        .arrow-icon {
          color: var(--border);
          transition: transform 0.3s ease;
        }

        .disease-card:hover .arrow-icon {
          color: var(--primary);
          transform: translateX(3px);
        }

        .details-section {
          display: flex;
          flex-direction: column;
        }

        .disease-details {
          height: 100%;
        }

        .details-header {
          margin-bottom: 2.5rem;
        }

        .details-header h2 {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .tag-row {
          display: flex;
          gap: 12px;
        }

        .risk-pill {
          font-size: 0.75rem;
          font-weight: 900;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 6px;
        }

        .risk-pill.critical { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }
        .risk-pill.high { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .risk-pill.medium { background: rgba(16, 185, 129, 0.1); color: #10b981; }

        .id-pill {
          background: var(--surface-light);
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .coding-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .coding-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 1.5rem;
        }

        .c-header {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-muted);
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .code-val {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 8px;
          font-family: monospace;
          letter-spacing: -1px;
        }

        .coding-card.icd .code-val { color: var(--primary); }
        .coding-card.snomed .code-val { color: var(--primary); }

        .c-body p {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .info-box {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .info-header {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--primary);
          font-size: 0.85rem;
          font-weight: 800;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .info-box p {
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .compliance-status {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(16, 185, 129, 0.05);
          border: 1px solid rgba(16, 185, 129, 0.1);
          padding: 1rem;
          border-radius: 16px;
          color: #10b981;
          font-size: 0.9rem;
          font-weight: 700;
        }

        .empty-state {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: var(--text-muted);
        }

        .empty-state h3 {
          font-size: 1.4rem;
          color: var(--text);
          margin: 1.5rem 0 1rem;
        }

        @media (max-width: 1200px) {
          .library-grid { grid-template-columns: 1fr; height: auto; }
          .disease-list-section { height: 400px; }
        }
      ` }} />
    </div>
  );
};

export default DiseaseCodingLibrary;

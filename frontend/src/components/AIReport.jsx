import React from 'react';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  Download, 
  Printer, 
  Share2,
  ArrowRight,
  Activity,
  Zap,
  Globe,
  Database
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

const AIReport = () => {
  const trendData = [
    { name: 'Week 1', cases: 400, prediction: 420 },
    { name: 'Week 2', cases: 600, prediction: 580 },
    { name: 'Week 3', cases: 800, prediction: 850 },
    { name: 'Week 4', cases: 1200, prediction: 1100 },
    { name: 'Week 5', cases: 1500, prediction: 1600 },
    { name: 'Week 6', cases: 1800, prediction: 2100 },
  ];

  const riskFactors = [
    { subject: 'Humidity', A: 120, B: 110, fullMark: 150 },
    { subject: 'Mobility', A: 98, B: 130, fullMark: 150 },
    { subject: 'Water Qual', A: 86, B: 130, fullMark: 150 },
    { subject: 'Sanitation', A: 99, B: 100, fullMark: 150 },
    { subject: 'Vaccination', A: 85, B: 90, fullMark: 150 },
    { subject: 'Temp', A: 65, B: 85, fullMark: 150 },
  ];

  const handleDownloadReport = () => {
    const reportContent = `
SURVAP STATE EPIDEMIOLOGICAL FORECAST
Generated: April 22, 2026 | Model: v4.2.1-AP
--------------------------------------------------

EXECUTIVE SUMMARY:
Current neural network analysis indicates a 15.4% increase in vector-borne disease vectors across the North-Coastal districts. 
Predictive model suggests high probability (P > 0.82) of a localized Dengue outbreak in Visakhapatnam corridor.

CORE TREND DATA (Last 6 Weeks):
Week 1: 400 cases (Prediction: 420)
Week 2: 600 cases (Prediction: 580)
Week 3: 800 cases (Prediction: 850)
Week 4: 1200 cases (Prediction: 1100)
Week 5: 1500 cases (Prediction: 1600)
Week 6: 1800 cases (Prediction: 2100)

AI-DRIVEN STRATEGIC INTERVENTIONS:
1. URGENT: Enhanced Vector Control (Corridor V-16) - Visakhapatnam
2. PROPHYLACTIC: Clinical Alert - Guntur Reporting Discrepancy
3. SYSTEMIC: Resource Reallocation - Platelet unit transfer to North Coastal Hub

CONFIDENTIALITY NOTICE:
This report contains sensitive public health data under the DPDP Act.
--------------------------------------------------
Government of Andhra Pradesh | Health Intelligence Platform
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `SurvAP_State_Forecast_${new Date().toISOString().split('T')[0]}.txt`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="ai-report-page animate-fade">
      <div className="report-header">
        <div className="header-left">
          <div className="report-badge">
            <Zap size={14} /> AI-Generated Intelligence
          </div>
          <h1>State Epidemiological Forecast</h1>
          <p className="report-meta">Generated: April 22, 2026 • 16:45 IST • Model v4.2.1-AP</p>
        </div>
        <div className="header-actions">
          <button className="action-btn"><Share2 size={18} /></button>
          <button className="action-btn"><Printer size={18} /></button>
          <button className="btn-primary" onClick={handleDownloadReport}>
            <Download size={18} /> Download Full Report
          </button>
        </div>
      </div>

      <div className="report-grid">
        {/* Executive Summary */}
        <section className="glass-card full-width summary-section">
          <div className="section-title">
            <Brain size={24} color="var(--primary)" />
            <h2>Executive Summary</h2>
          </div>
          <div className="summary-content">
            <p>
              Current neural network analysis indicates a <strong>15.4% increase</strong> in vector-borne disease vectors across the North-Coastal districts. 
              The predictive model suggests a high probability (P &gt; 0.82) of a localized Dengue outbreak in the Visakhapatnam-Vizianagaram corridor 
              within the next 14 days. Climate correlation models show a strong link between recent unseasonal rainfall and rising mosquito density indices.
            </p>
            <div className="summary-tags">
              <span className="tag high">Critical Alert: Visakhapatnam</span>
              <span className="tag moderate">Rising Trend: Guntur</span>
              <span className="tag stable">Controlled: Nellore</span>
            </div>
          </div>
        </section>

        {/* Core Metrics */}
        <div className="glass-card prediction-chart">
          <div className="section-title">
            <TrendingUp size={20} />
            <h3>Transmission Velocity Forecast</h3>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }}
                  itemStyle={{ color: 'var(--text)' }}
                />
                <Area type="monotone" dataKey="cases" stroke="var(--primary)" fillOpacity={1} fill="url(#colorCases)" strokeWidth={3} />
                <Area type="monotone" dataKey="prediction" stroke="var(--accent)" strokeDasharray="5 5" fill="none" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="chart-caption">Solid line: Observed cases | Dashed line: AI Prediction (±4% error margin)</p>
        </div>

        <div className="glass-card risk-radar">
          <div className="section-title">
            <AlertTriangle size={20} color="var(--accent)" />
            <h3>Environmental Risk Correlation</h3>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={riskFactors}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="subject" stroke="var(--text-muted)" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="var(--border)" />
                <Radar name="Current" dataKey="A" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.5} />
                <Radar name="Baseline" dataKey="B" stroke="var(--text-muted)" fill="var(--text-muted)" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="chart-caption">Analysis of localized environmental stressors vs. historical baseline</p>
        </div>

        {/* AI Recommendations */}
        <section className="glass-card full-width recommendation-section">
          <div className="section-title">
            <Zap size={24} color="var(--accent)" />
            <h2>AI-Driven Strategic Interventions</h2>
          </div>
          <div className="intervention-list">
            <div className="intervention-item urgent">
              <div className="int-header">
                <span className="priority">Urgent</span>
                <h4>Enhanced Vector Control (Corridor V-16)</h4>
              </div>
              <p>Deploy localized fogging and larvae control in Sector 4 and 9 of Visakhapatnam within 48 hours to disrupt the 3rd generation breeding cycle.</p>
              <button className="execute-btn">Execute Protocol <ArrowRight size={14} /></button>
            </div>
            <div className="intervention-item prophylactic">
              <div className="int-header">
                <span className="priority">Prophylactic</span>
                <h4>Clinical Alert: IDSP Submission Latency</h4>
              </div>
              <p>Address reporting delays in 14 private facilities in Guntur. AI detects a 12.5% discrepancy in outpatient fever reporting.</p>
              <button className="execute-btn">Notify Facilities <ArrowRight size={14} /></button>
            </div>
            <div className="intervention-item systemic">
              <div className="int-header">
                <span className="priority">Systemic</span>
                <h4>Resource Reallocation: Blood Units</h4>
              </div>
              <p>Predictive model indicates potential surge in Platelet demand. Pre-emptively move 400 units from Nellore to North Coastal hub.</p>
              <button className="execute-btn">Initiate Transfer <ArrowRight size={14} /></button>
            </div>
          </div>
        </section>

        {/* Data Integrity */}
        <div className="glass-card integrity-card full-width">
          <div className="integrity-header">
            <div className="int-info">
              <ShieldCheck size={20} color="#10b981" />
              <span>Model Veracity & Data Integrity Audit</span>
            </div>
            <div className="sources">
              <Database size={14} /> Sources: AP-Health Cloud, ISRO-GeoData, IDSP-Live
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .ai-report-page { padding: 2rem; color: var(--text); }
        
        .report-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2.5rem; }
        .report-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(245, 158, 11, 0.1); color: var(--accent); padding: 6px 12px; border-radius: 100px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; margin-bottom: 12px; }
        .report-header h1 { font-size: 2.4rem; font-weight: 800; letter-spacing: -0.5px; }
        .report-meta { color: var(--text-muted); font-size: 0.9rem; font-weight: 500; margin-top: 4px; }
        
        .header-actions { display: flex; gap: 1rem; }
        .action-btn { width: 44px; height: 44px; border-radius: 12px; background: var(--surface-light); border: 1px solid var(--border); color: var(--text); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease; }
        .action-btn:hover { border-color: var(--primary); color: var(--primary); }
        .btn-primary { background: var(--primary); border: none; color: var(--text); padding: 0 20px; height: 44px; border-radius: 12px; font-weight: 700; display: flex; align-items: center; gap: 10px; cursor: pointer; }

        .report-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .full-width { grid-column: span 2; }

        .glass-card { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 2rem; backdrop-filter: blur(20px); box-shadow: 0 10px 40px rgba(0,0,0,0.05); }
        .section-title { display: flex; align-items: center; gap: 12px; margin-bottom: 1.5rem; }
        .section-title h2, .section-title h3 { font-size: 1.25rem; font-weight: 800; margin: 0; }

        .summary-content p { font-size: 1.1rem; line-height: 1.6; color: var(--text); margin-bottom: 1.5rem; max-width: 900px; }
        .summary-tags { display: flex; gap: 12px; }
        .tag { padding: 6px 14px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; }
        .tag.high { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }
        .tag.moderate { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .tag.stable { background: rgba(16, 185, 129, 0.1); color: #10b981; }

        .chart-caption { font-size: 0.8rem; color: var(--text-muted); text-align: center; margin-top: 1.5rem; font-weight: 500; }

        .intervention-list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .intervention-item { background: var(--surface-light); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; transition: transform 0.3s ease; }
        .intervention-item:hover { transform: translateY(-5px); border-color: var(--primary); }
        .int-header { display: flex; flex-direction: column; gap: 8px; margin-bottom: 1rem; }
        .priority { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; width: fit-content; padding: 2px 8px; border-radius: 4px; }
        .urgent .priority { background: #f43f5e; color: var(--text); }
        .prophylactic .priority { background: #f59e0b; color: var(--text); }
        .systemic .priority { background: var(--primary); color: var(--text); }
        .intervention-item h4 { font-size: 1rem; font-weight: 700; margin: 0; }
        .intervention-item p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1.5rem; }
        .execute-btn { background: transparent; border: 1px solid var(--border); color: var(--text); padding: 8px 16px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s ease; }
        .execute-btn:hover { background: var(--primary); color: var(--text); border-color: var(--primary); }

        .integrity-card { padding: 1rem 2rem; }
        .integrity-header { display: flex; justify-content: space-between; align-items: center; }
        .int-info { display: flex; align-items: center; gap: 10px; font-size: 0.85rem; font-weight: 700; color: #10b981; }
        .sources { font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; gap: 6px; }
      ` }} />
    </div>
  );
};

export default AIReport;

import React from 'react';
import { opdData } from '../data/opdData';
import { Clock, MapPin, Calendar, Users, Info, Download, Printer } from 'lucide-react';

const OPDTimetable = () => {
  return (
    <div className="opd-container animate-fade">
      <div className="mesh-gradient-opd"></div>
      
      <div className="report-header">
        <div className="hospital-branding">
          <h1>Swami Vivekanand Homoeopathic Hospital</h1>
          <p className="address">Near Sports Complex, Dr. Hahnemann Marg, Sidsar, Bhavnagar - 364060</p>
          <div className="title-box">
            <h2>Time Table of OPD & IPD Homoeopaths</h2>
          </div>
        </div>
        <div className="report-actions">
          <button className="action-pill"><Printer size={16} /> Print Report</button>
          <button className="action-pill primary"><Download size={16} /> Export PDF</button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="premium-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Place</th>
              <th>Days</th>
              <th>Shift</th>
              <th>OPD Time</th>
            </tr>
          </thead>
          <tbody>
            {opdData.map((row) => (
              <tr key={row.no}>
                <td className="col-no">{row.no}</td>
                <td className="col-name">
                  <div className="name-cell">
                    <span className="dr-name">{row.name}</span>
                  </div>
                </td>
                <td className="col-designation">
                  <span className="designation-badge">{row.designation}</span>
                </td>
                <td className="col-place">
                  <div className="icon-text">
                    <MapPin size={12} />
                    <span>{row.place}</span>
                  </div>
                </td>
                <td className="col-days">
                  <div className="icon-text">
                    <Calendar size={12} />
                    <span>{row.days}</span>
                  </div>
                </td>
                <td className="col-shift">
                  <span className={`shift-tag ${row.shift.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}>
                    {row.shift}
                  </span>
                </td>
                <td className="col-time">
                  <div className="time-cell">
                    <Clock size={12} />
                    <span>{row.time}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="report-footer">
        <div className="info-banner">
          <Info size={20} />
          <div className="info-content">
            <p><strong>Sunday & National Holiday:</strong> All OPDs will remain closed.</p>
            <p><strong>IPD Notice:</strong> No case will be admitted in IPD on Sundays & National Holidays.</p>
          </div>
        </div>
      </div>

      <style>{`
        .opd-container {
          position: relative;
          color: var(--text);
          padding: 2rem;
          min-height: 100vh;
        }

        .mesh-gradient-opd {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
                      radial-gradient(circle at 0% 100%, rgba(14, 165, 233, 0.05) 0%, transparent 50%);
          z-index: -1;
          pointer-events: none;
        }

        .report-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 3rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 2rem;
        }

        .hospital-branding h1 {
          font-size: 2.2rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--text) 0%, var(--primary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }

        .address {
          color: var(--text-muted);
          font-size: 1rem;
          margin-bottom: 1.5rem;
          font-weight: 500;
        }

        .title-box {
          display: inline-block;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.2);
          padding: 8px 24px;
          border-radius: 12px;
        }

        .title-box h2 {
          font-size: 1.2rem;
          color: #818cf8;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .report-actions {
          display: flex;
          gap: 12px;
        }

        .action-pill {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 10px 20px;
          border-radius: 100px;
          font-size: 0.9rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .action-pill.primary {
          background: var(--surface);
          border: none;
          box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
        }

        .action-pill:hover { transform: translateY(-2px); background: var(--surface); }
        .action-pill.primary:hover { box-shadow: 0 8px 25px rgba(14, 165, 233, 0.4); }

        .table-wrapper {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          overflow: hidden;
          backdrop-filter: blur(20px);
          margin-bottom: 2rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
        }

        .premium-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
        }

        .premium-table th {
          background: var(--surface);
          text-align: left;
          padding: 20px;
          color: var(--text-muted);
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .premium-table td {
          padding: 18px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.02);
          vertical-align: middle;
        }

        .premium-table tr:hover td {
          background: var(--surface);
        }

        .col-no { color: var(--text-muted); font-weight: 700; font-family: monospace; }
        
        .name-cell { display: flex; flex-direction: column; }
        .dr-name { font-weight: 700; color: var(--text); font-size: 1.05rem; }

        .designation-badge {
          font-size: 0.8rem;
          color: var(--text-muted);
          background: var(--surface);
          padding: 4px 12px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: inline-block;
          max-width: 250px;
          line-height: 1.4;
        }

        .icon-text { display: flex; align-items: center; gap: 8px; color: var(--text-muted); }
        
        .shift-tag {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
          text-transform: uppercase;
        }

        .shift-tag.full-time { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .shift-tag.morning { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .shift-tag.evening { background: rgba(99, 102, 241, 0.1); color: #818cf8; }
        .shift-tag.morning-evening { background: rgba(14, 165, 233, 0.1); color: var(--secondary); }

        .time-cell { display: flex; align-items: center; gap: 8px; color: var(--text-muted); font-weight: 600; }

        .report-footer {
          margin-top: 2rem;
        }

        .info-banner {
          background: rgba(244, 63, 94, 0.05);
          border: 1px solid rgba(244, 63, 94, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          gap: 1.5rem;
          align-items: center;
          color: #f43f5e;
        }

        .info-content p { margin: 0; font-size: 0.9rem; line-height: 1.6; }
        .info-content strong { color: #f43f5e; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade { animation: fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
      `}</style>
    </div>
  );
};

export default OPDTimetable;

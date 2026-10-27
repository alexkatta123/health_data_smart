import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import TrendAnalysis from './components/TrendAnalysis';
import GeospatialAnalysis from './components/GeospatialAnalysis';
import SettingsPage from './components/Settings';
import Alerts from './components/Alerts';
import Login from './components/Login';
import LogoutPage from './components/Logout';
import OPDTimetable from './components/OPDTimetable';
import HospitalLocator from './components/HospitalLocator';
import WhatsAppSupport from './components/WhatsAppSupport';
import DataArchitecture from './components/DataArchitecture';
import DistrictDiseaseIntelligence from './components/DistrictDiseaseIntelligence';
import StaffTracking from './components/StaffTracking';
import DecisionIntelligence from './components/DecisionIntelligence';
import LandingPage from './components/LandingPage';
import MaintenancePage from './components/MaintenancePage';
import HospitalCommandCenter from './components/HospitalCommandCenter';
import EmergencyResponse from './components/EmergencyResponse';
import PatientHealthAnalytics from './components/PatientHealthAnalytics';
import PatientEMR from './components/PatientEMR';
import AIReport from './components/AIReport';
import HospitalPatientRecords from './components/HospitalPatientRecords';
import DiseaseCodingLibrary from './components/DiseaseCodingLibrary';
import PrivacySecurity from './components/PrivacySecurity';
import AdminLogin from './components/AdminLogin';
import HospitalLogin from './components/HospitalLogin';
import FieldStaffLogin from './components/FieldStaffLogin';
import SystemWorkflow from './components/SystemWorkflow';
import AccessPlatform from './components/AccessPlatform';
import CreateServiceAccount from './components/CreateServiceAccount';
import GlobalArchitecture from './components/GlobalArchitecture';
import ClassificationIntelligence from './components/ClassificationIntelligence';
import StrategicWorkflowFormation from './components/StrategicWorkflowFormation';
import UnifiedLogin from './components/UnifiedLogin';
import LogoutPortal from './components/LogoutPortal';
import StateCommandDashboard from './components/StateCommandDashboard';
import PlatformFlowchart from './components/PlatformFlowchart';
import InfrastructureHub from './components/InfrastructureHub';
import MasterSchedule from './components/MasterSchedule';
import SupportWidget from './components/SupportWidget';


import HospitalHome from './components/HospitalHome';
import HospitalDoctors from './components/HospitalDoctors';
import HospitalPatients from './components/HospitalPatients';
import HospitalBeds from './components/HospitalBeds';
import HospitalPharmacy from './components/HospitalPharmacy';
import HospitalLabs from './components/HospitalLabs';
import HospitalEmergency from './components/HospitalEmergency';
import HospitalAppointments from './components/HospitalAppointments';
import HospitalAnalytics from './components/HospitalAnalytics';
import HospitalNotifications from './components/HospitalNotifications';
import HospitalSettings from './components/HospitalSettings';
import VoiceAssistant from './components/VoiceAssistant';
import NotificationBar from './components/NotificationBar';
import PublicAnalytics from './components/PublicAnalytics';

import MedicalOverview from './components/MedicalOverview';
import MedicalAIReview from './components/MedicalAIReview';
import MedicalTrends from './components/MedicalTrends';
import MedicalOutbreakMap from './components/MedicalOutbreakMap';
import MedicalAlerts from './components/MedicalAlerts';
import MedicalCaseExplorer from './components/MedicalCaseExplorer';
import MedicalModelLoop from './components/MedicalModelLoop';
import MedicalIDSPReports from './components/MedicalIDSPReports';
import MedicalProfile from './components/MedicalProfile';
import DistrictOverview from './components/DistrictOverview';
import DistrictOutbreakMap from './components/DistrictOutbreakMap';
import DistrictTrends from './components/DistrictTrends';
import DistrictActionCenter from './components/DistrictActionCenter';
import DistrictResourceHub from './components/DistrictResourceHub';
import DistrictReports from './components/DistrictReports';
import DistrictSettings from './components/DistrictSettings';
import StateOverview from './components/StateOverview';
import StateSurveillance from './components/StateSurveillance';
import StateAnalytics from './components/StateAnalytics';
import StatePolicyHub from './components/StatePolicyHub';
import StateInfrastructure from './components/StateInfrastructure';
import StateExecutiveReports from './components/StateExecutiveReports';
import StateSettings from './components/StateSettings';
import StateTeamDeployment from './components/StateTeamDeployment';
import AdminOverview from './components/AdminOverview';
import AdminUsers from './components/AdminUsers';
import AdminInfrastructure from './components/AdminInfrastructure';
import AdminAIOps from './components/AdminAIOps';
import AdminSecurity from './components/AdminSecurity';
import AdminLogs from './components/AdminLogs';
import AdminSettings from './components/AdminSettings';
import AdminDeploy from './components/AdminDeploy';
import DataIngestionGateway from './components/DataIngestionGateway';
import FilterShowcase from './components/FilterShowcase';
import MissionOperations from './components/MissionOperations';
import PoCSuccessReport from './components/PoCSuccessReport';
import TacticalSurveillanceMap from './components/TacticalSurveillanceMap';
import HMISIntelligence from './components/HMISIntelligence';
import DistrictSurveillanceMatrix from './components/DistrictSurveillanceMatrix';
import DistrictPerformanceHub from './components/DistrictPerformanceHub';
import AdvancedPatientRegistration from './components/AdvancedPatientRegistration';
import PatientCaseFile from './components/PatientCaseFile';
import { 
  LayoutDashboard, 
  PlusCircle, 
  TrendingUp, 
  MapPin, 
  Map as MapIcon,
  Search,
  Bell, 
  Settings,
  Filter,
  Target,
  Activity,
  MessageSquare,
  LogOut,
  ClipboardList,
  Sun,
  Moon,
  Database,
  Users,
  Clock,
  Brain,
  ShieldAlert,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
  Home,
  Zap,
  FileText,
  Mic,
  Building2,
  Tag,
  ShieldCheck,
  UserCircle,
  Bed,
  Pill,
  TestTube,
  Ambulance,
  Calendar,
  BarChart3,
  Rocket,
  Microscope,
  ClipboardCheck,
  Stethoscope,
  Truck,
  Send,
  Share2,
  Printer,
  Layers,
  Award,
  Compass,
  Globe,
  Cpu,
  Server,
  RefreshCw,
  Lock as LockIcon,
  EyeOff,
  Terminal,
  Key,
  Network,
  AlertCircle,
  UserPlus
} from 'lucide-react';

class DashboardErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, errorInfo) { console.error("Dashboard Error:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '4rem', textAlign: 'center', background: 'var(--surface)', borderRadius: '32px', border: '1px solid var(--border)' }}>
          <AlertCircle size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
          <h3>Visualization Initialization Delay</h3>
          <p>We are recalibrating the intelligence engine. Please refresh or select another module.</p>
          <button onClick={() => window.location.reload()} className="mo-button-primary" style={{ marginTop: '2rem', padding: '12px 24px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer' }}>Restart Engine</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('vidya_is_logged_in') === 'true');
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [userRole, setUserRole] = useState(JSON.parse(localStorage.getItem('vidya_user_role')) || null); // { id, title, color }
  const [activeTab, setActiveTab] = useState(localStorage.getItem('vidya_active_tab') || 'home');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('light');
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(
    localStorage.getItem('survap_maintenance') === 'true'
  );

  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('vidya_patients_v2');
    return saved ? JSON.parse(saved) : [
      { id: 'P-1024', name: 'Ramesh Kumar', age: 45, gender: 'Male', village: 'Mangalagiri', mobile: '+91 98480 22310', disease: 'Hypertension', room: '302-A', status: 'Inpatient', doctor: 'Dr. Khan', phc: 'Guntur Urban PHC', clinicalActions: [{ time: '10:00 AM', action: 'BP Monitored: 140/95', dr: 'Dr. Khan' }] },
      ...Array.from({ length: 499 }, (_, i) => ({
        id: `P-${1025 + i}`,
        name: [`Anjali Reddy`, `Baskar Rao`, `Chaitanya P`, `Deepika M`, `Eshwar K`, `Farah Khan`, `Gautam V`, `Harika S`][i % 8] + ` ${i}`,
        age: 18 + (i % 65),
        gender: i % 2 === 0 ? 'Male' : 'Female',
        village: ['Mangalagiri', 'Tenali', 'Ponnur', 'Bapatla', 'Repalle', 'Amaravati'][i % 6],
        mobile: `+91 ${70000 + i % 10000} ${10000 + i % 90000}`,
        disease: ['Dengue Suspected', 'Malaria', 'Acute Respiratory Infection', 'Viral Fever', 'Hypertension', 'Gastroenteritis', 'Diabetes'][i % 7],
        room: i % 15 === 0 ? 'ICU-0' + (i % 9) : (i % 5 === 0 ? 'OPD' : `Ward-${100 + i % 50}`),
        status: i % 15 === 0 ? 'Critical' : (i % 5 === 0 ? 'Outpatient' : 'Inpatient'),
        doctor: ['Dr. Prasad', 'Dr. Lakshmi', 'Dr. Reddy', 'Dr. Wilson', 'Dr. Khan', 'Dr. Sharma'][i % 6],
        phc: ['Guntur Urban PHC', 'Mangalagiri PHC', 'Tenali CHC', 'Amaravati PHC', 'Ponnur PHC', 'Bapatla CHC', 'Repalle PHC'][i % 7],
        clinicalActions: []
      }))
    ];
  });

  React.useEffect(() => {
    localStorage.setItem('vidya_active_tab', activeTab);
    localStorage.setItem('vidya_is_logged_in', isLoggedIn);
    localStorage.setItem('vidya_user_role', JSON.stringify(userRole));
    localStorage.setItem('vidya_patients_v2', JSON.stringify(patients));
  }, [activeTab, isLoggedIn, userRole, patients]);

  React.useEffect(() => {
    const checkMaintenance = () => {
      setIsMaintenanceMode(localStorage.getItem('survap_maintenance') === 'true');
    };
    window.addEventListener('maintenanceUpdate', checkMaintenance);
    return () => window.removeEventListener('maintenanceUpdate', checkMaintenance);
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme('light'); // Force light theme
  };

  const [loginInitialRole, setLoginInitialRole] = useState('Admin');

  // For Demo: Allow quick role switching to see all screens
  const switchRole = (roleKey) => {
    let roleData;
    if (roleKey === 'Admin') {
      roleData = { id: 'admin', title: 'State Administrator', color: '#10B981' };
      setActiveTab('admin-overview');
    } else if (roleKey === 'Hospital') {
      roleData = { id: 'doctor', title: 'Medical Officer', color: '#059669' };
      setActiveTab('medical-overview');
    } else if (roleKey === 'DataEntry') {
      roleData = { id: 'staff', title: 'Field Staff', color: '#34D399' };
      setActiveTab('hospital-home');
    }
    setUserRole(roleData);
    setIsLoggedIn(true);
  };

  const handleLogin = (roleKey) => {
    switchRole(roleKey);
  };

  const handleNavigate = (page, role) => {
    if (page === 'login') {
      setLoginInitialRole(role);
      setActiveTab('login-view');
    } else if (page === 'public' || page === 'public-analytics') {
      setActiveTab('public-analytics'); 
    } else {
      setActiveTab(page);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsLoggedOut(true);
    setUserRole(null);
    setActiveTab('home');
    localStorage.removeItem('vidya_is_logged_in');
    localStorage.removeItem('vidya_user_role');
    localStorage.removeItem('vidya_active_tab');
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': 
        return <Dashboard userRole={userRole} onNavigate={setActiveTab} />;
      case 'trends': return <TrendAnalysis />;
      case 'geospatial': return <GeospatialAnalysis />;
      case 'opd-schedule': return <OPDTimetable />;
      case 'hospital-map': return <HospitalCommandCenter />;
      case 'whatsapp-support': return <WhatsAppSupport onBack={() => setActiveTab('dashboard')} />;
      case 'data-architecture': return <DataArchitecture />;
      case 'district-intel': return <DistrictDiseaseIntelligence />;
      case 'staff-timings': return <StaffTracking />;
      case 'decision-intel': return <DecisionIntelligence />;
      case 'strategic-vision': return <StrategicWorkflowFormation onNavigate={setActiveTab} />;
      case 'filter-showcase': return <FilterShowcase />;
      case 'mission-operations': return <MissionOperations />;
      case 'poc-success': return <PoCSuccessReport />;
      case 'tactical-map': return <TacticalSurveillanceMap />;
      case 'infrastructure-hub': return <InfrastructureHub />;
      case 'home': return <LandingPage onNavigate={handleNavigate} userRole={userRole} />;
      case 'login-view': 
        if (loginInitialRole === 'Admin') return <AdminLogin onLogin={handleLogin} />;
        if (loginInitialRole === 'Hospital') return <HospitalLogin onLogin={handleLogin} />;
        if (loginInitialRole === 'DataEntry') return <FieldStaffLogin onLogin={handleLogin} />;
        return <Login onLogin={handleLogin} initialRole={loginInitialRole} />;
      case 'access-platform': return <UnifiedLogin onLogin={handleLogin} />;
      case 'system-workflow': return <PlatformFlowchart />;
      case 'emergency-response': return <EmergencyResponse />;
      case 'strategic-report': return <AIReport />;
      case 'hospital-registry': return <HospitalPatientRecords onViewEMR={(id) => { setSelectedPatient(id); setActiveTab('patient-emr'); }} />;
      case 'clinical-data': return <PatientHealthAnalytics onViewEMR={(id) => { setSelectedPatient(id); setActiveTab('patient-emr'); }} />;
      case 'patient-emr': return <PatientEMR patientId={selectedPatient} onBack={() => setActiveTab('clinical-data')} />;
      case 'public-analytics': return <PublicAnalytics onBack={() => setActiveTab('home')} />;
      case 'settings': return <SettingsPage />;
      case 'alerts': return <Alerts />;
      case 'coding-library': return <DiseaseCodingLibrary />;
      case 'security-privacy': return <PrivacySecurity />;
      
      // Hospital Staff Pages
      case 'hospital-home': return <HospitalHome role={userRole?.title} onNavigate={setActiveTab} />;
      case 'hospital-doctors': return <HospitalDoctors onNavigate={setActiveTab} />;
      case 'master-schedule': return <MasterSchedule onBack={() => setActiveTab('hospital-doctors')} />;
      case 'hospital-patients': return <HospitalPatients onNavigate={setActiveTab} patients={patients} setPatients={setPatients} setSelectedPatient={setSelectedPatient} />;
      case 'hospital-beds': return <HospitalBeds />;
      case 'hospital-pharmacy': return <HospitalPharmacy />;
      case 'hospital-labs': return <HospitalLabs />;
      case 'hospital-emergency': return <HospitalEmergency />;
      case 'hospital-appointments': return <HospitalAppointments />;
      case 'hospital-reports': return <HospitalAnalytics />;
      case 'hospital-notifications': return <HospitalNotifications />;
      case 'hospital-settings': return <HospitalSettings role={userRole?.title} />;

      // District Officer Pages
      case 'district-overview': return <DistrictOverview />;
      case 'district-map': return <DistrictOutbreakMap />;
      case 'district-trends': return <DistrictTrends />;
      case 'district-action': return <DistrictActionCenter />;
      case 'district-resources': return <DistrictResourceHub />;
      case 'district-reports': return <DistrictReports />;
      case 'district-classification': return <ClassificationIntelligence />;
      case 'district-settings': return <DistrictSettings />;

      // State Official Pages
      case 'state-overview': return <StateCommandDashboard />;
      case 'state-surveillance': return <StateSurveillance />;
      case 'state-analytics': return <StateAnalytics />;
      case 'state-policy': return <StatePolicyHub />;
      case 'state-infra': return <StateInfrastructure />;
      case 'state-reports': return <StateExecutiveReports />;
      case 'state-settings': return <StateSettings />;
      case 'state-deploy': return <StateTeamDeployment />;

      // System Admin Pages
      case 'admin-overview': return <AdminOverview />;
      case 'admin-users': return <AdminUsers />;
      case 'admin-infra': return <AdminInfrastructure />;
      case 'admin-aiops': return <AdminAIOps />;
      case 'ingestion': return <DataIngestionGateway />;
      case 'admin-security': return <AdminSecurity />;
      case 'admin-service': return <CreateServiceAccount />;
      case 'admin-logs': return <AdminLogs />;
      case 'admin-settings': return <GlobalArchitecture />;

      // Medical Officer Pages
      case 'medical-overview': return <MedicalOverview />;
      case 'medical-review': return <MedicalAIReview />;
      case 'medical-trends': return <MedicalTrends />;
      case 'medical-map': return <MedicalOutbreakMap />;
      case 'medical-alerts': return <MedicalAlerts />;
      case 'medical-explorer': return <MedicalCaseExplorer />;
      case 'medical-loop': return <MedicalModelLoop />;
      case 'medical-reports': return <MedicalIDSPReports />;
      case 'medical-profile': return <MedicalProfile />;
      case 'hmis-records': return <HMISIntelligence />;
      case 'district-matrix': return <DistrictSurveillanceMatrix />;
      case 'performance-hub': return <DistrictPerformanceHub />;
      case 'advanced-registration': return <AdvancedPatientRegistration onNavigate={setActiveTab} setPatients={setPatients} />;
      case 'patient-case-file': return <PatientCaseFile 
        patientData={patients.find(p => p.id === selectedPatient)} 
        onBack={() => setActiveTab('hospital-patients')} 
        setPatients={setPatients}
        patients={patients}
      />;
      
      default: return <Dashboard userRole={userRole} />;
    }
  };

  if (isLoggedIn && userRole?.id === 'admin') {
    // Admin is exempt from maintenance mode
  } else if (isMaintenanceMode) {
    return <MaintenancePage />;
  }

  if (isLoggedOut) {
    return <LogoutPortal onReturn={() => setIsLoggedOut(false)} />;
  }

  if (!isLoggedIn) {
    return renderContent(); // This will default to 'home' because activeTab starts as 'home'
  }

  const navItems = [
    { id: 'dashboard', label: 'Global Monitoring', icon: <LayoutDashboard size={20} />, roles: [] }, // Reserved
    
    // System Admin Pages (Refined for Clinical Governance)
    { id: 'admin-overview', label: 'Tactical Command', icon: <Activity size={20} />, roles: ['admin'] },
    { id: 'district-intel', label: 'Regional Intel', icon: <Globe size={20} />, roles: ['admin', 'state'] },
    { id: 'hmis-records', label: 'HMIS Repository', icon: <Database size={20} />, roles: ['admin', 'state', 'doctor', 'dho'] },
    { id: 'state-surveillance', label: 'State Surveillance', icon: <Compass size={20} />, roles: ['admin', 'state'] },
    { id: 'medical-reports', label: 'Clinical Audits', icon: <FileSpreadsheet size={20} />, roles: ['admin', 'doctor'] },
    { id: 'strategic-vision', label: 'Strategic Vision', icon: <Network size={20} />, roles: ['admin', 'state'] },
    { id: 'mission-operations', label: 'Mission Ops', icon: <Target size={20} />, roles: ['admin', 'state'] },
    { id: 'admin-users', label: 'Access Control', icon: <Users size={20} />, roles: ['admin'] },
    { id: 'admin-settings', label: 'Global Architecture', icon: <Settings size={20} />, roles: ['admin'] },

    // State Official Pages
    { id: 'state-overview', label: 'Strategic Command', icon: <Globe size={20} />, roles: ['state'] },
    { id: 'state-analytics', label: 'Deep Analytics', icon: <TrendingUp size={20} />, roles: ['state'] },
    { id: 'state-policy', label: 'Policy Hub', icon: <ShieldCheck size={20} />, roles: ['state'] },
    { id: 'state-infra', label: 'State Infrastructure', icon: <Building2 size={20} />, roles: ['state'] },
    { id: 'state-reports', label: 'Executive Dossiers', icon: <Award size={20} />, roles: ['state'] },
    { id: 'state-deploy', label: 'Team Deployment', icon: <Rocket size={20} />, roles: ['admin', 'state'] },
    { id: 'state-settings', label: 'State Config', icon: <Settings size={20} />, roles: ['state'] },
    { id: 'filter-showcase', label: 'Intelligent Filters', icon: <Filter size={20} />, roles: ['admin', 'state', 'dho'] },
    { id: 'poc-success', label: 'PoC Success Report', icon: <Award size={20} />, roles: ['admin', 'state'] },
    { id: 'district-matrix', label: 'District Matrix', icon: <Layers size={20} />, roles: ['admin', 'state', 'dho'] },
    { id: 'performance-hub', label: 'Performance Hub', icon: <TrendingUp size={20} />, roles: ['admin', 'state', 'dho'] },

    // District Officer Pages
    { id: 'district-overview', label: 'District Hub', icon: <Activity size={20} />, roles: ['dho'] },
    { id: 'district-map', label: 'Outbreak Map', icon: <MapIcon size={20} />, roles: ['dho'] },
    { id: 'district-trends', label: 'Trend Analysis', icon: <TrendingUp size={20} />, roles: ['dho'] },
    { id: 'district-action', label: 'Action Center', icon: <Zap size={20} />, roles: ['dho'] },
    { id: 'district-resources', label: 'Resource Hub', icon: <Truck size={20} />, roles: ['dho'] },
    { id: 'district-classification', label: 'Classification Intel', icon: <Zap size={20} />, roles: ['dho', 'state'] },
    { id: 'district-reports', label: 'Intelligence Reports', icon: <FileSpreadsheet size={20} />, roles: ['dho'] },
    { id: 'district-settings', label: 'Jurisdiction Config', icon: <Settings size={20} />, roles: ['dho'] },

    // Medical Officer Pages
    { id: 'medical-overview', label: 'Clinical Overview', icon: <BarChart3 size={20} />, roles: ['doctor'] },
    { id: 'tactical-map', label: 'Tactical Map', icon: <MapIcon size={20} />, roles: ['admin', 'state', 'doctor'] },
    { id: 'medical-review', label: 'AI Review', icon: <Brain size={20} />, roles: ['doctor'] },
    { id: 'medical-trends', label: 'Trends', icon: <TrendingUp size={20} />, roles: ['doctor'] },
    { id: 'medical-map', label: 'Outbreak Map', icon: <MapIcon size={20} />, roles: ['doctor'] },
    { id: 'medical-alerts', label: 'Early Warning', icon: <Bell size={20} />, roles: ['doctor'] },
    { id: 'medical-explorer', label: 'Case Explorer', icon: <Search size={20} />, roles: ['doctor'] },
    { id: 'medical-loop', label: 'Model Loop', icon: <Zap size={20} />, roles: ['doctor'] },
    { id: 'medical-reports', label: 'IDSP Reports', icon: <FileSpreadsheet size={20} />, roles: ['doctor'] },
    { id: 'hmis-records', label: 'HMIS Records', icon: <Database size={20} />, roles: ['admin', 'state', 'doctor', 'dho'] },

    { id: 'hospital-home', label: 'Hospital Home', icon: <Home size={20} />, roles: ['staff'] },
    { id: 'hospital-doctors', label: 'Doctors', icon: <UserCircle size={20} />, roles: ['staff'] },
    { id: 'hospital-patients', label: 'Patient Registry', icon: <Users size={20} />, roles: ['hospital', 'staff'] },
    { id: 'advanced-registration', label: 'Advanced Intake', icon: <UserPlus size={20} />, roles: ['hospital', 'admin', 'staff'] },
    { id: 'hospital-beds', label: 'Bed Management', icon: <Layers size={20} />, roles: ['hospital', 'staff'] },
    { id: 'hospital-pharmacy', label: 'Pharmacy', icon: <Pill size={20} />, roles: ['staff'] },
    { id: 'hospital-labs', label: 'Lab Reports', icon: <TestTube size={20} />, roles: ['staff'] },
    { id: 'hospital-emergency', label: 'Emergency', icon: <Ambulance size={20} />, roles: ['staff'] },
    { id: 'hospital-appointments', label: 'Appointments', icon: <Calendar size={20} />, roles: ['staff'] },
    { id: 'hospital-reports', label: 'Reports', icon: <BarChart3 size={20} />, roles: ['staff'] },
    { id: 'hospital-notifications', label: 'Notifications', icon: <Bell size={20} />, roles: ['staff'] },
    { id: 'hospital-settings', label: 'Settings', icon: <Settings size={20} />, roles: ['staff'] },
  ];

  const filteredNavItems = navItems.filter(item => 
    userRole && item.roles.includes(userRole.id) && 
    (item.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
     item.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="app-container">
      {/* Premium Role-Aware Tactical Sidebar */}
      <aside className={`sidebar ${userRole?.id}-theme animate-fade`}>
        <div className="sidebar-brand">
          <div className="brand-logo" style={{ background: userRole?.color || 'var(--primary)', boxShadow: `0 10px 30px ${(userRole?.color || '#000000')}30` }}>
            <Activity size={28} color="#FFFFFF" />
          </div>
          <div className="brand-text">
            <span>SurvAP Intelligence</span>
            <small>{userRole.title} Command Hub</small>
          </div>
        </div>

        <nav className="nav-links-tactical">
          <div className="nav-group-label">Tactical Operations</div>
          
          {/* Removed hardcoded Data Ingestion */}

          {filteredNavItems.map(item => (
            <div 
              key={item.id}
              className={`nav-item-tactical ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
              style={{ '--accent': userRole.color }}
              title={item.label}
            >
              <div className="n-icon-box">{item.icon}</div>
              <span className="n-label">{item.label}</span>
              {activeTab === item.id && <div className="n-active-glow" style={{ background: userRole.color }} />}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="content-header">
          <div className="header-breadcrumb">
            <Home size={16} />
            <span>/ {activeTab.replace('-', ' ')}</span>
            {userRole && (
              <span className="role-tag" style={{ marginLeft: '15px', padding: '2px 10px', background: `${userRole.color}20`, color: userRole.color, borderRadius: '100px', fontSize: '0.7rem', fontWeight: 800, border: `1px solid ${userRole.color}30` }}>
                {userRole.title.toUpperCase()}
              </span>
            )}
            
          </div>
          <div className="header-search-tactical">
            <div className="search-box-premium">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search modules..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="search-shortcut">⌘K</div>
            </div>
          </div>

          <div className="header-actions-right" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <button 
              onClick={toggleTheme}
              style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '12px', 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid rgba(255,255,255,0.05)', 
                color: 'var(--text)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                cursor: 'pointer',
                transition: '0.3s'
              }}
              className="theme-toggle-btn"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="top-sign-out" onClick={handleLogout}>
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </header>
        <div className="animate-fade content-body">
          <DashboardErrorBoundary key={activeTab}>
            {renderContent()}
          </DashboardErrorBoundary>
        </div>
      </main>

      <SupportWidget />

      {showVoiceAssistant && <VoiceAssistant onClose={() => setShowVoiceAssistant(false)} />}


      <style>{`
        .sidebar {
          width: var(--sidebar-width);
          background: var(--surface);
          border-right: 1px solid var(--border);
          padding: 2rem 1.25rem;
          height: 100vh;
          position: sticky;
          top: 0;
          display: flex;
          flex-direction: column;
          z-index: 1000;
          transition: var(--transition);
        }

        .sidebar-brand { display: flex; align-items: center; gap: 15px; margin-bottom: 2.5rem; padding: 0 10px; }
        .brand-logo { width: 50px; height: 50px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .brand-text span { display: block; font-weight: 800; font-size: 1.1rem; color: var(--text); }
        .brand-text small { font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }

        .nav-links-tactical { flex: 1; display: flex; flex-direction: column; gap: 4px; overflow-y: auto; padding-right: 4px; }
        .nav-links-tactical::-webkit-scrollbar { width: 4px; }
        .nav-links-tactical::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }

        .nav-group-label { font-size: 0.65rem; font-weight: 900; text-transform: uppercase; color: var(--text-muted); letter-spacing: 1.5px; margin: 1.5rem 0 0.5rem 10px; opacity: 0.6; }

        .nav-item-tactical {
          display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 12px; cursor: pointer; color: var(--text-muted); transition: var(--transition); font-weight: 700; font-size: 0.85rem;
        }
        .nav-item-tactical:hover { background: var(--surface-light); color: var(--primary); transform: translateX(5px); }
        .nav-item-tactical.active { background: var(--primary-glow); color: var(--primary); }
        
        .n-icon-box { width: 34px; height: 34px; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: var(--surface-light); transition: var(--transition); }
        .nav-item-tactical.active .n-icon-box { background: var(--primary); color: white; box-shadow: 0 8px 16px var(--primary-glow); }

        .main-content { flex: 1; min-width: 0; background: var(--background); }
        .content-header { height: var(--header-height); display: flex; align-items: center; justify-content: space-between; padding: 0 2.5rem; background: var(--glass); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 900; }
        
        .header-search-tactical { flex: 1; max-width: 500px; margin: 0 2rem; }
        .search-box-premium { display: flex; align-items: center; gap: 10px; background: var(--surface-light); border: 1px solid var(--border); padding: 10px 16px; border-radius: 100px; }
        .search-box-premium input { background: transparent; border: none; color: var(--text); font-weight: 600; width: 100%; outline: none; }

        .content-body { padding: 2.5rem; max-width: 1600px; margin: 0 auto; }

        @media (max-width: 1200px) {
          .sidebar { width: var(--sidebar-collapsed-width); padding: 2rem 0.75rem; }
          .brand-text, .n-label, .nav-group-label { display: none; }
          .nav-item-tactical { justify-content: center; }
        }

        @media (max-width: 992px) {
          .sidebar {
            width: 100%; height: auto; position: fixed; bottom: 0; top: auto; flex-direction: row; padding: 10px; border-right: none; border-top: 1px solid var(--border);
          }
          .sidebar-brand { display: none; }
          .nav-links-tactical { flex-direction: row; gap: 10px; overflow-x: auto; scrollbar-width: none; }
          .nav-links-tactical::-webkit-scrollbar { display: none; }
          .nav-item-tactical { flex-direction: column; gap: 4px; padding: 8px; min-width: 70px; font-size: 0.6rem; }
          .n-icon-box { width: 30px; height: 30px; }
          .n-label { display: block !important; }
          .main-content { padding-bottom: 80px; }
          .content-header { padding: 0 1.25rem; }
          .header-search-tactical { display: none; }
          .content-body { padding: 1.5rem; }
        }
      `}</style>
    </div>
  );
}

export default App;

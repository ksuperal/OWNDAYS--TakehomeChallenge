import { useState } from 'react';
import DeviceFrame from './components/DeviceFrame';
import AppBar from './components/AppBar';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import LeaveRequestForm from './screens/LeaveRequestForm';
import DocumentRequestForm from './screens/DocumentRequestForm';
import ConfirmationScreen from './screens/ConfirmationScreen';
import RequestsListScreen from './screens/RequestsListScreen';
import RequestDetailScreen from './screens/RequestDetailScreen';
import CategoryScreen from './screens/CategoryScreen';
import HRAdminScreen from './screens/HRAdminScreen';
import FormManagementScreen from './screens/FormManagementScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import { useAppState } from './hooks/useAppState';
import { useForms } from './hooks/useForms';
import { TRANSLATIONS } from './data/translations';
import './App.css';

function App() {
  const state = useAppState();
  const {
    isAuthenticated,
    user,
    login,
    logout,
    lang,
    setLang,
    screen,
    setScreen,
    activeCat,
    detailId,
    setDetailId,
    reqFilter,
    setReqFilter,
    requests,
    setRequests,
    lineOn,
    setLineOn,
    emailOn,
    setEmailOn,
    lastRef,
    setLastRef,
    lastReq,
    setLastReq,
    goToScreen,
    resetForm
  } = state;

  // Use editable forms hook
  const { forms, addForm, updateForm, deleteForm, resetToDefaults } = useForms();

  // HR Admin tab state (requests or forms)
  const [hrAdminTab, setHrAdminTab] = useState('requests');

  const t = TRANSLATIONS[lang];
  const isTH = lang === 'th';

  const staffName = user ? (isTH ? user.nameTH : user.nameEN) : (isTH ? 'พลอย ส.' : 'Ploy S.');
  const isHR = user && user.role === 'hr';

  // Generate reference number
  const generateRefNum = () => {
    const prefix = 'REQ';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  };

  // Submit leave request
  const handleSubmitLeave = () => {
    const refNum = generateRefNum();
    const newRequest = {
      id: Date.now().toString(),
      refNum,
      formId: state.form.leaveType,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      startDate: state.form.startISO,
      endDate: state.form.endISO,
      days: Math.ceil((new Date(state.form.endISO) - new Date(state.form.startISO)) / (1000 * 60 * 60 * 24)) + 1,
      reason: state.form.reason,
      contact: state.form.contact,
      attachment: state.form.attachment
    };

    setRequests([newRequest, ...requests]);
    setLastRef(refNum);
    setLastReq(newRequest);
    resetForm();
    setScreen('confirmation');
  };

  // Submit document request
  const handleSubmitDocument = (formId, data) => {
    const refNum = generateRefNum();
    const newRequest = {
      id: Date.now().toString(),
      refNum,
      formId,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      purpose: data.purpose,
      delivery: data.delivery
    };

    setRequests([newRequest, ...requests]);
    setLastRef(refNum);
    setLastReq(newRequest);
    setScreen('confirmation');
  };

  // Cancel request
  const handleCancelRequest = (id) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'cancelled' } : req
    ));
    setScreen('requests');
  };

  // HR: Approve request (mark as completed)
  const handleApproveRequest = (id, comment) => {
    const defaultComment = isTH
      ? 'คำขอของคุณได้รับการอนุมัติแล้ว'
      : 'Your request has been approved and completed.';

    setRequests(requests.map(req =>
      req.id === id ? {
        ...req,
        status: 'completed',
        hrComment: comment && comment.trim() ? comment : defaultComment
      } : req
    ));
  };

  // HR: Reject request
  const handleRejectRequest = (id, comment) => {
    const defaultComment = isTH
      ? 'คำขอของคุณถูกปฏิเสธ กรุณาติดต่อ HR สำหรับข้อมูลเพิ่มเติม'
      : 'Your request has been rejected. Please contact HR for more information.';

    setRequests(requests.map(req =>
      req.id === id ? {
        ...req,
        status: 'cancelled',
        hrComment: comment && comment.trim() ? comment : defaultComment
      } : req
    ));
  };

  // Navigation functions
  const handleGoHome = () => setScreen('home');
  const handleGoRequests = () => setScreen('requests');
  const handleGoLeaderboard = () => setScreen('leaderboard');
  const handleGoProfile = () => setScreen('profile');
  const handleGoHRAdmin = () => setScreen('hradmin');
  const handleBack = () => {
    if (screen === 'leaveForm') {
      if (state.step > 0) {
        state.setStep(state.step - 1);
      } else {
        resetForm();
        setScreen('home');
      }
    } else if (screen === 'documentForm') {
      setScreen('home');
    } else if (screen === 'category') {
      setScreen('home');
    } else if (screen === 'detail') {
      setScreen('requests');
    } else if (screen === 'hradmin') {
      setScreen('profile');
    } else {
      setScreen('home');
    }
  };

  const handleStartLeave = () => {
    resetForm();
    setScreen('leaveForm');
  };

  const handleGetDocument = () => {
    setScreen('documentForm');
  };

  const handleOpenCat = (cat) => {
    goToScreen('category', { activeCat: cat });
  };

  const handleViewDetail = (id) => {
    setDetailId(id);
    setScreen('detail');
  };

  // Determine header state
  const isHome = screen === 'home';
  const showBack = ['leaveForm', 'documentForm', 'detail', 'category', 'hradmin'].includes(screen);
  const showTitle = !isHome && screen !== 'confirmation';

  const titleMap = {
    leaveForm: t.cat_leave,
    documentForm: isTH ? 'ขอเอกสาร' : 'Request Document',
    requests: t.my_requests,
    detail: t.my_requests,
    leaderboard: isTH ? 'กระดานผู้นำ' : 'Leaderboard',
    profile: t.nav_profile,
    category: t[`cat_${activeCat}`],
    hradmin: isTH ? 'แดชบอร์ด HR' : 'HR Dashboard',
    confirmation: ''
  };
  const headerTitle = titleMap[screen] || '';

  // Calculate pending count
  const pendingCount = requests.filter(r => r.status === 'submitted' || r.status === 'inprogress').length;

  // Determine if nav should show
  const showNav = isAuthenticated && ['home', 'requests', 'leaderboard', 'profile', 'detail'].includes(screen);

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <DeviceFrame>
        <AppBar
          isHome={true}
          showBack={false}
          showTitle={false}
          headerTitle=""
          onBack={() => {}}
          lang={lang}
          onSetEN={() => setLang('en')}
          onSetTH={() => setLang('th')}
        />
        <div className="scrollarea" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
          <LoginScreen t={t} onLogin={login} />
        </div>
      </DeviceFrame>
    );
  }

  return (
    <DeviceFrame>
      <AppBar
        isHome={isHome}
        showBack={showBack}
        showTitle={showTitle}
        headerTitle={headerTitle}
        onBack={handleBack}
        lang={lang}
        onSetEN={() => setLang('en')}
        onSetTH={() => setLang('th')}
      />

      {/* Scroll Area */}
      <div className="scrollarea" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        {screen === 'home' && (
          <HomeScreen
            t={t}
            staffName={staffName}
            requests={requests}
            forms={forms}
            onStartLeave={handleStartLeave}
            onGetDocument={handleGetDocument}
            onOpenCat={handleOpenCat}
            onGoRequests={handleGoRequests}
            onGoHRAdmin={handleGoHRAdmin}
            onViewDetail={handleViewDetail}
            isHR={isHR}
          />
        )}

        {screen === 'leaveForm' && (
          <LeaveRequestForm
            t={t}
            lang={lang}
            state={state}
            forms={forms}
            onSubmit={handleSubmitLeave}
            onCancel={() => {
              resetForm();
              setScreen('home');
            }}
          />
        )}

        {screen === 'documentForm' && (
          <DocumentRequestForm
            t={t}
            lang={lang}
            formType="emp_cert"
            forms={forms}
            onSubmit={(data) => handleSubmitDocument('emp_cert', data)}
            onCancel={() => setScreen('home')}
          />
        )}

        {screen === 'confirmation' && lastReq && (
          <ConfirmationScreen
            t={t}
            lang={lang}
            request={lastReq}
            forms={forms}
            onGoHome={handleGoHome}
            onGoRequests={handleGoRequests}
          />
        )}

        {screen === 'requests' && (
          <RequestsListScreen
            t={t}
            lang={lang}
            requests={requests}
            forms={forms}
            filter={reqFilter}
            onFilterChange={setReqFilter}
            onViewDetail={handleViewDetail}
          />
        )}

        {screen === 'detail' && detailId && (
          <RequestDetailScreen
            t={t}
            lang={lang}
            request={requests.find(r => r.id === detailId)}
            forms={forms}
            onCancel={handleCancelRequest}
            onBack={() => setScreen('requests')}
          />
        )}

        {screen === 'category' && (
          <CategoryScreen
            t={t}
            lang={lang}
            category={activeCat}
            forms={forms}
            onSelectForm={(formId) => {
              // Navigate to the appropriate form based on formId
              if (formId.includes('leave') || formId === 'annual' || formId === 'sick' || formId === 'personal' || formId === 'maternity' || formId === 'monk') {
                resetForm();
                setScreen('leaveForm');
              } else {
                setScreen('documentForm');
              }
            }}
          />
        )}

        {screen === 'hradmin' && (
          <div>
            {/* HR Admin Tabs */}
            <div style={{
              display: 'flex',
              gap: '8px',
              padding: '8px 18px 0',
              background: '#f7f9fc',
              borderBottom: '2px solid #e8ecf1'
            }}>
              <button
                onClick={() => setHrAdminTab('requests')}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: hrAdminTab === 'requests' ? '#1f6feb' : '#5b6b80',
                  background: hrAdminTab === 'requests' ? 'white' : 'transparent',
                  border: 'none',
                  borderBottom: hrAdminTab === 'requests' ? '3px solid #1f6feb' : '3px solid transparent',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s'
                }}
              >
                {isTH ? '📋 คำขอ' : '📋 Requests'}
              </button>
              <button
                onClick={() => setHrAdminTab('forms')}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: hrAdminTab === 'forms' ? '#722ed1' : '#5b6b80',
                  background: hrAdminTab === 'forms' ? 'white' : 'transparent',
                  border: 'none',
                  borderBottom: hrAdminTab === 'forms' ? '3px solid #722ed1' : '3px solid transparent',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s'
                }}
              >
                {isTH ? '⚙️ ฟอร์ม' : '⚙️ Forms'}
              </button>
            </div>

            {/* Tab Content */}
            {hrAdminTab === 'requests' ? (
              <HRAdminScreen
                t={t}
                lang={lang}
                requests={requests}
                forms={forms}
                onViewDetail={handleViewDetail}
                onApprove={handleApproveRequest}
                onReject={handleRejectRequest}
              />
            ) : (
              <FormManagementScreen
                forms={forms}
                onAddForm={addForm}
                onUpdateForm={updateForm}
                onDeleteForm={deleteForm}
                onResetDefaults={resetToDefaults}
                lang={lang}
              />
            )}
          </div>
        )}

        {screen === 'leaderboard' && (
          <LeaderboardScreen
            lang={lang}
            user={user}
          />
        )}

        {screen === 'profile' && user && (
          <ProfileScreen
            t={t}
            user={user}
            lang={lang}
            lineOn={lineOn}
            emailOn={emailOn}
            onToggleLine={() => setLineOn(!lineOn)}
            onToggleEmail={() => setEmailOn(!emailOn)}
            onGoHRAdmin={handleGoHRAdmin}
            onSignOut={logout}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      {showNav && (
        <BottomNav
          screen={screen}
          t={t}
          onGoHome={handleGoHome}
          onGoRequests={handleGoRequests}
          onGoLeaderboard={handleGoLeaderboard}
          onGoProfile={handleGoProfile}
          pendingCount={pendingCount}
        />
      )}
    </DeviceFrame>
  );
}

export default App;

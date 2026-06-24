const BottomNav = ({ screen, t, onGoHome, onGoRequests, onGoLeaderboard, onGoProfile, pendingCount }) => {
  const isHome = screen === 'home';
  const isReq = screen === 'requests' || screen === 'detail';
  const isLeaderboard = screen === 'leaderboard';
  const isProfile = screen === 'profile';

  const navHomeColor = isHome ? '#1f6feb' : '#aab6c6';
  const navReqColor = isReq ? '#1f6feb' : '#aab6c6';
  const navLeaderboardColor = isLeaderboard ? '#1f6feb' : '#aab6c6';
  const navProfColor = isProfile ? '#1f6feb' : '#aab6c6';

  const hasPending = pendingCount > 0;

  return (
    <div style={{ flex: 'none', display: 'flex', background: '#fff', borderTop: '1px solid #eef2f7', padding: '8px 0 12px' }}>
      <button onClick={onGoHome} style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', fontFamily: 'inherit' }}>
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={navHomeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 11l8-7 8 7" />
          <path d="M6 10v9h12v-9" />
        </svg>
        <span style={{ fontSize: '11px', fontWeight: 600, color: navHomeColor }}>{t.nav_home}</span>
      </button>
      <button onClick={onGoRequests} style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', fontFamily: 'inherit', position: 'relative' }}>
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={navReqColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 6h12M8 12h12M8 18h12M4 6v.01M4 12v.01M4 18v.01" />
        </svg>
        <span style={{ fontSize: '11px', fontWeight: 600, color: navReqColor }}>{t.nav_req}</span>
        {hasPending && (
          <span style={{ position: 'absolute', top: '-2px', left: '50%', marginLeft: '5px', background: '#1f6feb', color: '#fff', fontSize: '10px', fontWeight: 700, minWidth: '16px', height: '16px', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>
            {pendingCount}
          </span>
        )}
      </button>
      <button onClick={onGoLeaderboard} style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', fontFamily: 'inherit' }}>
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={navLeaderboardColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
        </svg>
        <span style={{ fontSize: '11px', fontWeight: 600, color: navLeaderboardColor }}>{t.nav_leaderboard || (t === 'th' ? 'อันดับ' : 'Ranks')}</span>
      </button>
      <button onClick={onGoProfile} style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', fontFamily: 'inherit' }}>
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={navProfColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="3.6" />
          <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
        </svg>
        <span style={{ fontSize: '11px', fontWeight: 600, color: navProfColor }}>{t.nav_profile}</span>
      </button>
    </div>
  );
};

export default BottomNav;

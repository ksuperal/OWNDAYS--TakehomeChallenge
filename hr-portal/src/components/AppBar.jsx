const AppBar = ({ isHome, showBack, showTitle, headerTitle, onBack, lang, onSetEN, onSetTH }) => {
  const segOn = { fontSize: '12.5px', fontWeight: 600, fontFamily: 'inherit', border: 'none', borderRadius: '8px', padding: '6px 11px', cursor: 'pointer', background: '#1f6feb', color: '#fff' };
  const segOff = { fontSize: '12.5px', fontWeight: 600, fontFamily: 'inherit', border: 'none', borderRadius: '8px', padding: '6px 11px', cursor: 'pointer', background: 'transparent', color: '#5b6b80' };

  return (
    <div style={{ flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 16px 12px', background: '#f5f7fb', borderBottom: '1px solid #eef2f7' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
        {showBack && (
          <button onClick={onBack} style={{ width: '38px', height: '38px', flex: 'none', border: 'none', background: '#eef2f8', borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} aria-label="Back">
            <span style={{ width: '9px', height: '9px', borderLeft: '2.2px solid #0a2540', borderBottom: '2.2px solid #0a2540', transform: 'rotate(45deg)', marginLeft: '3px', display: 'inline-block' }}></span>
          </button>
        )}
        {isHome && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#1f6feb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '11px', height: '11px', border: '2.2px solid #fff', borderRadius: '3px', transform: 'rotate(45deg)' }}></div>
            </div>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#0a2540', letterSpacing: '-.01em' }}>OD‑Connect</span>
          </div>
        )}
        {showTitle && (
          <span style={{ fontSize: '17px', fontWeight: 700, color: '#0a2540', letterSpacing: '-.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{headerTitle}</span>
        )}
      </div>
      {/* Language toggle */}
      <div style={{ flex: 'none', display: 'flex', background: '#eef2f8', borderRadius: '10px', padding: '3px' }}>
        <button onClick={onSetEN} style={lang === 'en' ? segOn : segOff} aria-label="English">EN</button>
        <button onClick={onSetTH} style={lang === 'th' ? segOn : segOff} aria-label="Thai">TH</button>
      </div>
    </div>
  );
};

export default AppBar;

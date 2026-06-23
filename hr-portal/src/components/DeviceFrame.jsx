const DeviceFrame = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', boxSizing: 'border-box', padding: '48px', background: '#e9edf2', fontFamily: "'IBM Plex Sans Thai','IBM Plex Sans',system-ui,sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '22px' }}>
      {/* Logo */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#1f6feb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '11px', height: '11px', border: '2.2px solid #fff', borderRadius: '3px', transform: 'rotate(45deg)' }}></div>
        </div>
        <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: '#1f6feb' }}>OD‑Connect · HR Forms &amp; Requests</span>
      </div>

      {/* Device Container */}
      <div style={{ width: '384px', height: '824px', border: '8px solid #0e1b2e', borderRadius: '46px', overflow: 'hidden', boxShadow: '0 30px 70px rgba(10,37,64,.26)', background: '#f5f7fb', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Status Bar */}
        <div style={{ height: '38px', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px', background: '#f5f7fb' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#0a2540', fontVariantNumeric: 'tabular-nums' }}>9:41</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '16px', height: '9px', border: '1.4px solid #0a2540', borderRadius: '2px', display: 'inline-block', position: 'relative' }}></span>
            <span style={{ width: '13px', height: '13px', border: '1.6px solid #0a2540', borderBottom: 'none', borderLeft: 'none', borderRadius: '0 7px 0 0', display: 'inline-block', transform: 'rotate(0)' }}></span>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default DeviceFrame;

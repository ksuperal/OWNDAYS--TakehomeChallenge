import { getStatusMeta, getBadgeStyle } from '../utils/statusHelpers';
import { FORMS } from '../data/forms';

const HomeScreen = ({ t, staffName, requests, onStartLeave, onGetDocument, onOpenCat, onGoRequests, onViewDetail, isHR, onGoHRAdmin }) => {
  const recentRequests = requests.slice(0, 2);

  return (
    <div style={{ padding: '18px 18px 28px' }}>
      {/* Greeting */}
      <div style={{ marginBottom: '18px' }}>
        <div style={{ fontSize: '14px', color: '#5b6b80', fontWeight: 500 }}>{t.greeting}</div>
        <div style={{ fontSize: '23px', fontWeight: 700, color: '#0a2540', letterSpacing: '-.02em' }}>{staffName}</div>
      </div>

      {/* Primary Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
        {isHR ? (
          <>
            <button onClick={onGoHRAdmin} style={{ textAlign: 'left', background: '#1f6feb', border: 'none', borderRadius: '18px', padding: '16px', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 10px 22px rgba(31,111,235,.28)', minHeight: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255,255,255,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                👨‍💼
              </span>
              <span style={{ fontSize: '16.5px', fontWeight: 700, color: '#fff', lineHeight: '1.25' }}>{t === 'th' ? 'แดชบอร์ด HR' : 'HR Dashboard'}</span>
            </button>
            <button onClick={onGoRequests} style={{ textAlign: 'left', background: '#fff', border: '1px solid #e6ecf3', borderRadius: '18px', padding: '16px', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 1px 2px rgba(10,37,64,.04)', minHeight: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#e7f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1f6feb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 11h6M9 15h6" />
                </svg>
              </span>
              <span style={{ fontSize: '16.5px', fontWeight: 700, color: '#0a2540', lineHeight: '1.25' }}>{t === 'th' ? 'คำขอทั้งหมด' : 'All Requests'}</span>
            </button>
          </>
        ) : (
          <>
            <button onClick={onStartLeave} style={{ textAlign: 'left', background: '#1f6feb', border: 'none', borderRadius: '18px', padding: '16px', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 10px 22px rgba(31,111,235,.28)', minHeight: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255,255,255,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
                  <path d="M3.5 9.5h17M8 3v4M16 3v4" />
                </svg>
              </span>
              <span style={{ fontSize: '16.5px', fontWeight: 700, color: '#fff', lineHeight: '1.25' }}>{t.act_leave}</span>
            </button>
            <button onClick={onGetDocument} style={{ textAlign: 'left', background: '#fff', border: '1px solid #e6ecf3', borderRadius: '18px', padding: '16px', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 1px 2px rgba(10,37,64,.04)', minHeight: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#e7f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1f6feb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h8l4 4v14H6z" />
                  <path d="M14 3v4h4M9 12h6M9 16h6" />
                </svg>
              </span>
              <span style={{ fontSize: '16.5px', fontWeight: 700, color: '#0a2540', lineHeight: '1.25' }}>{t.act_doc}</span>
            </button>
          </>
        )}
      </div>

      {/* Recent Requests */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '11px' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#8a99ad', textTransform: 'uppercase', letterSpacing: '.06em' }}>{t.recent}</span>
        <button onClick={onGoRequests} style={{ border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '12.5px', color: '#1f6feb', fontWeight: 600 }}>{t.see_all}</button>
      </div>
      <div style={{ background: '#fff', border: '1px solid #e6ecf3', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px', boxShadow: '0 1px 2px rgba(10,37,64,.04)' }}>
        {recentRequests.length === 0 ? (
          <div style={{ padding: '32px 20px', textAlign: 'center', color: '#8a99ad', fontSize: '14px' }}>
            No recent requests
          </div>
        ) : (
          recentRequests.map((req, i, arr) => {
            const statusMeta = getStatusMeta(req.status, t);
            const badgeStyle = getBadgeStyle(req.status, t);
            const formData = FORMS.find(f => f.id === req.formId);
            const typeLabel = formData ? (t === 'th' ? formData.th : formData.en) : req.formId;

            return (
              <button
                key={req.id}
                onClick={() => onViewDetail(req.id)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '14px 15px', borderBottom: i < arr.length - 1 ? '1px solid #f0f3f7' : 'none' }}
              >
                <span style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                  <span style={{ display: 'block', fontSize: '14.5px', fontWeight: 600, color: '#0a2540' }}>{typeLabel}</span>
                  <span style={{ display: 'block', fontFamily: "'IBM Plex Mono',monospace", fontSize: '12px', color: '#8a99ad', marginTop: '1px' }}>{req.refNum}</span>
                </span>
                <span style={badgeStyle}>{statusMeta.label}</span>
              </button>
            );
          })
        )}
      </div>

      {/* Category Shortcuts */}
      <div style={{ fontSize: '12px', fontWeight: 600, color: '#8a99ad', textTransform: 'uppercase', letterSpacing: '.06em', margin: '0 0 12px 2px' }}>{t.more_services}</div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
        {['payroll', 'benefits', 'expense', 'other'].map(cat => (
          <button key={cat} onClick={() => onOpenCat(cat)} style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center', padding: 0 }}>
            <span style={{ width: '54px', height: '54px', borderRadius: '15px', background: '#fff', border: '1px solid #e6ecf3', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 7px', boxShadow: '0 1px 2px rgba(10,37,64,.04)' }}>
              {cat === 'payroll' && (
                <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#1f6feb" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2.5" y="6" width="19" height="12" rx="2.5" />
                  <circle cx="12" cy="12" r="2.6" />
                </svg>
              )}
              {cat === 'benefits' && (
                <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#1f6feb" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l7 3v5c0 4.2-3 7.4-7 8.5-4-1.1-7-4.3-7-8.5V6z" />
                  <path d="M9 11.5l2 2 4-4.2" />
                </svg>
              )}
              {cat === 'expense' && (
                <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#1f6feb" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h12v18l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4L6 21z" />
                  <path d="M9.5 8h5M9.5 12h5" />
                </svg>
              )}
              {cat === 'other' && (
                <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#1f6feb" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
                  <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
                  <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
                  <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
                </svg>
              )}
            </span>
            <span style={{ fontSize: '11.5px', color: '#5b6b80', fontWeight: 500 }}>{t[`cat_${cat}`]}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;

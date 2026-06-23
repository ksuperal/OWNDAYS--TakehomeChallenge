import { FORMS } from '../data/forms';

const ConfirmationScreen = ({ t, lang, request, onGoHome, onGoRequests }) => {
  const isTH = lang === 'th';
  const formData = FORMS.find(f => f.id === request.formId);

  return (
    <div style={{ padding: '8px 18px 28px', textAlign: 'center' }}>
      {/* Success Icon */}
      <div style={{
        width: '80px',
        height: '80px',
        margin: '40px auto 24px',
        background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path
            d="M10 20L17 27L30 14"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Title */}
      <h2 style={{
        fontSize: '24px',
        fontWeight: '600',
        margin: '0 0 12px',
        color: '#1a2332'
      }}>
        {t.confirm_title}
      </h2>

      {/* Subtitle */}
      <p style={{
        fontSize: '15px',
        color: '#5b6b80',
        margin: '0 0 32px',
        lineHeight: 1.5
      }}>
        {t.confirm_sub}
      </p>

      {/* Request Details Card */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        textAlign: 'left'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '16px',
          borderBottom: '1px solid #e8ecf1',
          marginBottom: '16px'
        }}>
          <span style={{ fontSize: '14px', color: '#5b6b80' }}>
            {t.ref_label}
          </span>
          <span style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#1f6feb',
            fontFamily: 'IBM Plex Mono, monospace'
          }}>
            {request.refNum}
          </span>
        </div>

        <DetailRow
          label={t.r_type}
          value={formData ? (isTH ? formData.th : formData.en) : request.formId}
        />
        <DetailRow
          label={t.r_submitted}
          value={new Date(request.submittedAt).toLocaleDateString(isTH ? 'th-TH' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        />
        <DetailRow
          label={t.r_eta}
          value={`${formData?.days || 3} ${isTH ? 'วัน' : 'days'}`}
          isLast
        />
      </div>

      {/* Notification Info */}
      <div style={{
        padding: '16px',
        background: '#f0f6ff',
        borderRadius: '8px',
        marginBottom: '24px',
        fontSize: '13px',
        color: '#1f6feb',
        lineHeight: 1.5,
        textAlign: 'left'
      }}>
        <div style={{ fontWeight: '600', marginBottom: '4px' }}>
          📱 {isTH ? 'คุณจะได้รับการแจ้งเตือน' : 'You will be notified'}
        </div>
        {isTH
          ? 'เราจะส่งการอัปเดตผ่าน LINE และอีเมลเมื่อสถานะคำขอของคุณเปลี่ยนแปลง'
          : 'We will send updates via LINE and email when your request status changes'}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          onClick={onGoRequests}
          style={{
            width: '100%',
            padding: '14px 24px',
            fontSize: '16px',
            fontWeight: '600',
            color: 'white',
            background: 'linear-gradient(135deg, #1f6feb 0%, #0d47a1 100%)',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontFamily: 'inherit'
          }}
        >
          {t.go_requests}
        </button>
        <button
          onClick={onGoHome}
          style={{
            width: '100%',
            padding: '14px 24px',
            fontSize: '16px',
            fontWeight: '600',
            color: '#1f6feb',
            background: 'white',
            border: '2px solid #1f6feb',
            borderRadius: '10px',
            cursor: 'pointer',
            fontFamily: 'inherit'
          }}
        >
          {t.submit_another}
        </button>
      </div>
    </div>
  );
};

// Helper component
const DetailRow = ({ label, value, isLast }) => (
  <>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 0'
    }}>
      <span style={{ fontSize: '14px', color: '#5b6b80' }}>
        {label}
      </span>
      <span style={{
        fontSize: '14px',
        fontWeight: '500',
        color: '#1a2332',
        textAlign: 'right'
      }}>
        {value}
      </span>
    </div>
    {!isLast && (
      <div style={{
        height: '1px',
        background: '#e8ecf1'
      }} />
    )}
  </>
);

export default ConfirmationScreen;

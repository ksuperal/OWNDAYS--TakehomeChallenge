import { FORMS } from '../data/forms';

const RequestDetailScreen = ({ t, lang, request, onCancel, onBack }) => {
  const isTH = lang === 'th';
  const formData = FORMS.find(f => f.id === request.formId);

  // Status display
  const getStatusDisplay = (status) => {
    const displays = {
      submitted: {
        icon: '⏳',
        color: '#1f6feb',
        bg: '#f0f6ff',
        label: t.st_submitted,
        timeline: t.tl_submitted
      },
      inprogress: {
        icon: '⚙️',
        color: '#fa8c16',
        bg: '#fff7e6',
        label: t.st_inprogress,
        timeline: t.tl_inprogress
      },
      completed: {
        icon: '✓',
        color: '#52c41a',
        bg: '#f6ffed',
        label: t.st_completed,
        timeline: t.tl_completed
      },
      cancelled: {
        icon: '✕',
        color: '#8c8c8c',
        bg: '#f5f5f5',
        label: t.st_cancelled,
        timeline: t.tl_cancelled
      }
    };
    return displays[status] || displays.submitted;
  };

  const statusDisplay = getStatusDisplay(request.status);
  const canCancel = request.status === 'submitted' || request.status === 'inprogress';

  return (
    <div style={{ padding: '8px 18px 28px' }}>
      {/* Status Badge */}
      <div style={{
        background: statusDisplay.bg,
        border: `2px solid ${statusDisplay.color}`,
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>
          {statusDisplay.icon}
        </div>
        <div style={{
          fontSize: '18px',
          fontWeight: '600',
          color: statusDisplay.color,
          marginBottom: '8px'
        }}>
          {statusDisplay.label}
        </div>
        <div style={{
          fontSize: '14px',
          color: '#5b6b80',
          lineHeight: 1.5
        }}>
          {statusDisplay.timeline}
        </div>
      </div>

      {/* Request Info */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
      }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#1a2332',
          margin: '0 0 16px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {t.r_type}
        </h3>

        <div style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#1a2332',
          marginBottom: '8px'
        }}>
          {formData ? (isTH ? formData.th : formData.en) : request.formId}
        </div>

        <div style={{
          fontSize: '14px',
          color: '#5b6b80',
          fontFamily: 'IBM Plex Mono, monospace',
          marginBottom: '16px'
        }}>
          {request.refNum}
        </div>

        <div style={{
          height: '1px',
          background: '#e8ecf1',
          margin: '16px 0'
        }} />

        <InfoRow
          label={t.r_submitted}
          value={new Date(request.submittedAt).toLocaleDateString(isTH ? 'th-TH' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        />
        <InfoRow
          label={t.r_eta}
          value={`${formData?.days || 3} ${isTH ? 'วัน' : 'days'}`}
          isLast
        />
      </div>

      {/* Submitted Information */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
      }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#1a2332',
          margin: '0 0 16px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {t.submitted_info}
        </h3>

        {/* Leave-specific fields */}
        {request.formId.includes('leave') && (
          <>
            <InfoRow
              label={t.f_type}
              value={formData ? (isTH ? formData.th : formData.en) : request.formId}
            />
            {request.startDate && request.endDate && (
              <InfoRow
                label={t.f_dates}
                value={`${new Date(request.startDate).toLocaleDateString(isTH ? 'th-TH' : 'en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })} ${t.dash} ${new Date(request.endDate).toLocaleDateString(isTH ? 'th-TH' : 'en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}`}
              />
            )}
            {request.days && (
              <InfoRow
                label={t.f_duration}
                value={`${request.days} ${request.days === 1 ? t.day_word : t.days_word}`}
              />
            )}
            {request.reason && (
              <InfoRow
                label={t.f_reason}
                value={request.reason}
              />
            )}
            {request.contact && (
              <InfoRow
                label={t.f_contact}
                value={request.contact}
              />
            )}
            {request.attachment && (
              <InfoRow
                label={t.f_cert}
                value={request.attachment}
                isLast
              />
            )}
          </>
        )}

        {/* Document-specific fields */}
        {request.formId.includes('cert') || request.formId.includes('emp_cert') || request.formId.includes('sal_cert') && (
          <>
            {request.purpose && (
              <InfoRow
                label={isTH ? 'วัตถุประสงค์' : 'Purpose'}
                value={request.purpose}
              />
            )}
            {request.delivery && (
              <InfoRow
                label={isTH ? 'วิธีการรับ' : 'Delivery method'}
                value={request.delivery === 'email' ? (isTH ? 'อีเมล' : 'Email') : (isTH ? 'รับที่ HR' : 'Pick up at HR')}
                isLast
              />
            )}
          </>
        )}
      </div>

      {/* HR Comment (if available) */}
      {request.hrComment && (
        <div style={{
          background: '#fffbe6',
          border: '2px solid #fadb14',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#1a2332',
            margin: '0 0 8px'
          }}>
            {t.hr_comment}
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#5b6b80',
            margin: 0,
            lineHeight: 1.5
          }}>
            {request.hrComment}
          </p>
        </div>
      )}

      {/* Cancel Button */}
      {canCancel && (
        <button
          onClick={() => onCancel(request.id)}
          style={{
            width: '100%',
            padding: '14px 24px',
            fontSize: '16px',
            fontWeight: '600',
            color: '#ff4d4f',
            background: 'white',
            border: '2px solid #ff4d4f',
            borderRadius: '10px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#ff4d4f';
            e.target.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'white';
            e.target.style.color = '#ff4d4f';
          }}
        >
          {t.cancel_req}
        </button>
      )}
    </div>
  );
};

// Helper component
const InfoRow = ({ label, value, isLast }) => (
  <>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: '10px 0',
      gap: '16px'
    }}>
      <span style={{ fontSize: '14px', color: '#5b6b80', flexShrink: 0 }}>
        {label}
      </span>
      <span style={{
        fontSize: '14px',
        fontWeight: '500',
        color: '#1a2332',
        textAlign: 'right',
        wordBreak: 'break-word'
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

export default RequestDetailScreen;

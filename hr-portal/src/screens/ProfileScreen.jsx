const ProfileScreen = ({ t, user, lang, lineOn, emailOn, onToggleLine, onToggleEmail, onGoHRAdmin, onSignOut }) => {
  const isTH = lang === 'th';

  return (
    <div style={{ padding: '10px 18px 28px' }}>
      {/* User Header */}
      <div style={{
        textAlign: 'center',
        padding: '20px 0 28px'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          margin: '0 auto 16px',
          background: 'linear-gradient(135deg, #1f6feb 0%, #0d47a1 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          fontWeight: '600',
          color: 'white',
          boxShadow: '0 4px 12px rgba(31,111,235,0.25)'
        }}>
          {isTH ? user.nameTH.charAt(0) : user.nameEN.charAt(0)}
        </div>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          margin: '0 0 4px',
          color: '#1a2332'
        }}>
          {isTH ? user.fullNameTH : user.fullNameEN}
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#5b6b80',
          margin: 0
        }}>
          {isTH ? user.positionTH : user.positionEN}
        </p>
      </div>

      {/* Employee Information */}
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
          {t.employee_info}
        </h3>

        <InfoRow label={t.emp_id_label} value={user.empId} />
        <InfoRow label={t.full_name} value={isTH ? user.fullNameTH : user.fullNameEN} />
        <InfoRow label={t.department} value={isTH ? user.departmentTH : user.departmentEN} />
        <InfoRow label={t.position} value={isTH ? user.positionTH : user.positionEN} />
        <InfoRow label={t.email} value={user.email} />
        <InfoRow
          label={t.joined_date}
          value={new Date(user.joinedDate).toLocaleDateString(isTH ? 'th-TH' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
          isLast
        />
      </div>

      {/* Preferences */}
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
          {t.preferences}
        </h3>

        <ToggleRow
          label={t.notif_line}
          checked={lineOn}
          onChange={onToggleLine}
        />
        <ToggleRow
          label={t.notif_email}
          checked={emailOn}
          onChange={onToggleEmail}
          isLast
        />
      </div>

      {/* HR Admin Access - Only for HR users */}
      {user.role === 'hr' && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
        }}>
          <button
            onClick={onGoHRAdmin}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '15px',
              color: '#1a2332',
              fontFamily: 'inherit',
              textAlign: 'left'
            }}
          >
            <div>
              <div style={{ fontWeight: '600', marginBottom: '4px', fontSize: '16px' }}>
                👨‍💼 {isTH ? 'แดชบอร์ด HR' : 'HR Dashboard'}
              </div>
              <div style={{ fontSize: '13px', color: '#5b6b80' }}>
                {isTH ? 'จัดการคำขอของพนักงาน' : 'Manage employee requests'}
              </div>
            </div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4l6 6-6 6" stroke="#1f6feb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}

      {/* PDPA Section */}
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
          {t.pdpa}
        </h3>

        <button
          onClick={() => {}}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '15px',
            color: '#1a2332',
            fontFamily: 'inherit',
            textAlign: 'left'
          }}
        >
          <div>
            <div style={{ fontWeight: '500', marginBottom: '4px' }}>
              {t.consent_record}
            </div>
            <div style={{ fontSize: '13px', color: '#5b6b80' }}>
              {t.consent_meta}
            </div>
          </div>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4l6 6-6 6" stroke="#8a99ad" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div style={{
          height: '1px',
          background: '#e8ecf1',
          margin: '8px 0'
        }} />

        <button
          onClick={() => {}}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '15px',
            color: '#1a2332',
            fontFamily: 'inherit',
            textAlign: 'left',
            fontWeight: '500'
          }}
        >
          {t.export_data}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4l6 6-6 6" stroke="#8a99ad" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Sign Out Button */}
      <button
        onClick={onSignOut}
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
          transition: 'all 0.2s',
          fontFamily: 'inherit',
          marginTop: '8px'
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
        {t.sign_out}
      </button>
    </div>
  );
};

// Helper component for info rows
const InfoRow = ({ label, value, isLast }) => (
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
      <span style={{ fontSize: '14px', fontWeight: '500', color: '#1a2332', textAlign: 'right' }}>
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

// Helper component for toggle rows
const ToggleRow = ({ label, checked, onChange, isLast }) => (
  <>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 0'
    }}>
      <span style={{ fontSize: '15px', fontWeight: '500', color: '#1a2332' }}>
        {label}
      </span>
      <label style={{
        position: 'relative',
        display: 'inline-block',
        width: '48px',
        height: '28px',
        cursor: 'pointer'
      }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          style={{ display: 'none' }}
        />
        <span style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: checked ? '#1f6feb' : '#d9dfe8',
          borderRadius: '28px',
          transition: 'all 0.2s'
        }}>
          <span style={{
            position: 'absolute',
            top: '3px',
            left: checked ? '23px' : '3px',
            width: '22px',
            height: '22px',
            background: 'white',
            borderRadius: '50%',
            transition: 'all 0.2s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
          }} />
        </span>
      </label>
    </div>
    {!isLast && (
      <div style={{
        height: '1px',
        background: '#e8ecf1'
      }} />
    )}
  </>
);

export default ProfileScreen;

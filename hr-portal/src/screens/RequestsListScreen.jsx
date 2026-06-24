import { getStatusBadge } from '../utils/statusHelpers';

const RequestsListScreen = ({ t, lang, requests, forms, filter, onFilterChange, onViewDetail }) => {
  const isTH = lang === 'th';

  // Filter requests based on selected filter
  const filteredRequests = requests.filter(req => {
    if (filter === 'all') return true;
    if (filter === 'pending') return req.status === 'submitted' || req.status === 'inprogress';
    if (filter === 'done') return req.status === 'completed';
    return true;
  });

  return (
    <div style={{ padding: '8px 18px 28px' }}>
      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '20px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        <FilterTab
          label={t.f_all}
          count={requests.length}
          isActive={filter === 'all'}
          onClick={() => onFilterChange('all')}
        />
        <FilterTab
          label={t.f_pending}
          count={requests.filter(r => r.status === 'submitted' || r.status === 'inprogress').length}
          isActive={filter === 'pending'}
          onClick={() => onFilterChange('pending')}
        />
        <FilterTab
          label={t.f_done}
          count={requests.filter(r => r.status === 'completed').length}
          isActive={filter === 'done'}
          onClick={() => onFilterChange('done')}
        />
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>📋</div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1a2332',
            margin: '0 0 8px'
          }}>
            {t.no_req_title}
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#5b6b80',
            margin: '0 0 24px'
          }}>
            {t.no_req_sub}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              lang={lang}
              t={t}
              forms={forms}
              onViewDetail={onViewDetail}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Filter Tab Component
const FilterTab = ({ label, count, isActive, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '8px 16px',
      fontSize: '14px',
      fontWeight: '600',
      color: isActive ? '#1f6feb' : '#5b6b80',
      background: isActive ? '#f0f6ff' : 'transparent',
      border: isActive ? '2px solid #1f6feb' : '2px solid #e8ecf1',
      borderRadius: '20px',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      fontFamily: 'inherit',
      transition: 'all 0.2s'
    }}
  >
    {label} ({count})
  </button>
);

// Request Card Component
const RequestCard = ({ request, lang, t, forms, onViewDetail }) => {
  const isTH = lang === 'th';
  const formData = forms.find(f => f.id === request.formId);
  const statusBadge = getStatusBadge(request.status, lang);

  return (
    <div
      onClick={() => onViewDetail(request.id)}
      style={{
        background: 'white',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'all 0.2s',
        border: '2px solid transparent'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = '#1f6feb';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(31,111,235,0.15)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = 'transparent';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '12px'
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#1a2332',
            margin: '0 0 4px'
          }}>
            {formData ? (isTH ? formData.th : formData.en) : request.formId}
          </h3>
          <p style={{
            fontSize: '13px',
            color: '#5b6b80',
            margin: 0,
            fontFamily: 'IBM Plex Mono, monospace'
          }}>
            {request.refNum}
          </p>
        </div>
        <span style={{
          padding: '4px 10px',
          fontSize: '12px',
          fontWeight: '600',
          color: statusBadge.color,
          background: statusBadge.bg,
          borderRadius: '6px',
          whiteSpace: 'nowrap',
          marginLeft: '12px'
        }}>
          {statusBadge.text}
        </span>
      </div>

      {/* Details */}
      <div style={{
        display: 'flex',
        gap: '16px',
        fontSize: '13px',
        color: '#5b6b80'
      }}>
        <div>
          <span>{t.r_submitted}: </span>
          <span style={{ color: '#1a2332', fontWeight: '500' }}>
            {new Date(request.submittedAt).toLocaleDateString(isTH ? 'th-TH' : 'en-US', {
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
        {request.formId.includes('leave') && request.startDate && (
          <div>
            <span>•</span>
            <span style={{ marginLeft: '8px' }}>
              {new Date(request.startDate).toLocaleDateString(isTH ? 'th-TH' : 'en-US', {
                month: 'short',
                day: 'numeric'
              })}
              {request.endDate && (
                <>
                  {' '}{t.dash}{' '}
                  {new Date(request.endDate).toLocaleDateString(isTH ? 'th-TH' : 'en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </>
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestsListScreen;

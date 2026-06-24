import { useState } from 'react';
import { getStatusBadge } from '../utils/statusHelpers';

const HRAdminScreen = ({ t, lang, requests, forms, onViewDetail, onApprove, onReject }) => {
  const isTH = lang === 'th';
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [actionType, setActionType] = useState('approve'); // 'approve' or 'reject'
  const [hrComment, setHrComment] = useState('');
  const [viewFilter, setViewFilter] = useState('pending'); // 'pending' or 'all'

  // Filter requests based on view filter
  const pendingRequests = requests.filter(r =>
    r.status === 'submitted' || r.status === 'inprogress'
  );

  const displayedRequests = viewFilter === 'pending' ? pendingRequests : requests;

  const handleOpenCommentModal = (request, type) => {
    setSelectedRequest(request);
    setActionType(type);
    setHrComment('');
    setShowCommentModal(true);
  };

  const handleSubmitWithComment = () => {
    if (actionType === 'approve') {
      onApprove(selectedRequest.id, hrComment);
    } else {
      onReject(selectedRequest.id, hrComment);
    }
    setShowCommentModal(false);
    setSelectedRequest(null);
    setHrComment('');
  };

  return (
    <div style={{ padding: '8px 18px 28px' }}>
      {/* HR Dashboard Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1f6feb 0%, #0d47a1 100%)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
        color: 'white'
      }}>
        <div style={{ fontSize: '24px', marginBottom: '8px' }}>👨‍💼</div>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          margin: '0 0 4px'
        }}>
          {isTH ? 'แดชบอร์ด HR' : 'HR Dashboard'}
        </h2>
        <p style={{
          fontSize: '14px',
          margin: 0,
          opacity: 0.9
        }}>
          {isTH ? 'จัดการคำขอของพนักงาน' : 'Manage employee requests'}
        </p>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginBottom: '24px'
      }}>
        <div style={{
          background: '#fff7e6',
          border: '2px solid #fadb14',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#d48806',
            marginBottom: '4px'
          }}>
            {pendingRequests.length}
          </div>
          <div style={{
            fontSize: '13px',
            color: '#7c5c00',
            fontWeight: '500'
          }}>
            {isTH ? 'รอดำเนินการ' : 'Pending'}
          </div>
        </div>

        <div style={{
          background: '#f6ffed',
          border: '2px solid #52c41a',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#389e0d',
            marginBottom: '4px'
          }}>
            {requests.filter(r => r.status === 'completed').length}
          </div>
          <div style={{
            fontSize: '13px',
            color: '#135200',
            fontWeight: '500'
          }}>
            {isTH ? 'เสร็จสิ้น' : 'Completed'}
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '16px'
      }}>
        <button
          onClick={() => setViewFilter('pending')}
          style={{
            flex: 1,
            padding: '10px 16px',
            fontSize: '14px',
            fontWeight: '600',
            color: viewFilter === 'pending' ? '#1f6feb' : '#5b6b80',
            background: viewFilter === 'pending' ? '#f0f6ff' : 'white',
            border: viewFilter === 'pending' ? '2px solid #1f6feb' : '2px solid #e8ecf1',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 0.2s'
          }}
        >
          {isTH ? 'รอดำเนินการ' : 'Pending'} ({pendingRequests.length})
        </button>
        <button
          onClick={() => setViewFilter('all')}
          style={{
            flex: 1,
            padding: '10px 16px',
            fontSize: '14px',
            fontWeight: '600',
            color: viewFilter === 'all' ? '#1f6feb' : '#5b6b80',
            background: viewFilter === 'all' ? '#f0f6ff' : 'white',
            border: viewFilter === 'all' ? '2px solid #1f6feb' : '2px solid #e8ecf1',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 0.2s'
          }}
        >
          {isTH ? 'ทั้งหมด' : 'All Requests'} ({requests.length})
        </button>
      </div>

      {/* Requests Title */}
      <h3 style={{
        fontSize: '16px',
        fontWeight: '600',
        color: '#1a2332',
        margin: '0 0 16px'
      }}>
        {viewFilter === 'pending'
          ? (isTH ? 'คำขอที่รอดำเนินการ' : 'Pending Requests')
          : (isTH ? 'คำขอทั้งหมด' : 'All Requests')}
      </h3>

      {/* Requests List */}
      {displayedRequests.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'white',
          borderRadius: '12px',
          border: '2px dashed #d9dfe8'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>✓</div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1a2332',
            margin: '0 0 8px'
          }}>
            {isTH ? 'ไม่มีคำขอที่รอดำเนินการ' : 'No Pending Requests'}
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#5b6b80',
            margin: 0
          }}>
            {isTH ? 'คำขอทั้งหมดได้รับการดำเนินการแล้ว' : 'All requests have been processed'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {displayedRequests.map((request) => (
            <HRRequestCard
              key={request.id}
              request={request}
              lang={lang}
              t={t}
              isTH={isTH}
              forms={forms}
              onViewDetail={onViewDetail}
              onApprove={(id) => handleOpenCommentModal(request, 'approve')}
              onReject={(id) => handleOpenCommentModal(request, 'reject')}
              isPending={request.status === 'submitted' || request.status === 'inprogress'}
            />
          ))}
        </div>
      )}

      {/* Comment Modal */}
      {showCommentModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            maxWidth: '400px',
            width: '100%',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1a2332',
              margin: '0 0 16px'
            }}>
              {actionType === 'approve'
                ? (isTH ? 'อนุมัติคำขอ' : 'Approve Request')
                : (isTH ? 'ปฏิเสธคำขอ' : 'Reject Request')}
            </h3>

            <p style={{
              fontSize: '14px',
              color: '#5b6b80',
              margin: '0 0 16px',
              lineHeight: 1.5
            }}>
              {isTH
                ? 'เพิ่มความคิดเห็นสำหรับพนักงาน (ไม่บังคับ)'
                : 'Add a comment for the employee (optional)'}
            </p>

            <textarea
              value={hrComment}
              onChange={(e) => setHrComment(e.target.value)}
              placeholder={isTH
                ? 'พิมพ์ความคิดเห็นของคุณที่นี่...'
                : 'Type your comment here...'}
              rows={4}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '14px',
                border: '2px solid #d9dfe8',
                borderRadius: '8px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                marginBottom: '20px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1f6feb';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d9dfe8';
              }}
            />

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  setShowCommentModal(false);
                  setSelectedRequest(null);
                  setHrComment('');
                }}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#5b6b80',
                  background: 'white',
                  border: '2px solid #d9dfe8',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >
                {isTH ? 'ยกเลิก' : 'Cancel'}
              </button>
              <button
                onClick={handleSubmitWithComment}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: 'white',
                  background: actionType === 'approve'
                    ? 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)'
                    : 'linear-gradient(135deg, #ff4d4f 0%, #cf1322 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >
                {actionType === 'approve'
                  ? (isTH ? 'อนุมัติ' : 'Approve')
                  : (isTH ? 'ปฏิเสธ' : 'Reject')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// HR Request Card Component
const HRRequestCard = ({ request, lang, t, isTH, forms, onViewDetail, onApprove, onReject, isPending }) => {
  const formData = forms.find(f => f.id === request.formId);
  const statusBadge = getStatusBadge(request.status, lang);

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      border: '2px solid #e8ecf1'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '12px'
      }}>
        <div style={{ flex: 1 }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#1a2332',
            margin: '0 0 4px'
          }}>
            {formData ? (isTH ? formData.th : formData.en) : request.formId}
          </h4>
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

      {/* Info */}
      <div style={{
        display: 'flex',
        gap: '16px',
        fontSize: '13px',
        color: '#5b6b80',
        marginBottom: '16px',
        paddingBottom: '12px',
        borderBottom: '1px solid #e8ecf1'
      }}>
        <div>
          <span>{isTH ? 'วันที่ส่ง' : 'Submitted'}: </span>
          <span style={{ color: '#1a2332', fontWeight: '500' }}>
            {new Date(request.submittedAt).toLocaleDateString(isTH ? 'th-TH' : 'en-US', {
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
        {request.startDate && (
          <div>
            <span>•</span>
            <span style={{ marginLeft: '8px' }}>
              {new Date(request.startDate).toLocaleDateString(isTH ? 'th-TH' : 'en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      {isPending ? (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onViewDetail(request.id)}
            style={{
              flex: 1,
              padding: '10px 16px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#5b6b80',
              background: 'white',
              border: '2px solid #d9dfe8',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.borderColor = '#1f6feb';
              e.target.style.color = '#1f6feb';
            }}
            onMouseOut={(e) => {
              e.target.style.borderColor = '#d9dfe8';
              e.target.style.color = '#5b6b80';
            }}
          >
            {isTH ? 'ดูรายละเอียด' : 'View Details'}
          </button>
          <button
            onClick={() => onApprove(request.id)}
            style={{
              flex: 1,
              padding: '10px 16px',
              fontSize: '14px',
              fontWeight: '600',
              color: 'white',
              background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(82,196,26,0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            ✓ {isTH ? 'อนุมัติ' : 'Approve'}
          </button>
        </div>
      ) : (
        <button
          onClick={() => onViewDetail(request.id)}
          style={{
            width: '100%',
            padding: '10px 16px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#5b6b80',
            background: 'white',
            border: '2px solid #d9dfe8',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.borderColor = '#1f6feb';
            e.target.style.color = '#1f6feb';
          }}
          onMouseOut={(e) => {
            e.target.style.borderColor = '#d9dfe8';
            e.target.style.color = '#5b6b80';
          }}
        >
          {isTH ? 'ดูรายละเอียด' : 'View Details'}
        </button>
      )}
    </div>
  );
};

export default HRAdminScreen;

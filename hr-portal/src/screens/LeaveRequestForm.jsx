import { FORMS, LEAVE_HINT } from '../data/forms';
import DatePicker from '../components/DatePicker';

const LeaveRequestForm = ({ t, lang, state, onSubmit, onCancel }) => {
  const {
    step,
    setStep,
    form,
    updateForm,
    errors,
    setErrors
  } = state;

  const isTH = lang === 'th';
  const leaveTypes = FORMS.filter(f => f.cat === 'leave');

  // Calculate days between dates
  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const d1 = new Date(start);
    const d2 = new Date(end);
    const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 0;
  };

  const days = calculateDays(form.startISO, form.endISO);

  // Validation for each step
  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 0) {
      if (!form.leaveType) {
        newErrors.leaveType = t.err_type;
      }
    } else if (currentStep === 1) {
      if (!form.startISO || !form.endISO) {
        newErrors.dates = t.err_dates;
      }
    } else if (currentStep === 2) {
      if (form.leaveType === 'sick' && days >= 3 && !form.attachment) {
        newErrors.cert = t.err_cert;
      }
    } else if (currentStep === 3) {
      if (!form.declare) {
        newErrors.declare = t.err_declare;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      onSubmit();
    }
  };

  // Step indicator
  const StepIndicator = () => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '16px 0',
      marginBottom: '16px'
    }}>
      {[0, 1, 2, 3].map((s) => (
        <div key={s} style={{
          width: step === s ? '32px' : '8px',
          height: '8px',
          borderRadius: '4px',
          background: step >= s ? '#1f6feb' : '#d9dfe8',
          transition: 'all 0.3s'
        }} />
      ))}
    </div>
  );

  return (
    <div style={{ padding: '8px 18px 28px' }}>
      <StepIndicator />

      {/* Step 0: Leave Type Selection */}
      {step === 0 && (
        <div className="step-content" style={{ animation: 'slideUp 0.3s ease-out' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            margin: '0 0 8px',
            color: '#1a2332'
          }}>
            {t.type_title}
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#5b6b80',
            margin: '0 0 24px',
            lineHeight: 1.5
          }}>
            {t.type_sub}
          </p>

          {errors.leaveType && (
            <div style={{
              padding: '12px 16px',
              background: '#fff1f0',
              border: '1px solid #ffccc7',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '14px',
              color: '#cf1322'
            }}>
              {errors.leaveType}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {leaveTypes.map((leave) => (
              <button
                key={leave.id}
                onClick={() => {
                  updateForm('leaveType', leave.id);
                  setErrors({});
                }}
                style={{
                  padding: '16px',
                  background: form.leaveType === leave.id ? '#f0f6ff' : 'white',
                  border: form.leaveType === leave.id ? '2px solid #1f6feb' : '2px solid #e8ecf1',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit'
                }}
                onMouseOver={(e) => {
                  if (form.leaveType !== leave.id) {
                    e.target.style.borderColor = '#c9d6e8';
                  }
                }}
                onMouseOut={(e) => {
                  if (form.leaveType !== leave.id) {
                    e.target.style.borderColor = '#e8ecf1';
                  }
                }}
              >
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1a2332',
                  marginBottom: '4px'
                }}>
                  {isTH ? leave.th : leave.en}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#5b6b80',
                  lineHeight: 1.4
                }}>
                  {LEAVE_HINT[leave.id] ? (isTH ? LEAVE_HINT[leave.id].th : LEAVE_HINT[leave.id].en) : (isTH ? leave.dTh : leave.dEn)}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={!form.leaveType}
            style={{
              width: '100%',
              padding: '14px 24px',
              fontSize: '16px',
              fontWeight: '600',
              color: 'white',
              background: form.leaveType ? 'linear-gradient(135deg, #1f6feb 0%, #0d47a1 100%)' : '#d9dfe8',
              border: 'none',
              borderRadius: '10px',
              cursor: form.leaveType ? 'pointer' : 'not-allowed',
              marginTop: '24px',
              transition: 'all 0.2s',
              fontFamily: 'inherit'
            }}
          >
            {t.next}
          </button>
        </div>
      )}

      {/* Step 1: Date Selection */}
      {step === 1 && (
        <div className="step-content" style={{ animation: 'slideUp 0.3s ease-out' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            margin: '0 0 8px',
            color: '#1a2332'
          }}>
            {t.dates_title}
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#5b6b80',
            margin: '0 0 24px',
            lineHeight: 1.5
          }}>
            {isTH ? 'เลือกวันเริ่มต้นและวันสิ้นสุดการลา' : 'Select the start and end dates for your leave'}
          </p>

          {errors.dates && (
            <div style={{
              padding: '12px 16px',
              background: '#fff1f0',
              border: '1px solid #ffccc7',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '14px',
              color: '#cf1322'
            }}>
              {errors.dates}
            </div>
          )}

          <DatePicker
            value={form.startISO}
            onChange={(val) => updateForm('startISO', val)}
            label={isTH ? 'วันเริ่มต้น' : 'Start date'}
            lang={lang}
          />

          <DatePicker
            value={form.endISO}
            onChange={(val) => updateForm('endISO', val)}
            label={isTH ? 'วันสิ้นสุด' : 'End date'}
            lang={lang}
          />

          {days > 0 && (
            <div style={{
              padding: '12px 16px',
              background: '#f0f6ff',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1f6feb',
              fontWeight: '500'
            }}>
              {days} {days === 1 ? t.day_word : t.days_word}
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button
              onClick={handleBack}
              style={{
                flex: 1,
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
              {isTH ? 'ย้อนกลับ' : 'Back'}
            </button>
            <button
              onClick={handleNext}
              style={{
                flex: 2,
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
              {t.next}
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Details */}
      {step === 2 && (
        <div className="step-content" style={{ animation: 'slideUp 0.3s ease-out' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            margin: '0 0 8px',
            color: '#1a2332'
          }}>
            {t.details_title}
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#5b6b80',
            margin: '0 0 24px',
            lineHeight: 1.5
          }}>
            {isTH ? 'กรอกรายละเอียดเพิ่มเติม' : 'Add additional details'}
          </p>

          {errors.cert && (
            <div style={{
              padding: '12px 16px',
              background: '#fff1f0',
              border: '1px solid #ffccc7',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '14px',
              color: '#cf1322'
            }}>
              {errors.cert}
            </div>
          )}

          {/* Reason */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#1a2332',
              marginBottom: '8px'
            }}>
              {form.leaveType === 'sick' ? t.reason : t.reason_opt}
            </label>
            <textarea
              value={form.reason}
              onChange={(e) => updateForm('reason', e.target.value)}
              placeholder={t.reason_ph}
              rows={3}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '15px',
                border: '2px solid #d9dfe8',
                borderRadius: '8px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1f6feb';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d9dfe8';
              }}
            />
          </div>

          {/* Contact */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#1a2332',
              marginBottom: '8px'
            }}>
              {t.contact_label}
            </label>
            <input
              type="text"
              value={form.contact}
              onChange={(e) => updateForm('contact', e.target.value)}
              placeholder={t.contact_ph}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '15px',
                border: '2px solid #d9dfe8',
                borderRadius: '8px',
                outline: 'none',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1f6feb';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d9dfe8';
              }}
            />
          </div>

          {/* Medical Certificate for sick leave 3+ days */}
          {form.leaveType === 'sick' && days >= 3 && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#1a2332',
                marginBottom: '8px'
              }}>
                {t.cert_label} <span style={{ color: '#ff4d4f' }}>({t.required})</span>
              </label>
              {!form.attachment ? (
                <button
                  onClick={() => updateForm('attachment', 'medical-cert-' + Date.now() + '.jpg')}
                  style={{
                    width: '100%',
                    padding: '32px 16px',
                    background: '#f5f7fb',
                    border: '2px dashed #d9dfe8',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    color: '#5b6b80',
                    fontSize: '14px'
                  }}
                >
                  <div style={{ marginBottom: '8px', fontSize: '32px' }}>📄</div>
                  {t.upload}
                  <div style={{ fontSize: '12px', marginTop: '4px' }}>{t.cert_hint}</div>
                </button>
              ) : (
                <div style={{
                  padding: '16px',
                  background: '#f0f6ff',
                  border: '2px solid #1f6feb',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '24px' }}>✓</div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: '#1a2332' }}>
                        {form.attachment}
                      </div>
                      <div style={{ fontSize: '12px', color: '#5b6b80', marginTop: '2px' }}>
                        {isTH ? 'อัปโหลดแล้ว' : 'Uploaded'}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => updateForm('attachment', '')}
                    style={{
                      padding: '6px 12px',
                      background: 'transparent',
                      border: 'none',
                      color: '#ff4d4f',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      fontFamily: 'inherit'
                    }}
                  >
                    {t.remove}
                  </button>
                </div>
              )}
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button
              onClick={handleBack}
              style={{
                flex: 1,
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
              {isTH ? 'ย้อนกลับ' : 'Back'}
            </button>
            <button
              onClick={handleNext}
              style={{
                flex: 2,
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
              {t.next}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="step-content" style={{ animation: 'slideUp 0.3s ease-out' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            margin: '0 0 24px',
            color: '#1a2332'
          }}>
            {t.review_title}
          </h2>

          {errors.declare && (
            <div style={{
              padding: '12px 16px',
              background: '#fff1f0',
              border: '1px solid #ffccc7',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '14px',
              color: '#cf1322'
            }}>
              {errors.declare}
            </div>
          )}

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
          }}>
            <ReviewRow
              label={t.f_type}
              value={isTH ? FORMS.find(f => f.id === form.leaveType)?.th : FORMS.find(f => f.id === form.leaveType)?.en}
            />
            <ReviewRow
              label={t.f_dates}
              value={`${new Date(form.startISO).toLocaleDateString(isTH ? 'th-TH' : 'en-US', { month: 'short', day: 'numeric' })} ${t.dash} ${new Date(form.endISO).toLocaleDateString(isTH ? 'th-TH' : 'en-US', { month: 'short', day: 'numeric' })}`}
            />
            <ReviewRow
              label={t.f_duration}
              value={`${days} ${days === 1 ? t.day_word : t.days_word}`}
            />
            {form.reason && (
              <ReviewRow
                label={t.f_reason}
                value={form.reason}
              />
            )}
            {form.contact && (
              <ReviewRow
                label={t.f_contact}
                value={form.contact}
              />
            )}
            {form.attachment && (
              <ReviewRow
                label={t.f_cert}
                value={form.attachment}
                isLast
              />
            )}
          </div>

          {/* Declaration */}
          <label style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            padding: '16px',
            background: '#f5f7fb',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '24px'
          }}>
            <input
              type="checkbox"
              checked={form.declare}
              onChange={(e) => updateForm('declare', e.target.checked)}
              style={{
                width: '20px',
                height: '20px',
                marginTop: '2px',
                cursor: 'pointer'
              }}
            />
            <span style={{
              fontSize: '14px',
              lineHeight: 1.5,
              color: '#1a2332'
            }}>
              {t.declare}
            </span>
          </label>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleBack}
              style={{
                flex: 1,
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
              {isTH ? 'ย้อนกลับ' : 'Back'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={!form.declare}
              style={{
                flex: 2,
                padding: '14px 24px',
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                background: form.declare ? 'linear-gradient(135deg, #1f6feb 0%, #0d47a1 100%)' : '#d9dfe8',
                border: 'none',
                borderRadius: '10px',
                cursor: form.declare ? 'pointer' : 'not-allowed',
                fontFamily: 'inherit'
              }}
            >
              {t.submit}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for review rows
const ReviewRow = ({ label, value, isLast }) => (
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

export default LeaveRequestForm;

import { FORMS } from '../data/forms';

const DocumentRequestForm = ({ t, lang, formType, onSubmit, onCancel }) => {
  const isTH = lang === 'th';
  const documentTypes = FORMS.filter(f => f.cat === 'documents');
  const selectedDoc = FORMS.find(f => f.id === formType);

  return (
    <div style={{ padding: '8px 18px 28px' }}>
      <h2 style={{
        fontSize: '20px',
        fontWeight: '600',
        margin: '0 0 8px',
        color: '#1a2332'
      }}>
        {selectedDoc ? (isTH ? selectedDoc.th : selectedDoc.en) : (isTH ? 'ขอเอกสาร' : 'Request Document')}
      </h2>
      <p style={{
        fontSize: '14px',
        color: '#5b6b80',
        margin: '0 0 24px',
        lineHeight: 1.5
      }}>
        {selectedDoc ? (isTH ? selectedDoc.dTh : selectedDoc.dEn) : ''}
      </p>

      {/* Document Info Card */}
      <div style={{
        background: '#f0f6ff',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px',
        border: '2px solid #1f6feb'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: '#1f6feb',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>
            📄
          </div>
          <div>
            <div style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1a2332',
              marginBottom: '4px'
            }}>
              {selectedDoc ? (isTH ? selectedDoc.th : selectedDoc.en) : ''}
            </div>
            <div style={{
              fontSize: '13px',
              color: '#5b6b80'
            }}>
              {isTH ? 'เอกสารทางการ' : 'Official document'}
            </div>
          </div>
        </div>

        <div style={{
          height: '1px',
          background: '#c9d6e8',
          margin: '16px 0'
        }} />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '14px'
        }}>
          <span style={{ color: '#5b6b80' }}>
            {isTH ? 'ระยะเวลาดำเนินการ' : 'Processing time'}
          </span>
          <span style={{ fontWeight: '600', color: '#1a2332' }}>
            {selectedDoc?.days || 3} {isTH ? 'วัน' : 'days'}
          </span>
        </div>
      </div>

      {/* Purpose field */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          color: '#1a2332',
          marginBottom: '8px'
        }}>
          {isTH ? 'วัตถุประสงค์ (ไม่บังคับ)' : 'Purpose (optional)'}
        </label>
        <textarea
          id="doc-purpose"
          placeholder={isTH ? 'ระบุวัตถุประสงค์ในการขอเอกสาร' : 'Specify the purpose for requesting this document'}
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

      {/* Delivery method */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          color: '#1a2332',
          marginBottom: '12px'
        }}>
          {isTH ? 'วิธีการรับเอกสาร' : 'Delivery method'}
        </label>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            background: 'white',
            border: '2px solid #1f6feb',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            <input
              type="radio"
              name="delivery"
              value="email"
              defaultChecked
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer'
              }}
            />
            <div>
              <div style={{ fontSize: '15px', fontWeight: '500', color: '#1a2332' }}>
                {isTH ? 'อีเมล' : 'Email'}
              </div>
              <div style={{ fontSize: '13px', color: '#5b6b80', marginTop: '2px' }}>
                {isTH ? 'ส่งเอกสาร PDF ทางอีเมล' : 'Receive PDF via email'}
              </div>
            </div>
          </label>

          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            background: 'white',
            border: '2px solid #e8ecf1',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            <input
              type="radio"
              name="delivery"
              value="pickup"
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer'
              }}
            />
            <div>
              <div style={{ fontSize: '15px', fontWeight: '500', color: '#1a2332' }}>
                {isTH ? 'รับที่ HR' : 'Pick up at HR'}
              </div>
              <div style={{ fontSize: '13px', color: '#5b6b80', marginTop: '2px' }}>
                {isTH ? 'รับเอกสารฉบับจริงที่แผนก HR' : 'Collect original document at HR department'}
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Info note */}
      <div style={{
        padding: '16px',
        background: '#fff7e6',
        borderRadius: '8px',
        marginBottom: '24px',
        fontSize: '13px',
        color: '#7c5c00',
        lineHeight: 1.5
      }}>
        <div style={{ fontWeight: '600', marginBottom: '4px' }}>
          {isTH ? '💡 หมายเหตุ' : '💡 Note'}
        </div>
        {isTH
          ? 'เอกสารจะมีตราประทับและลายเซ็นอิเล็กทรอนิกส์ของบริษัท สามารถใช้ยื่นกับหน่วยงานราชการได้'
          : 'Documents will include company stamp and electronic signature. Valid for submission to government agencies.'}
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={onCancel}
          style={{
            flex: 1,
            padding: '14px 24px',
            fontSize: '16px',
            fontWeight: '600',
            color: '#5b6b80',
            background: 'white',
            border: '2px solid #d9dfe8',
            borderRadius: '10px',
            cursor: 'pointer',
            fontFamily: 'inherit'
          }}
        >
          {isTH ? 'ยกเลิก' : 'Cancel'}
        </button>
        <button
          onClick={() => {
            const purpose = document.getElementById('doc-purpose').value;
            const delivery = document.querySelector('input[name="delivery"]:checked').value;
            onSubmit({ purpose, delivery });
          }}
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
          {t.submit}
        </button>
      </div>
    </div>
  );
};

export default DocumentRequestForm;

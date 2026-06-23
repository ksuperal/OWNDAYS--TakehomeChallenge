import { FORMS } from '../data/forms';

const CategoryScreen = ({ t, lang, category, onSelectForm }) => {
  const isTH = lang === 'th';
  const categoryForms = FORMS.filter(f => f.cat === category);

  // Category icons
  const categoryIcons = {
    payroll: '💰',
    benefits: '🎁',
    expense: '📊',
    other: '📋'
  };

  return (
    <div style={{ padding: '8px 18px 28px' }}>
      {/* Category Icon */}
      <div style={{
        textAlign: 'center',
        padding: '20px 0',
        fontSize: '64px'
      }}>
        {categoryIcons[category] || '📄'}
      </div>

      {/* Category Description */}
      <p style={{
        fontSize: '14px',
        color: '#5b6b80',
        textAlign: 'center',
        margin: '0 0 32px',
        lineHeight: 1.5
      }}>
        {category === 'payroll' && (isTH ? 'เงินเดือน ภาษี และเงินล่วงหน้า' : 'Salary, tax, and advance payments')}
        {category === 'benefits' && (isTH ? 'ประกันสุขภาพ กองทุน และสวัสดิการ' : 'Health insurance, funds, and welfare')}
        {category === 'expense' && (isTH ? 'เบิกค่าใช้จ่ายและค่าเดินทาง' : 'Expense and travel reimbursements')}
        {category === 'other' && (isTH ? 'คำขออื่นๆ ทั่วไป' : 'Other general requests')}
      </p>

      {/* Forms List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {categoryForms.map((form) => (
          <button
            key={form.id}
            onClick={() => onSelectForm(form.id)}
            style={{
              background: 'white',
              border: '2px solid #e8ecf1',
              borderRadius: '12px',
              padding: '16px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
              fontFamily: 'inherit'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#1f6feb';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(31,111,235,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = '#e8ecf1';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1a2332',
                  margin: '0 0 6px'
                }}>
                  {isTH ? form.th : form.en}
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: '#5b6b80',
                  margin: '0 0 8px',
                  lineHeight: 1.4
                }}>
                  {isTH ? form.dTh : form.dEn}
                </p>
                <div style={{
                  fontSize: '12px',
                  color: '#8a99ad'
                }}>
                  {isTH ? 'ระยะเวลา' : 'Processing'}: {form.days} {isTH ? 'วัน' : 'days'}
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginLeft: '12px', marginTop: '4px' }}>
                <path d="M7 4l6 6-6 6" stroke="#1f6feb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Empty State */}
      {categoryForms.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: '#8a99ad'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
          <p style={{ fontSize: '14px', margin: 0 }}>
            {isTH ? 'ยังไม่มีฟอร์มในหมวดนี้' : 'No forms available in this category'}
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryScreen;

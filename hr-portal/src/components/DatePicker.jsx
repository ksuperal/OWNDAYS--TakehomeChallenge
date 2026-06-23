import { MONFULL_EN, MONFULL_TH } from '../data/translations';

const DatePicker = ({ value, onChange, label, lang }) => {
  const isTH = lang === 'th';
  const today = new Date();

  // Parse the ISO date string if provided
  const selectedDate = value ? new Date(value) : null;

  const handleDateChange = (e) => {
    onChange(e.target.value); // Returns YYYY-MM-DD format
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{
        display: 'block',
        fontSize: '14px',
        fontWeight: '500',
        color: '#1a2332',
        marginBottom: '8px'
      }}>
        {label}
      </label>
      <input
        type="date"
        value={value || ''}
        onChange={handleDateChange}
        min={today.toISOString().split('T')[0]}
        style={{
          width: '100%',
          padding: '12px 16px',
          fontSize: '15px',
          border: '2px solid #d9dfe8',
          borderRadius: '8px',
          outline: 'none',
          transition: 'all 0.2s',
          fontFamily: 'inherit',
          boxSizing: 'border-box',
          cursor: 'pointer'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#1f6feb';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#d9dfe8';
        }}
      />
    </div>
  );
};

export default DatePicker;

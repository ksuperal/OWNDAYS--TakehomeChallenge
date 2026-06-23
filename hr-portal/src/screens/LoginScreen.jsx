import { useState } from 'react';

const LoginScreen = ({ t, onLogin }) => {
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!empId.trim()) {
      newErrors.empId = t.err_emp_id;
    }
    if (!password.trim()) {
      newErrors.password = t.err_password;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simple demo authentication - accept any credentials
    // In production, this would call an API
    if (empId.trim() && password.trim()) {
      const empIdUpper = empId.toUpperCase();

      // Check if logging in as HR
      const isHR = empIdUpper === 'HR' || empIdUpper.startsWith('HR');

      // Demo user data
      const user = isHR ? {
        empId: 'HR001',
        nameEN: 'HR Admin',
        nameTH: 'ผู้ดูแลระบบ HR',
        fullNameEN: 'HR Administrator',
        fullNameTH: 'ผู้ดูแลระบบฝ่ายบุคคล',
        departmentEN: 'Human Resources',
        departmentTH: 'ฝ่ายทรัพยากรบุคคล',
        positionEN: 'HR Manager',
        positionTH: 'ผู้จัดการฝ่ายบุคคล',
        email: 'hr@owndays.com',
        joinedDate: '2020-01-15',
        role: 'hr'
      } : {
        empId: empIdUpper,
        nameEN: 'Ploy S.',
        nameTH: 'พลอย ส.',
        fullNameEN: 'Ploy Suwan',
        fullNameTH: 'พลอย สุวรรณ',
        departmentEN: 'Operations',
        departmentTH: 'ฝ่ายปฏิบัติการ',
        positionEN: 'Store Manager',
        positionTH: 'ผู้จัดการสาขา',
        email: 'ploy.s@owndays.com',
        joinedDate: '2023-03-15',
        role: 'employee'
      };
      onLogin(user);
      setErrors({});
    } else {
      setErrors({ general: t.err_invalid });
    }
  };

  return (
    <div style={{
      padding: '0 18px 28px',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%'
    }}>
      {/* Logo and Title */}
      <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '32px' }}>
        <div style={{
          width: '72px',
          height: '72px',
          margin: '0 auto 20px',
          background: 'linear-gradient(135deg, #1f6feb 0%, #0d47a1 100%)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(31,111,235,0.25)'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'white',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          }} />
        </div>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '600',
          margin: '0 0 8px',
          color: '#1a2332'
        }}>
          {t.login_title}
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#5b6b80',
          margin: 0,
          lineHeight: 1.5
        }}>
          {t.login_subtitle}
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* General Error */}
        {errors.general && (
          <div style={{
            padding: '12px 16px',
            background: '#fff1f0',
            border: '1px solid #ffccc7',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px',
            color: '#cf1322'
          }}>
            {errors.general}
          </div>
        )}

        {/* Employee ID */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#1a2332',
            marginBottom: '8px'
          }}>
            {t.emp_id}
          </label>
          <input
            type="text"
            value={empId}
            onChange={(e) => {
              setEmpId(e.target.value);
              if (errors.empId) {
                setErrors({ ...errors, empId: null });
              }
            }}
            placeholder={t.emp_id_ph}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '15px',
              border: errors.empId ? '2px solid #ff4d4f' : '2px solid #d9dfe8',
              borderRadius: '8px',
              outline: 'none',
              transition: 'all 0.2s',
              fontFamily: 'inherit',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              if (!errors.empId) {
                e.target.style.borderColor = '#1f6feb';
              }
            }}
            onBlur={(e) => {
              if (!errors.empId) {
                e.target.style.borderColor = '#d9dfe8';
              }
            }}
          />
          {errors.empId && (
            <p style={{
              fontSize: '13px',
              color: '#ff4d4f',
              margin: '6px 0 0',
              lineHeight: 1.4
            }}>
              {errors.empId}
            </p>
          )}
        </div>

        {/* Password */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#1a2332',
            marginBottom: '8px'
          }}>
            {t.password}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) {
                setErrors({ ...errors, password: null });
              }
            }}
            placeholder={t.password_ph}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '15px',
              border: errors.password ? '2px solid #ff4d4f' : '2px solid #d9dfe8',
              borderRadius: '8px',
              outline: 'none',
              transition: 'all 0.2s',
              fontFamily: 'inherit',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              if (!errors.password) {
                e.target.style.borderColor = '#1f6feb';
              }
            }}
            onBlur={(e) => {
              if (!errors.password) {
                e.target.style.borderColor = '#d9dfe8';
              }
            }}
          />
          {errors.password && (
            <p style={{
              fontSize: '13px',
              color: '#ff4d4f',
              margin: '6px 0 0',
              lineHeight: 1.4
            }}>
              {errors.password}
            </p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div style={{ marginBottom: '24px', textAlign: 'right' }}>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{
              fontSize: '14px',
              color: '#1f6feb',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            {t.forgot_password}
          </a>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
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
            transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(31,111,235,0.3)',
            fontFamily: 'inherit'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-1px)';
            e.target.style.boxShadow = '0 6px 16px rgba(31,111,235,0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(31,111,235,0.3)';
          }}
        >
          {t.sign_in}
        </button>
      </form>

      {/* Demo Info */}
      <div style={{
        marginTop: '32px',
        padding: '16px',
        background: '#f5f7fb',
        borderRadius: '8px',
        fontSize: '13px',
        color: '#5b6b80',
        lineHeight: 1.5
      }}>
        <div style={{ fontWeight: '600', marginBottom: '8px', color: '#1a2332' }}>
          Demo Mode
        </div>
        <div style={{ marginBottom: '8px' }}>
          <strong>Employee:</strong> Enter any employee ID
        </div>
        <div>
          <strong>HR Admin:</strong> Enter "HR" as employee ID
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

import { useState, useEffect } from 'react';

// Load requests from localStorage
const loadRequests = () => {
  try {
    const saved = localStorage.getItem('hr_portal_requests');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load requests:', error);
    return [];
  }
};

// Save requests to localStorage
const saveRequests = (requests) => {
  try {
    localStorage.setItem('hr_portal_requests', JSON.stringify(requests));
  } catch (error) {
    console.error('Failed to save requests:', error);
  }
};

export const useAppState = () => {
  const [lang, setLang] = useState('en');
  const [screen, setScreen] = useState('home');
  const [activeCat, setActiveCat] = useState('leave');
  const [detailId, setDetailId] = useState(null);
  const [reqFilter, setReqFilter] = useState('all');
  const [step, setStep] = useState(0);
  const [viewY, setViewY] = useState(2026);
  const [viewM, setViewM] = useState(5); // 0-indexed, so June
  const [form, setForm] = useState({
    leaveType: '',
    startISO: '',
    endISO: '',
    reason: '',
    contact: '',
    attachment: '',
    declare: false
  });
  const [errors, setErrors] = useState({});
  const [lineOn, setLineOn] = useState(true);
  const [emailOn, setEmailOn] = useState(true);
  const [lastRef, setLastRef] = useState('');
  const [lastReq, setLastReq] = useState(null);
  const [requests, setRequests] = useState(loadRequests());

  // Save requests to localStorage whenever they change
  useEffect(() => {
    saveRequests(requests);
  }, [requests]);

  // Authentication state - added at the end to preserve hook order
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const goToScreen = (screenName, options = {}) => {
    setScreen(screenName);
    if (options.activeCat) setActiveCat(options.activeCat);
    if (options.detailId) setDetailId(options.detailId);
  };

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm({
      leaveType: '',
      startISO: '',
      endISO: '',
      reason: '',
      contact: '',
      attachment: '',
      declare: false
    });
    setErrors({});
    setStep(0);
  };

  const shiftMonth = (delta) => {
    let newM = viewM + delta;
    let newY = viewY;
    if (newM < 0) {
      newM = 11;
      newY--;
    }
    if (newM > 11) {
      newM = 0;
      newY++;
    }
    setViewM(newM);
    setViewY(newY);
  };

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setScreen('home');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setScreen('home');
    // Don't clear requests on logout - they should persist for HR to see
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
    lang,
    setLang,
    screen,
    setScreen,
    activeCat,
    setActiveCat,
    detailId,
    setDetailId,
    reqFilter,
    setReqFilter,
    step,
    setStep,
    viewY,
    viewM,
    shiftMonth,
    form,
    setForm,
    updateForm,
    resetForm,
    errors,
    setErrors,
    lineOn,
    setLineOn,
    emailOn,
    setEmailOn,
    lastRef,
    setLastRef,
    lastReq,
    setLastReq,
    requests,
    setRequests,
    goToScreen
  };
};

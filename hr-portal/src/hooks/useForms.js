import { useState, useEffect } from 'react';
import { FORMS as DEFAULT_FORMS } from '../data/forms';

const STORAGE_KEY = 'hr_portal_custom_forms';

export const useForms = () => {
  const [forms, setForms] = useState(() => {
    // Try to load custom forms from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored forms:', e);
        return DEFAULT_FORMS;
      }
    }
    return DEFAULT_FORMS;
  });

  // Save forms to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
  }, [forms]);

  const addForm = (newForm) => {
    setForms(prev => [...prev, newForm]);
  };

  const updateForm = (id, updatedForm) => {
    setForms(prev => prev.map(form =>
      form.id === id ? { ...form, ...updatedForm } : form
    ));
  };

  const deleteForm = (id) => {
    setForms(prev => prev.filter(form => form.id !== id));
  };

  const resetToDefaults = () => {
    setForms(DEFAULT_FORMS);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    forms,
    addForm,
    updateForm,
    deleteForm,
    resetToDefaults
  };
};

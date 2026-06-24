import { useState } from 'react';

const CATEGORIES = [
  { id: 'leave', en: 'Leave', th: 'ลา' },
  { id: 'payroll', en: 'Payroll', th: 'เงินเดือน' },
  { id: 'documents', en: 'Documents', th: 'เอกสาร' },
  { id: 'benefits', en: 'Benefits', th: 'สวัสดิการ' },
  { id: 'expense', en: 'Expense', th: 'ค่าใช้จ่าย' },
  { id: 'other', en: 'Other', th: 'อื่นๆ' }
];

const FormManagementScreen = ({ forms, onAddForm, onUpdateForm, onDeleteForm, onResetDefaults, lang }) => {
  const isTH = lang === 'th';
  const [showModal, setShowModal] = useState(false);
  const [editingForm, setEditingForm] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    cat: 'leave',
    en: '',
    th: '',
    dEn: '',
    dTh: '',
    days: 3
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const handleOpenModal = (form = null) => {
    if (form) {
      setEditingForm(form);
      setFormData(form);
    } else {
      setEditingForm(null);
      setFormData({
        id: '',
        cat: 'leave',
        en: '',
        th: '',
        dEn: '',
        dTh: '',
        days: 3
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingForm(null);
    setFormData({
      id: '',
      cat: 'leave',
      en: '',
      th: '',
      dEn: '',
      dTh: '',
      days: 3
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.id || !formData.en || !formData.th || !formData.dEn || !formData.dTh) {
      alert(isTH ? 'กรุณากรอกข้อมูลให้ครบถ้วน' : 'Please fill in all required fields');
      return;
    }

    if (editingForm) {
      onUpdateForm(editingForm.id, formData);
    } else {
      // Check if ID already exists
      if (forms.find(f => f.id === formData.id)) {
        alert(isTH ? 'รหัสฟอร์มนี้มีอยู่แล้ว' : 'Form ID already exists');
        return;
      }
      onAddForm(formData);
    }
    handleCloseModal();
  };

  const handleDelete = (formId) => {
    if (window.confirm(isTH ? 'คุณแน่ใจหรือไม่ที่จะลบฟอร์มนี้?' : 'Are you sure you want to delete this form?')) {
      onDeleteForm(formId);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm(isTH
      ? 'คุณแน่ใจหรือไม่ที่จะรีเซ็ตเป็นค่าเริ่มต้น? การเปลี่ยนแปลงทั้งหมดจะหายไป'
      : 'Are you sure you want to reset to defaults? All custom changes will be lost')) {
      onResetDefaults();
    }
  };

  // Filter forms
  const filteredForms = forms.filter(form => {
    const matchesSearch = searchQuery === '' ||
      form.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.th.includes(searchQuery) ||
      form.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = filterCategory === 'all' || form.cat === filterCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: '8px 18px 28px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #722ed1 0%, #531dab 100%)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
        color: 'white'
      }}>
        <div style={{ fontSize: '24px', marginBottom: '8px' }}>📋</div>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          margin: '0 0 4px'
        }}>
          {isTH ? 'จัดการฟอร์ม' : 'Form Management'}
        </h2>
        <p style={{
          fontSize: '14px',
          margin: 0,
          opacity: 0.9
        }}>
          {isTH ? 'เพิ่ม แก้ไข และจัดการฟอร์มทั้งหมด' : 'Add, edit, and manage all forms'}
        </p>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <div style={{
          background: '#f9f0ff',
          border: '2px solid #d3adf7',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#722ed1',
            marginBottom: '4px'
          }}>
            {forms.length}
          </div>
          <div style={{
            fontSize: '13px',
            color: '#531dab',
            fontWeight: '500'
          }}>
            {isTH ? 'ฟอร์มทั้งหมด' : 'Total Forms'}
          </div>
        </div>

        <div style={{
          background: '#fff1f0',
          border: '2px solid #ffccc7',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#cf1322',
            marginBottom: '4px'
          }}>
            {CATEGORIES.length}
          </div>
          <div style={{
            fontSize: '13px',
            color: '#a8071a',
            fontWeight: '500'
          }}>
            {isTH ? 'หมวดหมู่' : 'Categories'}
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder={isTH ? 'ค้นหาฟอร์ม...' : 'Search forms...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: '14px',
            border: '2px solid #d9dfe8',
            borderRadius: '8px',
            outline: 'none',
            fontFamily: 'inherit',
            boxSizing: 'border-box',
            marginBottom: '12px'
          }}
        />

        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px'
        }}>
          <button
            onClick={() => setFilterCategory('all')}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: '600',
              color: filterCategory === 'all' ? '#722ed1' : '#5b6b80',
              background: filterCategory === 'all' ? '#f9f0ff' : 'white',
              border: filterCategory === 'all' ? '2px solid #722ed1' : '2px solid #e8ecf1',
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap'
            }}
          >
            {isTH ? 'ทั้งหมด' : 'All'} ({forms.length})
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              style={{
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: '600',
                color: filterCategory === cat.id ? '#722ed1' : '#5b6b80',
                background: filterCategory === cat.id ? '#f9f0ff' : 'white',
                border: filterCategory === cat.id ? '2px solid #722ed1' : '2px solid #e8ecf1',
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap'
              }}
            >
              {isTH ? cat.th : cat.en} ({forms.filter(f => f.cat === cat.id).length})
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <button
          onClick={() => handleOpenModal()}
          style={{
            flex: 1,
            padding: '14px 20px',
            fontSize: '15px',
            fontWeight: '600',
            color: 'white',
            background: 'linear-gradient(135deg, #722ed1 0%, #531dab 100%)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'inherit'
          }}
        >
          + {isTH ? 'เพิ่มฟอร์มใหม่' : 'Add New Form'}
        </button>
        <button
          onClick={handleResetDefaults}
          style={{
            padding: '14px 20px',
            fontSize: '15px',
            fontWeight: '600',
            color: '#cf1322',
            background: 'white',
            border: '2px solid #ffccc7',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'inherit'
          }}
        >
          ↺ {isTH ? 'รีเซ็ต' : 'Reset'}
        </button>
      </div>

      {/* Forms List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredForms.map((form) => (
          <FormCard
            key={form.id}
            form={form}
            isTH={isTH}
            onEdit={() => handleOpenModal(form)}
            onDelete={() => handleDelete(form.id)}
          />
        ))}
      </div>

      {filteredForms.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'white',
          borderRadius: '12px',
          border: '2px dashed #d9dfe8'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1a2332',
            margin: '0 0 8px'
          }}>
            {isTH ? 'ไม่พบฟอร์ม' : 'No Forms Found'}
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#5b6b80',
            margin: 0
          }}>
            {isTH ? 'ลองค้นหาด้วยคำอื่นหรือเปลี่ยนตัวกรอง' : 'Try different keywords or filters'}
          </p>
        </div>
      )}

      {/* Form Modal */}
      {showModal && (
        <FormModal
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onClose={handleCloseModal}
          isEditing={!!editingForm}
          isTH={isTH}
        />
      )}
    </div>
  );
};

// Form Card Component
const FormCard = ({ form, isTH, onEdit, onDelete }) => {
  const categoryData = CATEGORIES.find(c => c.id === form.cat);

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      border: '2px solid #e8ecf1'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px'
          }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1a2332',
              margin: 0
            }}>
              {isTH ? form.th : form.en}
            </h4>
            <span style={{
              padding: '2px 8px',
              fontSize: '11px',
              fontWeight: '600',
              color: '#722ed1',
              background: '#f9f0ff',
              borderRadius: '4px'
            }}>
              {isTH ? categoryData?.th : categoryData?.en}
            </span>
          </div>

          <p style={{
            fontSize: '13px',
            color: '#5b6b80',
            margin: '0 0 8px',
            lineHeight: 1.5
          }}>
            {isTH ? form.dTh : form.dEn}
          </p>

          <div style={{
            fontSize: '12px',
            color: '#8c8c8c',
            fontFamily: 'IBM Plex Mono, monospace'
          }}>
            ID: {form.id} • {isTH ? 'ระยะเวลา' : 'Processing'}: {form.days} {isTH ? 'วัน' : 'days'}
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginLeft: '12px'
        }}>
          <button
            onClick={onEdit}
            style={{
              padding: '8px 12px',
              fontSize: '13px',
              fontWeight: '600',
              color: '#722ed1',
              background: '#f9f0ff',
              border: '2px solid #d3adf7',
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap'
            }}
          >
            ✏️ {isTH ? 'แก้ไข' : 'Edit'}
          </button>
          <button
            onClick={onDelete}
            style={{
              padding: '8px 12px',
              fontSize: '13px',
              fontWeight: '600',
              color: '#cf1322',
              background: '#fff1f0',
              border: '2px solid #ffccc7',
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap'
            }}
          >
            🗑️ {isTH ? 'ลบ' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Form Modal Component
const FormModal = ({ formData, setFormData, onSubmit, onClose, isEditing, isTH }) => {
  return (
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
      padding: '20px',
      overflowY: 'auto'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#1a2332',
          margin: '0 0 20px'
        }}>
          {isEditing
            ? (isTH ? 'แก้ไขฟอร์ม' : 'Edit Form')
            : (isTH ? 'เพิ่มฟอร์มใหม่' : 'Add New Form')}
        </h3>

        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#1a2332',
              marginBottom: '6px'
            }}>
              {isTH ? 'รหัสฟอร์ม' : 'Form ID'} *
            </label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              disabled={isEditing}
              placeholder="e.g., annual"
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '14px',
                border: '2px solid #d9dfe8',
                borderRadius: '8px',
                outline: 'none',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                background: isEditing ? '#f5f5f5' : 'white'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#1a2332',
              marginBottom: '6px'
            }}>
              {isTH ? 'หมวดหมู่' : 'Category'} *
            </label>
            <select
              value={formData.cat}
              onChange={(e) => setFormData({ ...formData, cat: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '14px',
                border: '2px solid #d9dfe8',
                borderRadius: '8px',
                outline: 'none',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              required
            >
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {isTH ? cat.th : cat.en}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#1a2332',
              marginBottom: '6px'
            }}>
              {isTH ? 'ชื่อ (ภาษาอังกฤษ)' : 'Name (English)'} *
            </label>
            <input
              type="text"
              value={formData.en}
              onChange={(e) => setFormData({ ...formData, en: e.target.value })}
              placeholder="e.g., Annual Leave"
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '14px',
                border: '2px solid #d9dfe8',
                borderRadius: '8px',
                outline: 'none',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#1a2332',
              marginBottom: '6px'
            }}>
              {isTH ? 'ชื่อ (ภาษาไทย)' : 'Name (Thai)'} *
            </label>
            <input
              type="text"
              value={formData.th}
              onChange={(e) => setFormData({ ...formData, th: e.target.value })}
              placeholder="เช่น ลาพักร้อน"
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '14px',
                border: '2px solid #d9dfe8',
                borderRadius: '8px',
                outline: 'none',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#1a2332',
              marginBottom: '6px'
            }}>
              {isTH ? 'คำอธิบาย (ภาษาอังกฤษ)' : 'Description (English)'} *
            </label>
            <textarea
              value={formData.dEn}
              onChange={(e) => setFormData({ ...formData, dEn: e.target.value })}
              placeholder="e.g., Paid vacation days from your balance"
              rows={2}
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '14px',
                border: '2px solid #d9dfe8',
                borderRadius: '8px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#1a2332',
              marginBottom: '6px'
            }}>
              {isTH ? 'คำอธิบาย (ภาษาไทย)' : 'Description (Thai)'} *
            </label>
            <textarea
              value={formData.dTh}
              onChange={(e) => setFormData({ ...formData, dTh: e.target.value })}
              placeholder="เช่น วันลาพักร้อนแบบได้รับค่าจ้าง"
              rows={2}
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '14px',
                border: '2px solid #d9dfe8',
                borderRadius: '8px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#1a2332',
              marginBottom: '6px'
            }}>
              {isTH ? 'ระยะเวลาดำเนินการ (วัน)' : 'Processing Days'} *
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={formData.days}
              onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '14px',
                border: '2px solid #d9dfe8',
                borderRadius: '8px',
                outline: 'none',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={onClose}
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
              type="submit"
              style={{
                flex: 1,
                padding: '12px 20px',
                fontSize: '15px',
                fontWeight: '600',
                color: 'white',
                background: 'linear-gradient(135deg, #722ed1 0%, #531dab 100%)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              {isEditing
                ? (isTH ? 'บันทึก' : 'Save')
                : (isTH ? 'เพิ่ม' : 'Add')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormManagementScreen;

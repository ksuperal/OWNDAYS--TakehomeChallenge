export const FORMS = [
  { id: 'annual', cat: 'leave', en: 'Annual Leave', th: 'ลาพักร้อน', dEn: 'Paid vacation days from your balance', dTh: 'วันลาพักร้อนแบบได้รับค่าจ้าง', days: 1 },
  { id: 'sick', cat: 'leave', en: 'Sick Leave', th: 'ลาป่วย', dEn: 'Medical certificate needed for 3+ days', dTh: 'ต้องมีใบรับรองแพทย์หากลา 3 วันขึ้นไป', days: 1 },
  { id: 'personal', cat: 'leave', en: 'Personal Leave', th: 'ลากิจ', dEn: 'Personal business leave', dTh: 'ลาเพื่อกิจธุระส่วนตัว', days: 1 },
  { id: 'maternity', cat: 'leave', en: 'Maternity Leave', th: 'ลาคลอด', dEn: 'Up to 98 days under Thai labour law', dTh: 'สูงสุด 98 วันตามกฎหมายแรงงาน', days: 3 },
  { id: 'monk', cat: 'leave', en: 'Ordination Leave', th: 'ลาอุปสมบท', dEn: 'Leave to enter monkhood', dTh: 'ลาเพื่อบวช', days: 3 },
  { id: 'payslip', cat: 'payroll', en: 'Payslip Request', th: 'ขอสลิปเงินเดือน', dEn: 'Download a payslip for any month', dTh: 'ดาวน์โหลดสลิปเงินเดือนรายเดือน', days: 2 },
  { id: 'tax50', cat: 'payroll', en: 'Tax Certificate (50 bis)', th: 'หนังสือรับรองภาษี (50 ทวิ)', dEn: 'Annual withholding tax certificate', dTh: 'หนังสือรับรองหัก ณ ที่จ่ายประจำปี', days: 3 },
  { id: 'advance', cat: 'payroll', en: 'Salary Advance', th: 'ขอเบิกเงินเดือนล่วงหน้า', dEn: 'Request an advance against salary', dTh: 'ขอเบิกเงินเดือนล่วงหน้า', days: 3 },
  { id: 'emp_cert', cat: 'documents', en: 'Employment Certificate', th: 'หนังสือรับรองการทำงาน', dEn: 'Proof of current employment', dTh: 'เอกสารยืนยันการเป็นพนักงาน', days: 3 },
  { id: 'sal_cert', cat: 'documents', en: 'Salary Certificate', th: 'หนังสือรับรองเงินเดือน', dEn: 'Certified statement of salary', dTh: 'หนังสือรับรองเงินเดือน', days: 3 },
  { id: 'work_permit', cat: 'documents', en: 'Work Permit Letter', th: 'จดหมายใบอนุญาตทำงาน', dEn: 'Supporting letter for work permit', dTh: 'จดหมายประกอบการขอใบอนุญาตทำงาน', days: 5 },
  { id: 'ref_letter', cat: 'documents', en: 'Reference Letter', th: 'จดหมายรับรอง', dEn: 'Reference for external use', dTh: 'จดหมายรับรองสำหรับใช้ภายนอก', days: 5 },
  { id: 'health', cat: 'benefits', en: 'Health Insurance Enrolment', th: 'สมัครประกันสุขภาพ', dEn: 'Enrol or update health coverage', dTh: 'สมัครหรือปรับปรุงประกันสุขภาพ', days: 5 },
  { id: 'pvd', cat: 'benefits', en: 'Provident Fund', th: 'กองทุนสำรองเลี้ยงชีพ', dEn: 'Change your contribution rate', dTh: 'เปลี่ยนอัตราการสะสมเงิน', days: 5 },
  { id: 'welfare', cat: 'benefits', en: 'Welfare Claim', th: 'เบิกสวัสดิการ', dEn: 'Claim a welfare benefit', dTh: 'เบิกค่าสวัสดิการพนักงาน', days: 3 },
  { id: 'claim', cat: 'expense', en: 'Expense Claim', th: 'เบิกค่าใช้จ่าย', dEn: 'Reimburse a work expense', dTh: 'ขอเบิกค่าใช้จ่ายในการทำงาน', days: 5 },
  { id: 'travel', cat: 'expense', en: 'Travel Reimbursement', th: 'เบิกค่าเดินทาง', dEn: 'Claim travel and per diem', dTh: 'เบิกค่าเดินทางและเบี้ยเลี้ยง', days: 5 },
  { id: 'general', cat: 'other', en: 'General Request', th: 'คำขอทั่วไป', dEn: 'Anything not covered above', dTh: 'เรื่องอื่นๆ ที่ไม่มีในรายการ', days: 3 },
];

export const LEAVE_HINT = {
  annual: { en: 'Vacation', th: 'พักผ่อน' },
  sick: { en: 'Illness — cert may be needed', th: 'เจ็บป่วย — อาจต้องมีใบรับรอง' },
  personal: { en: 'Personal business', th: 'ธุระส่วนตัว' },
  maternity: { en: 'Childbirth', th: 'คลอดบุตร' },
  monk: { en: 'Ordination', th: 'บวช' },
};

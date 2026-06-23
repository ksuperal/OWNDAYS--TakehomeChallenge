export const getStatusMeta = (status, t) => {
  const map = {
    submitted: { label: t.st_submitted, color: '#c98a00', bg: '#fff4d6' },
    inprogress: { label: t.st_inprogress, color: '#1f6feb', bg: '#e7f0ff' },
    completed: { label: t.st_completed, color: '#1f8a5b', bg: '#def0e6' },
    cancelled: { label: t.st_cancelled, color: '#8a99ad', bg: '#eef2f7' },
  };
  return map[status] || map.submitted;
};

export const getBadgeStyle = (status, t) => {
  const meta = getStatusMeta(status, t);
  return {
    fontSize: '11.5px',
    fontWeight: 700,
    color: meta.color,
    background: meta.bg,
    padding: '4px 10px',
    borderRadius: '999px',
    whiteSpace: 'nowrap',
    flex: 'none'
  };
};

export const getStatusBadge = (status, lang) => {
  const isTH = lang === 'th';
  const badges = {
    submitted: {
      text: isTH ? 'ส่งแล้ว' : 'Submitted',
      color: '#c98a00',
      bg: '#fff4d6'
    },
    inprogress: {
      text: isTH ? 'กำลังดำเนินการ' : 'In Progress',
      color: '#1f6feb',
      bg: '#e7f0ff'
    },
    completed: {
      text: isTH ? 'เสร็จสิ้น' : 'Completed',
      color: '#1f8a5b',
      bg: '#def0e6'
    },
    cancelled: {
      text: isTH ? 'ยกเลิกแล้ว' : 'Cancelled',
      color: '#8a99ad',
      bg: '#eef2f7'
    }
  };
  return badges[status] || badges.submitted;
};

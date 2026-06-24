import { MOCK_LEADERBOARD, getCurrentMonthName } from '../data/leaderboard';

// Get medal emoji based on rank
const getMedal = (rank) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return null;
};

// Get badge style based on rank
const getBadgeStyle = (rank) => {
  if (rank === 1) return {
    bg: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    glow: '0 4px 20px rgba(255, 215, 0, 0.4)'
  };
  if (rank === 2) return {
    bg: 'linear-gradient(135deg, #C0C0C0 0%, #808080 100%)',
    glow: '0 4px 20px rgba(192, 192, 192, 0.4)'
  };
  if (rank === 3) return {
    bg: 'linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)',
    glow: '0 4px 20px rgba(205, 127, 50, 0.4)'
  };
  return {
    bg: '#f7f9fc',
    glow: 'none'
  };
};

const LeaderboardScreen = ({ lang, user }) => {
  const isTH = lang === 'th';
  const currentMonth = getCurrentMonthName(lang);
  const currentUserId = user?.id || '2'; // Default to Ploy S. for demo

  return (
    <div style={{ padding: '8px 18px 28px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
        borderRadius: '16px',
        padding: '24px 20px',
        marginBottom: '24px',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏆</div>
        <h2 style={{
          fontSize: '22px',
          fontWeight: '700',
          margin: '0 0 6px'
        }}>
          {isTH ? 'กระดานผู้นำ' : 'Leaderboard'}
        </h2>
        <p style={{
          fontSize: '14px',
          margin: 0,
          opacity: 0.95
        }}>
          {isTH
            ? `สถิติการมาทำงานต่อเนื่อง - ${currentMonth}`
            : `Work Streak Champions - ${currentMonth}`}
        </p>
      </div>

      {/* Top 3 Podium */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '12px',
        marginBottom: '24px',
        alignItems: 'end'
      }}>
        {/* 2nd Place */}
        {MOCK_LEADERBOARD[1] && (
          <PodiumCard
            person={MOCK_LEADERBOARD[1]}
            rank={2}
            isTH={isTH}
            height="140px"
          />
        )}

        {/* 1st Place */}
        {MOCK_LEADERBOARD[0] && (
          <PodiumCard
            person={MOCK_LEADERBOARD[0]}
            rank={1}
            isTH={isTH}
            height="180px"
            isFirst
          />
        )}

        {/* 3rd Place */}
        {MOCK_LEADERBOARD[2] && (
          <PodiumCard
            person={MOCK_LEADERBOARD[2]}
            rank={3}
            isTH={isTH}
            height="120px"
          />
        )}
      </div>

      {/* Rest of Rankings */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '2px solid #e8ecf1'
      }}>
        <div style={{
          padding: '16px',
          borderBottom: '2px solid #e8ecf1',
          background: '#f7f9fc'
        }}>
          <h3 style={{
            fontSize: '15px',
            fontWeight: '600',
            color: '#1a2332',
            margin: 0
          }}>
            {isTH ? 'การจัดอันดับทั้งหมด' : 'Full Rankings'}
          </h3>
        </div>

        {MOCK_LEADERBOARD.slice(3).map((person, index) => {
          const rank = index + 4;
          const isCurrentUser = person.id === currentUserId;
          const badgeStyle = getBadgeStyle(rank);

          return (
            <div
              key={person.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 16px',
                borderBottom: index < MOCK_LEADERBOARD.slice(3).length - 1 ? '1px solid #f0f3f7' : 'none',
                background: isCurrentUser ? '#f0f6ff' : 'white',
                borderLeft: isCurrentUser ? '4px solid #1f6feb' : '4px solid transparent'
              }}
            >
              {/* Rank */}
              <div style={{
                width: '32px',
                textAlign: 'center',
                fontSize: '16px',
                fontWeight: '700',
                color: '#5b6b80',
                fontFamily: 'IBM Plex Mono, monospace'
              }}>
                #{rank}
              </div>

              {/* Avatar */}
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: badgeStyle.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                boxShadow: badgeStyle.glow
              }}>
                {person.avatar}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#1a2332',
                  marginBottom: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  {isTH ? person.nameTH : person.nameEN}
                  {isCurrentUser && (
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '600',
                      color: '#1f6feb',
                      background: '#e7f0ff',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {isTH ? 'คุณ' : 'You'}
                    </span>
                  )}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#5b6b80'
                }}>
                  {isTH ? person.department.th : person.department.en}
                </div>
              </div>

              {/* Streak */}
              <div style={{
                textAlign: 'right'
              }}>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#ff6b6b',
                  fontFamily: 'IBM Plex Mono, monospace'
                }}>
                  {person.streakDays}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: '#8a99ad',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '.05em'
                }}>
                  {isTH ? 'วัน' : 'days'}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Banner */}
      <div style={{
        marginTop: '20px',
        background: '#fff7e6',
        border: '2px solid #ffd666',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        gap: '12px'
      }}>
        <div style={{ fontSize: '24px' }}>💡</div>
        <div style={{ flex: 1 }}>
          <p style={{
            fontSize: '13px',
            color: '#7c5c00',
            margin: 0,
            lineHeight: 1.5
          }}>
            {isTH
              ? 'สถิติการมาทำงานต่อเนื่องจะรีเซ็ตในวันที่ 1 ของทุกเดือน พนักงานที่ไม่ลาในเดือนปัจจุบันจะได้รับคะแนนต่อเนื่อง'
              : 'Work streak resets on the 1st of every month. Employees without leave requests in the current month earn consecutive days.'}
          </p>
        </div>
      </div>
    </div>
  );
};

// Podium Card Component for Top 3
const PodiumCard = ({ person, rank, isTH, height, isFirst }) => {
  const badgeStyle = getBadgeStyle(rank);
  const medal = getMedal(rank);

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '12px',
      textAlign: 'center',
      border: isFirst ? '3px solid #FFD700' : '2px solid #e8ecf1',
      boxShadow: isFirst ? '0 8px 24px rgba(255, 215, 0, 0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
      height,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      transform: isFirst ? 'scale(1.05)' : 'scale(1)'
    }}>
      {/* Medal Badge */}
      {medal && (
        <div style={{
          position: 'absolute',
          top: '-12px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '32px',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
        }}>
          {medal}
        </div>
      )}

      <div style={{ marginTop: '8px' }}>
        {/* Avatar */}
        <div style={{
          width: isFirst ? '64px' : '52px',
          height: isFirst ? '64px' : '52px',
          borderRadius: '50%',
          background: badgeStyle.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: isFirst ? '32px' : '28px',
          margin: '0 auto 8px',
          boxShadow: badgeStyle.glow
        }}>
          {person.avatar}
        </div>

        {/* Name */}
        <div style={{
          fontSize: isFirst ? '14px' : '13px',
          fontWeight: '700',
          color: '#1a2332',
          marginBottom: '4px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {isTH ? person.nameTH : person.nameEN}
        </div>

        {/* Department */}
        <div style={{
          fontSize: '11px',
          color: '#5b6b80',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {isTH ? person.department.th : person.department.en}
        </div>
      </div>

      {/* Streak */}
      <div style={{
        background: '#fff7e6',
        borderRadius: '8px',
        padding: '8px'
      }}>
        <div style={{
          fontSize: isFirst ? '24px' : '20px',
          fontWeight: '700',
          color: '#ff6b6b',
          fontFamily: 'IBM Plex Mono, monospace'
        }}>
          {person.streakDays}
        </div>
        <div style={{
          fontSize: '10px',
          color: '#8a99ad',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '.05em'
        }}>
          {isTH ? 'วัน' : 'days'}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardScreen;

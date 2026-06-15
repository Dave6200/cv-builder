function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return parts[0].slice(0, 2).toUpperCase();
}

function TemplateModern({ data }) {
  return (
    <div style={{
      background: '#fff',
      height: '100%',
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* ШАПКА */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        padding: '40px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Декоративные круги */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'rgba(108, 99, 255, 0.15)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-20px',
          right: '80px',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(108, 99, 255, 0.1)',
        }} />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Текст */}
          <div>
            <h1 style={{
              color: '#fff',
              fontSize: '36px',
              fontWeight: '700',
              letterSpacing: '-1px',
            }}>
              {data.name || 'Твоё имя'}
            </h1>
            <h3 style={{
              color: '#6c63ff',
              fontSize: '16px',
              fontWeight: '400',
              marginTop: '6px',
            }}>
              {data.job || 'Должность'}
            </h3>
            <div style={{ display: 'flex', gap: '20px', marginTop: '16px', flexWrap: 'wrap' }}>
              {data.email && <span style={{ color: '#a0a0c0', fontSize: '12px' }}>✉ {data.email}</span>}
              {data.phone && <span style={{ color: '#a0a0c0', fontSize: '12px' }}>📞 {data.phone}</span>}
              {data.location && <span style={{ color: '#a0a0c0', fontSize: '12px' }}>📍 {data.location}</span>}
            </div>
          </div>

          {/* Фото / инициалы */}
          <div style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            border: '3px solid rgba(108, 99, 255, 0.5)',
            background: 'rgba(108, 99, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {data.photo ? (
              <img src={data.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: '28px', fontWeight: '700', color: '#6c63ff', letterSpacing: '-1px' }}>
                {getInitials(data.name)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ТЕЛО */}
      <div style={{ padding: '36px 48px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {data.about && (
          <div>
            <div style={{
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              color: '#6c63ff',
              fontWeight: '700',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <div style={{ width: '20px', height: '2px', background: '#6c63ff' }} />
              О себе
            </div>
            <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{data.about}</p>
          </div>
        )}

        {data.experience && (
          <div>
            <div style={{
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              color: '#6c63ff',
              fontWeight: '700',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <div style={{ width: '20px', height: '2px', background: '#6c63ff' }} />
              Опыт работы
            </div>
            <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{data.experience}</p>
          </div>
        )}

        {data.education && (
          <div>
            <div style={{
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              color: '#6c63ff',
              fontWeight: '700',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <div style={{ width: '20px', height: '2px', background: '#6c63ff' }} />
              Образование
            </div>
            <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{data.education}</p>
          </div>
        )}

        {data.skills && (
          <div>
            <div style={{
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              color: '#6c63ff',
              fontWeight: '700',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <div style={{ width: '20px', height: '2px', background: '#6c63ff' }} />
              Навыки
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {data.skills.split(',').map((skill, i) => (
                <span key={i} style={{
                  background: 'linear-gradient(135deg, #6c63ff, #9c63ff)',
                  color: '#fff',
                  padding: '5px 14px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '500',
                }}>
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TemplateModern;

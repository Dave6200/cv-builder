function getInitials(name) {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return parts[0].slice(0, 2).toUpperCase();
}

function TemplateTech({ data }) {
  const green = '#4ade80';
  const mono = "'Courier New', Courier, monospace";

  return (
    <div style={{ background: '#fff', height: '100%', fontFamily: 'Inter, sans-serif' }}>

      {/* ШАПКА — тёмный терминал */}
      <div style={{
        background: '#0d1117',
        padding: '32px 48px 36px',
        position: 'relative',
      }}>
        {/* Кнопки терминала */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            {/* Строка приглашения */}
            <div style={{ fontFamily: mono, fontSize: '12px', color: '#6e7681', marginBottom: '8px' }}>
              <span style={{ color: green }}>~/resume</span>
              <span style={{ color: '#6e7681' }}> $ </span>
              <span style={{ color: '#c9d1d9' }}>cat profile.json</span>
            </div>

            <h1 style={{
              fontFamily: mono,
              color: green,
              fontSize: '30px',
              fontWeight: '700',
              letterSpacing: '-1px',
              lineHeight: '1',
            }}>
              {data.name ? `"${data.name}"` : '"Твоё имя"'}
            </h1>

            <div style={{ fontFamily: mono, marginTop: '8px' }}>
              <span style={{ color: '#6e7681' }}>// </span>
              <span style={{ color: '#79c0ff', fontSize: '15px' }}>{data.job || 'Должность'}</span>
            </div>

            {/* Контакты как JSON-поля */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '14px', flexWrap: 'wrap' }}>
              {data.email && (
                <span style={{ fontFamily: mono, fontSize: '11px' }}>
                  <span style={{ color: '#ff7b72' }}>email</span>
                  <span style={{ color: '#c9d1d9' }}>: </span>
                  <span style={{ color: '#a5d6ff' }}>"{data.email}"</span>
                </span>
              )}
              {data.phone && (
                <span style={{ fontFamily: mono, fontSize: '11px' }}>
                  <span style={{ color: '#ff7b72' }}>phone</span>
                  <span style={{ color: '#c9d1d9' }}>: </span>
                  <span style={{ color: '#a5d6ff' }}>"{data.phone}"</span>
                </span>
              )}
              {data.location && (
                <span style={{ fontFamily: mono, fontSize: '11px' }}>
                  <span style={{ color: '#ff7b72' }}>location</span>
                  <span style={{ color: '#c9d1d9' }}>: </span>
                  <span style={{ color: '#a5d6ff' }}>"{data.location}"</span>
                </span>
              )}
            </div>
          </div>

          {/* Фото — прямоугольник с зелёной рамкой */}
          <div style={{
            width: '88px',
            height: '88px',
            borderRadius: '8px',
            overflow: 'hidden',
            border: `2px solid ${green}`,
            background: '#161b22',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: `0 0 20px rgba(74, 222, 128, 0.2)`,
          }}>
            {data.photo ? (
              <img src={data.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontFamily: mono, fontSize: '24px', fontWeight: '700', color: green }}>
                {getInitials(data.name)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ТЕЛО */}
      <div style={{ padding: '32px 48px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {data.about && (
          <div>
            <div style={{
              fontFamily: mono,
              fontSize: '11px',
              color: green,
              fontWeight: '700',
              marginBottom: '10px',
            }}>
              <span style={{ color: '#6e7681' }}>/** </span>ABOUT<span style={{ color: '#6e7681' }}> */</span>
            </div>
            <p style={{
              fontSize: '14px',
              color: '#333',
              lineHeight: '1.7',
              whiteSpace: 'pre-wrap',
              borderLeft: `3px solid ${green}`,
              paddingLeft: '16px',
            }}>{data.about}</p>
          </div>
        )}

        {data.experience && (
          <div>
            <div style={{
              fontFamily: mono,
              fontSize: '11px',
              color: green,
              fontWeight: '700',
              marginBottom: '10px',
            }}>
              <span style={{ color: '#6e7681' }}>/** </span>EXPERIENCE<span style={{ color: '#6e7681' }}> */</span>
            </div>
            <p style={{
              fontSize: '14px',
              color: '#333',
              lineHeight: '1.7',
              whiteSpace: 'pre-wrap',
              borderLeft: `3px solid ${green}`,
              paddingLeft: '16px',
            }}>{data.experience}</p>
          </div>
        )}

        {data.education && (
          <div>
            <div style={{
              fontFamily: mono,
              fontSize: '11px',
              color: green,
              fontWeight: '700',
              marginBottom: '10px',
            }}>
              <span style={{ color: '#6e7681' }}>/** </span>EDUCATION<span style={{ color: '#6e7681' }}> */</span>
            </div>
            <p style={{
              fontSize: '14px',
              color: '#333',
              lineHeight: '1.7',
              whiteSpace: 'pre-wrap',
              borderLeft: `3px solid ${green}`,
              paddingLeft: '16px',
            }}>{data.education}</p>
          </div>
        )}

        {data.skills && (
          <div>
            <div style={{
              fontFamily: mono,
              fontSize: '11px',
              color: '#6e7681',
              fontWeight: '700',
              marginBottom: '10px',
            }}>
              <span style={{ color: '#ff7b72' }}>const </span>
              <span style={{ color: '#79c0ff' }}>SKILLS </span>
              <span style={{ color: '#c9d1d9' }}>=</span>
              <span style={{ color: green }}> [</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingLeft: '16px' }}>
              {data.skills.split(',').map((skill, i) => (
                <span key={i} style={{
                  fontFamily: mono,
                  background: '#0d1117',
                  color: green,
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  border: `1px solid rgba(74, 222, 128, 0.25)`,
                }}>
                  "{skill.trim()}"
                </span>
              ))}
            </div>
            <div style={{ fontFamily: mono, fontSize: '11px', color: green, marginTop: '8px', paddingLeft: '16px' }}>]</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TemplateTech;

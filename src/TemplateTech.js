function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getInitials(name) {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return parts[0].slice(0, 2).toUpperCase();
}

function TemplateTech({ data }) {
  const accent = data.accentColor || '#4ade80';
  const mono = "'Courier New', Courier, monospace";

  return (
    <div style={{ background: '#fff', height: '100%', fontFamily: 'Inter, sans-serif' }}>

      {/* HEADER — dark terminal */}
      <div style={{ background: '#0d1117', padding: '32px 48px 36px' }}>
        {/* Terminal buttons */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: '12px', color: '#6e7681', marginBottom: '8px' }}>
              <span style={{ color: accent }}>{'~/resume'}</span>
              <span style={{ color: '#6e7681' }}>{' $ '}</span>
              <span style={{ color: '#c9d1d9' }}>{'cat profile.json'}</span>
            </div>

            <h1 style={{
              fontFamily: mono, color: accent, fontSize: '30px',
              fontWeight: '700', letterSpacing: '-1px', lineHeight: '1',
            }}>
              {data.name ? `"${data.name}"` : '"Your Name"'}
            </h1>

            <div style={{ fontFamily: mono, marginTop: '8px' }}>
              <span style={{ color: '#6e7681' }}>{'// '}</span>
              <span style={{ color: '#79c0ff', fontSize: '15px' }}>{data.job || 'Job Title'}</span>
            </div>

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

          {/* Photo */}
          <div style={{
            width: '88px', height: '88px', borderRadius: '8px', overflow: 'hidden',
            border: `2px solid ${accent}`,
            background: '#161b22',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            boxShadow: `0 0 20px ${hexToRgba(accent, 0.2)}`,
          }}>
            {data.photo ? (
              <img src={data.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontFamily: mono, fontSize: '24px', fontWeight: '700', color: accent }}>
                {getInitials(data.name)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ padding: '32px 48px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {data.about && (
          <div>
            <div style={{ fontFamily: mono, fontSize: '11px', color: accent, fontWeight: '700', marginBottom: '10px' }}>
              <span style={{ color: '#6e7681' }}>{'/** '}</span>ABOUT<span style={{ color: '#6e7681' }}>{' */'}</span>
            </div>
            <p style={{
              fontSize: '14px', color: '#333', lineHeight: '1.7', whiteSpace: 'pre-wrap',
              borderLeft: `3px solid ${accent}`, paddingLeft: '16px',
            }}>{data.about}</p>
          </div>
        )}

        {data.experience && (
          <div>
            <div style={{ fontFamily: mono, fontSize: '11px', color: accent, fontWeight: '700', marginBottom: '10px' }}>
              <span style={{ color: '#6e7681' }}>{'/** '}</span>EXPERIENCE<span style={{ color: '#6e7681' }}>{' */'}</span>
            </div>
            <p style={{
              fontSize: '14px', color: '#333', lineHeight: '1.7', whiteSpace: 'pre-wrap',
              borderLeft: `3px solid ${accent}`, paddingLeft: '16px',
            }}>{data.experience}</p>
          </div>
        )}

        {data.education && (
          <div>
            <div style={{ fontFamily: mono, fontSize: '11px', color: accent, fontWeight: '700', marginBottom: '10px' }}>
              <span style={{ color: '#6e7681' }}>{'/** '}</span>EDUCATION<span style={{ color: '#6e7681' }}>{' */'}</span>
            </div>
            <p style={{
              fontSize: '14px', color: '#333', lineHeight: '1.7', whiteSpace: 'pre-wrap',
              borderLeft: `3px solid ${accent}`, paddingLeft: '16px',
            }}>{data.education}</p>
          </div>
        )}

        {data.skills && (
          <div>
            <div style={{ fontFamily: mono, fontSize: '11px', color: '#6e7681', fontWeight: '700', marginBottom: '10px' }}>
              <span style={{ color: '#ff7b72' }}>const </span>
              <span style={{ color: '#79c0ff' }}>SKILLS </span>
              <span style={{ color: '#c9d1d9' }}>=</span>
              <span style={{ color: accent }}>{' ['}</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingLeft: '16px' }}>
              {data.skills.split(',').map((skill, i) => (
                <span key={i} style={{
                  fontFamily: mono,
                  background: '#0d1117',
                  color: accent,
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  border: `1px solid ${hexToRgba(accent, 0.25)}`,
                }}>
                  "{skill.trim()}"
                </span>
              ))}
            </div>
            <div style={{ fontFamily: mono, fontSize: '11px', color: accent, marginTop: '8px', paddingLeft: '16px' }}>]</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TemplateTech;

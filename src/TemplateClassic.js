function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return parts[0].slice(0, 2).toUpperCase();
}

function TemplateClassic({ data }) {
  const accent = data.accentColor || '#3498db';

  return (
    <div style={{ background: '#fff', height: '100%', fontFamily: 'Inter, sans-serif', display: 'flex' }}>
      {/* LEFT COLUMN */}
      <div style={{
        width: '35%',
        background: '#2c3e50',
        padding: '40px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
      }}>
        {/* Photo / initials */}
        <div style={{
          width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden',
          margin: '0 auto',
          border: `3px solid ${hexToRgba(accent, 0.4)}`,
          background: accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 4px 20px ${hexToRgba(accent, 0.3)}`,
          flexShrink: 0,
        }}>
          {data.photo ? (
            <img src={data.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: '28px', fontWeight: '700', color: '#fff', letterSpacing: '-1px' }}>
              {getInitials(data.name)}
            </span>
          )}
        </div>

        {/* Contacts */}
        <div>
          <h4 style={{
            color: accent, fontSize: '10px', textTransform: 'uppercase',
            letterSpacing: '2px', marginBottom: '12px', fontWeight: '700',
          }}>Contacts</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.email && (
              <div style={{ color: '#bdc3c7', fontSize: '12px', wordBreak: 'break-all' }}>
                <div style={{ color: '#7f8c8d', fontSize: '10px', marginBottom: '2px' }}>Email</div>
                {data.email}
              </div>
            )}
            {data.phone && (
              <div style={{ color: '#bdc3c7', fontSize: '12px' }}>
                <div style={{ color: '#7f8c8d', fontSize: '10px', marginBottom: '2px' }}>Phone</div>
                {data.phone}
              </div>
            )}
            {data.location && (
              <div style={{ color: '#bdc3c7', fontSize: '12px' }}>
                <div style={{ color: '#7f8c8d', fontSize: '10px', marginBottom: '2px' }}>City</div>
                {data.location}
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills && (
          <div>
            <h4 style={{
              color: accent, fontSize: '10px', textTransform: 'uppercase',
              letterSpacing: '2px', marginBottom: '12px', fontWeight: '700',
            }}>Skills</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {data.skills.split(',').map((skill, i) => (
                <div key={i}>
                  <div style={{ color: '#ecf0f1', fontSize: '12px', marginBottom: '4px' }}>{skill.trim()}</div>
                  <div style={{ height: '3px', background: '#1a2a3a', borderRadius: '2px' }}>
                    <div style={{
                      height: '100%',
                      width: `${70 + (i % 3) * 10}%`,
                      background: accent,
                      borderRadius: '2px',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN */}
      <div style={{ width: '65%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '40px 36px 28px', borderBottom: '2px solid #f0f0f0' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#2c3e50', letterSpacing: '-0.5px' }}>
            {data.name || 'Your Name'}
          </h1>
          <h3 style={{
            fontSize: '14px', fontWeight: '500', color: accent,
            marginTop: '6px', textTransform: 'uppercase', letterSpacing: '1px',
          }}>
            {data.job || 'Job Title'}
          </h3>
        </div>

        <div style={{ padding: '28px 36px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {data.about && (
            <div>
              <h4 style={{
                fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px',
                color: accent, marginBottom: '8px', fontWeight: '700',
              }}>About</h4>
              <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{data.about}</p>
            </div>
          )}

          {data.experience && (
            <div>
              <h4 style={{
                fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px',
                color: accent, marginBottom: '8px', fontWeight: '700',
              }}>Experience</h4>
              <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{data.experience}</p>
            </div>
          )}

          {data.education && (
            <div>
              <h4 style={{
                fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px',
                color: accent, marginBottom: '8px', fontWeight: '700',
              }}>Education</h4>
              <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{data.education}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TemplateClassic;

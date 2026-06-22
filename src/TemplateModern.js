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

function TemplateModern({ data }) {
  const accent = data.accentColor || '#6c63ff';

  const sectionHeader = (label) => (
    <div style={{
      fontSize: '10px', textTransform: 'uppercase', letterSpacing: '3px',
      color: accent, fontWeight: '700', marginBottom: '10px',
      display: 'flex', alignItems: 'center', gap: '8px',
    }}>
      <div style={{ width: '20px', height: '2px', background: accent }} />
      {label}
    </div>
  );

  return (
    <div style={{ background: '#fff', height: '100%', fontFamily: 'Inter, sans-serif' }}>
      {/* HEADER */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        padding: '40px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: '180px', height: '180px', borderRadius: '50%',
          background: hexToRgba(accent, 0.15),
        }} />
        <div style={{
          position: 'absolute', bottom: '-20px', right: '80px',
          width: '80px', height: '80px', borderRadius: '50%',
          background: hexToRgba(accent, 0.1),
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div>
            <h1 style={{ color: '#fff', fontSize: '36px', fontWeight: '700', letterSpacing: '-1px' }}>
              {data.name || 'Your Name'}
            </h1>
            <h3 style={{ color: accent, fontSize: '16px', fontWeight: '400', marginTop: '6px' }}>
              {data.job || 'Job Title'}
            </h3>
            <div style={{ display: 'flex', gap: '20px', marginTop: '16px', flexWrap: 'wrap' }}>
              {data.email && <span style={{ color: '#a0a0c0', fontSize: '12px' }}>✉ {data.email}</span>}
              {data.phone && <span style={{ color: '#a0a0c0', fontSize: '12px' }}>📞 {data.phone}</span>}
              {data.location && <span style={{ color: '#a0a0c0', fontSize: '12px' }}>📍 {data.location}</span>}
            </div>
          </div>

          <div style={{
            width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
            border: `3px solid ${hexToRgba(accent, 0.5)}`,
            background: hexToRgba(accent, 0.15),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {data.photo ? (
              <img src={data.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: '28px', fontWeight: '700', color: accent, letterSpacing: '-1px' }}>
                {getInitials(data.name)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ padding: '36px 48px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {data.about && (
          <div>
            {sectionHeader('About')}
            <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{data.about}</p>
          </div>
        )}

        {data.experience && (
          <div>
            {sectionHeader('Experience')}
            <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{data.experience}</p>
          </div>
        )}

        {data.education && (
          <div>
            {sectionHeader('Education')}
            <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{data.education}</p>
          </div>
        )}

        {data.skills && (
          <div>
            {sectionHeader('Skills')}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {data.skills.split(',').map((skill, i) => (
                <span key={i} style={{
                  background: accent,
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

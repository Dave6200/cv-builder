function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return parts[0].slice(0, 2).toUpperCase();
}

function TemplateMinimal({ data }) {
  const accent = data.accentColor || '#6c63ff';

  const labelStyle = {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    color: accent,
    marginBottom: '10px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: '600',
  };

  return (
    <div style={{ background: '#fff', height: '100%', fontFamily: 'Georgia, serif', padding: '56px 64px' }}>
      {/* HEADER */}
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '42px', fontWeight: '400', color: '#111', letterSpacing: '-1.5px', lineHeight: '1' }}>
            {data.name || 'Your Name'}
          </h1>
          <h3 style={{
            fontSize: '15px', fontWeight: '400', color: '#888', marginTop: '8px',
            letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif',
          }}>
            {data.job || 'Job Title'}
          </h3>
          <div style={{
            display: 'flex', gap: '24px', marginTop: '16px', flexWrap: 'wrap',
            borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '12px 0',
          }}>
            {data.email && <span style={{ color: '#555', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}>{data.email}</span>}
            {data.phone && <span style={{ color: '#555', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}>{data.phone}</span>}
            {data.location && <span style={{ color: '#555', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}>{data.location}</span>}
          </div>
        </div>

        <div style={{
          width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden',
          flexShrink: 0, marginLeft: '28px',
          border: `1px solid ${accent}40`,
          background: '#f5f5f5',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {data.photo ? (
            <img src={data.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: '22px', fontWeight: '600', color: accent, fontFamily: 'Inter, sans-serif', letterSpacing: '-1px' }}>
              {getInitials(data.name)}
            </span>
          )}
        </div>
      </div>

      {/* BODY */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {data.about && (
          <div>
            <h4 style={labelStyle}>About</h4>
            <p style={{ fontSize: '15px', color: '#333', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>{data.about}</p>
          </div>
        )}

        {data.experience && (
          <div>
            <h4 style={labelStyle}>Experience</h4>
            <p style={{ fontSize: '15px', color: '#333', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>{data.experience}</p>
          </div>
        )}

        {data.education && (
          <div>
            <h4 style={labelStyle}>Education</h4>
            <p style={{ fontSize: '15px', color: '#333', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>{data.education}</p>
          </div>
        )}

        {data.skills && (
          <div>
            <h4 style={labelStyle}>Skills</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {data.skills.split(',').map((skill, i) => (
                <span key={i} style={{
                  border: `1px solid ${accent}`,
                  color: accent,
                  padding: '4px 14px',
                  borderRadius: '2px',
                  fontSize: '12px',
                  fontFamily: 'Inter, sans-serif',
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

export default TemplateMinimal;

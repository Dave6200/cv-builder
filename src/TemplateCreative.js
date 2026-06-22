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

function TemplateCreative({ data }) {
  const accent = data.accentColor || '#ff6b4a';

  const sectionHeading = (label) => (
    <div style={{
      fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2.5px',
      color: accent, fontWeight: '800', marginBottom: '10px',
      display: 'flex', alignItems: 'center', gap: '10px',
    }}>
      {label}
      <div style={{ flex: 1, height: '2px', background: `linear-gradient(90deg, ${accent}, transparent)` }} />
    </div>
  );

  return (
    <div style={{ background: '#fff', height: '100%', fontFamily: 'Inter, sans-serif', display: 'flex' }}>

      {/* LEFT COLUMN */}
      <div style={{
        width: '38%',
        background: accent,
        padding: '48px 28px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }} />
        <div style={{
          position: 'absolute', top: '42%', right: '-30px',
          width: '120px', height: '120px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
        }} />

        {/* Photo */}
        <div style={{
          width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden',
          border: '4px solid rgba(255,255,255,0.4)',
          background: hexToRgba(accent, 0.7),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '24px', flexShrink: 0, position: 'relative', zIndex: 1,
        }}>
          {data.photo ? (
            <img src={data.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: '32px', fontWeight: '800', color: '#fff', letterSpacing: '-2px' }}>
              {getInitials(data.name)}
            </span>
          )}
        </div>

        <h1 style={{
          color: '#fff', fontSize: '26px', fontWeight: '800',
          lineHeight: '1.15', letterSpacing: '-0.5px', marginBottom: '8px',
          position: 'relative', zIndex: 1,
        }}>
          {data.name || 'Your Name'}
        </h1>

        <div style={{ width: '40px', height: '3px', background: 'rgba(255,255,255,0.5)', borderRadius: '2px', marginBottom: '8px' }} />

        <h3 style={{
          color: 'rgba(255,255,255,0.85)', fontSize: '12px', fontWeight: '500',
          textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '32px',
          position: 'relative', zIndex: 1,
        }}>
          {data.job || 'Job Title'}
        </h3>

        {/* Contacts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px', position: 'relative', zIndex: 1 }}>
          {data.email && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', marginTop: '1px' }}>✉</span>
              <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '12px', wordBreak: 'break-all' }}>{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}>📞</span>
              <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '12px' }}>{data.phone}</span>
            </div>
          )}
          {data.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}>📍</span>
              <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '12px' }}>{data.location}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {data.skills && (
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h4 style={{
              color: 'rgba(255,255,255,0.6)', fontSize: '10px', textTransform: 'uppercase',
              letterSpacing: '2px', fontWeight: '700', marginBottom: '12px',
            }}>Skills</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {data.skills.split(',').map((skill, i) => (
                <span key={i} style={{
                  background: 'rgba(255,255,255,0.18)', color: '#fff',
                  padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: '500',
                }}>
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN */}
      <div style={{ width: '62%', padding: '48px 36px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {data.about && (
          <div>
            {sectionHeading('About')}
            <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{data.about}</p>
          </div>
        )}

        {data.experience && (
          <div>
            {sectionHeading('Experience')}
            <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{data.experience}</p>
          </div>
        )}

        {data.education && (
          <div>
            {sectionHeading('Education')}
            <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{data.education}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TemplateCreative;

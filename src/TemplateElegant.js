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

function TemplateElegant({ data }) {
  const accent = data.accentColor || '#c9a84c';

  const contacts = [data.email, data.phone, data.location].filter(Boolean);

  const sectionLabel = (text) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
      <div style={{ flex: 1, height: '1px', background: hexToRgba(accent, 0.3) }} />
      <span style={{
        fontSize: '9px', textTransform: 'uppercase', letterSpacing: '4px',
        color: accent, fontFamily: 'Inter, sans-serif', fontWeight: '600',
      }}>{text}</span>
      <div style={{ flex: 1, height: '1px', background: hexToRgba(accent, 0.3) }} />
    </div>
  );

  return (
    <div style={{ background: '#FAFAF8', height: '100%', fontFamily: 'Georgia, serif' }}>

      {/* ШАПКА */}
      <div style={{ padding: '48px 64px 32px', textAlign: 'center', borderBottom: `1px solid ${accent}` }}>
        {/* Фото */}
        <div style={{
          width: '88px', height: '88px', borderRadius: '50%', overflow: 'hidden',
          border: `2px solid ${accent}`,
          background: hexToRgba(accent, 0.1),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}>
          {data.photo ? (
            <img src={data.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: '26px', fontWeight: '400', color: accent, fontFamily: 'Georgia, serif' }}>
              {getInitials(data.name)}
            </span>
          )}
        </div>

        {/* Декоративные линии */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '14px' }}>
          <div style={{ width: '56px', height: '1px', background: accent }} />
          <span style={{ color: accent, fontSize: '8px', letterSpacing: '2px' }}>✦</span>
          <div style={{ width: '56px', height: '1px', background: accent }} />
        </div>

        <h1 style={{
          fontSize: '36px', fontWeight: '400', color: '#1a1a1a',
          letterSpacing: '6px', textTransform: 'uppercase', lineHeight: '1', marginBottom: '10px',
        }}>
          {data.name || 'Твоё имя'}
        </h1>

        <h3 style={{
          fontSize: '11px', fontWeight: '400', color: accent,
          letterSpacing: '3px', textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif', marginBottom: '20px',
        }}>
          {data.job || 'Должность'}
        </h3>

        {contacts.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            {contacts.map((item, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
                {i > 0 && <span style={{ color: accent, margin: '0 10px', fontSize: '8px' }}>✦</span>}
                <span style={{ color: '#666', fontSize: '11px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.5px' }}>
                  {item}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ТЕЛО */}
      <div style={{ padding: '32px 64px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {data.about && (
          <div>
            {sectionLabel('О себе')}
            <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.9', textAlign: 'center', whiteSpace: 'pre-wrap' }}>{data.about}</p>
          </div>
        )}

        {data.experience && (
          <div>
            {sectionLabel('Опыт работы')}
            <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.9', whiteSpace: 'pre-wrap' }}>{data.experience}</p>
          </div>
        )}

        {data.education && (
          <div>
            {sectionLabel('Образование')}
            <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.9', whiteSpace: 'pre-wrap' }}>{data.education}</p>
          </div>
        )}

        {data.skills && (
          <div>
            {sectionLabel('Навыки')}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {data.skills.split(',').map((skill, i) => (
                <span key={i} style={{
                  border: `1px solid ${accent}`,
                  color: '#555',
                  padding: '5px 18px',
                  fontSize: '12px',
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '1px',
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

export default TemplateElegant;

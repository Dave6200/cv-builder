function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getInitials(name) {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return parts[0].slice(0, 2).toUpperCase();
}

export default function TemplatePremium({ data }) {
  const accent = data.accentColor || '#6c63ff';

  const skills = data.skills
    ? data.skills.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  const eduLines = data.education
    ? data.education.split('\n').filter(l => l.trim())
    : [];

  const contacts = [data.email, data.phone, data.location].filter(Boolean);

  // Support "Job Title at Company | 2020–2023" for date on the right
  const expEntries = data.experience
    ? data.experience.split('\n').filter(l => l.trim()).map(line => {
        const idx = line.lastIndexOf(' | ');
        return idx !== -1
          ? { body: line.slice(0, idx).trim(), date: line.slice(idx + 3).trim() }
          : { body: line.trim(), date: null };
      })
    : [];

  const SectionHeader = ({ label }) => (
    <h2 style={{
      margin: '0 0 16px',
      fontSize: '13px',
      fontWeight: '700',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: '#1a1a2e',
      paddingBottom: '8px',
      borderBottom: `2px solid ${accent}`,
      display: 'inline-block',
      fontFamily: 'Inter, sans-serif',
    }}>
      {label}
    </h2>
  );

  return (
    <div style={{
      background: '#ffffff',
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      minHeight: '297mm',
      height: '100%',
      position: 'relative',
    }}>

      {/* ── Gradient edge bar ── */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '8px',
        height: '100%',
        background: 'linear-gradient(180deg, #1a1a2e 0%, #2a2a4a 100%)',
        zIndex: 1,
      }} />

      {/* ── LEFT SIDEBAR ── */}
      <aside style={{
        width: '30%',
        flexShrink: 0,
        padding: '48px 30px 48px 38px',
        display: 'flex',
        flexDirection: 'column',
        gap: '34px',
      }}>

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <SectionHeader label="Skills" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.map((skill, i) => (
                <span key={i} style={{
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#2d2d44',
                  background: hexToRgba(accent, 0.07),
                  border: `1px solid ${hexToRgba(accent, 0.2)}`,
                  padding: '6px 12px',
                  borderRadius: '999px',
                  lineHeight: '1',
                  fontFamily: 'Inter, sans-serif',
                  whiteSpace: 'nowrap',
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education — every 3 lines = degree / school / year */}
        {eduLines.length > 0 && (
          <section>
            <SectionHeader label="Education" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {(() => {
                const groups = [];
                for (let i = 0; i < eduLines.length; i += 3) {
                  groups.push(eduLines.slice(i, i + 3));
                }
                return groups.map((group, gi) => (
                  <div key={gi}>
                    {group[0] && (
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#1a1a2e',
                        lineHeight: '1.35',
                        fontFamily: 'Inter, sans-serif',
                      }}>
                        {group[0]}
                      </div>
                    )}
                    {group[1] && (
                      <div style={{
                        fontSize: '12.5px',
                        fontWeight: '500',
                        color: accent,
                        marginTop: '3px',
                        fontFamily: 'Inter, sans-serif',
                      }}>
                        {group[1]}
                      </div>
                    )}
                    {group[2] && (
                      <div style={{
                        fontSize: '11.5px',
                        color: '#8a8a9a',
                        marginTop: '4px',
                        fontFamily: 'Inter, sans-serif',
                      }}>
                        {group[2]}
                      </div>
                    )}
                  </div>
                ));
              })()}
            </div>
          </section>
        )}

        {/* Contact */}
        {contacts.length > 0 && (
          <section>
            <SectionHeader label="Contact" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.email && (
                <div>
                  <div style={{ fontSize: '9px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '2px', fontFamily: 'Inter, sans-serif' }}>Email</div>
                  <div style={{ fontSize: '11.5px', color: '#48485a', wordBreak: 'break-all', lineHeight: '1.4', fontFamily: 'Inter, sans-serif' }}>{data.email}</div>
                </div>
              )}
              {data.phone && (
                <div>
                  <div style={{ fontSize: '9px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '2px', fontFamily: 'Inter, sans-serif' }}>Phone</div>
                  <div style={{ fontSize: '11.5px', color: '#48485a', fontFamily: 'Inter, sans-serif' }}>{data.phone}</div>
                </div>
              )}
              {data.location && (
                <div>
                  <div style={{ fontSize: '9px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '2px', fontFamily: 'Inter, sans-serif' }}>Location</div>
                  <div style={{ fontSize: '11.5px', color: '#48485a', fontFamily: 'Inter, sans-serif' }}>{data.location}</div>
                </div>
              )}
            </div>
          </section>
        )}
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main style={{
        width: '70%',
        padding: '48px 46px 48px 30px',
      }}>

        {/* Header: name + title + contacts + photo */}
        <header style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '20px',
          paddingBottom: '26px',
          borderBottom: '1px solid #ecebf2',
        }}>
          <div style={{ flex: 1 }}>
            {data.name && (
              <h1 style={{
                margin: 0,
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '44px',
                fontWeight: '800',
                color: '#1a1a2e',
                lineHeight: '1.02',
                letterSpacing: '-0.01em',
              }}>
                {data.name}
              </h1>
            )}

            {data.job && (
              <div style={{
                marginTop: '8px',
                fontSize: '15px',
                fontWeight: '600',
                color: accent,
                letterSpacing: '0.01em',
                fontFamily: 'Inter, sans-serif',
              }}>
                {data.job}
              </div>
            )}

            {contacts.length > 0 && (
              <div style={{
                marginTop: '14px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: '#6a6a7a',
                fontFamily: 'Inter, sans-serif',
              }}>
                {contacts.map((c, i) => (
                  <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {i > 0 && <span style={{ color: '#d5d3e2' }}>·</span>}
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Photo circle */}
          <div style={{
            width: '96px',
            height: '96px',
            borderRadius: '999px',
            flexShrink: 0,
            border: '3px solid #ffffff',
            boxShadow: `0 0 0 2px ${accent}, 0 6px 16px ${hexToRgba(accent, 0.25)}`,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: data.photo
              ? 'transparent'
              : `repeating-linear-gradient(135deg, ${hexToRgba(accent, 0.07)}, ${hexToRgba(accent, 0.07)} 7px, ${hexToRgba(accent, 0.14)} 7px, ${hexToRgba(accent, 0.14)} 14px)`,
          }}>
            {data.photo ? (
              <img src={data.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '26px',
                fontWeight: '700',
                color: accent,
              }}>
                {getInitials(data.name)}
              </span>
            )}
          </div>
        </header>

        {/* About Me */}
        {data.about && (
          <section style={{ marginTop: '28px' }}>
            <SectionHeader label="About Me" />
            <p style={{
              margin: 0,
              fontSize: '13.5px',
              lineHeight: '1.75',
              color: '#48485a',
              whiteSpace: 'pre-wrap',
              fontFamily: 'Inter, sans-serif',
            }}>
              {data.about}
            </p>
          </section>
        )}

        {/* Work Experience — purple dot timeline */}
        {expEntries.length > 0 && (
          <section style={{ marginTop: '30px' }}>
            <SectionHeader label="Work Experience" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
              {expEntries.map((entry, i) => {
                const isLast = i === expEntries.length - 1;
                return (
                  <div key={i} style={{ position: 'relative', paddingLeft: '22px' }}>

                    {/* Purple dot */}
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: '5px',
                      width: '9px',
                      height: '9px',
                      borderRadius: '999px',
                      background: accent,
                      boxShadow: `0 0 0 3px ${hexToRgba(accent, 0.15)}`,
                    }} />

                    {/* Vertical connector line */}
                    {!isLast && (
                      <div style={{
                        position: 'absolute',
                        left: '4px',
                        top: '18px',
                        bottom: '-26px',
                        width: '1.5px',
                        background: '#ecebf2',
                      }} />
                    )}

                    {/* Row: text + date badge */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '12px',
                    }}>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#1a1a2e',
                        lineHeight: '1.4',
                        fontFamily: 'Inter, sans-serif',
                      }}>
                        {entry.body}
                      </div>
                      {entry.date && (
                        <div style={{
                          fontSize: '11px',
                          fontWeight: '600',
                          color: accent,
                          whiteSpace: 'nowrap',
                          background: hexToRgba(accent, 0.08),
                          padding: '3px 10px',
                          borderRadius: '999px',
                          flexShrink: 0,
                          fontFamily: 'Inter, sans-serif',
                          marginTop: '2px',
                        }}>
                          {entry.date}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

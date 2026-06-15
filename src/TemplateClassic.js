function TemplateClassic({ data }) {
    return (
      <div style={{
        background: '#fff',
        height: '100%',
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
      }}>
        {/* ЛЕВАЯ КОЛОНКА */}
        <div style={{
          width: '35%',
          background: '#2c3e50',
          padding: '40px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
        }}>
          {/* Аватар-заглушка */}
          <div style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3498db, #2980b9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            color: '#fff',
            fontWeight: '700',
            margin: '0 auto',
            boxShadow: '0 4px 20px rgba(52,152,219,0.3)',
          }}>
            {data.name ? data.name[0].toUpperCase() : 'A'}
          </div>
  
          {/* Контакты */}
          <div>
            <h4 style={{
              color: '#3498db',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '12px',
              fontWeight: '700',
            }}>Контакты</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {data.email && (
                <div style={{ color: '#bdc3c7', fontSize: '12px', wordBreak: 'break-all' }}>
                  <div style={{ color: '#7f8c8d', fontSize: '10px', marginBottom: '2px' }}>Email</div>
                  {data.email}
                </div>
              )}
              {data.phone && (
                <div style={{ color: '#bdc3c7', fontSize: '12px' }}>
                  <div style={{ color: '#7f8c8d', fontSize: '10px', marginBottom: '2px' }}>Телефон</div>
                  {data.phone}
                </div>
              )}
              {data.location && (
                <div style={{ color: '#bdc3c7', fontSize: '12px' }}>
                  <div style={{ color: '#7f8c8d', fontSize: '10px', marginBottom: '2px' }}>Город</div>
                  {data.location}
                </div>
              )}
            </div>
          </div>
  
          {/* Навыки */}
          {data.skills && (
            <div>
              <h4 style={{
                color: '#3498db',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '12px',
                fontWeight: '700',
              }}>Навыки</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.skills.split(',').map((skill, i) => (
                  <div key={i}>
                    <div style={{ color: '#ecf0f1', fontSize: '12px', marginBottom: '4px' }}>{skill.trim()}</div>
                    <div style={{ height: '3px', background: '#1a2a3a', borderRadius: '2px' }}>
                      <div style={{
                        height: '100%',
                        width: `${70 + (i % 3) * 10}%`,
                        background: 'linear-gradient(90deg, #3498db, #2980b9)',
                        borderRadius: '2px',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
  
        {/* ПРАВАЯ КОЛОНКА */}
        <div style={{ width: '65%', display: 'flex', flexDirection: 'column' }}>
          {/* Шапка */}
          <div style={{
            padding: '40px 36px 28px',
            borderBottom: '2px solid #f0f0f0',
          }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#2c3e50',
              letterSpacing: '-0.5px',
            }}>
              {data.name || 'Твоё имя'}
            </h1>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#3498db',
              marginTop: '6px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
              {data.job || 'Должность'}
            </h3>
          </div>
  
          {/* Тело */}
          <div style={{ padding: '28px 36px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {data.about && (
              <div>
                <h4 style={{
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  color: '#3498db',
                  marginBottom: '8px',
                  fontWeight: '700',
                }}>О себе</h4>
                <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{data.about}</p>
              </div>
            )}
  
            {data.experience && (
              <div>
                <h4 style={{
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  color: '#3498db',
                  marginBottom: '8px',
                  fontWeight: '700',
                }}>Опыт работы</h4>
                <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{data.experience}</p>
              </div>
            )}
  
            {data.education && (
              <div>
                <h4 style={{
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  color: '#3498db',
                  marginBottom: '8px',
                  fontWeight: '700',
                }}>Образование</h4>
                <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{data.education}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  export default TemplateClassic;
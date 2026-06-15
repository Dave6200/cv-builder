import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f13',
      fontFamily: 'Inter, sans-serif',
      overflow: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-12px); }
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(108,99,255,0.4); }
          50%      { box-shadow: 0 0 0 12px rgba(108,99,255,0); }
        }
        @keyframes orb1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(30px,-20px) scale(1.1); }
          66%      { transform: translate(-20px,15px) scale(0.9); }
        }
        @keyframes orb2 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(-25px,20px) scale(0.95); }
          66%      { transform: translate(20px,-15px) scale(1.05); }
        }

        .hero-btn {
          padding: 16px 40px;
          background: linear-gradient(135deg, #6c63ff, #9c63ff);
          color: #fff;
          border: none;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.3px;
          transition: all 0.3s ease;
          animation: pulse 2s infinite;
        }
        .hero-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 16px 40px rgba(108,99,255,0.5);
        }

        .feature-card {
          background: #16161f;
          border: 1px solid #1e1e2e;
          border-radius: 16px;
          padding: 28px;
          transition: all 0.3s ease;
          animation: fadeUp 0.6s ease both;
        }
        .feature-card:hover {
          border-color: rgba(108,99,255,0.4);
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(108,99,255,0.1);
        }

        .template-preview {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #1e1e2e;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .template-preview:hover {
          border-color: rgba(108,99,255,0.5);
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 20px 50px rgba(108,99,255,0.2);
        }
      `}</style>

      {/* Фоновые орбы */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0,
      }}>
        <div style={{
          position: 'absolute', top: '10%', left: '15%',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(108,99,255,0.12), transparent 70%)',
          animation: 'orb1 8s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '15%', right: '10%',
          width: '350px', height: '350px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(156,99,255,0.1), transparent 70%)',
          animation: 'orb2 10s ease-in-out infinite',
        }} />
      </div>

      {/* НАВБАР */}
      <nav style={{
        position: 'relative', zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 60px',
        borderBottom: '1px solid #1e1e2e',
      }}>
        <div style={{
          fontSize: '20px', fontWeight: '700', color: '#fff',
          fontFamily: '"Playfair Display", serif',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #6c63ff, #9c63ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', fontWeight: '800', color: '#fff',
          }}>D</div>
          CV Builder
        </div>
        <button
          onClick={() => navigate('/builder')}
          style={{
            padding: '10px 24px',
            background: 'transparent',
            color: '#a78bfa',
            border: '1px solid rgba(108,99,255,0.4)',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.target.style.background = 'rgba(108,99,255,0.1)';
            e.target.style.borderColor = '#6c63ff';
          }}
          onMouseLeave={e => {
            e.target.style.background = 'transparent';
            e.target.style.borderColor = 'rgba(108,99,255,0.4)';
          }}
        >
          Открыть редактор →
        </button>
      </nav>

      {/* HERO */}
      <section style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', padding: '100px 40px 80px',
      }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(108,99,255,0.1)',
          border: '1px solid rgba(108,99,255,0.3)',
          borderRadius: '20px',
          padding: '6px 16px',
          color: '#a78bfa',
          fontSize: '12px',
          fontWeight: '500',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          marginBottom: '24px',
          animation: 'fadeUp 0.5s ease both',
        }}>
          ✦ Бесплатно — без регистрации
        </div>

        <h1 style={{
          fontSize: '72px',
          fontWeight: '800',
          color: '#fff',
          lineHeight: '1.05',
          letterSpacing: '-2px',
          maxWidth: '800px',
          marginBottom: '24px',
          animation: 'fadeUp 0.6s ease 0.1s both',
          fontFamily: '"Playfair Display", serif',
        }}>
          Резюме которое{' '}
          <span style={{
            background: 'linear-gradient(135deg, #a78bfa, #6c63ff, #9c63ff)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'gradientShift 3s ease infinite',
          }}>
            замечают
          </span>
        </h1>

        <p style={{
          fontSize: '18px',
          color: '#6b6b8a',
          maxWidth: '500px',
          lineHeight: '1.7',
          marginBottom: '40px',
          animation: 'fadeUp 0.6s ease 0.2s both',
          fontWeight: '400',
        }}>
          Создай профессиональное резюме за 5 минут.
          Выбери шаблон, заполни данные — скачай PDF.
        </p>

        <div style={{
          display: 'flex', gap: '16px', alignItems: 'center',
          animation: 'fadeUp 0.6s ease 0.3s both',
        }}>
          <button className="hero-btn" onClick={() => navigate('/builder')}>
            Создать резюме бесплатно →
          </button>
          <span style={{ color: '#3a3a5a', fontSize: '13px' }}>
            Уже 1,200+ резюме создано
          </span>
        </div>

        {/* Превью карточки */}
        <div style={{
          marginTop: '80px',
          width: '100%', maxWidth: '700px',
          background: '#16161f',
          border: '1px solid #1e1e2e',
          borderRadius: '20px',
          padding: '24px',
          animation: 'float 4s ease-in-out infinite, fadeUp 0.8s ease 0.4s both',
          boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
        }}>
          {/* Мок редактора */}
          <div style={{ display: 'flex', gap: '16px', height: '200px' }}>
            <div style={{
              width: '40%', background: '#0f0f13',
              borderRadius: '12px', padding: '16px',
              display: 'flex', flexDirection: 'column', gap: '8px',
            }}>
              {['Имя и фамилия', 'Должность', 'Email', 'Навыки'].map((p, i) => (
                <div key={i} style={{
                  height: '28px', background: '#16161f',
                  borderRadius: '6px', border: '1px solid #1e1e2e',
                  display: 'flex', alignItems: 'center', padding: '0 10px',
                }}>
                  <span style={{ color: '#2e2e4e', fontSize: '11px' }}>{p}</span>
                </div>
              ))}
            </div>
            <div style={{
              width: '60%', background: '#fff',
              borderRadius: '12px', padding: '16px',
              display: 'flex', flexDirection: 'column', gap: '6px',
            }}>
              <div style={{ height: '20px', width: '60%', background: '#1a1a2e', borderRadius: '4px' }} />
              <div style={{ height: '12px', width: '40%', background: '#6c63ff', borderRadius: '4px', opacity: 0.6 }} />
              <div style={{ height: '1px', background: '#eee', margin: '4px 0' }} />
              <div style={{ height: '10px', width: '90%', background: '#f0f0f0', borderRadius: '3px' }} />
              <div style={{ height: '10px', width: '75%', background: '#f0f0f0', borderRadius: '3px' }} />
              <div style={{ height: '10px', width: '85%', background: '#f0f0f0', borderRadius: '3px' }} />
              <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                {['React', 'JS', 'CSS'].map((s, i) => (
                  <div key={i} style={{
                    padding: '3px 10px', borderRadius: '4px',
                    background: '#6c63ff', opacity: 0.8,
                  }}>
                    <span style={{ color: '#fff', fontSize: '9px' }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ФИЧИ */}
      <section style={{
        position: 'relative', zIndex: 1,
        padding: '60px 60px 80px',
      }}>
        <h2 style={{
          textAlign: 'center', color: '#fff',
          fontSize: '36px', fontWeight: '700',
          marginBottom: '48px', letterSpacing: '-0.5px',
          fontFamily: '"Playfair Display", serif',
        }}>
          Почему выбирают нас
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px', maxWidth: '900px', margin: '0 auto',
        }}>
          {[
            { icon: '⚡', title: 'Быстро', desc: 'Заполни форму и получи готовое резюме за 5 минут' },
            { icon: '🎨', title: '3 шаблона', desc: 'Современный, минималистичный и классический дизайн' },
            { icon: '📄', title: 'PDF экспорт', desc: 'Скачай резюме в формате PDF одним кликом' },
            { icon: '💾', title: 'Автосохранение', desc: 'Данные сохраняются автоматически в браузере' },
            { icon: '🆓', title: 'Бесплатно', desc: 'Без регистрации, без подписки, без ограничений' },
            { icon: '✨', title: 'Живой Preview', desc: 'Видишь результат в реальном времени пока пишешь' },
          ].map((f, i) => (
            <div key={i} className="feature-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{f.icon}</div>
              <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ color: '#4a4a6a', fontSize: '13px', lineHeight: '1.6' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        position: 'relative', zIndex: 1,
        padding: '60px 40px 100px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(156,99,255,0.1))',
          border: '1px solid rgba(108,99,255,0.2)',
          borderRadius: '24px',
          padding: '60px 80px',
          maxWidth: '700px',
        }}>
          <h2 style={{
            color: '#fff', fontSize: '40px', fontWeight: '700',
            marginBottom: '16px', letterSpacing: '-0.5px',
            fontFamily: '"Playfair Display", serif',
          }}>
            Готов создать резюме?
          </h2>
          <p style={{ color: '#6b6b8a', fontSize: '16px', marginBottom: '32px', lineHeight: '1.6' }}>
            Займёт не больше 5 минут. Никакой регистрации.
          </p>
          <button className="hero-btn" onClick={() => navigate('/builder')}>
            Начать сейчас — это бесплатно →
          </button>
        </div>
      </section>
    </div>
  );
}

export default Landing;
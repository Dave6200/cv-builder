import { useEffect, useState } from 'react';

function Splash({ onFinish }) {
  const [phase, setPhase] = useState('spin');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('burst'), 2500);
    const t2 = setTimeout(() => onFinish(), 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onFinish]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#0f0f13',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: phase === 'burst' ? 'splashOut 0.9s ease forwards' : 'none',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

        @keyframes spinOrbit {
          from { transform: rotate(0deg) translateX(58px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(58px) rotate(-360deg); }
        }

        @keyframes balloonFloat {
          0%, 100% { transform: rotate(0deg) translateX(58px) rotate(0deg) translateY(0px); }
          50%       { transform: rotate(180deg) translateX(58px) rotate(-180deg) translateY(-4px); }
        }

        @keyframes splashOut {
          0%   { opacity: 1; transform: scale(1); filter: blur(0px); }
          30%  { opacity: 1; transform: scale(1.08); filter: blur(0px); }
          100% { opacity: 0; transform: scale(0.85); filter: blur(8px); }
        }

        @keyframes burstPiece {
          0%   { transform: rotate(var(--a)) translateX(58px) scale(1); opacity: 1; }
          40%  { transform: rotate(var(--a)) translateX(90px) scale(1.2); opacity: 1; }
          100% { transform: rotate(var(--a)) translateX(180px) scale(0); opacity: 0; }
        }

        @keyframes burstSmoke {
          0%   { transform: scale(0); opacity: 0.6; }
          100% { transform: scale(3); opacity: 0; }
        }

        @keyframes letterGlow {
          0%, 100% { 
            text-shadow: 0 0 30px rgba(108,99,255,0.3);
            transform: scale(1);
          }
          50% { 
            text-shadow: 0 0 60px rgba(108,99,255,0.8), 0 0 100px rgba(156,99,255,0.4);
            transform: scale(1.03);
          }
        }

        @keyframes ringRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        @keyframes subtitleFade {
          0%   { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ position: 'relative', width: '140px', height: '140px' }}>

        {/* Внешнее вращающееся кольцо */}
        <div style={{
          position: 'absolute',
          inset: '-16px',
          borderRadius: '50%',
          border: '1px dashed rgba(108,99,255,0.25)',
          animation: 'ringRotate 8s linear infinite',
        }} />

        {/* Внутреннее кольцо */}
        <div style={{
          position: 'absolute',
          inset: '-4px',
          borderRadius: '50%',
          border: '1px solid rgba(108,99,255,0.12)',
        }} />

        {/* Буква D */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}>
          <span style={{
            fontSize: '72px',
            fontWeight: '700',
            fontFamily: '"Playfair Display", serif',
            background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 50%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'letterGlow 2s ease infinite',
            lineHeight: 1,
            letterSpacing: '-2px',
          }}>
            D
          </span>
        </div>

        {/* Воздушный шарик — крутится */}
        {phase === 'spin' && (
          <div style={{
            position: 'absolute',
            inset: 0,
            animation: 'balloonFloat 3s ease-in-out infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ position: 'relative' }}>
              {/* Тело шарика */}
              <div style={{
                width: '18px',
                height: '22px',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                background: 'radial-gradient(circle at 35% 35%, #a78bfa, #6c63ff 50%, #4c1d95)',
                boxShadow: '0 0 16px rgba(108,99,255,0.8), inset -3px -3px 6px rgba(0,0,0,0.3)',
                position: 'relative',
              }}>
                {/* Блик */}
                <div style={{
                  position: 'absolute',
                  top: '4px',
                  left: '4px',
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.6)',
                }} />
              </div>
              {/* Хвостик шарика */}
              <div style={{
                width: '1px',
                height: '8px',
                background: 'rgba(108,99,255,0.5)',
                margin: '0 auto',
              }} />
            </div>
          </div>
        )}

        {/* Взрыв шарика */}
        {phase === 'burst' && (
          <>
            {/* Дым */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(108,99,255,0.6), transparent)',
                animation: 'burstSmoke 0.8s ease forwards',
              }} />
            </div>

            {/* Осколки */}
            {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle, i) => (
              <div key={i} style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '--a': `${angle}deg`,
                animation: `burstPiece 0.8s cubic-bezier(0.25, 0.46, 0.1, 1) forwards`,
                animationDelay: `${i * 0.03}s`,
                transform: `rotate(${angle}deg) translateX(58px)`,
              }}>
                <div style={{
                  width: i % 3 === 0 ? '6px' : '4px',
                  height: i % 3 === 0 ? '6px' : '4px',
                  borderRadius: i % 2 === 0 ? '50%' : '2px',
                  background: i % 3 === 0
                    ? 'radial-gradient(circle at 35% 35%, #c4b5fd, #6c63ff)'
                    : 'radial-gradient(circle at 35% 35%, #a78bfa, #4c1d95)',
                  boxShadow: '0 0 6px rgba(108,99,255,0.8)',
                }} />
              </div>
            ))}
          </>
        )}
      </div>

      {/* Подпись */}
      <div style={{
        position: 'absolute',
        marginTop: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        animation: 'subtitleFade 0.8s ease 0.3s both',
      }}>
        <span style={{
          color: '#fff',
          fontSize: '16px',
          fontWeight: '600',
          fontFamily: '"Playfair Display", serif',
          letterSpacing: '2px',
        }}>CV Builder</span>
        <span style={{
          color: '#4a4a6a',
          fontSize: '10px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif',
        }}>create your story</span>
      </div>
    </div>
  );
}

export default Splash;
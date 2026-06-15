import { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import TemplateModern from './TemplateModern';
import TemplateMinimal from './TemplateMinimal';
import TemplateClassic from './TemplateClassic';
import TemplateCreative from './TemplateCreative';
import TemplateTech from './TemplateTech';
import TemplateElegant from './TemplateElegant';
import Splash from './Splash';
import Landing from './Landing';

const templates = {
  modern:   { name: '✦ Современный', component: TemplateModern },
  minimal:  { name: '◯ Минимал',     component: TemplateMinimal },
  classic:  { name: '▣ Классика',    component: TemplateClassic },
  creative: { name: '◈ Креатив',     component: TemplateCreative },
  tech:     { name: '</> Тех',        component: TemplateTech },
  elegant:  { name: '✧ Элегант',     component: TemplateElegant },
};

const ACCENT_COLORS = ['#6c63ff', '#e94560', '#00b4d8', '#06d6a0', '#ff6b4a', '#f4c430'];

const emptyForm = {
  name: '', job: '', email: '', phone: '',
  location: '', about: '', experience: '', education: '', skills: '',
};

function calcCompletion(data) {
  const fields = Object.values(data);
  const filled = fields.filter(v => v.trim() !== '').length;
  return Math.round((filled / fields.length) * 100);
}

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return parts[0].slice(0, 2).toUpperCase();
}

function Builder() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('cv-data');
    return saved ? JSON.parse(saved) : emptyForm;
  });

  const [photo, setPhoto] = useState('');
  const [accentColor, setAccentColor] = useState('#6c63ff');

  const [activeTemplate, setActiveTemplate] = useState(() => {
    return localStorage.getItem('cv-template') || 'modern';
  });

  const [animating, setAnimating] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem('cv-data', JSON.stringify(formData));
    setSaved(true);
    const t = setTimeout(() => setSaved(false), 1500);
    return () => clearTimeout(t);
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('cv-template', activeTemplate);
  }, [activeTemplate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  const switchTemplate = (key) => {
    setAnimating(true);
    setTimeout(() => { setActiveTemplate(key); setAnimating(false); }, 300);
  };

  const clearData = () => {
    if (window.confirm('Очистить все данные?')) {
      setFormData(emptyForm);
      setPhoto('');
      localStorage.removeItem('cv-data');
    }
  };

  const downloadPDF = () => {
    const sheet = document.querySelector('.preview-sheet');
    html2canvas(sheet, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save('resume.pdf');
    });
  };

  const completion = calcCompletion(formData);
  const ActiveComponent = templates[activeTemplate].component;

  return (
    <div className="container">
      <div className="form">

        {/* Шапка с кнопкой назад */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'transparent',
              border: '1px solid #1e1e2e',
              borderRadius: '8px',
              color: '#4a4a6a',
              padding: '6px 10px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s ease',
              fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={e => { e.target.style.borderColor = '#6c63ff'; e.target.style.color = '#fff'; }}
            onMouseLeave={e => { e.target.style.borderColor = '#1e1e2e'; e.target.style.color = '#4a4a6a'; }}
          >
            ← Назад
          </button>
          <h2 style={{ margin: 0 }}>
            CV Builder {saved && <span style={{ fontSize: '11px', color: '#6c63ff', fontWeight: 400 }}>сохранено ✓</span>}
          </h2>
        </div>

        {/* Прогресс-бар */}
        <div className="progress-wrap">
          <div className="progress-header">
            <span className="progress-label">Заполнено резюме</span>
            <span className="progress-percent" style={{ color: completion === 100 ? '#4ade80' : '#6c63ff' }}>
              {completion}%
            </span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${completion}%`, background: completion === 100 ? 'linear-gradient(90deg, #6c63ff, #4ade80)' : 'linear-gradient(90deg, #6c63ff, #9c63ff)' }}
            />
          </div>
        </div>

        <div className="section-title">Шаблон</div>
        <div className="template-buttons">
          {Object.entries(templates).map(([key, val]) => (
            <button
              key={key}
              className={`template-btn ${activeTemplate === key ? 'active' : ''}`}
              onClick={() => switchTemplate(key)}
            >{val.name}</button>
          ))}
        </div>

        {/* Акцентный цвет */}
        <div className="section-title">Акцент</div>
        <div className="color-picker">
          {ACCENT_COLORS.map(color => (
            <button
              key={color}
              className="color-circle"
              onClick={() => setAccentColor(color)}
              style={{
                background: color,
                transform: accentColor === color ? 'scale(1.2)' : 'scale(1)',
                boxShadow: accentColor === color ? `0 0 0 2px #0f0f13, 0 0 0 4px ${color}` : 'none',
              }}
            />
          ))}
        </div>

        {/* Фото профиля */}
        <div className="section-title">Фото профиля</div>
        <div className="photo-upload-section">
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div className="photo-upload-btn" onClick={() => fileInputRef.current.click()}>
              {photo ? (
                <>
                  <img src={photo} alt="Фото профиля" />
                  <div className="photo-upload-overlay">📷</div>
                </>
              ) : (
                <>
                  <span className="photo-initials">
                    {formData.name ? getInitials(formData.name) : '📷'}
                  </span>
                  <div className="photo-upload-overlay">📷</div>
                </>
              )}
            </div>
            {photo && (
              <button
                className="photo-remove-btn"
                onClick={(e) => { e.stopPropagation(); setPhoto(''); }}
              >×</button>
            )}
          </div>
          <span className="photo-upload-hint">
            {photo ? 'Нажми чтобы изменить' : 'Нажми чтобы добавить'}
          </span>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handlePhotoUpload}
          />
        </div>

        <div className="section-title">Личные данные</div>
        <input name="name" placeholder="Имя и фамилия" onChange={handleChange} value={formData.name} />
        <input name="job" placeholder="Должность" onChange={handleChange} value={formData.job} />
        <input name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
        <input name="phone" placeholder="Телефон" onChange={handleChange} value={formData.phone} />
        <input name="location" placeholder="Город" onChange={handleChange} value={formData.location} />

        <div className="section-title">О себе</div>
        <textarea name="about" placeholder="Пару слов о себе..." onChange={handleChange} value={formData.about} />

        <div className="section-title">Опыт работы</div>
        <textarea name="experience" placeholder="Компания, должность, период..." onChange={handleChange} value={formData.experience} />

        <div className="section-title">Образование</div>
        <textarea name="education" placeholder="Университет, специальность, год..." onChange={handleChange} value={formData.education} />

        <div className="section-title">Навыки</div>
        <input name="skills" placeholder="React, JavaScript, CSS..." onChange={handleChange} value={formData.skills} />

        <button className="download-btn" onClick={downloadPDF}>⬇ Скачать PDF</button>
        <button className="clear-btn" onClick={clearData}>🗑 Очистить</button>
      </div>

      <div className="preview">
        <div className={`preview-sheet ${animating ? '' : 'template-fade'}`}>
          <ActiveComponent data={{ ...formData, photo, accentColor }} />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashFinish = useCallback(() => setShowSplash(false), []);

  return (
    <BrowserRouter>
      {showSplash && <Splash onFinish={handleSplashFinish} />}
      <div style={{ opacity: showSplash ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/builder" element={<Builder />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

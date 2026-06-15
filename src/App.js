import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import TemplateModern from './TemplateModern';
import TemplateMinimal from './TemplateMinimal';
import TemplateClassic from './TemplateClassic';
import Splash from './Splash';
import Landing from './Landing';

const templates = {
  modern: { name: '✦ Современный', component: TemplateModern },
  minimal: { name: '◯ Минимал', component: TemplateMinimal },
  classic: { name: '▣ Классика', component: TemplateClassic },
};

const emptyForm = {
  name: '', job: '', email: '', phone: '',
  location: '', about: '', experience: '', education: '', skills: '',
};

function calcCompletion(data) {
  const fields = Object.values(data);
  const filled = fields.filter(v => v.trim() !== '').length;
  return Math.round((filled / fields.length) * 100);
}

function Builder() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('cv-data');
    return saved ? JSON.parse(saved) : emptyForm;
  });

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

  const switchTemplate = (key) => {
    setAnimating(true);
    setTimeout(() => { setActiveTemplate(key); setAnimating(false); }, 300);
  };

  const clearData = () => {
    if (window.confirm('Очистить все данные?')) {
      setFormData(emptyForm);
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
          <ActiveComponent data={formData} />
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

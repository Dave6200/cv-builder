import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const s = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
    paddingTop: 50,
    paddingBottom: 50,
    paddingHorizontal: 54,
  },
  header: {
    marginBottom: 22,
  },
  name: {
    fontSize: 30,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a2e',
    marginBottom: 5,
  },
  job: {
    fontSize: 14,
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  contactItem: {
    fontSize: 10,
    color: '#555555',
  },
  contactDot: {
    fontSize: 10,
    color: '#bbbbcc',
    marginHorizontal: 6,
  },
  divider: {
    height: 2,
    borderRadius: 2,
    marginBottom: 22,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 2,
    marginBottom: 8,
  },
  body: {
    fontSize: 11,
    color: '#444444',
    lineHeight: 1.65,
  },
  expEntry: {
    marginBottom: 6,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#ecebf2',
  },
  expBody: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a2e',
    marginBottom: 1,
  },
  expDate: {
    fontSize: 10,
    color: '#7a7a8c',
  },
  eduGroup: {
    marginBottom: 10,
  },
  eduDegree: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  eduSchool: {
    fontSize: 10,
    marginBottom: 1,
  },
  eduYear: {
    fontSize: 10,
    color: '#8a8a9a',
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  skillText: {
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
});

export default function PDFDocument({ data }) {
  const accent = data.accentColor || '#6c63ff';

  const contacts = [data.email, data.phone, data.location].filter(Boolean);

  // Experience: each line supports "Title | date" format
  const expEntries = data.experience
    ? data.experience.split('\n').filter(l => l.trim()).map(line => {
        const idx = line.lastIndexOf(' | ');
        return idx !== -1
          ? { body: line.slice(0, idx).trim(), date: line.slice(idx + 3).trim() }
          : { body: line.trim(), date: null };
      })
    : [];

  // Education: every 3 lines = degree / school / year
  const eduLines = data.education ? data.education.split('\n').filter(l => l.trim()) : [];
  const eduGroups = [];
  for (let i = 0; i < eduLines.length; i += 3) {
    eduGroups.push(eduLines.slice(i, i + 3));
  }

  const skills = data.skills
    ? data.skills.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <Document>
      <Page size="A4" style={s.page}>

        {/* ── Header ── */}
        <View style={s.header}>
          {data.name && (
            <Text style={s.name}>{data.name}</Text>
          )}
          {data.job && (
            <Text style={[s.job, { color: accent }]}>{data.job}</Text>
          )}
          {contacts.length > 0 && (
            <View style={s.contactRow}>
              {contacts.map((c, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <Text style={s.contactDot}>·</Text>}
                  <Text style={s.contactItem}>{c}</Text>
                </React.Fragment>
              ))}
            </View>
          )}
        </View>

        {/* ── Accent divider ── */}
        <View style={[s.divider, { backgroundColor: accent }]} />

        {/* ── About ── */}
        {data.about && (
          <View style={s.section}>
            <Text style={[s.sectionTitle, { color: accent }]}>ABOUT</Text>
            <Text style={s.body}>{data.about}</Text>
          </View>
        )}

        {/* ── Experience ── */}
        {expEntries.length > 0 && (
          <View style={s.section}>
            <Text style={[s.sectionTitle, { color: accent }]}>EXPERIENCE</Text>
            {expEntries.map((entry, i) => (
              <View key={i} style={[s.expEntry, { borderLeftColor: accent + '33' }]}>
                <Text style={s.expBody}>{entry.body}</Text>
                {entry.date && (
                  <Text style={s.expDate}>{entry.date}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* ── Education ── */}
        {eduGroups.length > 0 && (
          <View style={s.section}>
            <Text style={[s.sectionTitle, { color: accent }]}>EDUCATION</Text>
            {eduGroups.map((group, i) => (
              <View key={i} style={s.eduGroup}>
                {group[0] && <Text style={s.eduDegree}>{group[0]}</Text>}
                {group[1] && <Text style={[s.eduSchool, { color: accent }]}>{group[1]}</Text>}
                {group[2] && <Text style={s.eduYear}>{group[2]}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* ── Skills ── */}
        {skills.length > 0 && (
          <View style={s.section}>
            <Text style={[s.sectionTitle, { color: accent }]}>SKILLS</Text>
            <View style={s.skillsRow}>
              {skills.map((skill, i) => (
                <View key={i} style={[s.skillTag, { borderColor: accent + '44' }]}>
                  <Text style={[s.skillText, { color: '#2d2d44' }]}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

      </Page>
    </Document>
  );
}

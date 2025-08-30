import express from 'express';
import { disciplines } from '../data/disciplines';
import { templates } from '../data/templates';
import { sessions } from '../data/sessions';
import { coaches } from '../data/coaches';
import { ApiResponse, ClassSession } from '../types';

const router = express.Router();

// GET /api/classes/disciplines
router.get('/disciplines', (req, res) => {
  const response: ApiResponse<any> = {
    data: disciplines,
  };
  res.json(response);
});

// GET /api/classes/templates
router.get('/templates', (req, res) => {
  const { discipline, level, coachId } = req.query;
  
  let filtered = templates;
  
  if (discipline) {
    const disciplineRecord = disciplines.find(d => d.slug === discipline);
    if (disciplineRecord) {
      filtered = filtered.filter(t => t.disciplineId === disciplineRecord.id);
    }
  }
  
  if (level) {
    filtered = filtered.filter(t => t.level === level);
  }
  
  if (coachId) {
    filtered = filtered.filter(t => t.coachIds.includes(coachId as string));
  }
  
  // Enrich templates with discipline and coach data
  const enriched = filtered.map(template => ({
    ...template,
    discipline: disciplines.find(d => d.id === template.disciplineId),
    coaches: coaches.filter(c => template.coachIds.includes(c.id)),
  }));
  
  const response: ApiResponse<any> = {
    data: enriched,
  };
  
  res.json(response);
});

// GET /api/classes/sessions
router.get('/sessions', (req, res) => {
  const { from, to, discipline, level, coachId, locationId } = req.query;
  
  let filtered = sessions;
  
  if (from) {
    const fromDate = new Date(from as string);
    filtered = filtered.filter(s => s.startAt >= fromDate);
  }
  
  if (to) {
    const toDate = new Date(to as string);
    filtered = filtered.filter(s => s.startAt <= toDate);
  }
  
  if (coachId) {
    filtered = filtered.filter(s => s.coachId === coachId);
  }
  
  if (locationId) {
    filtered = filtered.filter(s => s.locationId === locationId);
  }
  
  if (discipline || level) {
    const disciplineRecord = disciplines.find(d => d.slug === discipline);
    const templatesForDiscipline = templates.filter(t => 
      (!disciplineRecord || t.disciplineId === disciplineRecord.id) &&
      (!level || t.level === level)
    );
    const templateIds = templatesForDiscipline.map(t => t.id);
    filtered = filtered.filter(s => templateIds.includes(s.templateId));
  }
  
  // Enrich sessions with template, coach, and discipline data
  const enriched = filtered.map(session => {
    const template = templates.find(t => t.id === session.templateId);
    const coach = coaches.find(c => c.id === session.coachId);
    const discipline = template ? disciplines.find(d => d.id === template.disciplineId) : null;
    
    return {
      ...session,
      template,
      coach,
      discipline,
    };
  });
  
  // Sort by start time
  enriched.sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
  
  const response: ApiResponse<ClassSession[]> = {
    data: enriched,
  };
  
  res.json(response);
});

export { router as classRoutes };
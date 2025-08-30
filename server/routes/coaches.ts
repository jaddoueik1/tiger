import express from 'express';
import { coaches } from '../data/coaches';
import { ApiResponse } from '../types';

const router = express.Router();

// GET /api/coaches
router.get('/', (req, res) => {
  const { specialty } = req.query;
  
  let filtered = coaches.filter(coach => coach.isActive);
  
  if (specialty) {
    filtered = filtered.filter(coach => 
      coach.specialties.some(s => 
        s.toLowerCase().includes((specialty as string).toLowerCase())
      )
    );
  }
  
  const response: ApiResponse<any> = {
    data: filtered,
  };
  
  res.json(response);
});

// GET /api/coaches/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  const coach = coaches.find(c => c.id === id && c.isActive);
  
  if (!coach) {
    return res.status(404).json({
      error: 'Coach Not Found',
      message: `Coach with id "${id}" not found`,
    });
  }
  
  const response: ApiResponse<any> = {
    data: coach,
  };
  
  res.json(response);
});

// GET /api/coaches/:id/availability
router.get('/:id/availability', (req, res) => {
  const { id } = req.params;
  const { from, to } = req.query;
  
  const coach = coaches.find(c => c.id === id);
  
  if (!coach) {
    return res.status(404).json({
      error: 'Coach Not Found',
      message: `Coach with id "${id}" not found`,
    });
  }
  
  // Mock availability generation based on rules
  const fromDate = new Date(from as string || new Date());
  const toDate = new Date(to as string || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  
  const availableSlots = [];
  const current = new Date(fromDate);
  
  while (current <= toDate) {
    const dayOfWeek = current.getDay();
    const rule = coach.availabilityRules.find(r => r.dayOfWeek === dayOfWeek);
    
    if (rule) {
      const [startHour, startMin] = rule.startTime.split(':').map(Number);
      const [endHour, endMin] = rule.endTime.split(':').map(Number);
      
      for (let hour = startHour; hour < endHour; hour++) {
        const slotStart = new Date(current);
        slotStart.setHours(hour, 0, 0, 0);
        
        const slotEnd = new Date(slotStart);
        slotEnd.setHours(hour + 1, 0, 0, 0);
        
        // Skip if in the past
        if (slotStart <= new Date()) continue;
        
        availableSlots.push({
          startAt: slotStart,
          endAt: slotEnd,
          price: coach.hourlyRate || 100,
        });
      }
    }
    
    current.setDate(current.getDate() + 1);
  }
  
  const response: ApiResponse<any> = {
    data: availableSlots,
  };
  
  res.json(response);
});

export { router as coachRoutes };
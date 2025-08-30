import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApiResponse, User, UserRole } from '../types';

const router = express.Router();

// Mock user storage
const users: User[] = [
  {
    id: '1',
    email: 'admin@apexmma.com',
    name: 'Admin User',
    roles: [UserRole.ADMIN],
    memberships: [],
    credits: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    email: 'member@example.com',
    name: 'John Doe',
    roles: [UserRole.MEMBER],
    memberships: [],
    credits: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

// Mock password storage (in real app, this would be in database)
const passwords: { [email: string]: string } = {
  'admin@apexmma.com': bcrypt.hashSync('admin123', 10),
  'member@example.com': bcrypt.hashSync('member123', 10),
};

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Email and password are required',
    });
  }
  
  const user = users.find(u => u.email === email);
  const hashedPassword = passwords[email];
  
  if (!user || !hashedPassword || !bcrypt.compareSync(password, hashedPassword)) {
    return res.status(401).json({
      error: 'Authentication Failed',
      message: 'Invalid email or password',
    });
  }
  
  const token = jwt.sign(
    { userId: user.id, email: user.email, roles: user.roles },
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: '7d' }
  );
  
  const response: ApiResponse<any> = {
    data: {
      token,
      user: { ...user },
    },
  };
  
  res.json(response);
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password, name, phone } = req.body;
  
  if (!email || !password || !name) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Email, password, and name are required',
    });
  }
  
  // Check if user already exists
  if (users.find(u => u.email === email)) {
    return res.status(409).json({
      error: 'User Exists',
      message: 'User with this email already exists',
    });
  }
  
  // Create new user
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser: User = {
    id: Date.now().toString(),
    email,
    name,
    phone,
    roles: [UserRole.MEMBER],
    memberships: [],
    credits: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  users.push(newUser);
  passwords[email] = hashedPassword;
  
  const token = jwt.sign(
    { userId: newUser.id, email: newUser.email, roles: newUser.roles },
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: '7d' }
  );
  
  const response: ApiResponse<any> = {
    data: {
      token,
      user: newUser,
    },
  };
  
  res.status(201).json(response);
});

export { router as authRoutes };